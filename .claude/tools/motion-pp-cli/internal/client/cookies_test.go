package client

import (
	"net/http"
	"os"
	"path/filepath"
	"strings"
	"testing"
	"time"

	"motion-pp-cli/internal/config"
)

func TestCookieJarFromConfigSeedsCookiesAndSkipsMalformedParts(t *testing.T) {
	cfg := &config.Config{
		BaseURL: "https://projects.motionapp.com",
		Headers: map[string]string{
			"Cookie": "authtoken=abc; broken; refreshtoken=def; spaced = value",
		},
	}

	jar, u := cookieJarFromConfig(cfg)
	if jar == nil || u == nil {
		t.Fatal("expected jar and URL")
	}

	got := map[string]string{}
	for _, cookie := range jar.Cookies(u) {
		got[cookie.Name] = cookie.Value
	}
	if got["authtoken"] != "abc" || got["refreshtoken"] != "def" || got["spaced"] != "value" {
		t.Fatalf("unexpected cookies: %#v", got)
	}
	if _, ok := got["broken"]; ok {
		t.Fatalf("malformed cookie part should be skipped: %#v", got)
	}
}

func TestPersistCookiesWritesRefreshedCookieHeader(t *testing.T) {
	dir := t.TempDir()
	cfg := &config.Config{
		BaseURL: "https://projects.motionapp.com",
		Path:    filepath.Join(dir, "config.toml"),
		Headers: map[string]string{
			"Cookie": "authtoken=old",
		},
	}
	c := New(cfg, 5*time.Second, 0)
	if c.cookieJar == nil || c.cookieURL == nil {
		t.Fatal("expected cookie jar")
	}

	c.cookieJar.SetCookies(c.cookieURL, []*http.Cookie{{Name: "authtoken", Value: "new"}, {Name: "refreshtoken", Value: "fresh"}})
	c.persistCookies()

	data, err := os.ReadFile(cfg.Path)
	if err != nil {
		t.Fatal(err)
	}
	text := string(data)
	if !(strings.Contains(text, `authtoken =`) || strings.Contains(text, `Cookie =`)) {
		t.Fatalf("expected persisted cookie config, got:\n%s", text)
	}
	if !strings.Contains(text, "authtoken=new") || !strings.Contains(text, "refreshtoken=fresh") {
		t.Fatalf("expected refreshed cookies in config, got:\n%s", text)
	}
}
