package cli

import (
	"encoding/json"
	"testing"
	"time"
)

func TestDatesForPresetLastNDays(t *testing.T) {
	now := time.Date(2026, 5, 26, 12, 0, 0, 0, time.UTC)
	start, end, ok := datesForPreset("last_7d", now)
	if !ok {
		t.Fatal("expected last_7d to resolve")
	}
	if start != "2026-05-19" || end != "2026-05-25" {
		t.Fatalf("unexpected range: %s to %s", start, end)
	}

	start, end, ok = datesForPreset("last_30d", now)
	if !ok {
		t.Fatal("expected last_30d to resolve")
	}
	if start != "2026-04-26" || end != "2026-05-25" {
		t.Fatalf("unexpected range: %s to %s", start, end)
	}
}

func TestBuildInsightsRequestUsesReportConfigAndDateOverride(t *testing.T) {
	report := &topAdsReportConfig{
		ID:                     "report-1",
		DataSource:             "data-source-1",
		DatePreset:             "last_14d",
		Filters:                json.RawMessage(`[[]]`),
		ClickAttributionWindow: "7d_click",
		ViewAttributionWindow:  "1d_view",
		GroupAdsBy:             "creative",
		SortingField:           json.RawMessage(`{"__typename":"TSelectedMetric","field":"spend"}`),
		SortDescending:         true,
	}
	now := time.Date(2026, 5, 26, 12, 0, 0, 0, time.UTC)

	body, err := buildInsightsRequest(report, "report-1", 20, pullOptions{DatePreset: "last_7d"}, now)
	if err != nil {
		t.Fatal(err)
	}

	if body["dataSourceId"] != "data-source-1" {
		t.Fatalf("unexpected dataSourceId: %v", body["dataSourceId"])
	}
	if body["datePreset"] != "last_7d" || body["startDate"] != "2026-05-19" || body["endDate"] != "2026-05-25" {
		t.Fatalf("unexpected date payload: %#v", body)
	}
	if body["groupAdsBy"] != "creative" || body["pageSize"] != 20 {
		t.Fatalf("unexpected grouping/page payload: %#v", body)
	}
}

func TestParseInsightsResponseExtractsCreativeRows(t *testing.T) {
	raw := []byte(`{
		"reportPercentCompletion": 100,
		"data": {
			"insights": [{
				"creativeAssetId": "asset-1",
				"ad": {
					"_id": "ad-1",
					"adName": "Winning Creative",
					"thumbnailUrl": "https://example.com/thumb.jpg",
					"videos": [{"videoAssetUrl": "https://example.com/video.mp4"}]
				},
				"insights": {
					"spend": 123.45,
					"roas": 2.5,
					"ctr": 1.2,
					"cost_per_purchase": 45.67,
					"purchase_count": 3
				}
			}]
		}
	}`)

	rows, progress, traceID, complete, err := parseInsightsResponse(raw, 10)
	if err != nil {
		t.Fatal(err)
	}
	if !complete || progress != 100 || traceID != "" {
		t.Fatalf("unexpected progress state: complete=%v progress=%d trace=%q", complete, progress, traceID)
	}
	if len(rows) != 1 {
		t.Fatalf("expected one row, got %d", len(rows))
	}
	row := rows[0]
	if row.CreativeID != "asset-1" || row.Name != "Winning Creative" {
		t.Fatalf("unexpected creative identity: %#v", row)
	}
	if row.Spend != 123.45 || row.ROAS != 2.5 || row.CTR != 1.2 || row.CPP != 45.67 || row.Purchases != 3 {
		t.Fatalf("unexpected metrics: %#v", row)
	}
}

func TestBuildCreativeShareURLMatchesMotionClientShape(t *testing.T) {
	got := buildCreativeShareURL(
		"https://projects.motionapp.com",
		"org-1",
		"workspace-1",
		"creative-1",
		linkDateRange{DatePreset: "last_7d", StartDate: "2026-05-19", EndDate: "2026-05-25"},
		`[{"field":"adType","type":"includes","values":["video"]}]`,
	)

	want := "https://projects.motionapp.com/organization/org-1/workspace-1/creative/creative-1?startDate=2026-05-19&endDate=2026-05-25&datePreset=last_7d&filters=W3siZmllbGQiOiJhZFR5cGUiLCJ0eXBlIjoiaW5jbHVkZXMiLCJ2YWx1ZXMiOlsidmlkZW8iXX1d"
	if got != want {
		t.Fatalf("unexpected share URL:\n got: %s\nwant: %s", got, want)
	}
}
