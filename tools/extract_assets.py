#!/usr/bin/env python3
"""Extract every embedded image from the game HTML into assets/<group>/<name>.<ext> and write assets/INDEX.generated.md.
Usage: python3 tools/extract_assets.py /home/claude/liars-crawl.html
Names come from the JS constant + key path (e.g. STAMPS.caught -> stamps/stamps_caught.webp)."""
import re, sys, base64, hashlib, os, struct
src = sys.argv[1] if len(sys.argv) > 1 else '/home/claude/liars-crawl.html'
root = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'assets')
s = open(src).read()
GROUP = {'MAPBG':'maps','FLOOR_BG':'maps','MAP_IMG':'maps','VTOK':'tokens','HOVL':'tokens','TOK':'tokens','OVL':'tokens','PAWN':'tokens','HPAWN':'portraits',
 'BOSS_PORTRAITS':'portraits','PORTRAITS':'portraits','STAMPS':'stamps','UIART':'ui','ARROWART':'ui','EYES':'ui','ABIL_IMG':'ui','SK_IMG':'ui','SEAL_IMG':'cards','RELIC_IMG':'cards','RELIC2':'cards',
 'NEWART':'cards','CARD2':'cards','CARDART':'cards','SLOTART':'ui','MERCH_IMG':'portraits','GA':'ui','SCRATCH_FOIL':'ui','SCRATCH_FLECKS':'ui','LIAR_IMG':'stamps','X_SVG':'ui'}
DESC = {'MAPBG':'floor map background (landscape)','FLOOR_BG':'room/floor backdrop','VTOK':'map node token (vault/entrance/cleared)','HOVL':'map overlay (House ring / plaque)',
 'HPAWN':'House chaser frame on the map','BOSS_PORTRAITS':'boss portrait frame','PORTRAITS':'player character portrait','STAMPS':'full-screen stamp / label','UIART':'UI piece',
 'GA':'coin / pouch / piggy bank art','CARDART':'playing-card art','MERCH_IMG':'merchant art','SEAL_IMG':'seal art','RELIC_IMG':'relic art','RELIC2':'relic art (v2)','NEWART':'item art',
 'CARD2':'item card art','ABIL_IMG':'ability icon','SK_IMG':'skill icon','TOK':'map token','PAWN':'player map pawn','OVL':'overlay','ARROWART':'targeting arrow piece','EYES':'eye art',
 'SLOTART':'slot-machine art','SCRATCH_FOIL':'scratch-card foil','SCRATCH_FLECKS':'scratch-card flecks','LIAR_IMG':'LIAR title lettering','MAP_IMG':'map node icon','X_SVG':'red X close button (Gemini)'}
seen = {}; rows = []
def dims(b, ext):
    try:
        if ext == 'png': return struct.unpack('>II', b[16:24])
        if ext == 'webp':
            if b[12:16] == b'VP8X': return (1+int.from_bytes(b[24:27],'little'), 1+int.from_bytes(b[27:30],'little'))
            if b[12:16] == b'VP8L': v = int.from_bytes(b[21:25],'little'); return ((v&0x3fff)+1, ((v>>14)&0x3fff)+1)
            if b[12:16] == b'VP8 ': return (struct.unpack('<H', b[26:28])[0]&0x3fff, struct.unpack('<H', b[28:30])[0]&0x3fff)
    except Exception: pass
    return ('?','?')
def slug(x): return re.sub(r'[^a-z0-9]+','_',x.lower()).strip('_')
def save(name, group, desc, used, data, ext):
    h = hashlib.md5(data).hexdigest()
    if h in seen: rows.append((seen[h][0], seen[h][1]+' (duplicate of this)', '', used, '')); return
    d = os.path.join(root, group); os.makedirs(d, exist_ok=True)
    fn = slug(name) + '.' + ext; open(os.path.join(d, fn), 'wb').write(data)
    w, h2 = dims(data, ext); seen[h] = (group+'/'+fn, desc)
    rows.append((group+'/'+fn, desc, f'{w}x{h2}', used, ''))
def sniff(b): return 'png' if b[:4]==b'\x89PNG' else 'jpg' if b[:2]==b'\xff\xd8' else 'webp'
tok = re.compile(r'([{}\[\]])|(?:"([A-Za-z0-9_]+)"|\b([A-Za-z0-9_]+))\s*:|"((?:data:image/[a-z]+;base64,)?[A-Za-z0-9+/=]{300,})"|\'((?:data:image/[a-z]+;base64,)?[A-Za-z0-9+/=]{300,})\'')
for m in re.finditer(r'(?:var|const|let)\s+([A-Z][A-Z_0-9]+)\s*=\s*', s):
    name = m.group(1)
    if name not in GROUP: continue
    st = m.end(); e = s.find('\n', st); line = s[st:e]
    path = []; stack = []
    if line.startswith(('"','\'')) or line.startswith('<') or line.startswith("'<"):
        mm = re.search(r'base64,([A-Za-z0-9+/=]{300,})', line)
        if mm: b = base64.b64decode(mm.group(1)); save(name, GROUP[name], DESC.get(name,''), name, b, sniff(b))
        continue
    lastkey = None
    for t in tok.finditer(line):
        g1 = t.group(1)
        if g1 and g1 in '{[': stack.append(lastkey)
        elif g1 and g1 in '}]':
            if stack: stack.pop()
        elif t.group(2) or t.group(3): lastkey = t.group(2) or t.group(3)
        else:
            val = t.group(4) or t.group(5); raw = val.split('base64,')[-1]
            try: b = base64.b64decode(raw)
            except Exception: continue
            keys = [k for k in stack if k] + ([lastkey] if lastkey and (not stack or lastkey != stack[-1]) else [])
            ident = '.'.join([name] + keys)
            save('_'.join([name]+keys), GROUP[name], DESC.get(name,''), ident, b, sniff(b))
# CSS data URIs: name from the selector or custom property in front
for m in re.finditer(r'url\(["\']?data:image/(\w+);base64,([A-Za-z0-9+/=]{300,})', s):
    ln = s.count('\n', 0, m.start()) + 1
    if ln > 3100: continue
    st = s.rfind('\n', 0, m.start()) + 1; pre = s[st:m.start()]
    prop = re.findall(r'(--[a-z0-9-]+)\s*:', pre); sel = re.findall(r'([.#][A-Za-z0-9_.\-: >#]+?)\s*\{', pre) or re.findall(r'(@keyframes\s+\w+)', pre)
    nm = prop[-1] if prop else (sel[-1] if sel else f'css_line{ln}')
    b = base64.b64decode(m.group(2)); ext = {'jpeg':'jpg'}.get(m.group(1), m.group(1))
    save('css_' + nm, 'ui', 'embedded in CSS', f'CSS {nm.strip()} (line {ln})', b, ext)
with open(os.path.join(root, 'INDEX.generated.md'), 'w') as f:
    f.write('# Generated asset list (re-run tools/extract_assets.py after changes)\n\n| file | what it is | size | used in game as | notes |\n|---|---|---|---|---|\n')
    for r in sorted(rows): f.write('| ' + ' | '.join(r) + ' |\n')
print(len(rows), 'assets;', len(seen), 'unique files')
