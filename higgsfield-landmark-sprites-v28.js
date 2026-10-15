/* LinguaWorld V28 — 12 actual Higgsfield pixel landmarks as individual sprites (no screenshot overlays). */
(function(){
'use strict';
const atlas='https://d8j0ntlcm91z4.cloudfront.net/user_3KgDSNgRcYHCEkF9DO7qAnjsYND/hf_20261015_160300_716f50af-6ae9-4713-8a51-99a8df052612.png';
const sprites=[];let initial=false;
function mode(){return ['ko','de','en'].includes(wjTarget)?wjTarget:'ko'}
function indexFor(slot){return ({ko:0,de:4,en:8})[mode()]+slot%4}
function replace(el,spriteIndex,extraClass){
 if(!el||!sprites[spriteIndex]||el.dataset.hfLandmark==='1')return;
 const img=document.createElement('img');img.src=sprites[spriteIndex];img.alt='';img.setAttribute('aria-hidden','true');img.dataset.hfLandmark='1';img.className=el.className.baseVal||el.className||'';
 img.classList.add('rpg28-landmark');if(extraClass)img.classList.add(extraClass);
 el.replaceWith(img);
}
function update(){
 if(!sprites.length)return;
 const root=document.getElementById('main');if(!root)return;
 const hero=root.querySelector('.rpg26-hero');
 if(hero){hero.classList.add('rpg28-hero');hero.querySelectorAll('.rpg26-scenery .rpg26-monument:not(.rpg28-landmark)').forEach((node,i)=>replace(node,indexFor(i)));
 }
 root.querySelectorAll('.rpg26-mini-monuments .rpg26-monument:not(.rpg28-landmark)').forEach((node,i)=>replace(node,indexFor(i),'rpg28-mini'));
 root.querySelectorAll('.rpg26-map-monument:not(.rpg28-landmark)').forEach((node,i)=>replace(node,indexFor(i),'rpg28-map-sprite'));
 root.querySelectorAll('.rpg26-chapter-icon .rpg26-monument:not(.rpg28-landmark)').forEach((node,i)=>replace(node,indexFor(i),'rpg28-chapter-sprite'));
 root.querySelectorAll('.rpg26-page-sprite .rpg26-monument:not(.rpg28-landmark)').forEach(node=>replace(node,indexFor(0),'rpg28-page-sprite'));
 const map=root.querySelector('.rpg26-map-page');
 if(map&&!map.querySelector('.rpg28-floating-guild')){
  const guild=document.createElement('div');guild.className='rpg28-floating-guild';guild.innerHTML='<span>✦</span> '+({ko:'KOREA',de:'GERMANY',en:'BRITAIN'})[mode()]+' <span>✦</span>';map.querySelector('.v18-map-canvas')?.append(guild);
 }
}
function load(){
 if(initial)return;initial=true;const img=new Image();img.crossOrigin='anonymous';
 img.onload=function(){try{
  let w=img.naturalWidth,h=img.naturalHeight,can=document.createElement('canvas');can.width=w;can.height=h;
  let ctx=can.getContext('2d',{willReadFrequently:true});ctx.drawImage(img,0,0);
  for(let k=0;k<12;k++){
   let col=k%4,row=Math.floor(k/4),sx=Math.round(col*w/4),ex=Math.round((col+1)*w/4),sy=Math.round(row*h/3),ey=Math.round((row+1)*h/3);
   let cw=ex-sx,ch=ey-sy,pixels=ctx.getImageData(sx,sy,cw,ch);let minX=cw,minY=ch,maxX=-1,maxY=-1;
   for(let y=0;y<ch;y++)for(let x=0;x<cw;x++){
    let p=(y*cw+x)*4,r=pixels.data[p],g=pixels.data[p+1],b=pixels.data[p+2];
    let chroma=r>130&&b>120&&r>g*1.38&&b>g*1.38&&Math.abs(r-b)<125;
    if(chroma){pixels.data[p+3]=0}
    else if(r>120&&b>105&&r>g*1.19&&b>g*1.19&&Math.abs(r-b)<90){
     pixels.data[p+3]=Math.max(0,Math.min(255,255-(Math.min(r,b)-g-21)*4));
    }
    if(pixels.data[p+3]>45){minX=Math.min(minX,x);minY=Math.min(minY,y);maxX=Math.max(maxX,x);maxY=Math.max(maxY,y)}
   }
   if(maxX<minX||maxY<minY){sprites[k]=null;continue}
   let temp=document.createElement('canvas');temp.width=cw;temp.height=ch;temp.getContext('2d').putImageData(pixels,0,0);
   let pad=6,out=document.createElement('canvas');out.width=maxX-minX+1+pad*2;out.height=maxY-minY+1+pad*2;
   out.getContext('2d').drawImage(temp,minX,minY,maxX-minX+1,maxY-minY+1,pad,pad,maxX-minX+1,maxY-minY+1);
   sprites[k]=out.toDataURL('image/png');
  }update();
 }catch(e){console.warn('Higgsfield landmarks: retain SVG fallback',e)}};
 img.onerror=function(){console.warn('Higgsfield landmark atlas unavailable; fallback active')};img.src=atlas;
}
const last=render;render=function(){const value=last.apply(this,arguments);try{update()}catch(e){console.warn('Higgsfield landmarks',e)}return value};
window.rpg28Landmarks=update;load();update();
})();