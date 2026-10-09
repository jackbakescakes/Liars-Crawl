const A=require('./arena.js'); const fs=require('fs');
const WF=process.env.W||'W.json'; if(fs.existsSync(__dirname+'/'+WF)) A.useW(JSON.parse(fs.readFileSync(__dirname+'/'+WF,'utf8')));
const N=+process.argv[2]||300, mode=process.argv[3]||'curve';
function row(name,res){ console.log(name.padEnd(46), 'p wins', String(res.pWin).padStart(5)+'% ±'+res.se, ' rounds', res.rounds, ' ms', JSON.stringify(res.msPerFight), ' bluff%', JSON.stringify(res.bluffRate)); }
if(mode==='curve'){
  for(const s of [0,0.15,0.3,0.4,0.52,0.62,0.72,0.82,0.9,1]){
    row('honest 6 vs new'+s+' x3', A.series({p:A.honest(),e:A.newAI(s)},{p:6,e:3},N));
    row('honest 6 vs old'+s+' x3', A.series({p:A.honest(),e:A.oldAI(s)},{p:6,e:3},N));
  }
}
if(mode==='exploit'){
  const foes=[['new1 adapt',A.newAI(1)],['new1 no-adapt',A.newAI(1,{adapt:0})],['old0.99',A.oldAI(0.99)]];
  const pols=[['honest',A.honest()],['one-under',A.honest({under:1})],['caller .45/.35',A.honest({liar:0.45,exact:0.35})],['timid .15',A.honest({liar:0.15,exact:0.6})],['bluffer',A.bluffer()],['random',A.randomPol()]];
  for(const [fn,f] of foes) for(const [pn,p] of pols) row(pn+' (p,6) vs '+fn+' (e,4)', A.series({p,e:f},{p:6,e:4},N));
}
if(mode==='self'){
  row('new1 vs new1 6v6', A.series({p:A.newAI(1),e:A.newAI(1)},{p:6,e:6},N));
  row('new1 vs new1 4v4', A.series({p:A.newAI(1),e:A.newAI(1)},{p:4,e:4},N));
  row('new1 vs new1 no-adapt 6v6', A.series({p:A.newAI(1),e:A.newAI(1,{adapt:0})},{p:6,e:6},N));
  row('new1 gull.6 vs new1 6v6', A.series({p:A.newAI(1,{gull:0.6}),e:A.newAI(1)},{p:6,e:6},N));
  row('new1 gull0 vs new1 6v6', A.series({p:A.newAI(1,{gull:0}),e:A.newAI(1)},{p:6,e:6},N));
  row('new1 read.5 vs new1 6v6', A.series({p:A.newAI(1,{read:0.5}),e:A.newAI(1)},{p:6,e:6},N));
  row('new1 read1.5 vs new1 6v6', A.series({p:A.newAI(1,{read:1.5}),e:A.newAI(1)},{p:6,e:6},N));
  row('new1 bluff0 vs new1 6v6', A.series({p:A.newAI(1,{bluff:0}),e:A.newAI(1)},{p:6,e:6},N));
  row('new1 bluff.3 vs new1 6v6', A.series({p:A.newAI(1,{bluff:0.3}),e:A.newAI(1)},{p:6,e:6},N));
  row('new1 reach5 vs new1 6v6', A.series({p:A.newAI(1,{reach:5}),e:A.newAI(1)},{p:6,e:6},N));
}

if(mode==='variants'){
  const base=()=>A.newAI(1);
  const V=[['callLeaf .6',{opp:{callLeaf:0.6}}],['callLeaf .3',{opp:{callLeaf:0.3}}],['gull .6',{opp:{gull:0.6}}],['gull .1',{opp:{gull:0.1}}],['beta 6',{opp:{beta:6}}],['beta 2.5',{opp:{beta:2.5}}],['eps .2',{opp:{eps:0.2}}],['oppReach 3',{opp:{reach:3}}],['hands 600',{hands:600}],['hands 300',{hands:300}]];
  for(const [name,o] of V){ const v=A.newAI(1,null,o); row(name+' (p) vs base (e) 6v6', A.series({p:v,e:base()},{p:6,e:6},N)); row('base (p) vs '+name+' (e) 6v6', A.series({p:base(),e:v},{p:6,e:6},N)); }
}
if(mode==='variants2'){
  // against the human heuristics instead of self-play: which settings beat people?
  const V=[['base',{}],['callLeaf .6',{opp:{callLeaf:0.6}}],['gull .6',{opp:{gull:0.6}}],['gull .1',{opp:{gull:0.1}}],['beta 6',{opp:{beta:6}}],['beta 2.5',{opp:{beta:2.5}}],['eps .2',{opp:{eps:0.2}}]];
  for(const [name,o] of V){ const v=A.newAI(1,null,o); row('honest 6 vs '+name+' x4', A.series({p:A.honest(),e:v},{p:6,e:4},N)); row('caller 6 vs '+name+' x4', A.series({p:A.honest({liar:0.45,exact:0.35}),e:v},{p:6,e:4},N)); row('old0.99 6 vs '+name+' x4', A.series({p:A.oldAI(0.99),e:v},{p:6,e:4},N)); }
}
