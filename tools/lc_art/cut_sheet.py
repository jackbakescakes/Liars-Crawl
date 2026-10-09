#!/usr/bin/env python3
"""Cut a Gemini sheet (flat magenta background) into transparent pieces.

Pipeline (CLAUDE.md "Gemini pipeline"): magenta key (r>150)&(b>g+40)&(b>110)
-> morphological opening -> keep big connected components -> crop -> resize
-> save as webp/png with alpha.

Usage:
  python3 tools/lc_art/cut_sheet.py SRC OUTDIR --names a,b,c --size 120,240,240 \
      [--fmt webp|png] [--min-frac 0.02] [--open 2] [--expect N] [--preview prev.png]
      [--grid 6x3 --inset 14]   (sheets that have thin grid lines between cells)

  --names   output names in reading order (left->right, top->bottom); files are
            OUTDIR/<name>.<fmt>. Use "-" to skip a component.
  --size    one number (every piece) or one per name. A piece is scaled to FIT a
            WxW box (aspect kept) and centred on a transparent square, unless you
            give --wh WxH (e.g. --wh 320x440) which fits into that box instead.
  --expect  fail loudly if the number of kept components differs (merged or
            missing cells => re-roll the sheet, don't cut).
  --preview writes a contact sheet of the cut pieces on a checkerboard so you can
            look at the keying before embedding.
Prints each component's bbox so you can see what was found.
"""
import argparse, os, sys
import numpy as np
from PIL import Image
from scipy import ndimage as ndi


def key_mask(rgb):
    a = rgb.astype(int)
    r, g, b = a[..., 0], a[..., 1], a[..., 2]
    return (r > 150) & (b > g + 40) & (b > 110)  # True = magenta


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('src'); ap.add_argument('outdir')
    ap.add_argument('--names', required=True)
    ap.add_argument('--size', default='128')
    ap.add_argument('--wh', default=None)
    ap.add_argument('--fmt', default='webp')
    ap.add_argument('--min-frac', type=float, default=0.02,
                    help='keep components with area >= this fraction of the biggest')
    ap.add_argument('--open', type=int, default=2, help='opening radius (px)')
    ap.add_argument('--expect', type=int, default=None)
    ap.add_argument('--preview', default=None)
    ap.add_argument('--grid', default=None,
                    help='COLSxROWS: the sheet is a regular grid; ignore a band of --inset px inside every '
                         'cell edge so thin grid lines between cells cannot join the icons into one blob')
    ap.add_argument('--inset', type=int, default=14)
    ap.add_argument('--row-tol', type=float, default=0.5,
                    help='components whose centres differ in y by < tol*height share a row')
    args = ap.parse_args()

    im = Image.open(args.src).convert('RGB')
    rgb = np.array(im)
    mag = key_mask(rgb)
    fg = ~mag
    st = ndi.generate_binary_structure(2, 2)
    if args.grid:
        gc, gr = [int(v) for v in args.grid.lower().split('x')]
        H, W = fg.shape
        interior = np.zeros_like(fg)
        for r_ in range(gr):
            for c_ in range(gc):
                y0, y1 = int(r_ * H / gr) + args.inset, int((r_ + 1) * H / gr) - args.inset
                x0, x1 = int(c_ * W / gc) + args.inset, int((c_ + 1) * W / gc) - args.inset
                interior[y0:y1, x0:x1] = True
        fg &= interior
    if args.open > 0:
        fg = ndi.binary_opening(fg, structure=st, iterations=args.open)
    lab, n = ndi.label(fg, structure=st)
    if n == 0:
        sys.exit('no foreground found - is the background really magenta?')
    areas = ndi.sum(fg, lab, range(1, n + 1))
    keep = [i + 1 for i, ar in enumerate(areas) if ar >= areas.max() * args.min_frac]
    objs = ndi.find_objects(lab)
    comps = []
    for i in keep:
        sl = objs[i - 1]
        y0, y1, x0, x1 = sl[0].start, sl[0].stop, sl[1].start, sl[1].stop
        comps.append(dict(id=i, box=(x0, y0, x1, y1), cy=(y0 + y1) / 2, cx=(x0 + x1) / 2,
                          h=y1 - y0, area=areas[i - 1]))
    # reading order: cluster into rows by centre y, then sort by x
    comps.sort(key=lambda c: c['cy'])
    rows, cur = [], [comps[0]]
    for c in comps[1:]:
        ref_h = np.median([k['h'] for k in cur])
        if abs(c['cy'] - np.mean([k['cy'] for k in cur])) < args.row_tol * ref_h:
            cur.append(c)
        else:
            rows.append(cur); cur = [c]
    rows.append(cur)
    ordered = [c for r in rows for c in sorted(r, key=lambda k: k['cx'])]
    print(f'{len(ordered)} components kept ({n} found), rows: {[len(r) for r in rows]}')
    for k, c in enumerate(ordered):
        print(f'  #{k}: bbox={c["box"]} area={int(c["area"])}')
    if args.expect is not None and len(ordered) != args.expect:
        sys.exit(f'EXPECTED {args.expect} components, got {len(ordered)} - re-roll or tune --min-frac/--open')

    names = args.names.split(',')
    if len(names) != len(ordered):
        sys.exit(f'{len(names)} names but {len(ordered)} components')
    sizes = [int(s) for s in args.size.split(',')]
    if len(sizes) == 1:
        sizes = sizes * len(names)
    os.makedirs(args.outdir, exist_ok=True)

    pieces = []
    for name, size, c in zip(names, sizes, ordered):
        if name == '-':
            continue
        x0, y0, x1, y1 = c['box']
        m = (lab[y0:y1, x0:x1] == c['id'])
        m = ndi.binary_fill_holes(m)
        # shave 1 px of jpeg/magenta fringe, then despill pink on the edge
        inner = ndi.binary_erosion(m, structure=st, iterations=1)
        crop = rgb[y0:y1, x0:x1].astype(int).copy()
        r, g, b = crop[..., 0], crop[..., 1], crop[..., 2]
        spill = (b > g + 20) & (r > 120) & ~ndi.binary_erosion(inner, structure=st, iterations=2)
        crop[..., 2] = np.where(spill, np.minimum(b, g + 10), b)
        crop[..., 0] = np.where(spill, np.minimum(r, g + 60), r)
        alpha = (inner * 255).astype(np.uint8)
        rgba = np.dstack([np.clip(crop, 0, 255).astype(np.uint8), alpha])
        piece = Image.fromarray(rgba, 'RGBA')
        bb = piece.getbbox()
        piece = piece.crop(bb)
        if args.wh:
            bw, bh = [int(v) for v in args.wh.lower().split('x')]
        else:
            bw = bh = size
        s = min(bw / piece.width, bh / piece.height)
        nw, nh = max(1, round(piece.width * s)), max(1, round(piece.height * s))
        piece = piece.resize((nw, nh), Image.LANCZOS)
        canvas = Image.new('RGBA', (bw, bh), (0, 0, 0, 0))
        canvas.paste(piece, ((bw - nw) // 2, (bh - nh) // 2), piece)
        path = os.path.join(args.outdir, f'{name}.{args.fmt}')
        if args.fmt == 'webp':
            canvas.save(path, 'WEBP', lossless=True, quality=100, method=6)
        else:
            canvas.save(path, 'PNG', optimize=True)
        print(f'  saved {path} {canvas.size} {os.path.getsize(path)} bytes')
        pieces.append(canvas)

    if args.preview and pieces:
        pad = 12
        W = sum(p.width for p in pieces) + pad * (len(pieces) + 1)
        H = max(p.height for p in pieces) + 2 * pad
        sheet = Image.new('RGBA', (W, H), (60, 60, 60, 255))
        # checkerboard
        px = sheet.load()
        for y in range(H):
            for x in range(W):
                if ((x // 8) + (y // 8)) % 2:
                    px[x, y] = (90, 90, 90, 255)
        x = pad
        for p in pieces:
            sheet.paste(p, (x, pad), p)
            x += p.width + pad
        sheet.convert('RGB').save(args.preview)
        print('preview', args.preview)


if __name__ == '__main__':
    main()
