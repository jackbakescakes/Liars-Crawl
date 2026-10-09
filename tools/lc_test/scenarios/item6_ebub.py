#!/usr/bin/env python3
"""Scenario: enemy thinking bubble + bid die (ART_TODO item 6). Usage: item6_ebub.py HTML OUTPREFIX -> _bub.png"""
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
    lc.wait(1500); lc.click('.fxcoin', force=True); lc.wait(7500); lc.ev("doRoll()"); lc.wait(4500)
    lc.js("(function(){var b=Array.from(document.querySelectorAll('button,div,span,a')).filter(function(e){return e.children.length===0&&/Skip the tutorial/i.test(e.textContent)})[0];if(b)b.click();})()"); lc.wait(1000)
    lc.ev("ebidThink()"); lc.wait(700)
    lc.page.screenshot(path=out + '_bub.png', clip={'x': 340, 'y': 0, 'width': 420, 'height': 180})
    print('errors:', lc.errors or 'none')
