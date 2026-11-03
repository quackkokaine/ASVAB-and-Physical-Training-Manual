(function(){
if(window.__studyTimer)return;window.__studyTimer=1;
var KEY='study-timer-v1',INTERVAL=30*60*1000,STALE=2*60*1000;
function load(){try{var s=JSON.parse(localStorage.getItem(KEY));if(s&&typeof s.elapsed==='number')return s}catch(e){}return {elapsed:0,running:false,startedAt:0,notified:0,seen:0}}
function save(s){try{localStorage.setItem(KEY,JSON.stringify(s))}catch(e){}}
var mem=load();
function state(){try{var raw=localStorage.getItem(KEY);if(raw)mem=JSON.parse(raw)}catch(e){}return mem}
// A closed browser should not keep counting: if the heartbeat is stale, treat the timer as paused at the last heartbeat.
(function(){var s=state(),n=Date.now();if(s.running&&s.seen&&n-s.seen>STALE){s.elapsed+=Math.max(0,s.seen-s.startedAt);s.running=false;s.startedAt=0;save(s)}})();
function total(s){return s.elapsed+(s.running?Math.max(0,Date.now()-s.startedAt):0)}
function fmt(ms){var t=Math.floor(ms/1000),h=Math.floor(t/3600),m=Math.floor(t%3600/60),sec=t%60,p=function(n){return n<10?'0'+n:''+n};return h?h+':'+p(m)+':'+p(sec):m+':'+p(sec)}
var css=document.createElement('style');
css.textContent='.stimer{position:fixed;top:calc(10px + env(safe-area-inset-top,0px));right:max(12px,env(safe-area-inset-right,0px));z-index:65;display:flex;align-items:center;gap:2px;height:36px;padding:0 4px 0 10px;border-radius:18px;background:color-mix(in srgb,var(--band,#26282b) 55%,transparent);color:var(--band-ink,#fff);border:1px solid rgba(128,128,128,.35);-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px);font:600 13px/1 var(--body,system-ui,sans-serif);opacity:.65;transition:opacity .25s}'
+'.stimer:hover,.stimer:focus-within,.stimer.on{opacity:1}html.scrolled .stimer:not(:hover):not(:focus-within){opacity:.3}'
+'.stimer output{font-variant-numeric:tabular-nums;letter-spacing:.02em;min-width:2.6em;text-align:right;padding-right:4px}'
+'.stimer button{all:unset;box-sizing:border-box;width:28px;height:28px;border-radius:50%;display:grid;place-items:center;cursor:pointer;color:inherit}'
+'.stimer button:hover{background:rgba(255,255,255,.18)}.stimer button:focus-visible{outline:2px solid var(--band-accent,#f2b04a);outline-offset:1px}'
+'.stimer svg{width:14px;height:14px;fill:currentColor}.stimer .rs{display:none}.stimer.paused .rs{display:grid}'
+'@media(max-width:420px){.stimer{padding:0 3px 0 8px;font-size:12px;gap:0}.stimer output{min-width:0;padding-right:3px}.stimer button{width:24px;height:24px}.stimer svg{width:12px;height:12px}}'
+'.stoast{position:fixed;left:50%;top:calc(60px + env(safe-area-inset-top,0px));transform:translateX(-50%);z-index:90;max-width:min(92vw,420px);background:var(--band,#26282b);color:var(--band-ink,#fff);border:1px solid var(--band-accent,#f2b04a);border-radius:10px;padding:12px 14px;display:flex;gap:12px;align-items:flex-start;box-shadow:0 8px 24px rgba(0,0,0,.35);font:500 15px/1.4 var(--body,system-ui,sans-serif)}'
+'.stoast b{display:block;color:var(--band-accent,#f2b04a);margin-bottom:2px}.stoast button{all:unset;cursor:pointer;font-weight:700;font-size:13px;padding:4px 8px;border:1px solid currentColor;border-radius:6px}';
document.head.appendChild(css);
var box=document.createElement('div');box.className='stimer';box.setAttribute('role','group');box.setAttribute('aria-label','Study timer');
box.innerHTML='<output aria-label="Study time">0:00</output>'
+'<button type="button" class="pp" aria-label="Start study timer" title="Start"><svg class="ip" viewBox="0 0 16 16" aria-hidden="true"><path d="M4 2.5v11l9-5.5z"/></svg></button>'
+'<button type="button" class="rs" aria-label="Reset study timer" title="Reset"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 2a6 6 0 1 0 5.7 4.2h-1.7A4.4 4.4 0 1 1 8 3.6c1 0 1.800.3 2.500.9L8.700 6.300H14V1l-1.800 1.800A6 6 0 0 0 8 2z"/></svg></button>';
function mount(){document.body.appendChild(box)}
if(document.body)mount();else document.addEventListener('DOMContentLoaded',mount);
var out=box.querySelector('output'),pp=box.querySelector('.pp'),ip=box.querySelector('.ip');
var PLAY='M4 2.5v11l9-5.5z',PAUSE='M3.500 2h3.200v12H3.500zM9.300 2h3.200v12H9.300z';
function render(){var s=state(),t=total(s);out.textContent=fmt(t);
  box.classList.toggle('on',!!s.running);box.classList.toggle('paused',!s.running&&t>0);
  ip.firstChild.setAttribute('d',s.running?PAUSE:PLAY);
  var lab=s.running?'Pause study timer':(t>0?'Resume study timer':'Start study timer');pp.setAttribute('aria-label',lab);pp.title=lab.replace(' study timer','')}
function toast(mins){
  var old=document.querySelector('.stoast');if(old)old.remove();
  var d=document.createElement('div');d.className='stoast';d.setAttribute('role','alert');
  d.innerHTML='<div><b>Time to move</b>You have studied for '+mins+' minutes. Stand up, stretch and drink some water.</div><button type="button">OK</button>';
  d.querySelector('button').onclick=function(){d.remove()};document.body.appendChild(d);setTimeout(function(){if(d.parentNode)d.remove()},20000)}
function notify(mins){
  toast(mins);
  try{if('Notification' in window&&Notification.permission==='granted'){new Notification('Time to stand, stretch and rehydrate',{body:'You have studied for '+mins+' minutes. Take a short break to avoid fatigue.',tag:'study-break'})}}catch(e){}
}
function tick(){var s=state(),t=total(s);
  if(s.running){s.seen=Date.now();var due=Math.floor(t/INTERVAL);if(due>(s.notified||0)){s.notified=due;notify(due*30)}save(s)}
  render()}
pp.addEventListener('click',function(){
  var s=state();
  if(s.running){s.elapsed+=Math.max(0,Date.now()-s.startedAt);s.running=false;s.startedAt=0}
  else{s.running=true;s.startedAt=Date.now();s.seen=Date.now();s.notified=Math.floor(s.elapsed/INTERVAL);
    try{if('Notification' in window&&Notification.permission==='default')Notification.requestPermission()}catch(e){}}
  save(s);render()});
box.querySelector('.rs').addEventListener('click',function(){mem={elapsed:0,running:false,startedAt:0,notified:0,seen:0};save(mem);render()});
window.addEventListener('storage',function(e){if(e.key===KEY)render()});
setInterval(tick,500);tick();
})();
