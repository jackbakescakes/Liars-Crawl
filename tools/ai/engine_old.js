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

  // ---- the enemy AI's knobs. One set per fight: aiParams() derives them from a foe's skill, then applies overrides from the foe itself (def.ai),
  // from the training room's global switch (AIG) and from a training fight (C.aiOver). The training room's sliders are built from AI_KNOBS. ----
  var AI_KNOBS = [
    { k: 'skill', name: 'Skill', min: 0, max: 0.99, step: 0.01, tip: 'The master dial. Noise, Softness and Bluff follow it unless they are moved by hand.' },
    { k: 'noise', name: 'Noise', min: 0, max: 1, step: 0.01, auto: true, tip: 'Random error on how it values each move. 0 = it always sees its best move.' },
    { k: 'temp', name: 'Softness', min: 0.01, max: 1, step: 0.01, auto: true, tip: 'How often it plays a move it values a little less than its best. 0.01 = nearly always the top move.' },
    { k: 'bluff', name: 'Bluff', min: 0, max: 1, step: 0.01, auto: true, tip: 'Chance, each time it bids, that the bid is on a face it does not hold.' },
    { k: 'read', name: 'Read', min: 0, max: 2, step: 0.05, tip: 'How much your earlier bids convince it you hold that face. 0 = it ignores your bids.' },
    { k: 'liar', name: 'Liar bias', min: -1, max: 1, step: 0.05, tip: 'Added to the value of calling Liar. Above 0 it calls Liar more.' },
    { k: 'exact', name: 'Spot On bias', min: -1, max: 1, step: 0.05, tip: 'Added to the value of calling Spot On.' },
    { k: 'lastDie', name: 'Last-die gamble', min: 0, max: 1, step: 0.05, tip: 'Extra pull toward Spot On when it is down to one die.' },
    { k: 'reach', name: 'Reach', min: 1, max: 5, step: 1, tip: 'How many quantities above the current bid it will consider raising to.' }
  ];
  var AI_DEFAULT_LASTDIE = 0.4;   // the "gambles for the big swing" bonus a foe gets on its last die
  function aiParams(skill, over) {
    var has = function (k) { return !!(over && over[k] !== null && over[k] !== undefined && over[k] !== '' && !isNaN(+over[k])); };
    var p = { skill: Math.max(0, Math.min(0.99, has('skill') ? +over.skill : (+skill || 0))) };
    p.noise = has('noise') ? +over.noise : 0.7 * Math.pow(1 - p.skill, 1.5);
    p.temp = has('temp') ? Math.max(0.01, +over.temp) : 0.01 + 0.7 * Math.pow(1 - p.skill, 2);
    p.bluff = has('bluff') ? +over.bluff : Math.max(0, 0.3 - 0.2 * p.skill);
    p.read = has('read') ? +over.read : 1;
    p.liar = has('liar') ? +over.liar : 0;
    p.exact = has('exact') ? +over.exact : 0;
    p.lastDie = has('lastDie') ? +over.lastDie : AI_DEFAULT_LASTDIE;
    p.reach = has('reach') ? Math.max(1, Math.round(+over.reach)) : 3;
    return p;
  }
  var AI_LAST = null;   // the enemy's last decision and what it was weighing, kept when a fight is traced (the training room shows it)

  // The enemy reads your bids to guess what you hold, then imagines many possible hands for you.
  // For each move it plays out how a sensible player would answer, and weighs calling liar,
  // calling exact and each raise by the dice it expects to win or lose. Lower skill adds noise and
  // makes it pick worse moves more often. Some turns it bluffs: every bid it considers is on a face it does not hold.
  function aiDecide(c) {
    var P = c.P || aiParams(c.skill, null);
    var n = c.oppN, own = c.own, m = own.length, total = m + n, bids = c.oppBids || [], q, f, i;
    var crit = c.critDmg || 2;
    if (c.dummy) return c.bid ? { type: 'bid', qty: c.bid.qty + 1, face: 1 } : { type: 'bid', qty: 1, face: 1 };
    // what the player's bids say about their hand: they lean toward faces they hold (Read scales how much it believes that)
    var wt = [0, 1, 1, 1, 1, 1, 1];
    bids.forEach(function (bf, k) { wt[bf] += (k === bids.length - 1 ? 0.55 : 0.3) * P.read; });
    var wsum = 0; for (f = 1; f <= 6; f++) wsum += wt[f];
    function pf(face) { return Math.min(0.5, wt[face] / wsum + 0.01); }
    var myCount = []; for (f = 1; f <= 6; f++) myCount[f] = countFace(own, f);
    function pTrue(qq, ff) { return binomTail(n, pf(ff), qq - myCount[ff]); }
    function pExact(qq, ff) { return binomPmf(n, pf(ff), qq - myCount[ff]); }
    var noiseAmp = P.noise;
    function noise() { return (Math.random() - 0.5) * noiseAmp; }
    var temp = P.temp;
    var S = Math.round(50 + 150 * P.skill);
    // the player's hand is unknown: draw plausible hands for it
    function sampleHand() {
      var h = [], k, r, v; for (k = 0; k < n; k++) { r = Math.random() * wsum; for (v = 1; v <= 6; v++) { r -= wt[v]; if (r <= 0) break; } h.push(Math.min(v, 6)); }
      return h;
    }
    var hands = []; for (i = 0; i < S; i++) hands.push(sampleHand());
    var hc = hands.map(function (h) { var a = [0]; for (var ff = 1; ff <= 6; ff++) a[ff] = countFace(h, ff); return a; });
    // how a sensible player answers a bid, from their side of the table
    var P0 = 1 / 6 + 0.01, tailT = [], pmfT = [], kk;
    for (kk = 0; kk <= m + 1; kk++) { tailT[kk] = binomTail(m, P0, kk); pmfT[kk] = binomPmf(m, P0, kk); }
    function tail0(k) { return k <= 0 ? 1 : k > m ? 0 : tailT[k]; }
    function pmf0(k) { return k < 0 || k > m ? 0 : pmfT[k]; }
    var raiseCache = {};
    function pRaiseMine(qq, ff) { var key = qq * 8 + ff; if (raiseCache[key] === undefined) raiseCache[key] = binomTail(n, pf(ff), qq - myCount[ff]); return raiseCache[key]; }
    function replyValue(qq, ff, prev, hi) {
      // returns my result (in dice) if I make bid qq x ff
      var cnt = myCount[ff] + hc[hi][ff], truth = cnt >= qq, hcf = hc[hi][ff];
      var pt = tail0(qq - hcf);
      if (pt < 0.38) return truth ? 1 : -1;                                  // they call liar
      var pe = pmf0(qq - hcf);
      if (pe > 0.4 && qq >= 2) return cnt === qq ? -crit : 1;                  // they call exact
      // they raise: pick the safest legal raise
      var best = -1, bq = 0, bf = 0, q2, f2, pr;
      for (q2 = qq; q2 <= Math.min(total, qq + 2); q2++) for (f2 = 1; f2 <= 6; f2++) {
        if (!(q2 > qq || f2 > ff)) continue;
        pr = tail0(q2 - hc[hi][f2]);
        if (pr > best + 0.0001) { best = pr; bq = q2; bf = f2; }
      }
      if (!bq) return truth ? 0.4 : -0.4;
      // my answer to that raise, judged with what I know
      var pRaise = pRaiseMine(bq, bf);
      return Math.max(1 - 2 * pRaise, -0.2) * 0.9;
    }
    function bidValue(qq, ff, prev) {
      var s = 0, hi;
      for (hi = 0; hi < S; hi++) s += replyValue(qq, ff, prev, hi);
      return s / S;
    }
    // a bluffing turn: every bid it weighs is on a face it does not hold (nothing to bluff with if it holds all six)
    var empty = []; for (f = 1; f <= 6; f++) if (!myCount[f]) empty.push(f);
    var bluffing = empty.length > 0 && Math.random() < P.bluff;
    function faceOk(ff) { return !bluffing || myCount[ff] === 0; }
    var opts = [], b = c.bid, pick;
    if (!b) {
      for (q = 1; q <= Math.min(total, Math.ceil(total / 2) + 1); q++) for (f = 1; f <= 6; f++) { if (!faceOk(f)) continue; opts.push({ a: { type: 'bid', qty: q, face: f }, ev: bidValue(q, f, null) + noise() }); }
      pick = pickWeighted(opts, temp);
      if (c.trace) aiTrace(c, P, pick, opts, bluffing, myCount, pTrue, null, null);
      return pick.a;
    }
    var cur = pTrue(b.qty, b.face), pe0 = pExact(b.qty, b.face);
    opts.push({ a: { type: 'liar' }, ev: 1 - 2 * cur + P.liar + noise() });
    if (c.canExact && (P.skill >= 0.3 || m === 1)) opts.push({ a: { type: 'exact' }, ev: crit * pe0 - (1 - pe0) + (m === 1 ? P.lastDie : 0) + P.exact + noise() });   // a foe on its last die gambles for the big swing
    for (q = b.qty; q <= Math.min(total, b.qty + P.reach); q++) for (f = 1; f <= 6; f++) {
      if (!isLegalBid(b, q, f, total) || !faceOk(f)) continue;
      opts.push({ a: { type: 'bid', qty: q, face: f }, ev: bidValue(q, f, b) + noise() });
    }
    pick = pickWeighted(opts, temp);
    if (c.trace) aiTrace(c, P, pick, opts, bluffing, myCount, pTrue, cur, pe0);
    return pick.a;
  }
  // what the enemy was thinking, for the training room's readout
  function aiTrace(c, P, pick, opts, bluffing, myCount, pTrue, cur, pe0) {
    var a = pick.a, top = opts.slice().sort(function (x, y) { return y.ev - x.ev; }).slice(0, 5).map(function (o) { return { a: o.a, ev: +o.ev.toFixed(2) }; });
    AI_LAST = { t: Date.now(), a: a, ev: +pick.ev.toFixed(2), bluffTurn: bluffing, bluffed: a.type === 'bid' && myCount[a.face] === 0, holds: a.type === 'bid' ? myCount[a.face] : null,
      pTrue: a.type === 'bid' ? +pTrue(a.qty, a.face).toFixed(2) : null, curTrue: cur === null ? null : +cur.toFixed(2), curExact: pe0 === null ? null : +pe0.toFixed(2),
      bid: c.bid ? { qty: c.bid.qty, face: c.bid.face } : null, top: top, own: c.own.slice(), oppN: c.oppN, P: P };
  }
  // ===== ENGINE END =====
