#!/usr/bin/env python3
"""Scenario: map with an elite star badge and the boss badge (ART_TODO item 8).
Usage: item8_map_badges.py HTML OUTPREFIX [FLOOR] -> _elite.png and _boss.png (whole screen)
The tall map follows the pawn, so the scenario moves the pawn (S.cur) to the NEAREST OTHER node so it does not cover the badge it wants to show.
FLOOR (default 1) is the floor number: 1 Dealer, 2 Croupier, 3 Pit Boss, 4 House (via S.floorNum / startFloor if present)."""
import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))
from lc import LC
html, out = sys.argv[1], sys.argv[2]
with LC(html) as lc:
    lc.ev("startRun()"); lc.wait(1200)
    for kind, js in (('elite', "S.floor.nodes.filter(function(n){return n.star&&n.tier===1&&n.type!=='event'})[0]||S.floor.nodes.filter(function(n){return n.tier===1})[0]"),
                     ('boss', "S.floor.nodes.filter(function(n){return n.type==='boss'})[0]")):
        nid = lc.ev("(function(){var n=" + js + "; if(!n) return null; var o=S.floor.nodes.filter(function(m){return m.id!==n.id}).sort(function(a,b){return Math.hypot(a.x-n.x,(a.y-n.y)*1.5)-Math.hypot(b.x-n.x,(b.y-n.y)*1.5)})[0]; S.cur=o.id; render(); return n.id;})()")
        print(kind, 'node', nid)
        lc.wait(1500)
        lc.shot('%s_%s.png' % (out, kind))
    print('errors:', lc.errors or 'none')
