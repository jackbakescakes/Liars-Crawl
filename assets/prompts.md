# Gemini prompts

Add newest first: date, what it made, the prompt (or a short summary), and which file in `assets/` it produced.

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
