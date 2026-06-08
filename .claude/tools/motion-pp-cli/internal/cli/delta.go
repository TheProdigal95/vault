// Copyright 2026 theprodigal95. Licensed under Apache-2.0. See LICENSE.

package cli

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"os"

	"github.com/spf13/cobra"
)

type deltaRow struct {
	Status   string  `json:"status"`
	Name     string  `json:"name"`
	PrevRank int     `json:"prev_rank,omitempty"`
	CurrRank int     `json:"curr_rank,omitempty"`
	Spend    float64 `json:"spend"`
	ROAS     float64 `json:"roas"`
}

func newDeltaCmd(flags *rootFlags) *cobra.Command {
	var workspaceID, reportID string

	cmd := &cobra.Command{
		Use:   "delta",
		Short: "Diff the current top creatives against the last stored pull",
		Long:  "Fetch fresh top creatives and compare them to the most recent prior pull stored in pull_history. Shows new entrants, dropped creatives, and rank changes.",
		Example: `  motion-pp-cli delta --workspace-id <id> --report-id <id>
  motion-pp-cli delta --workspace-id <id> --report-id <id> --json`,
		RunE: func(cmd *cobra.Command, args []string) error {
			if workspaceID == "" {
				return usageErr(fmt.Errorf("--workspace-id is required"))
			}
			if reportID == "" {
				return usageErr(fmt.Errorf("--report-id is required"))
			}
			if dryRunOK(flags) {
				return nil
			}

			// Open DB (read-only is fine for queries; we don't write in delta)
			dbPath := defaultDBPath("motion-pp-cli")
			db, err := sql.Open("sqlite", "file:"+dbPath+"?mode=ro&_journal_mode=WAL&_busy_timeout=5000")
			if err != nil {
				return fmt.Errorf("opening pull history DB: %w", err)
			}
			defer db.Close()

			// Check that pull_history exists
			var tableName string
			if err := db.QueryRow(`SELECT name FROM sqlite_master WHERE type='table' AND name='pull_history'`).Scan(&tableName); err != nil {
				fmt.Fprintln(cmd.OutOrStdout(), "No prior pull found for this workspace. Run `motion pull` first.")
				return nil
			}

			// Query the most recent prior pull (before the current maximum pulled_at)
			rows, err := db.Query(`
				SELECT creative_id, creative_name, rank, spend, roas
				FROM pull_history
				WHERE workspace_id=? AND report_id=?
				  AND pulled_at < (SELECT MAX(pulled_at) FROM pull_history WHERE workspace_id=? AND report_id=?)
				ORDER BY pulled_at DESC, rank ASC
				LIMIT 50`,
				workspaceID, reportID, workspaceID, reportID,
			)
			if err != nil {
				return fmt.Errorf("querying prior pull: %w", err)
			}
			defer rows.Close()

			type priorEntry struct {
				CreativeID string
				Name       string
				Rank       int
				Spend      float64
				ROAS       float64
			}
			priorByID := map[string]*priorEntry{}
			for rows.Next() {
				var e priorEntry
				if err := rows.Scan(&e.CreativeID, &e.Name, &e.Rank, &e.Spend, &e.ROAS); err != nil {
					continue
				}
				// Keep only the highest-rank (most recent prior pull) entry per creative
				if _, exists := priorByID[e.CreativeID]; !exists {
					priorByID[e.CreativeID] = &e
				}
			}
			if err := rows.Err(); err != nil {
				return fmt.Errorf("reading prior pull rows: %w", err)
			}

			if len(priorByID) == 0 {
				fmt.Fprintln(cmd.OutOrStdout(), "No prior pull found for this workspace. Run `motion pull` first.")
				return nil
			}

			// Fetch current top creatives live
			current, _, err := fetchTopCreatives(flags, workspaceID, reportID, 0, defaultPullOptions())
			if err != nil {
				return err
			}

			currentByID := map[string]*pullCreative{}
			for i := range current {
				currentByID[current[i].CreativeID] = &current[i]
			}

			// Build diff
			var diffs []deltaRow

			// Current creatives: new or rank-changed
			for _, cr := range current {
				prior, existed := priorByID[cr.CreativeID]
				if !existed {
					diffs = append(diffs, deltaRow{
						Status:   "NEW",
						Name:     cr.Name,
						CurrRank: cr.Rank,
						Spend:    cr.Spend,
						ROAS:     cr.ROAS,
					})
				} else {
					var status string
					switch {
					case cr.Rank < prior.Rank:
						status = fmt.Sprintf("↑ (%d→%d)", prior.Rank, cr.Rank)
					case cr.Rank > prior.Rank:
						status = fmt.Sprintf("↓ (%d→%d)", prior.Rank, cr.Rank)
					default:
						status = "="
					}
					diffs = append(diffs, deltaRow{
						Status:   status,
						Name:     cr.Name,
						PrevRank: prior.Rank,
						CurrRank: cr.Rank,
						Spend:    cr.Spend,
						ROAS:     cr.ROAS,
					})
				}
			}

			// Prior creatives no longer in current
			for id, prior := range priorByID {
				if _, inCurrent := currentByID[id]; !inCurrent {
					diffs = append(diffs, deltaRow{
						Status:   "DROPPED",
						Name:     prior.Name,
						PrevRank: prior.Rank,
						Spend:    prior.Spend,
						ROAS:     prior.ROAS,
					})
				}
			}

			if flags.asJSON {
				return printJSONFiltered(cmd.OutOrStdout(), diffs, flags)
			}

			tw := newTabWriter(cmd.OutOrStdout())
			fmt.Fprintf(tw, "%s\t%s\t%s\t%s\t%s\n",
				bold("STATUS"), bold("NAME"), bold("RANK"), bold("SPEND"), bold("ROAS"))
			for _, d := range diffs {
				rankStr := fmt.Sprintf("%d", d.CurrRank)
				if d.PrevRank > 0 && d.CurrRank > 0 && d.PrevRank != d.CurrRank {
					rankStr = fmt.Sprintf("%d→%d", d.PrevRank, d.CurrRank)
				} else if d.Status == "DROPPED" {
					rankStr = fmt.Sprintf("%d (dropped)", d.PrevRank)
				}
				fmt.Fprintf(tw, "%s\t%s\t%s\t%.2f\t%.2f\n",
					d.Status, truncate(d.Name, 40), rankStr, d.Spend, d.ROAS)
			}
			tw.Flush()
			fmt.Fprintf(os.Stderr, "\n%d creatives compared.\n", len(diffs))
			return nil
		},
	}

	cmd.Flags().StringVar(&workspaceID, "workspace-id", "", "Motion workspace ID (required)")
	cmd.Flags().StringVar(&reportID, "report-id", "", "Motion report ID (required)")

	_ = json.Marshal // keep import used

	return cmd
}
