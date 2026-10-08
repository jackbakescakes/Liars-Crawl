#!/usr/bin/env python3
"""Split the single-file game into index.html + img/<hash>.<ext> files.

usage: split_assets.py <in.html> <outdir> [--min BYTES]

Every base64 data:image/(webp|png|jpeg) URI of at least --min decoded bytes (default 8000) becomes a
relative path `img/<sha1-12>.<ext>`; identical images share one file. Small icons and inline SVG stay embedded.
The original working file is never changed. audio/ is not touched (music is already loaded from audio/*.mp3).
"""
import re, sys, os, base64, hashlib, shutil
src, out = sys.argv[1], sys.argv[2]
mn = int(sys.argv[sys.argv.index('--min') + 1]) if '--min' in sys.argv else 8000
t = open(src, encoding='utf-8').read()
os.makedirs(os.path.join(out, 'img'), exist_ok=True)
pat = re.compile(r'data:image/(webp|png|jpeg);base64,([A-Za-z0-9+/=]+)')
EXT = {'webp': 'webp', 'png': 'png', 'jpeg': 'jpg'}
files = {}; n_in = 0; n_out = 0
def rep(m):
    global n_in, n_out
    n_in += 1
    raw = base64.b64decode(m.group(2) + '=' * (-len(m.group(2)) % 4))
    if len(raw) < mn: return m.group(0)
    h = hashlib.sha1(raw).hexdigest()[:12]
    name = 'img/%s.%s' % (h, EXT[m.group(1)])
    if name not in files:
        files[name] = len(raw); open(os.path.join(out, name), 'wb').write(raw)
    n_out += 1
    return name
t2 = pat.sub(rep, t)
open(os.path.join(out, 'index.html'), 'w', encoding='utf-8').write(t2)
for d in ('audio',):
    s = os.path.join(os.path.dirname(os.path.abspath(src)), d)
    if os.path.isdir(s) and not os.path.exists(os.path.join(out, d)):
        try: os.symlink(s, os.path.join(out, d))
        except OSError: pass
print('html %.2f MB -> %.2f MB; %d data URIs, %d moved to %d files (%.2f MB)' % (len(t) / 1e6, len(t2) / 1e6, n_in, n_out, len(files), sum(files.values()) / 1e6))
