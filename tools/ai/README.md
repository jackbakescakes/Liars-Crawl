# Enemy AI simulator

Node scripts that test the enemy AI (the ENGINE block of the game) outside the browser.

- `python3 tools/ai/extract_engine.py` — pulls the live engine out of `/home/claude/liars-crawl.html` into `engine3.js` (do this after any AI edit).
- `node headtohead.js 300` — the new AI against the previous one (`engine_old.js`) and against a fixed "honest maths" player, at a few dice counts.
- `node curve.js 300 curve|exploit|self|variants|variants2` — the skill curve (honest player vs each skill), exploiter policies, self-play sanity checks, and A/B tests of the opponent-model constants.
- `node wtable.js work <from> <to> <rounds> <winfile|none> <out.json> [small]` then `node wtable.js solve <counts.json...>` — measures the win table `AI_W_DATA` (chance of winning the fight from m dice vs n, by who opens) from self-play rounds, then solves it by dynamic programming. `W.json` is the current table; paste it into `AI_W_DATA` in the game.
- `arena.js` — the fight loop and the policies (new AI at any skill/knobs, old AI, honest, one-under, caller, timid, bluffer, random).

Rules in the arena follow the game: the loser of a call opens the next round, Liar costs the loser 1 die, Spot On costs the bidder 2 (or the player's crit), a wrong Spot On costs the caller 1.
