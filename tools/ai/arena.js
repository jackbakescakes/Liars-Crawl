// arena: node simulator for the enemy AI. First run `python3 tools/ai/extract_engine.py` to pull the live engine out of the game (engine3.js).
// Fights between policies under the game's rules (loser opens; Liar costs 1; Spot On costs the bidder 2, or the player's crit; wrong Spot On costs the caller 1)
const fs=require('fs');
function load(file, extra){ const src=fs.readFileSync(__dirname+'/'+file,'utf8'); const mod={}; (new Function('mod', src+'\n'+extra))(mod); return mod; }
const OLD=load('engine_old.js','mod.aiDecide=aiDecide; mod.aiParams=aiParams; mod.countFace=countFace; mod.binomTail=binomTail; mod.binomPmf=binomPmf; mod.isLegalBid=isLegalBid;');
const NEW=load('engine3.js','mod.aiDecide=aiDecide; mod.aiParams=aiParams; mod.aiLearnNew=aiLearnNew; mod.aiLearnRound=aiLearnRound; mod.countFace=countFace; mod.binomTail=binomTail; mod.binomPmf=binomPmf; mod.isLegalBid=isLegalBid; mod.setW=function(d){AI_W_DATA=d; AI_W=null;}; mod.AI_TUNE=AI_TUNE; mod.AI_OPP=AI_OPP; mod.last=function(){return AI_LAST;};');
const {countFace,binomTail,binomPmf,isLegalBid}=NEW;
let CURW=null; function useW(d){ CURW=d; NEW.setW(d); }
function rnd(n){return Math.floor(Math.random()*n);}
function roll(n){const a=[];for(let i=0;i<n;i++)a.push(1+rnd(6));return a;}
function cnt(d){const c=[0,0,0,0,0,0,0]; d.forEach(v=>{ if(v===0){for(let f=1;f<=6;f++)c[f]++;} else c[v]++; }); return c;}
function best(c){let f=1; for(let i=2;i<=6;i++) if(c[i]>=c[f]) f=i; return f;}
// ---- policies: (ctx) -> action. ctx = { own, oppN, bid, hist, mine:'p'|'e', myN, oppHP, crit, oppCrit, total, learn, canExact }
function newAI(skill, knobs, opts={}){
  let E=NEW;
  if(opts.opp||opts.W){ E=load('engine3.js','mod.aiDecide=aiDecide; mod.aiParams=aiParams; mod.aiLearnNew=aiLearnNew; mod.aiLearnRound=aiLearnRound; mod.countFace=countFace; mod.setW=function(d){AI_W_DATA=d; AI_W=null;}; mod.AI_OPP=AI_OPP; mod.last=function(){return AI_LAST;};'); if(opts.opp) Object.assign(E.AI_OPP, opts.opp); E.setW(opts.W||CURW); }
  const P=E.aiParams(skill, knobs||null); if(opts.hands) P.hands=opts.hands;
  const pol=(x)=>E.aiDecide({ own:x.own, seen:[], oppN:x.oppN, bid:x.bid, hist:x.hist, P:P, skill:P.skill, canExact:true, crit:x.crit, oppCrit:x.oppCrit, oppLiarDmg:1, myN:x.myN, oppHP:x.oppHP, learn:x.learn, trace:!!opts.trace });
  pol.learns=true; pol.name='new'+skill+(knobs?JSON.stringify(knobs):''); return pol;
}
function oldAI(skill){
  const P=OLD.aiParams(skill, null);
  const pol=(x)=>{ const ob=x.hist.filter(b=>b.by==='p').map(b=>b.face); return OLD.aiDecide({ own:x.own, oppN:x.oppN, bid:x.bid, oppBids:ob, skill:P.skill, P:P, canExact:true, critDmg:x.crit, dummy:false }); };
  pol.name='old'+skill; return pol;
}
function legal(prev,q,f,total){ return isLegalBid(prev,q,f,total); }
// honest: open with the exact count of the best face; call Liar under 30%; Spot On over 45%; else the likeliest raise within +2
function honest(opts={}){
  const liarThr=opts.liar||0.3, exThr=opts.exact||0.45, under=opts.under||0;
  const pol=(x)=>{
    const c=cnt(x.own), total=x.total, bid=x.bid, n=x.oppN;
    if(!bid){const f=best(c); return {type:'bid',qty:Math.max(1,c[f]-under),face:f};}
    const pt=binomTail(n,1/6,bid.qty-c[bid.face]), pe=binomPmf(n,1/6,bid.qty-c[bid.face]);
    if(pe>exThr&&bid.qty>=2) return {type:'exact'};
    if(pt<liarThr) return {type:'liar'};
    let bq=null;
    for(let q=bid.qty;q<=Math.min(total,bid.qty+2);q++) for(let f=1;f<=6;f++){ if(!legal(bid,q,f,total)) continue; const p=binomTail(n,1/6,q-c[f]); if(p>0.5&&(!bq||p>bq.p)) bq={qty:q,face:f,p:p}; }
    if(bq) return {type:'bid',qty:bq.qty,face:bq.face};
    return pt<0.5?{type:'liar'}:{type:'bid',qty:bid.qty+1,face:best(c)};
  };
  pol.name='honest'+JSON.stringify(opts); return pol;
}
// bluffer: opens count+1 on the best face, keeps raising by one on its best face, calls Liar only when very sure
function bluffer(){
  const pol=(x)=>{
    const c=cnt(x.own), total=x.total, bid=x.bid, f=best(c), n=x.oppN;
    if(!bid) return {type:'bid',qty:Math.min(total,c[f]+1),face:f};
    const pt=binomTail(n,1/6,bid.qty-c[bid.face]);
    if(pt<0.15) return {type:'liar'};
    const q=bid.qty+(f>bid.face?0:1); if(q>total) return {type:'liar'};
    return {type:'bid',qty:q,face:f};
  };
  pol.name='bluffer'; return pol;
}
function randomPol(){
  const pol=(x)=>{ const total=x.total, bid=x.bid; const opts=[]; if(bid){opts.push({type:'liar'});opts.push({type:'exact'});}
    for(let q=bid?bid.qty:1;q<=Math.min(total,(bid?bid.qty:0)+2);q++) for(let f=1;f<=6;f++) if(legal(bid,q,f,total)) opts.push({type:'bid',qty:q,face:f});
    return opts[rnd(opts.length)]; };
  pol.name='random'; return pol;
}
// ---- one fight. sides: {p: policy, e: policy}; dice: {p, e}; crit: {p, e}. Returns {win:'p'|'e', rounds, pn, en, ms:{p,e}}
function fight(sides, dice, crit={p:2,e:2}, opts={}){
  let pn=dice.p, en=dice.e, opener=opts.opener||(Math.random()<0.5?'p':'e'), rounds=0;
  let shield=opts.shield||0;   // player armour at fight start: each point blocks 1 damage of one hit (the game's C.shield)
  const learn={p: sides.p.learns?NEW.aiLearnNew():null, e: sides.e.learns?NEW.aiLearnNew():null};
  const ms={p:0,e:0}, calls={p:0,e:0}, caught={p:0,e:0}, exacts={p:0,e:0}, bluffs={p:0,e:0}, bids={p:0,e:0};
  while(pn>0&&en>0&&rounds<300){
    rounds++;
    const pd=roll(pn), ed=roll(en); let bid=null, turn=opener, hist=[]; let loser=null, dmg=1, callBy=null, callKind=null;
    for(let t=0;t<200;t++){
      const me=turn, other=me==='p'?'e':'p';
      const own=me==='p'?pd:ed, oppN=me==='p'?en:pn, myN=me==='p'?pn:en, oppHP=me==='p'?en:pn;
      // the engine always calls itself 'e' and its opponent 'p': relabel this round's bids from the mover's side
      const hist2=hist.map(b=>({by: b.by===me?'e':'p', qty:b.qty, face:b.face})), bid2=bid?{qty:bid.qty,face:bid.face,by:bid.by===me?'e':'p'}:null;
      const x={ own, oppN, bid:bid2, hist:hist2, mine:me, myN, oppHP, crit:crit[me], oppCrit:crit[other], total:pn+en, learn:learn[me], canExact:true };
      const t0=process.hrtime.bigint(); const a=sides[me](x); ms[me]+=Number(process.hrtime.bigint()-t0)/1e6;
      if(a.type==='bid'){ if(!legal(bid,a.qty,a.face,pn+en)) throw new Error('illegal bid by '+me+' '+JSON.stringify(a)+' prev '+JSON.stringify(bid)); bid={qty:a.qty,face:a.face,by:me}; hist.push({by:me,qty:a.qty,face:a.face}); bids[me]++; if(cnt(own)[a.face]===0) bluffs[me]++; turn=other; continue; }
      if(!bid) throw new Error('call without bid by '+me);
      const actual=countFace(pd.concat(ed),bid.face); callBy=me; callKind=a.type; calls[me]++;
      if(a.type==='liar'){ const ok=actual>=bid.qty; loser=ok?me:bid.by; dmg=1; if(!ok) caught[me]++; }
      else { const ok=actual===bid.qty; if(ok){ loser=bid.by; dmg=crit[me]; exacts[me]++; } else { loser=me; dmg=1; } }
      break;
    }
    if(loser==null) throw new Error('round did not end');
    // learning from the revealed round
    for(const side of ['p','e']){ if(!learn[side]) continue; const other=side==='p'?'e':'p'; NEW.aiLearnRound(learn[side], { hist: hist.map(b=>({by: b.by===side?'e':'p', qty:b.qty, face:b.face})), theirVals: other==='p'?pd:ed, myVals: side==='p'?pd:ed, peeked:[], total:pn+en, critP:crit[other], callBy: callBy===side?'e':'p', callKind }); }
    if(loser==='p' && opts.eplus && !(callKind==='exact' && callBy==='p' && loser==='p')) dmg+=opts.eplus;   // enemy hits harder (like the game's berserk: not on your own wrong Spot On)
    if(loser==='p' && shield>0 && dmg>0){ shield--; dmg--; }
    if(loser==='p') pn-=dmg; else en-=dmg;
    opener=loser;
  }
  return { win: pn>0?'p':'e', rounds, pn:Math.max(0,pn), en:Math.max(0,en), ms, calls, caught, exacts, bluffs, bids };
}
function series(sides, dice, N, crit, opts){
  let w=0, r=0, msP=0, msE=0, decP=0, decE=0, blP=0, bdP=0, blE=0, bdE=0;
  for(let i=0;i<N;i++){ const f=fight(sides,dice,crit,opts); if(f.win==='p') w++; r+=f.rounds; msP+=f.ms.p; msE+=f.ms.e; blP+=f.bluffs.p; bdP+=f.bids.p; blE+=f.bluffs.e; bdE+=f.bids.e; }
  const se=Math.sqrt((w/N)*(1-w/N)/N);
  return { pWin:+(w/N*100).toFixed(1), se:+(se*100).toFixed(1), rounds:+(r/N).toFixed(1), msPerFight:{p:+(msP/N).toFixed(1), e:+(msE/N).toFixed(1)}, bluffRate:{p:+(blP/Math.max(1,bdP)*100).toFixed(0), e:+(blE/Math.max(1,bdE)*100).toFixed(0)} };
}
module.exports={useW,NEW,OLD,newAI,oldAI,honest,bluffer,randomPol,fight,series,roll,cnt};
