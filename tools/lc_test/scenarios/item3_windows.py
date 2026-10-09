#!/usr/bin/env python3
"""Scenario: the five utility windows (ART_TODO item 3): Settings, Rules, Jukebox, Map key, Web of Bones.
Usage: python3 tools/lc_test/scenarios/item3_windows.py HTML OUTPREFIX
Writes OUTPREFIX_settings.png, _rules.png, _jukebox.png, _key.png, _web.png and prints console errors."""
import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))
from lc import LC

html, out = sys.argv[1], sys.argv[2]
with LC(html) as lc:
    lc.ev("startRun()"); lc.wait(1200)
    # settings -> rules -> jukebox
    lc.click('#cog', force=True); lc.wait(700); lc.shot(out + '_settings.png')
    lc.click('#rulesBtn', force=True); lc.wait(700); lc.shot(out + '_rules.png')
    lc.click('#rulesClose', force=True); lc.wait(400)
    lc.click('#jukeBtn', force=True); lc.wait(700); lc.shot(out + '_jukebox.png')
    lc.click('#jukeClose', force=True); lc.wait(300)
    lc.click('#setClose', force=True); lc.wait(300)
    # map key
    lc.ev("openKey()"); lc.wait(700); lc.shot(out + '_key.png')
    lc.js("(function(){var x=document.querySelector('.keybox .winx'); if(x) x.click();})()"); lc.wait(300)
    # web of bones
    try:
        lc.ev("openWeb && openWeb()"); lc.wait(900); lc.shot(out + '_web.png')
    except Exception as e:
        print('web failed:', str(e)[:200])
    print('errors:', lc.errors or 'none')
