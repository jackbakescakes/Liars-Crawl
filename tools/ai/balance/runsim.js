// Run-economy simulation for Liar's Crawl. Uses the fight tables (ft_*.json) from the live AI, and the game's own
// map generator rules, XP curve, gold ranges, prices and event odds (copied from index.html on 2026-10-09).
// usage: node runsim.js <runs> [key=value overrides...]
const fs = require('fs'), path = require('path');
const ROSTER = JSON.parse(fs.readFileSync(path.join(__dirname, 'roster.json')));
const OV = {}; process.argv.slice(3).forEach(a => { const [k, v] = a.split('='); OV[k] = /^\[/.test(v) ? JSON.parse(v) : isNaN(+v) ? v : +v; });
const FT = {}; fs.readdirSync(__dirname).filter(f => /^ft_.*\.json$/.test(f)).forEach(f => Object.assign(FT, JSON.parse(fs.readFileSync(path.join(__dirname, f)))));
if (OV.tables) fs.readdirSync(path.join(__dirname, OV.tables)).filter(f => /^ft_.*\.json$/.test(f)).forEach(f => Object.assign(FT, JSON.parse(fs.readFileSync(path.join(__dirname, OV.tables, f)))));
const O = Object.assign({
  xpPerDie: 40, bossXp: 100, levels: [100, 250, 450, 700, 1000, 1350, 1750, 2200, 2700, 3250, 3850, 4500, 5200, 5950, 6750, 7600, 8500, 9450, 10450, 11500, 12600, 13750, 14950, 16200, 17500, 18850, 20250, 21700, 23200],
  goldMul: [1, 1.5, 1.8, 2.2], priceMul: [1, 1.25, 1.4, 1.6], goldBoost: 1.05, goldScale: 1,
  dropBase: 1, restHeal: [2, 3, 4, 4], healPrice: 20, cupPrice: 80, maxDice: 16, bankRate: 1.5, eliteXp: 1.5,
  startDice: 6, dieEvery: 3, eventRate: 0.3, elites: 0, // elites: chance the player takes a reachable elite detour
  buyHeal: 1, buyCup: 1, camps: 1, floors: 4, winHeal: 1, carver: 1, carverStep: 0.25, cupShelf: [0.02, 0.037, 0.056, 0.056], f1ShopRow: 6, dieWares: [[0.5, 80], [0.28, 110], [0.15, 140], [0.07, 175]], bank: 1, easy: 1, lootgobScale: 1, tables: '.',
}, OV);
const FLOORS = [
  { pools: [['cutpurse', 'eavesdrop', 'weathercock'], ['cutpurse', 'eavesdrop', 'weathercock', 'blackjack', 'fence', 'sanguine', 'lootgob'], ['blackjack', 'fence', 'sanguine', 'lootgob', 'cutpurse', 'eavesdrop', 'weathercock']], elites: ['ogre', 'brute'], boss: 'dealer', hi: 8, lo: 5 },
  { pools: [['remnants', 'robber', 'zealot'], ['remnants', 'robber', 'zealot', 'bonedealer', 'vampire', 'wraith', 'lootgob'], ['bonedealer', 'vampire', 'wraith', 'zealot', 'remnants', 'robber', 'lootgob']], elites: ['graveknight', 'fleshgolem'], boss: 'croupier', hi: 9, lo: 6 },
  { pools: [['hellion', 'pitdicer', 'hellhound'], ['hellion', 'pitdicer', 'hellhound', 'hulk', 'cardsharp', 'succubus', 'lootgob'], ['hulk', 'cardsharp', 'succubus', 'hellion', 'pitdicer', 'hellhound', 'lootgob']], elites: ['bloodletter', 'contractdemon'], boss: 'pitboss', hi: 10, lo: 7 },
  { pools: [['imp', 'lootgob']], elites: [], boss: 'house', hi: 10, lo: 7 },
];
const EVENT_TYPES = ['gambler', 'altar', 'goblin', 'chest', 'idol', 'smith', 'fountain', 'pawn', 'peddler', 'tattooist', 'anvil', 'scratch', 'blackjack', 'scale', 'hush', 'bank', 'paint', 'forge', 'cardsharp'];
const EVENT_GOLD = { cardsharp: 1, gambler: 1, chest: 1, smith: 1, slots: 1, blackjack: 1, scale: 1, bank: 1 };
const rnd = n => Math.floor(Math.random() * n), pick = a => a[rnd(a.length)];
function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = rnd(i + 1); [a[i], a[j]] = [a[j], a[i]]; } return a; }
function roll2(hi, lo) { const s = 2 + rnd(6) + rnd(6); return s >= hi ? 'win' : s <= lo ? 'lose' : 'mid'; }
function roll2low(hi, lo) { const s = 2 + rnd(6) + rnd(6); return s <= lo ? 'win' : s >= hi ? 'lose' : 'mid'; }
function binom(n, p) { let k = 0; for (let i = 0; i < n; i++) if (Math.random() < p) k++; return k; }
// nearest fight-table row for the player's dice count
const PD = [5, 6, 7, 8, 10, 12];
function ft(id, pd) { const t = FT[id]; if (!t) throw new Error('no table for ' + id); let best = PD[0]; for (const d of PD) if (Math.abs(d - pd) < Math.abs(best - pd)) best = d; return t[best]; }

function makeFloor(fnum) {
  const cfg = FLOORS[fnum - 1], RW = 8, rows = [], thin = shuffle([2, 3, 4, 5, 6, 7, 8]).slice(0, 2);
  let deck = shuffle(EVENT_TYPES);
  const takeEv = (noGold, noHeal) => { if (!deck.length) deck = shuffle(EVENT_TYPES); let k = deck.findIndex(t => (!noGold || !EVENT_GOLD[t]) && !(noHeal && t === 'fountain')); if (k < 0) return pick(EVENT_TYPES.filter(t => !EVENT_GOLD[t])); return deck.splice(k, 1)[0]; };
  for (let r = 1; r <= RW; r++) { const cols = thin.includes(r) ? pick([[0, 1], [1, 2], [0, 2]]) : [0, 1, 2]; rows[r] = cols.map(c => ({ row: r, col: c, type: 'fight', star: false, fix: null })); }
  let prev = 1; const spine = [];
  for (let r = 1; r <= RW; r++) { const okc = rows[r].filter(n => Math.abs(n.col - prev) <= 1); const n = pick(okc.length ? okc : rows[r]); prev = n.col; spine[r] = n; }
  shuffle([2, 3, 4, 5, 6]).slice(0, 3).forEach(rr => { const cand = rows[rr].filter(n => n !== spine[rr]); const s = pick(cand); s.star = true; s.fix = 'star'; s.type = cfg.elites.length ? 'elite' : 'fight'; s.enemy = cfg.elites.length ? pick(cfg.elites) : null; });
  const lane = [].concat(...rows.slice(1)); const free = (a, b) => lane.filter(n => !n.star && !n.fix && n.row >= a && n.row <= b);
  let cp = pick(free(5, 8)); if (cp) { cp.type = 'camp'; cp.fix = 'camp'; }
  if (Math.random() < 0.6) { cp = pick(free(2, 5)); if (cp) { cp.type = 'camp'; cp.fix = 'camp'; } }
  shuffle(fnum === 1 ? free(O.f1ShopRow, O.f1ShopRow) : free(2, 6)).slice(0, fnum >= 3 ? 2 : 1).forEach(n => { n.type = 'shop'; n.fix = 'shop'; });
  const bags = {}; const foe = d => { const pl = cfg.pools[Math.min(cfg.pools.length - 1, d <= 3 ? 0 : d <= 6 ? 1 : 2)], k = pl.join(); if (!bags[k] || !bags[k].length) bags[k] = shuffle(pl); return bags[k].pop(); };
  lane.forEach(n => { if (n.fix) return; if (n.row >= 2 && Math.random() < O.eventRate) { n.type = 'event'; n.ev = takeEv(fnum === 1 && n.row < 5, fnum === 1 && n.row <= 3); } else { n.type = 'fight'; n.enemy = foe(n.row); } });
  lane.forEach(n => { if (n.star && !n.enemy) n.enemy = foe(Math.min(9, n.row + 2)); });
  return { rows, spine, cfg };
}

function newRun() { return { dice: O.startDice, hp: O.startDice, gold: 0, xp: 0, level: 1, bank: 0, seals: 0, relics: 0, cards: 2, log: [], dead: null, hurt: 0, wind: 0, hardy: 0, plunder: 0, study: 0, grave: 0, abil: [] }; }
function gold(p, n, f) { return Math.round(n * O.goldBoost * O.goldScale); }
function addXp(p, n) {
  p.xp += n;
  while (p.level <= O.levels.length && p.xp >= O.levels[p.level - 1]) {
    p.level++; p.abil.push(1);
    if (p.level % O.dieEvery === 0 && p.dice < O.maxDice) { p.dice++; p.hp++; }
    // the level-up ability pick: approximate the useful ones (wind heals after fights, hardy +die 42%, study +15% xp) by a random draw from the pool of 8
    const k = pick(['peek', 'reroll', 'crit', 'wind', 'plunder', 'hardy', 'grave', 'study']);
    if (k === 'wind' && p.wind < 2) p.wind++; else if (k === 'hardy' && p.hardy < 2) { p.hardy++; if (Math.random() < 15 / 36 && p.dice < O.maxDice) { p.dice++; p.hp++; } } else if (k === 'plunder' && p.plunder < 3) p.plunder++; else if (k === 'study' && p.study < 3) p.study++; else if (k === 'grave' && p.grave < 3) p.grave++;
  }
}
function fight(p, id, fnum, stats) {
  const e = ROSTER[id], t = ft(id, p.hp);
  // dice lost on a win: binomial around the table mean (clipped to hp-1)
  const won = Math.random() < 1 - (1 - t.win) * O.easy;
  stats.fights++;
  if (!won) { p.dead = id; return false; }
  const meanLost = Math.min(p.hp - 1, t.lostWin || 0), lost = binom(p.hp - 1, meanLost / Math.max(1, p.hp - 1));
  p.hp -= lost; if (lost) p.hurt++;
  const diceN = e.diceMin ? e.dice : e.dice, mul = e.xpMul || 1;
  let xp = diceN * Math.round(O.xpPerDie * mul * (e.kind === 'elite' ? O.eliteXp : 1)); xp = Math.round(xp * (1 + 0.15 * p.study + (lost === 0 ? 0.1 : 0))); if (e.kind === 'boss') xp += Math.round(O.bossXp * mul);
  addXp(p, xp); stats.floor[fnum].xp += xp; const g0 = p.gold;
  if (id === 'lootgob' && Math.random() < 0.15) { /* bolted: no sack */ } else p.gold += id === 'lootgob' ? 60 : gold(p, e.gold[0] + rnd(e.gold[1] - e.gold[0] + 1));
  if (O.lootgobScale && id === 'lootgob') p.gold += Math.round(60 * (O.goldMul[fnum - 1] - 1)); p.gold += 2 * p.plunder * diceN; stats.floor[fnum].gold += p.gold - g0;
  p.hp = Math.min(p.dice, p.hp + (Array.isArray(O.winHeal) ? (O.winHeal[fnum - 1] || 0) : O.winHeal));
  if (p.wind) p.hp = Math.min(p.dice, p.hp + p.wind);
  if (Math.random() < O.dropBase + 0.1 * p.grave) p.seals++;
  if (e.kind !== 'fight') { // chest: 3 options; take maxdie if offered (~weight), else gold, else heal
    const big = true, gm = O.goldMul[fnum - 1], base = 35 * gm * 1.3; const r = Math.random();
    if (r < 0.25 && p.dice < O.maxDice) { p.dice++; p.hp++; } else if (r < 0.6) p.gold += Math.round(base * 1.4); else if (r < 0.8) p.hp = Math.min(p.dice, p.hp + 3); else p.seals++;
  }
  return true;
}
function event(p, ev, fnum, stats) {
  const F = FLOORS[fnum - 1], gm = O.goldMul[fnum - 1];
  stats.ev[ev] = (stats.ev[ev] || 0) + 1;
  switch (ev) {
    case 'gambler': { const r = roll2(F.hi, F.lo); if (r === 'win') p.gold += Math.round(25 * gm * 1.05); else if (r === 'lose') { const L = Math.round(15 * gm); if (p.gold >= L) p.gold -= L; else if (p.gold > 0) p.gold = 0; else if (p.hp > 1) p.hp--; } break; }
    case 'altar': { const r = roll2(F.hi, F.lo); if (r === 'win') p.hp = Math.min(p.dice, p.hp + 3); else if (r === 'lose' && p.hp > 1) p.hp--; break; }
    case 'chest': { const r = roll2(F.hi, F.lo); if (r === 'win') p.seals++; else if (r === 'lose') { const L = Math.round(20 * gm); if (p.gold >= L) p.gold -= L; else if (p.hp > 1) p.hp--; } break; }
    case 'scale': { const r = roll2low(F.hi, F.lo); if (r === 'win') p.seals++; else if (r === 'lose') { const L = Math.round(25 * gm); if (p.gold >= L) p.gold -= L; else if (p.hp > 1) p.hp--; } break; }
    case 'hush': { const r = roll2low(F.hi, F.lo); if (r === 'win') p.seals++; else if (r === 'lose' && p.hp > 1) p.hp--; break; }
    case 'idol': { const r = roll2(F.hi, F.lo); if (r === 'win') { p.gold += Math.round(20 * gm * 1.05); p.hp = Math.min(p.dice, p.hp + 1); } else if (r === 'lose' && p.hp > 1) p.hp--; break; }
    case 'scratch': { const r = Math.random(); if (r < 0.1) { if (p.hp > 1) p.hp--; } else if (r < 0.4) { } else if (r < 0.8) p.gold += Math.round(25 * gm); else p.gold += Math.round(60 * gm); break; }
    case 'bank': { if (O.bank && fnum < 4) { p.bank += p.gold; p.gold = 0; } break; }
    case 'fountain': { p.hp = Math.min(p.dice, p.hp + 2); break; } // modelled as a drink that heals 2
    case 'smith': case 'cardsharp': { // buy one thing at 1.7x / 1.4x if affordable (seal ~45-85 base)
      const price = Math.round((ev === 'smith' ? 50 * 1.7 : 30 * 1.4) * O.priceMul[fnum - 1]); if (p.gold >= price) { p.gold -= price; if (ev === 'smith') p.seals++; else p.cards++; stats.spent += price; } break; }
    case 'anvil': { if (p.hp > 2) { p.hp--; p.seals++; } break; }
    case 'blackjack': { if (p.gold >= 20) { const bet = Math.min(p.gold, 20); if (Math.random() < 0.42) p.gold += bet; else if (Math.random() < 0.15) { } else p.gold -= bet; } break; }
    case 'pawn': { if (p.hp > 2) { p.dice--; p.hp--; p.owed = 2; } break; }
    case 'peddler': { if (p.hp > 2) { p.dice--; p.hp--; p.cards += 2; } break; }
    case 'goblin': case 'tattooist': case 'paint': case 'forge': default: break;
  }
}
function shop(p, fnum, stats) {
  const pm = O.priceMul[fnum - 1]; stats.shops++; stats.goldAtShop.push(p.gold);
  const heal = Math.round(O.healPrice * pm / 5) * 5, cup = Math.round(O.cupPrice * pm / 5) * 5;
  let bought = 0;
  if (O.buyCup && Math.random() < O.cupShelf[fnum - 1]) if (p.gold >= cup && p.dice < O.maxDice) { p.gold -= cup; p.dice++; p.hp++; stats.cups++; stats.spent += cup; bought++; }
  if (O.buyHeal) while (p.gold >= heal && p.hp <= p.dice - 2) { p.gold -= heal; p.hp = Math.min(p.dice, p.hp + 2); stats.heals++; stats.spent += heal; bought++; }
  if (!bought) stats.shopNothing++;
}
function runFloor(p, fnum, stats) {
  const F = makeFloor(fnum), S = stats.floor[fnum];
  S.entered++;
  // floor 1: dummy. floors 2+: a normal fight at the dummy room.
  if (fnum === 1) { p.xp += 1; p.gold += 1; } else if (fnum === 4) { } else { if (!fight(p, F.cfg.pools[0][rnd(3)], fnum, stats)) return false; }
  let col = 1;
  for (let r = 1; r <= (fnum === 4 ? 0 : 8); r++) {
    // rooms reachable this step: next-row rooms within one column (forward roads). Elites only by a sideways hop (optional).
    let cands = F.rows[r].filter(n => !n.star && Math.abs(n.col - col) <= 1); if (!cands.length) cands = F.rows[r].filter(n => !n.star);
    let n;
    const want = p.hp <= p.dice - 2 ? 'camp' : null;
    if (want && O.camps && cands.some(x => x.type === 'camp')) n = cands.find(x => x.type === 'camp');
    else if (p.gold >= Math.round(O.cupPrice * O.priceMul[fnum - 1] / 5) * 5 && cands.some(x => x.type === 'shop')) n = cands.find(x => x.type === 'shop');
    else if (p.hp <= p.dice - 2 && O.buyHeal && p.gold >= 20 && cands.some(x => x.type === 'shop')) n = cands.find(x => x.type === 'shop');
    else n = cands.includes(F.spine[r]) ? F.spine[r] : pick(cands);
    col = n.col;
    if (n.type === 'fight') { if (!fight(p, n.enemy, fnum, stats)) { S.deaths[r] = (S.deaths[r] || 0) + 1; S.deathBy[n.enemy] = (S.deathBy[n.enemy] || 0) + 1; return false; } if (p.owed) { p.dice += p.owed; p.hp += p.owed; p.owed = 0; } }
    else if (n.type === 'camp') { p.hp = Math.min(p.dice, p.hp + O.restHeal[fnum - 1]); stats.camps++; }
    else if (n.type === 'shop') shop(p, fnum, stats);
    else if (n.type === 'event') event(p, n.ev, fnum, stats);
    // optional elite detour from this row
    if (O.elites && F.rows[r].some(x => x.star) && Math.random() < O.elites && p.hp >= p.dice - 1) { const el = F.rows[r].find(x => x.star); if (!fight(p, el.enemy, fnum, stats)) { S.deaths['elite'] = (S.deaths['elite'] || 0) + 1; S.deathBy[el.enemy] = (S.deathBy[el.enemy] || 0) + 1; return false; } }
  }
  if (O.carver && fnum <= 3) { const pm = O.priceMul[fnum - 1], offers = [0, 1, 2].map(() => { let r = Math.random(), k = 0; while (k < O.dieWares.length - 1 && r >= O.dieWares[k][0]) { r -= O.dieWares[k][0]; k++; } return O.dieWares[k][1]; }).sort((a, b) => a - b);
    for (const b of offers) { const c = Math.round(b * (1 + O.carverStep * (p.carverN || 0)) * pm / 5) * 5; if (p.gold >= c && p.dice < O.maxDice) { p.gold -= c; p.dice++; p.hp++; p.carverN = (p.carverN || 0) + 1; stats.carver = (stats.carver || 0) + 1; } } }
  S.atBoss++; S.bossLevel.push(p.level); S.bossDice.push(p.dice); S.bossHp.push(p.hp); S.bossGold.push(p.gold);
  if (!fight(p, F.cfg.boss, fnum, stats)) { S.deaths['boss'] = (S.deaths['boss'] || 0) + 1; S.deathBy[F.cfg.boss] = (S.deathBy[F.cfg.boss] || 0) + 1; return false; }
  S.cleared++; p.hp = p.dice; // a boss win heals fully
  shop(p, fnum, stats); // the floor shop after the boss
  p.gold += Math.round(p.bank * O.bankRate); p.bank = 0; p.hp = Math.min(p.dice, p.hp + O.restHeal[Math.min(3, fnum)]);
  S.endGold.push(p.gold); S.endLevel.push(p.level); S.endDice.push(p.dice); S.endSeals.push(p.seals);
  return true;
}
const mean = a => a.length ? +(a.reduce((x, y) => x + y, 0) / a.length).toFixed(1) : null;
const N = +process.argv[2] || 1000;
const stats = { fights: 0, shops: 0, camps: 0, heals: 0, cups: 0, spent: 0, shopNothing: 0, goldAtShop: [], ev: {}, floor: {} };
for (let f = 1; f <= 4; f++) stats.floor[f] = { xp: 0, gold: 0, entered: 0, atBoss: 0, cleared: 0, deaths: {}, deathBy: {}, bossLevel: [], bossDice: [], bossHp: [], bossGold: [], endGold: [], endLevel: [], endDice: [], endSeals: [] };
for (let i = 0; i < N; i++) { const p = newRun(); for (let f = 1; f <= O.floors; f++) if (!runFloor(p, f, stats)) break; }
console.log('overrides', JSON.stringify(OV));
for (let f = 1; f <= O.floors; f++) {
  const S = stats.floor[f]; if (!S.entered) continue;
  console.log(`floor ${f}: entered ${S.entered}  reached boss ${(100 * S.atBoss / S.entered).toFixed(0)}%  cleared ${(100 * S.cleared / S.entered).toFixed(0)}% (boss win ${S.atBoss ? (100 * S.cleared / S.atBoss).toFixed(0) : '-'}%)`);
  console.log(`   at boss: level ${mean(S.bossLevel)}  max dice ${mean(S.bossDice)}  hp ${mean(S.bossHp)}  gold ${mean(S.bossGold)} | end of floor: gold ${mean(S.endGold)} level ${mean(S.endLevel)} dice ${mean(S.endDice)} seals ${mean(S.endSeals)}`);
  console.log(`   per run that entered: fight xp ${(S.xp / S.entered).toFixed(0)}, fight gold ${(S.gold / S.entered).toFixed(0)}`);
  console.log(`   deaths by room: ${JSON.stringify(S.deaths)}  by foe: ${JSON.stringify(S.deathBy)}`);
}
console.log('carver dice bought', stats.carver || 0, (((stats.carver || 0) / N)).toFixed(2) + '/run');
console.log(`shops visited ${stats.shops} (${(stats.shops / N).toFixed(2)}/run), gold at shop mean ${mean(stats.goldAtShop)}, bought nothing at ${(100 * stats.shopNothing / Math.max(1, stats.shops)).toFixed(0)}%, heals ${stats.heals}, cups ${stats.cups}, camps ${stats.camps}, fights/run ${(stats.fights / N).toFixed(1)}`);
console.log('events', JSON.stringify(stats.ev));
