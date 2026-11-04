(function(){
var ri=function(a,b){return Math.floor(Math.random()*(b-a+1))+a};
var pick=function(a){return a[ri(0,a.length-1)]};
var shuffle=function(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=ri(0,i),t=a[i];a[i]=a[j];a[j]=t}return a};
var M='−',X='×',D='÷';
function clean(n){var s=Number(n.toFixed(8)).toString();return s}
function num(n){var s=typeof n==='string'?n:clean(n);var p=s.split('.');p[0]=p[0].replace(/\B(?=(\d{3})+(?!\d))/g,',');return p.join('.')}
function b(x){return '<b>'+x+'</b>'}
var G={};
G[0]=function(){ // break apart
  var a=ri(3,9),k=ri(4,9)*10,d=ri(1,3),up=Math.random()<.5,bb=up?k-d:k+d;
  var big=a*k,small=a*d,ans=a*bb;
  return {truth:a*bb,ans:ans,steps:[
   'Problem: '+a+' '+X+' '+bb,
   'Step 1: '+bb+' is close to '+k+', so write it as '+k+(up?' '+M+' ':' + ')+d+'.',
   'Step 2: '+a+' '+X+' '+k+' = '+num(big)+', and '+a+' '+X+' '+d+' = '+num(small)+'.',
   'Step 3: '+(up?'take away':'add')+' the extra piece: '+num(big)+(up?' '+M+' ':' + ')+num(small)+' = '+b(num(ans))+'.']};
};
G[1]=function(){ // round and adjust
  var R=pick([100,200,300,400,500,50,150]),d=ri(1,4),y=ri(23,89),mode=ri(0,2),s;
  if(mode===0){var a=R-d,ans=a+y;s=['Problem: '+num(a)+' + '+y,'Step 1: '+num(a)+' is '+d+' less than '+num(R)+', so use '+num(R)+' instead.','Step 2: '+num(R)+' + '+y+' = '+num(R+y)+'.','Step 3: you added '+d+' too many, so subtract '+d+': '+num(R+y)+' '+M+' '+d+' = '+b(num(ans))+'.'];return {truth:a+y,ans:ans,steps:s}}
  if(mode===1){var a2=R+d,ans2=a2+y;s=['Problem: '+num(a2)+' + '+y,'Step 1: '+num(a2)+' is '+d+' more than '+num(R)+', so use '+num(R)+' instead.','Step 2: '+num(R)+' + '+y+' = '+num(R+y)+'.','Step 3: you left out '+d+', so add it back: '+num(R+y)+' + '+d+' = '+b(num(ans2))+'.'];return {truth:a2+y,ans:ans2,steps:s}}
  var x=R+ri(60,190),y3=R-d,ans3=x-y3;if(x-y3<=0)return G[1]();
  s=['Problem: '+num(x)+' '+M+' '+num(y3),'Step 1: '+num(y3)+' is '+d+' less than '+num(R)+', so subtract '+num(R)+' instead.','Step 2: '+num(x)+' '+M+' '+num(R)+' = '+num(x-R)+'.','Step 3: you subtracted '+d+' too many, so add '+d+' back: '+num(x-R)+' + '+d+' = '+b(num(ans3))+'.'];
  return {truth:x-y3,ans:ans3,steps:s};
};
G[2]=function(){ // halve and double
  var f=pick([25,25,50]),a=ri(3,24)*2,h=a/2,df=f*2,ans=h*df;
  var steps=['Problem: '+a+' '+X+' '+f,'Step 1: halve '+a+' to get '+h+'.','Step 2: double '+f+' to get '+df+'.','Step 3: '+h+' '+X+' '+df+' = '+b(num(ans))+'.'];
  if(f===25&&a%4===0)steps.push('Check with the quarter idea: '+a+' '+D+' 4 = '+(a/4)+', and '+(a/4)+' '+X+' 100 = '+num(a/4*100)+'.');
  return {truth:a*f,ans:ans,steps:steps};
};
G[3]=function(){ // times 5
  var n=ri(12,98),h=n/2,ans=n*5;
  return {truth:ans,ans:ans,steps:['Problem: '+n+' '+X+' 5','Step 1: half of '+n+' is '+clean(h)+'.','Step 2: '+clean(h)+' '+X+' 10 = '+b(num(ans))+'.']};
};
G[4]=function(){ // times 9 or 99
  if(Math.random()<.75){var n=ri(12,89),ans=n*9;return {truth:ans,ans:ans,steps:['Problem: 9 '+X+' '+n,'Step 1: 10 '+X+' '+n+' = '+n*10+'.','Step 2: subtract one '+n+': '+n*10+' '+M+' '+n+' = '+b(num(ans))+'.']}}
  var m=ri(12,49),a2=m*99;return {truth:a2,ans:a2,steps:['Problem: 99 '+X+' '+m,'Step 1: 100 '+X+' '+m+' = '+num(m*100)+'.','Step 2: subtract one '+m+': '+num(m*100)+' '+M+' '+m+' = '+b(num(a2))+'.']};
};
G[5]=function(){ // times 11
  var carry=Math.random()<.4,d1,d2;
  if(carry){d1=ri(1,8);d2=ri(10-d1,9)}else{d1=ri(1,8);d2=ri(0,9-d1)}
  var n=d1*10+d2,ans=n*11,s=d1+d2;
  var steps=['Problem: 11 '+X+' '+n,'Step 1: add the digits: '+d1+' + '+d2+' = '+s+'.'];
  if(s<10)steps.push('Step 2: put the '+s+' between the '+d1+' and the '+d2+': '+b(ans)+'.');
  else steps.push('Step 2: the sum is 10 or more. Write '+(s-10)+' in the middle and carry the 1 to the '+d1+': ('+d1+' + 1) '+(s-10)+' '+d2+' = '+b(ans)+'.');
  return {truth:n*11,ans:ans,steps:steps};
};
G[6]=function(){ // square ending in 5
  var t=ri(1,9),n=t*10+5,p=t*(t+1),ans=n*n;
  return {truth:ans,ans:parseInt(p+'25',10),steps:['Problem: '+n+'²','Step 1: the tens digit is '+t+', and the next number is '+(t+1)+'. '+t+' '+X+' '+(t+1)+' = '+p+'.','Step 2: write 25 after it: '+b(num(parseInt(p+'25',10)))+'.']};
};
G[7]=function(){ // shift decimal
  var base=pick(['0.45','3.7','12.5','0.062','64','8.25','0.9','150','0.304','2.6']),z=ri(1,3),p=Math.pow(10,z),mul=Math.random()<.5;
  var x=Number(base),ans=mul?x*p:x/p;
  var zeros=z===1?'1 zero':z+' zeros';
  var steps=['Problem: '+base+' '+(mul?X:D)+' '+num(p),'Step 1: '+num(p)+' has '+zeros+', so move the decimal '+(z===1?'1 place':z+' places')+' '+(mul?'right':'left')+'.','Step 2: '+base+' becomes '+b(num(Number(ans.toFixed(8))))+'.'];
  return {truth:Number((mul?x*p:x/p).toFixed(8)),ans:Number(ans.toFixed(8)),steps:steps};
};
G[8]=function(){ // estimate first
  for(var t=0;t<50;t++){
    var a=ri(31,79),bb=ri(21,69);if(a%10===0||bb%10===0)continue;
    var r=function(n){return Math.round(n/10)*10},est=r(a)*r(bb),ans=a*bb;
    var ch=shuffle([ans,ans+pick([300,400,500]),ans-pick([300,400,500]),ans+pick([700,800,900])]);
    if(new Set(ch).size<4||ch.some(function(c){return c<=0}))continue;
    var near=ch.slice().sort(function(x,y){return Math.abs(x-est)-Math.abs(y-est)});
    if(near[0]!==ans||Math.abs(near[1]-est)<Math.abs(ans-est)+150)continue;
    return {truth:ans,ans:near[0],steps:['Problem: '+a+' '+X+' '+bb+'. Choices: '+ch.map(num).join(', ')+'.','Step 1: round to '+r(a)+' '+X+' '+r(bb)+' = '+num(est)+'.','Step 2: the answer must be close to '+num(est)+', so only '+num(ans)+' fits. Answer: '+b(num(ans))+'.']};
  }
  return G[8]();
};
if(typeof document==='undefined'){globalThis.__IDEAS=G;return}
function init(){
  var cards=document.querySelectorAll('#mm1 .idea');
  cards.forEach(function(card,i){
    if(!G[i])return;
    var btn=document.createElement('button');btn.type='button';btn.className='idea-gen';btn.textContent='Try another example';
    var out=document.createElement('div');out.className='eg gen';out.hidden=true;out.setAttribute('aria-live','polite');
    card.appendChild(btn);card.appendChild(out);
    btn.addEventListener('click',function(){
      var r=G[i]();
      out.innerHTML='<b class="lab">Another example</b><div class="steps">'+r.steps.map(function(s){return '<div>'+s+'</div>'}).join('')+'</div>';
      out.hidden=false;btn.textContent='Try another example';
    });
  });
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
