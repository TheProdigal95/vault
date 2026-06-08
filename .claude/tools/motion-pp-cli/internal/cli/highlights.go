// Copyright 2026 theprodigal95. Licensed under Apache-2.0. See LICENSE.

package cli

import (
	"encoding/json"
	"fmt"
	"os"

	"github.com/spf13/cobra"
)

func newHighlightsCmd(flags *rootFlags) *cobra.Command {
	var brand, workspaceID, reportID, reportName string
	var highlightsOnly, opportunitiesOnly bool

	cmd := &cobra.Command{
		Use:   "highlights",
		Short: "Fetches Motion's CreativeHighlights with withOpportunities=true",
		Long: `Fetches Motion's CreativeHighlights with withOpportunities=true.

Highlights = creatives Motion's AI considers top performers worth doubling down on.
Opportunities = creatives that are underperforming but show potential signal worth fixing.

Use at end-of-batch to decide what to scale, fix, or kill.`,
		Example: `  motion-pp-cli highlights --brand lifeforce
  motion-pp-cli highlights --brand lifeforce --opportunities-only
  motion-pp-cli highlights --brand lifeforce --highlights-only
  motion-pp-cli highlights --brand lifeforce --json`,
		RunE: func(cmd *cobra.Command, args []string) error {
			if dryRunOK(flags) {
				return nil
			}

			// Resolve workspace ID
			wsID, err := resolveWorkspaceID(flags, brand, workspaceID)
			if err != nil {
				return err
			}

			// Resolve report ID (optional)
			rptID := reportID
			if rptID == "" && reportName != "" {
				resolved, err := resolveReportID(flags, wsID, reportName)
				if err != nil {
					return err
				}
				rptID = resolved
			}

			// We need a dataSourceId. If we have a report ID, fetch its config
			// to get the data source. Otherwise, fetch from workspace data sources.
			dataSourceID, err := resolveDataSourceID(flags, wsID, rptID)
			if err != nil {
				return err
			}

			c, err := flags.newClient()
			if err != nil {
				return err
			}

			vars := map[string]any{
				"dataSourceId":     dataSourceID,
				"leaderBoardLimit": 10,
				"limit":            4,
				"liveResult":       false,
				"offset":           0,
				"trendType":        "SCALING",
				"withLeaderBoard":  true,
				"withOpportunities": true,
				"withOverview":     true,
				"withTrends":       true,
			}

			// Filter flags
			if highlightsOnly {
				vars["withOpportunities"] = false
			}
			if opportunitiesOnly {
				vars["withLeaderBoard"] = false
				vars["withOverview"] = false
				vars["withTrends"] = false
			}

			varsJSON, _ := json.Marshal(vars)
			var parsedVars any
			if err := json.Unmarshal(varsJSON, &parsedVars); err != nil {
				return fmt.Errorf("parsing variables JSON: %w", err)
			}

			body := map[string]any{
				"operationName": "CreativeHighlights",
				"query": `query CreativeHighlights($dataSourceId: ID!, $trendType: TrendType = SCALING, $leaderBoardLimit: Int = 10, $offset: Int = 0, $limit: Int = 4, $withOverview: Boolean = false, $withLeaderBoard: Boolean = false, $withTrends: Boolean = false, $withOpportunities: Boolean = false, $liveResult: Boolean = false) {
  CreativeHighlights(dataSourceId: $dataSourceId) {
    startDate
    endDate
    overview(dataSourceId: $dataSourceId, liveResult: $liveResult) @include(if: $withOverview) {
      metrics(dataSourceId: $dataSourceId) {
        metric {
          metric
          isCustomConversion
          isInversePerformance
          value
          __typename
        }
        difference
        previousPeriodValue
        __typename
      }
      reportPercentCompletion
      lastCachedTime
      creativesLaunched
      __typename
    }
    leaderBoard(dataSourceId: $dataSourceId, liveResult: $liveResult) @include(if: $withLeaderBoard) {
      totalCount
      creatives(offset: $offset, limit: $leaderBoardLimit) {
        rank {
          position
          difference
          __typename
        }
        weeks
        creative {
          ad {
            ...FacebookAdV2Fields
            __typename
          }
          numberOfAds
          title
          creativeAssetId
          __typename
        }
        metrics {
          metric {
            metric
            isCustomConversion
            isInversePerformance
            value
            __typename
          }
          difference
          previousPeriodValue
          __typename
        }
        __typename
      }
      reportPercentCompletion
      lastCachedTime
      __typename
    }
    trends(dataSourceId: $dataSourceId, type: $trendType, liveResult: $liveResult) @include(if: $withTrends) {
      totalCounts {
        SCALING
        DESCALING
        NEW
        PAUSED
        __typename
      }
      creatives(offset: $offset, limit: $limit) {
        ad {
          ...FacebookAdV2Fields
          __typename
        }
        title
        metrics {
          metric {
            metric
            isCustomConversion
            isInversePerformance
            value
            __typename
          }
          difference
          previousPeriodValue
          __typename
        }
        creativeAssetId
        __typename
      }
      reportPercentCompletion
      lastCachedTime
      __typename
    }
    opportunities(dataSourceId: $dataSourceId) @include(if: $withOpportunities) {
      totalCount
      opportunities(dataSourceId: $dataSourceId, offset: $offset, limit: $limit) {
        ...OpportunityPageFragment
        __typename
      }
      __typename
    }
    __typename
  }
}

fragment FacebookAdV2Fields on FacebookAdV2 {
  _id
  modified
  created
  dataSourceId
  adId
  adsetId
  campaignId
  adName
  adsetName
  campaignName
  status
  adType
  effectivePostAdType
  thumbnailUrl
  lastSync
  createdOnFacebook
  updatedOnFacebook
  publisherPlatforms
  audienceNetworkPositions
  messengerPositions
  instagramPositions
  facebookPositions
  adText
  adTexts {
    text
    __typename
  }
  title
  titles {
    text
    __typename
  }
  description
  descriptions {
    text
    __typename
  }
  imageUrl
  images {
    creativeProcessingStatus
    hash
    url
    name
    creativeAssetId: caImg
    supportedPlacements
    __typename
  }
  landingPageUrl
  landingPageUrls {
    landingPageUrl
    __typename
  }
  isDynamicCreative
  isMultiCreative
  thumbnailUrl
  urlTags {
    utm_campaign
    utm_content
    utm_term
    utm_source
    utm_medium
    __typename
  }
  videoUrl
  videoAssetUrl
  videoId
  videoThumbnailUrl
  videos {
    creativeProcessingStatus
    videoAssetUrl
    id
    url
    thumbnailUrl
    name
    creativeAssetId: caVid
    supportedPlacements
    __typename
  }
  cards {
    videoId
    imageUrl
    videoAssetUrl
    videoUrl
    title
    description
    __typename
  }
  postId
  postUrl
  postCreativeAssetId
  imageCreativeAssetId
  videoCreativeAssetId
  carouselCreativeAssetId
  multiCreativeCreativeAssetId
  primaryCreativeAssetIds
  isActive
  creativeId
  creativeAssetId
  creativeProcessingStatus
  isFlexibleAd
  sourcePostId
  __typename
}

fragment OpportunityPageFragment on Opportunity {
  id
  creativeAssetThumbnailUrl
  adTitle
  adStatus
  assignedDate
  type
  description
  status
  creativeAssetId
  dataSource {
    id
    lastAdSync
    __typename
  }
  __typename
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
	cmd.Flags().StringVar(&reportID, "report-id", "", "Motion report ID (overrides --report-name)")
	cmd.Flags().StringVar(&reportName, "report-name", "", "Report name to fuzzy-match")
	cmd.Flags().BoolVar(&highlightsOnly, "highlights-only", false, "Show only highlight signals")
	cmd.Flags().BoolVar(&opportunitiesOnly, "opportunities-only", false, "Show only opportunity signals")

	return cmd
}

// resolveDataSourceID finds the data source ID for a workspace. If a report ID
// is provided, fetches the report config to get its data source. Otherwise,
// queries the workspace's data sources directly.
func resolveDataSourceID(flags *rootFlags, workspaceID, reportID string) (string, error) {
	c, err := flags.newClient()
	if err != nil {
		return "", err
	}

	// If we have a report, get data source from report config
	if reportID != "" {
		report, err := fetchTopAdsReportConfig(flags, workspaceID, reportID)
		if err != nil {
			return "", fmt.Errorf("fetching report config for data source: %w", err)
		}
		if report.DataSource != "" {
			return report.DataSource, nil
		}
	}

	// Fall back to querying workspace data sources
	body := map[string]any{
		"operationName": "DataSourcesV2",
		"query": `query DataSourcesV2($workspaceId: ID!) {
  dataSourcesV2(workspaceId: $workspaceId) {
    id
    name
    platform
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
			DataSourcesV2 []struct {
				ID       string `json:"id"`
				Name     string `json:"name"`
				Platform string `json:"platform"`
			} `json:"dataSourcesV2"`
		} `json:"data"`
	}
	if err := json.Unmarshal(data, &resp); err != nil {
		return "", fmt.Errorf("parsing data sources response: %w", err)
	}

	if len(resp.Data.DataSourcesV2) == 0 {
		return "", fmt.Errorf("no data sources found for workspace %s", workspaceID)
	}

	// Return the first data source (typically there's only one)
	ds := resp.Data.DataSourcesV2[0]
	fmt.Fprintf(os.Stderr, "resolved data source → %q (%s)\n", ds.Name, ds.ID)
	return ds.ID, nil
}
