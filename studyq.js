(function(){
var BANK=window.PQ_BANK;if(!BANK)return;
var ri=function(a,b){return Math.floor(Math.random()*(b-a+1))+a};
var shuffle=function(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=ri(0,i),t=a[i];a[i]=a[j];a[j]=t}return a};
var st=document.createElement('style');st.textContent=".pq{margin:14px 0 26px;border:1px solid var(--line);border-left:4px solid var(--accent);background:var(--surface);border-radius:8px;transition:background-color .3s}\n.pq-body{padding:16px 18px}\n.pq-t,.pq-after b{display:block;font-size:16px;font-weight:700;color:var(--ink)}\n.pq-btns{display:flex;gap:10px;margin-top:12px}\n.pq button{font:inherit;cursor:pointer}\n.pq-yes,.pq-yes2,.pq-no,.pq-no2{min-width:88px;min-height:42px;padding:8px 20px;border-radius:6px;font-weight:700;font-size:15px;border:2px solid var(--accent)}\n.pq-yes,.pq-yes2{background:var(--accent);color:var(--bg)}\n.pq-no,.pq-no2{background:transparent;color:var(--accent)}\n.pq-lab{margin:0 0 8px;font-size:11.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--accent)}\n.pq-qt{margin:0 0 12px;font-size:17px;line-height:1.5;color:var(--ink)}\n.pq-vis{margin:0 0 12px;display:flex;justify-content:center}\n.pqsvg{width:100%;max-width:300px;height:auto;overflow:visible}\n.pqsvg .l{fill:var(--accent-bg);stroke:var(--ink);stroke-width:2;stroke-linejoin:round}\n.pqsvg .l.d{fill:none;stroke-dasharray:5 4}\n.pqsvg .s{fill:var(--accent);stroke:var(--ink);stroke-width:2}\n.pqsvg path.l,.pqsvg line.l{fill:none}\n.pqsvg line.l{stroke:var(--ink)}\n.pqsvg .g{stroke:var(--line);stroke-width:1}\n.pqsvg .p{fill:var(--accent);stroke:var(--ink);stroke-width:1}\n.pqsvg text{fill:var(--ink);font:600 13px system-ui,sans-serif}\n.pqsvg rect.l[width=\"12\"]{fill:none}\n.pq-ch{display:grid;grid-template-columns:1fr 1fr;gap:10px}\n.pq-c{display:flex;gap:10px;align-items:center;text-align:left;min-height:48px;padding:10px 12px;border:2px solid var(--line);border-radius:6px;background:var(--bg);color:var(--ink);font-size:16px}\n.pq-c:hover:not(:disabled){border-color:var(--accent)}\n.pq-c:disabled{cursor:default}\n.pq-k{flex:none;width:26px;height:26px;border-radius:50%;background:var(--hl);display:grid;place-items:center;font-size:13px;font-weight:700}\n.pq-c.wrong{border-color:#c0392b;background:rgba(192,57,43,.14);opacity:.8}\n.pq-c.right{border-color:var(--good);background:rgba(23,160,90,.18)}\n.pq-fb{margin:12px 0 0;font-size:15px;line-height:1.5;color:var(--muted);min-height:1.2em}\n.pq-fb b{color:var(--good)}\n.pq-after{margin-top:12px;padding-top:12px;border-top:1px dashed var(--line)}\n.pq.flash{animation:pqflash 1.8s ease-in-out 1}\n@keyframes pqflash{0%,100%{background:var(--surface)}12%,45%,78%{background:rgba(35,190,100,.55)}28%,62%{background:var(--surface)}}\n.pq.ok{border-left-color:var(--good)}\n.pq-plus{display:flex;align-items:center;gap:10px;width:100%;padding:8px 14px;background:transparent;border:0;color:var(--accent);text-align:left}\n.pq-plus span{width:30px;height:30px;border-radius:50%;border:2px solid var(--accent);display:grid;place-items:center;font-size:22px;line-height:1;font-weight:700}\n.pq-plus i{font-style:normal;font-size:14px;font-weight:600;color:var(--muted)}\n.pq.min{border-left-width:1px;border-style:dashed}\n@media(max-width:520px){.pq-ch{grid-template-columns:1fr}.pq-body{padding:14px}}\n@media(prefers-reduced-motion:reduce){.pq.flash{animation:none;background:rgba(35,190,100,.4)}}\n\n.pq-sec>*:not(h3){transition:filter .7s ease}\n.pq-blur>*:not(h3){filter:blur(10px);user-select:none;-webkit-user-select:none;pointer-events:none}\n.pq-note{margin:10px 0 0;font-size:13.5px;color:var(--muted)}\n.pq-vis img{max-width:min(100%,260px);max-height:200px;object-fit:contain;background:#fff;border-radius:6px;padding:8px}\n";document.head.appendChild(st);
function build(en){
  var w=en.w?en.w.slice():shuffle((en.pool||[]).filter(function(x){return x!==en.a})).slice(0,3);
  var seen={};seen[en.a]=1;w=w.filter(function(x){if(seen[x])return false;seen[x]=1;return true});
  if(w.length<3)return null;
  var ch=shuffle([en.a].concat(w.slice(0,3)));
  return {q:en.q,img:en.img||'',choices:ch,answer:ch.indexOf(en.a),expl:en.e||''};
}
function makeBox(id,title,sec){
  var bank=BANK[id],queue=[];
  var box=document.createElement('aside');box.className='pq';box.setAttribute('data-skill',id);box.setAttribute('aria-label','Practice questions for '+title);
  box.innerHTML='<button type="button" class="pq-plus" aria-label="Show practice questions for '+title+'" title="Show practice questions"><span aria-hidden="true">+</span><i>Practice questions</i></button>'
   +'<div class="pq-body"><div class="pq-ask"><b class="pq-t">Would you like to test your knowledge?</b><div class="pq-btns"><button type="button" class="pq-yes">Yes</button><button type="button" class="pq-no">No</button></div><p class="pq-note">The section above blurs while a question is open. Answer correctly to unblur it.</p></div>'
   +'<div class="pq-q" hidden></div></div>';
  var plus=box.querySelector('.pq-plus'),body=box.querySelector('.pq-body'),ask=box.querySelector('.pq-ask'),qd=box.querySelector('.pq-q'),t=box.querySelector('.pq-t');
  var cur=null,solved=true;
  function blur(on){sec.classList.toggle('pq-blur',on);if(on)sec.setAttribute('aria-hidden','true');else sec.removeAttribute('aria-hidden')}
  function minimize(){blur(false);box.classList.add('min');body.hidden=true;plus.hidden=false;plus.setAttribute('aria-expanded','false')}
  function expand(){box.classList.remove('min','flash','ok');body.hidden=false;plus.hidden=true;t.textContent='Would you like to test your knowledge?';ask.hidden=false;qd.hidden=true;qd.innerHTML='';}
  function nextEntry(){
    for(var k=0;k<6;k++){
      if(!queue.length)queue=shuffle(bank.map(function(_,i){return i}));
      var r=build(bank[queue.shift()]);if(r)return r;
    }
    return null;
  }
  function next(){
    var r=nextEntry();if(!r){t.textContent='Sorry, a question could not be made. Try again.';return}
    cur=r;solved=false;blur(true);ask.hidden=true;qd.hidden=false;box.classList.remove('flash','ok');
    var h='<p class="pq-lab">Practice question</p>'+(r.img?'<div class="pq-vis"><img src="'+r.img+'" alt="Image for the question"></div>':'')+'<p class="pq-qt">'+r.q+'</p><div class="pq-ch" role="group" aria-label="Answer choices">';
    r.choices.forEach(function(c,i){h+='<button type="button" class="pq-c" data-i="'+i+'"><span class="pq-k">'+'ABCD'[i]+'</span><span class="pq-v">'+c+'</span></button>'});
    h+='</div><p class="pq-fb" role="status" aria-live="polite">Answer correctly to unblur the section above.</p><div class="pq-after" hidden><b>Want another question?</b><div class="pq-btns"><button type="button" class="pq-yes2">Yes</button><button type="button" class="pq-no2">No</button></div></div>';
    qd.innerHTML=h;
  }
  box.addEventListener('click',function(e){
    var b=e.target.closest('button');if(!b||!box.contains(b))return;
    if(b===plus){expand();return}
    if(b.classList.contains('pq-yes')||b.classList.contains('pq-yes2')){next();return}
    if(b.classList.contains('pq-no')||b.classList.contains('pq-no2')){minimize();return}
    if(b.classList.contains('pq-c')&&cur&&!solved){
      var i=Number(b.getAttribute('data-i'));var fb=qd.querySelector('.pq-fb');
      if(i===cur.answer){
        solved=true;blur(false);b.classList.add('right');qd.querySelectorAll('.pq-c').forEach(function(x){x.disabled=true});
        fb.innerHTML='<b>Correct!</b> '+cur.expl;qd.querySelector('.pq-after').hidden=false;
        box.classList.remove('flash');void box.offsetWidth;box.classList.add('flash','ok');
      }else{b.classList.add('wrong');b.disabled=true;fb.textContent='Not quite. Try another answer.'}
    }
  });
  plus.hidden=true;
  return box;
}
function init(){
  Object.keys(BANK).forEach(function(id){
    var sec=document.getElementById(id);if(!sec||sec.tagName!=='SECTION')return;
    var h=sec.querySelector('h3');var title=h?h.textContent.replace(/\s+/g,' ').trim():id;
    sec.classList.add('pq-sec');
    sec.parentNode.insertBefore(makeBox(id,title,sec),sec.nextSibling);
  });
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
