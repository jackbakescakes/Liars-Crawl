  // 24 x 24 detailed bust sprites. Drawn from shapes, then shaded (light from the top left) and outlined.
  function buildHiSprites() {
    var G;
    function P(x, y, c) { if (x >= 0 && x < 24 && y >= 0 && y < 24) G[y][x] = c; }
    function M(x, y, c) { P(x, y, c); P(23 - x, y, c); }
    function R(x0, y0, x1, y1, c) { for (var y = y0; y <= y1; y++) for (var x = x0; x <= x1; x++) P(x, y, c); }
    function MR(x0, y0, x1, y1, c) { for (var y = y0; y <= y1; y++) for (var x = x0; x <= x1; x++) M(x, y, c); }
    function E(cx, cy, rx, ry, c) { for (var y = 0; y < 24; y++) for (var x = 0; x < 24; x++) { var dx = (x - cx) / rx, dy = (y - cy) / ry; if (dx * dx + dy * dy <= 1) G[y][x] = c; } }
    function L(x0, y0, x1, y1, c) { var n = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0)); for (var i = 0; i <= n; i++) P(Math.round(x0 + (x1 - x0) * i / (n || 1)), Math.round(y0 + (y1 - y0) * i / (n || 1)), c); }
    function ML(x0, y0, x1, y1, c) { L(x0, y0, x1, y1, c); L(23 - x0, y0, 23 - x1, y1, c); }
    function eyes(y, dx, big) { M(12 - dx - 1, y, 'k'); M(12 - dx, y, 'e'); if (big) { M(12 - dx - 1, y - 1, 'k'); M(12 - dx, y - 1, 'k'); M(12 - dx - 1, y + 1, 'k'); M(12 - dx, y + 1, 'k'); M(12 - dx - 2, y, 'k'); } }
    function shade() {
      var H = { '1': ['1', 'a', 'b'], '2': ['2', 'c', 'f'], 'w': ['w', 'x', 'v'] }, out = G.map(function (r) { return r.slice(); });
      for (var y = 0; y < 24; y++) for (var x = 0; x < 24; x++) {
        var c = G[y][x], h = H[c]; if (!h) continue;
        var up = y > 0 ? G[y - 1][x] : '.', lf = x > 0 ? G[y][x - 1] : '.', dn = y < 23 ? G[y + 1][x] : '.', rt = x < 23 ? G[y][x + 1] : '.';
        var fam = function (n) { return n === c || n === h[1] || n === h[2]; };
        if (!fam(dn) || !fam(rt)) out[y][x] = h[2];
        else if (!fam(up) || !fam(lf)) out[y][x] = h[1];
        else if (((x + y) % 4 === 0) && y > 12 && c !== 'w') out[y][x] = h[2];
      }
      G = out;
    }
    function done() { shade(); return G.map(function (r) { return r.join(''); }); }
    function fresh() { G = []; for (var y = 0; y < 24; y++) { G.push([]); for (var x = 0; x < 24; x++) G[y].push('.'); } }
    var S = {};

    S.fighter = function () {
      fresh();
      E(11.5, 24, 12, 9, '2'); R(0, 21, 23, 23, '2');                 // shoulders
      MR(3, 17, 4, 19, '1'); MR(1, 20, 3, 22, '1');                   // pauldron rivets area
      R(9, 14, 14, 18, 'd'); for (var i = 9; i < 15; i++) if (i % 2) P(i, 15, '1');   // mail collar
      E(11.5, 8, 7, 7.5, '1');                                        // helm dome
      R(5, 8, 18, 14, '1');                                           // cheek guards
      MR(5, 12, 6, 15, '1');
      R(8, 8, 15, 9, 'k'); R(11, 9, 12, 14, '1');                      // visor slit and nose guard
      M(8, 8, 'e'); M(9, 8, 'e');
      R(9, 12, 14, 12, 'k'); R(8, 14, 15, 14, 'd');
      R(10, 0, 13, 2, 'r'); R(9, 1, 14, 3, 'r'); M(8, 3, 'r');         // plume
      R(11, 2, 12, 5, '2'); R(5, 7, 18, 7, '2');                       // crest band and brow band
      MR(4, 20, 5, 22, 'g'); P(11, 18, 'g'); P(12, 18, 'g');           // studs
      return done();
    };

    S.cleric = function () {
      fresh();
      E(11.5, 24, 11.5, 8, '2');                                       // robe shoulders
      R(8, 18, 15, 23, '2'); R(11, 16, 12, 23, 'g'); R(9, 18, 14, 19, 'g'); // holy cross on chest
      E(11.5, 10, 8.5, 9, '2');                                        // hood
      E(11.5, 11.5, 5.5, 6.5, '1');                                    // face
      R(7, 5, 16, 6, '2');                                             // hood brow
      M(8, 10, 'w'); M(9, 10, 'k'); M(8, 11, 'k'); M(9, 11, 'e');
      R(10, 15, 13, 15, 'd'); R(10, 14, 13, 14, '1');
      R(11, 12, 12, 13, 'd');
      for (var a = 0; a < 16; a++) { var t = Math.PI * (1 + a / 15); P(Math.round(11.5 + Math.cos(t) * 9), Math.round(5 + Math.sin(t) * 5.5), 'g'); P(Math.round(11.5 + Math.cos(t) * 9), Math.round(4 + Math.sin(t) * 5.5), 'g'); }
      return done();
    };

    S.thief = function () {
      fresh();
      E(11.5, 24, 11.5, 8, '2');
      R(9, 15, 14, 19, '2'); L(5, 18, 18, 22, 'd');                    // cloak and strap
      E(11.5, 9, 8.5, 9, 'h');                                         // hood
      E(11.5, 10.5, 5.5, 6.5, '1');                                    // face
      R(6, 9, 17, 11, 'k');                                            // mask
      M(8, 10, 'e'); M(9, 10, 'e'); P(11, 12, 'd'); P(12, 12, 'd');
      R(6, 13, 17, 17, 'h'); R(8, 13, 15, 13, 'd'); R(9, 14, 14, 14, '2'); // scarf pulled up
      R(10, 0, 13, 2, 'h'); R(9, 3, 14, 4, 'h');
      L(3, 20, 8, 15, 'w');                                            // dagger over the shoulder
      return done();
    };

    S.dummy = function () {
      fresh();
      R(10, 15, 13, 23, '2');                                          // post
      R(1, 16, 22, 19, '2'); MR(0, 15, 1, 20, 'g');                    // cross beam, straw ends
      E(11.5, 8.5, 7.5, 7.5, '1');                                     // sack head
      for (var i = 0; i < 5; i++) P(7 + i * 2, 1 + (i % 2), 'g');       // straw tuft
      M(8, 6, 'k'); M(10, 6, 'k'); M(9, 7, 'k'); M(8, 8, 'k'); M(10, 8, 'k');   // stitched X eyes
      R(8, 12, 15, 12, 'k'); for (var j = 8; j < 16; j += 2) P(j, 11, 'k'); // stitched mouth
      R(14, 3, 17, 6, '2'); P(15, 4, 'k'); P(16, 5, 'k');              // patch
      R(9, 15, 14, 15, 'g'); E(11.5, 21, 2.5, 2.5, 'r'); P(11, 21, 'w');  // rope and target
      return done();
    };

    S.rat = function () {
      fresh();
      E(5, 5, 4.5, 4.5, '1'); E(18, 5, 4.5, 4.5, '1'); E(5, 5, 2.5, 2.5, '2'); E(18, 5, 2.5, 2.5, '2');   // ears
      E(11.5, 13, 9, 9, '1');                                          // head
      E(11.5, 17.5, 4.5, 4.5, '2');                                    // snout
      R(10, 15, 13, 16, 'k'); P(11, 15, 'r'); P(12, 15, 'r');          // nose
      R(10, 19, 11, 21, 'w'); R(12, 19, 13, 21, 'w'); P(11, 19, 'x'); P(12, 19, 'x'); // buck teeth
      R(11, 17, 12, 18, 'k');
      M(7, 11, 'k'); M(8, 11, 'e'); M(7, 12, 'k'); M(8, 12, 'k');
      ML(1, 16, 6, 17, 'w'); ML(1, 19, 6, 18, 'w');                    // whiskers
      for (var i = 0; i < 6; i++) P(8 + i * 2, 6 + (i % 2) * 2, 'd');   // fur tufts
      R(0, 22, 23, 23, '1');
      return done();
    };

    S.goblin = function () {
      fresh();
      E(11.5, 13, 7.5, 8, '1');                                        // head
      ML(1, 5, 5, 12, '1'); ML(1, 6, 5, 12, '1'); ML(2, 7, 5, 12, '1'); ML(2, 8, 6, 12, '1'); ML(3, 9, 5, 12, '1'); // long ears
      MR(2, 7, 3, 8, '1'); M(3, 7, '2'); M(3, 8, '2');
      R(5, 8, 18, 9, 'd'); R(6, 7, 17, 7, '1');                         // heavy brow
      M(8, 10, 'k'); M(9, 10, 'e'); M(8, 11, 'e'); M(9, 11, 'k');
      R(10, 12, 13, 15, '1'); R(11, 15, 12, 16, '2');                  // big nose
      R(6, 17, 17, 19, 'k'); for (var i = 7; i < 17; i += 2) { P(i, 17, 'w'); P(i + 1, 19, 'w'); }   // wide grin with teeth
      E(11.5, 24, 9, 5, '2'); R(5, 21, 18, 23, '2'); R(9, 20, 14, 20, 'd'); // ragged collar
      return done();
    };

    S.skull = function () {
      fresh();
      E(11.5, 10.5, 9, 9.5, 'w');                                      // cranium
      R(6, 15, 17, 20, 'w');                                           // jaw
      E(7.5, 11, 3, 3.2, 'k'); E(16.5, 11, 3, 3.2, 'k'); M(7, 11, 'e'); M(8, 11, 'e'); // sockets
      R(11, 14, 12, 15, 'k'); P(10, 16, 'k'); P(13, 16, 'k');          // nose
      R(6, 19, 17, 19, 'k'); for (var i = 7; i < 17; i += 2) { R(i, 18, i, 21, 'k'); }   // teeth gaps
      R(6, 21, 17, 22, 'w'); R(8, 22, 15, 23, 'w');
      L(14, 2, 12, 6, 'v'); L(12, 6, 14, 8, 'v'); L(3, 7, 5, 9, 'v');  // cracks
      return done();
    };

    S.hood = function () {
      fresh();
      E(11.5, 22, 12, 10, '2');                                        // robe
      E(11.5, 9, 9, 9.5, '1');                                         // cowl
      E(11.5, 11, 5.5, 6.5, 'k');                                      // void face
      M(8, 11, 'e'); M(9, 11, 'e'); P(11, 15, 'd'); P(12, 15, 'd');
      L(3, 12, 5, 21, '2'); L(20, 12, 18, 21, '2'); R(11, 17, 12, 23, 'd'); // folds
      R(9, 17, 14, 18, 'g'); P(11, 19, 'g'); P(12, 19, 'g');           // clasp
      for (var i = 4; i < 20; i += 3) P(i, 23, '.');
      return done();
    };

    S.ogre = function () {
      fresh();
      E(11.5, 12, 10.5, 10, '1');                                      // big head
      E(11.5, 24, 12, 7, '2'); R(0, 21, 23, 23, '2');                  // shoulders
      R(2, 5, 21, 6, 'd'); R(3, 4, 20, 4, '1'); R(1, 5, 2, 8, '2'); R(21, 5, 22, 8, '2'); // headband and brow
      M(6, 9, 'k'); M(7, 9, 'e'); M(6, 10, 'k'); M(7, 10, 'k');
      R(10, 11, 13, 14, '1'); M(9, 13, 'd');                           // nose
      R(4, 17, 19, 19, 'k'); R(6, 15, 7, 18, 'w'); R(16, 15, 17, 18, 'w'); // jaw and tusks
      R(8, 17, 15, 18, '1'); R(9, 19, 14, 20, '1');
      M(9, 20, 'd'); R(4, 21, 7, 21, 'd');
      return done();
    };

    S.chest = function () {
      fresh();
      R(1, 14, 22, 23, '2');                                           // chest body
      R(1, 2, 22, 11, '1'); E(11.5, 3, 10.5, 3, '1');                  // lid
      R(1, 11, 22, 12, 'g'); R(1, 7, 22, 7, 'g'); MR(2, 2, 3, 22, 'g'); // brass bands
      R(3, 12, 20, 15, 'k'); for (var i = 4; i < 20; i += 3) { P(i, 12, 'w'); P(i + 1, 12, 'w'); P(i + 1, 15, 'w'); P(i + 2, 15, 'w'); } // teeth
      R(7, 14, 16, 14, 'r'); R(9, 15, 14, 16, 'r');                   // tongue
      M(7, 5, 'k'); M(8, 5, 'e'); M(7, 6, 'k'); M(8, 6, 'k');
      R(10, 9, 13, 11, 'g'); P(11, 10, 'k'); P(12, 10, 'k');           // lock
      return done();
    };

    S.dealer = function () {
      fresh();
      R(6, 0, 17, 5, 'h'); R(3, 6, 20, 7, 'h'); R(6, 5, 17, 5, 'r');   // top hat
      E(11.5, 12.5, 6.5, 6, '1');                                      // pale face
      M(8, 10, 'k'); M(9, 10, 'k'); M(8, 11, 'k'); M(9, 11, 'e'); M(9, 9, 'k');
      R(11, 12, 12, 13, 'd');
      R(8, 15, 15, 15, 'k'); for (var i = 8; i < 16; i += 2) P(i, 14, 'k'); // wide painted smile
      E(11.5, 24, 11, 7, 'h'); R(2, 21, 21, 23, 'h');
      R(9, 18, 14, 20, 'r'); R(11, 17, 12, 21, 'g'); R(5, 19, 6, 23, 'w'); R(17, 19, 18, 23, 'w'); // bow tie and shirt
      return done();
    };

    S.ghost = function () {
      fresh();
      E(11.5, 9, 9, 9, '1'); R(2, 9, 21, 20, '1');
      for (var x = 2; x < 22; x++) { var d = Math.round(3 + 2.5 * Math.sin(x * 1.1)); R(x, 20 + ((x * 7) % 3 === 0 ? 1 : 0), x, 21 + d - 2, '1'); } // ragged hem
      E(7.5, 9, 2.5, 3.5, 'k'); E(16.5, 9, 2.5, 3.5, 'k'); M(7, 10, 'e'); M(8, 10, 'e');
      E(11.5, 16, 2.5, 3, 'k');
      M(2, 14, '2'); M(3, 18, '2'); R(5, 5, 8, 5, '2'); P(14, 4, '2');
      return done();
    };

    S.imp = function () {
      fresh();
      ML(3, 0, 6, 6, '2'); ML(4, 0, 7, 6, '2'); ML(2, 1, 5, 7, '2'); ML(3, 2, 6, 8, '2');   // horns
      E(11.5, 13, 8, 8.5, '1');                                        // head
      ML(1, 11, 4, 12, '1'); ML(1, 12, 4, 13, '1'); ML(0, 12, 3, 12, '1'); // pointed ears
      R(5, 9, 18, 9, 'd'); M(7, 11, 'k'); M(8, 11, 'e'); M(9, 11, 'e'); M(8, 10, 'k'); M(9, 10, 'k');
      R(11, 12, 12, 14, 'd'); P(10, 14, 'k'); P(13, 14, 'k');
      R(6, 16, 17, 18, 'k'); M(7, 16, 'w'); M(10, 16, 'w'); M(8, 18, 'w'); P(11, 18, 'w'); P(12, 18, 'w'); // grin with fangs
      R(9, 19, 14, 19, 'r');
      E(11.5, 24, 8, 4, '2'); R(4, 21, 19, 23, '2');
      return done();
    };

    S.golem = function () {
      fresh();
      R(3, 1, 20, 17, '1'); R(1, 17, 22, 23, '2');                     // block head and shoulders
      R(3, 1, 20, 3, '2'); MR(3, 4, 4, 16, '2');                       // gilt trim
      R(6, 8, 17, 10, 'k'); R(7, 9, 16, 9, 'e');                       // glowing visor slit
      R(10, 11, 13, 14, 'd'); R(7, 14, 16, 15, 'k'); for (var i = 8; i < 16; i += 2) P(i, 14, 'g');
      MR(5, 5, 5, 5, 'g'); MR(5, 15, 5, 15, 'g');                      // rivets
      L(14, 2, 12, 7, 'd'); L(7, 11, 5, 14, 'd'); R(4, 19, 19, 20, 'g'); MR(3, 21, 4, 22, 'g');
      return done();
    };

    S.beast = function () {
      fresh();
      MR(3, 2, 6, 9, '1'); MR(4, 1, 5, 2, '1'); P(4, 0, '1'); P(19, 0, '1'); MR(5, 4, 5, 8, '2');   // pricked ears
      E(11.5, 12, 8.5, 7.5, '1');                                      // head
      R(5, 8, 18, 8, 'd'); M(6, 9, 'k'); M(7, 10, 'k'); M(8, 10, 'e'); M(9, 10, 'e'); M(7, 9, 'e');   // angry brow and eyes
      E(11.5, 17, 5.5, 4.5, '2');                                      // muzzle
      R(10, 14, 13, 15, 'k'); P(11, 14, 'w');                          // nose
      R(7, 18, 16, 21, 'k'); R(10, 19, 13, 21, 'r');                   // open mouth and tongue
      R(8, 18, 8, 20, 'w'); R(15, 18, 15, 20, 'w'); R(10, 21, 10, 21, 'w'); R(13, 21, 13, 21, 'w'); R(7, 18, 7, 19, 'w'); R(16, 18, 16, 19, 'w');   // fangs
      E(11.5, 24, 10, 4, '1'); R(2, 22, 21, 23, '1');
      R(11, 3, 12, 6, 'r'); P(11, 2, 'r'); P(12, 1, 'r'); M(9, 5, 'r'); M(8, 4, 'r');   // flame crest
      return done();
    };

    S.watcher = function () {
      fresh();
      E(11.5, 10, 11, 8, 'w');                                         // eyeball
      E(11.5, 10, 6, 6, 'e'); E(11.5, 10, 3, 5, 'k'); P(9, 7, 'w'); P(10, 6, 'w');   // iris and slit pupil
      R(0, 4, 23, 5, '1'); E(11.5, 3, 11, 3, '1'); R(1, 15, 22, 16, '1'); // lids
      var xs = [3, 8, 13, 18];
      xs.forEach(function (x0, i) { for (var y = 17; y < 24; y++) { var sh = Math.round(Math.sin((y + i * 2) * 0.9) * 1.2); R(x0 + sh, y, x0 + sh + 2, y, '2'); if (y % 3 === 0) P(x0 + sh + 1, y, 'w'); } });   // thick tentacles with suckers
      M(3, 9, 'r'); M(4, 11, 'r'); M(2, 11, 'r'); M(5, 13, 'r');         // veins
      return done();
    };
    return S;
  }
