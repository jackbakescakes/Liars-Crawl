#!/usr/bin/env python3
"""Scenario: coin toss faces + buck marker (ART_TODO item 1).
Usage: python3 tools/lc_test/scenarios/item1_toss_buck.py HTML OUTPREFIX
Writes OUTPREFIX_gun.png, _skull.png, _buckmark.png and prints console errors."""
import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))
from lc import LC

html, out = sys.argv[1], sys.argv[2]
with LC(html) as lc:
    lc.ev("startRun()"); lc.wait(800)
    lc.ev("(function(){var n=S.floor.nodes.filter(function(n){return n.enemy&&n.type==='fight'})[0]; S.cur=n.id; startCombat(n);})()")
    for _ in range(20):
        lc.wait(500)
        if lc.js("!!document.querySelector('.fxcoin')"): break
    lc.wait(1500)
    lc.js("(function(){var c=document.querySelector('.fxcoin');c.style.animation='none';c.style.transform='rotateX(180deg)';})()")
    lc.wait(400); lc.shot(out + '_skull.png', '.fxcoinw')
    lc.js("(function(){var c=document.querySelector('.fxcoin');c.style.transform='none';})()")
    lc.wait(300); lc.shot(out + '_gun.png', '.fxcoinw')
    lc.click('.fxcoin', force=True); lc.wait(7500)
    lc.ev("doRoll()"); lc.wait(4500)
    lc.shot(out + '_buckmark.png', '#buckmark')
    print('errors:', lc.errors or 'none')
