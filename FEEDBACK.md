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

## 2026-10-10 bug hunt (working file, not yet published)
- Checks run: random-click fuzzer, 3,000 clicks over two runs (floor 1, fights, map, report, forge, level-up, tree, camp, events, end screen): 0 errors. Static check of the script for undeclared names (0) and for button actions with no handler (0 of 128). Scripted tour of floors 1-3 (all 20 events with random clicks inside each, buying every shop ware, every foe, elite and boss with every card played, wins, chests, seals, level-ups to 15, all four end screens): 0 game errors. Floor 4 played for real (descend, the House, chest, final shop, won ending): 0 errors. The House shows at most 11 dice (Berserk takes one on round 1), which fits the row.
- [x] ~~Grave Robber's Hook made every dropped seal rare or epic~~ (reverted the same morning: the user set drops to 50% and the Hook back to doubling it, see below).
- [x] Stale seal-drop text: the dropped-note, the Rarity key row and the seal tooltip (rewritten again for 50% drops, below).
- [ ] Noted, not changed: Heist says it "steals a die from the enemy" but only adds a die to your cup (the crit already damages the enemy).

## 2026-10-10 09:27 batch: seal drops, rarity odds, two new shops (working file, not yet published)
- [x] Seal drop chance 50% (`DROP_BASE = 0.5`, was 1 overnight, 0.25 before). Rarity luck adds to it; the Grave Robber's Hook doubles it again ("Enemies are twice as likely to drop their seal."). The Dummy always drops. Floor 3+ still turns a dropped seal rare/epic (`lateDrop`, Hook clause removed). Droplet note, Rarity key row and seal tooltip text match again.
- [x] Extra seal: every won fight (not the Dummy) has a 25% chance (`EXTRA_SEAL`) of a second seal, drawn from every seal your dice can take with the rarity weights and your luck (`S.victory.drop2`). It shows as a second seal in the Spoils (click it, or it opens after the first one when you continue; `openDropSeal(2)`, `nextAfterVictory`).
- [x] Rarity odds in rarity colours (`rarOdds`, `rarOddsHTML`; tier weights from `rarW` at your luck, Pendant's 10% epic folded in): above the wares in the Black Market, the Seal Stall and the Dice Carver; in the character tooltip; in the Rarity tooltips (HUD stat, shop upgrade button); in the two new rooms' map tooltips. At 0% luck: Common 50, Uncommon 28, Rare 15, Epic 7, Legendary 0. Legendary only starts above 50% luck (unchanged rule).
- [x] Seal Stall (event `sealshop`, kind smith with `stay`): three seals drawn by rarity, Smith prices, buy as many as you like (sold ones grey out), then Leave.
- [x] Dice Carver (event `diceshop`, kind `dice`, `diceBuy`): three dice, each slot drawn by rarity (d6 common 80, d8 uncommon 110, d10 rare 140, d12 epic 175, d20 legendary 220, times the floor price multiplier; repeats allowed). A bought die is a new die with poly seals (`addPolyDie`). Respects the dice cap. The Black Market's "The D20" (one per run) is separate and unchanged; Carver d20s are not limited.
- [x] (09:48, user) The two shops are extra DEAD ENDS on every floor, not rooms taken from the lanes: floors 1-3 now have four dead ends (slots, chest, Seal Stall, Dice Carver; one per row, outer lanes, `spurT` in `makeFloor`), floor 4 has none (user took them off floor 4 at 10:34). Own icons (`MAPINK.sealshop/diceshop`), key rows added. Checked 900 generated floors: all four dead ends every time, each joined to one room.
- [x] d10s: already in the game (one more poly seal on a d8; d10 art existed). New: the d20 now draws as a d20 (`.die.dp20`, placeholder art); before it was a square d6 showing "20".
- [x] Character tooltip "Heal after fights" now counts the base 1 HP every win gives.
- Placeholders waiting for Gemini art (prompts in `assets/prompts.md`, 2026-10-10 shops and the d20): d20 body, two shop portraits (using the Roll-for-a-Seal and Roll-for-Gold portraits for now), two map icons (shop stall + drawn badge).
- [ ] Watch: balance of the extra seal + 50% drops (about 0.75 seals a fight before luck, was 1.0 overnight) and the Carver's d10/d12 prices.

### 2026-10-10 11:20-11:24 small changes
- Removed "Thank you very much for testing my game." from the second (purple) playtester window.
- Skill trees: "Shield path" is now "Path of the Aegis"; thief "Path of Blood" is now "Path of Pain".
- First-fight spinner art (buck coins, banners) is pre-decoded at startup so it no longer paints in halves.
- Fight tutorial: removed "Your dice are also your life." from THE TABLE; the "YOUR ROLL" card waits until every die has stopped rolling.
- Shop art is now Gemini (map icons, both portraits, d20); prompts are in assets/prompts.md.
- Seals in the battle-report Spoils: no backing square, as tall as the cards (`.rp-spoil.rp-spslot`, loose seals resize to the slot).
- Two-dice events: drag a die into a slot as well as click (`evPlace`, pointer handlers before `evToggle`).
- Event map nodes no longer swap to old pixel icons on hover/done (`evk = ''`; CSS removed). Tooltip title icon removed too.
- Face Painter: one centred button with Gemini art (assets/ui/paint_pot.webp, src sheets/paintpot_20261010_src.jpg), no "Free", no Seal tag. `PAINT_ART`.
- Seal drag ghost (token) shrinks 5% only (152px of 160px).
- Buck flying to the player at fight start landed ~20% short of the marker (body zoom multiplies translate): `flyHome` now divides by the measured zoom; it ends exactly on the marker (398,556,44x44 in the 1376x768 harness).
- 2x DAMAGE effect: any double-damage hit on the enemy (Cutthroat's Ring, Headsman's Edge, Headsman's Whisper web) now plays `doubleStrike()`: a Gemini blood splatter slaps down behind a stamped "2x DAMAGE" with flying drops and a screen shake. Art: assets/ui/blood_splat.webp (src sheets/blood_splat_20261010_src.jpg), `BLOOD_SPLAT`, CSS `.dblfx`.
- Relic button glows brighter while a relic is held; free relic slots in an open tray pulse (`rslotglow`).
- Battle report: TOTAL GOLD now sits on the same bottom line as TOTAL XP (`.rp-col > .rp-tot { margin-top: auto }`).
- Seal level-ups: SEAL STRENGTHENED banner is bigger (yellow at lvl 2, purple at lvl 3); the seal pops and blazes in the upgrade window; seal badges on dice glow yellow at lvl 2 and purple at lvl 3 (`badgeKeys().tiers`, `.mb-seal.lv2/.lv3`).
- Chaser warnings (days 6/7): the map pans down to the entrance where it will appear, that node wobbles with a red glow and the map shakes, then it pans back up to the player (`chaserWarnCam`, CSS `.node.nwobble`).
- Piggy bank (Bone Bank) fixes: the tooltip that flashed up on every coin drop is gone; the window no longer shrinks to a smaller 'tall' size after a deposit (the deposit line has reserved space, shorter flavour text, smaller pig, bank excluded from autotall in encFit); the text under the pig is no longer cut off.
- Bone Bank: the coin pouch opens bottom-left (clear of the piggy and text); hovering the piggy shows 'You have deposited N gold... comes back as M' after a 1s delay, and never right after a coin drop (`piggy` tip, `S.pigTipOK`).

## 11:56 Ogre Bouncer portrait shift
- The hurt and win portraits had his head lower and further right than the normal one, so he appeared to jump when it changed. Re-aligned both to the normal head position (assets/portraits/enc_ogre_hurt_realigned.webp, enc_ogre_win_realigned.webp). Embedded in BOSS_PORTRAITS.ogre.

## 11:57 Straight bonus animation not playing
- The Straight/Yahtzee animation ran on a fixed 1.5 s timer, so it could fire while the dice were still rolling or under the buck toss. It now waits until the dice stop and the toss is gone, then plays (rollBonusCheck).

## 11:58 Music hard cut after the Ogre Bouncer
- Elite fight loops (fight3a/b/c) were cut at the next 10 s phrase when the fight ended. Every fight loop now plays to its end before the calm music enters (stagePlay). A fight3c loop is 41 s, so the calm music can take up to 41 s to return after an elite fight.

## 12:04 Evil has awoken pan
- "Evil has awoken" now does the same map pan as the day 6 and 7 warnings: down to the entrance where the chaser appears, wobble the node, then back to the player (completeNode wake branch, chaserWarnCam).

## 12:07 Calm music in quarters for faster fight entry
- Calm plays exactly as before (intro, then A and B looping). It is only treated as quarters (A1 A2 B1 B2, about 20.6 s each; the intro as two halves) for leaving it: a fight now takes over at the end of the current quarter, so the wait is at most about 20 s instead of up to 82 s (stagePlay). Fight loops still play to their end.

## 12:17 Seal icons stay at the bottom of the die
- Seals now always sit on the bottom edge of the die (mostly below it), smaller, so the pips are never covered. They start overlapping each other from four seals, a little more with each extra one. The old rule that laid 4+ seals over the face of the die is gone.
- 12:23 The seals on a die now vary slightly in height (a fixed repeating pattern, up or down by up to about 10% of a seal), so the row looks less tidy. Pips stay clear.

## 12:26 Bleed icon, bleed damage animation, seal tag order
- New Gemini blood drop icon (assets/ui/bleed_drop.webp, `BLEED_DROP`). It sits on the portrait of any foe that is bleeding (`.bleedico`).
- When the bleed takes dice (`bleedTick` -> `bleedFx`): a red BLEEDING band naming the foe and the dice lost, blood drops falling off the portrait (`.bleedfx`), a red -N rising from it, a hit sound and a small screen shake.
- Seal tags on a die, in its tooltip and in its menus now follow the same order as the die's name (`NAME_ORDER` shared with `modList`). Colours on the die (`TINT_ORDER`) are unchanged.

## 12:31 Rolled die tooltip counts wilds
- Hovering a rolled die now counts wild faces in the total and shows the split, e.g. "You rolled 4 × 3 this round (2 3 + 2 wild)" (tooltip kind `pv`).

## 12:36 Dealer art and the scratch card deal
- All six Dealer portraits (normal, win, dead, confused, angry, hurt) are new Gemini art, all green orc (`BOSS_PORTRAITS.dealer`, assets/portraits/boss_dealer_*.webp).
- The Dealer's scratch card now starts as a normal deal: his card flips, and the second card is a small silver-foil scratch card the size of a playing card. After about 2.3 s he goes "Huh?" (confused portrait), at about 3.9 s he gets angry ("Scratch it. Now.", screen shake, angry portrait), and at about 5.6 s the full scratch card appears to scratch (`scr.stage`, `bigScratch`, nextRound).
- Cards dealt in this game (Dealer's card, the slip card scene) now use the playing-card art (`CARDART` faces, `NEWART.card_back`) instead of the code-drawn cards. Cards in the blackjack table already used it.

## 12:39 Cards won mid-fight stay out of the spoils
- If you win a card during a fight (the Dealer's slip or scratch card, or any card claimed in combat), the battle report's spoils no longer hold a card: the scheduled card loot (the Mead on win 3, and the Looking Glass roll) is skipped for that fight (`C.cardWon` set in `claimCard`, read in `afterCombat`). Relic loot such as the knife, ring or gauntlet is unaffected.
- 12:38 Dealer dead portrait "grey square": could not reproduce on floors 1 to 4 (the new image has a transparent background and nothing behind it is grey). Waiting for a screenshot.

## 12:41 Bought wares leave the shelf
- In the shop, anything you buy (seals, relics, cards, potions) is removed from the shelf once the purchase goes through, so you cannot buy the same one again. A seal only goes once it has been applied to a die; backing out of the forge window keeps it on the shelf (`buy` -> `pay`, `S.shopSel`).
- In the Seal Stall, the Dice Carver and Old Pasteboard, sold wares no longer stay on the shelf greyed out as "Sold"; they disappear.

## 12:43 15% card drop after every battle
- Every won fight (not the dummy) has a 15% chance (`CARD_DROP`) of a random card in the spoils, drawn by rarity (a Healing Draught only if you are hurt). Skipped if your deck is full or you already won a card in that fight. This is in addition to the Looking Glass chance and the Mead on win 3. Tested over 300 simulated wins: about 14% of fights had loot.

## 12:50 — Coin pouch gold counter
- Gold number on the pouch enlarged (22px -> 34px) and nudged up/right to keep it clear of the pouch.

## 12:55 — Spoils cards after a mid-fight card
- Spoils can hold a card again even after you won one in the fight (Dealer), but never the same card you already won (no second Razor); the 15% card drop redraws around it.

## 12:52 — Optimistic seal wording
- Text now reads "Adds N to whatever it rolls. If that goes past 6, it is wild." (all three tiers). Behaviour unchanged.

## 12:58 — Long die names stay inside the title banner
- `encFit` now shrinks any window title (wrapping to two lines if needed) until it sits inside its banner, so a die with many seals (e.g. "Incurably Optimistic Fecund Weighted Golden Die II") no longer spills over the edges.

## 12:59 — "Used up when played" wording
- Iron Plate, Blood Frenzy, Rusty Razor and Serrated Knife now say "Discarded after use." (text only).

## 13:02 — Boss map icons
- All bosses use the generic crowned skull on the map again; the per-boss badges (Dealer, Croupier, Pit Boss, House) are no longer used there (assets kept, `MAPINK.boss_*`).

## 13:04 — Baby die text tag removed
- Spawned baby dice no longer carry the "baby" label; their small size says it (tooltip unchanged).

## 13:08 — Log button no longer shakes
- The hit screen-shake now moves the battle's pieces instead of the whole app, so the Log button stays still while an attack lands.

## 13:12 — Reroll screen
- Reroll controls moved into the same control block as Bid/Liar so the dice row no longer sits on top of the buttons (that is what made it take many clicks); Reroll and Cancel now use the marble buttons (gold and red); text shortened; the cup's drop area is bigger so a dragged die lands more easily.

## 13:13 — Die tooltips show every face
- Hovering a rolled die or a die in the HUD now ends with a strip of all its faces (tattooed and wild faces included).

## 13:20 — Reroll cup, 6 / 6 counter
- New Gemini dice-cup icon on the reroll screen (`assets/ui/dice_cup.webp`, `CUP_ART`); the old pixel cup is no longer drawn there. Reroll screen text reduced to a hover tip; Reroll/Cancel clear the XP bar.
- The "6 / 6" under the player portrait (`.unithp`) is hidden.

## 13:30 — Wild face art
- Wild faces use new Gemini art (chaos star) instead of the pixel star. Three alternates are saved (jester mask, magic eye, lightning star) in `assets/ui/wild_*.png` if you prefer one.

## 13:36 — Same-number hover glow stronger
- Dice sharing the hovered die's number now glow with a wider, brighter golden halo that gently pulses (`.die.hlv`).

## 13:40 — Swarm enemies are 2-3 separate foes; empty black box
- Shattered Remnants and Hellions are now 2 or 3 separate foes (Rattle/Clack/Knuckle, Giggle/Snicker/Cackle), each with its own portrait, name and 2 dice, instead of one foe with 4-6 dice. With 3 foes (or any with 5+ dice) they stand as columns across the top (portrait, name, dice in blocks of three); checked with 3 foes x 6 dice.
- Removed a long thin black box that could show in the middle of the table between rounds: the alert pop-up was drawn even when it had nothing in it (e.g. while the dice are revealed). It now only appears when it has something to say. Not reproduced from the live game, only found by reading the code, so tell me if it still shows.

## 13:50 — Wild in die tooltips is an icon
- Hovering a die that rolled wild now shows the wild icon (the Gemini chaos star) in the title and counts ("Rolled 2 × [icon]", "(2 × 4 + 1 [icon])", baby dice) instead of the word "wild".

## 14:00 — Truncated seal has 4 stages (d8, d10, d12, d20)
- Truncated now goes d8, d10, d12, d20 (names Truncated, Truncated Decahedron, Truncated Dodecahedron, Icosahedron; tier pips and "IV" numeral updated; the seal window shows the right die shape). The shop's D20 ware is now a die with 4 Truncated seals. Faces above 6 stay wild. Dice that already had more seals (the old d14-d18 steps) no longer exist; max is 4.

## 14:02 — "wild" wording is the wild icon everywhere
- Any text in the game that says "wild" / "wilds" (seal descriptions, chips, tooltips, card text, rules) now shows the wild icon in place of the word. Done by a text filter over the page, so new text is covered automatically. Alt text and the sound/log text are unchanged.

## 2026-10-10 13:45 Ardent Zealot portrait
Hood was cropped at the top of the ring. New Gemini set for all four states (normal, hurt, win, dead) with clear headroom above the hood; old art in assets/_old/. Sheet: assets/sheets/zealot_portraits_20261010_src.jpg.

## 2026-10-10 15:20 character select portrait borders solid
Ring on the Fighter/Cleric/Thief portraits was forced to 55% opacity (`.portrait::after` on `.tavern .clsbtn.charcard`) and the card's dither overlay sat over it. Ring is now fully opaque and the portrait sits above the overlay.

## 2026-10-10 15:30 buck hand-off after the toss
The flying buck faded out (~0.4 s) while the real marker waited for its poll and a 0.25 s fade-in, so it vanished for a moment on arrival. Now the flying buck is removed on the landing frame and the marker (`window.__buckNow`) appears in the same frame with no fade, then re-syncs on the next frame. Measured per frame: marker opacity 1 at the same spot on the first frame after the flier is gone.

## 2026-10-10 15:35 battle report: Skip button removed
The "Skip" button (`.rp-skip`, `data-act="rptSkip"`) is no longer drawn on the battle report (`rptFoot` row near `data-act="rptSkip"`). The handler and CSS are left in place, unused.

## 2026-10-10 15:40 die hover glow and lift
- Same-number glow pulse (`.die.hlv`, `@keyframes hlvpulse`): both keyframes now have the same four drop-shadows (a mismatched list made the filter snap instead of tween), and the pulse is 2.4 s instead of 0.7 s, so it breathes softly.
- A die you point at lifts 5 px (`translate`, own transition) on the enemy cups, your cups and the HUD dice.
- Before the roll (`C.phase === 'roll'`) every die reads 6, so the same-number glow lit all of them; now only the die under the mouse glows. After the roll it is the matching-number group as before. Checked in the harness: 1 glowing die unrolled, 3 matching dice rolled.

- 2026-10-10 15:40 fight-three music: when a fight loop is replaced by the calm/report music it plays to its loop end, fading over the last 3 s (stagePlay leaveFight). Claim button ("Examine the remains") popup now fades in (.wonpop, .12s delay) to hide any spawn-at-top settle. Also this session (uncommitted): solid character-select ring, report name centring/resize dead-band, no card flavour on hover, Liar-row fix (.unithp visibility), Level Up button, deck pile up to 5 backs.
- 2026-10-10 15:55 ogre: hurt portrait shifted 6px left and win 3px left inside the ring (art was drawn off-centre vs normal); other enemies checked, no systematic offset.

- 2026-10-10 15:55 relic tutorial (first relic outside a fight): A RELIC -> RELIC BUTTON (tray opens) -> satchel pops in with sparks -> YOUR SATCHEL. Uses the fight-tutorial styling (TUT.steps/kind). Satchel unlocked via localStorage lc_satchel (apple stays off); a relic dropped on the relic button while the tray is full, or on the satchel icon, is stowed in the satchel; sellable from it. Dev "Reset tutorials" clears lc_relictut + lc_satchel.
- 2026-10-10 15:58 Snake-Eyes Charm: now triggers on exactly two natural 1s (wilds never count, any other dice fine), once per fight.
- 2026-10-10 16:05 music: fight2m now needs at least 2 other loops before it can return (MUSC.m2 counter, reset per fight).
- 2026-10-10 16:08 Pass the Buck button always reads 'Pass the buck' (no hover swap).
- 2026-10-10 16:12 chaser warning wobble: 'An ancient shadow stirs' (day 6) is a faint wiggle (±2.5deg, no map shake); 'The dark is rising' (day 7) a little less than before (±8deg, 4 wobbles); 'Evil has awoken' unchanged.
- 2026-10-10 16:20 chaser hunt: glide 700 -> 1500 ms per tile (camera follows it), camera holds 1400 ms after it lands (was 550) before panning back (HCAM.hop/hold).
- 2026-10-10 16:25 XP orbs: generated a darker pixel-art orb set (assets/xp_orbs) to replace the bright CSS .rp-bub; awaiting Jack's approval before wiring.
- 2026-10-10 16:30 XP orbs v1 too dark: made in-between recolours (assets/xp_orbs/mid_a, mid_b: saturation x1.7/2.0, brightness x1.5/1.8). Awaiting pick; magenta fringe on the outline edge still to trim when wiring.
- 2026-10-10 16:40 XP bubbles wired: Middle B recolour of the Gemini orbs (the oval #5 dropped), fringe trimmed, 64px webp x5 (assets/xp_orbs/final), XP_ORBS random pick for .rp-bub in the battle report; size 18-34px, faint green drop-shadow.
- 2026-10-10 16:50 skill hint: arrow + 'You have enough points for a new skill' box points at the skill-point badge on the portrait on map/shop/event/camp while a skill can be learned; goes away when the skill tree is opened (returns when you gain more points).
- 2026-10-10 17:05 seal window dice: sealed (tinted) dice get a framed look: dark outer line, light inner rim, bevel highlight/shadow, gloss + fine dither overlay, drop shadow, brighter hover (CSS only, scoped to .dropgrid .dropdie).
- 2026-10-10 17:20 re-order dice: drag a die in the tray (fights: before the roll or while bidding, not during reroll/target spells; HUD dice elsewhere) and release on another die to swap their places (p.dice + rolled values + marks swap, 0.26s slide, source dims, target glows). A plain click still bids.
- 2026-10-10 17:30 boss fade-to-black: holds on black 1 s longer (bossCue 1300->2300 ms). Battle report bubbles: if the XP/gold node is gone or hidden, the start point now falls back to the live element / window centre instead of the top-left corner (could not reproduce the top-left flight in the harness).
- 2026-10-10 17:40 report Continue pressed mid-count: its timers are stopped (gen bump, fx cleaned, gold/xp jump to final) so no XP/gold bubbles fly from the top-left after the window is gone.

## Dealer card game: die-loss impact (2026-10-10, uncommitted)
- Request: losing a die to the Dealer's card game only warned, then went straight to the next turn; wanted the loss to hit.
- Change: the hit is now deferred ~2.8 s after the card reveal (`cardsImpact`), then `dieShatter`: the tray die leaps to the centre, trembles and cracks, then bursts (red flash, ring, shards, "-1 DIE", screen shake, hurt/crit sfx). Continue appears ~5.2 s on a hit. Pressing Continue early applies the hit instantly (quick path).
- 2026-10-10 17:55 boss music on victory: the boss track no longer cuts when the fight ends; its loop plays out to the end, fades over its last 3 s, then the calm music fades in (same as the fight themes).
- 2026-10-10 18:10 chest relics: a relic in the chest window can now be dragged out (ghost follows the pointer) and dropped anywhere; it lands as a loose icon where you let go (dropping on the relic button equips it as before). A plain click still takes it (appears at the right edge). Also fixed the card/relic drag in the chest window only working when S.screen was 'reward'.
- 2026-10-10 18:25 level-up window: the 'Level N: choose an ability' title was shrunk to ~13px by the title auto-fit (needed 24px spare height in a 40px banner); the level-up window now only needs 2px so it stays at 32px. Battle-report button that read 'Level Up' now reads 'Ok' (it opens the ability/seal screen).
- 2026-10-10 18:35 final-floor shop renamed 'Spoils of the Floor' -> 'The Victor\'s Stall' (it is a shop, not loot already gained); boss info text matches.
- 2026-10-10 18:50 stairs scene ('Floor 2: The Catacombs' window between floors): had no floor background rule so it showed the old default; it now shows the background of the floor you are descending to (floor 2/3/4 art). The window is now the encounter-window style (campfire portrait, banner title, parchment flavour, Descend in the footer).
- 2026-10-10 19:10 bid label: the enemy's bid now reads "[Enemy name]’s bid" (the bidding part's name for packs) instead of 'Their bid'.
- 2026-10-10 19:30 seals in the battle report are loose seals again (no seal screen): drag one onto an eligible die to apply it (old 'die upgraded' pop-up with the long die name, then back to the report), let go over the report to drop it back in its slot, let go elsewhere to leave it there, drop on the satchel to tuck it in. Seals still in a slot when you press OK go into the satchel. (Harness-tested: side, back, apply; satchel branch mirrors the relic one but was not exercisable because the satchel is not unlocked in the test run.)
- 2026-10-10 19:35 swarm enemies (Shattered Remnants, Hellions, Rat Swarm): portraits line up side by side, every member is just called by the monster's name (no Rattle/Clack/etc).
- 2026-10-10 19:55 skeletons: new bloodless Shattered Remnants portraits (all four moods; old bloody set in assets/_old/). Skeleton Dicer, Shattered Remnants and the Bone Dealer are now immune to bleed: a bleed attempt (the thief's bleed skill, the razor/serrated cards) shows an IMMUNE banner (Gemini art, gold) popping over that portrait and logs "X is immune to bleeding"; the bleed cards are not spent.
- 2026-10-10 20:10 bid table: the table/bid pane is kept exactly halfway between the enemy's dice and your bid-face row (JS `bidBalance`, every 250 ms, applied as a CSS translate on .bidbox; measured equal gaps at 1600x900, 1280x720, 1920x1080).
- 2026-10-10 20:25 win button: 'Ransack the carcass' (and Pick the bones clean / Examine the remains) is hidden (space kept, not clickable) until the killing blow's animations have finished: at least 0.9 s after the win, then once no finite animation has been running in the battle for ~0.35 s (hard cap 6 s). Harness check with a forced win and no animations: hidden for ~1 s, then visible; a real kill with long animations was not run.

## 2026-10-10 (saves, poly faces, deck pile) — uncommitted
- Run saves: autosave to localStorage `lc_run_v1` on the map between fights (cleared on game over); "Continue run" on the title; "Code" (title) / "Save code" (settings) dialog to copy or load an export code (gzip+base64, `LC1:`). Reference-preserving encoder `saveEnc/saveDec`; version mismatch falls back to a new run.
- Tinker / tattoo / paint / armour now show and accept every face of a poly die (d8-d20): `faceVals(d)`, `setDieFace`, extra faces stored in `d.xf`; rollDie and aiDieDist honour changed extra faces. Tooltips (`strip`) show all faces in the die's shape.
- Deck pile on the map shows one card back per card in the deck (was capped at 5).
- The Collector has proper portraits (normal/hurt/win/dead) from Gemini instead of the small hood sprite. Roulette art (wheel, ball, pointer, bet board, chip) is now pre-decoded (`warmCssArt`) so it appears together instead of piece by piece.
- Croupier + Collector fight: the first foe is no longer pulled into the player's column (it covered the Croupier's dice); both foes now sit side by side.
- Baby die tooltip now says how many of its number you rolled (wilds counted), like other dice.
- Dice tray (`trayFit`): past 12 dice the rows of 6 shrink so every row fits the old two-row height; the portrait, XP bar and deck never move (user picked this over 9-wide rows). A third full-size row had pushed the portrait/XP bar up under the bid buttons and made the UI jump.

## 2026-10-10 visual sweep (every screen at 1776x870) — uncommitted
Fixed:
- Title: the Code button floated at the top of the card; now sits between Web and Help (Continue run sits above Enter the tavern).
- Encounter plaque titles: first letter hidden by the blood splash on the plaque (The Black Market, Victor's Stall, Blood Anvil, Tinker with a die...): titles keep 150px clear.
- Scratch Card banner title wrapped onto a second line outside the banner: now shrinks on one line.
- Victor's Stall button row overflowed the window: "Head for the stairs" -> "To the stairs".
- Web of Bones: the two path names ran into each other: they wrap now.
- The Blood Anvil had an empty parchment: flavour text added.
- Old Pasteboard (card dealer): cards were shrunk unreadable: it uses the tall slot-size window now.
- Slot machine window: the HUD peeked out around its edges: hidden while it is open.
- Die reforged popup: face strip was tiny: bigger.
- Save code dialog uses the standard red X.
- Disabled buttons in encounter windows (Roll the dice, Buy) were nearly invisible: more opaque.
- Two-or-more-foe fights (Hellions, Remnants, Croupier+Collector): the table and Liar/Spot On/Buck row were no longer placed after the side-by-side change and overlapped the XP bar: placed again between the foes and the XP bar.
Not changed (noted): small roll-event windows have left-aligned, edge-to-edge rule text; Pawnbroker/Peddler/Goblin body text is large and left-aligned; Contract Demon offer has no red X (decision popup); end screens are still the old panel; floor 4 map opens on a dark empty view.
- 19:07 batch: dice-roll event rules centred (`p.evrule`); Pawnbroker / Bone Peddler / Goblin's Bargain offer text smaller and centred (`.evoffer`); Contract Demon's offer has a red X (refuses and carries on); end screens (No dice / The crawl is yours / You fled / Gambler's Ruin) rebuilt in the encounter-window art with the class portrait (dead / win / normal) or the Ruin art; floor 4 map parked (user will design it later).
- Dev tools: Warp to floor 2 / 3 / 4 (fresh map at the start of that floor, keeps your character); Seals (pick a seal, click dice to apply as often as you like); Dice (add a d6/d8/d10/d12/d20 to your cup); Relics (take any relic). Picker window `#devpick` with red X.
- Web of Bones v2 (from the prototype artifact https://claude.ai/artifact/18RbPVHRP6KcFW8enbS1mf): six wedges (Magpie gold, Pawnbroker rarity, Waxwright seals, Carver dice, Callused Hide defence, Headsman attack), +1% small nodes, 3 notables + 1 keystone per wedge, border nodes between wedges. Click a node = claim the shortest path (cost 5 + nodes owned, per node). Old ring-web nodes are refunded in full once (`webMigrate`, note shown in the web). Code: `WEB_SECT`, `WEB_BRIDGE`, `WEB_T/WEB_TE` (wedge shape), `buildWeb`, `webN(key)` sums node `fx`. Effects wired: gold, price, luck (rarity), reroll, sdrop, sdrop2, sealfate, signet, ddrop (+oddangles, inked), dprice, cupx, deeppockets, block, ironskin, shielddrill/bulwarkw (`p.bankShield`, lasting shields added to C.shield each fight, lost when broken), double, liarx, crit, headsman, firstblood, nestegg, tithe, hoard, chestx, shelf, collector, fence, waxcol, spareribs, riposte, bounty. Balance not tuned yet (user will revisit).
## 2026-10-10 19:40 (working file, not yet published)
- [x] Peeks and rerolls you hold are capped at 6 each (`CHARGE_MAX`, `gainCharge`); counts everything held (Carrion Eye, Spyglass, Bone Shake, Lucky Charm, Curious / Fickle dice). Earned ones used to pile up in `S.stash` for the whole run. A stash over the cap is trimmed at fight start. Curious / Fickle seal texts say "(you can hold up to 6)". User may drop it to 3 later.
- [x] BUG: `S.stash` (banked peeks/rerolls) was never reset by `startRun`, so it carried into the next run in the same tab. Reset there now.
- [x] Dice Carver: every die bought makes the next one dearer, +25% of base per die bought this run (`CARVER_STEP`, `carverPrice`, `S.carverN`, reset in `startRun`). Floor-1 d6: 80, 100, 120, 140...
- Sim (tools/ai/balance, ft tables regenerated; runsim now models +1 HP per win, the Dice Carver, Fill My Cup's real shelf odds, floor 4): cap 16 -> 12 barely changes floor-3 survival but leaves ~450-700 unspent gold at the floor-3 boss; floor 3 dealing +1 damage drops "reach the floor-3 boss" from ~69% to ~43% for a strong player. Details in the 19:40 chat reply.

## 2026-10-10 20:05 (working file, not yet published)
- Dice cap 16 -> 12 (`MAX_DICE`, class texts). The Bottomless Cup (+2, item id `satchel`) is out of `ITEM_ORDER` (no longer drops) and `maxDice()` ignores it: a third row does not fit.
- Dice always full size: with 12 max, `trayFit` never shrinks them (it only acts past 12).
- Player block sits lower: `HUD_FOOT` (8 px under the tray, was 22). The Total readout is measured by its visible chip (`mrLow`; the hidden 6 / 6 kept its height) and tucks against the portrait rim.
- Floor 3 enemies hit for 1 more (`HEAVY_FLOOR = 3`, `pt.heavy`): 2 for a lost Liar, 3 for a Spot On. "Heavy" chip on the enemy, trait line in its info, AI knows (`hitBonus`). Not in the training room.
- "You hold N" badge on each bid face (`holdBadge`, `.bfhold`; wilds count; dim at 0).
- Open: user is designing armour sources for floor 3 (skill-tree travel nodes: small node after path skill 1, +1 armour per fight after path skill 2).
- Skill-tree travel nodes (`TRAVEL`, `tnN`, `tnPath`, next to `TREE`): every path is now skill 1 -> 1-point node -> skill 2 -> 1-point armour node -> skill 3. First node: free reroll each fight (Aegis Steady Hand, Faith Prayer Beads, Pain Nimble Fingers) or free peek each fight (Blade Battle Sense, Wrath Searching Gaze, Plunder Eye for a Mark). Second node: +1 armour each fight (Mail Shirt, Iron Bracers, Blessed Vestments, Warding Sigil, Leather Jerkin, Shadow Cloak). Applied in `startCombat` (shield / charges). Armour node is 8 points into a path (about level 9, start of floor 3). Fighter Aegis stacks it with the Shield (2, or 4 with Tower Shield). Icons reuse peek/reroll/armour art.
- Skill tree: travel nodes are small round buttons (`.sknode.sktn`, 64 px); path titles shortened to The Aegis / The Blade, Faith / Wrath, Plunder / Pain, with padding between them.
- Merged on top of c8898ce (Web of Bones v2): travel-node armour adds to `ironskin` / `bankShield`; the Dice Carver's rising price keeps the web's `dprice` discount. Spare Knuckles (web, `cupx`, +1 cup size) can still take you to 13 dice, past the 12 cap; past 12 `trayFit` shrinks the rows. Decide whether that node should do something else.
