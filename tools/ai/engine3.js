// ===== ENGINE START =====
  // Dice values: 1-6, and 0 means a wild face that counts as any number.
  function clamp(x, a, b) { a = a === undefined ? 0 : a; b = b === undefined ? 1 : b; return Math.max(a, Math.min(b, x)); }
  function comb(n, r) { if (r < 0 || r > n) return 0; var c = 1; for (var i = 1; i <= r; i++) c = c * (n - r + i) / i; return c; }
  function binomPmf(n, p, k) { if (k < 0 || k > n) return 0; return comb(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k); }
  function binomTail(n, p, k) { if (k <= 0) return 1; if (k > n) return 0; var s = 0; for (var i = k; i <= n; i++) s += binomPmf(n, p, i); return s; }
  function countFace(vals, f) { var c = 0; for (var i = 0; i < vals.length; i++) if (vals[i] === f || vals[i] === 0) c++; return c; }
  function isLegalBid(prev, qty, face, total) {
    if (qty < 1 || qty > total || face < 1 || face > 6) return false;
    if (!prev) return true;
    return qty > prev.qty || (qty === prev.qty && face > prev.face);
  }
  function pickWeighted(items, temp) {
    var m = -Infinity, i;
    for (i = 0; i < items.length; i++) if (items[i].ev > m) m = items[i].ev;
    var tot = 0, w = items.map(function (it) { var x = Math.exp((it.ev - m) / temp); tot += x; return x; });
    var r = Math.random() * tot;
    for (i = 0; i < items.length; i++) { r -= w[i]; if (r <= 0) return items[i]; }
    return items[items.length - 1];
  }

  // ---- the enemy AI ----
  // How it thinks, in one breath: it lists every hand your hidden dice could be (or a big sample when there are too many), weighs each by how
  // likely a sensible player holding it would have made the bids you made this round, then rates each of its own moves by the chance of
  // winning the whole fight: a call is settled against every hand at once; a bid is played forward through how you would answer it (call Liar,
  // call Spot On, or raise, and then what it would do about your raise). Lower skill adds noise, picks worse moves more often and bluffs badly.
  // One set of knobs per fight: aiParams() derives them from a foe's skill, then applies overrides from the foe itself (def.ai), from the training
  // room's global switch (AIG) and from a training fight (C.aiOver). The training room's sliders are built from AI_KNOBS.
  var AI_KNOBS = [
    { k: 'skill', name: 'Skill', min: 0, max: 1, step: 0.01, tip: 'The master dial. At 1 it plays as well as it knows how. Noise, Softness, Bluff, Adapt and Last-die gamble follow it unless moved by hand.' },
    { k: 'noise', name: 'Noise', min: 0, max: 0.4, step: 0.01, auto: true, tip: 'Random error in how it rates each move, in win chance. 0 = it sees its true best move.' },
    { k: 'temp', name: 'Softness', min: 0.005, max: 0.4, step: 0.005, auto: true, tip: 'How often it plays a move it rates a little below its best. Low = nearly always the top move.' },
    { k: 'bluff', name: 'Bluff', min: 0, max: 1, step: 0.01, auto: true, tip: 'Chance, each bid, that it tries a bluff: a bid on a face it does not hold. A skilled foe only goes through with a bluff that costs it little.' },
    { k: 'read', name: 'Read', min: 0, max: 2, step: 0.05, tip: 'How sensible it assumes you are: how much your bids tell it about your hand, and how well it predicts your calls. 0 = it treats your play as random.' },
    { k: 'gull', name: 'Your trust', min: 0, max: 1, step: 0.05, tip: 'How much it thinks you believe its bids. High = it expects you to raise into its bluffs rather than call them.' },
    { k: 'adapt', name: 'Adapt', min: 0, max: 1, step: 0.05, auto: true, tip: 'How much it learns from the rounds so far this run: whether you call a lot or a little, and how honest your bids are.' },
    { k: 'liar', name: 'Liar bias', min: -0.3, max: 0.3, step: 0.01, tip: 'Added to the win chance it gives calling Liar. Above 0 it calls Liar more.' },
    { k: 'exact', name: 'Spot On bias', min: -0.3, max: 0.3, step: 0.01, tip: 'Added to the win chance it gives calling Spot On.' },
    { k: 'lastDie', name: 'Last-die gamble', min: 0, max: 0.3, step: 0.01, auto: true, tip: 'Extra pull toward Spot On when it is down to one die. Fades to nothing at full skill.' },
    { k: 'reach', name: 'Reach', min: 1, max: 5, step: 1, tip: 'How many quantities above the current bid it will consider raising to.' }
  ];
  // the skill curve: how the auto knobs follow Skill (tuned in the sims so the slider runs from hopeless to as good as it gets)
  var AI_TUNE = { noise: 0.16, temp: 0.15, tempMin: 0.003, bluff0: 0.3, bluff1: 0.1, lastDie: 0.12, hands0: 150, hands1: 1500, bluffCost0: 0.25, bluffCost1: 0.02, dieWorth: 0.05 };
  // dieWorth: a little credit per die won or lost on top of the win chance, so it still plays sharply when the fight is all but won or lost and the win chance has gone flat
  function aiParams(skill, over) {
    var has = function (k) { return !!(over && over[k] !== null && over[k] !== undefined && over[k] !== '' && !isNaN(+over[k])); };
    var s = clamp(has('skill') ? +over.skill : (+skill || 0), 0, 1), p = { skill: s };
    p.noise = has('noise') ? +over.noise : AI_TUNE.noise * Math.pow(1 - s, 1.5);
    p.temp = has('temp') ? Math.max(0.005, +over.temp) : AI_TUNE.tempMin + AI_TUNE.temp * Math.pow(1 - s, 2);
    p.bluff = has('bluff') ? +over.bluff : AI_TUNE.bluff0 + (AI_TUNE.bluff1 - AI_TUNE.bluff0) * s;
    p.read = has('read') ? +over.read : 1;
    p.gull = has('gull') ? +over.gull : AI_OPP.gull;
    p.adapt = has('adapt') ? +over.adapt : s;
    p.liar = has('liar') ? +over.liar : 0;
    p.exact = has('exact') ? +over.exact : 0;
    p.lastDie = has('lastDie') ? +over.lastDie : AI_TUNE.lastDie * (1 - s);
    p.reach = has('reach') ? Math.max(1, Math.round(+over.reach)) : 3;
    // derived, not knobs: how many of your possible hands it weighs, and how much win chance it will give up to bluff
    p.hands = Math.round(AI_TUNE.hands0 + (AI_TUNE.hands1 - AI_TUNE.hands0) * s * s);
    p.bluffCost = AI_TUNE.bluffCost1 + (AI_TUNE.bluffCost0 - AI_TUNE.bluffCost1) * (1 - s) * (1 - s);
    return p;
  }
  var AI_LAST = null;   // the enemy's last decision and what it was weighing, kept when a fight is traced (the training room shows it)

  // ---- the win table: AI_W[open][m][n] = chance the enemy wins the fight from the start of a round with m dice against n, where open is 1 when
  // the player opens that round. Measured by self-play of this AI at full skill (sim/wtable.js); beyond the table both counts shrink in proportion. ----
  var AI_WMAX = 12, AI_W = null;
  var AI_W_DATA = [[[0.395,0.124,0.042,0.008,0.003,0.001,0,0,0,0,0,0],[0.959,0.441,0.246,0.03,0.015,0.007,0.003,0.002,0.001,0,0,0],[0.982,0.826,0.458,0.108,0.064,0.022,0.011,0.006,0.004,0.002,0.001,0.001],[0.993,0.979,0.937,0.562,0.154,0.079,0.031,0.017,0.01,0.005,0.003,0.002],[0.999,0.988,0.951,0.867,0.489,0.263,0.126,0.053,0.02,0.012,0.006,0.003],[1,0.995,0.984,0.927,0.778,0.52,0.328,0.164,0.075,0.036,0.018,0.01],[1,0.997,0.987,0.97,0.88,0.722,0.536,0.351,0.215,0.109,0.061,0.031],[1,0.999,0.995,0.985,0.944,0.841,0.7,0.516,0.374,0.216,0.132,0.078],[1,0.999,0.997,0.991,0.973,0.916,0.833,0.68,0.513,0.357,0.216,0.138],[1,1,0.999,0.996,0.987,0.96,0.901,0.795,0.664,0.491,0.366,0.259],[1,1,0.999,0.998,0.993,0.98,0.951,0.866,0.772,0.615,0.51,0.358],[1,1,1,0.999,0.996,0.99,0.973,0.925,0.87,0.754,0.635,0.482]],[[0.58,0.057,0.024,0.011,0.001,0.001,0,0,0,0,0,0],[0.896,0.669,0.117,0.04,0.01,0.006,0.004,0.002,0.001,0.001,0,0],[0.956,0.768,0.539,0.078,0.051,0.024,0.014,0.007,0.004,0.002,0.001,0.001],[0.992,0.976,0.911,0.453,0.159,0.067,0.035,0.019,0.01,0.005,0.003,0.001],[0.998,0.989,0.965,0.888,0.524,0.245,0.105,0.05,0.023,0.011,0.007,0.004],[1,0.996,0.982,0.928,0.782,0.536,0.311,0.138,0.077,0.033,0.017,0.008],[1,0.998,0.989,0.969,0.894,0.719,0.546,0.36,0.213,0.128,0.062,0.03],[1,0.999,0.995,0.981,0.944,0.853,0.687,0.528,0.378,0.231,0.146,0.077],[1,0.999,0.997,0.991,0.971,0.92,0.826,0.648,0.506,0.342,0.245,0.153],[1,1,0.999,0.996,0.986,0.957,0.893,0.802,0.657,0.517,0.35,0.226],[1,1,0.999,0.998,0.993,0.98,0.943,0.867,0.764,0.633,0.493,0.388],[1,1,1,0.999,0.997,0.989,0.973,0.933,0.869,0.756,0.636,0.484]]];   // measured by self-play of this AI at full skill (scratch sim/wtable.js): [player opens][my dice - 1][their dice - 1]
  function aiWinTable() {
    if (AI_W) return AI_W;
    var t = [[], []], o, m, n;
    for (o = 0; o < 2; o++) for (m = 0; m <= AI_WMAX; m++) { t[o][m] = []; for (n = 0; n <= AI_WMAX; n++) t[o][m][n] = m <= 0 ? 0 : n <= 0 ? 1 : (AI_W_DATA ? AI_W_DATA[o][m - 1][n - 1] : m / (m + n)); }
    AI_W = t; return t;
  }
  function aiWin(open, m, n) {
    if (m <= 0) return 0; if (n <= 0) return 1;
    if (m > AI_WMAX || n > AI_WMAX) { var s = AI_WMAX / Math.max(m, n); m = Math.max(1, Math.round(m * s)); n = Math.max(1, Math.round(n * s)); }
    return aiWinTable()[open ? 1 : 0][m][n];
  }

  // ---- what a sensible player does: the model the AI uses both to read your bids (which hands would have made them) and to predict your answers ----
  var AI_OPP = { beta: 4, eps: 0.08, reach: 2, gull: 0.3, callLeaf: 1 };   // callLeaf: when it imagines raising again, the chance it gives you of calling that raise (the rest of the time the round is treated as a wash)
  // their picture of my hidden dice: 1/6 a face, nudged toward faces I have bid on this round (the latest bid nudges most)
  function aiOppView(mu, myFaces, gull) {
    var bump = [0, 0, 0, 0, 0, 0, 0], i, f, tot = 0, pf = [], T = [], E = [], k;
    for (i = 0; i < myFaces.length; i++) bump[myFaces[i]] += (i === myFaces.length - 1 ? 0.55 : 0.3) * gull;
    for (f = 1; f <= 6; f++) tot += bump[f];
    for (f = 1; f <= 6; f++) {
      pf[f] = Math.min(0.5, (1 / 6 + bump[f]) / (1 + tot) + 0.01);
      T[f] = []; E[f] = [];
      for (k = 0; k <= mu + 1; k++) { T[f][k] = binomTail(mu, pf[f], k); E[f][k] = binomPmf(mu, pf[f], k); }
    }
    return { mu: mu, T: T, E: E };
  }
  // the actions open to them facing bid prev (or opening), and the chance of each for every hand. probs[h * A + a]. Their known dice = their
  // counts kc (hand + the dice both sides can see) plus the hand's own counts; nerve shifts how keen they are to call; beta is how sharp they are.
  var AI_PROBS = new Float64Array(1024);
  function aiOppActs(view, prev, total, hands, kc, critP, beta, nerve, reachP) {
    var acts = [], q, f, A, h, a, H = hands.H, cnt = hands.cnt, T = view.T, E = view.E, mu = view.mu, u = [], mx, s, need, t, p;
    if (prev) {
      acts.push({ type: 'liar' }); acts.push({ type: 'exact' });
      for (q = prev.qty; q <= Math.min(total, prev.qty + reachP); q++) for (f = 1; f <= 6; f++) if (isLegalBid(prev, q, f, total)) acts.push({ type: 'bid', qty: q, face: f });
    } else {
      for (q = 1; q <= Math.min(total, Math.ceil(total / 2) + 1); q++) for (f = 1; f <= 6; f++) acts.push({ type: 'bid', qty: q, face: f });
    }
    A = acts.length;
    if (AI_PROBS.length < H * A) AI_PROBS = new Float64Array(H * A * 2);
    var probs = AI_PROBS, eps = AI_OPP.eps, unif = eps / A, pq = prev ? prev.qty : 0;
    for (h = 0; h < H; h++) {
      var o = h * 7; mx = -1e9;
      for (a = 0; a < A; a++) {
        var ac = acts[a];
        if (ac.type === 'liar') { need = pq - kc[prev.face] - cnt[o + prev.face]; t = need <= 0 ? 1 : need > mu ? 0 : T[prev.face][need]; u[a] = 1 - 2 * t + nerve; }
        else if (ac.type === 'exact') { need = pq - kc[prev.face] - cnt[o + prev.face]; t = (need < 0 || need > mu) ? 0 : E[prev.face][need]; u[a] = critP * t - (1 - t) + nerve; }
        else { need = ac.qty - kc[ac.face] - cnt[o + ac.face]; t = need <= 0 ? 1 : need > mu ? 0 : T[ac.face][need]; u[a] = prev ? 0.9 * t - 0.6 - 0.03 * (ac.qty - pq) : 0.9 * t - 0.6 - 0.04 * ac.qty; }
        if (u[a] > mx) mx = u[a];
      }
      s = 0; for (a = 0; a < A; a++) { p = Math.exp(beta * (u[a] - mx)); u[a] = p; s += p; }
      for (a = 0; a < A; a++) probs[h * A + a] = (1 - eps) * u[a] / s + unif;
    }
    return { acts: acts, probs: probs };
  }

  // ---- every hand your hidden dice could make, as face counts (a wild adds one to every face) with its chance. dists[i][v] is die i's chance of value v (0 = wild).
  // Exact when there are at most cap hands, otherwise a sample of cap hands. ----
  function aiHands(dists, cap) {
    var n = dists.length, i, j, v, f, cur = [{ c: [0, 0, 0, 0, 0, 0, 0], w: 1 }], out, map, h, p, c, key, e, exact = true;
    for (i = 0; i < n && exact; i++) {
      map = {}; out = [];
      for (j = 0; j < cur.length && exact; j++) {
        h = cur[j];
        for (v = 0; v <= 6; v++) {
          p = dists[i][v]; if (!p) continue;
          c = h.c.slice(); if (v === 0) { for (f = 1; f <= 6; f++) c[f]++; } else c[v]++;
          key = c[1] + (c[2] << 5) + (c[3] << 10) + (c[4] << 15) + (c[5] << 20) + c[6] * 33554432;
          e = map[key]; if (e) e.w += h.w * p; else { e = { c: c, w: h.w * p }; map[key] = e; out.push(e); if (out.length > cap) { exact = false; } }
        }
      }
      cur = out;
    }
    if (!exact) {
      map = {}; out = [];
      for (j = 0; j < cap; j++) {
        c = [0, 0, 0, 0, 0, 0, 0];
        for (i = 0; i < n; i++) { var r = Math.random(), d = dists[i]; for (v = 0; v <= 6; v++) { r -= d[v]; if (r <= 0) break; } if (v > 6) v = 6; if (v === 0) { for (f = 1; f <= 6; f++) c[f]++; } else c[v]++; }
        key = c[1] + (c[2] << 5) + (c[3] << 10) + (c[4] << 15) + (c[5] << 20) + c[6] * 33554432;
        e = map[key]; if (e) e.w += 1; else { e = { c: c, w: 1 }; map[key] = e; out.push(e); }
      }
      cur = out;
    }
    var H = cur.length, cnt = new Int16Array(H * 7), w = new Float64Array(H), tot = 0;
    for (j = 0; j < H; j++) { for (f = 0; f < 7; f++) cnt[j * 7 + f] = cur[j].c[f]; w[j] = cur[j].w; tot += w[j]; }
    for (j = 0; j < H; j++) w[j] /= tot;
    return { H: H, cnt: cnt, w: w, exact: exact };
  }
  function aiFairDie() { return [0, 1 / 6, 1 / 6, 1 / 6, 1 / 6, 1 / 6, 1 / 6]; }

  // ---- what the rounds so far have taught it about you. A small grid of hypotheses: nerve (how keen you are to call) and sharpness (how
  // closely your bids follow your dice). Updated at the end of each round, when every die is on the table; old rounds fade. ----
  var AI_NERVES = [-0.25, -0.12, 0, 0.12, 0.25], AI_SHARPS = [0.5, 1, 1.5];
  function aiLearnNew() { var lw = []; for (var i = 0; i < AI_NERVES.length * AI_SHARPS.length; i++) lw.push(0); return { lw: lw, rounds: 0 }; }
  function aiLearnRead(L, adapt) {
    var nerve = 0, sharp = 1;
    if (L && L.lw && adapt > 0) {
      var i, j, k = 0, mx = -1e9, s = 0, ws = [], en = 0, es = 0;
      for (i = 0; i < L.lw.length; i++) if (L.lw[i] > mx) mx = L.lw[i];
      for (i = 0; i < AI_NERVES.length; i++) for (j = 0; j < AI_SHARPS.length; j++, k++) { ws[k] = Math.exp(L.lw[k] - mx); s += ws[k]; en += ws[k] * AI_NERVES[i]; es += ws[k] * AI_SHARPS[j]; }
      nerve = adapt * en / s; sharp = 1 + adapt * (es / s - 1);
    }
    return { nerve: nerve, sharp: sharp };
  }
  // info: { hist: [{by, qty, face}], theirVals: all of their dice values, myVals: my dice values, peeked: my values they had seen, total }
  function aiLearnRound(L, info) {
    if (!L || !info || !info.hist) return;
    var hc = [0, 0, 0, 0, 0, 0, 0], pc = [0, 0, 0, 0, 0, 0, 0], f, k, i, j;
    for (f = 1; f <= 6; f++) { hc[f] = countFace(info.theirVals, f); pc[f] = countFace(info.peeked || [], f); }
    var mu = info.myVals.length - (info.peeked || []).length, one = { H: 1, cnt: new Int16Array(7), w: new Float64Array([1]) }, kc = [], any = false;
    for (f = 0; f < 7; f++) { one.cnt[f] = hc[f]; kc[f] = pc[f]; }
    var myFaces = [], prev = null, probs, add = [];
    for (i = 0; i < L.lw.length; i++) add[i] = 0;
    for (k = 0; k < info.hist.length; k++) {
      var b = info.hist[k];
      if (b.by === 'p') {
        var view = aiOppView(mu, myFaces, AI_OPP.gull), n = 0;
        for (i = 0; i < AI_NERVES.length; i++) for (j = 0; j < AI_SHARPS.length; j++, n++) {
          var oa = aiOppActs(view, prev, info.total, one, kc, info.critP || 2, AI_OPP.beta * AI_SHARPS[j], AI_NERVES[i], AI_OPP.reach), acts = oa.acts, a; probs = oa.probs;
          for (a = 0; a < acts.length; a++) if (acts[a].type === 'bid' && acts[a].qty === b.qty && acts[a].face === b.face) { add[n] += Math.log(Math.max(1e-6, probs[a])); any = true; break; }
        }
      } else myFaces.push(b.face);
      prev = { qty: b.qty, face: b.face };
    }
    // the call that ended the round is evidence too: did they call, and on what
    if (info.callBy === 'p' && info.callKind && prev && info.hist.length && info.hist[info.hist.length - 1].by === 'e') {
      var view2 = aiOppView(mu, myFaces, AI_OPP.gull), n2 = 0;
      for (i = 0; i < AI_NERVES.length; i++) for (j = 0; j < AI_SHARPS.length; j++, n2++) {
        var oa2 = aiOppActs(view2, prev, info.total, one, kc, info.critP || 2, AI_OPP.beta * AI_SHARPS[j], AI_NERVES[i], AI_OPP.reach), acts2 = oa2.acts, a2; probs = oa2.probs;
        for (a2 = 0; a2 < acts2.length; a2++) if (acts2[a2].type === info.callKind) { add[n2] += Math.log(Math.max(1e-6, probs[a2])); any = true; break; }
      }
    }
    if (!any) return;
    for (i = 0; i < L.lw.length; i++) L.lw[i] = L.lw[i] * 0.93 + add[i];
    L.rounds++;
  }

  // ---- the decision ----
  // c: { own: my dice values, seen: their dice I can see, oppN: their hidden dice, oppDist: [per hidden die [p0..p6]] (fair when missing),
  //      bid, hist: this round's bids [{by, qty, face}], canExact, crit (my Spot On damage), oppCrit, oppLiarDmg (what a bluff of mine costs when caught),
  //      rebuke (extra I lose calling Liar wrongly), hitBonus (extra my hits do), theirBonus (extra their hits do), myN (my dice as health),
  //      oppHP (their real dice), babies, shield, armour, peeked (my values they have seen), learn (what it knows about them), P, skill, trace, dummy }
  function aiDecide(c) {
    var t0 = Date.now(), P = c.P || aiParams(c.skill, null);
    var own = c.own || [], seen = c.seen || [], m = own.length, n = c.oppN, total = m + seen.length + n, f, q, h, i, a;
    if (c.dummy) return c.bid ? { type: 'bid', qty: c.bid.qty + 1, face: 1 } : { type: 'bid', qty: 1, face: 1 };
    var myN = c.myN || m, oppHP = c.oppHP != null ? c.oppHP : n + seen.length, babies = c.babies || 0, shield = c.shield || 0, armour = c.armour || 0;
    var crit = c.crit || 2, oppCrit = c.oppCrit || 2, liarDmg = c.oppLiarDmg || 1, rebuke = c.rebuke || 0, hb = c.hitBonus || 0, tb = c.theirBonus || 0;
    var hist = c.hist || [], peeked = c.peeked || [];
    // what I know for sure: my dice and theirs that I can see
    var myC = [0, 0, 0, 0, 0, 0, 0], seenC = [0, 0, 0, 0, 0, 0, 0], peekC = [0, 0, 0, 0, 0, 0, 0], base = [], kc = [];
    for (f = 1; f <= 6; f++) { myC[f] = countFace(own, f); seenC[f] = countFace(seen, f); peekC[f] = countFace(peeked, f); base[f] = myC[f] + seenC[f]; kc[f] = seenC[f] + peekC[f]; }
    // the hands their hidden dice could be
    var dists = [], hands;
    for (i = 0; i < n; i++) dists.push((c.oppDist && c.oppDist[i]) || aiFairDie());
    hands = aiHands(dists, P.hands);
    var H = hands.H, cnt = hands.cnt, w = new Float64Array(hands.w);
    // what the rounds so far say about them
    var learned = aiLearnRead(c.learn, P.adapt), beta = AI_OPP.beta * P.read * learned.sharp, nerve = learned.nerve;
    var mu = m - peeked.length, probs, view, acts, A, o, oa;
    // read this round's bids: weigh every hand by how likely a sensible player holding it would have bid as they did
    var myFaces = [], prev = null, k;
    for (k = 0; k < hist.length; k++) {
      var hb_ = hist[k];
      if (hb_.by === 'p') {
        if (P.read > 0) {
          view = aiOppView(mu, myFaces, P.gull);
          oa = aiOppActs(view, prev, total, hands, kc, oppCrit, beta, nerve, AI_OPP.reach); acts = oa.acts; probs = oa.probs; A = acts.length;
          for (a = 0; a < A; a++) if (acts[a].type === 'bid' && acts[a].qty === hb_.qty && acts[a].face === hb_.face) break;
          if (a < A) { var s = 0; for (h = 0; h < H; h++) { w[h] *= probs[h * A + a]; s += w[h]; } if (s > 0) for (h = 0; h < H; h++) w[h] /= s; }
        }
      } else myFaces.push(hb_.face);
      prev = { qty: hb_.qty, face: hb_.face };
    }
    // what each outcome is worth: the chance of winning the fight from the round after it. The loser opens.
    var LM = [], LT = [], d;
    var dw = AI_TUNE.dieWorth;
    for (d = 0; d <= 9; d++) { var lm = Math.max(0, d - armour), lt = Math.max(0, d - Math.min(1, shield)); LM[d] = aiWin(0, myN - lm, oppHP) - dw * lm; LT[d] = aiWin(1, myN, oppHP - Math.max(0, lt - babies)) + dw * lt; }
    // what each call costs whom: dMW = my Liar call wrong, dMX = my Spot On hits, dMXW = my Spot On wrong, dTW = their Liar call wrong, dCaught = my bluff caught, dCrit = their Spot On hits
    var dMW = 1 + rebuke + tb, dMX = 2 + hb, dMXW = 1, dTW = 1 + hb, dCaught = liarDmg + tb, dCrit = oppCrit + tb, dTXW = 1;
    function vMyLiar(cf, qq) { return cf >= qq ? LM[dMW] : LT[1]; }
    function vMyExact(cf, qq) { return cf === qq ? LT[dMX] : LM[dMXW]; }
    function vTheyLiar(cf, qq) { return cf >= qq ? LT[dTW] : LM[dCaught]; }
    function vTheyExact(cf, qq) { return cf === qq ? LM[dCrit] : LT[dTXW]; }
    // a raise of mine two moves deep: they call it (callLeaf of the time) or the round goes on, which is treated as a wash
    var W0 = 0.5 * (aiWin(0, myN, oppHP) + aiWin(1, myN, oppHP)), cl = AI_OPP.callLeaf, cl1 = (1 - cl) * W0;
    function vLeaf(cf, qq) { return cl * vTheyLiar(cf, qq) + cl1; }
    // the chance a bid is true, and exactly right, under what I believe
    function pTrue(qq, ff) { var s = 0, b0 = base[ff]; for (h = 0; h < H; h++) if (b0 + cnt[h * 7 + ff] >= qq) s += w[h]; return s; }
    function pExact(qq, ff) { var s = 0, b0 = base[ff]; for (h = 0; h < H; h++) if (b0 + cnt[h * 7 + ff] === qq) s += w[h]; return s; }
    // a bid of mine, played forward: how they answer it, and what I do about a raise
    var reachP = AI_OPP.reach, choice = [];
    function evalBid(qq, ff) {
      var vw = aiOppView(mu, myFaces.concat([ff]), P.gull), bid = { qty: qq, face: ff };
      var oa2 = aiOppActs(vw, bid, total, hands, kc, oppCrit, beta, nerve, reachP), ac = oa2.acts, probs = oa2.probs, AA = ac.length, j, hh, s, f3, q3, b0 = base[ff];
      // for each raise they might make: what I would do, judged with the hands that would make that raise
      for (j = 2; j < AA; j++) {
        var rq = ac[j].qty, rf = ac[j].face, sw = 0, eL = 0, eE = 0, bf = ac[j].face, b3 = base[rf];
        for (hh = 0; hh < H; hh++) { var ww = w[hh] * probs[hh * AA + j]; if (!ww) continue; sw += ww; var cf = b3 + cnt[hh * 7 + rf]; eL += ww * vMyLiar(cf, rq); eE += ww * vMyExact(cf, rq); }
        if (sw < 1e-9) { choice[j] = { t: 'liar' }; continue; }
        var best = { t: 'liar', v: eL / sw + P.liar };
        if (c.canExact && (P.skill >= 0.3 || myN === 1)) { var ve = eE / sw + P.exact + (myN === 1 ? P.lastDie : 0); if (ve > best.v) best = { t: 'exact', v: ve }; }
        // or raise again, as safely as I can, and expect a call
        for (f3 = 1; f3 <= 6; f3++) {
          q3 = f3 > rf ? rq : rq + 1; if (q3 > total) continue;
          var v3 = 0, b4 = base[f3];
          for (hh = 0; hh < H; hh++) { var ww2 = w[hh] * probs[hh * AA + j]; if (ww2) v3 += ww2 * vLeaf(b4 + cnt[hh * 7 + f3], q3); }
          v3 /= sw; if (v3 > best.v) best = { t: 'bid', v: v3, q: q3, f: f3 };
        }
        choice[j] = best;
      }
      // now the value of the bid itself, hand by hand
      var ev = 0;
      for (hh = 0; hh < H; hh++) {
        var o2 = hh * AA, cf0 = b0 + cnt[hh * 7 + ff], v = probs[o2] * vTheyLiar(cf0, qq) + probs[o2 + 1] * vTheyExact(cf0, qq);
        for (j = 2; j < AA; j++) {
          var pj = probs[o2 + j]; if (!pj) continue; var ch = choice[j];
          if (ch.t === 'liar') v += pj * vMyLiar(base[ac[j].face] + cnt[hh * 7 + ac[j].face], ac[j].qty);
          else if (ch.t === 'exact') v += pj * vMyExact(base[ac[j].face] + cnt[hh * 7 + ac[j].face], ac[j].qty);
          else v += pj * vLeaf(base[ch.f] + cnt[hh * 7 + ch.f], ch.q);
        }
        ev += w[hh] * v;
      }
      return ev;
    }
    var noiseAmp = P.noise;
    function noise() { return noiseAmp ? (Math.random() - 0.5) * 2 * noiseAmp : 0; }
    var opts = [], b = c.bid, cur = null, pe0 = null;
    if (b) {
      cur = pTrue(b.qty, b.face); pe0 = pExact(b.qty, b.face);
      opts.push({ a: { type: 'liar' }, ev: (1 - cur) * LT[1] + cur * LM[dMW] + P.liar + noise() });
      if (c.canExact && (P.skill >= 0.3 || myN === 1)) opts.push({ a: { type: 'exact' }, ev: pe0 * LT[dMX] + (1 - pe0) * LM[dMXW] + P.exact + (myN === 1 ? P.lastDie : 0) + noise() });
    }
    // bids worth weighing: within reach, legal, and not hopeless unless nothing else is legal
    var cands = [], q0 = b ? b.qty : 1, q1 = b ? Math.min(total, b.qty + P.reach) : Math.min(total, Math.ceil(total / 2) + 1);
    for (q = q0; q <= q1; q++) for (f = 1; f <= 6; f++) {
      if (!isLegalBid(b, q, f, total)) continue;
      var pt = pTrue(q, f);
      cands.push({ q: q, f: f, pt: pt, hopeless: pt < 0.06 && q > base[f] });
    }
    var live = cands.filter(function (x) { return !x.hopeless; });
    if (!live.length && cands.length) live = cands.slice(0, 6);
    for (i = 0; i < live.length; i++) opts.push({ a: { type: 'bid', qty: live[i].q, face: live[i].f }, ev: evalBid(live[i].q, live[i].f) + noise(), pt: live[i].pt, bluff: myC[live[i].f] === 0 });
    if (!opts.length) return { type: 'liar' };
    // the pick: usually the best (softly), sometimes a bluff when it is cheap enough for this foe
    var top = null, topBluff = null;
    for (i = 0; i < opts.length; i++) { if (!top || opts[i].ev > top.ev) top = opts[i]; if (opts[i].bluff && (!topBluff || opts[i].ev > topBluff.ev)) topBluff = opts[i]; }
    var bluffTurn = topBluff && Math.random() < P.bluff, pick;
    if (bluffTurn && topBluff.ev >= top.ev - P.bluffCost) pick = topBluff; else pick = pickWeighted(opts, P.temp);
    if (c.trace) {
      var ranked = opts.slice().sort(function (x, y) { return y.ev - x.ev; }).slice(0, 5).map(function (x) { return { a: x.a, ev: +x.ev.toFixed(3) }; });
      AI_LAST = { t: Date.now(), ms: Date.now() - t0, a: pick.a, ev: +pick.ev.toFixed(3), bluffTurn: !!bluffTurn, bluffed: !!pick.bluff, holds: pick.a.type === 'bid' ? myC[pick.a.face] : null,
        pTrue: pick.a.type === 'bid' ? +pick.pt.toFixed(2) : null, curTrue: cur === null ? null : +cur.toFixed(2), curExact: pe0 === null ? null : +pe0.toFixed(2),
        bid: b ? { qty: b.qty, face: b.face } : null, top: ranked, own: own.slice(), oppN: n, hands: H, exact: hands.exact, nerve: +nerve.toFixed(2), sharp: +learned.sharp.toFixed(2), P: P };
    }
    return pick.a;
  }
  // ===== ENGINE END =====
