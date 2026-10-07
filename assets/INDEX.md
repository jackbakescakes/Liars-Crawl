# Asset index

Search this file first (grep a keyword). One row per asset. Rules are in `/CLAUDE.md`.

## Where things are
Every image embedded in the game is extracted as a file (by `tools/extract_assets.py`) and listed one per row in **`assets/INDEX.generated.md`** (file, what it is, size, JS constant / CSS name it's used as). Grep that file first. Counts: cards 140, maps 15, portraits 167, stamps 9, tokens 21, ui 104.

Naming: `<constant>_<key>` — e.g. `ui/x_svg.webp` = `X_SVG`, `stamps/stamps_caught.webp` = `STAMPS.caught`, `portraits/hpawn_idle.webp` = `HPAWN.idle`, `maps/mapbg_1.webp` = `MAPBG["1"]`, CSS-embedded art is `ui/css_<selector or variable>`.

## Handy lookups
| want | file / constant |
|---|---|
| **Red X close button (Gemini, 96x95)** | `ui/x_svg.webp` · JS `X_SVG` (satchel `.sp-x`) · CSS `.redx` (scratch card) |
| House idol pawn frames | `portraits/hpawn_*.webp` · `HPAWN` |
| Stamps (LIAR, HONEST, CAUGHT, THE HOUSE AWAKENS) | `stamps/stamps_*.webp` · `STAMPS` |
| Floor map backgrounds (landscape) | `maps/mapbg_1..4.webp` · `MAPBG` |
| Vault / entrance / cleared map tokens | `tokens/vtok_*.webp` · `VTOK` |
| Coins, pouch, piggy bank | `ui/ga_*.webp` · `GA` |
| Playing cards | `cards/cardart_*.webp` · `CARDART` |
| Scratch card frame / foil | `ui/css_scratchwrap_after.webp`, `ui/scratch_flecks.webp` (foil is `SCRATCH_FOIL`, not yet extracted) |

## Title lettering alphabet
A full A-Z, ! ? ' . and 0-9 set in the logo style is being commissioned from Gemini. When it exists it lives in `assets/fonts/` (`title_<CHAR>.webp`, plus `title_metrics.json`). Status: done. In game as `TITLEFONT` / `titleText()`. See CLAUDE.md.

## Not saved yet
The original Gemini sheets (before cutting) were only ever in temporary folders and are mostly gone; going forward they go in `assets/sheets/` (see CLAUDE.md). The Gemini prompts used so far aren't recorded in `prompts.md` yet; add them as they are reused.

## Code-drawn (no Gemini art)
None currently listed; add any placeholder here.

## Wooden panel frame (Gemini)
- `ui/panel_wood_iron.png` (583x446, transparent): dark wood panel with carved scroll top/bottom, copper studs and riveted iron corner plates. Original sheet: `sheets/panels_sheet_src.jpg`. Style reference for new frames (e.g. the map border). Not embedded in the game yet.
| ui/settings_icon.webp | Settings button: forged iron/wood round button with gold cog (the right-hand icon of the sheet) | 127x128 | `#cog` button, CSS `.cog .cogimg` (replaces the code-drawn gold cog) | sheets/settings_icon_20261007_src.png; prompt in prompts.md "Settings icon" |

## Marble buttons (2026-10-07)
| file | what it is (plain words) | size WxH | used in game as | source sheet + prompt note |
|---|---|---|---|---|
| ui/btn_marble_{idle,hover,pressed,disabled}.png | worn marble block button with wood base, 4 states (hover re-brightened in code) | 182x59 | CSS `--bm-idle/hover/pressed/disabled` -> 9-slice `border-image` on every `.btn` except topbtns/hudbtns/rollbtn/beginbtn/mapkeybtn/cog/xbtn | sheets/buttons_marble_v2_20261007_src.png, prompts.md "button set v2" |
| ui/btn_marble_blood_*.png | same, tinted blood red (code-tinted) | 182x59 | `.btn.blood` (Liar, Spot On) via `--bm-blood_*` | tinted from marble |
| ui/btn_marble_gold_*.png | same, tinted gold (code-tinted) | 182x59 | `.btn.liargold` via `--bm-gold_*` | tinted from marble |
| ui/btn_marble_round_*.png, ui/btn_marble_square_*.png | round and square marble icon buttons | ~98x99 / 103x102 | unused (ready for icon buttons) | marble v2 sheet |
