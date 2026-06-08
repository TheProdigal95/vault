package cli

import (
	"encoding/json"
	"fmt"
	"math"
	"os"
)

const enrichQuery = `query EnrichCreatives($creativeAssetIds: [ID!]!, $datePreset: DatePreset, $startDate: String, $endDate: String) {
  CreativeAssets(creativeAssetIds: $creativeAssetIds) {
    __typename
    id: _id
    firstSpendDate
    lastSpendDate
    weekOverWeekSpend
    ageGenderInsights(datePreset: $datePreset, startDate: $startDate, endDate: $endDate) {
      insights {
        ... on AgeGenderInsights {
          range
          male {
            ... on FacebookMetrics {
              spend impressions purchase_count purchase_value roas
              add_to_cart ctr cpm cost_per_purchase thumbstop_ratio
              clicks_outbound landing_page_views __typename
            }
            __typename
          }
          female {
            ... on FacebookMetrics {
              spend impressions purchase_count purchase_value roas
              add_to_cart ctr cpm cost_per_purchase thumbstop_ratio
              clicks_outbound landing_page_views __typename
            }
            __typename
          }
          __typename
        }
        __typename
      }
      reportPercentCompletion
      hasAsyncReport
      __typename
    }
    videoPlayMetrics(datePreset: $datePreset, startDate: $startDate, endDate: $endDate) {
      insights {
        ... on FacebookVideoMetrics {
          facebookVideoWatchedRatio { time result __typename }
          facebookVideoDropOffRatio { time result __typename }
          __typename
        }
        __typename
      }
      reportPercentCompletion
      hasAsyncReport
      __typename
    }
  }
}`

type enrichmentData struct {
	FirstSpendDate int64            `json:"first_spend_date,omitempty"`
	LastSpendDate  int64            `json:"last_spend_date,omitempty"`
	WoWSpend       float64          `json:"wow_spend"`
	TopDemo        string           `json:"top_demo,omitempty"`
	AgeGender      []ageGenderRow   `json:"age_gender,omitempty"`
	Retention      []retentionPoint `json:"retention,omitempty"`
	DropOff        []retentionPoint `json:"drop_off,omitempty"`
}

type ageGenderRow struct {
	Range  string      `json:"range"`
	Male   demoMetrics `json:"male"`
	Female demoMetrics `json:"female"`
}

type demoMetrics struct {
	Spend            float64 `json:"spend"`
	Impressions      float64 `json:"impressions"`
	Purchases        float64 `json:"purchases"`
	PurchaseValue    float64 `json:"purchase_value"`
	ROAS             float64 `json:"roas"`
	AddToCart        float64 `json:"add_to_cart"`
	CTR              float64 `json:"ctr"`
	CPM              float64 `json:"cpm"`
	CostPerPurchase  float64 `json:"cost_per_purchase"`
	ThumbstopRatio   float64 `json:"thumbstop_ratio"`
	ClicksOutbound   float64 `json:"clicks_outbound"`
	LandingPageViews float64 `json:"landing_page_views"`
}

type retentionPoint struct {
	Time   float64 `json:"time"`
	Result float64 `json:"result"`
}

func fetchCreativeEnrichment(flags *rootFlags, creativeIDs []string, datePreset, startDate, endDate string) (map[string]*enrichmentData, error) {
	if len(creativeIDs) == 0 {
		return nil, nil
	}

	c, err := flags.newClient()
	if err != nil {
		return nil, err
	}

	variables := map[string]any{
		"creativeAssetIds": creativeIDs,
	}
	if datePreset != "" {
		variables["datePreset"] = datePreset
	}
	if startDate != "" {
		variables["startDate"] = startDate
	}
	if endDate != "" {
		variables["endDate"] = endDate
	}

	body := map[string]any{
		"operationName": "EnrichCreatives",
		"query":         enrichQuery,
		"variables":     variables,
	}

	data, _, err := c.PostWithParams("/graphql", map[string]string{}, body)
	if err != nil {
		return nil, fmt.Errorf("enrichment query failed: %w", err)
	}

	var resp struct {
		Data struct {
			CreativeAssets []json.RawMessage `json:"CreativeAssets"`
		} `json:"data"`
		Errors []map[string]any `json:"errors"`
	}
	if err := json.Unmarshal(data, &resp); err != nil {
		return nil, fmt.Errorf("parsing enrichment response: %w", err)
	}
	if len(resp.Errors) > 0 {
		raw, _ := json.Marshal(resp.Errors)
		return nil, fmt.Errorf("enrichment GraphQL errors: %s", raw)
	}

	result := make(map[string]*enrichmentData, len(resp.Data.CreativeAssets))
	for _, raw := range resp.Data.CreativeAssets {
		ed, id := parseEnrichmentAsset(raw)
		if id != "" && ed != nil {
			result[id] = ed
		}
	}
	return result, nil
}

func parseEnrichmentAsset(raw json.RawMessage) (*enrichmentData, string) {
	var asset struct {
		ID             string  `json:"id"`
		FirstSpendDate float64 `json:"firstSpendDate"`
		LastSpendDate  float64 `json:"lastSpendDate"`
		WoWSpend       float64 `json:"weekOverWeekSpend"`
		AgeGender      *struct {
			Insights []struct {
				Range  string         `json:"range"`
				Male   map[string]any `json:"male"`
				Female map[string]any `json:"female"`
			} `json:"insights"`
		} `json:"ageGenderInsights"`
		VideoPlay *struct {
			Insights json.RawMessage `json:"insights"`
		} `json:"videoPlayMetrics"`
	}
	if err := json.Unmarshal(raw, &asset); err != nil {
		return nil, ""
	}

	ed := &enrichmentData{
		FirstSpendDate: int64(asset.FirstSpendDate),
		LastSpendDate:  int64(asset.LastSpendDate),
		WoWSpend:       asset.WoWSpend,
	}

	if asset.AgeGender != nil {
		for _, ins := range asset.AgeGender.Insights {
			row := ageGenderRow{
				Range:  ins.Range,
				Male:   parseDemoMetrics(ins.Male),
				Female: parseDemoMetrics(ins.Female),
			}
			ed.AgeGender = append(ed.AgeGender, row)
		}
		ed.TopDemo = computeTopDemo(ed.AgeGender)
	}

	if asset.VideoPlay != nil && len(asset.VideoPlay.Insights) > 0 {
		ed.Retention, ed.DropOff = parseVideoPlayInsights(asset.VideoPlay.Insights)
	}

	return ed, asset.ID
}

func parseVideoPlayInsights(raw json.RawMessage) (retention, dropOff []retentionPoint) {
	// Try as a single object first (FacebookVideoMetrics)
	var single struct {
		WatchedRatio []retentionPoint `json:"facebookVideoWatchedRatio"`
		DropOffRatio []retentionPoint `json:"facebookVideoDropOffRatio"`
	}
	if err := json.Unmarshal(raw, &single); err == nil && len(single.WatchedRatio) > 0 {
		return single.WatchedRatio, single.DropOffRatio
	}

	// Try as an array (some GraphQL unions serialize as arrays)
	var arr []struct {
		WatchedRatio []retentionPoint `json:"facebookVideoWatchedRatio"`
		DropOffRatio []retentionPoint `json:"facebookVideoDropOffRatio"`
	}
	if err := json.Unmarshal(raw, &arr); err == nil && len(arr) > 0 {
		return arr[0].WatchedRatio, arr[0].DropOffRatio
	}

	return nil, nil
}

func parseDemoMetrics(m map[string]any) demoMetrics {
	if m == nil {
		return demoMetrics{}
	}
	return demoMetrics{
		Spend:            numVal(m, "spend"),
		Impressions:      numVal(m, "impressions"),
		Purchases:        numVal(m, "purchase_count"),
		PurchaseValue:    numVal(m, "purchase_value"),
		ROAS:             numVal(m, "roas"),
		AddToCart:        numVal(m, "add_to_cart"),
		CTR:              numVal(m, "ctr"),
		CPM:              numVal(m, "cpm"),
		CostPerPurchase:  numVal(m, "cost_per_purchase"),
		ThumbstopRatio:   numVal(m, "thumbstop_ratio"),
		ClicksOutbound:   numVal(m, "clicks_outbound"),
		LandingPageViews: numVal(m, "landing_page_views"),
	}
}

func numVal(m map[string]any, key string) float64 {
	v, ok := m[key]
	if !ok {
		return 0
	}
	switch val := v.(type) {
	case float64:
		return val
	case int:
		return float64(val)
	case json.Number:
		f, _ := val.Float64()
		return f
	}
	return 0
}

func computeTopDemo(rows []ageGenderRow) string {
	var topGender, topRange string
	var topSpend float64
	for _, r := range rows {
		if r.Male.Spend > topSpend {
			topSpend = r.Male.Spend
			topGender = "M"
			topRange = r.Range
		}
		if r.Female.Spend > topSpend {
			topSpend = r.Female.Spend
			topGender = "F"
			topRange = r.Range
		}
	}
	if topRange == "" {
		return "—"
	}
	return fmt.Sprintf("%s %s", topGender, topRange)
}

func wowSummary(ed *enrichmentData) string {
	if ed == nil {
		return "—"
	}
	wow := ed.WoWSpend
	if wow == 0 {
		return "—"
	}
	sign := "+"
	if wow < 0 {
		sign = ""
	}
	return fmt.Sprintf("%s%.0f%%", sign, wow)
}

// retentionAt finds the retention value at a given percentage through the video.
// targetPct is 0-100 (e.g. 50 = halfway through the video).
func retentionAt(ed *enrichmentData, targetPct float64) string {
	if ed == nil || len(ed.Retention) < 2 {
		return "—"
	}
	// The retention curve uses absolute seconds for Time.
	// Map targetPct (0-100) to seconds using the last point as video duration.
	maxTime := ed.Retention[len(ed.Retention)-1].Time
	if maxTime <= 0 {
		return "—"
	}
	targetTime := maxTime * targetPct / 100.0

	var closest retentionPoint
	minDist := math.MaxFloat64
	for _, p := range ed.Retention {
		dist := math.Abs(p.Time - targetTime)
		if dist < minDist {
			minDist = dist
			closest = p
		}
	}
	// result is already a percentage (0-100 scale)
	return fmt.Sprintf("%.0f%%", closest.Result)
}

func enrichCreatives(flags *rootFlags, creatives []pullCreative, datePreset, startDate, endDate string) {
	ids := make([]string, 0, len(creatives))
	for _, cr := range creatives {
		if cr.CreativeID != "" {
			ids = append(ids, cr.CreativeID)
		}
	}
	if len(ids) == 0 {
		return
	}

	enrichMap, err := fetchCreativeEnrichment(flags, ids, datePreset, startDate, endDate)
	if err != nil {
		fmt.Fprintf(os.Stderr, "warning: enrichment failed, pull data is still complete: %v\n", err)
		return
	}

	for i := range creatives {
		if ed, ok := enrichMap[creatives[i].CreativeID]; ok {
			creatives[i].Enrichment = ed
		}
	}
}
