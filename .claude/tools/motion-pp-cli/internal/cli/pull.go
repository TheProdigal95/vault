// Copyright 2026 theprodigal95. Licensed under Apache-2.0. See LICENSE.

package cli

import (
	"database/sql"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"net/url"
	"os"
	"regexp"
	"strconv"
	"strings"
	"time"

	"github.com/spf13/cobra"
	_ "modernc.org/sqlite"
)

const topAdsReportQuery = `query TopAdsReport($reportId: ID!, $workspaceId: ID!) {
  TopAdsReport(reportId: $reportId, workspaceId: $workspaceId) {
    _id
    created
    modified
    membership {
      firstName
      lastName
      email
      __typename
    }
    lastEditor {
      firstName
      lastName
      email
      __typename
    }
    workspace
    name
    description
    emoji
    dataSource
    reportType
    reportFolder
    filters {
      field
      type
      value
      values
      metric
      customConversionId
      namingConventionId
      glossaryCategoryId
      __typename
    }
    clickAttributionWindow
    viewAttributionWindow
    displayMetrics {
      ...selectedMetricFields
      __typename
    }
    cardMetrics {
      ...selectedMetricFields
      __typename
    }
    barMetrics {
      metric {
        ...selectedMetricFields
        __typename
      }
      __typename
    }
    lineMetrics {
      metric {
        ...selectedMetricFields
        __typename
      }
      __typename
    }
    selectedChart
    groupAdsBy
    selectedDisplayMetricsPreset
    numberOfGroupsSelected
    comparisonRangePreset
    sortingField {
      ...selectedMetricFields
      __typename
    }
    sortDescending
    colorHighlightEnabled
    colorLowlightEnabled
    datePreset
    startDate
    endDate
    timeIncrement
    sortOrder
    tagsColumnEnabled
    adStatusColumnEnabled
    adStatusCardChartEnabled
    adLengthColumnEnabled
    adLengthCardChartEnabled
    adsPerformanceTagsColumnEnabled
    adsPerformanceTagsCardChartEnabled
    __typename
  }
}

fragment selectedMetricFields on TSelectedMetric {
  name
  field
  isCustomConversionCount
  isCustomConversionValue
  isCustomConversionCost
  isCustomConversionRate
  isCustomConversionROAS
  isCustomConversionPurchase
  glossaryCategoryId
  __typename
}`

const createPullHistorySQL = `CREATE TABLE IF NOT EXISTS pull_history (
	id TEXT PRIMARY KEY,
	workspace_id TEXT NOT NULL,
	report_id TEXT NOT NULL,
	pulled_at DATETIME NOT NULL,
	rank INTEGER NOT NULL,
	creative_id TEXT NOT NULL,
	creative_name TEXT NOT NULL,
	cdn_url TEXT,
	spend REAL,
	roas REAL,
	ctr REAL,
	cpp REAL,
	purchases INTEGER,
	data_json TEXT
)`

// pullCreative holds the data we care about from one creative in the report response.
type pullCreative struct {
	Rank       int
	CreativeID string
	Name       string
	CDNURL     string
	Spend      float64
	ROAS       float64
	CTR        float64
	CPP        float64
	Purchases  int
	ShareURL   string
	DataJSON   string

	Enrichment *enrichmentData `json:"enrichment,omitempty"`
}

type topAdsReportConfig struct {
	ID                     string           `json:"_id"`
	Name                   string           `json:"name"`
	DataSource             string           `json:"dataSource"`
	DatePreset             string           `json:"datePreset"`
	StartDate              string           `json:"startDate"`
	EndDate                string           `json:"endDate"`
	Filters                json.RawMessage  `json:"filters"`
	ClickAttributionWindow string           `json:"clickAttributionWindow"`
	ViewAttributionWindow  string           `json:"viewAttributionWindow"`
	GroupAdsBy             string           `json:"groupAdsBy"`
	SortingField           json.RawMessage  `json:"sortingField"`
	SortDescending         bool             `json:"sortDescending"`
	DisplayMetrics         []map[string]any `json:"displayMetrics"`
}

type pullOptions struct {
	DatePreset      string
	StartDate       string
	EndDate         string
	Days            int
	DataSourceID    string
	GroupAdsBy      string
	SortField       string
	SortDescending  bool
	SortChanged     bool
	FiltersJSON     string
	IncludeGroupAds bool
	IncludeLinks    bool
	OrganizationID  string
	Origin          string
	PollInterval    time.Duration
	MaxPolls        int
}

func defaultPullOptions() pullOptions {
	return pullOptions{
		PollInterval: 2 * time.Second,
		MaxPolls:     30,
		Origin:       "https://projects.motionapp.com",
	}
}

type resolvedDates struct {
	DatePreset string
	StartDate  string
	EndDate    string
}

// fetchTopCreatives calls Motion's report config query, then fetches actual
// ranked rows through the same insights endpoint used by the report UI.
func fetchTopCreatives(flags *rootFlags, workspaceID, reportID string, topN int, opts pullOptions) ([]pullCreative, *resolvedDates, error) {
	c, err := flags.newClient()
	if err != nil {
		return nil, nil, err
	}

	report, err := fetchTopAdsReportConfig(flags, workspaceID, reportID)
	if err != nil {
		return nil, nil, err
	}

	body, err := buildInsightsRequest(report, reportID, topN, opts, time.Now())
	if err != nil {
		return nil, nil, err
	}
	dates := &resolvedDates{
		DatePreset: stringValue(body["datePreset"]),
		StartDate:  stringValue(body["startDate"]),
		EndDate:    stringValue(body["endDate"]),
	}
	linkRange := linkDateRange{DatePreset: dates.DatePreset, StartDate: dates.StartDate, EndDate: dates.EndDate}
	linkFilters := opts.FiltersJSON
	if linkFilters == "" && len(report.Filters) > 0 && string(report.Filters) != "null" && string(report.Filters) != "[]" {
		linkFilters = string(report.Filters)
	}

	var lastProgress int
	for poll := 0; poll <= opts.MaxPolls; poll++ {
		data, _, err := c.PostWithParams("/api/v2/insights/getGroupedAdsMetaInsightsV2", map[string]string{}, body)
		if err != nil {
			return nil, nil, classifyAPIError(err, flags)
		}

		creatives, progress, traceID, complete, err := parseInsightsResponse(data, topN)
		if err != nil {
			return nil, nil, err
		}
		if complete {
			if opts.IncludeLinks {
				if opts.OrganizationID == "" {
					return nil, nil, fmt.Errorf("--organization-id is required when --include-links is set")
				}
				for i := range creatives {
					creatives[i].ShareURL = buildCreativeShareURL(opts.Origin, opts.OrganizationID, workspaceID, creatives[i].CreativeID, linkRange, linkFilters)
				}
			}
			return creatives, dates, nil
		}
		lastProgress = progress
		if traceID == "" {
			return nil, nil, fmt.Errorf("insights report still processing (%d%%) but response did not include reportTraceId", progress)
		}
		body["reportTraceId"] = traceID
		if poll < opts.MaxPolls {
			time.Sleep(opts.PollInterval)
		}
	}

	return nil, nil, fmt.Errorf("insights report did not finish after %d polls; last progress %d%%", opts.MaxPolls, lastProgress)
}

func fetchTopAdsReportConfig(flags *rootFlags, workspaceID, reportID string) (*topAdsReportConfig, error) {
	c, err := flags.newClient()
	if err != nil {
		return nil, err
	}

	body := map[string]any{
		"operationName": "TopAdsReport",
		"query":         topAdsReportQuery,
		"variables": map[string]any{
			"reportId":    reportID,
			"workspaceId": workspaceID,
		},
	}

	data, _, err := c.PostWithParams("/graphql", map[string]string{}, body)
	if err != nil {
		return nil, classifyAPIError(err, flags)
	}

	var gqlResp struct {
		Data struct {
			TopAdsReport topAdsReportConfig `json:"TopAdsReport"`
		} `json:"data"`
		Errors []map[string]any `json:"errors"`
	}
	if err := json.Unmarshal(data, &gqlResp); err != nil {
		return nil, fmt.Errorf("parsing TopAdsReport response: %w", err)
	}
	if len(gqlResp.Errors) > 0 {
		raw, _ := json.Marshal(gqlResp.Errors)
		return nil, fmt.Errorf("TopAdsReport returned GraphQL errors: %s", raw)
	}
	if gqlResp.Data.TopAdsReport.ID == "" {
		return nil, fmt.Errorf("TopAdsReport response did not include a report object")
	}
	return &gqlResp.Data.TopAdsReport, nil
}

func buildInsightsRequest(report *topAdsReportConfig, reportID string, topN int, opts pullOptions, now time.Time) (map[string]any, error) {
	dataSourceID := firstNonEmpty(opts.DataSourceID, report.DataSource)
	if dataSourceID == "" {
		return nil, fmt.Errorf("report has no dataSource; pass --data-source-id")
	}

	datePreset, startDate, endDate, err := resolvePullDateRange(report, opts, now)
	if err != nil {
		return nil, err
	}

	pageSize := topN
	if pageSize <= 0 {
		pageSize = 100
	}

	filters, err := rawJSONOrDefault(opts.FiltersJSON, report.Filters, []byte("[]"))
	if err != nil {
		return nil, fmt.Errorf("parsing --filters JSON: %w", err)
	}
	sortingField, err := rawJSONOrDefault("", report.SortingField, nil)
	if err != nil {
		return nil, fmt.Errorf("parsing report sortingField JSON: %w", err)
	}
	if opts.SortField != "" {
		sortingField = map[string]any{
			"__typename":                 "TSelectedMetric",
			"name":                       nil,
			"field":                      opts.SortField,
			"isCustomConversionCount":    false,
			"isCustomConversionValue":    false,
			"isCustomConversionCost":     false,
			"isCustomConversionRate":     false,
			"isCustomConversionROAS":     false,
			"isCustomConversionPurchase": false,
			"glossaryCategoryId":         nil,
		}
	}

	sortDescending := report.SortDescending
	if opts.SortChanged {
		sortDescending = opts.SortDescending
	}

	body := map[string]any{
		"dataSourceId":               dataSourceID,
		"startDate":                  startDate,
		"endDate":                    endDate,
		"filters":                    filters,
		"groupAdsBy":                 firstNonEmpty(opts.GroupAdsBy, report.GroupAdsBy),
		"clickAttributionWindow":     report.ClickAttributionWindow,
		"viewAttributionWindow":      report.ViewAttributionWindow,
		"reportId":                   reportID,
		"sortingField":               sortingField,
		"sortDescending":             sortDescending,
		"includeAdsPerformanceState": false,
		"liveResult":                 false,
		"pageSize":                   pageSize,
		"offset":                     0,
		"includeAggregates":          true,
		"includeGroupAds":            opts.IncludeGroupAds,
		"includeNorthbeam":           false,
		"includeGoogleAnalytics":     false,
	}
	if datePreset != "" {
		body["datePreset"] = datePreset
	}
	return body, nil
}

func resolvePullDateRange(report *topAdsReportConfig, opts pullOptions, now time.Time) (string, string, string, error) {
	if opts.Days > 0 {
		end := now.AddDate(0, 0, -1)
		start := end.AddDate(0, 0, -(opts.Days - 1))
		return "", formatDate(start), formatDate(end), nil
	}

	datePreset := firstNonEmpty(opts.DatePreset, report.DatePreset)
	startDate := firstNonEmpty(opts.StartDate, report.StartDate)
	endDate := firstNonEmpty(opts.EndDate, report.EndDate)
	if startDate != "" && endDate != "" {
		return datePreset, startDate, endDate, nil
	}
	if datePreset == "" {
		return "", "", "", fmt.Errorf("no date range available; pass --date-preset or --start-date and --end-date")
	}

	start, end, ok := datesForPreset(datePreset, now)
	if !ok {
		if startDate == "" || endDate == "" {
			return "", "", "", fmt.Errorf("date preset %q requires explicit --start-date and --end-date", datePreset)
		}
		return datePreset, startDate, endDate, nil
	}
	return datePreset, start, end, nil
}

func datesForPreset(preset string, now time.Time) (string, string, bool) {
	switch preset {
	case "today":
		today := formatDate(now)
		return today, today, true
	case "yesterday":
		yesterday := now.AddDate(0, 0, -1)
		return formatDate(yesterday), formatDate(yesterday), true
	}
	re := regexp.MustCompile(`^last_(\d+)d$`)
	match := re.FindStringSubmatch(preset)
	if len(match) != 2 {
		return "", "", false
	}
	days, err := strconv.Atoi(match[1])
	if err != nil || days <= 0 {
		return "", "", false
	}
	end := now.AddDate(0, 0, -1)
	start := end.AddDate(0, 0, -(days - 1))
	return formatDate(start), formatDate(end), true
}

func formatDate(t time.Time) string {
	return t.Format("2006-01-02")
}

func rawJSONOrDefault(flagValue string, raw json.RawMessage, fallback []byte) (any, error) {
	source := strings.TrimSpace(flagValue)
	if source == "" && len(raw) > 0 && string(raw) != "null" {
		source = string(raw)
	}
	if source == "" && len(fallback) > 0 {
		source = string(fallback)
	}
	if source == "" {
		return nil, nil
	}
	var parsed any
	if err := json.Unmarshal([]byte(source), &parsed); err != nil {
		return nil, err
	}
	return parsed, nil
}

func firstNonEmpty(values ...string) string {
	for _, value := range values {
		if strings.TrimSpace(value) != "" {
			return strings.TrimSpace(value)
		}
	}
	return ""
}

type linkDateRange struct {
	DatePreset string
	StartDate  string
	EndDate    string
}

func buildCreativeShareURL(origin, organizationID, workspaceID, creativeAssetID string, dateRange linkDateRange, filtersJSON string) string {
	origin = strings.TrimRight(firstNonEmpty(origin, "https://projects.motionapp.com"), "/")
	base := fmt.Sprintf("%s/organization/%s/%s/creative/%s",
		origin,
		url.PathEscape(organizationID),
		url.PathEscape(workspaceID),
		url.PathEscape(creativeAssetID),
	)

	var params []string
	if dateRange.StartDate != "" {
		params = append(params, "startDate="+url.QueryEscape(dateRange.StartDate))
	}
	if dateRange.EndDate != "" {
		params = append(params, "endDate="+url.QueryEscape(dateRange.EndDate))
	}
	if dateRange.DatePreset != "" {
		params = append(params, "datePreset="+url.QueryEscape(dateRange.DatePreset))
	}
	if strings.TrimSpace(filtersJSON) != "" && strings.TrimSpace(filtersJSON) != "[]" {
		encoded := base64.StdEncoding.EncodeToString([]byte(filtersJSON))
		params = append(params, "filters="+url.QueryEscape(encoded))
	}
	if len(params) == 0 {
		return base
	}
	return base + "?" + strings.Join(params, "&")
}

func stringValue(v any) string {
	s, _ := v.(string)
	return s
}

func parseInsightsResponse(data []byte, topN int) ([]pullCreative, int, string, bool, error) {
	var resp struct {
		ReportTraceID           string `json:"reportTraceId"`
		ReportPercentCompletion int    `json:"reportPercentCompletion"`
		Data                    struct {
			Insights []map[string]any `json:"insights"`
		} `json:"data"`
	}
	if err := json.Unmarshal(data, &resp); err != nil {
		return nil, 0, "", false, fmt.Errorf("parsing insights response: %w", err)
	}
	if resp.ReportPercentCompletion < 100 || len(resp.Data.Insights) == 0 {
		return nil, resp.ReportPercentCompletion, resp.ReportTraceID, false, nil
	}

	items := resp.Data.Insights
	if topN > 0 && topN < len(items) {
		items = items[:topN]
	}

	creatives := make([]pullCreative, 0, len(items))
	for i, item := range items {
		creatives = append(creatives, parseInsightItem(i+1, item))
	}
	return creatives, resp.ReportPercentCompletion, resp.ReportTraceID, true, nil
}

func parseCreativeItem(rank int, item map[string]any) pullCreative {
	raw, _ := json.Marshal(item)
	pc := pullCreative{
		Rank:     rank,
		DataJSON: string(raw),
	}
	if v, ok := item["_id"].(string); ok {
		pc.CreativeID = v
	} else if v, ok := item["id"].(string); ok {
		pc.CreativeID = v
	}
	if v, ok := item["name"].(string); ok {
		pc.Name = v
	}
	// CDN URL — try common field names
	for _, key := range []string{"cdnUrl", "cdn_url", "url", "assetUrl", "asset_url", "mediaUrl", "media_url"} {
		if v, ok := item[key].(string); ok && v != "" {
			pc.CDNURL = v
			break
		}
	}
	// Metrics — Motion uses various field shapes
	if v, ok := item["spend"].(float64); ok {
		pc.Spend = v
	}
	if v, ok := item["roas"].(float64); ok {
		pc.ROAS = v
	}
	if v, ok := item["ctr"].(float64); ok {
		pc.CTR = v
	}
	if v, ok := item["cpp"].(float64); ok {
		pc.CPP = v
	}
	if v, ok := item["purchases"].(float64); ok {
		pc.Purchases = int(v)
	}
	return pc
}

func parseInsightItem(rank int, item map[string]any) pullCreative {
	pc := parseCreativeItem(rank, item)
	if pc.CreativeID == "" {
		pc.CreativeID = stringField(item, "creativeAssetId", "creativeKey", "groupKey")
	}

	ad, _ := item["ad"].(map[string]any)
	if pc.CreativeID == "" && ad != nil {
		pc.CreativeID = stringField(ad, "creativeAssetId", "multiCreativeCreativeAssetId", "imageCreativeAssetId", "videoCreativeAssetId", "_id", "id")
	}
	if pc.Name == "" && ad != nil {
		pc.Name = stringField(ad, "adName", "name", "title")
	}
	if pc.CDNURL == "" && ad != nil {
		pc.CDNURL = stringField(ad, "videoAssetUrl", "videoUrl", "imageUrl", "largeThumbnailUrl", "thumbnailUrl")
		if pc.CDNURL == "" {
			pc.CDNURL = firstAssetURL(ad, "videos", "videoAssetUrl", "url", "thumbnailUrl")
		}
		if pc.CDNURL == "" {
			pc.CDNURL = firstAssetURL(ad, "images", "url")
		}
	}

	metrics, _ := item["insights"].(map[string]any)
	if metrics != nil {
		pc.Spend = numberField(metrics, "spend")
		pc.ROAS = numberField(metrics, "roas")
		pc.CTR = numberField(metrics, "ctr")
		pc.CPP = numberField(metrics, "cost_per_purchase", "cpp")
		pc.Purchases = int(numberField(metrics, "purchases", "purchase_count", "offsite_purchases", "onsite_purchases"))
	}
	return pc
}

func stringField(item map[string]any, keys ...string) string {
	for _, key := range keys {
		if value, ok := item[key].(string); ok && value != "" {
			return value
		}
	}
	return ""
}

func numberField(item map[string]any, keys ...string) float64 {
	for _, key := range keys {
		switch value := item[key].(type) {
		case float64:
			return value
		case int:
			return float64(value)
		case json.Number:
			f, _ := value.Float64()
			return f
		}
	}
	return 0
}

func firstAssetURL(ad map[string]any, arrayKey string, urlKeys ...string) string {
	items, _ := ad[arrayKey].([]any)
	for _, item := range items {
		m, _ := item.(map[string]any)
		if m == nil {
			continue
		}
		if url := stringField(m, urlKeys...); url != "" {
			return url
		}
	}
	return ""
}

func openPullDB(flags *rootFlags) (*sql.DB, error) {
	dbPath := defaultDBPath("motion-pp-cli")
	db, err := sql.Open("sqlite", dbPath+"?_journal_mode=WAL&_synchronous=NORMAL&_busy_timeout=5000&_foreign_keys=ON")
	if err != nil {
		return nil, fmt.Errorf("opening pull history DB: %w", err)
	}
	if _, err := db.Exec(createPullHistorySQL); err != nil {
		db.Close()
		return nil, fmt.Errorf("creating pull_history table: %w", err)
	}
	return db, nil
}

func newPullCmd(flags *rootFlags) *cobra.Command {
	var workspaceID, reportID string
	var topN int
	var noEnrich bool
	opts := defaultPullOptions()

	cmd := &cobra.Command{
		Use:   "pull",
		Short: "Pull top creatives from a Motion report and store history",
		Long:  "Fetch ranked rows from a Motion TopAdsReport using the same insights endpoint as the UI, enrich with demographics (age×gender), video retention curves, and spend trend data, then persist into a local pull_history table for delta and trend analysis.",
		Example: `  motion-pp-cli pull --workspace-id <id> --report-id <id>
  motion-pp-cli pull --workspace-id <id> --report-id <id> --date-preset last_7d --top 20 --json
  motion-pp-cli pull --workspace-id <id> --report-id <id> --days 3
  motion-pp-cli pull --workspace-id <id> --report-id <id> --no-enrich`,
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

			creatives, dates, err := fetchTopCreatives(flags, workspaceID, reportID, topN, opts)
			if err != nil {
				return err
			}

			if !noEnrich && len(creatives) > 0 {
				fmt.Fprintf(os.Stderr, "Enriching %d creatives with demographics, retention, and trend data...\n", len(creatives))
				enrichCreatives(flags, creatives, dates.DatePreset, dates.StartDate, dates.EndDate)
			}

			db, err := openPullDB(flags)
			if err != nil {
				return err
			}
			defer db.Close()

			// Add enrichment column if it doesn't exist yet
			db.Exec(`ALTER TABLE pull_history ADD COLUMN enrichment_json TEXT`)

			pulledAt := time.Now().UTC()
			for _, cr := range creatives {
				id := fmt.Sprintf("%s_%s_%s_%d", workspaceID, reportID, pulledAt.Format("20060102T150405"), cr.Rank)
				var enrichJSON string
				if cr.Enrichment != nil {
					raw, _ := json.Marshal(cr.Enrichment)
					enrichJSON = string(raw)
				}
				_, err := db.Exec(`INSERT OR REPLACE INTO pull_history
					(id, workspace_id, report_id, pulled_at, rank, creative_id, creative_name, cdn_url, spend, roas, ctr, cpp, purchases, data_json, enrichment_json)
					VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
					id, workspaceID, reportID, pulledAt, cr.Rank,
					cr.CreativeID, cr.Name, cr.CDNURL,
					cr.Spend, cr.ROAS, cr.CTR, cr.CPP, cr.Purchases,
					cr.DataJSON, enrichJSON,
				)
				if err != nil {
					fmt.Fprintf(os.Stderr, "warning: could not store creative %q: %v\n", cr.Name, err)
				}
			}

			if flags.asJSON {
				return printJSONFiltered(cmd.OutOrStdout(), creatives, flags)
			}

			if flags.csv {
				type row struct {
					Rank      int     `json:"rank"`
					Name      string  `json:"name"`
					Spend     float64 `json:"spend"`
					ROAS      float64 `json:"roas"`
					CTR       float64 `json:"ctr"`
					CPP       float64 `json:"cpp"`
					Purchases int     `json:"purchases"`
					TopDemo   string  `json:"top_demo,omitempty"`
					WoW       string  `json:"wow,omitempty"`
					Hold50    string  `json:"hold_50,omitempty"`
					ShareURL  string  `json:"share_url,omitempty"`
				}
				rows := make([]row, len(creatives))
				for i, cr := range creatives {
					rows[i] = row{
						cr.Rank, cr.Name, cr.Spend, cr.ROAS, cr.CTR, cr.CPP, cr.Purchases,
						topDemoStr(cr.Enrichment), wowSummary(cr.Enrichment), retentionAt(cr.Enrichment, 50),
						cr.ShareURL,
					}
				}
				raw, _ := json.Marshal(rows)
				return printCSV(cmd.OutOrStdout(), raw)
			}

			// Human table
			hasEnrichment := false
			for _, cr := range creatives {
				if cr.Enrichment != nil {
					hasEnrichment = true
					break
				}
			}

			tw := newTabWriter(cmd.OutOrStdout())
			if hasEnrichment {
				fmt.Fprintf(tw, "%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\n",
					bold("RANK"), bold("NAME"), bold("SPEND"), bold("ROAS"), bold("CTR"), bold("CPP"), bold("PURCH"), bold("TOP DEMO"), bold("WOW"), bold("HOLD@50"))
				for _, cr := range creatives {
					fmt.Fprintf(tw, "%d\t%s\t%.2f\t%.2f\t%.2f%%\t%.2f\t%d\t%s\t%s\t%s\n",
						cr.Rank, truncate(cr.Name, 40), cr.Spend, cr.ROAS, cr.CTR, cr.CPP, cr.Purchases,
						topDemoStr(cr.Enrichment), wowSummary(cr.Enrichment), retentionAt(cr.Enrichment, 50))
				}
			} else {
				fmt.Fprintf(tw, "%s\t%s\t%s\t%s\t%s\t%s\t%s\n",
					bold("RANK"), bold("NAME"), bold("SPEND"), bold("ROAS"), bold("CTR"), bold("CPP"), bold("PURCHASES"))
				for _, cr := range creatives {
					fmt.Fprintf(tw, "%d\t%s\t%.2f\t%.2f\t%.4f\t%.2f\t%d\n",
						cr.Rank, truncate(cr.Name, 40), cr.Spend, cr.ROAS, cr.CTR, cr.CPP, cr.Purchases)
				}
			}
			tw.Flush()
			fmt.Fprintf(os.Stderr, "\n%d creatives pulled and stored.\n", len(creatives))
			return nil
		},
	}

	cmd.Flags().StringVar(&workspaceID, "workspace-id", "", "Motion workspace ID (required)")
	cmd.Flags().StringVar(&reportID, "report-id", "", "Motion report ID (required)")
	cmd.Flags().IntVar(&topN, "top", 10, "Limit to top N creatives (0 = no limit)")
	cmd.Flags().BoolVar(&noEnrich, "no-enrich", false, "Skip demographics, retention, and trend enrichment (faster pull)")
	cmd.Flags().StringVar(&opts.DataSourceID, "data-source-id", "", "Override report data source ID")
	cmd.Flags().StringVar(&opts.DatePreset, "date-preset", "", "Motion date preset, e.g. last_7d, last_14d, last_30d, yesterday, today")
	cmd.Flags().StringVar(&opts.StartDate, "start-date", "", "Custom start date (YYYY-MM-DD)")
	cmd.Flags().StringVar(&opts.EndDate, "end-date", "", "Custom end date (YYYY-MM-DD)")
	cmd.Flags().IntVar(&opts.Days, "days", 0, "Custom trailing day count ending yesterday; overrides --date-preset")
	cmd.Flags().StringVar(&opts.GroupAdsBy, "group-ads-by", "", "Override report grouping, e.g. creative or name")
	cmd.Flags().StringVar(&opts.SortField, "sort-field", "", "Override report sort metric, e.g. spend or motion_capture_attention")
	cmd.Flags().BoolVar(&opts.SortDescending, "sort-descending", true, "Sort descending when --sort-field is used or when explicitly changed")
	cmd.Flags().StringVar(&opts.FiltersJSON, "filters", "", "Override report filters as JSON")
	cmd.Flags().BoolVar(&opts.IncludeGroupAds, "include-group-ads", false, "Include grouped ads in the Motion insights response")
	cmd.Flags().BoolVar(&opts.IncludeLinks, "include-links", false, "Include Motion creative insight copy links in output")
	cmd.Flags().StringVar(&opts.OrganizationID, "organization-id", "", "Motion organization ID (required with --include-links)")
	cmd.Flags().StringVar(&opts.Origin, "origin", opts.Origin, "Motion app origin for generated creative links")
	cmd.Flags().DurationVar(&opts.PollInterval, "poll-interval", opts.PollInterval, "Wait time between async report polls")
	cmd.Flags().IntVar(&opts.MaxPolls, "max-polls", opts.MaxPolls, "Maximum async report polls before failing")
	cmd.PreRun = func(cmd *cobra.Command, args []string) {
		opts.SortChanged = cmd.Flags().Changed("sort-descending")
	}

	return cmd
}

func topDemoStr(ed *enrichmentData) string {
	if ed == nil {
		return "—"
	}
	return ed.TopDemo
}
