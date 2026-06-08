// Copyright 2026 theprodigal95. Licensed under Apache-2.0. See LICENSE.

package cli

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"time"

	"clickup-pp-cli/internal/config"
)

func clickupGET(cfg *config.Config, path string) ([]byte, error) {
	url := cfg.BaseURL + path
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return nil, err
	}
	req.Header.Set("Authorization", cfg.AuthHeader())
	req.Header.Set("Content-Type", "application/json")
	c := &http.Client{Timeout: 30 * time.Second}
	resp, err := c.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()
	data, _ := io.ReadAll(resp.Body)
	if resp.StatusCode != 200 {
		return nil, fmt.Errorf("HTTP %d: %s", resp.StatusCode, truncate(string(data), 200))
	}
	return data, nil
}

func getFirstTeamID(cfg *config.Config) (string, error) {
	data, err := clickupGET(cfg, "/team")
	if err != nil {
		return "", err
	}
	var r struct {
		Teams []struct {
			ID string `json:"id"`
		} `json:"teams"`
	}
	if err := json.Unmarshal(data, &r); err != nil {
		return "", err
	}
	if len(r.Teams) == 0 {
		return "", fmt.Errorf("no teams found")
	}
	return r.Teams[0].ID, nil
}

func getSpaceIDs(cfg *config.Config, teamID string) ([]string, error) {
	data, err := clickupGET(cfg, fmt.Sprintf("/team/%s/space?archived=false", teamID))
	if err != nil {
		return nil, err
	}
	var r struct {
		Spaces []struct {
			ID string `json:"id"`
		} `json:"spaces"`
	}
	if err := json.Unmarshal(data, &r); err != nil {
		return nil, err
	}
	ids := make([]string, len(r.Spaces))
	for i, s := range r.Spaces {
		ids[i] = s.ID
	}
	return ids, nil
}

func getFolderIDs(cfg *config.Config, spaceID string) ([]string, error) {
	data, err := clickupGET(cfg, fmt.Sprintf("/space/%s/folder?archived=false", spaceID))
	if err != nil {
		return nil, err
	}
	var r struct {
		Folders []struct {
			ID string `json:"id"`
		} `json:"folders"`
	}
	if err := json.Unmarshal(data, &r); err != nil {
		return nil, err
	}
	ids := make([]string, len(r.Folders))
	for i, f := range r.Folders {
		ids[i] = f.ID
	}
	return ids, nil
}

func getFolderListIDs(cfg *config.Config, folderID string) (map[string]string, error) {
	data, err := clickupGET(cfg, fmt.Sprintf("/folder/%s/list?archived=false", folderID))
	if err != nil {
		return nil, err
	}
	var r struct {
		Lists []struct {
			ID   string `json:"id"`
			Name string `json:"name"`
		} `json:"lists"`
	}
	if err := json.Unmarshal(data, &r); err != nil {
		return nil, err
	}
	m := map[string]string{}
	for _, l := range r.Lists {
		m[l.Name] = l.ID
	}
	return m, nil
}

func getSpaceListIDs(cfg *config.Config, spaceID string) (map[string]string, error) {
	data, err := clickupGET(cfg, fmt.Sprintf("/space/%s/list?archived=false", spaceID))
	if err != nil {
		return nil, err
	}
	var r struct {
		Lists []struct {
			ID   string `json:"id"`
			Name string `json:"name"`
		} `json:"lists"`
	}
	if err := json.Unmarshal(data, &r); err != nil {
		return nil, err
	}
	m := map[string]string{}
	for _, l := range r.Lists {
		m[l.Name] = l.ID
	}
	return m, nil
}
