#!/usr/bin/env python3
"""Scenario: render ITEM_ART icons (relics, cards, seals) big on a dark swatch, via the debug hook.
Usage: python3 tools/lc_test/scenarios/icons_preview.py HTML OUT.png id1,id2,...
Shows what a given id looks like wherever itemArt(id) is used (relic drawer, shop, chest rewards)."""
import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))
from lc import LC

html, out, ids = sys.argv[1], sys.argv[2], sys.argv[3].split(',')
with LC(html) as lc:
    lc.ev("startRun()"); lc.wait(800)
    lc.js("(ids => { const d = document.createElement('div'); d.id = 'icontest';"
          "d.style.cssText = 'position:fixed;left:0;top:0;z-index:99999;display:flex;gap:16px;padding:16px;background:#3a3a3a;';"
          "ids.forEach(i => { const w = document.createElement('div'); w.style.cssText = 'width:200px;height:200px;';"
          "w.innerHTML = (window.__dbg.ev('ITEM_ART[\"' + i + '\"]') || '(none)'); d.appendChild(w); });"
          "document.body.appendChild(d); })(" + str(ids).replace("'", '"') + ")")
    lc.wait(500)
    lc.shot(out, '#icontest')
    print('errors:', lc.errors or 'none')
