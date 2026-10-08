# Playtester feedback and to-do list

Raw reports come from the in-game "feels bad" buttons (artifact db collection `feelsbad`, or pasted from "Copy my reports"). Newest batches at the bottom of the raw log. Status: [ ] open, [x] done.

## To do (from tester batch 1, 2026-10-08)
- [x] **Seal drag ghost persists between screens**: a dragged seal stays on screen between map and battle. Clear it on screen change. (bug)
- [x] **Centre the eavesdrop eye over the die** (peek icon is off-centre).
- [x] **Map text shadow**: text on the map has a weird shadow that makes events hard to read. Cleaner labels, more contrast.
- [x] **Autospin who goes first**: the opening spin that picks the first bidder should roll by itself.
- [x] **Auto-roll option**: toggle in Settings so the roll button is not needed every round.
- [x] **Dragging the character on the map** (done: drop on a connected room moves you; anywhere else the pawn falls over, lies there, then hops back to its own room) (asked tester's meaning; probably the pawn). Decide: drag pawn onto a connected room to move there, or leave it.
- [x] **"Crawl" wording** (closed 2026-10-08: it was the character select layout; user decided to leave it as is) ("the word crawl should be below the options, or just remove crawl to start - feels weird"). Unclear which screen; likely START CRAWLING on title/class screen. Ask user.
- [x] **Ability text confusing**: "when choosing an ability it's confusing: roll 2 die and on 8+ gain 1 (symbol I don't understand)". Find which level-up card, rewrite in plain words / explain the icon.

## Other open items (from the dev session)
- [x] **Log button art** (done 2026-10-08, Gemini plates 9-sliced) (prompt C in `assets/prompts.md`) (code-drawn iron-and-wood plaque for now, `.topbtns .btn`); replace with Gemini art matching the settings cog if wanted.
- [x] **Max hit point icon art** (done 2026-10-08) (prompt B) ("+1 max HP", used by `maxIc()` in Fortify, level-up window, ability text). Currently a code-drawn die-with-green-plus (`MAXIC_SVG`). Needs Gemini art; save per asset rules, swap into `maxIc()`, record in `assets/INDEX.md` + `assets/prompts.md`.
- [x] **Looking Glass card art** (done 2026-10-08) (prompt A) (common card `glass`, added 2026-10-08: "Use on your turn: force the enemy to bid again"). Currently a code-drawn pixel placeholder. Needs Gemini card art (same style as Quick Knife); save per asset rules, wire into `NEWART`/`CARD2` like the other cards, record in `assets/INDEX.md` + `assets/prompts.md`.
- [x] Level-up window: faint purple edge on the banners (fixed 2026-10-08 by removing the magenta key fringe from the encounter-window art; originals in `assets/_old/`).
- [x] **Dead-end room icons** (done 2026-10-08) (slot machine, treasure chest; prompt D). Wire into `MAPINK` / `mapHTML()` for `n.spur`.
- [x] Looking Glass availability (2026-10-08): start deck has 1; ~30% of floor-1 fights drop one (25% later floors; cap 3 on floor 1, 4 later); one always on the shop shelf (base price 20). Tune in `afterCombat` / `pickSpoils`.
- [ ] Face-die colour is "Old parchment", placeholder; revisit.
- [ ] Verify in the published page: Copy my reports (clipboard), pause screen, db saves (testers must be invited as Contributors).
- [ ] Unpublished work since v318: level-up window width fix and title, HUD pop-out punch + sounds, warning banners + "Evil has awoken", "Roll for a Seal", Gambler's Ruin camera/shake.

## Raw reports
```
{"kind":"ui","when":"2026-10-08T09:46:44.079Z","screen":"map","view":"1728x923","phase":null,"enemy":null,"round":null,"floor":1,"day":0,"hp":6,"level":1,"gold":0,"over":"#app","note":"i think maybe the word crawl should be below the options or just remove crawl to start - feels weird"}
{"kind":"ui","when":"2026-10-08T09:47:37.536Z","screen":"map","view":"1728x923","phase":null,"enemy":null,"round":null,"floor":1,"day":0,"hp":6,"level":1,"gold":0,"over":".hudhid","note":"it's weird that i can drag and drop my character on the map and it does nothing"}
{"kind":"ui","when":"2026-10-08T09:48:47.105Z","screen":"combat","view":"1728x923","phase":"bid","round":1,"floor":1,"day":1,"hp":6,"level":1,"gold":1,"over":"#app","note":"i can drag and drop seal and it remains on my screen between map and battle"}
{"kind":"ui","when":"2026-10-08T09:50:39.492Z","screen":"combat","view":"1728x923","phase":"bid","round":2,"floor":1,"day":1,"hp":6,"level":1,"gold":1,"over":"#app","note":"centre the evesdrop eye over die"}
{"kind":"ui","when":"2026-10-08T09:52:39.607Z","screen":"levelup","view":"1728x923","phase":"won","round":4,"floor":1,"day":1,"hp":4,"level":2,"gold":14,"over":"#app","note":"when choosing an ability it's confusing roll 2 die and on 8+ gain 1 (symbol I don't understand)"}
{"kind":"ui","when":"2026-10-08T09:54:02.948Z","screen":"map","view":"1728x923","phase":"won","round":4,"floor":1,"day":1,"hp":4,"level":2,"gold":14,"over":"#app","note":"text on map has a weird shadow and makes events hard to read"}
{"kind":"game","when":"2026-10-08T09:54:55.780Z","screen":"combat","view":"1728x923","phase":"bid","round":1,"floor":1,"day":3,"hp":3,"level":2,"gold":14,"bid":null,"turn":"p","note":"autospin the who goes first in battles"}
{"kind":"game","when":"2026-10-08T09:55:57.484Z","screen":"combat","view":"1728x923","phase":"bid","round":2,"floor":1,"day":3,"hp":3,"level":2,"gold":14,"bid":"1x2","turn":"p","note":"maybe give option to autoroll also"}
```
