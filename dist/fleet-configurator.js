/* Generic fleet configurator. Driven by window.HOC_VEHICLE = {id, name, model, front, rear, wheelName} */
const canvas=document.querySelector('#car-canvas'),ctx=canvas.getContext('2d',{willReadFrequently:true});
const status=document.querySelector('#preview-status'),summary=document.querySelector('.selection');
const V=window.HOC_VEHICLE;
const state={paint:'Blue',angle:'rear'};
const paints={Pink:[242,155,191],Burgundy:[128,39,76],Blue:[32,78,160],Silver:[210,213,220],Graphite:[53,55,62],Rose:[188,139,141]};
const cache=new Map();let revision=0;
function image(src){if(!cache.has(src))cache.set(src,new Promise((resolve,reject)=>{const i=new Image();i.onload=()=>resolve(i);i.onerror=()=>reject(new Error('Preview image unavailable'));i.src=src}));return cache.get(src)}
function bodyPaint(r,g,b,name){
 const max=Math.max(r,g,b)/255,min=Math.min(r,g,b)/255,d=max-min;let l=(max+min)/2,s=d===0?0:d/(1-Math.abs(2*l-1));
 const cfg={Pink:[.92,.55,1.5],Blue:[.61,1,1],Burgundy:[.93,1,.65],Silver:[0,0,1],Graphite:[0,0,.34],Rose:[.98,.42,.88]};const [h,sm,lm]=cfg[name];s*=sm;l=Math.min(.98,l*lm);
 const c=(1-Math.abs(2*l-1))*s,x=c*(1-Math.abs((h*6)%2-1)),m=l-c/2;const rgb=h<1/6?[c,x,0]:h<2/6?[x,c,0]:h<3/6?[0,c,x]:h<4/6?[0,x,c]:h<5/6?[x,0,c]:[c,0,x];return rgb.map(v=>Math.round((v+m)*255));
}
function recolor(data){const a=data.data,w=data.width,h=data.height;for(let i=0;i<a.length;i+=4){if(a[i+3]<10)continue;const r=a[i],g=a[i+1],b=a[i+2];
 const isBlue=b>r*1.15&&b>g*1.1;
 if(state.paint!=='Blue'&&isBlue){const v=bodyPaint(r,g,b,state.paint);a[i]=v[0];a[i+1]=v[1];a[i+2]=v[2];}
 }return data}
async function render(){const token=++revision;status.textContent='Updating preview…';try{const kind=state.angle;
 const src=kind==='front'?V.front:V.rear;
 const base=await image(src);if(token!==revision)return;
 canvas.width=base.naturalWidth;canvas.height=base.naturalHeight;
 ctx.clearRect(0,0,canvas.width,canvas.height);ctx.drawImage(base,0,0);
 ctx.putImageData(recolor(ctx.getImageData(0,0,canvas.width,canvas.height)),0,0);
 canvas.setAttribute('aria-label',`${state.paint} ${V.name}, ${kind} preview`);
 status.textContent=`${kind==='front'?'Front detail':'Rear detail'} · Design preview`;
 summary.textContent=`${state.paint} · ${V.wheelName} wheels`;
 }catch(e){status.textContent='This preview could not load. Please reload the page.'}}
function selectAngle(angle){state.angle=angle;document.querySelectorAll('[data-angle]').forEach(b=>{b.classList.toggle('selected',b.dataset.angle===angle)})}
document.querySelectorAll('.swatch').forEach(b=>b.addEventListener('click',()=>{state.paint=b.dataset.color;document.querySelectorAll('.swatch').forEach(x=>{x.classList.toggle('selected',x===b);x.setAttribute('aria-pressed',String(x===b))});render()}));
document.querySelectorAll('[data-angle]').forEach(b=>b.addEventListener('click',()=>{selectAngle(b.dataset.angle);render()}));
render();