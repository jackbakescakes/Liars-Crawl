// fight table: for each (enemy, player dice) run N fights of a player policy vs the live AI; record win%, mean dice lost on wins, rounds.
// usage: node ftable.js <policy> <N> <out.json> <enemyId,...>
const path = require('path');
const AIDIR = path.join(__dirname, '..');
const A = require(AIDIR + '/arena.js'); const fs = require('fs');
A.useW(JSON.parse(fs.readFileSync(AIDIR + '/W.json', 'utf8')));
const ROSTER = JSON.parse(fs.readFileSync(path.join(__dirname, 'roster.json'), 'utf8'));
const polName = process.argv[2], N = +process.argv[3], out = process.argv[4], ids = process.argv[5].split(',');
const PDICE = (process.env.PDICE || '5,6,7,8,10,12,14').split(',').map(Number), EPLUS = +(process.env.EPLUS || 0), SHIELD = +(process.env.SHIELD || 0);
function pol() {
  if (polName === 'honest') return A.honest();
  if (polName === 'oneunder') return A.honest({ under: 1 });
  if (polName === 'caller') return A.honest({ liar: 0.45, exact: 0.35 });
  if (polName === 'bluffer') return A.bluffer();
  throw new Error('policy?');
}
const res = {};
for (const id of ids) {
  const e = ROSTER[id]; res[id] = {};
  for (const pd of PDICE) {
    let w = 0, lostW = 0, lostAll = 0, rounds = 0, en = 0;
    for (let i = 0; i < N; i++) {
      const dice = e.diceMin && e.diceMax ? e.diceMin + Math.floor(Math.random() * (e.diceMax - e.diceMin + 1)) : e.dice;
      const f = A.fight({ p: pol(), e: A.newAI(e.skill) }, { p: pd, e: dice }, { p: 2, e: 2 }, { eplus: EPLUS, shield: SHIELD });
      rounds += f.rounds; if (f.win === 'p') { w++; lostW += pd - f.pn; } lostAll += pd - f.pn; en += dice - f.en;
    }
    res[id][pd] = { win: w / N, lostWin: w ? lostW / w : null, lostAll: lostAll / N, rounds: rounds / N, foeDiceKO: en / N };
    process.stderr.write(id + ' ' + pd + ' ' + JSON.stringify(res[id][pd]) + '\n');
  }
}
fs.writeFileSync(out, JSON.stringify(res));
