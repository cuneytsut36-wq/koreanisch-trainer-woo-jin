/* LinguaWorld V34 — minimal pixel x Instagram-style interface.
   Welcome screen before home, hearts + stats drawer, readable swipe feed.
   Preserves all saved learning data and original learning logic.
*/
(function(){
'use strict';
const KEY='linguaworld-v34-world-chosen';
const dict={
de:{welcome:'Willkommen bei LinguaWorld',subtitle:'Wähle deine Sprachreise',tag:'Drei Welten. Dein Abenteuer.',start:'Reise beginnen',home:'Start',stories:'Story',words:'Vokabeln',coach:'Coach',media:'Medien',progress:'Deine Statistik',favorite:'Favoriten',streak:'Serie',learned:'Gelernte Wörter',accuracy:'Trefferquote',close:'Schließen',all:'Alle'},
en:{welcome:'Welcome to LinguaWorld',subtitle:'Choose your language journey',tag:'Three worlds. Your adventure.',start:'Start journey',home:'Home',stories:'Story',words:'Vocabulary',coach:'Coach',media:'Media',progress:'Your statistics',favorite:'Favorites',streak:'Streak',learned:'Words learned',accuracy:'Accuracy',close:'Close',all:'All'},
tr:{welcome:'LinguaWorld’a hoş geldin',subtitle:'Dil yolculuğunu seç',tag:'Üç dünya. Senin maceran.',start:'Yolculuğa başla',home:'Ana sayfa',stories:'Hikâye',words:'Kelimeler',coach:'Eğitmen',media:'Medya',progress:'İstatistiklerin',favorite:'Favoriler',streak:'Seri',learned:'Öğrenilen kelimeler',accuracy:'Doğruluk',close:'Kapat',all:'Tümü'},
ja:{welcome:'LinguaWorldへようこそ',subtitle:'学ぶ言語を選ぼう',tag:'3つの世界、あなただけの冒険',start:'旅を始める',home:'ホーム',stories:'ストーリー',words:'単語',coach:'コーチ',media:'メディア',progress:'学習統計',favorite:'お気に入り',streak:'連続記録',learned:'学習した単語',accuracy:'正答率',close:'閉じる',all:'すべて'},
ko:{welcome:'LinguaWorld에 오신 것을 환영합니다',subtitle:'배울 언어를 선택하세요',tag:'세 개의 세계, 하나의 모험',start:'여행 시작',home:'홈',stories:'스토리',words:'단어',coach:'코치',media:'미디어',progress:'학습 통계',favorite:'즐겨찾기',streak:'연속 학습',learned:'배운 단어',accuracy:'정답률',close:'닫기',all:'전체'},
es:{welcome:'Te damos la bienvenida a LinguaWorld',subtitle:'Elige tu aventura lingüística',tag:'Tres mundos. Tu aventura.',start:'Comenzar viaje',home:'Inicio',stories:'Historias',words:'Vocabulario',coach:'Tutor',media:'Medios',progress:'Tus estadísticas',favorite:'Favoritos',streak:'Racha',learned:'Palabras aprendidas',accuracy:'Precisión',close:'Cerrar',all:'Todos'},
fr:{welcome:'Bienvenue sur LinguaWorld',subtitle:'Choisis ton voyage linguistique',tag:'Trois mondes. Ton aventure.',start:'Commencer le voyage',home:'Accueil',stories:'Histoire',words:'Vocabulaire',coach:'Coach',media:'Médias',progress:'Tes statistiques',favorite:'Favoris',streak:'Série',learned:'Mots appris',accuracy:'Précision',close:'Fermer',all:'Tout'}
};
function t(k){return(dict[typeof v27Lang==='string'?v27Lang:'de']||dict.de)[k]||dict.de[k]||k}
const worlds=[['ko','🇰🇷','Koreanisch','Korea'],['de','🇩🇪','Deutsch','Deutschland'],['en','🇬🇧','Englisch','United Kingdom']];
const art='https://d8j0ntlcm91z4.cloudfront.net/user_3KgDSNgRcYHCEkF9DO7qAnjsYND/hf_20261015_163340_375b460e-df89-4d21-9f9f-baf3d039814b.png';
function el(tag,cls){const x=document.createElement(tag);x.className=cls||'';return x}
function hasChoice(){try{return localStorage.getItem(KEY)==='yes'}catch(e){return window.__lw34Selected===true}}
function markChoice(){window.__lw34Selected=true;try{localStorage.setItem(KEY,'yes')}catch(e){}}
function welcome(){
 if(hasChoice())return;
 if(document.querySelector('.lw34-welcome'))return;
 const section=el('section','lw34-welcome');section.setAttribute('role','dialog');section.setAttribute('aria-modal','true');section.setAttribute('aria-label',t('welcome'));
 section.innerHTML='<div class="lw34-welcome-art" aria-hidden="true"></div><div class="lw34-welcome-content">'+
 '<div class="lw34-kicker">✦ LINGUAWORLD</div><h1>'+t('welcome')+'</h1><p>'+t('subtitle')+'</p><div class="lw34-world-cards">'+
 worlds.map(([key,flag,name,place])=>'<button type="button" class="lw34-world '+(key===wjTarget?'selected':'')+'" data-world="'+key+'" aria-pressed="'+(key===wjTarget)+'"><span class="lw34-world-flag">'+flag+'</span><strong>'+name+'</strong><small>'+place+'</small></button>').join('')+
 '</div><button type="button" class="lw34-enter">'+t('start')+' <span aria-hidden="true">→</span></button><span class="lw34-tagline">'+t('tag')+'</span></div>';
 document.body.append(section);
 section.querySelectorAll('.lw34-world').forEach(b=>b.addEventListener('click',()=>{
  section.querySelectorAll('.lw34-world').forEach(x=>{x.classList.toggle('selected',x===b);x.setAttribute('aria-pressed',x===b?'true':'false')});
  section.dataset.selection=b.dataset.world;
 }));
 section.querySelector('.lw34-enter').addEventListener('click',()=>{
  const selection=section.dataset.selection||wjTarget;
  markChoice();section.remove();
  if(selection!==wjTarget&&typeof wjSwitchTarget==='function')wjSwitchTarget(selection);
  go('home');
 });
 const current=section.querySelector('[data-world="'+wjTarget+'"]');current?.focus({preventScroll:true});
}
function statsCounts(){
 let learned=0,total=0,correct=0,attempt=0,favorites=0,streak=0;
 try{learned=Object.values(known()).filter(Boolean).length;favorites=Object.values(fav()).filter(Boolean).length;total=all.length;attempt=attempts().length;correct=attempts().filter(x=>x.ok).length;streak=todayCount()}catch(e){}
 return{learned,total,favorites,attempt,accuracy:attempt?Math.round(correct/attempt*100):0,streak};
}
function closeStats(){document.querySelector('.lw34-stats-overlay')?.remove();document.body.classList.remove('lw34-no-scroll')}
function showStats(){
 closeStats();
 const counts=statsCounts();
 const overlay=el('div','lw34-stats-overlay');
 overlay.innerHTML='<div class="lw34-stats-backdrop"></div><section class="lw34-stats-panel" role="dialog" aria-modal="true" aria-label="'+t('progress')+'">'+
 '<header><div><span class="lw34-eyebrow">LINGUAWORLD ✦</span><h2>'+t('progress')+'</h2></div><button class="lw34-stats-close" aria-label="'+t('close')+'">×</button></header>'+
 '<div class="lw34-metrics">'+
 [['❤️',t('favorite'),counts.favorites],['🔥',t('streak'),counts.streak],['✦',t('learned'),counts.learned],['◈',t('accuracy'),counts.accuracy+'%']].map(([icon,label,value])=>'<div class="lw34-metric"><span>'+icon+'</span><strong>'+value+'</strong><small>'+label+'</small></div>').join('')+
 '</div><div class="lw34-progress"><div><span>'+t('learned')+'</span><strong>'+counts.learned+' / '+counts.total+'</strong></div><progress value="'+counts.learned+'" max="'+Math.max(1,counts.total)+'"></progress></div>'+
 '<div class="lw34-stats-foot">✦ '+t('tag')+'</div></section>';
 overlay.querySelector('.lw34-stats-close').addEventListener('click',closeStats);
 overlay.querySelector('.lw34-stats-backdrop').addEventListener('click',closeStats);
 document.body.append(overlay);document.body.classList.add('lw34-no-scroll');overlay.querySelector('.lw34-stats-close').focus();
}
function topBar(){
 const main=document.getElementById('main');if(!main)return;
 document.querySelector('#main .lw34-topbar')?.remove();
 const bar=el('header','lw34-topbar');
 const current=worlds.find(x=>x[0]===wjTarget)||worlds[0];
 bar.innerHTML='<div class="lw34-brand"><span class="lw34-brand-icon">✦</span><strong>LinguaWorld</strong><small>'+current[1]+'</small></div>'+
 '<div class="lw34-top-actions"><button class="lw34-heart" type="button" aria-label="'+t('progress')+'" title="'+t('progress')+'"><svg viewBox="0 0 24 24" width="23" height="23" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8z"/></svg></button></div>';
 bar.querySelector('.lw34-heart').addEventListener('click',showStats);
 main.prepend(bar);
}
function bottomBar(){
 const bar=document.getElementById('bottomNav');if(!bar)return;
 bar.classList.add('lw34-nav');
 const pages=[['home',t('home'),'house'],['storyMap',t('stories'),'map'],['studyScroll',t('words'),'book'],['media',t('media'),'play'],['wooJin',t('coach'),'chat']];
 const d={house:'M3 11 12 4l9 7v10h-7v-6h-4v6H3z',map:'M3 5l6-2 6 2 6-2v16l-6 2-6-2-6 2zM9 3v16m6-14v16',book:'M3 4h8a3 3 0 0 1 3 3v14a3 3 0 0 0-3-3H3zm18 0h-4a3 3 0 0 0-3 3v14a3 3 0 0 1 3-3h4z',play:'M4 5h16v14H4zM10 8l6 4-6 4z',chat:'M3 4h18v13h-9l-6 4v-4H3z'};
 bar.innerHTML=pages.map(([page,name,g])=>'<button class="lw34-nav-item '+(state.page===page?'active':'')+'" onclick="go(\''+page+'\')" type="button" aria-label="'+name+'"'+(state.page===page?' aria-current="page"':'')+'><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" stroke-linecap="round"><path d="'+d[g]+'"/></svg><span>'+name+'</span></button>').join('');
}
function home(){
 const area=document.querySelector('.lw33-home');if(!area)return;
 area.classList.add('lw34-home');
 const greeting=area.querySelector('.lw32-speech');if(greeting)greeting.classList.add('lw34-greeting');
 const countries=area.querySelector('.lw32-countries');if(countries)countries.remove(); // choice belongs on welcome, not on home
 area.querySelector('.lw30-language-options')?.remove(); // remove "Ich spreche" from home; native settings remain available elsewhere
 const hero=area.querySelector('.lw32-hero');if(hero)hero.classList.add('lw34-hero');
 area.querySelector('.lw32-actions')?.classList.add('lw34-quicklinks');
 const status=area.querySelector('.lw32-status');if(status)status.classList.add('lw34-status');
 const old=area.querySelector('.lw30-hero-words .lw30-hero-words p');if(old)old.remove();
}
function vocabs(){
 const main=document.getElementById('main');if(!main||!['studyScroll','lesson'].includes(state.page))return;
 main.classList.add('lw34-vocab');
 const feed=main.querySelector('#v25-track,#wj-world-feed');if(!feed)return;
 feed.classList.add('lw34-scroll-feed');
 const cards=feed.querySelectorAll('.v25-word,.wj-world-word');cards.forEach(c=>{
 c.classList.add('lw34-vocab-slide');c.classList.remove('lw31-vocab-tile','lw32-word-card');c.style.removeProperty('display');
 });
}
function layout(){
 document.documentElement.dataset.lw34=wjTarget;
 const main=document.getElementById('main');if(!main)return;
 main.classList.add('lw34-main');
 main.classList.toggle('lw34-is-home',state.page==='home');
 topBar();bottomBar();if(state.page==='home')home();
 if(['studyScroll','lesson'].includes(state.page))vocabs();
 const side=document.getElementById('sideNav');if(side)side.classList.add('lw34-sidebar');
 welcome();
}
const prevRender=render;render=function(){const result=prevRender.apply(this,arguments);try{layout()}catch(err){console.warn('LinguaWorld V34:',err)}return result};
const originalGo=go;
go=function(page){if(page==='progress'||page==='insights'){showStats();return}return originalGo(page)};
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeStats()});
layout();
})();