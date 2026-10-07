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
| ui/btn_marble_amber_{idle,hover,pressed,disabled}.png | warm amber-yellow marble button (hue-shifted from gold, code-tinted) | 182x59 | CSS `--bm-amber_*` on `.btn[data-act="bid"]` (Bid) | tinted from btn_marble_gold, no Gemini prompt |
| ui/btn_marble_warmred_{idle,hover,pressed,disabled}.png | warmer, brighter red marble button (hue-shifted from blood) | 182x59 | CSS `--bm-warmred_*` on `.btn[data-act="liar"]` (Liar); replaces blood tint there | tinted from btn_marble_blood |
| ui/btn_marble_green_{idle,hover,pressed,disabled}.png | green marble button (hue-shifted from blood) | 182x59 | CSS `--bm-green_*` on `.btn[data-act="exact"]` (Spot On) | tinted from btn_marble_blood |
| ui/first_board.png | Who-goes-first spinner board: round dark-iron plate, left half steel-blue skull (you), right half blood-red demon (enemy) | 337x331 | FIRSTART.board (firstSpin, .fxboard) | sheets/first_spinner_20261007_src.png; prompt in prompts.md "who goes first" |
| ui/first_arrow.png | Grimdark spear arrow pointing left, brass hub at right end (pivot ~350,50) | 378x110 | FIRSTART.arrow (.fxarrow) | sheets/first_spinner_20261007_src.png; prompt in prompts.md "who goes first" |
| ui/first_spin.png | Round cracked-iron SPIN button (single state; hover/press done with CSS filters) | 171x172 | FIRSTART.spin (.fxspin) | sheets/first_spinner_20261007_src.png; prompt in prompts.md "who goes first" |
| ui/first_banner_blue.png | Torn parchment banner with blue glow, empty centre (You go first) | 463x92 | FIRSTART.banner_blue (.fxban) | sheets/first_spinner_20261007_src.png; prompt in prompts.md "who goes first" |
| ui/first_banner_red.png | Torn parchment banner with red glow, empty centre (Enemy goes first) | 463x93 | FIRSTART.banner_red (.fxban) | sheets/first_spinner_20261007_src.png; prompt in prompts.md "who goes first" |
| ui/first_tok_player.png | Steel-blue round token, helmet and sword | 120x120 | FIRSTART.tok_player (.fxtok) | sheets/first_spinner_20261007_src.png; prompt in prompts.md "who goes first" |
| ui/first_tok_enemy.png | Blood-red round token, horned skull | 119x120 | FIRSTART.tok_enemy (.fxtok) | sheets/first_spinner_20261007_src.png; prompt in prompts.md "who goes first" |
| ui/first_burst.png | Impact starburst plus sparks and embers | 199x167 | FIRSTART.burst (.fxburst) | sheets/first_spinner_20261007_src.png; prompt in prompts.md "who goes first" |
| ui/enc_chest_closed.png | Closed treasure chest, iron-bound wood | see file | ENCART.chest_closed (chest button `.chestbtn` in battle report Spoils) via encWinHTML() | sheets/encounter_window_v1_20261007_src.png; prompt in prompts.md "encounter window" |
| ui/enc_chest_opening.png | Chest with lid cracked open, gold light leaking | see file | ENCART.chest_opening (embedded, not yet animated) via encWinHTML() | sheets/encounter_window_v1_20261007_src.png; prompt in prompts.md "encounter window" |
| ui/enc_chest_open.png | Chest fully open, full of gold coins | see file | ENCART.chest_open (embedded, not yet used) via encWinHTML() | sheets/encounter_window_v1_20261007_src.png; prompt in prompts.md "encounter window" |
| ui/enc_padlock.png | Small bronze padlock | see file | unused (planned: battle report Spoils chest / encounter windows) | sheets/encounter_window_v1_20261007_src.png; prompt in prompts.md "encounter window" |
| ui/enc_spark1.png | Gold sparkle (thin cross) | see file | unused (planned: battle report Spoils chest / encounter windows) | sheets/encounter_window_v1_20261007_src.png; prompt in prompts.md "encounter window" |
| ui/enc_spark2.png | Gold sparkle (4-point star) | see file | unused (planned: battle report Spoils chest / encounter windows) | sheets/encounter_window_v1_20261007_src.png; prompt in prompts.md "encounter window" |
| ui/enc_spark3.png | Gold sparkle cluster | see file | unused (planned: battle report Spoils chest / encounter windows) | sheets/encounter_window_v1_20261007_src.png; prompt in prompts.md "encounter window" |
| ui/enc_frame_brown.png | Encounter window border, brown wood/iron/brass (default), empty dark interior | 236x155 | ENCART.frame_brown via encWinHTML() | sheets/encounter_window_v2_20261007_src.png; prompt in prompts.md "encounter window" (v2 revised prompt) |
| ui/enc_frame_red.png | Encounter window border, blood red | 237x154 | ENCART.frame_red via encWinHTML() | sheets/encounter_window_v2_20261007_src.png; prompt in prompts.md "encounter window" (v2 revised prompt) |
| ui/enc_frame_green.png | Encounter window border, murky green | 236x154 | ENCART.frame_green via encWinHTML() | sheets/encounter_window_v2_20261007_src.png; prompt in prompts.md "encounter window" (v2 revised prompt) |
| ui/enc_frame_violet.png | Encounter window border, violet | 237x154 | ENCART.frame_violet via encWinHTML() | sheets/encounter_window_v2_20261007_src.png; prompt in prompts.md "encounter window" (v2 revised prompt) |
| ui/enc_ring.png | Round bronze portrait ring, empty centre | 112x110 | ENCART.ring via encWinHTML() | sheets/encounter_window_v2_20261007_src.png; prompt in prompts.md "encounter window" (v2 revised prompt) |
| ui/enc_plaque.png | Iron-and-parchment title plaque, empty | 306x59 | ENCART.plaque via encWinHTML() | sheets/encounter_window_v2_20261007_src.png; prompt in prompts.md "encounter window" (v2 revised prompt) |
| ui/enc_parch.png | Torn parchment flavour-text panel, empty | 262x86 | ENCART.parch via encWinHTML() | sheets/encounter_window_v2_20261007_src.png; prompt in prompts.md "encounter window" (v2 revised prompt) |
| ui/enc_divider.png | Thin ornate divider line | 293x24 | ENCART.divider via encWinHTML() | sheets/encounter_window_v2_20261007_src.png; prompt in prompts.md "encounter window" (v2 revised prompt) |
| ui/enc_tray.png | Recessed dark mechanics tray, brass inner border | 384x117 | ENCART.tray via encWinHTML() | sheets/encounter_window_v2_20261007_src.png; prompt in prompts.md "encounter window" (v2 revised prompt) |
| ui/enc_footer.png | Empty footer strip for buttons | 393x38 | ENCART.footer via encWinHTML() | sheets/encounter_window_v2_20261007_src.png; prompt in prompts.md "encounter window" (v2 revised prompt) |
| portraits/enc_black_market.webp | Black Market trader (hooded, red eyes, relic stall); centre crop (captions excluded) | 236x236 | ENCPORT.black_market (encounter window portrait; mapped in ENCMAP) | sheets/enc_portraits_1_20261007_src.png; prompt in prompts.md "encounter portraits" |
| portraits/enc_campfire.webp | Campfire rest scene; centre crop (captions excluded) | 236x236 | ENCPORT.campfire (encounter window portrait; mapped in ENCMAP) | sheets/enc_portraits_1_20261007_src.png; prompt in prompts.md "encounter portraits" |
| portraits/enc_house.webp | The House: skeletal croupier; centre crop (captions excluded) | 236x236 | ENCPORT.house (encounter window portrait; mapped in ENCMAP) | sheets/enc_portraits_1_20261007_src.png; prompt in prompts.md "encounter portraits" |
| portraits/enc_pawnbroker.webp | The Pawnbroker; centre crop (captions excluded) | 236x236 | ENCPORT.pawnbroker (encounter window portrait; mapped in ENCMAP) | sheets/enc_portraits_1_20261007_src.png; prompt in prompts.md "encounter portraits" |
| portraits/enc_bone_peddler.webp | The Bone Peddler (old hag with bone staff); centre crop (captions excluded) | 236x236 | ENCPORT.bone_peddler (encounter window portrait; mapped in ENCMAP) | sheets/enc_portraits_1_20261007_src.png; prompt in prompts.md "encounter portraits" |
| portraits/enc_smith.webp | Ossric Gravelung, the Smith (orc smith); centre crop (captions excluded) | 236x236 | ENCPORT.smith (encounter window portrait; mapped in ENCMAP) | sheets/enc_portraits_1_20261007_src.png; prompt in prompts.md "encounter portraits" |
| portraits/enc_tattooist.webp | The Tattooist; centre crop (captions excluded) | 236x236 | ENCPORT.tattooist (encounter window portrait; mapped in ENCMAP) | sheets/enc_portraits_1_20261007_src.png; prompt in prompts.md "encounter portraits" |
| portraits/enc_face_painter.webp | The Face Painter; centre crop (captions excluded) | 236x236 | ENCPORT.face_painter (encounter window portrait; mapped in ENCMAP) | sheets/enc_portraits_1_20261007_src.png; prompt in prompts.md "encounter portraits" |
| portraits/enc_pasteboard.webp | Old Pasteboard (card dealer); centre crop (captions excluded) | 236x236 | ENCPORT.pasteboard (encounter window portrait; mapped in ENCMAP) | sheets/enc_portraits_1_20261007_src.png; prompt in prompts.md "encounter portraits" |
| portraits/enc_scratchcard.webp | The Scratch Card (grinning booth keeper); centre crop (captions excluded) | 236x236 | ENCPORT.scratchcard (encounter window portrait; mapped in ENCMAP) | sheets/enc_portraits_2_20261007_src.png; prompt in prompts.md "encounter portraits" |
| portraits/enc_slotmachine.webp | The Slot Machine (skull reels); centre crop (captions excluded) | 236x236 | ENCPORT.slotmachine (encounter window portrait; mapped in ENCMAP) | sheets/enc_portraits_2_20261007_src.png; prompt in prompts.md "encounter portraits" |
| portraits/enc_bloodanvil.webp | The Blood Anvil; centre crop (captions excluded) | 236x236 | ENCPORT.bloodanvil (encounter window portrait; mapped in ENCMAP) | sheets/enc_portraits_2_20261007_src.png; prompt in prompts.md "encounter portraits" |
| portraits/enc_boneidol.webp | The Bone Idol; centre crop (captions excluded) | 236x236 | ENCPORT.boneidol (encounter window portrait; mapped in ENCMAP) | sheets/enc_portraits_2_20261007_src.png; prompt in prompts.md "encounter portraits" |
| portraits/enc_scales.webp | The Penitent's Scales; centre crop (captions excluded) | 236x236 | ENCPORT.scales (encounter window portrait; mapped in ENCMAP) | sheets/enc_portraits_2_20261007_src.png; prompt in prompts.md "encounter portraits" |
| portraits/enc_vault.webp | The Hushed Vault (glowing keyhole door); centre crop (captions excluded) | 236x236 | ENCPORT.vault (encounter window portrait; mapped in ENCMAP) | sheets/enc_portraits_2_20261007_src.png; prompt in prompts.md "encounter portraits" |
| portraits/enc_bonebank.webp | The Bone Bank (skeleton teller); centre crop (captions excluded) | 236x236 | ENCPORT.bonebank (encounter window portrait; mapped in ENCMAP) | sheets/enc_portraits_2_20261007_src.png; prompt in prompts.md "encounter portraits" |
| portraits/enc_fountain.webp | The Moonlit Fountain; centre crop (captions excluded) | 236x236 | ENCPORT.fountain (encounter window portrait; mapped in ENCMAP) | sheets/enc_portraits_2_20261007_src.png; prompt in prompts.md "encounter portraits" |
| portraits/enc_deadthrone.webp | The Dead Man's Throne; centre crop (captions excluded) | 236x236 | ENCPORT.deadthrone (encounter window portrait; mapped in ENCMAP) | sheets/enc_portraits_2_20261007_src.png; prompt in prompts.md "encounter portraits" |
| portraits/enc_rollgold.webp | (v2, replaces v1 in _old/) Roll for Gold (golden d20 on coins); already circle-masked (alpha), ring and captions cropped out | 224x224 | ENCPORT.rollgold (encounter window portrait; mapped in ENCMAP) | sheets/enc_portraits_3_20261007_src.png; prompt in prompts.md "encounter portraits" |
| portraits/enc_rolllife.webp | (v2, replaces v1 in _old/) Roll for Your Life (red d20 over spike pit); already circle-masked (alpha), ring and captions cropped out | 224x224 | ENCPORT.rolllife (encounter window portrait; mapped in ENCMAP) | sheets/enc_portraits_3_20261007_src.png; prompt in prompts.md "encounter portraits" |
| portraits/enc_rollsigil.webp | (v2, replaces v1 in _old/) Roll for a Sigil (violet seal over black d20); already circle-masked (alpha), ring and captions cropped out | 224x224 | ENCPORT.rollsigil (encounter window portrait; mapped in ENCMAP) | sheets/enc_portraits_3_20261007_src.png; prompt in prompts.md "encounter portraits" |
| portraits/enc_goblinbargain.webp | (v2, replaces v1 in _old/) The Goblin's Bargain; already circle-masked (alpha), ring and captions cropped out | 224x224 | ENCPORT.goblinbargain (encounter window portrait; mapped in ENCMAP) | sheets/enc_portraits_3_20261007_src.png; prompt in prompts.md "encounter portraits" |
| portraits/enc_contractsale.webp | (v2, replaces v1 in _old/) Contract of Sale; already circle-masked (alpha), ring and captions cropped out | 224x224 | ENCPORT.contractsale (encounter window portrait; mapped in ENCMAP) | sheets/enc_portraits_3_20261007_src.png; prompt in prompts.md "encounter portraits" |
| portraits/enc_contractruin.webp | (v2, replaces v1 in _old/) Contract of Mutual Ruin (burning torn contract); already circle-masked (alpha), ring and captions cropped out | 224x224 | ENCPORT.contractruin (encounter window portrait; mapped in ENCMAP) | sheets/enc_portraits_3_20261007_src.png; prompt in prompts.md "encounter portraits" |
| portraits/enc_contractplenty.webp | (v2, replaces v1 in _old/) Contract of Plenty; already circle-masked (alpha), ring and captions cropped out | 224x224 | ENCPORT.contractplenty (encounter window portrait; mapped in ENCMAP) | sheets/enc_portraits_3_20261007_src.png; prompt in prompts.md "encounter portraits" |
| portraits/enc_fortify.webp | (v2, replaces v1 in _old/) Fortify (shield and sandbags); already circle-masked (alpha), ring and captions cropped out | 224x224 | ENCPORT.fortify (encounter window portrait; mapped in ENCMAP) | sheets/enc_portraits_3_20261007_src.png; prompt in prompts.md "encounter portraits" |
| portraits/enc_chest.webp | (v2, replaces v1 in _old/) Treasure Chest (open, glowing); already circle-masked (alpha), ring and captions cropped out | 224x224 | ENCPORT.chest (encounter window portrait; mapped in ENCMAP) | sheets/enc_portraits_3_20261007_src.png; prompt in prompts.md "encounter portraits" |
| portraits/enc_alt_contractsale_a.webp | Alternate portrait option A for contractsale (square, full-bleed) | ~318x318 | unused (candidate; pick A, B or current) | sheets/enc_portraits_4a_20261007_src.png; prompt in prompts.md "encounter portraits v2" |
| portraits/enc_alt_contractsale_b.webp | Alternate portrait option B for contractsale (square, full-bleed) | ~318x318 | unused (candidate; pick A, B or current) | sheets/enc_portraits_4b_20261007_src.png; prompt in prompts.md "encounter portraits v2" |
| portraits/enc_alt_contractplenty_a.webp | Alternate portrait option A for contractplenty (square, full-bleed) | ~318x318 | unused (candidate; pick A, B or current) | sheets/enc_portraits_4a_20261007_src.png; prompt in prompts.md "encounter portraits v2" |
| portraits/enc_alt_contractplenty_b.webp | Alternate portrait option B for contractplenty (square, full-bleed) | ~318x318 | unused (candidate; pick A, B or current) | sheets/enc_portraits_4b_20261007_src.png; prompt in prompts.md "encounter portraits v2" |
| portraits/enc_alt_contractruin_a.webp | Alternate portrait option A for contractruin (square, full-bleed) | ~318x318 | unused (candidate; pick A, B or current) | sheets/enc_portraits_4a_20261007_src.png; prompt in prompts.md "encounter portraits v2" |
| portraits/enc_alt_contractruin_b.webp | Alternate portrait option B for contractruin (square, full-bleed) | ~318x318 | unused (candidate; pick A, B or current) | sheets/enc_portraits_4b_20261007_src.png; prompt in prompts.md "encounter portraits v2" |
| portraits/enc_alt_fortify_a.webp | Alternate portrait option A for fortify (square, full-bleed) | ~318x318 | unused (candidate; pick A, B or current) | sheets/enc_portraits_4a_20261007_src.png; prompt in prompts.md "encounter portraits v2" |
| portraits/enc_alt_fortify_b.webp | Alternate portrait option B for fortify (square, full-bleed) | ~318x318 | unused (candidate; pick A, B or current) | sheets/enc_portraits_4b_20261007_src.png; prompt in prompts.md "encounter portraits v2" |
| portraits/enc_alt_bloodanvil_a.webp | Alternate portrait option A for bloodanvil (square, full-bleed) | ~318x318 | unused (candidate; pick A, B or current) | sheets/enc_portraits_4a_20261007_src.png; prompt in prompts.md "encounter portraits v2" |
| portraits/enc_alt_bloodanvil_b.webp | Alternate portrait option B for bloodanvil (square, full-bleed) | ~318x318 | unused (candidate; pick A, B or current) | sheets/enc_portraits_4b_20261007_src.png; prompt in prompts.md "encounter portraits v2" |
| portraits/enc_alt_deadthrone_a.webp | Alternate portrait option A for deadthrone (square, full-bleed) | ~318x318 | unused (candidate; pick A, B or current) | sheets/enc_portraits_4a_20261007_src.png; prompt in prompts.md "encounter portraits v2" |
| portraits/enc_alt_deadthrone_b.webp | Alternate portrait option B for deadthrone (square, full-bleed) | ~318x318 | unused (candidate; pick A, B or current) | sheets/enc_portraits_4b_20261007_src.png; prompt in prompts.md "encounter portraits v2" |
| portraits/enc_alt_rollsigil_a.webp | Alternate portrait option A for rollsigil (square, full-bleed) | ~318x318 | unused (candidate; pick A, B or current) | sheets/enc_portraits_4a_20261007_src.png; prompt in prompts.md "encounter portraits v2" |
| portraits/enc_alt_rollsigil_b.webp | Alternate portrait option B for rollsigil (square, full-bleed) | ~318x318 | unused (candidate; pick A, B or current) | sheets/enc_portraits_4b_20261007_src.png; prompt in prompts.md "encounter portraits v2" |
| portraits/enc_alt_goblinbargain_a.webp | Alternate portrait option A for goblinbargain (square, full-bleed) | ~318x318 | unused (candidate; pick A, B or current) | sheets/enc_portraits_4a_20261007_src.png; prompt in prompts.md "encounter portraits v2" |
| portraits/enc_alt_goblinbargain_b.webp | Alternate portrait option B for goblinbargain (square, full-bleed) | ~318x318 | unused (candidate; pick A, B or current) | sheets/enc_portraits_4b_20261007_src.png; prompt in prompts.md "encounter portraits v2" |
| portraits/enc_alt_pawnbroker_a.webp | Alternate portrait option A for pawnbroker (square, full-bleed) | ~318x318 | unused (candidate; pick A, B or current) | sheets/enc_portraits_4a_20261007_src.png; prompt in prompts.md "encounter portraits v2" |
| portraits/enc_alt_pawnbroker_b.webp | Alternate portrait option B for pawnbroker (square, full-bleed) | ~318x318 | unused (candidate; pick A, B or current) | sheets/enc_portraits_4b_20261007_src.png; prompt in prompts.md "encounter portraits v2" |
| (chosen set, 2026-10-07) | FINAL encounter portraits: for contractsale, contractruin, fortify, bloodanvil, rollsigil, goblinbargain use option B; for contractplenty, deadthrone, pawnbroker use option A. portraits/enc_<name>.webp now holds the chosen art (square full-bleed; round-crop in code); previous versions in _old/enc_<name>_prev.webp | - | unused (planned: encounter windows) | enc_alt_* files, sheets 4a/4b |

## Encounter window template (code)
- JS `encWinHTML({key, variant, title, flav, tray, foot, merch})` builds the 1100x840 window; `encShell(key, variant, html, merchKind)` wraps older screen HTML (h2 -> plaque, first muted `<p>` -> parchment, trailing `.row` -> footer). Portrait lookup `ENCMAP[event type]`, colour `ENCVAR[type]` (brown default, red/green/violet).
- Used by: shop (`shopHTML`), camp (`campHTML`), every event (`eventHTML`), and the chest reward window (`chestWinOpen`, overlay `#chestwin`, red X via WIN_X).
- Chest: `S.victory.chest = {opts, taken}` created in `afterCombat` for big fights; `.chestbtn` in `repExtraHTML`; the old full-screen `reward` screen is gone.
| sheets/seal_reference_20261007.png | Reference sheet of three existing seals (Optimistic, Fickle, Golden) on magenta, extracted from SEAL_IMG; given to Gemini as the style reference for the Cogent seal | see file | unused (reference only) | made from the game's embedded seal art |
| (code-drawn) seal `cogent` | Code-drawn placeholder; REPLACED by Gemini art (SEAL_IMG.cogent). BICON_ROWS.cogent (`>>`) still used as the small badge icon on dice | 22x22 grid | BICON.cogent (die badge) only | code-drawn |
| sheets/cogent_seal_try1_20261007_src.png | Gemini attempt 1 at the Cogent seal: it drew pairs of seals joined by a bar instead of single seals, so unusable as-is | 1024x374 | unused (rejected, see prompts.md) | prompt in prompts.md "Cogent seal" |

| sheets/cogent_seals_20261007_src.png | Gemini sheet 2: four single Cogent seals (1 chevrons+die, 2 pointing hand+die, 3 speech bubble with die, 4 die with circular arrows), magenta key | 1024x1024 | source for ui/seal_cogent_1..4 | prompts.md "Cogent seal" (single-seal re-prompt) |
| ui/seal_cogent_1.webp | Cogent seal, chevrons >> and a die; keyed, despilled, 224x224 canvas | 224x224 | unused (alternative) | sheets/cogent_seals_20261007_src.png |
| ui/seal_cogent_2.webp | Cogent seal, pointing hand and a die; keyed, despilled, 224x224 canvas | 224x224 | unused (alternative) | sheets/cogent_seals_20261007_src.png |
| ui/seal_cogent_3.webp | Cogent seal, speech bubble with a die; keyed, despilled, 224x224 canvas | 224x224 | unused (alternative) | sheets/cogent_seals_20261007_src.png |
| ui/seal_cogent_4.webp | Cogent seal, die with circular arrows (CHOSEN); keyed, despilled, 224x224 canvas | 224x224 | SEAL_IMG.cogent (ITEM_ART.cogent) | sheets/cogent_seals_20261007_src.png |
