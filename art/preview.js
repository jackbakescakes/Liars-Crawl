const {chromium}=require('playwright');const fs=require('fs');
const src=fs.readFileSync('/home/claude/art/sprites_src.js','utf8');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await b.newPage({viewport:{width:1700,height:1100}});
p.on('pageerror',e=>console.log('ERR',e.message));
const pal=`.art .p1{fill:var(--c1)}.art .p2{fill:var(--c2)}.art .pk{fill:#0d0e13}.art .pw{fill:#efe8d4}.art .pe{fill:var(--eye)}.art .pd{fill:rgba(0,0,0,.35)}.art .pr{fill:#a3141b}.art .pg{fill:#e4c35c}.art .ph{fill:#2b2f3a}
.art .pa{fill:color-mix(in srgb,var(--c1) 62%,#fff)}.art .pb{fill:color-mix(in srgb,var(--c1) 58%,#000)}.art .pc{fill:color-mix(in srgb,var(--c2) 62%,#fff)}.art .pf{fill:color-mix(in srgb,var(--c2) 58%,#000)}.art .px{fill:#fffdf2}.art .pv{fill:#b4a98c}`;
await p.setContent(`<style>body{background:#1a1612;margin:0;display:flex;flex-wrap:wrap;gap:14px;padding:14px;font:11px monospace;color:#ddd}${pal}.box{width:200px}.pt{width:200px;height:200px;background:radial-gradient(circle at 50% 40%,#3a3026,#0e1015 78%);filter:saturate(.62) contrast(1.08) brightness(.88)}svg{width:100%;height:100%;display:block;image-rendering:pixelated}</style><div id=o></div>`);
await p.evaluate(({src})=>{
 eval(src+';window.__S=buildHiSprites();');
 const PAL={'1':'class="p1"','2':'class="p2"','w':'class="pw"','e':'class="pe"','d':'class="pd"','r':'class="pr"','k':'class="pk"','g':'class="pg"','h':'class="ph"','#':'class="pk"','a':'class="pa"','b':'class="pb"','c':'class="pc"','f':'class="pf"','x':'class="px"','v':'class="pv"'};
 function svg(g){const H=g.length,W=g[0].length;const cells=[];for(let y=0;y<H+2;y++){cells.push([]);for(let x=0;x<W+2;x++){const gy=y-1,gx=x-1;const c=(gy>=0&&gy<H&&gx>=0&&gx<W)?g[gy][gx]:'.';cells[y].push(c==='.'?'':c)}}
 const out=cells.map(r=>r.slice());for(let y=0;y<H+2;y++)for(let x=0;x<W+2;x++){if(cells[y][x])continue;if((y>0&&cells[y-1][x])||(y<H+1&&cells[y+1][x])||(x>0&&cells[y][x-1])||(x<W+1&&cells[y][x+1]))out[y][x]='#'}
 let s='';for(let y=0;y<H+2;y++)for(let x=0;x<W+2;x++){const c=out[y][x];if(c)s+=`<rect x="${x}" y="${y}" width="1" height="1" ${PAL[c]||'fill="#f0f"'}/>`}
 return `<svg class="art" viewBox="0 0 ${W+2} ${H+2}" shape-rendering="crispEdges">${s}</svg>`}
 const cols={fighter:['#8f98a8','#5c6577','#f0d24a'],cleric:['#e8c9a0','#d8d0c0','#7fd6ff'],thief:['#d9b48a','#4a3f5a','#f0d24a'],dummy:['#b08a5a','#6b4a2a','#c0302a'],rat:['#8a7a6a','#d9a0a0','#e8c040'],goblin:['#6aa84f','#3d6b2e','#f0d24a'],skull:['#d8d0b8','#8a826e','#ff5a3c'],hood:['#4a3a6a','#2a2038','#b684ff'],ogre:['#9a7a5a','#5a4a3a','#f0d24a'],chest:['#8a5a2a','#5a3a1a','#ff5a3c'],dealer:['#e8dcc8','#2a1a1a','#c0302a'],ghost:['#9ab0c8','#6a8098','#7fd6ff'],imp:['#c0302a','#6a1a1a','#f0d24a'],golem:['#a0a0b0','#c9a43c','#ff8a3c'],beast:['#6a3a2a','#3a2018','#ff7a1a'],watcher:['#9a5a8a','#5a2a5a','#f0d24a']};
 const o=document.getElementById('o');o.style.display='contents';
 Object.keys(window.__S).forEach(k=>{const g=window.__S[k]();const c=cols[k]||['#888','#bbb','#f0d24a'];const d=document.createElement('div');d.className='box';d.innerHTML=`<div class=pt style="--c1:${c[0]};--c2:${c[1]};--eye:${c[2]}">${svg(g)}</div>${k}`;o.appendChild(d)});
},{src});
await p.screenshot({path:'/tmp/claude-0/sprites.png'});await b.close()})();
