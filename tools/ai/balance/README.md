# Balance sims (added 2026-10-10)

Two node scripts used for the 2026-10-10 balance pass. They sit on top of the enemy-AI arena in `tools/ai` (run `python3 tools/ai/extract_engine.py` first so the arena uses the live AI).

## 1. Fight tables: `ftable.js`
How often a fixed player policy beats each enemy, by the player's dice count, using the game's own AI.

    node ftable.js <policy> <fights per cell> <out.json> <enemy,enemy,...>
    node ftable.js oneunder 100 ft_floor1.json cutpurse,eavesdrop,ogre,dealer

- Policies: `honest` (opens with its true count, Liar under 30%, Spot On over 45%), `oneunder` (bids one less than it holds: the user's own strategy, roughly an expert), `caller`, `bluffer`.
- Enemies come from `roster.json` (dice, skill, gold, kind, floor). **Keep it in step with the game**: skill is `FLOOR_SKILL` by floor and kind, except `OWN_SKILL` foes; boss dice include the twin (Croupier + Collector).
- Player dice tested: 5, 6, 7, 8, 10, 12, 14. About 1 to 2 minutes per enemy at 100 fights per cell; big dice counts are slower (the AI thinks longer). Two cores: run two processes with half the roster each.
- Not modelled: seals on either side, cards, abilities, peeks, armour, bleeding, the Pit Boss's blackjack. So it is a floor for the player, not a ceiling.

## 2. Run economy: `runsim.js`
Walks the straight route of each floor (rebuilt from `makeFloor`) with fights drawn from the tables: XP, levels, dice every 3 levels, gold, drops, chests, events, camps, shops, the bank, the floor shop.

    node runsim.js 3000                       # uses every ft_*.json in this folder
    node runsim.js 3000 floors=2 cupPrice=100 # override any default in O
    node runsim.js 3000 easy=0.5              # halve every lose chance ("what if the AI were weaker")
    node runsim.js 3000 tables=sub            # also load ft_*.json from ./sub

Prints per floor: share reaching and beating the boss, level / dice / HP / gold at the boss, XP and gold earned, where runs die. Its economy numbers (the `O` defaults and the event table in `event()`) are copied from the game by hand: update them when the game's numbers change.

Results of the 2026-10-10 pass are in the "Liar's Crawl: Balance Pass" doc.
