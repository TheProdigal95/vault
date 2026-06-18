#!/usr/bin/env python3
"""Convert yt-dlp YouTube VTT caption files into readable timestamped markdown.

Designed for Dr Jaquish / Oral Only YouTube research.
Input: raw-vtt/*.vtt downloaded with yt-dlp --write-auto-subs/--write-subs.
Output: transcripts/*.md + transcript_index.md.
"""
from __future__ import annotations

import html
import re
from pathlib import Path
from collections import defaultdict

ROOT = Path(__file__).resolve().parent
RAW = ROOT / "raw-vtt"
OUT = ROOT / "transcripts"
INDEX = ROOT / "channel_video_index.tsv"
SELECTED = ROOT / "trt_relevant_urls.txt"

TIME_RE = re.compile(r"(?P<start>\d{2}:\d{2}:\d{2}\.\d{3})\s+-->\s+(?P<end>\d{2}:\d{2}:\d{2}\.\d{3})")
TAG_RE = re.compile(r"<[^>]+>")


def sec(ts: str) -> float:
    h, m, rest = ts.split(":")
    s, ms = rest.split(".")
    return int(h) * 3600 + int(m) * 60 + int(s) + int(ms) / 1000


def fmt(ts: str) -> str:
    h, m, rest = ts.split(":")
    s = rest.split(".")[0]
    return f"{int(m) + int(h)*60:02d}:{s}"


def clean_payload(text: str) -> str:
    text = TAG_RE.sub("", text)
    text = re.sub(r"align:\w+\s+position:\d+%", "", text)
    text = html.unescape(text)
    lines = [re.sub(r"\s+", " ", ln).strip() for ln in text.splitlines()]
    lines = [ln for ln in lines if ln and not TIME_RE.search(ln) and not ln.startswith("Kind:") and not ln.startswith("Language:")]
    if not lines:
        return ""
    # YouTube auto VTT repeats prior line + new line. The last line is usually the new phrase.
    return lines[-1]


def cues_from_vtt(path: Path):
    raw = path.read_text(errors="ignore").replace("\ufeff", "")
    blocks = re.split(r"\n\s*\n", raw)
    cues = []
    i = 0
    while i < len(blocks):
        block = blocks[i].strip()
        m = TIME_RE.search(block)
        if not m:
            i += 1
            continue
        payload = block[m.end():].strip()
        # Some yt-dlp VTT files put timing in one block and caption text in the next.
        if (not clean_payload(payload)) and i + 1 < len(blocks) and not TIME_RE.search(blocks[i + 1]):
            payload = blocks[i + 1].strip()
            i += 1
        start, end = m.group("start"), m.group("end")
        if sec(end) - sec(start) < 0.15:
            i += 1
            continue
        text = clean_payload(payload)
        if text:
            cues.append((start, end, text))
        i += 1
    # Deduplicate consecutive identical fragments.
    deduped = []
    prev = ""
    for start, end, text in cues:
        norm = re.sub(r"\W+", " ", text.lower()).strip()
        if norm and norm != prev:
            deduped.append((start, end, text))
            prev = norm
    return deduped


def load_meta():
    meta = {}
    if INDEX.exists():
        for line in INDEX.read_text(errors="ignore").splitlines():
            parts = line.split("\t")
            if len(parts) >= 5:
                vid, title, duration, date, url = parts[:5]
                meta[vid] = {"title": title, "duration": duration, "date": date, "url": url}
    return meta


def prefer_files():
    by_id = defaultdict(list)
    for p in RAW.glob("*.vtt"):
        vid = p.name.split(".")[0]
        by_id[vid].append(p)
    chosen = {}
    for vid, files in by_id.items():
        def score(p: Path):
            name = p.name
            # Prefer original English auto-captions, then standard English, avoid tiny secondary tracks.
            pref = 0
            if ".en-orig." in name:
                pref += 1000
            elif ".en." in name:
                pref += 800
            pref += min(p.stat().st_size, 999999) / 1000000
            return pref
        chosen[vid] = sorted(files, key=score, reverse=True)[0]
    return chosen


def main():
    OUT.mkdir(exist_ok=True)
    meta = load_meta()
    chosen = prefer_files()
    rows = []
    for vid, path in sorted(chosen.items(), key=lambda kv: meta.get(kv[0], {}).get("title", kv[0]).lower()):
        cues = cues_from_vtt(path)
        info = meta.get(vid, {})
        title = info.get("title", vid)
        url = info.get("url", f"https://www.youtube.com/watch?v={vid}")
        duration = info.get("duration", "")
        safe = re.sub(r"[^A-Za-z0-9._ -]+", "", title).strip()[:90].replace(" ", "_")
        out = OUT / f"{vid}_{safe}.md"
        body = [
            f"# Transcript — {title}",
            "",
            f"**Source:** {url}",
            f"**Video ID:** {vid}",
            f"**Duration:** {duration}",
            f"**Caption source:** YouTube captions via yt-dlp (`{path.name}`)",
            "",
            "---",
            "",
            "| Timestamp | Transcript |",
            "|---|---|",
        ]
        for start, end, text in cues:
            body.append(f"| {fmt(start)}-{fmt(end)} | {text.replace('|', '/')} |")
        out.write_text("\n".join(body) + "\n")
        rows.append((title, duration, url, len(cues), out.name))
    index = [
        "# Dr Jaquish YouTube Transcript Index",
        "",
        "Transcript-only extraction from `https://www.youtube.com/@jaquishbiomedical` using yt-dlp captions. No YouTube Premium/browser login required for available public captions.",
        "",
        "| Video | Duration | Transcript rows | Source | File |",
        "|---|---:|---:|---|---|",
    ]
    for title, duration, url, count, file in rows:
        index.append(f"| {title.replace('|','/')} | {duration} | {count} | {url} | [[transcripts/{file[:-3]}]] |")
    (ROOT / "transcript_index.md").write_text("\n".join(index) + "\n")
    print(f"Converted {len(rows)} transcript files to {OUT}")
    print(ROOT / "transcript_index.md")

if __name__ == "__main__":
    main()
