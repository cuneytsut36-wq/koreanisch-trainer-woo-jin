/* LinguaWorld V33 – clean layout & ORIGINAL vertical swipe vocabulary.
 * Original Korean and German/English vocabulary engines remain authoritative.
 * Never copies or resets course data, progress, favorites or audio state.
 */
(function(){
'use strict';
window.lw33ClassicSwipe=true;
const names={
 de:'Nach oben wischen · Eine Karte nach der anderen',
 en:'Swipe up · One card at a time',
 tr:'Yukarı kaydır · Her seferinde bir kart',
 ko:'위로 밀어 넘기기 · 카드 하나씩',
 ja:'上にスワイプ · 1枚ずつ学習',
 es:'Desliza hacia arriba · Una tarjeta a la vez',
 fr:'Glisse vers le haut · Une carte à la fois'
};
function native(){return (typeof v27Lang==='string'&&names[v27Lang])?v27Lang:'de'}
function restoreSwipe(){
 const main=document.getElementById('main');
 if(!main||!['studyScroll','lesson'].includes(state.page))return;
 main.classList.add('lw33-swipe');
 // Remove the duplicate V30 grid header and categories. The original feed has its own
 // real level controls, text, voice buttons, learned-state and IntersectionObserver.
 main.querySelector('.lw30-vocab-head')?.remove();
 main.querySelector('.lw31-vocab-detail')?.remove();
 main.querySelectorAll('.lw31-vocab-more,.lw31-vocab-empty').forEach(el=>el.remove());
 const feed=main.querySelector('#v25-track,#wj-world-feed');
 if(!feed)return;
 feed.classList.add('lw33-swipe-feed');
 const cards=feed.querySelectorAll('.v25-word,.wj-world-word');
 cards.forEach(card=>{
    card.style.removeProperty('display');
    card.classList.remove('lw31-vocab-tile','lw32-word-card','lw31-selected');
    card.classList.add('lw33-swipe-card');
 });
 // Prevent an accidental stale grid from a previous cached JS layer.
 main.classList.remove('lw30-vocab','lw31-vocab','lw32-vocab');
 const shell=feed.closest('.v25-learning,.wj-world-vocab');
 if(shell)shell.classList.add('lw33-learning');
 if(shell&&!shell.querySelector('.lw33-swipe-tip')){
   const hint=document.createElement('p');
   hint.className='lw33-swipe-tip';
   hint.textContent=names[native()];
   feed.insertAdjacentElement('beforebegin',hint);
 }
 // Default to native browser touch/trackpad scrolling; the original
 // v25Next()/wjWorldNext() buttons and auto modes continue to work.
}
function tidy(){
 const main=document.getElementById('main');
 if(!main)return;
 document.documentElement.dataset.lw33=wjTarget;
 main.classList.add('lw33-main');
 if(state.page==='home'){
   main.querySelector('.lw32-home')?.classList.add('lw33-home');
   main.querySelector('.lw32-hero')?.classList.add('lw33-hero');
   main.querySelector('.lw32-actions')?.classList.add('lw33-actions');
 }
 if(state.page==='storyMap')main.querySelector('.lw32-map')?.classList.add('lw33-map');
 if(state.page==='storyMission')main.querySelector('.lw32-story')?.classList.add('lw33-story');
 if(state.page==='wooJin')main.querySelector('.lw32-chat')?.classList.add('lw33-chat');
 if(['studyScroll','lesson'].includes(state.page))restoreSwipe();
}
const prev=render;
render=function(){const out=prev.apply(this,arguments);tidy();return out};
window.lw33Tidy=tidy;
if(state.page==='studyScroll'||state.page==='lesson'){render();}
else{tidy()}
})();