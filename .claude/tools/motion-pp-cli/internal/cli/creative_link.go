package cli

import (
	"encoding/json"
	"fmt"
	"time"

	"github.com/spf13/cobra"
)

type creativeLinkRow struct {
	CreativeID string `json:"creative_id"`
	ShareURL   string `json:"share_url"`
}

func newCreativeLinkCmd(flags *rootFlags) *cobra.Command {
	opts := defaultPullOptions()
	var workspaceID string
	var creativeIDs []string

	cmd := &cobra.Command{
		Use:   "creative-link",
		Short: "Build Motion creative insight copy links",
		Long:  "Build the same creative insight URLs that Motion's Copy link button writes to the clipboard.",
		Example: `  motion-pp-cli creative-link --organization-id <org> --workspace-id <workspace> --creative-asset-id <id> --date-preset last_7d
  motion-pp-cli creative-link --organization-id <org> --workspace-id <workspace> --creative-asset-id <id1> --creative-asset-id <id2> --days 3`,
		RunE: func(cmd *cobra.Command, args []string) error {
			if opts.OrganizationID == "" {
				return usageErr(fmt.Errorf("--organization-id is required"))
			}
			if workspaceID == "" {
				return usageErr(fmt.Errorf("--workspace-id is required"))
			}
			if len(creativeIDs) == 0 {
				return usageErr(fmt.Errorf("--creative-asset-id is required"))
			}

			_, startDate, endDate, err := resolvePullDateRange(&topAdsReportConfig{}, opts, time.Now())
			if err != nil {
				return err
			}
			dateRange := linkDateRange{
				DatePreset: opts.DatePreset,
				StartDate:  startDate,
				EndDate:    endDate,
			}

			rows := make([]creativeLinkRow, 0, len(creativeIDs))
			for _, creativeID := range creativeIDs {
				rows = append(rows, creativeLinkRow{
					CreativeID: creativeID,
					ShareURL:   buildCreativeShareURL(opts.Origin, opts.OrganizationID, workspaceID, creativeID, dateRange, opts.FiltersJSON),
				})
			}

			if flags.asJSON {
				return printJSONFiltered(cmd.OutOrStdout(), rows, flags)
			}
			if flags.csv {
				raw, _ := json.Marshal(rows)
				return printCSV(cmd.OutOrStdout(), raw)
			}
			tw := newTabWriter(cmd.OutOrStdout())
			fmt.Fprintf(tw, "%s\t%s\n", bold("CREATIVE_ID"), bold("SHARE_URL"))
			for _, row := range rows {
				fmt.Fprintf(tw, "%s\t%s\n", row.CreativeID, row.ShareURL)
			}
			return tw.Flush()
		},
	}

	cmd.Flags().StringVar(&opts.OrganizationID, "organization-id", "", "Motion organization ID (required)")
	cmd.Flags().StringVar(&workspaceID, "workspace-id", "", "Motion workspace ID (required)")
	cmd.Flags().StringArrayVar(&creativeIDs, "creative-asset-id", nil, "Motion creative asset ID; repeat for multiple creatives")
	cmd.Flags().StringVar(&opts.DatePreset, "date-preset", "", "Motion date preset, e.g. last_7d, last_14d, last_30d, yesterday, today")
	cmd.Flags().StringVar(&opts.StartDate, "start-date", "", "Custom start date (YYYY-MM-DD)")
	cmd.Flags().StringVar(&opts.EndDate, "end-date", "", "Custom end date (YYYY-MM-DD)")
	cmd.Flags().IntVar(&opts.Days, "days", 0, "Custom trailing day count ending yesterday; overrides --date-preset")
	cmd.Flags().StringVar(&opts.FiltersJSON, "filters", "", "Filters JSON to encode into the link")
	cmd.Flags().StringVar(&opts.Origin, "origin", opts.Origin, "Motion app origin for generated creative links")

	return cmd
}
