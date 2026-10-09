// measure one-round outcome probabilities for the new AI vs itself at full skill, per (opener, m, n) cell; then solve the win table by DP.
// usage: node wtable.js work <cellsFrom> <cellsTo> <R> <winfile|none> <out.json>   |   node wtable.js solve <merged counts.json...> -> prints table
const A=require('./arena.js'); const fs=require('fs');
const MAX=12;
function cells(){ const c=[]; for(let o=0;o<2;o++) for(let m=1;m<=MAX;m++) for(let n=1;n<=MAX;n++) c.push([o,m,n]); return c; }
if(process.argv[2]==='work'){
  const [from,to,R]=process.argv.slice(3,6).map(Number); const wf=process.argv[6], out=process.argv[7];
  if(wf&&wf!=='none') A.NEW.setW(JSON.parse(fs.readFileSync(wf,'utf8')));
  const P=A.NEW.aiParams(1,{adapt:0}); P.hands=600;
  const pol=(x)=>A.NEW.aiDecide({ own:x.own, seen:[], oppN:x.oppN, bid:x.bid, hist:x.hist, P:P, skill:1, canExact:true, crit:2, oppCrit:2, oppLiarDmg:1, myN:x.myN, oppHP:x.oppHP, learn:null });
  const res={};
  const cs=process.argv[8]==='small' ? cells().filter(c=>c[1]<=5&&c[2]<=5).slice(from,to) : cells().slice(from,to);
  for(const [o,m,n] of cs){
    // side A has m dice; the player (side B) has n; o=1 means B opens
    const k={a1:0,a2:0,b1:0,b2:0};
    for(let r=0;r<R;r++){
      const ad=A.roll(m), bd=A.roll(n); let bid=null, turn=o?'b':'a', hist=[];
      for(let t=0;t<100;t++){
        const me=turn, other=me==='a'?'b':'a', own=me==='a'?ad:bd, oppN=me==='a'?n:m, myN=me==='a'?m:n, oppHP=me==='a'?n:m;
        const hist2=hist.map(b=>({by:b.by===me?'e':'p',qty:b.qty,face:b.face})), bid2=bid?{qty:bid.qty,face:bid.face,by:bid.by===me?'e':'p'}:null;
        const act=pol({own,oppN,bid:bid2,hist:hist2,myN,oppHP});
        if(act.type==='bid'){ bid={qty:act.qty,face:act.face,by:me}; hist.push({by:me,qty:act.qty,face:act.face}); turn=other; continue; }
        const actual=A.NEW.countFace(ad.concat(bd),bid.face); let loser,dmg;
        if(act.type==='liar'){ const ok=actual>=bid.qty; loser=ok?me:bid.by; dmg=1; } else { const ok=actual===bid.qty; if(ok){loser=bid.by;dmg=2;} else {loser=me;dmg=1;} }
        k[loser+dmg]++; break;
      }
    }
    res[o+','+m+','+n]=k; process.stderr.write('.');
  }
  fs.writeFileSync(out, JSON.stringify(res));
} else if(process.argv[2]==='solve'){
  const counts={}; for(const f of process.argv.slice(3)){ Object.assign(counts, JSON.parse(fs.readFileSync(f,'utf8'))); }
  const W=[[],[]]; function w(o,m,n){ if(m<=0) return 0; if(n<=0) return 1; return W[o][m][n]; }
  for(let o=0;o<2;o++) for(let m=0;m<=MAX;m++){ W[o][m]=[]; for(let n=0;n<=MAX;n++) W[o][m][n]=0; }
  for(let s=2;s<=2*MAX;s++) for(let m=1;m<=MAX;m++){ const n=s-m; if(n<1||n>MAX) continue; for(let o=0;o<2;o++){ const k=counts[o+','+m+','+n]; const R=k.a1+k.a2+k.b1+k.b2; W[o][m][n]=(k.a1*w(0,m-1,n)+k.a2*w(0,m-2,n)+k.b1*w(1,m,n-1)+k.b2*w(1,m,n-2))/R; } }
  // print as AI_W_DATA: [o][m-1][n-1]
  const data=[0,1].map(o=>Array.from({length:MAX},(_,i)=>Array.from({length:MAX},(_,j)=>+W[o][i+1][j+1].toFixed(3))));
  fs.writeFileSync('W.json', JSON.stringify(data));
  const Rs={}; for(const k in counts){ const c=counts[k]; Rs[k]=c.a1+c.a2+c.b1+c.b2; } console.log('rounds per cell: small', Rs['0,2,2'], 'big', Rs['0,8,8']);
  console.log('W[I open] rows m=1..12, cols n=1..12'); for(let m=1;m<=MAX;m++) console.log(String(m).padStart(2), data[0][m-1].map(v=>v.toFixed(2)).join(' '));
  console.log('W[they open]'); for(let m=1;m<=MAX;m++) console.log(String(m).padStart(2), data[1][m-1].map(v=>v.toFixed(2)).join(' '));
  // one-round outcome summary for a few cells
  for(const key of ['0,3,6','1,3,6','0,6,6','1,6,6','0,1,1','1,1,1','0,2,2','1,2,2','0,1,2','1,2,1']){ const k=counts[key], R=k.a1+k.a2+k.b1+k.b2; console.log(key, 'A loses1', (k.a1/R).toFixed(2), 'A loses2', (k.a2/R).toFixed(2), 'B loses1', (k.b1/R).toFixed(2), 'B loses2', (k.b2/R).toFixed(2)); }
}
