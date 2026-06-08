// Copyright 2026 theprodigal95. Licensed under Apache-2.0. See LICENSE.

package cli

import (
	"bufio"
	"fmt"
	"io"
	"os"
	"path/filepath"
	"strings"

	"clickup-pp-cli/internal/config"
	"github.com/spf13/cobra"
)

// footageRequestsListName is searched inside the Content Production space.
// The numeric list ID is resolved at runtime since it differs per workspace.
// Override with --list-id if known.
const footageRequestsListName = "Footage Requests"

// extractScriptBlock returns content for a specific slug from a Scripts.md doc.
// Returns the hook, body, and close tables for the given slug fragment.
func extractScriptBlock(r io.Reader, slugFragment string) (string, error) {
	scanner := bufio.NewScanner(r)
	scanner.Buffer(make([]byte, 4*1024*1024), 4*1024*1024)

	var inBlock bool
	var body strings.Builder
	var pastClose bool
	inClose := false

	endMarkers := []string{
		"## Hook-to-Body Transition Verification",
		"## Hook to Body Transition Verification",
		"## QA",
		"## Internal Notes",
	}

	for scanner.Scan() {
		line := scanner.Text()
		trimmed := strings.TrimSpace(line)

		// New slug line
		if strings.HasPrefix(trimmed, "Reach Digital_") {
			if inBlock {
				// We've moved past the target block — stop
				break
			}
			if slugFragment == "" || strings.Contains(strings.ToLower(trimmed), strings.ToLower(slugFragment)) {
				inBlock = true
				body.WriteString(line)
				body.WriteString("\n")
				continue
			}
			continue
		}

		if !inBlock {
			continue
		}

		// Check end markers
		isEnd := false
		for _, m := range endMarkers {
			if strings.HasPrefix(trimmed, m) {
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

		if strings.HasPrefix(trimmed, "## Close") || trimmed == "### Close" {
			inClose = true
		} else if inClose && strings.HasPrefix(trimmed, "## ") && !strings.HasPrefix(trimmed, "## Close") {
			pastClose = true
			continue
		}

		body.WriteString(line)
		body.WriteString("\n")
	}

	if !inBlock {
		return "", fmt.Errorf("slug fragment %q not found in document", slugFragment)
	}
	return strings.TrimRight(body.String(), "\n"), nil
}

// resolveFootageListID fetches the Footage Requests list ID by walking the team → spaces → folders → lists hierarchy.
func resolveFootageListID(cfg *config.Config) (string, error) {
	// We need to walk: GET /team → GET /team/{id}/space → GET /space/{id}/folder → GET /folder/{id}/list
	// Then also GET /space/{id}/list (folderless lists)
	// First, get team ID
	teamID, err := getFirstTeamID(cfg)
	if err != nil {
		return "", fmt.Errorf("resolving team: %w", err)
	}

	// Get spaces
	spaces, err := getSpaceIDs(cfg, teamID)
	if err != nil {
		return "", fmt.Errorf("resolving spaces: %w", err)
	}

	// Search each space for a list named "Footage Requests"
	for _, spaceID := range spaces {
		folders, _ := getFolderIDs(cfg, spaceID)
		for _, folderID := range folders {
			lists, _ := getFolderListIDs(cfg, folderID)
			for name, id := range lists {
				if strings.EqualFold(name, footageRequestsListName) {
					return id, nil
				}
			}
		}
		// Also check folderless lists
		lists, _ := getSpaceListIDs(cfg, spaceID)
		for name, id := range lists {
			if strings.EqualFold(name, footageRequestsListName) {
				return id, nil
			}
		}
	}
	return "", fmt.Errorf("Footage Requests list not found — pass --list-id to override")
}

func newFootageRequestCmd(flags *rootFlags) *cobra.Command {
	var (
		listID       string
		brand        string
		title        string
		descFile     string
		slugFragment string
		scriptFile   string
		strategistID int
		dryRun       bool
		vaultRoot    string
	)

	cmd := &cobra.Command{
		Use:   "footage-request",
		Short: "Create a footage request task in ClickUp",
		Long: `Creates a footage request task in the Footage Requests list.

Assignees: current strategist + Karra Worang.
Status: "Footage Requested".

Content can come from:
  1. A Scripts.md file (--script-file + --slug) — extracts the script block
  2. A description file (--desc-file) — raw markdown content
  3. Inline (--title + positional description arg)`,
		Example: `  # From a Scripts.md entry (auto-extracts hook/body/close)
  clickup-pp-cli footage-request --script-file "IM8/T003 Scripts.md" --slug "GLP1" --title "IM8_Greenscreen GLP1 Muscle Recovery"

  # Dry run to preview
  clickup-pp-cli footage-request --script-file "IM8/T003 Scripts.md" --slug "GLP1" --title "IM8_Greenscreen GLP1 Muscle Recovery" --dry-run

  # From a description file
  clickup-pp-cli footage-request --title "IM8_Greenscreen GLP1" --desc-file request.md`,
		RunE: func(cmd *cobra.Command, args []string) error {
			// Resolve vault root
			if vaultRoot == "" {
				srcFile := scriptFile
				if srcFile == "" {
					srcFile = descFile
				}
				if srcFile != "" {
					abs, _ := filepath.Abs(srcFile)
					dir := filepath.Dir(abs)
					for dir != "/" {
						if _, err := os.Stat(filepath.Join(dir, ".claude")); err == nil {
							vaultRoot = dir
							break
						}
						dir = filepath.Dir(dir)
					}
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

			if title == "" {
				return fmt.Errorf("--title is required (format: Brand_Format Angle, e.g. IM8_Greenscreen Muscle Recovery)")
			}

			// Build description
			var description string
			if scriptFile != "" {
				f, err := os.Open(scriptFile)
				if err != nil {
					return fmt.Errorf("opening script file: %w", err)
				}
				defer f.Close()
				block, err := extractScriptBlock(f, slugFragment)
				if err != nil {
					return err
				}
				description = block + "\n\n---\n\n" +
					"**Note:** You don't need an actual green screen. Just find a background that's not too busy so we can key it out.\n\n" +
					"**Film each line as a separate take** so we can cut and choose the best delivery.\n"
			} else if descFile != "" {
				data, err := os.ReadFile(descFile)
				if err != nil {
					return fmt.Errorf("reading description file: %w", err)
				}
				description = string(data)
			} else if len(args) > 0 {
				description = strings.Join(args, " ")
			}

			// Resolve list ID
			loadCfg, err := config.Load("")
			if err != nil {
				return err
			}
			if loadCfg.AuthHeader() == "" {
				return fmt.Errorf("no auth token — set CLICKUP_API_TOKEN")
			}

			if listID == "" {
				if !dryRun {
					fmt.Fprintf(cmd.ErrOrStderr(), "Resolving Footage Requests list ID...\n")
					listID, err = resolveFootageListID(loadCfg)
					if err != nil {
						return err
					}
					fmt.Fprintf(cmd.ErrOrStderr(), "Found Footage Requests list: %s\n", listID)
				}
			}

			assignees := []int{strategistID, karraID}

			fmt.Fprintf(cmd.OutOrStdout(), "Task: %s\nList: %s\nAssignees: %v\nStatus: Footage Requested\n",
				title, listID, assignees)

			if dryRun {
				if description != "" {
					fmt.Fprintf(cmd.OutOrStdout(), "\nDescription preview:\n%s\n", truncate(description, 500))
				}
				fmt.Fprintln(cmd.OutOrStdout(), "\n[dry-run] No task created.")
				return nil
			}

			taskID, taskURL, err := createTask(loadCfg, listID, vaultTaskEntry{
				Name:        title,
				Description: description,
				Status:      "Footage Requested",
				Assignees:   assignees,
			})
			if err != nil {
				return fmt.Errorf("creating footage request: %w", err)
			}
			_ = taskID

			fmt.Fprintf(cmd.OutOrStdout(), "  ✓ Created: %s\n", taskURL)
			return nil
		},
	}

	cmd.Flags().StringVar(&listID, "list-id", "", "Footage Requests list ID (auto-resolved if omitted)")
	cmd.Flags().StringVar(&brand, "brand", "", "Brand name (for context)")
	cmd.Flags().StringVar(&title, "title", "", "Task title: Brand_Format Angle (e.g. IM8_Greenscreen Muscle Recovery)")
	cmd.Flags().StringVar(&scriptFile, "script-file", "", "Path to Scripts.md to extract content from")
	cmd.Flags().StringVar(&slugFragment, "slug", "", "Slug fragment to match in script file (e.g. 'GLP1')")
	cmd.Flags().StringVar(&descFile, "desc-file", "", "Path to markdown file with task description")
	cmd.Flags().IntVar(&strategistID, "strategist-id", 0, "ClickUp user ID of the strategist (reads .claude/strategist.json by default)")
	cmd.Flags().BoolVar(&dryRun, "dry-run", false, "Preview without creating the task")
	cmd.Flags().StringVar(&vaultRoot, "vault-root", "", "Path to vault root (auto-detected if omitted)")

	return cmd
}
