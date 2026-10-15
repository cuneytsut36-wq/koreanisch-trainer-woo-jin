/* V23: small clean crisp SVG sprites for functional app symbols only.
   Flags, cultural imagery, learner text and tutor avatars are intentionally preserved. */
(function(){
'use strict';
const sprites={
 home:'M3 12 12 3 21 12 21 21 14 21 14 15 10 15 10 21 3 21Z',
 story:'M5 3 12 3 12 5 20 5 20 20 15 20 15 22 5 22ZM7 7 10 7 10 9 7 9ZM7 11 17 11 17 13 7 13ZM7 15 17 15 17 17 7 17Z',
 book:'M2 5 10 5 12 7 14 5 22 5 22 20 14 20 12 22 10 20 2 20ZM5 8 9 8 9 10 5 10ZM5 12 9 12 9 14 5 14ZM15 8 19 8 19 10 15 10ZM15 12 19 12 19 14 15 14Z',
 play:'M5 3 9 3 9 6 13 6 13 9 17 9 17 12 21 12 21 15 17 15 17 18 13 18 13 21 9 21 9 24 5 24Z',
 spark:'M10 1 14 1 14 7 17 7 17 10 23 10 23 14 17 14 17 17 14 17 14 23 10 23 10 17 7 17 7 14 1 14 1 10 7 10 7 7 10 7Z',
 lock:'M7 3 17 3 17 6 19 6 19 11 21 11 21 22 3 22 3 11 5 11 5 6 7 6ZM9 7 9 11 15 11 15 7ZM11 15 13 15 13 19 11 19Z',
 arrow:'M5 9 13 9 13 4 21 12 13 20 13 15 5 15Z',
 sound:'M2 9 7 9 7 6 13 2 13 22 7 18 7 15 2 15ZM16 7 18 7 18 9 20 9 20 15 18 15 18 17 16 17 16 14 17 14 17 10 16 10Z',
 quiz:'M4 3 20 3 20 21 4 21ZM7 7 10 7 10 10 7 10ZM12 7 17 7 17 9 12 9ZM7 13 10 13 10 16 7 16ZM12 13 17 13 17 15 12 15Z'
};
const FILL={home:'#',story:'#',book:'#',play:'#',spark:'#',lock:'#',arrow:'#',sound:'#',quiz:'#'};
const svg=n=>'<span class="px-icon" aria-hidden="true"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="'+sprites[n]+'"/></svg></span>';
function applicable(){return document.documentElement.hasAttribute('data-learning-mode')}
function rethemeIcons(){
 if(!applicable())return;
 const selectors=[
  ['#sideNav .v22-navico, #bottomNav button>span:first-child',['home','story','book','play','spark']],
  ['.v19-action-icon',['story','book','spark']],
  ['.v18-action .em',['story','book','quiz','spark']]
 ];
 for(const [selector,types]of selectors){
   const nodes=document.querySelectorAll(selector);
   nodes.forEach((el,i)=>{
    const type=types[i%types.length];
    if(el.dataset.pxSprite===type)return;
    el.dataset.pxSprite=type;
    el.innerHTML=svg(type);
   });
 }
 const locks=document.querySelectorAll('.v18-map-pin .v18-lock, .wj-world-chapter.locked>span:first-child, .v36-quiz-banner.locked .v36-quiz-medal');
 locks.forEach(el=>{if(el.dataset.pxSprite)return;const t=(el.textContent||'').trim();if(t==='🔒'){el.dataset.pxSprite='lock';el.innerHTML=svg('lock')}});
}
const prior=render;
render=function(){const value=prior.apply(this,arguments);rethemeIcons();return value};
window.wjPixelIcons=rethemeIcons;
rethemeIcons();
})();