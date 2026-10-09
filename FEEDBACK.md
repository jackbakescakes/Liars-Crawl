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
- [x] Pit Boss blackjack hand draws all player dice as dead Xs. (fixed 2026-10-10)
- [ ] Floor 4 map: the House room is scrolled above the frame.
- [ ] HUD portrait cluster covers bottom-left map rooms (column 0, row 6).
- [ ] 1366×768: buck spinner and Auto roll checkbox sit over the dice row.
- [ ] Relic bought in the shop lands on the shop floor; relic button covered by the panel footer.
- [x] Report sits on top of the floor shop after the Pit Boss; first TAKE YOUR SPOILS press does nothing visible. (not reproducible 2026-10-10)
- [ ] Level-up repeats "(have 1)" picks; pool of 8 repeats by level 4.
- [x] Soul Rend text: item says 50+, card says 30. (fixed 2026-10-10)
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

## 2026-10-09 19:45 (working file, not yet published; built on the other session's art pass, merge ee9b225)
- [x] Merged the other session's Gemini art pass (ee9b225) under this session's unpublished work; clean 3-way merge. Their PASS coin (`BID_ART.pass/passx`, `--pass-coin*`) and level-up card face (`LVL_CARD`, `--lvlcard`) stay parked: user chose (a) for both.
- [x] PASS button reads "The buck"; on hover it reads "Pass the buck" (`.pbl`/`.pbh` spans), shows its explanation and makes the buck marker glow (`#buckmark.hl`).
- [x] Coin toss: the first toss ever (localStorage `lc_tossed`) waits for a click; every later toss plays itself after 0.25 s (1.6 s when the Dummy skip button is showing), spins faster, shorter banner (about 3.8 s in all). Auto-roll checkbox removed from the toss; red X stays hidden. Reset tutorials clears `lc_tossed`.
- [x] No screen scrolls (checked at 1920x1080 and 1366x768, every screen and event): encounter trays never scroll (`.enctrayin` zoom-fits; a much-too-tall event window becomes tall first); the app's scrollbar is hidden outside Rules / skill web. Rules still scrolls (deferred by user).
- [x] Level-up: all four ability buttons the same height; narrower and taller, with gaps between them and from the tray edge.
- [x] Map: the camera keeps your room and the rooms ahead clear of the portrait cluster (left lane above 62% of the view). Rooms behind you can still sit under it on the taller parchment; while the pawn is held the portrait cluster fades to 28% and lets the drop through. Fixed: the folded HUD bar swallowed clicks on the pawn when it stood on the start room.

## 2026-10-09 19:10 (working file, not yet published)
- [x] Settings cog copies the playtester cog's behaviour: hover label "Settings" (gold), hover sound + spin, stays turned while the settings panel is open, chime on open, draggable anywhere with a 6 px threshold, position saved in localStorage `lc_cogpos`, label flips side when the cog is on the left half.
- [x] Map arrival: every time the map screen comes up the HUD is open, the map drops in from above, bounces twice and lands with a thud, then the dice/XP/deck fold into the portrait (`hudAutoFold` -> `hudAutoDrop`, CSS `body.mapdrop` / `body.mappre`). After START CRAWLING it waits for the black-out to lift. `hudMapFit` waits until the map has landed (its measurement is off mid-drop).
- [x] Buck wording: tutorial card now "When you hold the buck, it is your turn. When the enemy holds it, it is theirs."; marker tooltip "If you hold it, it is your turn."

## 2026-10-09 19:00 (working file)
- [x] Stale text fixed: Rules "press Bid" -> drag or click a die; Rules buck row now says PASS sits next to Liar and Spot On (or click the buck); Weathercock tooltip "90% or 10% skill" -> "sharp or sloppy".

## 2026-10-09 18:30 batch (working file, not yet published)
- [x] Dice, XP bar, deck and relic row follow the portrait when it is dragged (shared `--pdx/--pdy` translate).
- [x] Level-up: ability cards 15% smaller (`zoom .64`) on the parchment art (`--encparch`); one banner ("Level N: choose an ability"), the parchment line only when there is a die note (`.noflav`).
- [x] Chest window: the three choices sit side by side, all visible (grid, zoom .62), no scroll box (review bug 3). The chest tile in the report's spoils area already opened it on click (user's design).
- [x] "You hold N" badge: REJECTED (too busy).
- [x] Fortify and every roll-two-dice event: the parchment says "Choose two dice."; two dashed slots fill as you pick; unpicked dice pulse until two are chosen; ROLL beats when ready; the roll is the 3D tumble at 96 px, 90 px apart, with a landing sound per die; the total and verdict are held back until the dice land (1.15 s) and arrive with a win/lose/neutral sting (`.evslots`, `.evpick.need`, `.evrolled`, `.evresult.evwait/.evshow`).
- [ ] NEXT (own sessions): enemy personalities (7 chosen, one enemy in three); relics equip-on-pickup + satchel back.

## 2026-10-09 18:00 user decisions on the re-review (queue, in order)
- [x] PASS THE BUCK as a third gold button in the Liar / Spot On row (`.passbtn.liargold`, data-act buck); clicking the buck marker also passes; the little `.bpass` is hidden.
- [x] Dummy skip for returning players: wood button on the toss screen (`#firstfx .dumskip`).
- [x] Pawn shimmers on the map while it waits (`pawnshimmer`).
- [x] Forge windows: die buttons 72 px; the seal pulses until hovered (`sealpulse`).
- [?] Enemy Spot On did 1 damage instead of 2: code path checked. `resolveCallNow` sets dmg = 2 for an enemy Spot On; the only things that reduce it are the Shield skill / Iron Plate (`C.shield` blocks 1 per hit, with a "blocked" note), the Skullcap relic (caps at 1), Smoke, and the Gauntlet's 5% parry. Most likely the Fighter's Shield skill. Awaiting the user's confirmation; no change made.
- [x] BUG FIXED: the jostle. `fitZoom` re-ran its overflow shrink on every render, so transient overflow (dice slide, bid die, report) shrank the page a few percent and sprang back; in the old build zoom was 0.721 in the fight and 0.766 on the report. Now measured once per fight+viewport (`ZFIT`) and held; a persistent overflow re-measures after 700 ms.
- [x] BUG FIXED: level-up cards vanished on mouse-out. `.card.abilpop:hover` set `animation: none`, cancelling the staggered entry animation (`abilin`, starts at opacity 0 with a delay); on mouse-out it restarted from invisible. Hover styling now applies only to `.settled` cards, plus a 1.5 s fallback that settles any card whose animationend never fired.
- [ ] Enemy personalities CHOSEN: Honest, Bluffer, Patient, Gullible, Suspicious, Counter, Mute. NOT wanted: Hair-trigger, Coward, Gambler, Exact-caller, Mirror. **Only about one enemy in three gets a trait** (too much to parse otherwise); the rest play plain. Next: map each to an `ai` knob set + tooltip phrase, assign, check in the simulator.
- [ ] "All-in eye": REJECTED for now (user: a foe on one die is not more dangerous; it calls Spot On because it has no credible raise). Revisit how to make that legible without a red UI glow.
- [ ] RELICS (own session): equip on pickup -> relic button glows, tray opens, relic flies into its slot, a passive-buff indicator at the top of the screen (placeholder), tray closes. At three relics a fourth opens a "you already hold three: choose which three to equip" window; the rest go to the satchel (re-enable `SATCHEL_ON`). Sellable from the satchel.
- [ ] WHOLE-GAME TEXT PASS: make every screen less text-heavy (tutorial, events, rules, tooltips). Do after this batch.
- Toss length (5 s): user will play and judge. Tutorial trimming: user did a pass; revisit in the text pass.

## 2026-10-09 evening, batch 3 (working file, not yet published)
- [x] BUG: winning the toss gave the opening bid to the enemy (old "buck = enemy opens" rule in `startCombat`). Now the buck holder bids first; the coin flies to the holder; the first Dummy toss always lands on the player (tutorial needs live controls).
- [x] Settings cog moved to `<html>` (unzoomed), 56 px, top 12, right 128; playtester cog left 128 (stale saved 12,12 position re-homed).
- [ ] Re-review recommendations (see the Remaining Recommendations doc): toss banner to ~1.2 s / toss only first fight + bosses; PASS into the Liar/Spot On row; tutorial cut to ~9 cards + scripted Dummy beats; Dummy skip button in wood style or on the toss screen; forge die buttons 72 px + seal drag hint; pawn idle shimmer when it is your move.

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

## 2026-10-09 21:10 batch (working file, not yet published)
- [x] Portrait fold/unfold: dice, XP bar, deck and relics now move together (no stagger), no overshoot or wind-up; the portrait gives one small thump. Open 230 ms ease-out, close 200 ms ease-in.
- [x] XP bar now runs from just before the first die to just after the sixth (was portrait to deck), so it no longer covers the deck.
- [x] Map: the pawn on the start room stands clear of the XP bar (about 20 px above it at 1920 and 1366). `MAPBOTY` 80 -> 185 (more parchment below the start room on new floors) and the current room sits at 70% of the view instead of 78%.
- [x] Toss screen: heading "THE BUCK"; removed the "I've seen this before: skip the Dummy" button and the gun/skull key.
- [x] No screen scrolls now (except Rules and the skill web): the wheel is blocked, keyboard/drag page scrolling snaps back. Risks noted in the code block and CLAUDE.md.
- [ ] OPEN BUG: player cluster pushed off the bottom just after an early toss (user screenshot, 1881x795 claude.ai frame); scrolling then hid it. Not reproduced. No auto-repair (user: it would hide the cause). A recorder saves a layout snapshot once per fight when it happens (`[lc] LAYOUT BUG`, included in Copy my reports).
- [x] Buck art: revolver -> buckhorn folding knife carved into a worn gold coin (second Gemini roll; the first looked like a real knife lying on the coin). One coin used for the toss face (`GUN_COIN`, 240) and the turn marker (`BUCK_IMG`, 120); revolver art moved to `assets/_old/`.

## 2026-10-09 22:30 reports (after v335)
- [x] Log button sat under the settings cog at narrower windows (1280-1536 wide): `logClear()` (runs after every `fitZoom`) nudges `.topbtns` left by the overlap.
- [x] Toss screen: the landed coin covered the result banner: banner moved down (`#firstfx .fxban` top calc(72% + 70px)), coin lifts 12 px on landing.
- [x] Cards in the battle-report spoils had no hover description: `data-tip="spcard:<id>"` (name, rarity, text, "Click to take it").
- [ ] Music got louder going from the map into a fight, same loop. Measured in the harness: no gain change in the game (calm keeps playing at the same level until its loop ends, then the fight music starts). Not reproduced; needs more detail.
- [ ] Map screen "blinking" / strange UI on every map visit. Not reproduced at 1881x795 (frames every 80 ms after a fight). Needs a screen recording or exact steps.
- [ ] Relic from a fight "appeared over to the right": the report shows it under Spoils once the count finishes (~10 s), then it stays a loose icon at the right edge until equipped (the parked relic redesign: equip on pickup, fly to the tray). Relics equip by dragging onto the ring button beside the portrait (works on the map in the harness; never in a fight, by design). User says equipping failed; where it was tried is unknown.

## 2026-10-10 balance pass (working file, not yet published; details in the "Liar's Crawl: Balance Pass" doc)
- [x] Enemy skill set per floor and kind (`FLOOR_SKILL`, `foeSkill`): normal/elite/boss 0.30/0.45/0.55, 0.50/0.65/0.75, 0.70/0.85/0.90, floor 4 0.85/0.85/0.90; the hidden +0.12 and floor-4 +0.1 are gone. `OWN_SKILL` (dummy, Loot Goblin, Cup-Shot Ogre, Flesh Golem) keep their own numbers; Weathercock keeps its 0.6/0.07 swing; per-enemy `skill` values are now unused except for those.
- [x] Croupier 3 + Collector 3 (each +1 later = 8 dice in all, was 10); House 12 dice (was 10).
- [x] `LEVELS` runs to level 30 (each step 50 XP dearer than the last; level 30 at 23,200). A full run earns ~5,000-6,000 XP, so about level 13-14.
- [x] Fill My Cup 80, Runneth Over 150; `MAX_DICE` 16 (Bottomless Cup +2 = 18); class blurbs say 16.
- [x] Camp rest and the new-floor heal: 2/3/4/4 HP by floor (`REST_HEAL`, `restHeal()`).
- [x] Floor-1 fight purses +50%; Loot Goblin sack `lootSack()` = 60 x floor gold multiplier (tooltip uses it); Bone Bank pays x1.5 (`BANK_RATE`, texts updated).
- [x] Pickpocket 5 x gold multiplier per wound (was 10); Plunder 1 gold per die per rank (was 2).
- [x] Floor-1 mid-floor shop on row 6.
- [x] Elite/boss chests: always one seal, one relic, one card (gold fills a slot only if there is nothing to offer).
- [x] Prices: Iron Plate 30, Smoke Bomb 35, Rusty Razor 25, XP Drought 25, Odd Die base 20 (shop 30), Hook 60, Skullcap 110, D20 220. Smith x1.3 (was 1.7), Cardsharp x1.2 (was 1.4).
- [x] Slots: first pull free (`ev.spins = 1`), lose 10%, gold 25%.
- [x] Looking Glass fight drop 20% floor 1, 15% later.
- [x] Floor 3+: a foe whose own seal is common/uncommon drops a rare/epic seal (`LATE_SEALS`, `lateDrop`).
- [ ] REJECTED: one roll threshold for all floors (user: upgraded dice are meant to beat the harder rolls).
- [x] Scratch card: cherries 25, bells 60, both x the floor gold multiplier (`scratchPay`; was 50 / 100 flat).

## 2026-10-10 balance pass, batch 2 (working file, not yet published)
- [x] Floor 3 elites skill 0.75 (was 0.85), floor 3 boss (Pit Boss) 0.80 (was 0.90).
- [x] Hulking Demon 7 dice (was 9); Cup-Shot Ogre 7 dice (was 9).
- [x] Every foe with a seal drops it (`DROP_BASE = 1`, was 0.25). Watch: the seal screens after every fight (pacing), repeats of the same seal, and the Hook relic / Grave Robber ability / drop luck now do nothing. Fallback if it feels too much: 1 for elites and bosses, 0.5 for normal fights.
- [x] Elite XP x1.5 (`ELITE_XP`).
- [x] XP Drought: 100 XP per floor reached.
- [x] Loaded Pouch: 5 x floor gold multiplier.
- [x] Grave Robber purse [26, 36] (was [34, 46]).
- [x] Floor-1 shop shelves always carry a Healing Draught.
- [x] Penitent's Scales and Hushed Vault never appear on floor 1.
- [x] Pawnbroker pays the 2 dice after your next elite or boss win (texts updated).
- [x] A boss win heals you fully before the floor shop.
- [x] Soul Rend card flavour: "Born from a roll of 50 or more." (REND_MIN is 50).
- [x] BUG FIXED: during a scene (Pit Boss blackjack, Dealer's deal, House rake, Contract) your dice row drew every die as a dead X; it now shows the dice you hold (`unrolled` in the combat render).
- [x] Checked: after the Pit Boss, the report no longer sits over the floor shop and the first TAKE YOUR SPOILS opens the chest (fixed by the 2026-10-09 chest-window work). Closing the old item below.
- [x] Balance sims in `tools/ai/balance/` (fight tables + run economy, README).
- [ ] TO DO (later): grow the level-up ability pool for 30 levels (8 abilities / 19 ranks run out around level 20; raise max ranks or add abilities), and fix the "(have 1)" repeats.
- Skipped by the user: Unscathed +25% XP, Mercenary change, Gambler's Ruin timing (it is only there to stop full clears).
- [x] BUG FIXED (2026-10-10, after v337): the coin toss showed the wrong face and the wrong banner. When the enemy won, the coin landed on your knife face and said "YOU HAVE THE BUCK / You bid first", then the buck flew to the enemy (who did bid first). The 20:57 toss rework had the face (`setPose`/spin `target`) and the banner text inverted; the opener logic was right. Now: you win = knife face, "YOU HAVE THE BUCK", you bid; enemy wins = skull face, "THE ENEMY HAS THE BUCK", enemy bids. Checked over 6 tosses.

## 2026-10-10 01:00-01:40 (working file, not yet published)
- [x] BUG: returning to the map after a fight looked broken (frame and parchment arriving at different times). Three causes, all fixed: (1) the map dropped in at its unfitted size (666 px) and shrank to 594 px after landing, because `hudMapFit` only measured once it had landed: it now measures while the map waits above the screen (`hudMapFit(true)` + `body.mapmeasure`); (2) in the published (split-art) build every map picture was fetched again on each return: `mapImagesReady` loads and decodes them (parchment, frame pieces, room icons; kept in `MAPIMG_KEEP`) before the drop, 1.5 s cap; (3) the frame (`#mapframe`, on `<html>`) followed the map from a 150 ms timer and trailed behind the drop: it is now pinned to the map's resting place (`MAPREST`, `mapRestMeasure`) and runs the same drop animation in CSS (`mapdropf`, `--mfoff`, `--mfz`), plus a per-frame follower when the map is still.
- [x] Enemy's buck marker back at the BOTTOM of its portrait (yours stays on top); the toss coin lands there too.
- [x] Show map / Hide map (and Log): hover swapped in a mismatched plate with a 0 border (looked like a plain pill) and the hover bob lifted it off the cursor so it flickered between the two looks. Hover now keeps the plate and glows; no bob on the top buttons.
- [x] XP Drought (and every self card: Smoke, Bandage, Looking Glass, Mead, Frenzy) can be dropped on your portrait as well as up on the table; the portrait lights up. XP Drought works at any point in a fight (was bid phase only).
- [x] Reward cards in the Spoils: click = the card grows to the middle of the screen, then goes into your deck by itself after 2.5 s (click to send it sooner). No Add/Close buttons.
- [x] BUG: a seal + a card in the Spoils lost the seal after OK (`nextAfterVictory` skipped the seal while a card was waiting and never came back). Now cards go to the deck, then the seal window always opens. The seal in the Spoils is clickable (`openDropSeal`).
- [x] Seals can also be dropped on your own dice row (HUD), not only the dice in the seal window. (Could not reproduce a failing drag on the window's dice; ask the user if it still fails.)
- [x] Web of Bones: red X removed (it has its own close button). Exception to the red-X rule, by the user.
- [x] Slot machine window: taller tray, allowed over the HUD (`.slotwin`), shorter flavour text, bigger cost/result lines, odds line hidden (stale numbers fixed anyway); result line now inside the scaled area so it is never cut off. `encFit` also reserves room for any line sitting under a tray.
- [x] BUG: the shop crashed when the shelf drew a Healing Draught, Fill My Cup, Runneth Over or the D20 (`wareHTML` read `ITEMS[id].name`; those wares are shop-only). Fixed.
- [x] Potion / roll-button flash (2026-10-10): the likely cause was Auto-roll. Its timer clicked the roll button up to ~0.5-1.4 s after it was drawn, so the button sat on the portrait for a moment at the start of rounds. Now, with Auto-roll on, the button is never drawn and the dice are thrown as the round starts (still drawn in the tutorial). Note: there is no Auto-roll switch in the game any more (the toss checkbox was removed); it is only on if `lcAutoRoll` was saved earlier. Ask the user whether to put a switch in Settings.
- [x] Plunder (user, 2026-10-10): 2 / 4 / 6 gold per enemy die knocked out at ranks 1 / 2 / 3 (max raised from 2 to 3).
- [x] Every won fight heals 1 fallen die (user, 2026-10-10, to make the game a little easier); Stubborn Pulse and Mending Hands add on top. Shown on the report as 'Your wounds knit themselves shut'.
- [x] Dummy skip is back (2026-10-10): a wooden 'Skip this fight' button under the Training Dummy's name (`.dumskip2`, calls `dummySkipFight`), only for players who have beaten the Dummy before (`M.dummyDone`), not during the fight tutorial. User will judge the placement.
