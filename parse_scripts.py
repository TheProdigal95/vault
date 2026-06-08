import re

def clean_vo_and_tactic(text):
    tactic = None
    m = re.search(r'\*\*Hook [A-C](?:\s*\(([^)]+)\))?:\*\*\s*', text)
    if m:
        tactic = m.group(1) if m.group(1) else None
        text = text[:m.start()] + text[m.end():]
        
    text = re.sub(r'\[AI narrator\]\s*', '', text)
    return text.strip(), tactic

def parse_table_row(row):
    cells = [c.strip() for c in row.split('|')][1:-1]
    return cells

def fix_bullet(line):
    if line.startswith('* '):
        return '- ' + line[2:]
    return line

def split_body_close(row):
    time, vis, vo, cap = row
    vis_parts = vis.split('<br><br>')
    vo_parts = vo.split('<br><br>')
    cap_parts = cap.split('<br><br>')
    
    if len(vo_parts) > 1:
        close_vo = vo_parts[-2:]
        body_vo = vo_parts[:-2]
        
        close_cap = cap_parts[-2:] if len(cap_parts) > 1 else cap_parts
        body_cap = cap_parts[:-2] if len(cap_parts) > 1 else cap_parts
        
        close_vis = vis_parts[-1:] if len(vis_parts) > 1 else vis_parts
        body_vis = vis_parts[:-1] if len(vis_parts) > 1 else vis_parts
        
        return (
            (time, '<br><br>'.join(body_vis), '<br><br>'.join(body_vo), '<br><br>'.join(body_cap)),
            (time, '<br><br>'.join(close_vis), '<br><br>'.join(close_vo), '<br><br>'.join(close_cap))
        )
    return row, ("", "", "", "")

def reformat_script(script_text, index):
    lines = script_text.split('\n')
    
    name_match = re.search(r'^(?:# Script \d+ — |## \d+ \| )(.+)$', script_text, re.MULTILINE)
    if name_match:
        name = name_match.group(1).strip()
    else:
        name = "Unknown"
        
    tracking_id = f"Reach Digital_Elevate_{name}_{index:02d}_T005"
    
    visual_dir = []
    references = []
    footage = []
    
    in_vis = False
    in_ref = False
    in_foot = False
    
    table_lines = []
    
    for line in lines:
        if line.startswith('## Visual Direction') or line.startswith('### Visual Direction'):
            in_vis = True
            in_ref = False
            in_foot = False
            continue
        elif line.startswith('## References') or line.startswith('### References'):
            in_vis = False
            in_ref = True
            in_foot = False
            continue
        elif line.startswith('## Footage') or line.startswith('### Footage'):
            in_vis = False
            in_ref = False
            in_foot = True
            continue
        elif line.startswith('## Script') or line.startswith('| Section') or line.startswith('| Time'):
            in_vis = False
            in_ref = False
            in_foot = False
            
        if line.startswith('|'):
            table_lines.append(line)
        elif in_vis and line.strip() and not line.startswith('##'):
            visual_dir.append(line)
        elif in_ref and line.strip() and not line.startswith('##'):
            references.append(line)
        elif in_foot and line.strip() and not line.startswith('##'):
            footage.append(line)
            
    if not footage:
        footage = ["- N/A"]
        
    hooks = []
    body_rows = []
    close_rows = []
    
    if table_lines:
        header = [c.strip().lower() for c in table_lines[0].split('|')][1:-1]
        
        row_idx = 0
        for row in table_lines[2:]:
            cells = parse_table_row(row)
            if not cells or len(cells) < 2: continue
            
            row_dict = {}
            for i, col in enumerate(header):
                if i < len(cells):
                    row_dict[col] = cells[i]
                    
            time_val = row_dict.get('time', '')
            visual_val = row_dict.get('visual', '')
            raw_vo = row_dict.get('voiceover', '')
            vo_val, tactic = clean_vo_and_tactic(raw_vo)
            cap_val = row_dict.get('on-screen captions', row_dict.get('captions', ''))
            
            section = row_dict.get('section', '').lower()
            
            is_hook_a = 'hook a' in section or 'hook a' in raw_vo.lower() or 'hook a' in visual_val.lower()
            is_hook_b = 'hook b' in section or 'hook b' in raw_vo.lower() or 'hook b' in visual_val.lower()
            is_hook_c = 'hook c' in section or 'hook c' in raw_vo.lower() or 'hook c' in visual_val.lower()
            is_close = 'close' in section
            is_body = 'body' in section
            
            # If no explicit hook tags, assume first 3 rows are hooks if they look like it
            if not (is_hook_a or is_hook_b or is_hook_c or is_close or is_body):
                if row_idx == 0: is_hook_a = True
                elif row_idx == 1: is_hook_b = True
                elif row_idx == 2: is_hook_c = True
                elif row_idx == len(table_lines[2:]) - 1 and 'close' in raw_vo.lower(): is_close = True
                else: is_body = True
            
            if is_hook_a:
                hooks.append(('Hook A', time_val, visual_val, vo_val, cap_val, tactic))
            elif is_hook_b:
                hooks.append(('Hook B', time_val, visual_val, vo_val, cap_val, tactic))
            elif is_hook_c:
                hooks.append(('Hook C', time_val, visual_val, vo_val, cap_val, tactic))
            elif is_close:
                close_rows.append((time_val, visual_val, vo_val, cap_val))
            else:
                body_rows.append((time_val, visual_val, vo_val, cap_val))
            
            row_idx += 1
                
    close_type_match = re.search(r'\*\*Close Type:\*\*\s*(.+)', script_text)
    close_type = close_type_match.group(1).strip() if close_type_match else "N/A"
    
    if close_type.lower() != 'n/a' and not close_rows and body_rows:
        if len(body_rows) > 1:
            close_rows.append(body_rows.pop())
        elif len(body_rows) == 1:
            b, c = split_body_close(body_rows[0])
            body_rows = [b]
            if c[2]:
                close_rows = [c]
            
    out = []
    out.append(f"## Script #{index} — {name}")
    out.append("")
    out.append(f"{tracking_id}")
    out.append("")
    
    out.append("### Visual Direction")
    for v in visual_dir:
        out.append(fix_bullet(v))
    out.append("")
    
    out.append("### References")
    for r in references:
        out.append(fix_bullet(r))
    out.append("")
    
    out.append("### Footage")
    for f in footage:
        out.append(fix_bullet(f))
    out.append("")
    
    for h in hooks:
        h_name, t, vis, vo, cap, tactic = h
        summary = vis.split('.')[0][:40] + "..." if len(vis) > 40 else vis.split('.')[0]
        if tactic:
            out.append(f"### {h_name} — {tactic} | {summary}")
        else:
            out.append(f"### {h_name} — {summary}")
            
        out.append("| Time | Visual | Voiceover | On-Screen Captions |")
        out.append("|---|---|---|---|")
        out.append(f"| {t} | {vis} | {vo} | {cap} |")
        out.append("")
        
    if body_rows:
        out.append("### Body")
        out.append("| Time | Visual | Voiceover | On-Screen Captions |")
        out.append("|---|---|---|---|")
        for b in body_rows:
            out.append(f"| {b[0]} | {b[1]} | {b[2]} | {b[3]} |")
        out.append("")
    
    if close_type.lower() != 'n/a' and 'n/a' not in close_type.lower():
        out.append(f"### Close — {close_type}")
        out.append("| Time | Visual | Voiceover | On-Screen Captions |")
        out.append("|---|---|---|---|")
        for c in close_rows:
            if any(c):
                out.append(f"| {c[0]} | {c[1]} | {c[2]} | {c[3]} |")
        out.append("")
        
    return '\n'.join(out).strip()

with open('/Users/marce/Library/Mobile Documents/iCloud~md~obsidian/Documents/Reach Digital/Elevate/T005 Scripts.md', 'r') as f:
    text = f.read()

parts = re.split(r'(?=# Script \d+ — |## \d+ \| )', text)

header_part = parts[0]
scripts = parts[1:]

final_out = [header_part.strip() + "\n"]

for i, script_text in enumerate(scripts):
    final_out.append(reformat_script(script_text, i+1))
    final_out.append("\n---\n")
    
if final_out[-1] == "\n---\n":
    final_out.pop()
    
with open('test_out.md', 'w') as f:
    f.write('\n'.join(final_out) + '\n')
