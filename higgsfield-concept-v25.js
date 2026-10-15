/* V25 authentic Higgsfield concept imagery overlays the existing learning engine. */
(function(){
'use strict';
const cdn='https://d8j0ntlcm91z4.cloudfront.net/user_3KgDSNgRcYHCEkF9DO7qAnjsYND/hf_20261015_145647_';
const concept={
ko:{scene:cdn+'b1382254-572d-4f86-bd90-223f03f1b7dc.png',map:cdn+'dcc8e91a-4034-4d33-9361-1e509b4a87f4.png',label:'SEOUL • BUSAN • GYEONGJU • JEJU'},
de:{scene:cdn+'400fac1b-18d2-4f09-b023-8bd4bf1e7e8d.png',map:cdn+'400fac1b-18d2-4f09-b023-8bd4bf1e7e8d.png',label:'BERLIN • MÜNCHEN • HAMBURG • KÖLN'},
en:{scene:'assets/v24-en-dreamscape.svg',map:'assets/v24-en-dreamscape.svg',label:'LONDON • EDINBURGH • OXFORD • MANCHESTER'}
};
const lessonConcept=cdn+'d0d6ce16-8fc3-4e63-8a99-55793f20e952.png';
const localName={de:'Pixel-Abenteuer',en:'Pixel adventure',tr:'Piksel macerası',ja:'ピクセルの冒険',ko:'픽셀 모험',es:'Aventura pixelada',fr:'Aventure pixel'};
const localize=(a)=>typeof window.wjUniversalText==='function'?window.wjUniversalText(a):a;
function make(tag,cls,text){const el=document.createElement(tag);if(cls)el.className=cls;if(text!==undefined)el.textContent=text;return el}
function enrichHome(){
const root=document.querySelector('#main .v19-home');if(!root)return;
const hero=root.querySelector('.v19-hero');if(!hero)return;
if(!hero.querySelector('.hf25-ambient')){
 const layer=make('div','hf25-ambient');layer.setAttribute('aria-hidden','true');
 for(let i=0;i<15;i++){const p=make('i','hf25-drift');p.style.setProperty('--x',(5+(i*19)%93)+'%');p.style.setProperty('--delay',(-i*.67)+'s');p.style.setProperty('--speed',(7+i%7)+'s');layer.append(p)}
 for(let i=0;i<6;i++){const p=make('i','hf25-glimmer');p.style.setProperty('--x',(8+(i*17)%84)+'%');p.style.setProperty('--y',(8+(i*29)%83)+'%');p.style.setProperty('--delay',(-i*.4)+'s');layer.append(p)}
 hero.append(layer);
}
if(!hero.querySelector('.hf25-hero-tag'))hero.append(make('span','hf25-hero-tag','✦ '+(localName[v27Lang]||localName.de)+' · A1–C2'));
}
function enrichMap(){
const root=document.querySelector('#main .v18-map-page');if(!root)return;const config=concept[wjTarget]||concept.ko;
const old=root.querySelector('.v24-map-hero');if(old)old.remove();
const header=root.querySelector('.v18-map-head');
if(header&&!root.querySelector('.hf25-map-banner')){
 const banner=make('div','hf25-map-banner');
 banner.style.backgroundImage='linear-gradient(0deg,#060c20dc,transparent 75%),url("'+config.map+'")';
 banner.append(make('span','', '✦ PIXEL QUEST · '+config.label));header.after(banner);
}
const canvas=root.querySelector('.v18-map-canvas');
if(canvas){
 canvas.dataset.hf25=wjTarget;
 const oldLandmarks=canvas.querySelector('.v24-map-landmarks');if(oldLandmarks)oldLandmarks.remove();
 if(!canvas.querySelector('.hf25-pixel-locations')){
 const places=make('div','hf25-pixel-locations');places.setAttribute('aria-hidden','true');
 const icons=wjTarget==='ko'?['🏯','⛩️','🗼','🌸']:wjTarget==='de'?['🏰','🏛️','⛪','🚉']:['🏰','🌉','☕','🚌'];
 for(let i=0;i<4;i++){const el=make('div','hf25-location',icons[i]);el.style.left=[9,78,9,83][i]+'%';el.style.top=[13,16,75,75][i]+'%';places.append(el)}
 canvas.append(places);
 }
}
const scene=root.querySelector('.v18-scene-strip img');if(scene)scene.src=config.map;
const cards=root.querySelectorAll('.wj-world-chapter,.s32-chapters button');
cards.forEach((card,i)=>{
if(card.dataset.hf25Chapter)return;
card.dataset.hf25Chapter='1';card.classList.add('hf25-chapter');
const image=make('span','hf25-chapter-art');image.setAttribute('aria-hidden','true');
image.style.backgroundImage='url("'+config.map+'")';image.style.backgroundPosition=(i%4*30)+'% '+((i*29)%80)+'%';
card.prepend(image);
});
}
function enrichLessons(){
const root=document.querySelector('#main .v18-shell');if(!root||root.classList.contains('v18-map-page')||root.classList.contains('v19-home'))return;
const art=root.querySelector('.v24-mission-banner img');if(art)art.src=lessonConcept;
if(!root.querySelector('.hf25-quest-head')){
 const mission=root.querySelector('.wj-world-mission,.s32-mission,.v36-level-quiz,.v36-quiz-sheet');
 if(mission){const head=make('div','hf25-quest-head');head.append(make('span','hf25-quest-sigil','✦'),make('span','',(localName[v27Lang]||localName.de)+' · '+(wjTarget==='ko'?'KOREA':wjTarget==='de'?'GERMANY':'BRITAIN')));mission.before(head)}
}
root.querySelectorAll('.wj-world-word,.v25-card,.v36-quiz-sheet').forEach(el=>el.classList.add('hf25-learning-card'));
}
function enrichCoach(){
const root=document.querySelector('#main .v18-coach-mount');if(!root)return;
const picture=root.querySelector('.v18-guide-page img');if(picture)picture.classList.add('hf25-portrait');
const stage=root.querySelector('.v18-guide-page');if(stage&&!stage.querySelector('.hf25-coach-stars')){const stars=make('div','hf25-coach-stars','✦  ☆  ✦');stars.setAttribute('aria-hidden','true');stage.append(stars)}
}
function decorate(){
const key=concept[wjTarget]?wjTarget:'ko',config=concept[key],page=document.getElementById('main');if(!page)return;
const hero=page.querySelector('.v19-hero');
if(hero){hero.classList.add('hf25-hero');hero.style.setProperty('--hf25-bg','url("'+config.scene+'")');const old=hero.querySelector('.v19-scene');if(old)old.setAttribute('aria-hidden','true')}
const sidebar=document.getElementById('sideNav');if(sidebar)sidebar.classList.add('hf25-sidebar');
enrichHome();enrichMap();enrichLessons();enrichCoach();
const gallery=page.querySelector('.v24-artbook');if(gallery)gallery.remove();
}
const oldRender=render;
render=function(){const r=oldRender.apply(this,arguments);try{decorate()}catch(e){console.warn('Higgsfield V25 visuals',e)}return r};
window.hf25Decorate=decorate;decorate();
})();