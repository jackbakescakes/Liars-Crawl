# Liar's Crawl — rules for Claude

Single-file HTML pixel-art dungeon crawler (Liar's Dice combat). Working file: `/home/claude/liars-crawl.html`; this repo holds the published copy (`index.html`).

## Asset rules (read before touching any art)

Art lives in `assets/`, NOT in /tmp (temp folders are wiped between sessions). The game embeds art as base64 inside the HTML, which is slow to search — so `assets/INDEX.md` is the source of truth for finding things.

1. **Look first.** Before asking the user for art or making a new asset, read `assets/INDEX.md` and grep it for keywords (e.g. "red x", "close", "house", "stamp").
2. **Save the original the moment the user sends it.** Put the untouched Gemini sheet in `assets/sheets/` BEFORE any cutting/keying. Name: `<what>_<yyyymmdd>_src.png` (e.g. `stamps_20261007_src.png`). Never overwrite originals.
3. **Save every processed asset** (cut-out, keyed, resized) as its own file in the matching folder: `portraits/ maps/ tokens/ stamps/ ui/ cards/`. Name: `<subject>_<variant>.png` or `.webp`, lowercase, underscores (`house_idle.webp`, `stamp_caught.png`, `ui_close_x_red.png`). Keep the transparent (magenta-keyed) version, not the preview.
4. **Add a line to `assets/INDEX.md` in the same turn**, one per asset:
   `| file | what it is (plain words) | size WxH | used in game as (JS constant / CSS class, or "unused") | source sheet + prompt note |`
5. **Record where it is wired in.** Name the JS constant or CSS selector (`STAMPS.caught`, `HPAWN.idle`, `MAPBG[1]`, `.redx`). If it replaces something, say what.
6. **Save the Gemini prompt** that produced it (or a one-line summary) in `assets/prompts.md` under a dated heading, so a re-roll can start from it.
7. **Code-drawn placeholders count too** (e.g. the CSS red X): list them as "code-drawn, replace with Gemini art if supplied".
8. **Keep it tidy.** If an asset is replaced, move the old one to `assets/_old/` and mark it in the index; don't delete.
9. **Commit assets with the code** when the user says "commit"/"publish" (large files OK; keep each under ~5 MB).

Gemini pipeline: magenta key `(r>150)&(b>g+40)&(b>110)` → opening → keep big components → crop → resize → webp base64 into the JS constant.

## Workflow rules

- The user sends batches of changes. Edit and test only the working file (`/home/claude/liars-crawl.html`).
- Commit/publish ONLY when the user says "commit" or "publish". Publish = copy to `liars-crawl-compact.html` and `liars-crawl/index.html`, `git add -A && git commit`, `git push -q origin HEAD`, then publish the artifact (https://claude.ai/artifact/1WM6YVJEMgyTNLVpv5j61Q).
- Commit messages end with the attribution lines the session specifies.
- Playable on a computer screen with no scrolling. Keep on-screen text minimal; icons first, explanations in the Rules menu.
- Music is parked.

## Title lettering alphabet (the game's logo font) — PENDING from Gemini
The user is having Gemini draw a full alphabet in the style of the "LIAR'S CRAWL" title (chunky cream block letters, ember-orange lower edges, dark outline, blood drips), so any text can be set in the logo style (START CRAWLING, banners, stamps, headings).
- Where it goes: `assets/fonts/title_<CHAR>.webp` (transparent, magenta-keyed; punctuation by name: `title_bang.webp`, `title_question.webp`, `title_apostrophe.webp`, `title_period.webp`; digits `title_0..9.webp`). Original sheets: `assets/sheets/title_font_sheet_<yyyymmdd>_src.png`.
- Layout of the sheet the user was asked for: 6 columns x 5 rows of equal cells, reading order A-Z, then ! ? ' . — second sheet: digits 0-9. Cut each cell, key out magenta, trim, keep a shared baseline and cap height (record per-letter width + baseline offset in `assets/fonts/title_metrics.json`).
- Existing lettering to reuse until it arrives: the `LIAR_IMG` / `.tavlogo` title image, the generated block `wordmark()` function, and STAMPS (`liar`, `honest`, `caught`, `awakens`).
- Once it exists: add a small JS helper `titleText("START CRAWLING", height)` that builds inline `<img>` letters from the embedded constants, and list it in `assets/INDEX.md`. Check `assets/fonts/` before drawing any new logo-style text.
