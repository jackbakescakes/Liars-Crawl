#!/usr/bin/env python3
"""Embed an image file as a base64 data URI into a JS constant of the game HTML.

Never regex-replace "the first data URI" in the HTML (the same keys, e.g. "4",
exist in several objects). This tool finds the exact declaration instead.

Usage:
  embed_art.py HTML FILE CONST                 # var CONST = '...';   (whole statement)
  embed_art.py HTML FILE OBJ.key               # key inside   var OBJ = {key:'...', ...}
  embed_art.py HTML FILE OBJ.key --new         # add the key if it does not exist yet
  embed_art.py HTML FILE OBJ.key --raw [--new] # objects with raw base64 values (CARD2, RELIC2)
  embed_art.py HTML FILE CONST --new           # add `var CONST = '...';` after --after LINE_SUBSTR

Options:
  --after TEXT   with --new on a plain constant: insert the new line after the first
                 line containing TEXT (default: right before the line `var BUCK_IMG`-style
                 anchors are NOT guessed; you must give --after).
  --dry          print what would change, write nothing.

The HTML is edited in place (use the WORKING FILE, /home/claude/liars-crawl.html).
A trailing `// comment` on a replaced one-line constant is kept.
"""
import argparse, base64, mimetypes, re, sys


def data_uri(path, raw=False):
    if raw:   # some objects (CARD2, RELIC2) store bare base64 and add the data: prefix in code
        return base64.b64encode(open(path, 'rb').read()).decode()
    mt = mimetypes.guess_type(path)[0] or 'application/octet-stream'
    if path.endswith('.webp'):
        mt = 'image/webp'
    return f'data:{mt};base64,' + base64.b64encode(open(path, 'rb').read()).decode()


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('html'); ap.add_argument('file'); ap.add_argument('target')
    ap.add_argument('--new', action='store_true')
    ap.add_argument('--after', default=None)
    ap.add_argument('--dry', action='store_true')
    ap.add_argument('--raw', action='store_true',
                    help='the object holds RAW base64 values ("key": "UklG...") as CARD2 and RELIC2 do')
    a = ap.parse_args()

    s = open(a.html, encoding='utf-8').read()
    uri = data_uri(a.file, a.raw)
    lines = s.split('\n')

    if '.' not in a.target:  # plain constant: var NAME = ...;
        name = a.target
        pat = re.compile(r'^(\s*)(var|let|const)\s+' + re.escape(name) + r'\s*=')
        idx = [i for i, l in enumerate(lines) if pat.match(l)]
        if len(idx) > 1:
            sys.exit(f'{name}: declared {len(idx)} times, refusing')
        if not idx:
            if not a.new:
                sys.exit(f'{name}: not found (pass --new --after TEXT to add it)')
            if not a.after:
                sys.exit('--new needs --after TEXT')
            anchor = [i for i, l in enumerate(lines) if a.after in l]
            if not anchor:
                sys.exit(f'anchor {a.after!r} not found')
            ind = re.match(r'\s*', lines[anchor[0]]).group(0)
            lines.insert(anchor[0] + 1, f"{ind}var {name} = '{uri}';")
            print(f'added var {name} after line {anchor[0] + 1}')
        else:
            i = idx[0]
            m = pat.match(lines[i])
            cm = re.search(r';\s*(//.*)$', lines[i])
            tail = ('   ' + cm.group(1)) if cm else ''
            lines[i] = f"{m.group(1)}var {name} = '{uri}';{tail}"
            print(f'replaced var {name} on line {i + 1}')
    else:  # OBJ.key inside var OBJ = {...}
        obj, key = a.target.split('.', 1)
        pat = re.compile(r'^(\s*)(var|let|const)\s+' + re.escape(obj) + r'\s*=\s*\{')
        idx = [i for i, l in enumerate(lines) if pat.match(l)]
        if len(idx) != 1:
            sys.exit(f'{obj}: found {len(idx)} declarations')
        i = idx[0]
        line = lines[i]
        val = r'[A-Za-z0-9+/=]*' if a.raw else r'data:[^\'"]*'
        kp = re.compile(r'(?P<k>(?<![\w"\'])(?:' + re.escape(key) + r'|"' + re.escape(key) + r'"|\'' + re.escape(key) + r'\')\s*:\s*)([\'"])' + val + r'\2')
        ms = list(kp.finditer(line))
        if len(ms) > 1:
            sys.exit(f'{a.target}: key appears {len(ms)} times on the declaration line')
        if ms:
            m = ms[0]
            q = m.group(2)
            line = line[:m.start()] + m.group('k') + q + uri + q + line[m.end():]
            print(f'replaced {a.target} on line {i + 1}')
        else:
            if not a.new:
                sys.exit(f'{a.target}: key not found (pass --new to add it)')
            j = line.index('{') + 1
            line = line[:j] + (f'"{key}": "{uri}", ' if a.raw else f"{key}:'{uri}',") + line[j:]
            print(f'added {a.target} on line {i + 1}')
        lines[i] = line

    if a.dry:
        print('dry run, nothing written'); return
    open(a.html, 'w', encoding='utf-8').write('\n'.join(lines))
    print('ok', len(uri), 'chars embedded')


if __name__ == '__main__':
    main()
