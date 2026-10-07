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
