#!/usr/bin/env python3
"""Headless test harness for Liar's Crawl (single-file HTML game).

Why: the game is one 15 MB+ HTML file with base64 art. You test it by serving it
over http (NOT file://, canvas reads and some APIs misbehave) and driving headless
Chromium with Playwright. This module does both and records console errors.

Quick CLI (see tools/lc_test/README.md for more):
  python3 tools/lc_test/lc.py shot OUT.png [--html /home/claude/liars-crawl.html]
         [--js "window.someFn()"] [--wait 1500] [--selector "#buckmark"] [--w 1376 --h 768]
  python3 tools/lc_test/lc.py eval "document.title"

From Python:
  import sys; sys.path.insert(0, 'tools/lc_test')
  from lc import LC
  with LC('/home/claude/liars-crawl.html') as lc:
      lc.js("startRun && 1")          # run any JS in the page
      lc.shot('/tmp/x.png')           # screenshot (viewport)
      print(lc.errors)                # console errors + page errors so far
"""
import argparse, http.server, os, shutil, socketserver, sys, tempfile, threading, time
from functools import partial

VIEW_W, VIEW_H = 1376, 768  # the game's native stage size ("playable with no scrolling")


class _Quiet(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *a):
        pass


class LC:
    def __init__(self, html='/home/claude/liars-crawl.html', port=8765, query='?nointro',
                 w=VIEW_W, h=VIEW_H, chromium_path=None, debug_port=9222, debug=True):
        self.html, self.port, self.query, self.w, self.h = html, port, query, w, h
        self.debug = debug
        self.chromium_path, self.debug_port = chromium_path, debug_port
        self.errors, self.logs = [], []
        self._dir = None

    # -- lifecycle ---------------------------------------------------------
    def __enter__(self):
        self.start(); return self

    def __exit__(self, *a):
        self.stop()

    def start(self):
        from playwright.sync_api import sync_playwright
        self._dir = tempfile.mkdtemp(prefix='lc_serve_')
        # test copy served as index.html. With debug=True (default) one line is added
        # that exposes window.__dbg.ev(code) = eval inside the game's closure (mkdbg.py).
        dst = os.path.join(self._dir, 'index.html')
        if self.debug:
            sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
            import mkdbg
            mkdbg.make(self.html, dst)
        else:
            shutil.copyfile(self.html, dst)
        # the game loads music/sfx from ./audio/ (kept out of the HTML); link the repo's folder in
        here = os.path.dirname(os.path.abspath(__file__))
        for cand in (os.path.join(here, '..', '..', 'audio'), os.path.join(os.path.dirname(self.html), 'audio')):
            if os.path.isdir(cand) and not os.path.exists(os.path.join(self._dir, 'audio')):
                os.symlink(os.path.abspath(cand), os.path.join(self._dir, 'audio'))
        handler = partial(_Quiet, directory=self._dir)
        socketserver.TCPServer.allow_reuse_address = True
        self._srv = socketserver.TCPServer(('127.0.0.1', self.port), handler)
        threading.Thread(target=self._srv.serve_forever, daemon=True).start()
        self._pw = sync_playwright().start()
        kw = dict(headless=True, args=[f'--remote-debugging-port={self.debug_port}',
                                       '--autoplay-policy=no-user-gesture-required'])
        if self.chromium_path:
            kw['executable_path'] = self.chromium_path
        self.browser = self._pw.chromium.launch(**kw)
        self.ctx = self.browser.new_context(viewport={'width': self.w, 'height': self.h})
        self.page = self.ctx.new_page()
        # skip the first-visit welcome note and the cog pulse (CLAUDE.md "Opening sequence")
        self.page.add_init_script("try{localStorage.setItem('lc_welcome','1');localStorage.setItem('lc_ptkseen','1');}catch(e){}")
        self.page.on('console', lambda m: self._on_console(m))
        self.page.on('response', lambda r: self.errors.append(f'HTTP {r.status}: {r.url[:120]}') if r.status >= 400 else None)
        self.page.on('pageerror', lambda e: self.errors.append('PAGEERROR: ' + str(e)))
        self.page.goto(f'http://127.0.0.1:{self.port}/index.html{self.query}', wait_until='load')
        self.page.wait_for_timeout(1500)

    def _on_console(self, m):
        self.logs.append(f'{m.type}: {m.text}')
        if m.type == 'error':
            self.errors.append('console.error: ' + m.text)

    def stop(self):
        try:
            self.browser.close(); self._pw.stop(); self._srv.shutdown()
        finally:
            if self._dir:
                shutil.rmtree(self._dir, ignore_errors=True)

    # -- helpers -----------------------------------------------------------
    def js(self, code):
        """Evaluate an expression (or statements wrapped in an IIFE) in the page."""
        return self.page.evaluate(code)

    def ev(self, code):
        """Evaluate JS INSIDE the game's closure (needs debug=True). e.g. lc.ev('S.screen')."""
        return self.page.evaluate('c => window.__dbg.ev(c)', code)

    def wait(self, ms):
        self.page.wait_for_timeout(ms)

    def shot(self, path, selector=None):
        if selector:
            # clip the viewport screenshot to the element's box (element.screenshot() waits for
            # animations to settle and times out on the pulsing/flipping UI)
            bb = self.page.evaluate(
                "s => { const e = document.querySelector(s); if (!e) return null;"
                " const r = e.getBoundingClientRect(); return {x:r.x,y:r.y,width:r.width,height:r.height}; }", selector)
            if not bb:
                raise RuntimeError('selector not found: ' + selector)
            pad = 12
            clip = {'x': max(0, bb['x'] - pad), 'y': max(0, bb['y'] - pad),
                    'width': bb['width'] + 2 * pad, 'height': bb['height'] + 2 * pad}
            self.page.screenshot(path=path, clip=clip)
        else:
            self.page.screenshot(path=path)
        return path

    def click(self, selector, **kw):
        self.page.locator(selector).first.click(**kw)


def main():
    ap = argparse.ArgumentParser()
    sub = ap.add_subparsers(dest='cmd', required=True)
    s = sub.add_parser('shot'); s.add_argument('out')
    e = sub.add_parser('eval'); e.add_argument('code')
    for p in (s, e):
        p.add_argument('--html', default='/home/claude/liars-crawl.html')
        p.add_argument('--query', default='?nointro')
        p.add_argument('--js', default=None, help='JS to run before the shot/eval')
        p.add_argument('--wait', type=int, default=1500)
        p.add_argument('--w', type=int, default=VIEW_W); p.add_argument('--h', type=int, default=VIEW_H)
        p.add_argument('--chromium', default=None, help='path to a chromium binary if Playwright has none')
    s.add_argument('--selector', default=None)
    a = ap.parse_args()
    with LC(a.html, query=a.query, w=a.w, h=a.h, chromium_path=a.chromium) as lc:
        if a.js:
            r = lc.js(a.js)
            if r is not None:
                print('js ->', r)
        lc.wait(a.wait)
        if a.cmd == 'shot':
            print('saved', lc.shot(a.out, a.selector))
        else:
            print(lc.js(a.code))
        print('errors:', lc.errors if lc.errors else 'none')


if __name__ == '__main__':
    main()
