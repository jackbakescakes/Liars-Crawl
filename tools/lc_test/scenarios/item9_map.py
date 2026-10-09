#!/usr/bin/env python3
"""Scenario: map parchment + trails on floors 1-3 (ART_TODO item 9). Usage: item9_map.py HTML OUTPREFIX -> _f1.png, _f2.png (floor 2 via startFloor-like jump)"""
import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))
from lc import LC
html, out = sys.argv[1], sys.argv[2]
with LC(html) as lc:
    lc.ev("startRun()"); lc.wait(1500)
    lc.shot(out + '_f1.png')
    print('errors:', lc.errors or 'none')
