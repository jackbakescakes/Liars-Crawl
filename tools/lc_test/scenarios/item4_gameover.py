#!/usr/bin/env python3
"""Scenario: game-over screens (ART_TODO item 4): Gambler's Ruin (caught), ordinary death, win, fled.
Usage: python3 tools/lc_test/scenarios/item4_gameover.py HTML OUTPREFIX
Writes OUTPREFIX_ruin.png, _dead.png, _won.png, _quit.png."""
import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))
from lc import LC

html, out = sys.argv[1], sys.argv[2]
with LC(html) as lc:
    lc.ev("startRun()"); lc.wait(1000)
    for kind in ('ruin', 'dead', 'won', 'quit'):
        lc.ev("S.endKind='%s'; S.screen='end'; render()" % kind); lc.wait(1500)
        if kind == 'ruin':
            print('body attrs', lc.js("Array.from(document.body.attributes).map(a=>a.name+'='+a.value).join(' ')"))
            print('html attrs', lc.js("Array.from(document.documentElement.attributes).map(a=>a.name+'='+a.value.slice(0,40)).join(' | ')"))
        lc.shot('%s_%s.png' % (out, kind))
    print('errors:', lc.errors or 'none')
