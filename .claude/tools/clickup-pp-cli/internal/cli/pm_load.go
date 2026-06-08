// Copyright 2026 theprodigal95. Licensed under Apache-2.0. See LICENSE.

package cli

import (
	"bufio"
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"path/filepath"
	"strings"
	"time"

	"clickup-pp-cli/internal/config"
	"github.com/spf13/cobra"
)

// brandListIDs maps vault brand folder names (lower-case) to ClickUp Creative Briefs list IDs.
var brandListIDs = map[string]string{
	"im8":                "901113419033",
	"elevate":            "901104143324",
	"lifeforce":          "901113128100",
	"stellar sleep":      "901113639668",
	"stellar-sleep":      "901113639668",
	"comfort ortho wear": "901113706036",
	"comfort-ortho-wear": "901113706036",
	"comfort ortho":      "901113706036",
}

// teamMembers maps lowercase name fragments to ClickUp user IDs.
var teamMembers = map[string]int{
	"marcelo":  87415563,
	"marcelo acosta": 87415563,
	"kylie":    75585377,
	"kylie mccreary": 75585377,
	"michael":  81508885,
	"michael starr": 81508885,
	"cristina": 75446242,
	"cristina cepeda": 75446242,
	"karra":    87362004,
	"karra worang": 87362004,
	"diksha":   75430705,
	"diksha sharma": 75430705,
}

const (
	dikshaID = 75430705
	karraID  = 87362004
)

// loadedTask holds a parsed task ready to push.
type loadedTask struct {
	Slug        string
	Description string
}

// vaultTaskEntry is what we POST / show.
type vaultTaskEntry struct {
	Name        string
	Description string
	ListID      string
	Assignees   []int
	Status      string
	TaskType    string
}

// resolveStrategistID reads .claude/strategist.json from the vault root
// (detected by walking up from the file's directory).
func resolveStrategistID(vaultRoot string) (int, string, error) {
	p := filepath.Join(vaultRoot, ".claude", "strategist.json")
	data, err := os.ReadFile(p)
	if err != nil {
		return 0, "", fmt.Errorf("strategist.json not found at %s — run setup or pass --strategist-id", p)
	}
	var s struct {
		Name      string `json:"name"`
		ClickupID string `json:"clickup_id"`
	}
	if err := json.Unmarshal(data, &s); err != nil {
		return 0, "", fmt.Errorf("parsing strategist.json: %w", err)
	}
	if s.ClickupID == "" {
		return 0, "", fmt.Errorf("strategist.json missing clickup_id")
	}
	var id int
	fmt.Sscanf(s.ClickupID, "%d", &id)
	return id, s.Name, nil
}

// detectBrand walks up the path looking for a brand folder pattern.
// Vault structure: .../<VaultRoot>/<BrandName>/T###...
func detectBrand(path string) string {
	abs, err := filepath.Abs(path)
	if err != nil {
		return ""
	}
	parts := strings.Split(abs, string(filepath.Separator))
	// Brand is typically the 2nd-to-last dir before the file
	if len(parts) >= 3 {
		return parts[len(parts)-2]
	}
	return ""
}

// parseVaultDoc parses a Scripts.md or Briefs.md file into task entries.
// Slug lines match: "Reach Digital_..."
// Content runs from slug+1 to (but not including) the next slug or an excluded section.
func parseVaultDoc(r io.Reader, isScript bool) []loadedTask {
	var tasks []loadedTask
	scanner := bufio.NewScanner(r)
	scanner.Buffer(make([]byte, 4*1024*1024), 4*1024*1024)

	var current *loadedTask
	var body strings.Builder
	var pastClose bool

	// Sections that mark the end of designer/editor-visible content.
	// We stop capturing after we exit the Close section for scripts.
	endMarkers := []string{
		"## Hook-to-Body Transition Verification",
		"## Hook to Body Transition Verification",
		"### Hook-to-Body Transition Verification",
		"### Hook to Body Transition Verification",
		"## QA",
		"## Internal Notes",
		"### Primary Text",
		"### Media Buying",
	}

	// For scripts: stop after the Close table ends.
	// We detect "Close" heading and set pastClose=true after we see the next ## heading.
	inClose := false

	for scanner.Scan() {
		line := scanner.Text()

		// Detect a new slug line (starts with "Reach Digital_", optionally wrapped in backticks)
		trimmedLine := strings.TrimSpace(line)
		trimmedLine = strings.Trim(trimmedLine, "`")
		if strings.HasPrefix(trimmedLine, "Reach Digital_") {
			// Save the previous task
			if current != nil {
				current.Description = strings.TrimRight(body.String(), "\n")
				tasks = append(tasks, *current)
			}
			current = &loadedTask{Slug: trimmedLine}
			body.Reset()
			pastClose = false
			inClose = false
			continue
		}

		if current == nil {
			continue
		}

		// Check end markers
		isEnd := false
		for _, m := range endMarkers {
			if strings.HasPrefix(strings.TrimSpace(line), m) {
				isEnd = true
				break
			}
		}
		if isEnd {
			pastClose = true
		}

		if pastClose {
			continue
		}

		// For scripts: track whether we've entered and exited the Close section.
		if isScript {
			trimmed := strings.TrimSpace(line)
			if strings.HasPrefix(trimmed, "## Close") || strings.HasPrefix(trimmed, "### Close") {
				inClose = true
			} else if inClose && strings.HasPrefix(trimmed, "## ") && !strings.HasPrefix(trimmed, "## Close") {
				// We exited Close section — stop capturing
				pastClose = true
				continue
			}
		}

		body.WriteString(line)
		body.WriteString("\n")
	}

	// Save last task
	if current != nil {
		current.Description = strings.TrimRight(body.String(), "\n")
		tasks = append(tasks, *current)
	}

	return tasks
}

// resolveTaskTypeFieldID fetches the "Task type" custom field ID from the list.
func resolveTaskTypeFieldID(cfg *config.Config, listID string) (string, map[string]string, error) {
	url := fmt.Sprintf("%s/list/%s/field", cfg.BaseURL, listID)
	req, _ := http.NewRequest("GET", url, nil)
	req.Header.Set("Authorization", cfg.AuthHeader())
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{Timeout: 30 * time.Second}
	resp, err := client.Do(req)
	if err != nil {
		return "", nil, fmt.Errorf("fetching custom fields: %w", err)
	}
	defer resp.Body.Close()
	data, _ := io.ReadAll(resp.Body)

	if resp.StatusCode != 200 {
		return "", nil, fmt.Errorf("fetching fields: HTTP %d: %s", resp.StatusCode, truncate(string(data), 200))
	}

	var result struct {
		Fields []struct {
			ID         string `json:"id"`
			Name       string `json:"name"`
			TypeConfig struct {
				Options []struct {
					ID    string `json:"id"`
					Name  string `json:"name"`
				} `json:"options"`
			} `json:"type_config"`
		} `json:"fields"`
	}
	if err := json.Unmarshal(data, &result); err != nil {
		return "", nil, fmt.Errorf("parsing fields: %w", err)
	}

	for _, f := range result.Fields {
		if strings.EqualFold(f.Name, "task type") {
			// Build option name → option ID map
			opts := map[string]string{}
			for _, o := range f.TypeConfig.Options {
				opts[strings.ToLower(o.Name)] = o.ID
			}
			return f.ID, opts, nil
		}
	}
	return "", nil, nil // no Task type field (not fatal)
}

// fetchTasksByName fetches all tasks in a list and returns a name→{id,url} map.
func fetchTasksByName(cfg *config.Config, listID string) (map[string][2]string, error) {
	result := map[string][2]string{}
	page := 0
	for {
		url := fmt.Sprintf("%s/list/%s/task?page=%d&include_closed=true", cfg.BaseURL, listID, page)
		req, _ := http.NewRequest("GET", url, nil)
		req.Header.Set("Authorization", cfg.AuthHeader())
		client := &http.Client{Timeout: 30 * time.Second}
		resp, err := client.Do(req)
		if err != nil {
			return nil, err
		}
		defer resp.Body.Close()
		data, _ := io.ReadAll(resp.Body)
		if resp.StatusCode != 200 {
			return nil, fmt.Errorf("HTTP %d: %s", resp.StatusCode, truncate(string(data), 200))
		}
		var pageResp struct {
			Tasks []struct {
				ID   string `json:"id"`
				URL  string `json:"url"`
				Name string `json:"name"`
			} `json:"tasks"`
			LastPage bool `json:"last_page"`
		}
		json.Unmarshal(data, &pageResp)
		for _, t := range pageResp.Tasks {
			result[t.Name] = [2]string{t.ID, t.URL}
		}
		if pageResp.LastPage || len(pageResp.Tasks) == 0 {
			break
		}
		page++
	}
	return result, nil
}

// updateTaskDescription PATCHes an existing task's markdown description.
func updateTaskDescription(cfg *config.Config, taskID, description string) error {
	body := map[string]any{"markdown_description": description}
	data, _ := json.Marshal(body)
	url := fmt.Sprintf("%s/task/%s", cfg.BaseURL, taskID)
	req, _ := http.NewRequest("PUT", url, bytes.NewReader(data))
	req.Header.Set("Authorization", cfg.AuthHeader())
	req.Header.Set("Content-Type", "application/json")
	client := &http.Client{Timeout: 60 * time.Second}
	resp, err := client.Do(req)
	if err != nil {
		return err
	}
	defer resp.Body.Close()
	if resp.StatusCode != 200 {
		d, _ := io.ReadAll(resp.Body)
		return fmt.Errorf("HTTP %d: %s", resp.StatusCode, truncate(string(d), 300))
	}
	return nil
}

// createTask POSTs a task to ClickUp and returns the task ID and URL.
func createTask(cfg *config.Config, listID string, task vaultTaskEntry) (string, string, error) {
	body := map[string]any{
		"name":                 task.Name,
		"markdown_description": task.Description,
		"status":               task.Status,
		"assignees":            task.Assignees,
		"time_estimate":        0,
	}

	data, _ := json.Marshal(body)
	url := fmt.Sprintf("%s/list/%s/task", cfg.BaseURL, listID)
	req, _ := http.NewRequest("POST", url, bytes.NewReader(data))
	req.Header.Set("Authorization", cfg.AuthHeader())
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{Timeout: 60 * time.Second}
	resp, err := client.Do(req)
	if err != nil {
		return "", "", fmt.Errorf("creating task: %w", err)
	}
	defer resp.Body.Close()
	respData, _ := io.ReadAll(resp.Body)

	if resp.StatusCode != 200 {
		return "", "", fmt.Errorf("HTTP %d: %s", resp.StatusCode, truncate(string(respData), 300))
	}

	var result struct {
		ID  string `json:"id"`
		URL string `json:"url"`
	}
	json.Unmarshal(respData, &result)
	return result.ID, result.URL, nil
}

// setTaskType sets the "Task type" custom field on a task.
func setTaskType(cfg *config.Config, taskID, fieldID, optionID string) error {
	body := map[string]any{"value": optionID}
	data, _ := json.Marshal(body)
	url := fmt.Sprintf("%s/task/%s/field/%s", cfg.BaseURL, taskID, fieldID)
	req, _ := http.NewRequest("POST", url, bytes.NewReader(data))
	req.Header.Set("Authorization", cfg.AuthHeader())
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{Timeout: 30 * time.Second}
	resp, err := client.Do(req)
	if err != nil {
		return err
	}
	defer resp.Body.Close()
	if resp.StatusCode != 200 {
		d, _ := io.ReadAll(resp.Body)
		return fmt.Errorf("HTTP %d: %s", resp.StatusCode, truncate(string(d), 200))
	}
	return nil
}

func newLoadCmd(flags *rootFlags) *cobra.Command {
	var (
		listID       string
		brand        string
		taskType     string // "static" or "video"
		strategistID int
		dryRun       bool
		updateMode   bool
		vaultRoot    string
	)

	cmd := &cobra.Command{
		Use:   "load <file>",
		Short: "Load vault markdown (Scripts.md / Briefs.md) as ClickUp tasks",
		Long: `Parses a vault Scripts.md or Briefs.md file and creates one ClickUp task per entry.

Each task gets:
  - Name: the slug line (Reach Digital_Brand_Concept_##_T###)
  - Description: content from slug through Close section (scripts) or final designer section (briefs)
  - Status: "brief approved, in design"
  - Assignees: strategist + Diksha Sharma
  - Custom field Task type: "Static ads" (briefs) or "Video ads" (scripts)

Brand→list routing is automatic: the brand is detected from the file path and
matched against the embedded Brand→Creative Briefs list table.`,
		Example: `  # Load a scripts file (auto-detects video type from filename)
  clickup-pp-cli load "IM8/T003 Scripts.md"

  # Load a briefs file
  clickup-pp-cli load "Comfort Ortho Wear/T001 Briefs.md"

  # Dry run — preview tasks without creating them
  clickup-pp-cli load "IM8/T003 Scripts.md" --dry-run

  # Override brand/list
  clickup-pp-cli load "IM8/T003 Scripts.md" --list-id 901113419033

  # Override task type
  clickup-pp-cli load "IM8/T003 Scripts.md" --type video`,
		Args: cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			filePath := args[0]

			// Detect vault root (for strategist.json) — walk up until .claude dir found
			if vaultRoot == "" {
				abs, _ := filepath.Abs(filePath)
				dir := filepath.Dir(abs)
				for dir != "/" {
					if _, err := os.Stat(filepath.Join(dir, ".claude")); err == nil {
						vaultRoot = dir
						break
					}
					dir = filepath.Dir(dir)
				}
			}

			// Resolve strategist
			if strategistID == 0 && vaultRoot != "" {
				id, name, err := resolveStrategistID(vaultRoot)
				if err != nil {
					return err
				}
				strategistID = id
				if !flags.quiet {
					fmt.Fprintf(cmd.ErrOrStderr(), "Strategist: %s (ID %d)\n", name, id)
				}
			}
			if strategistID == 0 {
				return fmt.Errorf("strategist ID not set — pass --strategist-id or ensure .claude/strategist.json exists")
			}

			// Detect task type from filename if not specified
			if taskType == "" {
				lower := strings.ToLower(filepath.Base(filePath))
				if strings.Contains(lower, "script") {
					taskType = "video"
				} else {
					taskType = "static"
				}
			}
			isScript := taskType == "video"
			taskTypeLabel := "Static ads"
			if isScript {
				taskTypeLabel = "Video ads"
			}

			// Detect brand from file path
			if brand == "" {
				brand = detectBrand(filePath)
			}

			// Resolve list ID
			if listID == "" {
				brandLower := strings.ToLower(brand)
				var ok bool
				listID, ok = brandListIDs[brandLower]
				if !ok {
					return fmt.Errorf("brand %q not in embedded list table — pass --list-id or add to brandListIDs in pm_load.go", brand)
				}
			}

			// Open and parse the file
			f, err := os.Open(filePath)
			if err != nil {
				return fmt.Errorf("opening file: %w", err)
			}
			defer f.Close()

			tasks := parseVaultDoc(f, isScript)
			if len(tasks) == 0 {
				return fmt.Errorf("no tasks found in %s — ensure slug lines start with 'Reach Digital_'", filePath)
			}

			fmt.Fprintf(cmd.OutOrStdout(), "Found %d task(s) in %s\n", len(tasks), filepath.Base(filePath))
			fmt.Fprintf(cmd.OutOrStdout(), "Brand: %s  →  List: %s  |  Type: %s\n", brand, listID, taskTypeLabel)

			if dryRun {
				fmt.Fprintln(cmd.OutOrStdout(), "\n[dry-run] Tasks that would be created:")
				for i, t := range tasks {
					descPreview := truncate(strings.ReplaceAll(t.Description, "\n", " "), 120)
					fmt.Fprintf(cmd.OutOrStdout(), "  %d. %s\n     desc: %s...\n", i+1, t.Slug, descPreview)
				}
				return nil
			}

			// Load config + auth
			cfg, err := flags.newClient()
			if err != nil {
				return err
			}
			// Get the underlying config for direct HTTP calls
			loadCfg, err := config.Load("")
			if err != nil {
				return err
			}
			_ = cfg

			if loadCfg.AuthHeader() == "" {
				return fmt.Errorf("no auth token — set CLICKUP_PP_CLI_BEARER_AUTH or CLICKUP_API_TOKEN")
			}

			// Support CLICKUP_API_TOKEN as an alias
			if loadCfg.AuthHeader() == "" {
				if t := os.Getenv("CLICKUP_API_TOKEN"); t != "" {
					loadCfg.ClickupPpCliBearerAuth = t
				}
			}

			// Resolve Task type field ID once
			fieldID, fieldOpts, err := resolveTaskTypeFieldID(loadCfg, listID)
			if err != nil {
				fmt.Fprintf(cmd.ErrOrStderr(), "warning: could not resolve Task type field: %v\n", err)
			}
			var optionID string
			if fieldID != "" && fieldOpts != nil {
				// Try exact match first, then substring
				for k, v := range fieldOpts {
					if strings.EqualFold(k, taskTypeLabel) {
						optionID = v
						break
					}
				}
				if optionID == "" {
					// Try partial match (e.g. "static" matches "Static ads")
					needle := strings.ToLower(taskType)
					for k, v := range fieldOpts {
						if strings.Contains(strings.ToLower(k), needle) {
							optionID = v
							break
						}
					}
				}
				if optionID == "" {
					fmt.Fprintf(cmd.ErrOrStderr(), "warning: option %q not found in Task type field — skipping field set\n", taskTypeLabel)
				}
			}

			assignees := []int{strategistID, dikshaID}

			type result struct {
				slug string
				url  string
				err  error
			}
			results := make([]result, len(tasks))

			if updateMode {
				// Update mode: find existing tasks by name and patch their descriptions.
				fmt.Fprintln(cmd.OutOrStdout(), "Fetching existing tasks from list...")
				existing, err := fetchTasksByName(loadCfg, listID)
				if err != nil {
					return fmt.Errorf("fetching tasks: %w", err)
				}
				for i, t := range tasks {
					entry, ok := existing[t.Slug]
					if !ok {
						results[i] = result{slug: t.Slug, err: fmt.Errorf("not found in list")}
						fmt.Fprintf(cmd.ErrOrStderr(), "  ✗ %s: not found in list — skipping\n", truncate(t.Slug, 60))
						continue
					}
					taskID, taskURL := entry[0], entry[1]
					if dryRun {
						fmt.Fprintf(cmd.OutOrStdout(), "  [dry-run] would update %s\n    %s\n", truncate(t.Slug, 70), taskURL)
						results[i] = result{slug: t.Slug, url: taskURL}
						continue
					}
					if err := updateTaskDescription(loadCfg, taskID, t.Description); err != nil {
						results[i] = result{slug: t.Slug, err: err}
						fmt.Fprintf(cmd.ErrOrStderr(), "  ✗ %s: %v\n", truncate(t.Slug, 60), err)
						continue
					}
					results[i] = result{slug: t.Slug, url: taskURL}
					fmt.Fprintf(cmd.OutOrStdout(), "  ✓ %s\n    %s\n", truncate(t.Slug, 70), taskURL)
				}

				success, fail := 0, 0
				for _, r := range results {
					if r.err != nil {
						fail++
					} else {
						success++
					}
				}
				fmt.Fprintf(cmd.OutOrStdout(), "\n%d updated, %d failed.\n", success, fail)
				if fail > 0 {
					return fmt.Errorf("%d task(s) failed to update", fail)
				}
				return nil
			}

			for i, t := range tasks {
				taskID, taskURL, err := createTask(loadCfg, listID, vaultTaskEntry{
					Name:        t.Slug,
					Description: t.Description,
					Status:      "brief approved, in design",
					Assignees:   assignees,
					TaskType:    taskTypeLabel,
				})
				if err != nil {
					results[i] = result{slug: t.Slug, err: err}
					fmt.Fprintf(cmd.ErrOrStderr(), "  ✗ %s: %v\n", truncate(t.Slug, 60), err)
					continue
				}

				// Set Task type custom field
				if fieldID != "" && optionID != "" {
					if ferr := setTaskType(loadCfg, taskID, fieldID, optionID); ferr != nil {
						fmt.Fprintf(cmd.ErrOrStderr(), "  warning: Task type field not set for %s: %v\n", truncate(t.Slug, 40), ferr)
					}
				}

				results[i] = result{slug: t.Slug, url: taskURL}
				fmt.Fprintf(cmd.OutOrStdout(), "  ✓ %s\n    %s\n", truncate(t.Slug, 70), taskURL)
			}

			// Summary
			success, fail := 0, 0
			for _, r := range results {
				if r.err != nil {
					fail++
				} else {
					success++
				}
			}
			fmt.Fprintf(cmd.OutOrStdout(), "\n%d created, %d failed.\n", success, fail)
			if fail > 0 {
				return fmt.Errorf("%d task(s) failed to create", fail)
			}
			return nil
		},
	}

	cmd.Flags().StringVar(&listID, "list-id", "", "ClickUp list ID (overrides brand auto-detect)")
	cmd.Flags().StringVar(&brand, "brand", "", "Brand name (overrides path auto-detect)")
	cmd.Flags().StringVar(&taskType, "type", "", "Task type: static or video (auto-detected from filename)")
	cmd.Flags().IntVar(&strategistID, "strategist-id", 0, "ClickUp user ID of the strategist (reads .claude/strategist.json by default)")
	cmd.Flags().BoolVar(&dryRun, "dry-run", false, "Preview tasks without creating them in ClickUp")
	cmd.Flags().BoolVar(&updateMode, "update", false, "Update descriptions of existing tasks matched by name instead of creating new tasks")
	cmd.Flags().StringVar(&vaultRoot, "vault-root", "", "Path to vault root (for strategist.json; auto-detected if omitted)")

	return cmd
}
