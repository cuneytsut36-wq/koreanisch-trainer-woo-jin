/* LinguaWorld V35 – clean pixel social UX. Keep content, API, saved progress. */
(function(){
'use strict';
const worldNames={ko:'Korea',de:'Deutschland',en:'English'};
const flags={ko:'🇰🇷',de:'🇩🇪',en:'🇬🇧'};
const words={
de:{switch:'Lernwelt wechseln',next:'Nächste Karte',prev:'Vorherige Karte',swipe:'Wische, um weiterzulernen',guide:'Wähle eine Sprache'},
en:{switch:'Change learning world',next:'Next card',prev:'Previous card',swipe:'Swipe to continue',guide:'Choose a language'},
tr:{switch:'Öğrenme dünyasını değiştir',next:'Sonraki kart',prev:'Önceki kart',swipe:'Devam etmek için kaydır',guide:'Bir dil seç'},
ja:{switch:'学ぶ言語を変更',next:'次のカード',prev:'前のカード',swipe:'スワイプして進む',guide:'言語を選択'},
ko:{switch:'학습 세계 바꾸기',next:'다음 카드',prev:'이전 카드',swipe:'밀어서 계속하기',guide:'언어 선택'},
es:{switch:'Cambiar idioma',next:'Siguiente tarjeta',prev:'Tarjeta anterior',swipe:'Desliza para seguir',guide:'Elige un idioma'},
fr:{switch:'Changer de langue',next:'Carte suivante',prev:'Carte précédente',swipe:'Glisse pour continuer',guide:'Choisis une langue'}
};
function t(k){return(words[typeof v27Lang==='string'?v27Lang:'de']||words.de)[k]||words.de[k]||k}
function button(cls,txt){const b=document.createElement('button');b.type='button';b.className=cls;b.textContent=txt;return b}
function openLanguagePicker(){
 let panel=document.querySelector('.lw34-welcome');
 if(!panel){
  try{localStorage.removeItem('linguaworld-v34-world-chosen')}catch(e){window.__lw34Selected=false}
  if(window.__lw34Selected)window.__lw34Selected=false;
  window.lw34ForceWelcome=true;
  // V34 does not export welcome(); temporarily enter home through its normal render,
  // then create an accessible independent welcome chooser.
  panel=document.createElement('section');panel.className='lw35-world-overlay';
  panel.setAttribute('role','dialog');panel.setAttribute('aria-modal','true');
  panel.setAttribute('aria-label',t('guide'));
  panel.innerHTML='<div class="lw35-world-panel"><div class="lw35-world-mark">✦ LinguaWorld</div><h1>'+t('guide')+'</h1><div class="lw35-world-grid">'+
   Object.entries(worldNames).map(([code,name])=>'<button type="button" data-language="'+code+'"><span class="lw35-flag">'+flags[code]+'</span><strong>'+name+'</strong></button>').join('')+
   '</div><button class="lw35-dismiss" type="button" aria-label="Close">×</button></div>';
  document.body.append(panel);
  const close=()=>{panel.remove();try{localStorage.setItem('linguaworld-v34-world-chosen','yes')}catch(e){}window.__lw34Selected=true};
  panel.querySelectorAll('[data-language]').forEach(b=>b.addEventListener('click',()=>{
   const key=b.dataset.language;close();if(typeof wjSwitchTarget==='function'&&wjTarget!==key)wjSwitchTarget(key);go('home');
  }));
  panel.querySelector('.lw35-dismiss').addEventListener('click',close);
  panel.addEventListener('click',e=>{if(e.target===panel)close()});
  panel.querySelector('[data-language="'+wjTarget+'"]')?.focus({preventScroll:true});
 }
}
function transformExistingWelcome(){
 const v=document.querySelector('.lw34-welcome');if(!v||v.dataset.lw35Ready)return;
 v.dataset.lw35Ready='1';v.classList.add('lw35-welcome');
 const start=v.querySelector('.lw34-enter');if(start)start.hidden=true;
 v.querySelectorAll('.lw34-world').forEach(b=>{
  b.addEventListener('click',()=>{
   const selection=b.dataset.world;
   try{localStorage.setItem('linguaworld-v34-world-chosen','yes')}catch(e){}
   window.__lw34Selected=true;
   v.remove();
   if(typeof wjSwitchTarget==='function'&&wjTarget!==selection)wjSwitchTarget(selection);
   go('home');
  });
 });
}
function refineHeader(){
 const bar=document.querySelector('#main .lw34-topbar');if(!bar)return;
 bar.classList.add('lw35-header');
 const actions=bar.querySelector('.lw34-top-actions');if(!actions)return;
 if(!actions.querySelector('.lw35-current-world')){
  const b=button('lw35-current-world',flags[wjTarget]||flags.ko);
  b.setAttribute('aria-label',t('switch'));b.title=t('switch');
  b.addEventListener('click',openLanguagePicker);actions.prepend(b);
 }
 const current=actions.querySelector('.lw35-current-world');if(current){current.textContent=flags[wjTarget]||flags.ko;current.title=t('switch')}
 bar.querySelector('.lw34-brand strong')?.classList.add('lw35-wordmark');
 bar.querySelector('.lw34-heart')?.classList.add('lw35-heart');
}
function home(){
 const card=document.querySelector('#main .lw34-home');if(!card)return;
 card.classList.add('lw35-home');
 card.querySelector('.lw34-hero')?.classList.add('lw35-hero');
 card.querySelector('.lw34-status')?.classList.add('lw35-status');
 card.querySelector('.lw34-quicklinks')?.classList.add('lw35-actions');
 card.querySelector('.lw34-greeting')?.classList.add('lw35-greeting');
 card.querySelectorAll('.lw30-hero-words p').forEach(n=>{if(n.textContent.trim().length>145)n.textContent=n.textContent.slice(0,140)+'…'});
}
function markSwipeFeed(){
 const main=document.getElementById('main');if(!main)return;
 const feed=main.querySelector('#v25-track,#wj-world-feed');if(!feed)return;
 main.classList.add('lw35-vocab');
 feed.classList.add('lw35-feed');
 const cards=Array.from(feed.querySelectorAll('.v25-word,.wj-world-word'));
 cards.forEach((c,i)=>{
  c.classList.add('lw35-card');c.classList.remove('lw32-word-card','lw31-vocab-tile');
  c.style.removeProperty('display');c.dataset.slide=String(i+1);
 });
 if(!feed.dataset.lw35Bound){
  feed.dataset.lw35Bound='1';
  feed.setAttribute('aria-label',t('swipe'));
  feed.setAttribute('tabindex','0');
 }
 const shell=feed.closest('.v25-learning,.wj-world-vocab')||feed.parentElement;
 if(!shell)return;
 let controls=shell.querySelector('.lw35-feed-controls');
 if(!controls){
  controls=document.createElement('div');controls.className='lw35-feed-controls';
  controls.innerHTML='<button class="lw35-prev" type="button" aria-label="'+t('prev')+'">↑</button><span class="lw35-counter" aria-live="polite">1 / '+cards.length+'</span><button class="lw35-next" type="button" aria-label="'+t('next')+'">↓</button>';
  feed.insertAdjacentElement('afterend',controls);
  controls.querySelector('.lw35-prev').addEventListener('click',()=>move(-1));
  controls.querySelector('.lw35-next').addEventListener('click',()=>move(1));
 }
 function currentIndex(){
  const top=feed.scrollTop;
  let best=0,dist=Infinity;
  cards.forEach((c,i)=>{const d=Math.abs(c.offsetTop-feed.offsetTop-top);if(d<dist){best=i;dist=d}});
  return best;
 }
 function updateCounter(){const counter=shell.querySelector('.lw35-counter');if(counter)counter.textContent=Math.min(cards.length,currentIndex()+1)+' / '+cards.length}
 function move(delta){
  const index=Math.max(0,Math.min(cards.length-1,currentIndex()+delta));
  const card=cards[index];if(!card)return;
  feed.scrollTo({top:card.offsetTop-feed.offsetTop,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
  updateCounter();
 }
 if(!feed.dataset.lw35ScrollBound){
  feed.dataset.lw35ScrollBound='1';
  let raf=0;feed.addEventListener('scroll',()=>{if(raf)return;raf=requestAnimationFrame(()=>{raf=0;updateCounter()})},{passive:true});
  feed.addEventListener('keydown',e=>{if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();move(e.key==='ArrowDown'?1:-1)}});
 }
 updateCounter();
}
function refine(){
 try{
  document.documentElement.dataset.lw35=wjTarget;
  transformExistingWelcome();refineHeader();
  document.querySelector('#main .lw34-home')&&home();
  if(state.page==='studyScroll'||state.page==='lesson')markSwipeFeed();
  document.querySelector('#bottomNav')?.classList.add('lw35-nav');
  document.querySelector('#sideNav')?.classList.add('lw35-side');
 }catch(err){console.warn('LinguaWorld V35:',err)}
}
const old=render;render=function(){const v=old.apply(this,arguments);refine();return v};
window.lw35Refine=refine;refine();
})();