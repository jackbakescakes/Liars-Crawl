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

- **RULE: every window/popup/menu gets a red X** (top-right) that closes it. In the game this is automatic for anything listed in the `WIN_X` array (just before the "settings cog and panel" code): add `{ sel: '<window box selector>', find: '<existing close button selector>' }` (or `fn` to close it) for every NEW window, so the scanner injects `.winx` (red `X_SVG`). Windows appended to `<html>` (not `<body>`) must be styled with `html .winx`, not `html body .winx`. Confirm the X shows in a screenshot before reporting done.
- Dev tools (purple draggable button left of the character icon, `#devbtn`/`#devmenu`): Current loop, Advance floor, Gain gold, Gain XP. Keep it in the game.
- The user sends batches of changes. Edit and test only the working file (`/home/claude/liars-crawl.html`).
- **Art is split out of the HTML for the artifact (16 MB page limit).** The working file stays single-file (art embedded as base64) so editing and testing are unchanged. For the artifact, run `python3 tools/split_assets.py /home/claude/liars-crawl.html /home/claude/dist` (page ~2 MB + `img/<hash>.webp|png|jpg`, deduped; images under 8 KB and inline SVG stay embedded; the default 8 KB keeps the file count near 370 of the 511 allowed; `audio/` is already separate). Publish `/home/claude/dist/index.html` with the Artifact tool `files` map (`img/...` and `audio/...` paths), at most 255 files and 64 MB per call: first call has `file_path` = the index plus the first batch, then more calls with the same `url` for the rest (later publishes keep earlier files; remove stale `img/` files by sending `null` for them). Whole version limit: 511 files / 256 MB, so if the image count passes ~480, raise `--min` (or pack the small images into sprite sheets. Test the split build locally first (`cd /tmp/t && python3 mkdbg.py ... && python3 /home/claude/liars-crawl/tools/split_assets.py dbg.html sp`, serve over http, not file://, so canvas reads stay same-origin). The repo `index.html` can stay single-file (GitHub allows 100 MB).
- Commit/publish ONLY when the user says "commit" or "publish". Publish = copy to `liars-crawl-compact.html` and `liars-crawl/index.html`, `git add -A && git commit`, `git push -q origin HEAD`, then publish the artifact (https://claude.ai/artifact/1WM6YVJEMgyTNLVpv5j61Q).
- Commit messages end with the attribution lines the session specifies.
- Playable on a computer screen with no scrolling. Keep on-screen text minimal; icons first, explanations in the Rules menu.
- Music is parked.

## Title lettering alphabet (the game's logo font) — DONE and in the game
The user is having Gemini draw a full alphabet in the style of the "LIAR'S CRAWL" title (chunky cream block letters, ember-orange lower edges, dark outline, blood drips), so any text can be set in the logo style (START CRAWLING, banners, stamps, headings).
- Status: both sheets received, cut into `assets/fonts/title_<CHAR>.webp` (A-Z, 0-9, ! ? ' . : , - + / % & x as `bang question apostrophe period colon comma minus plus slash percent amp x_mul`) with `title_metrics.json`. Originals: `assets/sheets/title_font_sheet_20261007_src.png`, `title_font_digits_20261007_src.png`. The C is a little too grey/white (user said leave it for now). All glyph files share a 198px cell height and baseline; cap top y=19, baseline y=182.
- In the game: JS `TITLEFONT` + `titleText(text, capPx)` (defined just before `beginCrawl`) returns inline HTML in the logo font; CSS `.tfont`. Used for the START CRAWLING screen. Use it for any new logo-style text. The prompt that got the right look is in `assets/prompts.md`.
- Where it goes: `assets/fonts/title_<CHAR>.webp` (transparent, magenta-keyed; punctuation by name: `title_bang.webp`, `title_question.webp`, `title_apostrophe.webp`, `title_period.webp`; digits `title_0..9.webp`). Original sheets: `assets/sheets/title_font_sheet_<yyyymmdd>_src.png`.
- Layout of the sheet the user was asked for: 6 columns x 5 rows of equal cells, reading order A-Z, then ! ? ' . — second sheet: digits 0-9. Cut each cell, key out magenta, trim, keep a shared baseline and cap height (record per-letter width + baseline offset in `assets/fonts/title_metrics.json`).
- Existing lettering to reuse until it arrives: the `LIAR_IMG` / `.tavlogo` title image, the generated block `wordmark()` function, and STAMPS (`liar`, `honest`, `caught`, `awakens`).
- Once it exists: add a small JS helper `titleText("START CRAWLING", height)` that builds inline `<img>` letters from the embedded constants, and list it in `assets/INDEX.md`. Check `assets/fonts/` before drawing any new logo-style text.

## New map (built 2026-10-08, in the working file) — how it works
- Each non-final floor: Start (`E`) -> Target Dummy (`D`; a normal fight on floors 2+) -> 8 rows of rooms (22 on the lanes + 2 dead ends: `slots` and `chest` events) -> `BOSS`. Straight route = 8 rooms then the boss as the 9th step; elites and dead ends are starred (`n.star`, `tier 1`) and only reachable by a sideways hop. Generator `makeFloor(num)` (old line-map kept as `makeFloorLine`, still used for the last floor). Map is 1024 x 1620 virtual units (`mapH()`), shown through a 1024x572 box that follows the player (`.map.tall`, `mapZoomApply`).
- Move to ANY connected room. Every step costs a day (`S.day`, counted from the dummy, `S.dayOn`); stepping on a cleared room offers Camp / Move on (`S.backAsk`, shown on the 'dummy' screen).
- Chaser: single `CHASER` config (name "Gambler's Ruin", warnings end of day 6 and 7, appears at the start after day 8, then moves one tile a day after the player's room is done). Caught or stepping onto it = `S.endKind='ruin'` game over (uses `RUIN_ART`). `dayEnd()`, `ruinCaught()`. Chaser pawn frames are `HPAWN` (from `assets/portraits/chaser_*`).
- Parchments: `PARCHT[1..3]` (tall) and `PARCH[4]` (wide). Pitfall: `"4": "data:image..."` also exists in `TITLEFONT`; never regex-replace the first match.
- A copy of the game from before this map work is in `/home/claude/backups/` (not in the repo).

## Opening sequence
- Game opens on a black overlay (`#introblack`, code before the final `render()`): click/key starts the title music (`calm.mp3`), and the overlay fades out over 2.4 s, starting 1.5 s before and ending on the first big hit, 10.3 s into the track (timed from `MUSC.v.t0`). Skips the wait if muted/audio fails; `?nointro` in the URL disables it (for tests).
- Title/char screen light flicker: `#flick` (appended to `<html>`, z-index -1, cover-fitted to the 1376x768 background) holds CSS-animated warm glows over the fireplace, candles and lanterns (`@keyframes flickA/B/C`). Positions are % of the background image; code-drawn, no art asset.

## Tester tools and recent UI (2026-10-08, in the game)
- **Feels-bad buttons** (top-left, `#fbcl`): Music (red), UI (orange), Gameplay (blue) plus "Copy my reports". Each press records context (music: loop name/position; UI: element under mouse; gameplay: bid/turn), pauses the game, plays a sound, bursts particles and opens a note box (`#fbnote`). Saved to artifact db collection `feelsbad` (also kept in localStorage `lcFeelsBad`, full history `lcFeelsBadAll` for Copy). **Publish must declare capabilities** `{db:{rules:[{path:"feelsbad",read:"admin",write:"view"},{path:"feedback",read:"admin",write:"view"}]},user:{}}` or notes only stay local. Read with ArtifactData (collections `feelsbad`, `feedback`). Anonymous link viewers get no db (copy fallback).
- **Feedback button** (pink `#fbbtn`, above Dev tools): bug/idea/other note window `#fbwin`, saved to collection `feedback`, clipboard fallback.
- **Pause** (`window.gamePause`, `#pausev`): a virtual clock shim at the top of the main script (`window.__pause`, wraps setTimeout/setInterval/Date.now/performance.now/rAF) freezes the game; audio ctx suspended. Use `window.__rawNow` / `__rawST` for real time in UI that must keep working while paused.
- Other: collapsible/draggable portrait cluster, auto-fold map with chevrons, battle report v3, character select v2 (wood buttons), Reset UI (keeps large map), fullscreen button in Settings, right-click suppressed, targeting popup shows "-1 die icon" + seals, face die colour = "Old parchment" (placeholder, revisit), level-up window 1300x760 (title banner still clipped at top; purple edge on banners).

## TODO / known issues (read this when starting a new session)
- **Map parchment is plain for now (2026-10-08).** The user found the stains/blood/blots and margin drawings hard to read behind the route. `PARCHT`/`PARCH` now hold plain versions (`assets/maps/PARCH*_plain.webp`, made by flattening the interior of the originals in `assets/_old/PARCH*_*.webp`) and `.mdecor` (splats + margin drawings from `inkDecor()`) is hidden by CSS. Revisit later with better parchment art (clean texture, subtle edge wear only), then restore or redo the decorations.
- Character select restyled (wood-and-iron window from `ui/panel_wood_iron.png`, marble buttons for class rows and `?`); user to review.
- **Dead-end rooms need their own icons** (slot machine and treasure chest). Right now they show the scroll "unknown event" icon plus a gold star (`.map.tall .node.tier1 .nicon::after`). Ask the user for Gemini art, save per the asset rules, add `MAPINK` entries and use them in `mapHTML()` for nodes with `n.spur`.
- Star badge is a CSS star only; elites could use a distinct icon.
- Dungeon-plan map art (rock/room/hall tiles, user may draw their own) is parked until the game is in a better state. Mockup boards E/F/G in the map-layout canvas artifact; prompts in `assets/prompts.md`. User prefers to draw/provide pieces later; do not use the web reference maps in the game.
- Tall parchments are only 637 px wide (soft when stretched); ask Gemini for larger if wanted.
- Game-over screen is the old end panel with the dice picture (`RUIN_ART`, `.ruinart`); a full-screen design may come later.
- The dummy room on floors 2 and 3 is an ordinary fight.
- Split-assets publish has now been run for real (artifact version 310: index.html 3.6 MB + 371 img/ + 16 audio/ = 388 files, uploaded in two calls; audio already live so it was not re-sent).
- Older parked items: House chaser days/keys (`HOUSE_ON=false`), boss badge re-roll, "this coin wont go in the pouch" wording, Loot Goblin ambush art, arrowhead art, seal balance pass, knight drawing placement (96px), relic open-state art, polyhedra dice only once d8/d12/d20 exist.
