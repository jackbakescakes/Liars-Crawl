# Asset index

Search this file first (grep a keyword). One row per asset. Rules are in `/CLAUDE.md`.

| file | what it is | size | used in game as | source / notes |
|---|---|---|---|---|
| _(nothing filed yet — backfill from the game file and /tmp originals)_ | | | | |

## Known assets currently only embedded in the HTML (to extract into files)
- Backgrounds: `MAPBG[1-4]` (landscape floor maps), `FLOOR_BG` (room backgrounds)
- Map tokens: `VTOK` (bronze, silver, gold, cleared, entrance, deadend), `HOVL` (ring, dayplq, distplq)
- House pawn frames: `HPAWN` (idle, idle2, glideA, glideB, lunge, loom, greedy, satisfied)
- Portraits: `BOSS_PORTRAITS` (incl. house frames)
- Stamps: `STAMPS` (liar, honest, caught, awakens, spot, slot, slotlit, plaque)
- Coins / pouch / pig: `GA`; cards: `CARDART`; merchant: `MERCH_IMG`
- Scratch card: foil `SCRATCH_FOIL`, flecks `SCRATCH_FLECKS`, frame in the `.scratchwrap::after` CSS
- Code-drawn: red X close button (`.redx`) — replace if Gemini art is supplied
