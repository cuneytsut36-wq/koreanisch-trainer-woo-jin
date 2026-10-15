/* LinguaWorld V32 — minimal, calm, consistent interface.
   Pure UI refinement. Never changes lesson data, saved progress, quizzes, chat, or media.
*/
(function(){
'use strict';
const labels={
  de:{home:'Start',story:'Story',vocab:'Wörter',coach:'Coach',progress:'Profil',settings:'Wiedergabeoptionen',subtitle:'Lerne Schritt für Schritt.',more:'Mehr entdecken',daily:'Dein Fortschritt'},
  en:{home:'Home',story:'Story',vocab:'Words',coach:'Coach',progress:'Profile',settings:'Playback options',subtitle:'Learn one step at a time.',more:'Explore more',daily:'Your progress'},
  tr:{home:'Ana sayfa',story:'Hikâye',vocab:'Kelimeler',coach:'Eğitmen',progress:'Profil',settings:'Oynatma seçenekleri',subtitle:'Adım adım öğren.',more:'Daha fazlasını keşfet',daily:'İlerlemen'},
  es:{home:'Inicio',story:'Historia',vocab:'Palabras',coach:'Tutor',progress:'Perfil',settings:'Opciones de reproducción',subtitle:'Aprende paso a paso.',more:'Descubre más',daily:'Tu progreso'},
  fr:{home:'Accueil',story:'Histoire',vocab:'Mots',coach:'Coach',progress:'Profil',settings:'Options de lecture',subtitle:'Apprends pas à pas.',more:'En découvrir plus',daily:'Ta progression'},
  ja:{home:'ホーム',story:'ストーリー',vocab:'単語',coach:'コーチ',progress:'プロフィール',settings:'再生オプション',subtitle:'一歩ずつ学ぼう。',more:'もっと見る',daily:'学習の進捗'},
  ko:{home:'홈',story:'스토리',vocab:'단어',coach:'코치',progress:'프로필',settings:'재생 옵션',subtitle:'한 걸음씩 배워요.',more:'더 알아보기',daily:'나의 진도'}
};
const icons={
  home:'M3 11.5 12 4l9 7.5V21h-6v-7H9v7H3z',
  story:'M4 5h7l2 2h7v12H4z M8 12h8M8 16h6',
  vocab:'M4 4h7c2 0 3 1 3 3v14c0-2-1-3-3-3H4z M20 4h-3c-2 0-3 1-3 3v14c0-2 1-3 3-3h3z',
  coach:'M4 5h16v11H9l-5 4z M8 10h8M8 13h5',
  progress:'M4 19V12h4v7z M10 19V7h4v12z M16 19V3h4v16z'
};
const routes=[['home','home'],['storyMap','story'],['studyScroll','vocab'],['wooJin','coach'],['progress','progress']];
function tr(k){
  const n=typeof v27Lang==='string'?v27Lang:'de';
  return (labels[n]||labels.de)[k]||labels.de[k]||k;
}
function ico(name){
  return '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="'+icons[name]+'"/></svg>';
}
function simplifySidebar(){
 const aside=document.getElementById('sideNav');if(!aside)return;
 aside.classList.add('lw32-sidebar');
 aside.querySelectorAll('.lw31-guide:not(.selected)').forEach(x=>x.remove());
 aside.querySelector('.lw31-guide-copy em')?.remove();
 const logo=aside.querySelector('.lw31-side-logo small');
 if(logo)logo.textContent=tr('subtitle');
 const links=aside.querySelector('.lw31-nav-list');
 if(links){
   [...links.querySelectorAll('button')].forEach(b=>{if((b.getAttribute('onclick')||'').includes('startQuiz('))b.remove()});
   const ordered=['home','storyMap','studyScroll','wooJin','media','progress'];
   ordered.forEach(page=>{
     const link=[...links.querySelectorAll('button')].find(b=>(b.getAttribute('onclick')||'').includes("go('"+page+"')"));
     if(link)links.append(link);
   });
 }
 const daily=aside.querySelector('.lw31-daily');
 if(daily){
  daily.querySelector('span')?.remove();
  const badge=daily.querySelector('strong');if(badge)badge.textContent=tr('daily');
 }
}
function bottomNavigation(){
 const bar=document.getElementById('bottomNav');if(!bar)return;
 bar.classList.add('lw32-bottom');
 const current=typeof state?.page==='string'?state.page:'home';
 bar.innerHTML=routes.map(([page,name])=>
  '<button type="button" class="lw32-tab '+(current===page?'is-active':'')+'" aria-current="'+(current===page?'page':'false')+'" onclick="go(\''+page+'\')">'+ico(name)+'<span>'+tr(name)+'</span></button>'
 ).join('');
}
function simplifyMain(){
 const main=document.getElementById('main');if(!main)return;
 const current=typeof state?.page==='string'?state.page:'home';
 main.classList.add('lw32-main');
 main.classList.remove('lw32-home-page','lw32-map-page','lw32-story-page','lw32-words-page','lw32-coach-page','lw32-media-page','lw32-progress-page','lw32-other-page');
 main.classList.add(({home:'lw32-home-page',storyMap:'lw32-map-page',storyMission:'lw32-story-page',studyScroll:'lw32-words-page',lesson:'lw32-words-page',wooJin:'lw32-coach-page',media:'lw32-media-page',progress:'lw32-progress-page'})[current]||'lw32-other-page');
 // Previous vocabulary CSS leaked into unrelated routes. Confine it to vocabulary.
 if(!['studyScroll','lesson'].includes(current)){
   main.classList.remove('lw30-vocab','lw31-vocab');
 }
 main.querySelectorAll('.v24-map-hero,.v24-mission-banner,.v24-vocab-flag,.v24-artbook').forEach(x=>x.remove());
 main.querySelectorAll('.lw31-petals,.lw31-hanok,.lw30-sakura').forEach(x=>x.remove());
 if(current==='storyMission'){
   main.querySelectorAll('.v18-scene-strip').forEach(x=>x.remove());
 }
 if(current==='storyMap'){
   main.querySelectorAll('.v18-guide-strip').forEach(x=>x.remove());
 }
}
function home(){
 const root=document.querySelector('#main .lw31-home');if(!root)return;
 root.classList.add('lw32-home');
 const hero=root.querySelector('.lw31-hero');if(hero)hero.classList.add('lw32-hero');
 const xp=root.querySelector('.lw30-status');if(xp)xp.classList.add('lw32-status');
 const speech=root.querySelector('.lw31-speech');if(speech){
    speech.classList.add('lw32-speech');
    // Single clear greeting plus useful descriptive text. Redundant final country line removed.
    const pieces=speech.querySelectorAll('span');
    if(pieces.length>1)pieces[pieces.length-1].remove();
 }
 const countries=root.querySelector('.lw31-country-switch');if(countries)countries.classList.add('lw32-countries');
 const actions=root.querySelector('.lw31-actions');if(actions)actions.classList.add('lw32-actions');
 root.querySelector('.lw30-bottom-space')?.remove();
}
function map(){
 const root=document.querySelector('#main .lw31-map');if(!root)return;
 root.classList.add('lw32-map');
 root.querySelector('.lw30-map-head p')?.classList.add('lw32-muted');
 const chapter=root.querySelector('.lw31-chapters');if(chapter)chapter.classList.add('lw32-chapters');
 const mapPanel=root.querySelector('.lw30-map-canvas');if(mapPanel)mapPanel.classList.add('lw32-map-canvas');
 root.querySelector('.lw31-map-sparkle')?.remove();
 root.querySelectorAll('.lw31-pin-dot').forEach(n=>n.remove());
}
function story(){
 const root=document.querySelector('#main .lw31-story');if(!root)return;
 root.classList.add('lw32-story');
 root.querySelector('.lw31-story-art')?.classList.add('lw32-story-art');
 root.querySelector('.lw31-story-bubble')?.classList.add('lw32-story-bubble');
 root.querySelector('.lw31-story-termcards')?.classList.add('lw32-phrase-grid');
 root.querySelector('.lw31-next')?.classList.add('lw32-next');
}
function vocabulary(){
 const main=document.getElementById('main');
 if(!main)return;main.classList.add('lw32-vocab');
 const header=main.querySelector('.lw31-vocab-header');if(header)header.classList.add('lw32-vocab-head');
 const settings=main.querySelector('.v25-settings');
 if(settings&&!settings.closest('.lw32-playback')){
   const details=document.createElement('details');details.className='lw32-playback';
   const summary=document.createElement('summary');summary.textContent=tr('settings');
   settings.replaceWith(details);details.append(summary,settings);
 }
 main.querySelectorAll('.lw31-vocab-tile').forEach(x=>x.classList.add('lw32-word-card'));
 main.querySelector('.lw31-vocab-detail')?.classList.add('lw32-word-detail');
 main.querySelector('.v18-vocab-promo')?.classList.add('lw32-hide-promo');
}
function coach(){
 const main=document.getElementById('main');if(!main)return;
 main.querySelector('.v18-coach-mount')?.classList.add('lw32-coach');
 main.querySelector('.v22-page.v22-woojin')?.classList.add('lw32-chat');
 const status=main.querySelector('.wj-open-status');
 if(status&&!status.querySelector('.lw32-ai-note')){
   const paras=[...status.children].filter(el=>el.tagName==='P');
   if(paras.length){
      const details=document.createElement('details');details.className='lw32-ai-note';
      const label=document.createElement('summary');
      label.textContent=({de:'Wie funktioniert der KI-Chat?',en:'How does AI chat work?',tr:'Yapay zekâ sohbeti nasıl çalışır?',fr:'Comment fonctionne le chat IA ?',es:'¿Cómo funciona el chat IA?',ja:'AIチャットについて',ko:'AI 채팅 정보'})[typeof v27Lang==='string'?v27Lang:'de']||'Wie funktioniert der KI-Chat?';
      details.append(label);paras.forEach(p=>details.append(p));status.append(details);
   }
 }
 if(wjTarget==='ko')main.querySelector('.v18-guide-page')?.classList.add('lw32-duplicate-guide');
}
function media(){
 const main=document.getElementById('main');if(!main)return;
 main.querySelector('.v26-reels')?.classList.add('lw32-media');
}
function progress(){
 const main=document.getElementById('main');if(!main)return;
 main.classList.add('lw32-progress');
}
function refine(){
 try{
  document.documentElement.dataset.lw32=wjTarget;
  // Respect an explicitly chosen sound preference; new clean UI defaults to silent.
  try{if(localStorage.getItem('lw31-sfx')===null)localStorage.setItem('lw31-sfx','off')}catch(e){}
  simplifyMain();simplifySidebar();bottomNavigation();
  const page=state?.page;
  if(page==='home')home();
  else if(page==='storyMap')map();
  else if(page==='storyMission')story();
  else if(page==='studyScroll'||page==='lesson')vocabulary();
  else if(page==='wooJin')coach();
  else if(page==='media')media();
  else if(page==='progress')progress();
 }catch(e){console.warn('LinguaWorld minimal design:',e)}
}
const previous=render;
render=function(){const result=previous.apply(this,arguments);refine();return result};
window.lw32Refine=refine;
refine();
})();