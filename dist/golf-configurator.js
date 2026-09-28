const canvas=document.querySelector('#car-canvas'),ctx=canvas.getContext('2d',{willReadFrequently:true});
const status=document.querySelector('#preview-status'),summary=document.querySelector('.selection');
const state={paint:'Blue',wheel:'Classic',steering:'Leather',angle:'rear',lip:'standard',diffuser:'standard',exhaust:'round'};
const files={Classic:'golf-rear.png',Sport:'golf-rear-split.png',Forged:'golf-rear-mesh.png',Track:'golf-rear-six.png'};
const fronts={Classic:'golf-front.png',Sport:'golf-front-split.png',Forged:'golf-front-mesh.png',Track:'golf-front-six.png'};
const wheelNames={Classic:'Multi-spoke',Sport:'Split-five',Forged:'Mesh',Track:'Six-spoke'};
const paints={Pink:[242,155,191],Burgundy:[128,39,76],Blue:[32,78,160],Silver:[210,213,220],Graphite:[53,55,62],Rose:[188,139,141]};
const finishes={Black:[37,38,41],Silver:[185,188,194],Gold:[175,130,49]};
const cache=new Map();let revision=0;
function image(src){if(!cache.has(src))cache.set(src,new Promise((resolve,reject)=>{const i=new Image();i.onload=()=>resolve(i);i.onerror=()=>reject(new Error('Preview image unavailable'));i.src=src}));return cache.get(src)}
function ellipse(x,y,cx,cy,rx,ry){return ((x-cx)/rx)**2+((y-cy)/ry)**2<1}
function inside(x,y,p){let v=false;for(let i=0,j=p.length-1;i<p.length;j=i++){const a=p[i],b=p[j];if((a[1]>y)!==(b[1]>y)&&x<(b[0]-a[0])*(y-a[1])/(b[1]-a[1])+a[0])v=!v;}return v}
function tint(r,g,b,target,strength=1){const l=.2126*r+.7152*g+.0722*b;const t=.2126*target[0]+.7152*target[1]+.0722*target[2];const light=Math.max(.1,l/160);return target.map((c,i)=>Math.round([r,g,b][i]*(1-strength)+Math.min(255,c*light+Math.max(0,l-195)*.55)*strength))}
function bodyPaint(r,g,b,name){
 const max=Math.max(r,g,b)/255,min=Math.min(r,g,b)/255,d=max-min;let l=(max+min)/2,s=d===0?0:d/(1-Math.abs(2*l-1));
 const cfg={Pink:[.92,.55,1.5],Blue:[.61,1,1],Burgundy:[.93,1,.65],Silver:[0,0,1],Graphite:[0,0,.34],Rose:[.98,.42,.88]};const [h,sm,lm]=cfg[name];s*=sm;l=Math.min(.98,l*lm);
 const c=(1-Math.abs(2*l-1))*s,x=c*(1-Math.abs((h*6)%2-1)),m=l-c/2;const rgb=h<1/6?[c,x,0]:h<2/6?[x,c,0]:h<3/6?[0,c,x]:h<4/6?[0,x,c]:h<5/6?[x,0,c]:[c,0,x];return rgb.map(v=>Math.round((v+m)*255));
}
function recolor(data,kind){const a=data.data,w=data.width,h=data.height;for(let i=0;i<a.length;i+=4){if(a[i+3]<10)continue;const x=(i/4%w)/w,y=Math.floor(i/4/w)/h,r=a[i],g=a[i+1],b=a[i+2];let v;
 {
  const wheelArea=kind==='rear'?(ellipse(x,y,.072,.706,.04,.137)||ellipse(x,y,.477,.745,.059,.17)):(ellipse(x,y,.066,.674,.037,.142)||ellipse(x,y,.468,.720,.059,.17));
  const trim=kind==='rear'&&y>.75&&y<.862&&((x>.66&&x<.75)||(x>.914&&x<.987));
  const pink=b>r*1.15&&b>g*1.1&&!wheelArea&&!trim;
  const coverage=Math.max(0,Math.min(1,Math.min((r-g)/28,(b-g)/15)));
  if(state.paint!=='Blue'&&pink)v=bodyPaint(r,g,b,state.paint);
 }
 if(v){a[i]=v[0];a[i+1]=v[1];a[i+2]=v[2]}
 }return data}
function patch(img,points){ctx.save();ctx.beginPath();points.forEach(([x,y],i)=>i?ctx.lineTo(x*canvas.width,y*canvas.height):ctx.moveTo(x*canvas.width,y*canvas.height));ctx.closePath();ctx.clip();ctx.clearRect(0,0,canvas.width,canvas.height);ctx.drawImage(img,0,0,canvas.width,canvas.height);ctx.restore()}
async function render(){const token=++revision;status.textContent='Updating preview…';try{const kind=state.angle;if(kind==='steering'){await renderSteering(token);return;}let src=kind==='rear'?files[state.wheel]:kind==='front'?fronts[state.wheel]:fronts[state.wheel];const base=await image(src);const extra=kind==='rear'&&(state.diffuser!=='standard'||state.exhaust!=='round')?await image('golf-rear-aero.png'):kind==='front'&&state.lip==='track'?await image('golf-front-lip.png'):null;if(token!==revision)return;canvas.width=base.naturalWidth;canvas.height=base.naturalHeight;ctx.clearRect(0,0,canvas.width,canvas.height);ctx.drawImage(base,0,0);
 if(extra&&kind==='front')patch(extra,[[.533,.825],[1,.810],[1,.925],[.532,.92]]);
 if(extra&&kind==='rear'){
  if(state.diffuser==='carbon')patch(extra,[[.61,.769],[.977,.735],[1,.868],[.592,.897]]);
  if(state.exhaust==='oval'){patch(extra,[[.66,.769],[.75,.75],[.753,.85],[.659,.862]]);patch(extra,[[.916,.758],[.98,.75],[.987,.85],[.914,.854]])}
  if(state.diffuser==='carbon'&&state.exhaust==='round'){patch(base,[[.66,.769],[.75,.75],[.753,.85],[.659,.862]]);patch(base,[[.916,.758],[.98,.75],[.987,.85],[.914,.854]])}
 }
 ctx.putImageData(recolor(ctx.getImageData(0,0,canvas.width,canvas.height),kind),0,0);canvas.setAttribute('aria-label',`${state.paint} Golf R Mk7, ${state.angle} preview`);status.textContent=`${kind==='front'?'Front detail':'Rear detail'} · Design preview`;summary.textContent=`${state.paint} · ${wheelNames[state.wheel]} wheels · ${state.steering} steering wheel`;
 }catch(e){status.textContent='This preview could not load. Please reload the page.'}}

async function renderSteering(token){
 const sheet=await image('golf-steering.png');if(token!==revision)return;
 const index=['Leather','Carbon','Alcantara'].indexOf(state.steering),sw=sheet.naturalWidth/3,sh=sheet.naturalHeight;
 canvas.width=1774;canvas.height=887;ctx.clearRect(0,0,1774,887);
 const h=840,w=h*sw/sh;ctx.drawImage(sheet,index*sw,0,sw,sh,(1774-w)/2,23,w,h);
 canvas.setAttribute('aria-label',state.steering+' golf steering wheel');
 status.textContent=state.steering+' steering wheel · Design preview';
 summary.textContent=`${state.paint} · ${wheelNames[state.wheel]} wheels · ${state.steering} steering wheel`;
}
document.querySelector('#steering-finish').addEventListener('change',e=>{state.steering=e.target.value;selectAngle('steering');render()});

function selectAngle(angle){state.angle=angle;document.querySelectorAll('[data-angle]').forEach(b=>{b.classList.toggle('selected',b.dataset.angle===angle);b.setAttribute('aria-pressed',String(b.dataset.angle===angle))})}
document.querySelectorAll('.swatch').forEach(b=>b.addEventListener('click',()=>{state.paint=b.dataset.color;if(state.angle==='steering')selectAngle('rear');document.querySelectorAll('.swatch').forEach(x=>{x.classList.toggle('selected',x===b);x.setAttribute('aria-pressed',String(x===b))});render()}));
document.querySelectorAll('.wheel').forEach(b=>b.addEventListener('click',()=>{state.wheel=b.dataset.wheel;selectAngle('rear');document.querySelectorAll('.wheel').forEach(x=>{x.classList.toggle('selected',x===b);x.setAttribute('aria-pressed',String(x===b))});render()}));
document.querySelectorAll('[data-angle]').forEach(b=>b.addEventListener('click',()=>{selectAngle(b.dataset.angle);render()}));
for(const [id,key,angle]of [['front-lip','lip','front'],['rear-diffuser','diffuser','rear'],['exhaust-style','exhaust','rear']])document.querySelector('#'+id).addEventListener('change',e=>{state[key]=e.target.value;selectAngle(angle);render()});
render();
