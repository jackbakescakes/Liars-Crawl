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

## Encounter frame, 9-slice (20261008)
| file | what it is (plain words) | size WxH | used in game as | source sheet + prompt note |
|---|---|---|---|---|
| ui/enc_frame9_brown.png (also red, green, violet) | Wooden window frame cropped from enc_frame_<v>.png (rows 17+, crest removed) for border-image tiling | ~233x138 | `ENCART.frame9_<v>`, `.encwin .encfr` (border-image, slice 30, width 70px, repeat round). Replaces `ENCART.frame_<v>` img | code-cut from enc_frame_<v>.png, no new Gemini art |
| ui/enc_crest_brown.png (also red, green, violet) | Shield crest that sits on top-centre of the frame | 80x28 | `ENCART.crest_<v>`, `.encwin .enccrest` | same as above |

## Tattoo scrolls (20261008)
| file | what it is | size | used in game as | source sheet + prompt note |
|---|---|---|---|---|
| ui/tattoo_scroll_2..6.png / .webp | parchment scroll with a hexagon die showing 2/3/4/5/6 pips (magenta keyed, transparent) | 174x389 | `TATSCROLL[2..6]` -> `.tatscroll .tsart` in the Tattooist event (code-drawn parchment `.tssheet` stays as fallback) | sheets/tattoo_scrolls_20261008_src.png; prompt in prompts.md |

## Scratch card symbols (20261008)
| file | what it is | size WxH | used in game as | source sheet + prompt note |
|---|---|---|---|---|
| sheets/scratch_symbols_20261008_src.png | Gemini sheet: cherries, liberty bell, skull (top row plain, bottom row with cream glow rim), magenta key | 1024x338 | source for ui/scratch_* | prompts.md "Scratch card symbols" |
| ui/scratch_cherry.webp | Pixel cherries, plain | 102x104 | `SCR_SYM.scratch_cherry` (.scratchwrap .sc-sym img) | sheets/scratch_symbols_20261008_src.png |
| ui/scratch_bell.webp | Cracked liberty bell, plain | 84x104 | `SCR_SYM.scratch_bell` | same |
| ui/scratch_skull.webp | Skull with red eye glints, plain | 87x104 | `SCR_SYM.scratch_skull` | same |
| ui/scratch_cherry_glow.webp / scratch_bell_glow.webp / scratch_skull_glow.webp | Same with cream glow rim, shown on a winning row (cherries, bells) | ~102/90/91 x 104 | `SCR_SYM.scratch_*_glow` | same |
Replaces the earlier code-drawn pixSVG placeholders (removed). Scratch card odds: 10% three skulls (lose 1 HP), 30% mixed (nothing), 40% three cherries (+50 gold), 20% three bells (+100 gold). Event window uses the open template (`encWinHTML` mode `'open'`, `.encopen`).
| (code-drawn) skullcap relic icon | 12x12 pixel-art iron skullcap (placeholder) | 12x12 | `ITEM_ROWS.skullcap` / `ITEM_ART.skullcap` | code-drawn, replace with Gemini art if supplied |
| (code-drawn) forge map icon | 12x12 pixel-art anvil for The Forge event (placeholder) | 12x12 | `EV_ROWS.forge` | code-drawn, replace with Gemini art if supplied |
| (reused) smith portrait | The Forge event reuses the Smith encounter portrait | - | `ENCMAP.forge = 'smith'` | needs its own Gemini portrait if wanted |
| (code-drawn) AMBUSH banner | "AMBUSH!" in the title lettering plus a sub-line, shown when walking into a room the Loot Goblin hid in | - | `gobAmbush()` / `.hsfx.ambush` / `titleText('Ambush!')` | code-drawn, replace/extend with Gemini leap art when supplied |

| sheets/parchment_floor{1..4}_*_20261008_src.png | Four blank dirty, blood-splattered parchment map sheets (Cellar tan/mildew, Catacombs grey/cobwebs, Gilded Pit scorched/heavy blood, House dark/burnt) | 1024x572 each | unused (planned: branching-map background per floor) | original Gemini sheets, prompt 1 in prompts.md 2026-10-08. Not yet cut |
| sheets/mapicons_20261008_src.png | 12 map icons: fight, elite, boss, entrance, camp, shop, event, unknown, red X, ring, double ring, arrowhead (labels are baked under each, to crop off) | 1024x559 | unused (planned: branching-map node icons) | prompt 2, 2026-10-08. Not yet cut |
| sheets/mapdecor_v1_notpixel_20261008_src.png | Margin decorations (compass, skulls, serpent, cage, gravestone, tree, cards, dice, HERE BE LIARS banner) | 1024x559 | unused | prompt 5, 2026-10-08; NOT pixel art, user wants a pixel-art re-roll |
| sheets/mapsplatter_v1_notpixel_20261008_src.png | Blood splatters, ink blots, soot smudges | 1024x559 | unused | prompt 6, 2026-10-08; NOT pixel art, user wants a pixel-art re-roll |
| sheets/mapdecor_v2_toopixel_20261008_src.png | Margin decorations, second attempt: chunky low-res pixel art (compass, two skull piles, tentacled horror, cage, gravestone, dead tree with crow, cards and dagger, dice, HERE BE LIARS banner) | 1024x559 | unused | pixel-art prompt 5, 2026-10-08; too chunky and low-res next to the ink icons, wants a middle ground. Layout ignored the 3x3 grid (4 items in row 1) |
| sheets/mapdecor_v3_stillpixel_20261008_src.png | Margin decorations, third attempt: fine pixel art (compass, skull pile, tentacled horror, cage, gravestone, dead tree with crow, cards and dagger, dice, HERE BE LIARS scroll) | 1024x1024 | unused (fallback) | middle-ground pixel prompt 5, 2026-10-08; grid and details are right but the visible pixel grid still clashes with the ink/painted icon sheet |
| sheets/mapsplatter_v2_watercolour_20261008_src.png | Blood splatters (6), ink blots (3), red X, soot smudges (3), watercolour look | 1024x768 | unused (planned: parchment overlays on the branching map) | second splatter roll, 2026-10-08, painterly not pixel; user is happy to try it in game. Original margin decor sheet v1 chosen for the map |
| sheets/bossbadges_v1_cleanvector_20261008_src.png | Boss badges 2x2: Dealer (ogre with cards and coins), Croupier (vampire at a roulette wheel), Pit Boss (horned brute in a tuxedo), House (three faces, six arms) | 1024x808 | unused | prompt 3, 2026-10-08; user does not like them: clean flat vector black/white, clashes with the grimy inked icon sheet. Map uses the generic crowned-skull boss icon until a re-roll |

### Branching ink-on-parchment map (2026-10-08) — built into the working file, NOT yet published
| file | what it is | size | used in game as | source |
|---|---|---|---|---|
| maps/parchment_floor1..4.webp | dirty bloody parchment per floor, white torn edge cropped off | 1024x572 | `PARCH[1..4]` (`.map.ink` background) | parchment_floor*_20261008_src.png |
| tokens/mapink_fight/elite/boss/camp/shop/event/unknown/cleared/entrance.webp | ink node icons (crossed swords, horned skull, crowned skull, tent+fire, stall, scroll, red ?, red X, arch) | ~110px | `MAPINK.fight` etc. (boss = generic crowned skull; replaces TOK/VTOK on the map) | mapicons_20261008_src.png |
| tokens/mapink_ring.webp, mapink_arrow.webp | ink ring round a reachable node; arrowhead pointer above it | ~130px | `MAPINK.ring` (`.tokglow`), `MAPINK.arrow` (`.tokhand`, flipped down) | mapicons sheet |
| maps/mapdec_*.webp (tree grave kraken cage skulls compass cards dice banner) | margin drawings | ~150-260px | `MAPDEC`, placed by `INKDEC`/`inkDecor()` (cards, dice, banner unused) | mapdecor_v1_notpixel_20261008_src.png |
| maps/mapsplat_1..12.webp | blood splashes | ~180px | `MAPSPLAT` (first 8 used), `.msplat` | mapsplat_v1_notpixel_20261008_src.png |
| (code-drawn) dotted trails | SVG dotted ink lines, black = locked, red = open, dark red = walked | - | `drawTrails()`, `svg.trails .tr-*` | code-drawn, replace with Gemini art if supplied |
Replaced on the map (old assets kept in file, unused by the map): MAPBG, TOK, VTOK, trail UIART.

### Relics button and tray (2026-10-08) — art received, NOT yet wired into the game
| file | what it is | size | used in game as | source |
|---|---|---|---|---|
| sheets/relics_ui_20261008_src.png | Gemini sheet: closed button, open button, empty slot, tray | 1024x572 | original | prompt in prompts.md 2026-10-08 RELICS |
| ui/relic_btn_closed.png | round iron-rimmed RELICS button, gem on plain wood face (ring emblem painted out) | ~247x250 | unused (planned: button on the portrait rim at 7:45) | cut from sheet; ring area repainted in code with wood grain |
| ui/relic_btn_closed_smallringcovered.png | same, only the small inner ring covered; part of the big ring remains | ~247x250 | unused (alternative) | same |
| ui/relic_btn_open.png | pressed/open button with ring emblem | ~238x240 | unused (planned: open state) | sheet, not retouched |
| ui/relic_slot_empty.png | empty square relic socket | ~239x235 | unused | sheet |
| ui/relic_tray.png | wooden drawer plank with iron end cap | ~453x137 | unused | sheet |
| ui/aseprite/*.png, relics_ui.aseprite | the relic button/slot/tray sheet shrunk 4x to true pixel size (~61px buttons), 28-colour palette, transparent; .aseprite has one layer per piece, original closed button hidden | 256x143 canvas | unused (for the user to repaint the ring) | relics_ui_20261008_src.png |
| sheets/relic_button_closed_userdrawn_20261008_src.png, ui/relic_btn_closed_v2.png | RELICS button, closed, repainted by the user in Aseprite: one big ring and ruby on wood, transparent | 61x62 | `RELICBTN.closed`, `.relicbtn` (relics button on the portrait rim at 7:45; `relicBtnHTML()`) | drawn by the user |
| ui/aseprite/tray.png | wooden tray, 4x-shrunk | 115x36 | `RELICBTN.tray`, `.rdtray` (backs the sliding relic slots, `.relicdrawer`) | relics_ui_20261008_src.png |
| (code-drawn) relic button open state, glows, sounds | pressed look = darker + sunk; yellow/orange/red glows via CSS; sfx `relicOpen/relicClose/relicDeny` | - | `.relicbtn.on`, `body.relichold/.relicfull`, `SFX.relic*` | code-drawn |
| sheets/knight_ink_drawing_user_20261008_src.jpg | user's pen-and-ink drawing of a leaping knight (bucket helm, sword, pencil wings) | 1500x2000 | unused | drawn by the user |
| tokens/knight_ink_pixel_64/96/192.png | the user's knight drawing pixelated at three heights (5-tone warm ink ramp, transparent, inner pen hatching kept, pencil wings dropped) | 53x64, 79x96, 158x192 | unused (preview only) | knight_ink_drawing_user_20261008_src.jpg |
| ui/felt_table_long.png | Bid-pane poker table: stadium padded leather rail, brass studs, flat grimy green felt (keyed, magenta fringe cleaned) | 775x313 | source for the 3 slices below | sheets/felt_table_v2_20261008_src.png (Gemini, "poker table" prompt, see prompts.md) |
| ui/felt_table_long_capL.png / _capR.png | Left and right rounded end caps of the long table (165px each) | 165x313 | unused (alternate, long table); replaced in game by the felt_table_mid pieces | same sheet |
| ui/felt_table_long_mid.png | Straight middle of the long table | 445x313 | unused (alternate, long table) | same sheet |
| (code-drawn) bid arrows + LIAR / SPOT ON | `.bfarr`, `.bfbar .btn.blood` stone-block stand-ins with pressed state | n/a | code-drawn, replace with Gemini art if supplied | prompt B/C in prompts.md |
| (code-drawn) enemy thinking bubble, puff, bid die | `.ebub`, `.epuff`, `.ebdie` (JS `ebidThink`, `ebidThrow`) | n/a | code-drawn, replace with Gemini art if supplied | prompt D in prompts.md |
| ui/felt_table_mid.png | Medium poker table (about 1.6:1 as drawn), keyed, felt vignette flattened | 713x438 | source for the slices below | sheets/felt_table_mid_20261008_src.png (Gemini, shorter-table prompt) |
| ui/felt_table_mid_capL.png / _capR.png | Rounded end caps of the table, scaled to display size | 134x298 | CSS `.felt > .bidbox` background layers 1 and 2 (base64 webp) | same sheet |
| ui/felt_table_mid_tile.png | Repeating straight middle (10 stud pitches, felt cleaned of stains and colour-matched to caps) | 203x298 | CSS `.felt > .bidbox::before` (repeat-x between the caps) so the pane is 590x298 (about 2:1); replaces the code-drawn felt stand-in | same sheet |
| ui/btn_{gold,red,green}_{up,hover,down,off}.webp | Marble stone buttons, 3-slice stretched (caps + mirrored middle) from the v3 sheet; hover/down/disabled-grey states | 284x152 (shown 156x76 css) | red = LIAR, green = SPOT ON (`.felt .bfbar .btn.blood`, `[data-act="exact"]`); gold unused (reserve for BID) | sheets/bid_buttons_v3_20261008_src.png; Gemini would not widen them, so stretched in code |
| ui/btn_arrow_{left,right}_{up,hover,down,off}.webp | Grimdark cracked-stone bid arrows (darkened + warm-tinted in code from the Gemini sheet; left hover/off are mirrors of right; down = darker up) | 176x144 (shown 88x72 css) | `.felt .bfarr[data-act="qoffm"]` (left) / `[data-act="qoffp"]` (right); replaces the CSS stone arrows | sheets/bid_arrows_v1_20261008_src.png (sheet had inconsistent rows/down chevrons, so only the right arrow cells and left-up were used) |
| ui/enemy_think_0..3.png | Enemy thinking cloud, 0-3 glowing dots | 111x115 (shown 124x128) | `.ebub` frames `--ebf0..3` (JS `ebidThink` steps `.f0-.f3` every 300ms); replaces CSS bubble | sheets/enemy_bid_fx_20261008_src.png, prompt D |
| ui/enemy_puff_strip.png | Smoke/ember puff, 5-frame strip | 580x116 (shown 150x150) | `.epuff` `--epuffs`, `steps(5, jump-none)`; replaces CSS radial puff | same sheet |
| ui/enemy_bid_die_upright.png (+ _tilted.png, unused) | Scorched cream bid die, blank face | 193x196 (embedded at 100x100) | `.ebdie .die` `--ebdie`, pips drawn over it in code | same sheet |
| portraits/chaser_{idle,idle2,glideA,glideB,loom,lunge,satisfied,greedy}.webp | Gambler's Ruin (the chaser): hooded black shroud, pose frames. Cut from the v3 sheet with the pose labels removed; each trimmed to its own box (bottom edge is the shared baseline) | 174-237 x 112-195 | unused for now; will replace the `HPAWN` frames (same names) when the chase is rebuilt | sheets/chaser_pawn_v3_20261008_src.png; prompt notes in prompts.md "chaser" |
| (in HTML only) `HPAWN` frames idle/idle2/glideA/glideB/lunge/loom/greedy/satisfied | the chaser frames `portraits/chaser_*.webp` padded to 240x200 (bottom-centre) and embedded | 240x200 | `HPAWN.*`, token `.housetok .himg` (9% of map width) | replaces the old House pawn frames; chaser sheets 20261008 |
| ui/gameover_dice_scatter.webp | bloody dice strewn across the floor (Gambler's Ruin game-over picture), magenta-keyed | see file | `RUIN_ART` shown on the 'ruin' end screen (`.ruinart`) | `sheets/gameover_dice_scatter_20261008_src.png`; prompt in prompts.md "game over art v2" |
| maps/map_parch_tall_1.webp, _2, _3 | tall parchment for floors 1 (Cellar), 2 (Catacombs), 3 (Gilded Pit), burnt edges, nothing drawn on it | 637x1024 | `PARCHT[1..3]`, map `.map.tall` background via `--mapbg` | `sheets/map_parchment_tall_f1_cellar_20261008_src.png`, `_f2_catacombs_`, `_f3_gilded_`; replaces the repeated 1024x572 `PARCH` on the tall map (PARCH still used for floor 4) |
| maps/map_parch_4.webp | floor 4 (The House) parchment: near-black, scorched, dark red tint, nothing drawn on it | 1024x572 | `PARCH[4]` (floor 4 map background) | `sheets/map_parchment_f4_house_20261008_src.png`; outer white corners filled dark; replaces the old one, kept as `_old/map_parch_4_old.webp` |
| (code-drawn) apple icon + eat animation | Apple card art (12x12 pixel placeholder) and the three-bite eat animation | n/a | `ITEM_ART.apple`, `appleFx()`, `.applefx` | code-drawn, replace with Gemini art if supplied (prompt in prompts.md "Apple card") |
| (code-drawn) straight / yahtzee fx | `rollBonusFx`: dice jump with a pale-blue glow, logo-font word with +10 gold behind it, 10 coins fly to the pouch | n/a | `.bonusfx`, `.die.bonusjump` | code-drawn |

Note: the apple is no longer a deck card. It is a loose satchel item (`ITEM_ART.apple`, found the first time the satchel is opened each run, `S.appleFound`), dragged onto the portrait to eat (`useApple(lid)`, `appleFx`). Code-drawn, replace with Gemini art if supplied.

## Added 2026-10-08 (apple + enemy dice, Gemini sheets `sheets/apple_set_20261008_src.png`, `sheets/edie_set_20261008_src.png`)
| file | what it is | size | used in game as | source |
|---|---|---|---|---|
| ui/apple_icon.png/.webp | whole red apple | 101x112 | `ITEM_ART.apple` (satchel icon) | apple sheet r1c1 |
| ui/apple_eat_1..4 | eating frames: whole, bitten, half, core | ~100x112 | `APPLE_EAT` (`appleFx`) | apple sheet r2 |
| ui/apple_bruised, apple_bitten, apple_hover | variants | ~100x112 | unused | apple sheet r1 |
| ui/edie_back, edie_back_hover, edie_target, edie_baby | hidden skull enemy die, hover, spell target ring, baby | ~96px | CSS `html body .edie .die.hiddie` (+ `:hover`, `.spelltgt`, `.ebaby`) | edie sheet r1 |
| ui/edie_1..6, edie_wild, edie_bleached | revealed enemy dice | ~88x96 | CSS `html body .edie .die[data-face=N]`, `.wild`, `.bleached` (edie_1 pip shrunk 72%; original `edie_1_bigpip_old.png`) | edie sheet r2-3 |
| ui/edie_break_1..3 | enemy die break frames | ~90px | unused (frame 4 was too faint, dropped) | edie sheet r4 |

Round result window removed: after a call the round auto-advances 2.6 s later (`resolveCallNow`), the next round waits for the Roll button.

| maps/PARCH{,T}_N_plain.webp | plain parchment (interior flattened, torn edge kept) | 1024x572 / 637x1024 | `PARCH[n]`, `PARCHT[n]` (map background, all floors); originals in `_old/` | made in code from the Gemini parchments |
| ui/panel_wood_iron.png | wood-and-iron panel | 583x446 | char-select window (`html body .panel.tavern` border-image, appended CSS) | panels sheet |
| ui/btn_wood_idle.png | wood-and-iron button, resting (recoloured from the marble button art) | 181x59 | char-select class rows / `?` button (appended CSS `--bw-*` vars, embedded webp); Log button | code-recoloured from the marble button set, no new Gemini sheet |
| ui/btn_wood_hover.png | same button, hover state | 181x59 | as above | as above |
| ui/btn_wood_pressed.png | same button, pressed state | 182x59 | as above | as above |
| (code-drawn) feels-bad buttons, Feedback button, pause screen | `#fbcl .fbb` (red/orange/blue), `#fbbtn` (pink), `#pausev` (gray wash + green play) | n/a | CSS in the appended block before `</style>` | code-drawn, replace with Gemini art if supplied |
| (REPLACED 2026-10-08, see rows below; code-drawn) Looking Glass card art | 12x12 pixel-sprite magnifying glass, placeholder | n/a | `glass` sprite in the pixel-art table (before `mead:`); card id `glass` | code-drawn, replace with Gemini card art (like potion/knife) |
| (REPLACED 2026-10-08, see rows below; code-drawn) +1 max HP icon | die with a green plus, inline SVG | 24x24 viewBox | `MAXIC_SVG` / `maxIc()` (Fortify text, level-up window, "+max" text) | code-drawn, replace with Gemini art if supplied (old pixel `cup` sprite is no longer used here) |
| (REPLACED 2026-10-08, see rows below; code-drawn) Log button | iron-rimmed dark-wood plaque with 4 rivets and gold text (replaces the old brown wood button) | n/a | `html body .topbtns .btn` in the appended CSS block before `</style>` | code-drawn, replace with Gemini art if supplied |
| ui/enc_{plaque,parch,tray,footer,frame_brown,frame_red,frame_green,frame_violet,ring}.png (re-saved 2026-10-08) | same encounter / level-up window pieces with the magenta key fringe removed (dark edge pixels turned neutral; this was the faint purple edge on banners) | unchanged | `ENCART.*` (embedded PNGs replaced) | originals kept in `_old/enc_*_fringe.png` |
| sheets/looking_glass_20261008_src.jpg | Gemini sheet: four hand-mirror variants (round, oval, skull handle, gold glint) | 1024x1024 | source for `cards/card2_glass.*` (variant 1, round) | prompt A, 2026-10-08 |
| cards/card2_glass.png / .webp | Looking Glass card art: round cracked hand mirror with a watching eye, cut from variant 1 | 160x160 | `CARD2.glass` -> `NEWART.glass` -> `ITEM_ART.glass` (card `glass`; replaces the code-drawn pixel `glass` sprite, which is still in the sprite table as a fallback) | looking_glass_20261008_src.jpg |
| sheets/maxhp_icons_20261008_src.jpg | Gemini sheet: four "+1 max HP" icon variants | 1408x768 | source for `ui/ui_maxhp_icon.*` (variant 1, die with green plus) | prompt B, 2026-10-08 |
| ui/ui_maxhp_icon.png / .webp | +1 max HP icon: cream die with a green plus | 96x96 | `MAXIC_SVG` (an `<img>`) via `maxIc()`: Fortify text, level-up window, "+max" text; replaces the code-drawn SVG | maxhp_icons_20261008_src.jpg |
| sheets/log_button_20261008_src.jpg | Gemini sheet: four button plates (idle, hover, pressed, disabled), blank, iron rim with rivets over dark wood, gold trim | 1408x768 | source for `ui/btn_log_*` | prompt C, 2026-10-08 |
| ui/btn_log_{idle,hover,pressed,disabled}.png / .webp | Log button plates, used as a 9-slice (slice 28, border 11px) | ~137x131 | `html body .topbtns .btn` (`--lgb` variable; hover/active/disabled swap it) in the appended CSS; replaces the code-drawn plaque | log_button_20261008_src.jpg |
| sheets/deadend_icons_20261008_src.jpg | Gemini sheet: slot machine + treasure chest, hand-inked on cream sticker outline | 1408x768 | source for `tokens/mapink_slots/chest.*` | prompt D, 2026-10-08 |
| tokens/mapink_slots.png / .webp, mapink_chest.png / .webp | dead-end room map icons (slot machine, treasure chest) | 124x124, 124x119 | `MAPINK.slots`, `MAPINK.chest`, picked in `mapHTML()` for nodes with `n.spur` that are not done; the gold star is still drawn by CSS | deadend_icons_20261008_src.jpg |
| (code-drawn) playtester cog | purple round button with a white gear (SVG polygon built in JS) | 56x56 | `#ptk` | code-drawn, replace with Gemini art if supplied |
| (code-drawn) buck labels | "BUCK" (gold glow, left) and "NO BUCK" (right) set in the title font under the spinner board | n/a | `.fxlab/.fxlabl/.fxlabr` in `firstSpin()` | code-drawn, replace with Gemini art if supplied (prompts.md "THE BUCK spinner") |
| (code-drawn) buck celebration | gold confetti + coins burst, gold-tinted banner/token (CSS filter on the old blue banner), fanfare sfx `buckWin` | n/a | `buckParty()`, `.fxconf`, `#firstfx.buck` | code-drawn, replace with Gemini art if supplied |
| _old/sternidae_tern.png | (replaced 2026-10-09 by the buck token) pixel-art tern head, the old turn marker | 38x32 | unused (was STERN / `#stern`) | drawn in code |
| ui/buck_token.png | The buck: round gold token with a helmet and sword (the player token recoloured to gold) — the turn marker that sits on the side of whoever bids next | 120x120 | `BUCK_IMG` (JS const) -> `#buckmark .bimg` turn marker, the buck celebration token `.fxtok` in firstSpin, and the Rules key row | made in code from ui/first_tok_player.png (HSV recolour); replace with Gemini art if supplied (prompts.md 'the buck token') |
| (code-drawn) Sternidae medallion | small gold-rimmed badge (blue glow = your turn, red = enemy) the tern sits in; flies between the two portraits on a turn change | n/a | `#stern .sring/.sglow` | code-drawn, replace with Gemini art if supplied |
| (code-drawn) under-the-gun tile | gold rounded tile with a pixel revolver; the turn marker that sits on the TOP of whoever's portrait must act first (replaced the gold knight "buck" token as the marker, 2026-10-09). Code-drawn, replace with Gemini art if supplied | 20x20 viewBox SVG | `BUCK_IMG` (inline SVG data URI); `#buckmark` | drawn in code |
| ui/buck_token.png | gold knight coin, now only the player's face on the toss coin | 120x120 | `BUCK_COIN` | player token recoloured to gold |
