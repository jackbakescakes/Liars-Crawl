"""Pull the enemy-AI engine block out of the game so the node sims test the live code.
usage: python3 tools/ai/extract_engine.py [/home/claude/liars-crawl.html]  -> writes tools/ai/engine3.js"""
import sys, os, re
src_path = sys.argv[1] if len(sys.argv) > 1 else '/home/claude/liars-crawl.html'
s = open(src_path, encoding='utf-8').read()
a = s.index('// ===== ENGINE START =====')
b = s.index('// ===== ENGINE END =====') + len('// ===== ENGINE END =====')
block = s[a:b]
out = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'engine3.js')
open(out, 'w', encoding='utf-8').write(block + '\n')
print('wrote', out, len(block), 'bytes')
