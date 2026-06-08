// Copyright 2026 theprodigal95. Licensed under Apache-2.0. See LICENSE.

package cli

import (
	"database/sql"
	"encoding/json"
	"fmt"

	"github.com/spf13/cobra"
)

type staleRow struct {
	Name        string  `json:"name"`
	PeakRank    int     `json:"peak_rank"`
	PeakSpend   float64 `json:"peak_spend"`
	CurrentRank string  `json:"current_rank"`
	CDNURL      string  `json:"cdn_url,omitempty"`
}

func newStaleCmd(flags *rootFlags) *cobra.Command {
	var workspaceID, reportID string
	var weeksBack, topN int

	cmd := &cobra.Command{
		Use:   "stale",
		Short: "Find creatives that were top performers but have since dropped or disappeared",
		Long:  "Identify creatives that were in the top-N N weeks ago but are no longer in the current top set or have dropped significantly in rank.",
		Example: `  motion-pp-cli stale --workspace-id <id> --report-id <id>
  motion-pp-cli stale --workspace-id <id> --report-id <id> --weeks 4 --top 15 --json`,
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

			dbPath := defaultDBPath("motion-pp-cli")
			db, err := sql.Open("sqlite", "file:"+dbPath+"?mode=ro&_journal_mode=WAL&_busy_timeout=5000")
			if err != nil {
				return fmt.Errorf("opening pull history DB: %w", err)
			}
			defer db.Close()

			// Check table exists
			var tableName string
			if err := db.QueryRow(`SELECT name FROM sqlite_master WHERE type='table' AND name='pull_history'`).Scan(&tableName); err != nil {
				fmt.Fprintln(cmd.OutOrStdout(), "No pull history found. Run `motion pull` first.")
				return nil
			}

			weeksParam := fmt.Sprintf("%d", weeksBack)

			// Step 1: Find creatives that were in top-N more than N weeks ago
			oldRows, err := db.Query(`
				SELECT DISTINCT creative_id, creative_name,
					MIN(rank) as peak_rank,
					MAX(spend) as peak_spend,
					MAX(cdn_url) as cdn_url
				FROM pull_history
				WHERE workspace_id=?
				  AND report_id=?
				  AND rank <= ?
				  AND pulled_at < datetime('now', '-' || ? || ' weeks')
				GROUP BY creative_id, creative_name`,
				workspaceID, reportID, topN, weeksParam,
			)
			if err != nil {
				return fmt.Errorf("querying historical top creatives: %w", err)
			}
			defer oldRows.Close()

			type oldEntry struct {
				CreativeID string
				Name       string
				PeakRank   int
				PeakSpend  float64
				CDNURL     string
			}
			var oldCreatives []oldEntry
			for oldRows.Next() {
				var e oldEntry
				var cdnURL sql.NullString
				if err := oldRows.Scan(&e.CreativeID, &e.Name, &e.PeakRank, &e.PeakSpend, &cdnURL); err != nil {
					continue
				}
				if cdnURL.Valid {
					e.CDNURL = cdnURL.String
				}
				oldCreatives = append(oldCreatives, e)
			}
			if err := oldRows.Err(); err != nil {
				return fmt.Errorf("reading historical rows: %w", err)
			}

			if len(oldCreatives) == 0 {
				fmt.Fprintln(cmd.OutOrStdout(), "No historical top creatives found for the specified period.")
				return nil
			}

			// Step 2: Get the most recent pull for this workspace+report
			recentRows, err := db.Query(`
				SELECT creative_id, rank
				FROM pull_history
				WHERE workspace_id=? AND report_id=?
				  AND pulled_at = (SELECT MAX(pulled_at) FROM pull_history WHERE workspace_id=? AND report_id=?)
				ORDER BY rank ASC`,
				workspaceID, reportID, workspaceID, reportID,
			)
			if err != nil {
				return fmt.Errorf("querying recent pull: %w", err)
			}
			defer recentRows.Close()

			recentRankByID := map[string]int{}
			for recentRows.Next() {
				var id string
				var rank int
				if err := recentRows.Scan(&id, &rank); err != nil {
					continue
				}
				recentRankByID[id] = rank
			}
			if err := recentRows.Err(); err != nil {
				return fmt.Errorf("reading recent rows: %w", err)
			}

			// Step 3: Cross-reference — stale = was top-N, now DROPPED or rank > topN*2
			threshold := topN * 2
			var staleCreatives []staleRow
			for _, old := range oldCreatives {
				currentRank, inRecent := recentRankByID[old.CreativeID]
				if !inRecent {
					staleCreatives = append(staleCreatives, staleRow{
						Name:        old.Name,
						PeakRank:    old.PeakRank,
						PeakSpend:   old.PeakSpend,
						CurrentRank: "DROPPED",
						CDNURL:      old.CDNURL,
					})
				} else if currentRank > threshold {
					staleCreatives = append(staleCreatives, staleRow{
						Name:        old.Name,
						PeakRank:    old.PeakRank,
						PeakSpend:   old.PeakSpend,
						CurrentRank: fmt.Sprintf("%d", currentRank),
						CDNURL:      old.CDNURL,
					})
				}
			}

			if len(staleCreatives) == 0 {
				fmt.Fprintf(cmd.OutOrStdout(), "No stale creatives found (all former top-%d are still active).\n", topN)
				return nil
			}

			if flags.asJSON {
				return printJSONFiltered(cmd.OutOrStdout(), staleCreatives, flags)
			}

			tw := newTabWriter(cmd.OutOrStdout())
			fmt.Fprintf(tw, "%s\t%s\t%s\t%s\t%s\n",
				bold("NAME"), bold("PEAK RANK"), bold("PEAK SPEND"), bold("CURRENT RANK"), bold("CDN URL"))
			for _, s := range staleCreatives {
				cdn := s.CDNURL
				if cdn == "" {
					cdn = "-"
				}
				fmt.Fprintf(tw, "%s\t%d\t%.2f\t%s\t%s\n",
					truncate(s.Name, 40), s.PeakRank, s.PeakSpend, s.CurrentRank, truncate(cdn, 60))
			}
			tw.Flush()
			return nil
		},
	}

	cmd.Flags().StringVar(&workspaceID, "workspace-id", "", "Motion workspace ID (required)")
	cmd.Flags().StringVar(&reportID, "report-id", "", "Motion report ID (required)")
	cmd.Flags().IntVar(&weeksBack, "weeks", 3, "Look back N weeks for historical top performers")
	cmd.Flags().IntVar(&topN, "top", 10, "What rank counts as 'top N' for historical comparison")

	_ = json.Marshal // keep import used

	return cmd
}
