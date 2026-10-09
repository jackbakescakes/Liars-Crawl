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

## Enemy AI rebuild (2026-10-09, published)
- FIXED (working file): playing the Looking Glass on your turn looked like it did nothing (it only added a pass charge). It now passes the buck at once on your turn, and banks a pass when played on the enemy's turn. The turn marker is now the buck (gold token) with the PASS button beside it; the ability-row button is gone.
- New engine: Bayesian read of the player's hand from this round's bids, win-chance lookahead (depth 2) with a measured win table, learns the player's nerve and honesty within a run. Knobs and training room updated (new sliders: Your trust, Adapt; Skill runs to 1.00).
- Sim results (tools/ai): at full skill vs the old AI at its max, 97% wins at 6v6; an honest-maths player beat the old 3-die goblin at max skill 87% of the time, now 17%.
- OPEN: calibrate the skill curve. At 0.52 (floor-1 goblin) the honest-maths player wins ~52% (was 83%). Tune `AI_TUNE` so 0.5 feels like the old goblin while 1.0 keeps the full strength, then look at per-enemy skill numbers. Third win-table pass (with `dieWorth` in the self-play objective) to embed when done.
- OPEN: check the AI's think time on slow machines in the biggest fights (12+ player dice vs 9); cap `P.hands` lower if it stutters.

## To do (from the 2026-10-09 review; details and repro steps in the review doc)
- [x] Seals: one screen for every seal (drag onto a die, then Seal bound); no loose seals.
- [x] Pass the buck: once-per-fight charge; Looking Glass adds a charge.
- [x] Enemy AI: bluffing + difficulty knobs; Training room in Dev tools.
- [x] Satchel retired (flag `SATCHEL_ON`).
- [x] `<meta charset>`; potion card `undefined` flavour line.
- [ ] Dropped Note "click to read" and "Skip tip" cannot be clicked (under the HP row / portrait); the note stays all run.
- [ ] Elite chest shows one of three rewards in a 254 px scroll box.
- [ ] Pit Boss blackjack hand draws all player dice as dead Xs.
- [ ] Floor 4 map: the House room is scrolled above the frame.
- [ ] HUD portrait cluster covers bottom-left map rooms (column 0, row 6).
- [ ] 1366×768: buck spinner and Auto roll checkbox sit over the dice row.
- [ ] Relic bought in the shop lands on the shop floor; relic button covered by the panel footer.
- [ ] Report sits on top of the floor shop after the Pit Boss; first TAKE YOUR SPOILS press does nothing visible.
- [ ] Level-up repeats "(have 1)" picks; pool of 8 repeats by level 4.
- [ ] Soul Rend text: item says 50+, card says 30.
- [ ] Roll-coin tooltip covers the bid row when the mouse rests on the coin.
- [ ] Balance (sim): floor-1 fights cost an honest player ~1.7 dice; last-die Spot On gamble (now the `lastDie` knob, default 0.4) — tune in the Training room.

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

## 2026-10-09 evening (user decisions on the review)
- [ ] **"You hold N" badge on the bid die** (Spot On legibility): show how many of the bid face the player holds, so the counting is on screen. User: implement.
- [ ] **Report -> level-up chain:** fold the chest's three reward tiles into the battle report, single CONTINUE; fix the elite chest scroll box (one of three rewards visible); remove the duplicate title banner on the level-up window. User: do it, will review how it looks.
- [ ] **Relics as loose icons: parked, on the to-do list.** Idea: relic slots appear below the rewards when you have a relic to equip. Unclear where all relics enter the game; revisit.
- [x] **Under the gun (2026-10-09, supersedes the wording below):** the buck is now UNDER THE GUN. A gold tile with a revolver (code-drawn, `BUCK_IMG`) sits on the TOP of the portrait of whoever acts first and passes between players; the toss coin lands knight = you act first, skull = the enemy acts first; banner "ENEMY UNDER THE GUN!" / "YOU'RE UNDER THE GUN". PASS button text now says "Pass the gun". Revolver art for Gemini not yet requested.
- [x] **Toss the buck** (2026-10-09): the first-turn spinner is now a coin toss (`firstSpin`, CSS `#firstfx.toss`): big coin flips mid-screen, knight face = you win the buck (enemy opens), skull = enemy wins; lands, banner, then flies to the portrait of whoever bids first. OPEN QUESTION: the banner says "YOU'RE THE BUCK" but the marker then sits on the enemy (they open). Decide whether winning the toss should mean you open instead.
- Calibrating the AI skill slider is a dev-tool concern, low priority (user).

## 2026-10-09 evening, batch 2 (working file, not yet published)
- [x] Fight tutorial on the first Dummy fight (`TUT_STEPS`, `#tut`; localStorage `lc_fighttut`; Reset tutorials clears it). Game clock frozen while a card is up.
- [x] Dummy fight can no longer be skipped from the map; inside the fight a returning player gets "I've seen this before: skip" (`.dumskip`, `dummySkipFight`).
- [x] Toss: no TOSS button, click the coin. Heading "WHO GETS THE BUCK?", banner "YOU HAVE THE BUCK" / "THE ENEMY HAS THE BUCK" (the under-the-gun naming was tried and dropped the same day; the token art is still the gun placeholder, round; Gemini prompt in assets/prompts.md).
- [x] Map: reachable rooms glow while the pawn is held; icons glow on hover.
- [x] Tinker text: "Choose one face of one die to tinker with. You increase its number by two. Numbers above six are wild."
- [x] Forge (SEAL FOUND / tinker / tattoo) and SEAL BOUND / STRENGTHENED screens now use the encounter-window art (`encWinHTML`, `.forgewin`, `.upgwin`), with red X.
- [x] Settings cog restyled: playtester cog shape in gold.
- [x] Looking Glass card text box enlarged (first line was clipped).
- [ ] Level-up screen: cards 15% smaller on parchment; cards vanish on mouse-out on first entry; assets jostle just before it opens AND while dice roll in a fight (same cause?).
- [ ] Fortify / roll-two-dice events: 3D animated roll with sound, dice further apart, obvious two-dice pick, flavour text -> "Choose two dice".
- [ ] Dice, XP bar and deck follow the portrait when it is dragged with the cluster open.
- [ ] Relics equip-on-pickup (parked; idea: relic slots under the rewards).
- [ ] "You hold N" badge on the bid die; fold the chest tiles into the report (single CONTINUE); duplicate level-up banner.
- [ ] Buck token + toss coin art from Gemini (round token, revolver face, skull face).
- [ ] **ENEMY PERSONALITIES (agreed 2026-10-09, do this as the calibration pass).** Every enemy gets a two- or three-word personality in its data (coward, bluffer, hair-trigger, honest, patient...), each mapped to an `ai` knob set (bluff, reach, gull, liar, exact, adapt). Floor 1 uses the readable ones: Cutpurse bluffs often; Eavesdrop never bluffs but calls early; Weathercock swings between the two. The enemy's rules tooltip states the personality in plain words ("Bluffs often. Calls early."). `skill` becomes a floor-level sharpness setting rather than a per-enemy number. Then set numbers from the simulator (tools/ai).
- [ ] **AI DIFFICULTY: CALIBRATE PROPERLY LATER.** Interim fix 2026-10-09: every floor-1 skill number lowered by about a third (cutpurse 0.4->0.27, fence/eavesdrop 0.45->0.3, blackjack/weathercock/sanguine/selcouth 0.5->0.33, lootgob 0.2->0.13, ogre 0.7->0.47, dealer 0.95->0.65; weathercock's moody swing 0.9/0.1 -> 0.6/0.07). Note `enemyAct` still adds +0.12 to every enemy's skill (`effSkill`). The real job: reshape `AI_TUNE` so low skill also means less lookahead, a weaker read of the player's bids and more careless bluffs, then set per-enemy numbers from the simulator (tools/ai) so a floor-1 goblin beats the honest-maths tester about 1 fight in 5. Floors 2-4 untouched.

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
