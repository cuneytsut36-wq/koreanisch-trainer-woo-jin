/* LinguaWorld V45 — immersive localized welcome matching the supplied visual reference. */
(function(){
'use strict';
const TEXT={
de:['Sprachen lernen.','Welten entdecken.','Willkommen','Wähle deine Sprachreise','und entdecke neue Welten.','Koreanisch','Deutsch','Englisch'],
en:['Learn languages.','Discover worlds.','Welcome','Choose your language journey','and discover new worlds.','Korean','German','English'],
tr:['Dilleri öğren.','Yeni dünyalar keşfet.','Hoş geldin','Dil yolculuğunu seç','ve yeni dünyalar keşfet.','Korece','Almanca','İngilizce'],
ko:['언어를 배우고','새로운 세상을 만나세요.','환영합니다','언어 여행을 선택하고','새로운 세상을 발견하세요.','한국어','독일어','영어'],
ja:['言語を学ぼう。','新しい世界を発見しよう。','ようこそ','学びたい言語を選んで','新しい世界を発見しよう。','韓国語','ドイツ語','英語'],
es:['Aprende idiomas.','Descubre mundos.','Bienvenido','Elige tu aventura lingüística','y descubre nuevos mundos.','Coreano','Alemán','Inglés'],
fr:['Apprends des langues.','Découvre des mondes.','Bienvenue','Choisis ton voyage linguistique','et découvre de nouveaux mondes.','Coréen','Allemand','Anglais']
};
const worlds=[{code:'ko',flag:'🇰🇷'},{code:'de',flag:'🇩🇪'},{code:'en',flag:'🇬🇧'}];
function locale(){let c=typeof v27Lang==='string'?v27Lang:'de';return TEXT[c]?c:'de'}
function safe(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;')}
function setWelcome(){const root=document.querySelector('.lw36-welcome');if(!root||root.dataset.lw45==='yes')return;
root.dataset.lw45='yes';root.classList.add('lw45-welcome');
const t=TEXT[locale()],selected=typeof wjTarget==='string'?wjTarget:'ko';
root.setAttribute('aria-label',t[2]);
root.innerHTML='<div class="lw45-scene" aria-hidden="true"></div><div class="lw45-content">'+
'<div class="lw45-heading"><div class="lw45-wordmark">Lingua<span>World</span><span class="lw45-leaf" aria-hidden="true">◕</span></div>'+
'<div class="lw45-subline">'+safe(t[0])+'<br>'+safe(t[1])+'</div></div>'+
'<div class="lw45-lower"><h1>'+safe(t[2])+'</h1><p>'+safe(t[3])+'<br>'+safe(t[4])+'</p>'+
'<div class="lw45-worlds" role="group" aria-label="'+safe(t[3])+'">'+worlds.map((w,i)=>'<button type="button" class="lw45-world'+(selected===w.code?' selected':'')+'" data-world="'+w.code+'" aria-label="'+safe(t[5+i])+'"><span class="lw45-flag">'+w.flag+'</span><strong>'+safe(t[5+i])+'</strong><span class="lw45-world-image" aria-hidden="true"></span><span class="lw45-arrow" aria-hidden="true">→</span></button>').join('')+'</div></div></div>';
root.querySelectorAll('[data-world]').forEach(b=>b.addEventListener('click',()=>{const code=b.dataset.world;root.remove();try{localStorage.setItem('linguaworld-v34-world-chosen','yes')}catch(e){}window.__lw34Selected=true;if(typeof wjSwitchTarget==='function'&&wjTarget!==code)wjSwitchTarget(code);if(typeof go==='function')go('home')}));
}
function upgrade(){try{setWelcome()}catch(e){console.warn('LinguaWorld V45 welcome',e)}}
if(typeof window.lw36OpenWorldPicker==='function'){const prior=window.lw36OpenWorldPicker;window.lw36OpenWorldPicker=function(){prior();upgrade()}}
const observer=new MutationObserver(()=>{if(document.querySelector('.lw36-welcome:not([data-lw45])'))upgrade()});observer.observe(document.body,{childList:true});
upgrade();
})();