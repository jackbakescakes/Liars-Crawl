# Gemini prompts

Add newest first: date, what it made, the prompt (or a short summary), and which file in `assets/` it produced.

## 2026-10-08 RELICS button + relic tray (prompt given to user, art pending)
Plan: a round RELICS button sits on the portrait rim at about 7:45 (like the level badge). Click: the three relic slots slide out to the left from behind it on a tray; click again: they slide back in. Glow states (yellow = relic in hand, orange = hovered with relic, red = hovered with relic and no room) are done in CODE, so the art must be neutral and un-glowing. Sounds are code-made. Assets wanted, one sheet, magenta #FF00FF key, same chunky pixel wood-and-iron style as the settings cog and the worn buttons:
A. Relics button, 2 states side by side: closed (a small iron-banded round button with a tiny relic emblem, e.g. a gem-set ring or crown, no text) and open/pressed (same button, slightly pushed in and a bit darker). About 1:1, round, thick dark outline, built to overlap a round portrait rim.
B. Empty relic slot frame, square: dark recessed socket with a riveted iron-and-wood rim, empty centre, no glow. Three identical copies are not needed; one is enough.
C. Tray: a long low horizontal wooden plank with iron end caps and a rounded left end, about 4:1, empty top face, to sit behind the three slots so they look like they slide out of the button on a drawer.
Prompt wording was given in chat on 2026-10-08.

### 2026-10-08 RELICS button, result and re-roll
Result: `sheets/relics_ui_20261008_src.png` (button closed/open, slot, tray all accepted). The ring emblem on the buttons came out small, so the user asked Gemini to enlarge it; that left two nested rings. Cut as `ui/relic_*.png`; the closed button has two retouched versions (small ring covered by repainted wood grain; or whole ring covered, gem only). Re-roll prompt for ONE big ring (buttons only) was given in chat: reference = the sheet; ONE large gold-bronze ring seen face-on filling about 55% of the button face, thick band, ruby set at the top, nothing inside the ring but plain wood planks, no second or inner ring, no concentric circles.

## 2026-10-08 branching treasure map: ink-on-parchment asset set (prompts given to user, art pending)
Replaces the wide free-roam map art with a classic branching map (boss at the top): black ink on dirty, blood-splattered parchment, dotted routes, simple hand-drawn icons, a little red ink. Ink assets are asked for on a PURE WHITE background (not magenta) so they can be converted to transparency by luminance (ink alpha = 1 - brightness, colour kept) or multiply-blended, which keeps soft ink edges. Parchments are opaque full-bleed. Save originals to `sheets/` as `<what>_20261008_src.png` the moment they arrive; processed pieces go in `maps/` (parchments, margin art, overlays) and `tokens/` (icons, boss badges, trail marks).
Shared style line (pasted at the top of every prompt): hand-inked pirate treasure map, mostly black ink with sparing blood-red accents, grimdark, flat 2D woodcut/engraving linework with rough ink edges, no gradients/3D/glow/soft shading, no other colours, no text unless asked.
1. Parchment sheet, 16:9, full bleed, calm low-contrast middle 70%, stains/folds/burnt edges/blood at the edges, nothing drawn on it; four floor variants (Cellar mildew, Catacombs grey and cobwebbed, Gilded Pit scorched with gold dust, House near-black burnt edges with heavy blood).
2. Icon sheet 4x3: fight (crossed swords), elite (horned skull), boss (crowned skull), entrance (arch with steps), camp (fire and tent), shop (stall with lantern), event (scroll with red wax seal), unknown (red question mark), red X (cleared), red ring (can go here), double red ring (you are here), red up-arrow.
3. Boss badges 2x2 from the attached portraits: Dealer, Croupier, Pit Boss, the House idol.
4. Trail marks (optional; dots may be drawn in code): black dots, red dots, black x marks, red x marks.
5. Margin decorations 3x3: compass rose (red north), skull pile, tentacled horror from an ink blot, hanging cage, gravestone, dead tree with crow, cards stabbed by a dagger, dice cluster, hand-lettered banner "HERE BE LIARS" in red.
6. Overlay sheet 4x3: 6 blood splatters, 3 ink blots, 3 grease/soot smudges.
Full prompt wording was given in chat on 2026-10-08; re-roll tips: Gemini ignores pixel sizes, so use percentages and ratios; insist on "pure white #FFFFFF background".

### 2026-10-08 results and pixel-art re-roll of prompts 5 and 6
Received all sheets except the boss badges (saved in `sheets/`, listed in INDEX.md). Parchments (4) and icons (12) accepted. Icons have text labels baked under each (crop above them); the red X has "(X MARKS THE SPOT)" under it, the double ring has stray rune scribbles and the bottom row has stray knot corners, to be cut out. Margin decorations (`mapdecor_v1_notpixel`) and splatters (`mapsplatter_v1_notpixel`) came back painterly, not pixel art; user wants them pixel art to match the game. Re-roll prompts (pixel-art style line replaces the ink style line for these two): authentic chunky low-res 16-bit pixel art, hard square pixels of one size, no anti-aliasing/blur/gradients, about 10 colours (black, dark brown, mid brown, parchment tan, bone, three blood reds), 1px dark outline, flat steps and checkerboard dithering only, imagine a 256x140 canvas scaled up nearest-neighbour. Decor: flat compass with red north (no stand), skull pile, tentacled horror in black/brown with red eyes, hanging cage, blank gravestone with a skull carving (no text), dead tree with crow, cards stabbed by dagger, dice with red pips, HERE BE LIARS banner. Splatters: 6 blood splatters in 3 reds, 3 hard-edged ink blots, 3 dithered soot/grease smudges. Tip: attach an in-game screenshot or an existing sprite as the style reference.
Result of the pixel re-roll (`sheets/mapdecor_v2_toopixel_20261008_src.png`): too far the other way, very chunky and low-res, no longer matches the ink icons (`sheets/mapicons_20261008_src.png`); dice pips and cards are unreadable and the grid was ignored. Third attempt: middle ground = fine "HD" pixel art, ~512x280 canvas, 20-24 colours, hand-inked outlines with rough edges, 3-4 tone shading, attach the icon sheet as the style reference, exact grid, readable pips.
Boss badges first roll (`sheets/bossbadges_v1_cleanvector_20261008_src.png`): rejected by user. Clean flat vector logo style, pure white fills, no grime or texture, so it does not match the inked icon sheet. Re-roll idea: attach the icon sheet as the style reference ("same artist"), ask for grimy hand-inked outlines, muted dirty fills, ink texture, simpler and more skull-like silhouettes. Until then the map uses the generic crowned-skull boss icon for every floor.
Third result (`sheets/mapdecor_v3_stillpixel_20261008_src.png`): composition, grid, pips and banner all good, but still reads as pixel art next to the inked/painted icon sheet. Conclusion: drop pixel wording entirely; the target is the icon sheet's look (thick uneven black ink outlines, flat muted fills with light hand-painted texture, slightly cartoonish grimdark). Fourth attempt: attach the icon sheet and say "same artist, same style as the attached sheet"; v3 is the fallback.

## 2026-10-07 title lettering alphabet (A-Z ! ? ' .)
Sheet: `sheets/title_font_sheet_20261007_src.png`. Key points of the prompt that worked: reference = LIAR'S CRAWL title; TALL NARROW condensed capitals with flared gothic slab serifs; deep blood-red fill (#a3151a to #5a0a0f) with grey-white worn patches on the bottom third; heavy chips and thin black-red cracks; thick near-black maroon outline; no fire/drips/glow; 6x5 grid, 512x640 cells, same height and baseline, magenta #FF00FF background. First attempt (cream letters, ember flames, drips, wide round letters) was rejected.

## 2026-10-07 map border (wood + iron corners) — prompt sent to Gemini
Reference: `ui/panel_wood_iron.png`. Wanted: thin landscape frame for the big map (map ~1491x833 on a 1600x900 screen, art aspect 1024:572). Canvas 3072x1760, interior opening magenta #FF00FF for keying (opening ~2928x1648 centred), border ~72px sides / ~56px top+bottom, riveted iron corner plates ~190px, carved scroll crest top and bottom centre.
- First result (`sheets/map_border_v1_simple_20261007_src.png`) was too simple (plain bars, tiny crest, no carved flourishes); user asked for a more ornate version like `ui/panel_wood_iron.png`.
- Second result (`sheets/map_border_v2_toornate_20261007_src.png`) was too ornate and too thick (150px sides, vines all along bars). Target is between v1 and v2, closer to the reference: plain wood bars ~100px, crest only top/bottom centre, small corner curls, side studs.
- Third result (`sheets/map_border_v3_simple_20261007_src.png`): bars still ~10% of width (Gemini ignores pixel sizes; use ratios/percentages), too simple, studs too bright. Next prompt: percentages of canvas width, bar = 1/3 of iron plate, dull dark bronze studs, richer crest and inner lip.

## Map border v4 (ACCEPTED) — assets/sheets/map_border_v4_good_20261007_src.png
Wood-and-iron frame, thin wood, dim rivets, steel corner plates, fleur crest top/bottom. Cut into assets/ui/mapframe_{tl,tr,bl,br,crestT,crestB,barT,barB,barL,barR}.webp (scaled 0.6) and embedded as MAPFRAME in the game; `#mapframe` overlay synced to `.map.mapart` (map screen only).

## Settings icon (requested 2026-10-07) — prompt given to user, art received, right-hand icon used
Round wood-and-iron button with iron/brass cog, 3 states (normal / hover glow / pressed), magenta #FF00FF key, thick dark outline, match LOG/SKILLS/DICE buttons. Replaces the current gold gear in the top-right (the `#settings` cog button). Full prompt is in the chat for 2026-10-07; re-roll from this summary.

## 2026-10-07 — large floor title scroll (map header)
Pixel-art banner scroll for the map header: wide parchment scroll with curled, dog-eared ribbon ends, studded dark-iron end plates, a big EMPTY centre panel (about 70% of the width) for the floor name, same chunky pixel style and palette as the map border (rusty iron, aged parchment, soft shadow). 3:1 aspect ratio (e.g. 1800x600), flat solid magenta (#FF00FF) background for keying, no text, nothing in the empty panel, no drop shadow outside the scroll. Status: requested, not yet received. Current stand-in is the existing banner scaled up (`.floorhd.banner`, 900x154).

## 2026-10-07 — worn button set (fight screen + whole game)
Gemini prompt: a single sheet of matching UI buttons, chunky pixel art, worn/cracked dark-iron and aged-wood plates with brass studs, no text on the buttons, 4 states (idle, hover, pressed, disabled) in 3 widths (wide 3:1, medium 2:1, small 1:1) plus a round icon button, flat magenta (#FF00FF) background for keying, identical palette and outline to the map frame art. Status: requested, not yet received. Full text is in the chat of 2026-10-07; wire in as `.btn` backgrounds when received.

### Button set v1 result (rejected)
Received `sheets/buttons_ironwood_v1_20261007_src.png`: flat iron-and-wood plates with studs. User rejected: wants marble blocks with a faux-3D feel, edges rounded by wear, some wood finish, little metal. Not used in game.

## 2026-10-07 — button set v2 (marble blocks)
Gemini prompt: matching button sheet, worn marble/stone blocks with a bevelled faux-3D look (lit top-left, visible thick front face and bottom edge), edges rounded and chipped by wear, hairline cracks and veining, a thin wooden inlay or trim only, no studs or iron plates; 4 states x 5 shapes; flat magenta background; no text and no labels. Full text in chat 2026-10-07. Status: requested.

### Button set v2 result (liked)
Received `sheets/buttons_marble_v2_20261007_src.png`: marble blocks with wood base trim, 5 shapes x 4 states. Issues: some text labels baked onto/under buttons (SMALL, PRESSED, Disabled etc. in rows 3), wide row uses "WIDE" label; round/square rows lack labels. Plan: recolour in code (tint) rather than re-roll; ask Gemini for a clean re-roll only if the baked labels cannot be cleaned.

## 2026-10-07 — "who goes first" spinner (requested, prompt given to user, art pending)
Needs: grimdark spinner board + arrow + spin button + player/enemy markers (+ optional sting banner). Magenta #FF00FF key. See the Gemini prompt given in chat; once art arrives save the sheet to assets/sheets/first_spinner_<date>_src.png and cut into assets/ui/.

## 2026-10-07 — encounter window template + treasure chest (prompt given to user, art pending)
Template window for ALL non-fight encounters and the post-fight "1 of 3" spoils pick: portrait slot (top-left), title plaque, flavour-text panel, big empty mechanics area, optional footer; 4 colour variants (iron/brown default, blood red, green, violet); plus a treasure chest (closed / opening / open+glow) for the battle report Spoils area. Magenta #FF00FF key. Prompt text is in the chat history for this date; once art arrives save the sheet to assets/sheets/encounter_window_<date>_src.png and cut into assets/ui/.

### Encounter window v1 result (needs rework)
Received `sheets/encounter_window_v1_20261007_src.png`: 4 colour windows + chest (closed/opening/open) + padlock + glow + sparkles. Problems: windows are square, mechanics zone is a tiny strip, labels/lorem text baked in. Chest, padlock, glow, sparkles are good. Re-roll v2: wider window, border-only frames + separate pieces (portrait ring, title plaque, parchment panel) so layout is composed in code.

## 2026-10-07 — encounter portraits (prompt given to user, art pending)
27 non-fight encounter portraits in 3 sheets of 3x3 (reading order), square, subject centred for a round crop, magenta keyed background not needed (full-bleed dark scenes). List and per-portrait descriptions are in the chat history for this date. Save sheets as assets/sheets/enc_portraits_<n>_<yyyymmdd>_src.png, cut to assets/portraits/enc_<name>.webp.

## 2026-10-07 — encounter portraits v2 (prompt given to user, art pending)
Sheet 3 redo (plain squares, no ring/caption/curved text, more breathing room) + Sheet 4 alternates for the weakest/tightest ones (Contract of Sale / Plenty / Mutual Ruin, Fortify, Blood Anvil, Dead Man's Throne, Roll for a Sigil, Goblin's Bargain, Pawnbroker) with different compositions so the user can choose between 2 options. Prompt text in chat history.

## 2026-10-07 Cogent seal (Gemini)
Prompt: reference image of three existing seals (Optimistic, Fickle, Golden) + request for four variants of a "Cogent" seal (wax seal on parchment ribbons, two chevrons / persuading hand motif), magenta background, 2x2 grid. Full text given to the user in chat; re-roll from the same brief.
Result 1: Gemini drew TWO seals joined by a banner in each cell (took "one die talks to another" literally). Re-prompted asking for a single seal per cell with the symbol inside it.

## 20261008 encounter frame 9-slice
No new Gemini art. enc_frame_<v>.png is cut by script into a tileable body (enc_frame9_<v>.png) and a crest (enc_crest_<v>.png); corners and wood are locked at half the old scale and only the wood edges lengthen.

## 20261008 Tattoo scrolls (generated, wired)
Event "The Tattooist": 5 parchment scrolls showing 2-6 die pips. Code-drawn placeholder is live (`.tatscroll`, `TATSCROLL` constant empty). Gemini prompt is in the chat; when art arrives save sheet to sheets/tattoo_scrolls_<date>_src.png and cut to ui/tattoo_scroll_2..6.webp, then fill `TATSCROLL[2..6]`.

## 20261008 Scratch card symbols
Prompt: pixel-art sheet, one row of three slot symbols (cherries, cracked liberty bell, skull with red eye glints), chunky outlined enamel look, 3-4 tones per colour, magenta #FF00FF background, 1536x512 with three square cells; optional second row with a cream/gold glow halo for the "winning match" state. Result: sheets/scratch_symbols_20261008_src.png (1024x338, two rows), cut into assets/ui/scratch_*.webp. Cut note: enclosed magenta regions over 180px (gap between cherry stems) are keyed out, small pink highlights are kept.

## 20261008 Loot Goblin ambush art (requested, not yet received)
Feature live: a fled Loot Goblin hides in an unvisited event room; entering it triggers an AMBUSH (banner uses the logo font via titleText, no art) and a Loot Goblin fight, then the room's own event opens. Gemini sheet requested: (A) goblin leaping out at the viewer, sack in one hand, (B) goblin fleeing away with the sack, coins spilling, (C) coin burst. Wire plan: A in the AMBUSH banner (gobAmbush), B in the flee banner (gbanner .gone). Prompt is in the chat history for this date.

## 20261008 Bid pane felt table + bid buttons + arrows + enemy-bid animation (prompts given to user, art pending)
Plan: (1) felt casino table panel, much larger bid pane; (2) LIAR / SPOT ON / BID buttons 10% smaller, moved down, each with up + down (pressed) art; (3) new left/right arrows for the player's bid dice, up + down; (4) enemy "thinking" bubble + puff + enemy bid die that flies out of the enemy portrait onto the pane. Sounds are synthesised in code (no files needed). Art received so far: none. When it arrives save sheets to sheets/<what>_<date>_src.png and cut into ui/.
Prompts (full text in chat 2026-10-08): A) felt table panel + seamless felt tile, B) button sheet (BID amber / LIAR blood red / SPOT ON sickly green x up, hover, down, disabled), C) arrow sheet (left/right x up, hover, down, disabled), D) enemy thinking/pop sheet + enemy bid die.

### Felt table v1 result (rejected, re-roll requested 20261008)
Received `sheets/felt_table_v1_20261008_src.png` (frame + felt tile). User wants it closer to a real poker table (reference: `sheets/felt_table_reference_poker_20261008_src.png`: racetrack/stadium shape, thick padded leather rail with brass studs, flat even felt) and does NOT like the oval light pool on the felt. Also read as riveted metal plates (panel seams/rivets). v2 prompt: stadium-shaped padded rail with brass studs, uniform flat felt with fine weave, no vignette/spotlight, no seams. Not used in game; the CSS stand-in (`.felt > .bidbox`) is live meanwhile.

### Felt table v2 result (liked, 20261008)
Received `sheets/felt_table_v2_20261008_src.png` (1024x338): stadium-shaped table, padded cracked oxblood leather rail, brass stud row, flat dark-green felt, plus a felt tile. User likes it; wants a SHORTER variant too (Gemini kept returning the same length). Shorter-variant prompt given in chat (canvas 3:2, table about 1.6:1, reference image attached). Not wired yet (stand-in CSS still live); wire as `.felt > .bidbox` background (9-slice, rail fixed, felt stretches) once cut.

### Felt table: grime follow-ups that worked (20261008)
After the shorter-table prompt, the user added two follow-up messages in Gemini to get the version he liked: (1) "make the felt look more grimdark and grimy, maybe with stains or a blood splatter" (first result was far too bloody: heavy splatter across the whole felt), then (2) "remove 90% of the blood splatter". For a clean re-roll, fold into the prompt: "grimy, stained felt with a few dark stains and only a very small amount of blood splatter, mostly near the edges, middle kept clear".

### Felt table shorter v3 (20261008)
Received `sheets/felt_table_short_20261008_src.png`: table about 1.4:1 (too short; the long v2 was about 2.3:1). Wanted: middle size about 1.9:1. Palette, studs and grime are good (small blood splatter near edges); felt tile came back with a vignette, ask for flat. Prompt for the 1.9:1 version given in chat.

### Felt table v4 (20261008)
Received `sheets/felt_table_mid_20261008_src.png`: about 1.63:1 (asked for 1.9, Gemini under-shoots lengths). Looks good; user wants about 2.0:1. Alternative noted: cut as 9-slice (fixed rounded end caps, stretch the straight middle) so any length works from one sheet. Felt tile still has a lighter centre, ask for flat or key the table felt instead.

### Bid buttons v1 result (20261008)
Received `sheets/bid_buttons_v1_20261008_src.png` (1024x559): 3 colours (amber, red, green) x 4 states (up, hover, down, disabled), marble block with wood trim, no text. Style liked. Problems: buttons only about 1.8:1 (want about 3:1), colours too muted/earthy compared with the in-game LIAR (#b23a30 / #7a2018) and SPOT ON (#4d9a4a / #2e6a2c). Re-roll prompt with exact hex colours and a wider shape given in chat. Not wired yet (stone-block CSS stand-ins live: `.bfbar .btn.blood`).

### Bid buttons v2 result (rejected, 20261008)
Received `sheets/bid_buttons_v2_rejected_20261008_src.png`: wider, but flat plastic-looking colour with no marble veining/cracks texture, baked-in column labels (UP / HOVER / DOWN / DISABLED), and the DOWN state looks the same as UP. Fix: use v1 (`bid_buttons_v1_20261008_src.png`) as the style reference, change only width, keep marble, forbid text. Alternative: widen v1 in code (3-slice) and recolour by hue shift.

## 2026-10-08 bid buttons v3 (used)
Sheet 3 rows (gold/red/green) x 4 columns (up/hover/down/disabled grey), no text, ~1.5:1. Gemini returned the same shape even when asked wider, so we stretch them in code: 62px caps kept, middle mirrored-tiled. Re-roll only if a wider native shape is wanted.

## 2026-10-08 bid arrows v1 (used)
Gemini's 4x4 sheet was inconsistent (mixed directions per row, "down" column showed down-chevrons). Used: left up, right up/hover/disabled; mirrored for the rest; grimdark pass in PIL (desaturate 20%, gamma 1.35, warm multiply, vignette); widened ~1.22x. For a re-roll ask for one row per direction (left, right) with identical column order up/hover/pressed/disabled.

## 2026-10-08 enemy bid FX (prompt D result, used)
One sheet: thinking cloud x4 (dots 0-3), puff x6 (last frame empty, dropped), scorched blank die upright/tilted. Portrait dome stand-in cropped off the bubble frames.

## 2026-10-08 The chaser ("undefined horror") pawn + game-over screen (prompts given to user, art pending)
Decision: the House chaser is replaced by a dark, undefined horror (maybe Death); catching the player = GAME OVER (no fight). Pawn frames drop into the existing `HPAWN` set (idle, idle2, glideA, glideB, loom, lunge, satisfied, greedy; 192x192 each) so wiring stays small. Game over = one full-screen illustration; the title/stamp is set in code with `titleText()` (logo font). Save sheets to `sheets/chaser_pawn_<date>_src.png` and `sheets/gameover_<date>_src.png`.
Pawn prompt: 4x2 grid of 8 equal square cells, magenta #FF00FF background, chunky pixel art with near-black outline like the rest of the game, one tall hooded shape of living darkness, no face, no clear body, tattered smoke-like edges, two tiny dull ember-red points for eyes, one long pale bone-coloured hand in some frames; reads dark against a cream parchment map; frames: idle, idle2 (slight sway), glideA, glideB (drifting, edges trailing), loom (rises larger), lunge (stretched forward, hand reaching), satisfied (settles, eyes dim), greedy (leans in, eyes bright). Same height and baseline in every cell.
Game-over prompt: single 16:9 pixel-art illustration, no text; a torch-lit stone table seen from above, the parchment map swallowed by creeping black shadow, a huge pale hand from the dark closing around the player's tiny knight pawn, scattered dice, deep maroon/black palette with bone cream and a little ember orange, strong vignette, empty dark space across the top third for a title.
Name decided 2026-10-08: the chaser is called **Gambler's Ruin** (the idea that a gambler will inevitably lose). Use it for the warning, the on-map label, the caught/game-over text; keep it in one `CHASER` config. The title font has an apostrophe glyph, so "GAMBLER'S RUIN" can be set with `titleText()`.
Warnings (decided 2026-10-08): end of day 6 "An ancient shadow stirs"; end of day 7 "The dark is rising"; Gambler's Ruin appears at the end of day 8.
Chaser pawn results 2026-10-08: v1 (`sheets/chaser_pawn_v1_20261008_src.png`) thin hooded shape; v2 "larger, stronger, more ominous" (`sheets/chaser_pawn_v2_larger_20261008_src.png`) liked better: loom (huge draped cloak) and greedy (hunched, big glowing red eyes) are the target look. Prompt v3 = make every frame match the greedy/loom look (bulky draped cloak, glowing red eyes, pale clawed hands), see chat.
v3 sheet (`sheets/chaser_pawn_v3_20261008_src.png`) chosen as the chaser art (better than the result of the rewritten prompt). It still had pose labels; cut away in code. Frames saved as portraits/chaser_<pose>.webp.

## 2026-10-08 game over art v2: pile of bloody dice (prompt given to user, art pending)
v1 (`sheets/gameover_v1_rejected_20261008_src.png`, giant hand over a map) rejected: does not fit the game. New idea: a pile of bloody dice (the game's own cream d6 with dark pips) as the centrepiece of the Gambler's Ruin game-over screen. Prompt: single image on flat magenta #FF00FF, chunky pixel art with near-black outline, heap of about 9 worn ivory six-sided dice with dark pips, chipped corners, hairline cracks, a few showing a single pip (ones), splattered and smeared with dark blood, a small pool of blood spreading from the bottom edge, drips down the sides, one die rolled out in front, strong top-left light, no table, no background, no text, centred with space around it.
Style reference for the new dungeon-plan map (2026-10-08): `sheets/dungeon_map_style_ref_20261008_src.png` (crop) and `sheets/gameover_v1_rejected_20261008_src.png` (full): ink floor plan on gridded parchment, rooms joined by corridors, black ink tendrils.

## 2026-10-08 dungeon-plan map: style references + piece prompts (given to user, art pending)
References the user found on the web (third-party works, NOT copied into the game or committed; kept outside the repo in /home/claude/refs/): a published ink dungeon map with hatched rock around gridded rooms and corridors, and a hand-drawn marker sketch on grid paper. Take only the style: thick ink walls with a short offset shadow, hatched solid rock around everything, light gridded floor, small props, stippled dots. The game version is chunky pixel art in that ink style (like the AI-made pixel dungeon map the user liked).
Mechanic idea: the floor starts as solid hatched rock; rooms and halls appear as they are discovered (fog = rock). Gambler's Ruin = black ink spreading along the halls.
Piece sheets: (A) seamless hatched-rock tile + seamless gridded-floor tile + parchment; (B) rooms by type with door gaps centred on each side; (C) corridor tiles (straight, corners, T, cross, dead-end caps); (D) doors, stairs, red tick/X/footprint stamps, black ink tendrils for the chaser. Full prompt text in chat 2026-10-08.
- User's own hand-drawn marker dungeon on grid paper saved as `sheets/dungeon_map_user_sketch_20261008_src.jpg` (primary style reference: thick black wall outline, dense random hatching for solid rock, gridded room floors, black hatched "pit", stippled dots at page edges, chain-link ring motif).
- Gemini try 1 (rejected by user, "dont love it"): returned one big cave-shaped map blob instead of separate pieces; rock = uniform diagonal crosshatch mesh with the grid drawn over it, thin walls, no props. Saved `sheets/dungeon_map_gemini_try1_20261008_src.png`. Fix: ask for ONE tile per image, rock = loose random scribbled strokes (user's sketch), grid on floor only.
- Game over v2 result 1: `sheets/gameover_dice_pile_v1_20261008_src.png` (tidy pyramid of ~9 bloody dice, blood pool bottom-left, one die in front). Good style; user wants the dice strewn around more (scattered, not a neat pile). Re-roll prompt asks for a loose scatter with a small heap, dice at varied angles, blood trails between them.
- Game over v2 result 2 (ACCEPTED): `sheets/gameover_dice_scatter_20261008_src.png`, strewn dice with blood trails. Cut to `ui/gameover_dice_scatter.webp`, wired as `RUIN_ART`.
## 2026-10-08 tall map parchments (accepted)
Prompt: tall portrait parchment 5:8, nothing drawn, calm centre, stains/folds/burnt edges near the edges, blood splatters near corners, floor line per floor (Cellar warm mildew; Catacombs grey with cobwebs; Gilded Pit scorched with gold dust). Gemini returned all three at 637x1024; floor 3's white outer corners were filled dark.
- Floor 4 parchment (landscape, accepted after contrast check): sheets/map_parchment_f4_house_20261008_src.png -> maps/map_parch_4.webp, wired as PARCH[4].

## 2026-10-08 enemy dice set v2 (prompt given to user, art pending)
Goal: replace the old-style enemy dice (`.edie`, `dieWrap(..., {back:true})`, shown at 48px in the foe row) with a set that matches the new pixel-art look (dark stone/charcoal body, bone-white pips, warm rim light, same chunky outline as the cream player dice and the bid-table art). Sheet to be keyed (magenta), cut to `ui/edie_*`, wired into the `.edie .die` CSS.

PROMPT (one sheet, 4 columns x 4 rows of equal cells, flat magenta #FF00FF background, nothing touching the cell edges):
"Pixel art game assets, chunky hand-pixelled style with a thick dark outline, matching a dark dungeon liar's-dice game: grim, warm torchlight from the upper left, soft ember-orange rim light on the lower edges, no anti-aliased blur, crisp pixels. Every item is the SAME enemy six-sided die seen from the same flat front view (one square face toward the camera, a hint of thickness at the bottom), same size in every cell, centred, on a flat solid magenta (#FF00FF) background. The die is cast from dark charcoal-grey stone with faint cracks and a few specks of dried blood, rounded corners, black outline, so it is clearly a different colour from the player's cream bone dice. Row 1: the die face-down: a pale bone skull with two glowing red eyes in the middle of the face (hidden state), then the same skull die glowing a little brighter (hover), then the skull die with a thin orange targeting ring around it (spell target), then the skull die with a pink glow and tiny baby-bonnet (the 'baby' die variant). Row 2: face-up pip dice showing 1, 2, 3, 4 pips (bone-white round pips with a tiny shadow). Row 3: face-up pip dice showing 5 and 6 pips, then a 'wild' die (a red jester-grin or a star in place of pips) and a 'bleached' die (same stone die faded to pale grey-white with no pips). Row 4: the destruction sequence, four frames: die cracking, die splitting into chunks, chunks flying apart with grey dust, last scattered fragments fading (the final frame is mostly empty). No text, no labels, no drop shadows on the background, no gradients in the background, each cell fully separated by magenta."

Tips: if Gemini merges cells, ask for "a 4x4 grid with clear magenta gutters between cells". If the style drifts, attach a screenshot of the new player dice and the bid table and say "match this exactly". Wiring checklist: save sheet to `sheets/edie_set_<date>_src.png`, cut to `ui/edie_back.png`, `edie_back_hover`, `edie_target`, `edie_baby`, `edie_1..6`, `edie_wild`, `edie_bleached`, `edie_break_1..4`; INDEX lines; replace `.edie .die` art (JS `dieWrap` with `back`).

## 2026-10-08 Apple (satchel icon; prompt given to user, art pending)
Used as: loose satchel item `apple` (found on first satchel open each run, drag onto portrait to eat, restores 1 fallen die). Art now: `ITEM_ART.apple` (pixSVG 12x12 placeholder). Eat animation is code-drawn (`appleFx`).
PROMPT (2 rows x 4 columns, magenta #FF00FF background): Row 1: whole glossy red apple with stem and one green leaf; bruised variant; one bite taken; whole with warm yellow hover glow. Row 2 (eating sequence): whole; one big bite with juice droplets; half eaten; core with seeds. Chunky dungeon pixel style, thick dark outline, torch light from upper left, ember rim light, no text, clear gutters.

## 2026-10-08 Wood buttons
No Gemini prompt: `btn_wood_*` were made by recolouring the existing marble button art (hue/brightness shift) to match the wood-and-iron panel.

## 2026-10-08 four art requests (Looking Glass, max HP icon, Log button, dead-end icons: sent to Gemini, results received and wired in; originals in sheets/)
Common to all: flat magenta #FF00FF background, no text, clear gutters between items, nothing touching the sheet edge, no magenta or purple inside the art or on its outline (the keyed edge ends up fringed).

A. LOOKING GLASS card art (card `glass`, "Use on your turn: force the enemy to bid again"). Match `cards/card2_*.webp` (160x160 single object, chunky dungeon pixel art, thick dark outline, torch light from upper left, ember rim light).
PROMPT: 2x2 grid, one item per cell, four variants of an ornate hand mirror ("looking glass") on a tarnished brass handle with a slightly cracked, dark glass that reflects a single watching eye. Variant 1: round mirror. 2: oval mirror with a small crack. 3: mirror with a skull on the handle. 4: mirror with a warm gold glint across the glass. Keep the object upright and centred, about 80% of the cell.

B. +1 MAX HP icon (replaces code-drawn `MAXIC_SVG`, used inline in text, so it must read at 24px).
PROMPT: 2x2 grid of simple bold icons, each one centred in a square cell. 1: a single cream six-sided die (five pips showing) with a bright green plus sign badge at the top right. 2: the same die with a green plus drawn over it in the middle. 3: a red heart made of a cream die face with a green plus on it. 4: two dice, a plain one and a smaller one with a green plus. Chunky pixel style, thick dark outline, high contrast, very simple shapes, readable when tiny.

C. LOG BUTTON (replaces code-drawn plaque, `.topbtns .btn`; text is added by the game, so leave the button blank). Must match the settings cog: dark purple-grey iron ring, riveted, brown wood, gold trim.
PROMPT: 1 row x 4 columns, same button in four states, about 200 x 80 px each, wide rounded rectangle, dark wooden plank face with an iron rim and four rivets, no text. State 1: idle. 2: hover (slightly lighter wood, faint ember glow along the rim). 3: pressed (darker, sunk in, no glow). 4: disabled (grey and dull). Same size, same position in each cell.

D. DEAD-END ROOM ICONS on the map (a slot machine room and a treasure chest room; they currently show the unknown-event scroll plus a star). Match `tokens/mapink_*.webp`: hand-inked, black ink outline, crosshatch shading, parchment-cream fill, small red accent, about 110-128 px.
PROMPT: 1 row x 2 columns. 1: a rickety one-armed-bandit slot machine with a lever, three reels showing a skull, a cherry and a bell, tiny red accent on the lever knob. 2: a small iron-bound treasure chest, lid slightly ajar with a hint of gold, tiny red wax seal on the lock. Ink-drawn look on transparent (magenta) background, matches the other map icons. No star: the game draws that itself.

## 2026-10-09 THE BUCK spinner (prompt given to user, art pending; I cannot reach Gemini from the workspace)
The first-turn spinner is now "are you the buck?". Left half = THE BUCK (you win it, the enemy goes first). Right half = NO BUCK (you go first). Wired in with the old board/arrow/banner art plus code-drawn labels, confetti and a gold tint (see INDEX "code-drawn" rows). Prompt to paste into Gemini (one sheet, flat magenta #FF00FF background, pixel art, same grimdark style, dark outlines, as the existing first_spinner sheet):

> Pixel-art game UI sheet on a flat magenta (#FF00FF) background, grimdark dungeon tavern style matching my earlier spinner sheet (cracked iron, brass studs, dried blood, warm torch light). Draw these separate pieces with space between them:
> 1. A round spinner board, 340x330 px, split down the middle. LEFT half is "THE BUCK": gold and warm amber stone with a proud carved buck (stag) head with big antlers, a faint golden glow, a small brass crown or coin motif. RIGHT half is "NO BUCK": cold dull grey-blue cracked stone with a plain empty iron ring/pawn mark, no glow. Iron rim with brass studs, same size and rim as before.
> 2. A gold "BUCK" win banner, 463x92 px: torn parchment ribbon with a strong golden glow, tiny coins and sparkles around the edges, EMPTY centre for text.
> 3. A grey "NO BUCK" banner, 463x92 px: torn parchment ribbon, dull grey glow, empty centre.
> 4. A round gold token with a stag head (120x120) and a round grey token with an empty pawn (120x120).
> 5. A celebration burst, 200x170 px: golden starburst with flying gold coins, sparks and tiny confetti.
> 6. A small brass buck-horn/stag-head pendant icon, 64x64, to mark "you hold the buck" on the HUD (optional).
> No text anywhere. Crisp pixel edges, no anti-aliased blur, transparent-ready magenta background.

## 2026-10-09 Sternidae counter (turn marker; prompt for better art, current art is a code-drawn pixel placeholder)
> Pixel-art game icon on a flat magenta (#FF00FF) background, grimdark dungeon style (cracked iron, brass, warm torchlight, dark outlines, crisp pixels). A royal tern (Sternidae) head and neck in profile facing right, based on the attached photo: white head, black shaggy crest patch at the back of the crown, small black eye with a white glint, long slender pointed orange bill, grey-white neck feathers. Draw it THREE ways, each ~128x128: (1) idle, (2) head tilted down and beak open mid-squawk, (3) mirrored facing left. Then draw a round iron medallion ring with brass studs (160x160, empty centre) for it to sit in, with a blue-glow version and a red-glow version. No text.


## 2026-10-09 the buck token (turn marker; current art is first_tok_player.png recoloured gold in code)
> Pixel-art game token on a flat magenta (#FF00FF) background, grimdark dungeon style (dark outlines, crisp pixels, warm torchlight). A round solid-gold coin about 120x120, thick bevelled rim with small dents, a knight's helmet and sword embossed on the face, worn gold with darker recesses and a bright highlight at upper left. Also draw: (1) the same coin edge-on mid-flip, (2) a small round gold PASS button (~70x70) with a chunky dark arrow pointing right embossed in it, same gold and rim style. No text.


## 2026-10-09 — Under-the-gun token and toss coin (requested, not yet drawn)
Sheet of 3 cells on a flat magenta (#FF00FF) background, each cell 512x512, pixel art in the game's style (chunky pixels, dark outlines, warm gold with ember-orange shading, grimdark):
1. A ROUND gold poker-chip style token, 120 px worth of detail, with a pixel-art revolver (six-shooter, side view, barrel pointing right) stamped in dark bronze in the centre; rope-twist or riveted rim. This is the "under the gun" turn marker that sits on a character portrait.
2. The same token as a large coin face: thick gold coin seen face-on, worn edges, the revolver in the centre. This is the heads side of the toss coin.
3. The tails side: the same coin with a red demon skull (match the existing red enemy token: horned skull, red field) in the centre.
No text. No shadows outside the shapes. Leave at least 40 px of magenta around each cell.
