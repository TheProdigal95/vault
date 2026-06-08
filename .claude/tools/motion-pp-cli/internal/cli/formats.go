// Copyright 2026 theprodigal95. Licensed under Apache-2.0. See LICENSE.

package cli

import (
	"encoding/json"
	"fmt"
	"os"

	"github.com/spf13/cobra"
)

func newFormatsCmd(flags *rootFlags) *cobra.Command {
	var brand, workspaceID string

	cmd := &cobra.Command{
		Use:   "formats",
		Short: "Fetches Motion's WorkspaceTrendingVisualFormats",
		Long:  "Fetches Motion's WorkspaceTrendingVisualFormats — which creative formats (UGC, talking head, product demo, text-on-screen, etc.) are scaling vs declining. Use before batch planning to pick formats worth briefing.",
		Example: `  motion-pp-cli formats --brand lifeforce
  motion-pp-cli formats --workspace-id <id>
  motion-pp-cli formats --brand lifeforce --json`,
		RunE: func(cmd *cobra.Command, args []string) error {
			if dryRunOK(flags) {
				return nil
			}

			// Resolve workspace ID
			wsID, err := resolveWorkspaceID(flags, brand, workspaceID)
			if err != nil {
				return err
			}

			c, err := flags.newClient()
			if err != nil {
				return err
			}

			vars := map[string]any{
				"workspaceId": wsID,
				"limit":       20,
			}
			varsJSON, _ := json.Marshal(vars)
			var parsedVars any
			if err := json.Unmarshal(varsJSON, &parsedVars); err != nil {
				return fmt.Errorf("parsing variables JSON: %w", err)
			}

			body := map[string]any{
				"operationName": "WorkspaceTrendingVisualFormats",
				"query": `query WorkspaceTrendingVisualFormats($workspaceId: ID!, $limit: Int) {
  workspaceV2(workspaceId: $workspaceId) {
    id
    discoverFeed {
      trendingVisualFormats(limit: $limit) {
        formatName
        creativeCount
        thumbnails
        __typename
      }
      __typename
    }
    __typename
  }
}`,
				"variables": parsedVars,
			}

			data, _, err := c.PostWithParams("/graphql", map[string]string{}, body)

			prov := attachFreshness(DataProvenance{Source: "live"}, flags)
			if err != nil {
				return classifyAPIError(err, flags)
			}
			data = extractResponseData(data)

			if wantsHumanTable(cmd.OutOrStdout(), flags) {
				var countItems []json.RawMessage
				if json.Unmarshal(data, &countItems) != nil {
					countItems = []json.RawMessage{data}
				}
				printProvenance(cmd, len(countItems), prov)
			}
			if flags.asJSON || (!isTerminal(cmd.OutOrStdout()) && !flags.csv && !flags.quiet && !flags.plain) {
				filtered := data
				if flags.selectFields != "" {
					filtered = filterFields(filtered, flags.selectFields)
				} else if flags.compact {
					filtered = compactFields(filtered)
				}
				wrapped, wrapErr := wrapWithProvenance(filtered, prov)
				if wrapErr != nil {
					return wrapErr
				}
				return printOutput(cmd.OutOrStdout(), wrapped, true)
			}
			if wantsHumanTable(cmd.OutOrStdout(), flags) {
				var items []map[string]any
				if json.Unmarshal(data, &items) == nil && len(items) > 0 {
					if err := printAutoTable(cmd.OutOrStdout(), items); err != nil {
						return err
					}
					if len(items) >= 25 {
						fmt.Fprintf(os.Stderr, "\nShowing %d results. To narrow: add --limit, --json --select, or filter flags.\n", len(items))
					}
					return nil
				}
			}
			return printOutputWithFlags(cmd.OutOrStdout(), data, flags)
		},
	}

	cmd.Flags().StringVar(&brand, "brand", "", "Workspace name to fuzzy-match")
	cmd.Flags().StringVar(&workspaceID, "workspace-id", "", "Motion workspace ID (overrides --brand)")

	return cmd
}
