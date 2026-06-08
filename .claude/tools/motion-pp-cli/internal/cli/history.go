// Copyright 2026 theprodigal95. Licensed under Apache-2.0. See LICENSE.

package cli

import (
	"database/sql"
	"encoding/json"
	"fmt"

	"github.com/spf13/cobra"
)

type historyRow struct {
	PulledAt string  `json:"pulled_at"`
	Rank     int     `json:"rank"`
	Spend    float64 `json:"spend"`
	ROAS     float64 `json:"roas"`
	CTR      float64 `json:"ctr"`
	CDNURL   string  `json:"cdn_url,omitempty"`
}

func newHistoryCmd(flags *rootFlags) *cobra.Command {
	var workspaceID string

	cmd := &cobra.Command{
		Use:   "history [creative-name]",
		Short: "Show longitudinal performance history for a creative",
		Long:  "Query pull_history for all stored pulls matching a creative name (or partial name) and display a timeline of rank, spend, ROAS, and CTR over time.",
		Example: `  motion-pp-cli history "My Hero Ad" --workspace-id <id>
  motion-pp-cli history "hero" --workspace-id <id> --json`,
		RunE: func(cmd *cobra.Command, args []string) error {
			creativeName := ""
			if len(args) > 0 {
				creativeName = args[0]
			}
			if creativeName == "" {
				return usageErr(fmt.Errorf("creative-name argument is required"))
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
				fmt.Fprintf(cmd.OutOrStdout(), "No history found for %q. Run `motion pull` to start tracking.\n", creativeName)
				return nil
			}

			likePattern := "%" + creativeName + "%"
			var queryArgs []any
			querySQL := `SELECT pulled_at, rank, spend, roas, ctr, cdn_url
				FROM pull_history
				WHERE creative_name LIKE ?`
			queryArgs = append(queryArgs, likePattern)
			if workspaceID != "" {
				querySQL += " AND workspace_id=?"
				queryArgs = append(queryArgs, workspaceID)
			}
			querySQL += " ORDER BY pulled_at ASC"

			rows, err := db.Query(querySQL, queryArgs...)
			if err != nil {
				return fmt.Errorf("querying history: %w", err)
			}
			defer rows.Close()

			var results []historyRow
			for rows.Next() {
				var r historyRow
				var cdnURL sql.NullString
				if err := rows.Scan(&r.PulledAt, &r.Rank, &r.Spend, &r.ROAS, &r.CTR, &cdnURL); err != nil {
					continue
				}
				if cdnURL.Valid {
					r.CDNURL = cdnURL.String
				}
				results = append(results, r)
			}
			if err := rows.Err(); err != nil {
				return fmt.Errorf("reading history rows: %w", err)
			}

			if len(results) == 0 {
				fmt.Fprintf(cmd.OutOrStdout(), "No history found for %q. Run `motion pull` to start tracking.\n", creativeName)
				return nil
			}

			if flags.asJSON {
				return printJSONFiltered(cmd.OutOrStdout(), results, flags)
			}

			tw := newTabWriter(cmd.OutOrStdout())
			fmt.Fprintf(tw, "%s\t%s\t%s\t%s\t%s\t%s\n",
				bold("DATE"), bold("RANK"), bold("SPEND"), bold("ROAS"), bold("CTR"), bold("CDN URL"))
			for _, r := range results {
				date := r.PulledAt
				if len(date) >= 10 {
					date = date[:10]
				}
				cdn := r.CDNURL
				if cdn == "" {
					cdn = "-"
				}
				fmt.Fprintf(tw, "%s\t%d\t%.2f\t%.2f\t%.4f\t%s\n",
					date, r.Rank, r.Spend, r.ROAS, r.CTR, truncate(cdn, 60))
			}
			tw.Flush()
			return nil
		},
	}

	cmd.Flags().StringVar(&workspaceID, "workspace-id", "", "Filter history to a specific workspace ID")

	_ = json.Marshal // keep import used

	return cmd
}
