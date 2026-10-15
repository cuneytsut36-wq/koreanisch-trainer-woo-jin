/* LinguaWorld V27 – Higgsfield-generated pixel character assets, live RPG UI enhancement.
 * No screenshots are used as interface backgrounds.
 * Preserves original course navigation, vocabulary, translation, quizzes and AI tutor.
 */
(function(){
'use strict';
const SHEET='https://d8j0ntlcm91z4.cloudfront.net/user_3KgDSNgRcYHCEkF9DO7qAnjsYND/hf_20261015_154838_680232c9-9ba0-4ddd-8be2-78b606d93fe2.png';
const labels={
ko:{name:'Woo Jin',city:'Seoul',lesson:'서울의 하루',chapter:'서울 탐험',towns:['Seoul','Busan','Gyeongju','Jeju'],theme:'🇰🇷'},
de:{name:'Lukas',city:'Berlin',lesson:'Ein Tag in Berlin',chapter:'Deutschland entdecken',towns:['Berlin','München','Hamburg','Köln'],theme:'🇩🇪'},
en:{name:'Alex',city:'London',lesson:'A day in London',chapter:'Discover Britain',towns:['London','Edinburgh','Oxford','Manchester'],theme:'🇬🇧'}
};
const asset={};let initiated=false;
function getMode(){return labels[wjTarget]?wjTarget:'ko'}
function characterImg(){return asset[getMode()]||({ko:'assets/v18-avatar-woo-jin.svg',de:'assets/v18-avatar-lukas.svg',en:'assets/v18-avatar-alex.svg'})[getMode()]}
function translate(de,en){return typeof window.wjNativeUI==='function'?window.wjNativeUI(de,en):v27Lang==='en'?en:de}
function add(tag,cls,text){let e=document.createElement(tag);if(cls)e.className=cls;if(text!==undefined)e.textContent=text;return e}
function loadSprites(){
 if(initiated)return;initiated=true;
 const image=new Image();image.crossOrigin='anonymous';
 image.onload=function(){
  try{
   const w=image.naturalWidth,h=image.naturalHeight;
   const canvas=document.createElement('canvas');canvas.width=w;canvas.height=h;
   const ctx=canvas.getContext('2d',{willReadFrequently:true});ctx.drawImage(image,0,0);
   for(let i=0;i<3;i++){
    let left=Math.round(i*w/3),right=Math.round((i+1)*w/3),width=right-left;
    const data=ctx.getImageData(left,0,width,h);
    let minX=width,minY=h,maxX=0,maxY=0;
    for(let y=0;y<h;y++)for(let x=0;x<width;x++){
     let p=(y*width+x)*4,r=data.data[p],g=data.data[p+1],b=data.data[p+2];
     // Chromakey only the saturated cyan game-asset background.
     let cyan=(g>128&&b>130&&g>r*1.45&&b>r*1.48&&Math.abs(g-b)<88);
     let nearCyan=(g>115&&b>120&&g>r*1.20&&b>r*1.22&&Math.abs(g-b)<75);
     if(cyan){data.data[p+3]=0}
     else if(nearCyan){data.data[p+3]=Math.max(0,Math.min(255,255-(Math.min(g,b)-r-35)*5))}
     if(data.data[p+3]>45){minX=Math.min(minX,x);minY=Math.min(minY,y);maxX=Math.max(maxX,x);maxY=Math.max(maxY,y)}
    }
    if(maxX<=minX||maxY<=minY)continue;
    const temp=document.createElement('canvas');temp.width=width;temp.height=h;temp.getContext('2d').putImageData(data,0,0);
    const out=document.createElement('canvas');
    const pad=12,sw=maxX-minX+1,sh=maxY-minY+1;
    out.width=sw+pad*2;out.height=sh+pad*2;
    out.getContext('2d').drawImage(temp,minX,minY,sw,sh,pad,pad,sw,sh);
    asset[['ko','de','en'][i]]=out.toDataURL('image/png');
   }
   applySprites();
  }catch(e){console.warn('Higgsfield sprites fallback kept',e)}
 };
 image.onerror=function(){console.warn('Higgsfield sprites temporarily unavailable; keeping prior characters')};
 image.src=SHEET;
}
function applySprites(){
 const mode=getMode(),src=characterImg();
 const patterns=/(?:v18-avatar-(?:woo-jin|lukas|alex)\.svg|hf-avatar|hf27-)/;
 document.querySelectorAll('#main img,#sideNav img,#socialHeader img').forEach(img=>{
  if(img.classList.contains('rpg27-nonavatar'))return;
  if(img.classList.contains('rpg27-character')||patterns.test(img.getAttribute('src')||'')){
   // Only change the current-world avatar, never other-language character portraits.
   if(img.classList.contains('rpg27-character')||((img.getAttribute('src')||'').includes(mode==='ko'?'woo-jin':mode==='de'?'lukas':'alex'))){
    img.src=src;img.classList.add('rpg27-character');
   }
  }
 });
}
function transformHome(){
 const main=document.querySelector('#main .rpg26-home');if(!main)return;
 const hero=main.querySelector('.rpg26-hero'),heading=main.querySelector('.rpg26-header');
 if(!hero)return;
 hero.classList.add('rpg27-hero');
 const caption=hero.querySelector('.rpg26-copy');
 if(caption&&!caption.querySelector('.rpg27-pills')){
  const pills=add('div','rpg27-pills');
  pills.innerHTML='<span>✦ LV. 1</span><span>◇ STORY</span><span>★ XP</span>';
  caption.prepend(pills);
 }
 if(!hero.querySelector('.rpg27-petal-field')){
  const petals=add('div','rpg27-petal-field');petals.setAttribute('aria-hidden','true');
  for(let i=0;i<14;i++){
   let dot=add('i');dot.style.left=(i*31%95+2)+'%';dot.style.top=(-i*11%58)+'%';
   dot.style.animationDelay=(-i*.6)+'s';dot.style.animationDuration=(7+i%5)+'s';petals.append(dot);
  }hero.append(petals);
 }
 if(!hero.querySelector('.rpg27-shop')){
  const deco=add('div','rpg27-shop');deco.setAttribute('aria-hidden','true');
  deco.innerHTML='<span class="rpg27-shop-roof"></span><span class="rpg27-shop-wall"><i></i><i></i><i></i></span><span class="rpg27-shop-sign">QUEST</span>';
  hero.querySelector('.rpg26-hero-art')?.append(deco);
 }
 if(!heading.querySelector('.rpg27-user-mark')){
  const b=add('div','rpg27-user-mark');b.innerHTML='<strong>✦ '+labels[getMode()].city.toUpperCase()+'</strong><small>PIXEL LANGUAGE WORLD</small>';
  heading.querySelector('.rpg26-heading')?.append(b);
 }
 const quest=main.querySelectorAll('.rpg26-quest');
 quest.forEach((btn,i)=>{btn.classList.add('rpg27-quest');btn.dataset.quest=String(i+1);
 if(!btn.querySelector('.rpg27-quest-gem')){const e=add('span','rpg27-quest-gem',['◆','▤','✦','▶'][i]);btn.append(e)}
 });
 applySprites();
}
function transformMap(){
 const main=document.querySelector('#main .rpg26-map-page');if(!main)return;
 main.classList.add('rpg27-map');
 const canvas=main.querySelector('.v18-map-canvas');if(canvas&&!canvas.querySelector('.rpg27-map-marker')){
  const decos=[['🌸',9,9],['🏡',84,14],['🌲',11,71],['✦',80,82],['🌳',80,48]];
  decos.forEach(([name,x,y])=>{const marker=add('span','rpg27-map-marker',name);marker.style.left=x+'%';marker.style.top=y+'%';marker.setAttribute('aria-hidden','true');canvas.append(marker)});
 }
 main.querySelectorAll('.v18-map-pin').forEach((pin,i)=>{
  pin.classList.add('rpg27-pin');pin.style.setProperty('--pin-delay',(i*.15)+'s');
  if(!pin.querySelector('.rpg27-pin-led'))pin.append(add('span','rpg27-pin-led'));
 });
 main.querySelectorAll('.rpg26-chapter').forEach((card,i)=>{
  card.classList.add('rpg27-level-card');if(!card.querySelector('.rpg27-card-mark'))card.append(add('span','rpg27-card-mark',(i+1<10?'0':'')+(i+1)));
 });
}
function transformContent(){
 const main=document.querySelector('#main .rpg26-content');if(!main)return;
 main.classList.add('rpg27-content');
 const m=labels[getMode()];
 if(!main.querySelector('.rpg27-quest-status')){
  const parent=main.querySelector('.rpg26-page-banner');
  if(parent){const info=add('div','rpg27-quest-status');info.innerHTML='<div><strong>✦ '+m.chapter+'</strong><small>STORY · WORDS · QUIZ</small></div><div class="rpg27-quest-dots"><span class="done"></span><span class="done"></span><span></span><span></span><span></span></div>';parent.after(info)}
 }
 main.querySelectorAll('.v25-card,.wj-world-vocab-card,.v18-vocab-card,.wj-world-mission-scene,.s32-scene,.v36-quiz-sheet').forEach(e=>e.classList.add('rpg27-card'));
 main.querySelectorAll('.v36-quiz-options button,.s32-options button,.wj-world-choices button').forEach((b,i)=>{b.classList.add('rpg27-answer');if(!b.querySelector('.rpg27-answer-index'))b.prepend(add('span','rpg27-answer-index','ABCD'[i%4]))});
 applySprites();
}
function transformNav(){
 const side=document.getElementById('sideNav');if(side){
 side.classList.add('rpg27-nav');
 const buttons=side.querySelectorAll('button.nav');
 buttons.forEach((b,i)=>{b.classList.add('rpg27-nav-item');b.style.setProperty('--nav-i',String(i))});
 }
 const top=document.getElementById('socialHeader');
 if(top)top.classList.add('rpg27-top');
 applySprites();
}
function update(){
 try{transformHome();transformMap();transformContent();transformNav()}catch(e){console.warn('RPG27 decorate:',e)}
}
const previous=render;
render=function(){const value=previous.apply(this,arguments);update();return value};
update();loadSprites();
})();