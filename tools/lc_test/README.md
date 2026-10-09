# lc_test: headless test harness for Liar's Crawl

For future AI sessions. Use this to run the game, reach a screen and screenshot it, without a human.

## Why it exists
The game is one ~17 MB HTML file (mostly base64 art) and one big IIFE, so nothing (S, C, startCombat, render ...) is global. You must serve it over **http** (not file://) and drive headless Chromium. `lc.py` does both; `mkdbg.py` adds one line to a *copy* that exposes the game's internals. The real game file is never modified.

## Requirements
`pip install playwright` (Chromium is normally pre-installed at /opt/pw-browsers; do NOT run `playwright install`). Python 3, Pillow, numpy, scipy for the art tools.

## Quick use
```python
import sys; sys.path.insert(0, 'tools/lc_test')
from lc import LC
with LC('/home/claude/liars-crawl.html') as lc:      # serves a debug copy on :8765 with ?nointro
    lc.ev("startRun()")                               # JS INSIDE the game closure (S, C, render ...)
    lc.wait(1000)
    lc.shot('/tmp/map.png')                           # viewport 1376x768
    lc.shot('/tmp/x.png', '#buckmark')                # clip to an element (does not wait for animations)
    lc.click('#cog')
    print(lc.errors)                                  # console errors, page errors, HTTP >= 400
```
CLI: `python3 tools/lc_test/lc.py shot OUT.png --html FILE [--js CODE] [--selector CSS]`.

## Recipes (via `lc.ev`)
- Map screen: `startRun()`
- Fight: `(function(){var n=S.floor.nodes.filter(function(n){return n.enemy&&n.type==='fight'})[0]; S.cur=n.id; startCombat(n);})()`; the coin toss `.fxcoin` shows after ~2.5 s (click with `force=True`), then `doRoll()` gives the bid phase where `#buckmark` shows.
- End screens: `S.endKind='ruin'|'dead'|'won'|'quit'; S.screen='end'; render()`
- Windows: `lc.click('#cog')` settings, `#rulesBtn`, `#jukeBtn`, `openKey()`, `openWeb()`.
- Windows appended to `<html>` are styled with `html .x`, not `html body .x`.

## Ready-made scenarios (`scenarios/`)
Each: `python3 tools/lc_test/scenarios/NAME.py HTML OUTPREFIX` and writes PNGs. Run it on the backup (old) and the working file (new) to make before/after pairs.
- `item1_toss_buck.py` coin toss and buck marker
- `item3_windows.py` Settings, Rules, Jukebox, Key, Web of Bones
- `item4_gameover.py` end screens
- `icons_preview.py HTML OUT.png id1,id2` renders relic icons

## Gotchas
- Expected console error in the sandbox: `net::ERR_TUNNEL_CONNECTION_FAILED` (Google Fonts blocked). Not an art problem.
- Animated elements: `element.screenshot()`/normal clicks time out ("not stable"); `shot(selector)` clips the viewport and clicks use `force=True`.
- The `audio/` folder is symlinked into the served directory automatically.
- `lc_welcome` / `lc_ptkseen` are pre-set so the welcome note does not block clicks.
