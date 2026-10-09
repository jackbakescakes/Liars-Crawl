const A=require('./arena.js');
const N=+process.argv[2]||300;
function row(name,res){ console.log(name.padEnd(44), 'p wins', String(res.pWin).padStart(5)+'% ±'+res.se, ' rounds', res.rounds, ' ms/fight', JSON.stringify(res.msPerFight), ' bluff%', JSON.stringify(res.bluffRate)); }
// 1. new (max) as the player vs old (max) as the enemy, and the reverse
row('new1.0 (p) vs old0.99 (e) 6v6', A.series({p:A.newAI(1),e:A.oldAI(0.99)},{p:6,e:6},N));
row('old0.99 (p) vs new1.0 (e) 6v6', A.series({p:A.oldAI(0.99),e:A.newAI(1)},{p:6,e:6},N));
row('new1.0 (p) vs old0.99 (e) 3v3', A.series({p:A.newAI(1),e:A.oldAI(0.99)},{p:3,e:3},N));
row('new1.0 (p) vs new1.0 (e) 6v6', A.series({p:A.newAI(1),e:A.newAI(1)},{p:6,e:6},N));
// 2. the honest human vs each, floor-1 goblin shape (6 dice vs 3)
row('honest (p) vs old0.52 goblin 6v3', A.series({p:A.honest(),e:A.oldAI(0.52)},{p:6,e:3},N));
row('honest (p) vs new0.52 goblin 6v3', A.series({p:A.honest(),e:A.newAI(0.52)},{p:6,e:3},N));
row('honest (p) vs old0.99 6v3', A.series({p:A.honest(),e:A.oldAI(0.99)},{p:6,e:3},N));
row('honest (p) vs new1.0 6v3', A.series({p:A.honest(),e:A.newAI(1)},{p:6,e:3},N));
row('honest (p) vs new1.0 6v6', A.series({p:A.honest(),e:A.newAI(1)},{p:6,e:6},N));
row('honest (p) vs old0.99 6v6', A.series({p:A.honest(),e:A.oldAI(0.99)},{p:6,e:6},N));
