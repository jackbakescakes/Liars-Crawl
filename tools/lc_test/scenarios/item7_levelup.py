#!/usr/bin/env python3
"""Scenario: level-up window with its ability cards (ART_TODO item 7). Usage: item7_levelup.py HTML OUTPREFIX -> _lvl.png"""
import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))
from lc import LC
html, out = sys.argv[1], sys.argv[2]
with LC(html) as lc:
    lc.ev("startRun()"); lc.wait(800)
    lc.ev("S.player.level=2; S.pending=1; openLevelUp()"); lc.wait(5500)
    lc.shot(out + '_lvl.png')
    print('errors:', lc.errors or 'none')
