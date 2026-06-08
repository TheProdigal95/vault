// Copyright 2026 theprodigal95. Licensed under Apache-2.0. See LICENSE.

package cli

import (
	"encoding/json"
	"fmt"
	"os"
	"strings"

	"github.com/spf13/cobra"
)

func newAnglesCmd(flags *rootFlags) *cobra.Command {
	var brand, workspaceID, reportID, reportName string

	cmd := &cobra.Command{
		Use:   "angles",
		Short: "Fetches Motion's MessagingAngleAnalysis",
		Long:  "Fetches Motion's MessagingAngleAnalysis — which angles (pain/agitation, social proof, aspiration, mechanism, etc.) are dominating spend vs underperforming. Use before batch planning to pick angles worth briefing.",
		Example: `  motion-pp-cli angles --brand lifeforce
  motion-pp-cli angles --brand lifeforce --report-name "Top 30 Day"
  motion-pp-cli angles --workspace-id <id>
  motion-pp-cli angles --brand lifeforce --json`,
		RunE: func(cmd *cobra.Command, args []string) error {
			if dryRunOK(flags) {
				return nil
			}

			// Resolve workspace ID
			wsID, err := resolveWorkspaceID(flags, brand, workspaceID)
			if err != nil {
				return err
			}

			// Resolve report ID (optional — angles uses workspace-level data,
			// but report context can narrow scope)
			rptID := reportID
			if rptID == "" && reportName != "" {
				resolved, err := resolveReportID(flags, wsID, reportName)
				if err != nil {
					return err
				}
				rptID = resolved
			}

			c, err := flags.newClient()
			if err != nil {
				return err
			}

			// Build the GraphQL variables
			vars := map[string]any{
				"workspaceId": wsID,
			}
			if rptID != "" {
				vars["reportId"] = rptID
			}
			varsJSON, _ := json.Marshal(vars)

			body := map[string]any{
				"operationName": "GetMessagingAngleAnalysis",
				"query": `query GetMessagingAngleAnalysis($workspaceId: ID!) {
  messagingAngleAnalysis(workspaceId: $workspaceId) {
    topAngles {
      angleName
      adCount
      exampleAdId
      exampleThumbnailUrl
      exampleCreativeAssetIds
      description
      color
      fontColor
      spend
      weekOverWeekSpendRatio
      spendState
      adIds
      creativesLaunchedLast6Months
      highPerformerCount
      totalCreativesAllTime
      monthlyChartData {
        month
        year
        totalCreatives
        currentlyLive
        allTimeWinners
        __typename
      }
      allTimeWinnerCreativeIds
      oldestCreativeDate
      __typename
    }
    recentlyLaunched {
      angleName
      adCount
      exampleAdId
      exampleThumbnailUrl
      exampleCreativeAssetIds
      description
      color
      fontColor
      spend
      weekOverWeekSpendRatio
      spendState
      adIds
      creativesLaunchedLast6Months
      highPerformerCount
      totalCreativesAllTime
      monthlyChartData {
        month
        year
        totalCreatives
        currentlyLive
        allTimeWinners
        __typename
      }
      allTimeWinnerCreativeIds
      oldestCreativeDate
      __typename
    }
    hasData
    spendThreshold90thPercentile
    totalCreativesLast6Months
    __typename
  }
}`,
			}
			var parsedVars any
			if err := json.Unmarshal(varsJSON, &parsedVars); err != nil {
				return fmt.Errorf("parsing variables JSON: %w", err)
			}
			body["variables"] = parsedVars

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
	cmd.Flags().StringVar(&reportID, "report-id", "", "Motion report ID (overrides --report-name)")
	cmd.Flags().StringVar(&reportName, "report-name", "", "Report name to fuzzy-match")

	return cmd
}

// resolveWorkspaceID resolves a workspace ID from either a direct --workspace-id
// flag or by fuzzy-matching --brand against the organization's workspaces.
func resolveWorkspaceID(flags *rootFlags, brand, workspaceID string) (string, error) {
	if workspaceID != "" {
		return workspaceID, nil
	}
	if brand == "" {
		return "", usageErr(fmt.Errorf("either --brand or --workspace-id is required"))
	}

	c, err := flags.newClient()
	if err != nil {
		return "", err
	}

	// Query organization workspaces
	body := map[string]any{
		"operationName": "QueryOrganizationWorkspaces",
		"query": `query QueryOrganizationWorkspaces($id: ID!) {
  organization: organizationV2(id: $id) {
    id
    workspaces {
      id
      name
      __typename
    }
    __typename
  }
}`,
		"variables": map[string]any{
			"id": "6214fe5e1ccc60d23897d87b",
		},
	}

	data, _, err := c.PostWithParams("/graphql", map[string]string{}, body)
	if err != nil {
		return "", classifyAPIError(err, flags)
	}

	var resp struct {
		Data struct {
			Organization struct {
				Workspaces []struct {
					ID   string `json:"id"`
					Name string `json:"name"`
				} `json:"workspaces"`
			} `json:"organization"`
		} `json:"data"`
	}
	if err := json.Unmarshal(data, &resp); err != nil {
		return "", fmt.Errorf("parsing workspaces response: %w", err)
	}

	brandLower := strings.ToLower(brand)
	var bestID, bestName string
	bestDist := -1

	for _, ws := range resp.Data.Organization.Workspaces {
		wsLower := strings.ToLower(ws.Name)
		// Exact match
		if wsLower == brandLower {
			return ws.ID, nil
		}
		// Contains match
		if strings.Contains(wsLower, brandLower) || strings.Contains(brandLower, wsLower) {
			if bestDist < 0 || len(ws.Name) < bestDist {
				bestID = ws.ID
				bestName = ws.Name
				bestDist = len(ws.Name)
			}
		}
	}

	// Levenshtein fallback
	if bestID == "" {
		for _, ws := range resp.Data.Organization.Workspaces {
			dist := levenshteinDistance(strings.ToLower(ws.Name), brandLower)
			threshold := len(brandLower) / 3
			if threshold < 2 {
				threshold = 2
			}
			if dist <= threshold && (bestDist < 0 || dist < bestDist) {
				bestID = ws.ID
				bestName = ws.Name
				bestDist = dist
			}
		}
	}

	if bestID == "" {
		names := make([]string, 0, len(resp.Data.Organization.Workspaces))
		for _, ws := range resp.Data.Organization.Workspaces {
			names = append(names, ws.Name)
		}
		return "", fmt.Errorf("no workspace matching %q; available: %s", brand, strings.Join(names, ", "))
	}

	fmt.Fprintf(os.Stderr, "resolved --brand %q → workspace %q (%s)\n", brand, bestName, bestID)
	return bestID, nil
}

// resolveReportID resolves a report ID from a fuzzy report name by querying
// the workspace's folders and reports.
func resolveReportID(flags *rootFlags, workspaceID, reportName string) (string, error) {
	c, err := flags.newClient()
	if err != nil {
		return "", err
	}

	body := map[string]any{
		"operationName": "WorkspaceFoldersAndReports",
		"query": `query WorkspaceFoldersAndReports($workspaceId: ID!) {
  workspace: workspaceV2(workspaceId: $workspaceId) {
    id
    folders {
      __typename
      id
      name
      parentId
      isDefault
      reports {
        __typename
        id
        emoji
        name
        type
        dataSource {
          __typename
          id
        }
        ... on TopReportV2 {
          groupBy
          __typename
        }
        isAutoGenerated
      }
    }
    __typename
  }
}`,
		"variables": map[string]any{
			"workspaceId": workspaceID,
		},
	}

	data, _, err := c.PostWithParams("/graphql", map[string]string{}, body)
	if err != nil {
		return "", classifyAPIError(err, flags)
	}

	var resp struct {
		Data struct {
			Workspace struct {
				Folders []struct {
					Reports []struct {
						ID   string `json:"id"`
						Name string `json:"name"`
					} `json:"reports"`
				} `json:"folders"`
			} `json:"workspace"`
		} `json:"data"`
	}
	if err := json.Unmarshal(data, &resp); err != nil {
		return "", fmt.Errorf("parsing folders/reports response: %w", err)
	}

	nameLower := strings.ToLower(reportName)
	var bestID, bestName string
	bestDist := -1
	var allNames []string

	for _, folder := range resp.Data.Workspace.Folders {
		for _, report := range folder.Reports {
			allNames = append(allNames, report.Name)
			rptLower := strings.ToLower(report.Name)
			// Exact match
			if rptLower == nameLower {
				return report.ID, nil
			}
			// Contains match
			if strings.Contains(rptLower, nameLower) || strings.Contains(nameLower, rptLower) {
				if bestDist < 0 || len(report.Name) < bestDist {
					bestID = report.ID
					bestName = report.Name
					bestDist = len(report.Name)
				}
			}
		}
	}

	// Levenshtein fallback
	if bestID == "" {
		for _, folder := range resp.Data.Workspace.Folders {
			for _, report := range folder.Reports {
				dist := levenshteinDistance(strings.ToLower(report.Name), nameLower)
				threshold := len(nameLower) / 3
				if threshold < 2 {
					threshold = 2
				}
				if dist <= threshold && (bestDist < 0 || dist < bestDist) {
					bestID = report.ID
					bestName = report.Name
					bestDist = dist
				}
			}
		}
	}

	if bestID == "" {
		return "", fmt.Errorf("no report matching %q; available: %s", reportName, strings.Join(allNames, ", "))
	}

	fmt.Fprintf(os.Stderr, "resolved --report-name %q → report %q (%s)\n", reportName, bestName, bestID)
	return bestID, nil
}
