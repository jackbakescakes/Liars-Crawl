#!/usr/bin/env python3
"""Make a DEBUG copy of the game that exposes its internals to test scripts.

The whole game lives in one big IIFE (`(function () { ... })();`, the last script in
the page), so S, C, startCombat, render, ENEMIES ... are not reachable from outside.
This writes a copy with one line inserted just before the IIFE closes:

    window.__dbg = { ev: function (code) { return eval(code); } };

`__dbg.ev("S.screen")` then evaluates `code` INSIDE the game's scope (direct eval), so
tests can read/set S and C and call any game function. The real game file is never
modified; only the copy is.

Usage: python3 tools/lc_test/mkdbg.py IN.html OUT.html
LC() in lc.py does this automatically (debug=True, the default).
"""
import sys

HOOK = "\n  window.__dbg = { ev: function (code) { return eval(code); } };\n"


def make(src, dst):
    s = open(src, encoding='utf-8').read()
    end = s.rfind('})();\n</script>')
    if end < 0:
        end = s.rfind('})();')
    if end < 0:
        raise SystemExit('could not find the end of the main IIFE')
    s = s[:end] + HOOK + s[end:]
    open(dst, 'w', encoding='utf-8').write(s)


if __name__ == '__main__':
    if len(sys.argv) != 3:
        raise SystemExit(__doc__)
    make(sys.argv[1], sys.argv[2])
    print('wrote', sys.argv[2])
