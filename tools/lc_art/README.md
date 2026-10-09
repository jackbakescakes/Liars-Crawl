# lc_art: Gemini sheet -> game art tools

For future AI sessions. Follows the "Gemini pipeline" in CLAUDE.md.

## 1. Get a sheet from Gemini (Claude in Chrome)
- Open a fresh chat at https://gemini.google.com/app, type the prompt, wait for the image, hover it and click the download icon (top right of the image).
- Downloads land in the user's Downloads folder (needs the folder connected). Find the new `Gemini_Generated_Image_*.jpg` with `device_list_dir`, bring it over with `device_stage_files` (lands in `/mnt/user-data/uploads/Downloads/`).
- **Save the untouched file first** as `assets/sheets/<what>_<yyyymmdd>_src.jpg`.
- Quirks: the first prompt typed right after `navigate` is often lost (page freeze), so wait, then retype. Say "no grid lines" or Gemini draws dark cell borders. Ask for flat magenta #FF00FF background, 40 px margins, no text.
- Reject a bad sheet once (re-roll with a fixed prompt); keep the rejected one and mark it rejected in `assets/INDEX.md`.

## 2. Cut: `cut_sheet.py`
```
python3 tools/lc_art/cut_sheet.py SRC OUTDIR --names a,b,c --size 120,240,240 --fmt webp --expect 3 --preview prev.png
```
Keys magenta `(r>150)&(b>g+40)&(b>110)`, opens, keeps large components, reading order, crops, resizes, saves transparent webp/png. `--wh WxH` for non-square, `--grid CxR --inset 14` for sheets with thin grid lines, `--expect N` fails if cells merged. Look at the preview before embedding.

## 3. Embed: `embed_art.py`
```
python3 tools/lc_art/embed_art.py HTML FILE CONST            # var CONST = '...';
python3 tools/lc_art/embed_art.py HTML FILE OBJ.key [--new]  # key in var OBJ = {...}
python3 tools/lc_art/embed_art.py HTML FILE OBJ.key --raw    # CARD2 / RELIC2 hold bare base64
python3 tools/lc_art/embed_art.py HTML FILE CONST --new --after "var GUN_COIN"
```
Never regex-replace "the first data URI": the same keys (e.g. "4") exist in several objects. Edit the working file `/home/claude/liars-crawl.html`.

## 4. Document and verify
INDEX.md row per piece, prompt in prompts.md, old art moved to `assets/_old/`, then screenshot with `tools/lc_test` (see its README). No console errors other than the sandbox font fetch.
