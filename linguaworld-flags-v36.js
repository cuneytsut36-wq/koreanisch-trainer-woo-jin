/* LinguaWorld V36 — restore the three-flag welcome screen as the app entry.
 * Replaces the old one-time-only welcome. Existing user progress is untouched.
 */
(function(){
'use strict';
const langText={
 de:{welcome:'Willkommen bei LinguaWorld',hint:'Welche Sprache möchtest du lernen?',sub:'Wähle deine Lernwelt',choose:'Sprache auswählen'},
 en:{welcome:'Welcome to LinguaWorld',hint:'Which language would you like to learn?',sub:'Choose your learning world',choose:'Choose a language'},
 tr:{welcome:'LinguaWorld’a hoş geldin',hint:'Hangi dili öğrenmek istersin?',sub:'Öğrenme dünyanı seç',choose:'Bir dil seç'},
 ja:{welcome:'LinguaWorldへようこそ',hint:'どの言語を学びたいですか？',sub:'学習の世界を選ぼう',choose:'言語を選ぶ'},
 ko:{welcome:'LinguaWorld에 오신 것을 환영합니다',hint:'어떤 언어를 배우고 싶나요?',sub:'학습 세계를 선택하세요',choose:'언어 선택'},
 es:{welcome:'Bienvenido a LinguaWorld',hint:'¿Qué idioma quieres aprender?',sub:'Elige tu mundo de aprendizaje',choose:'Elegir idioma'},
 fr:{welcome:'Bienvenue sur LinguaWorld',hint:'Quelle langue veux-tu apprendre ?',sub:'Choisis ton univers',choose:'Choisir une langue'}
};
const worlds=[{code:'ko',flag:'🇰🇷',name:'Koreanisch',place:'Korea',avatar:'https://d2ol7oe51mr4n9.cloudfront.net/user_3KgDSNgRcYHCEkF9DO7qAnjsYND/77dcbb63-fce5-463b-a25f-de16f2122a09.png'},{code:'de',flag:'🇩🇪',name:'Deutsch',place:'Deutschland',avatar:'https://d2ol7oe51mr4n9.cloudfront.net/user_3KgDSNgRcYHCEkF9DO7qAnjsYND/231cb641-672d-4a79-b738-844d2214a849.png'},{code:'en',flag:'🇬🇧',name:'Englisch',place:'United Kingdom',avatar:'https://d2ol7oe51mr4n9.cloudfront.net/user_3KgDSNgRcYHCEkF9DO7qAnjsYND/34688424-985b-4ec8-9f4e-36916212492e.png'}];
let openedThisLoad=false;
function words(){return langText[typeof v27Lang==='string'?v27Lang:'de']||langText.de}
function dismissOld(){document.querySelectorAll('.lw34-welcome,.lw35-world-overlay').forEach(el=>el.remove())}
function chooseWorld(code){
 const root=document.querySelector('.lw36-welcome');
 if(!root)return;
 root.remove();
 openedThisLoad=true;
 try{localStorage.setItem('linguaworld-v34-world-chosen','yes')}catch(e){}
 window.__lw34Selected=true;
 if(typeof wjSwitchTarget==='function'&&wjTarget!==code)wjSwitchTarget(code);
 if(typeof go==='function')go('home');
}
function show(){
 dismissOld();
 const existing=document.querySelector('.lw36-welcome');if(existing)return;
 const t=words();
 const root=document.createElement('section');
 root.className='lw36-welcome';
 root.setAttribute('role','dialog');
 root.setAttribute('aria-modal','true');
 root.setAttribute('aria-label',t.welcome);
 root.innerHTML='<div class="lw36-glow" aria-hidden="true"></div><div class="lw36-entry">'+
  '<div class="lw36-logo"><span>✦</span> LinguaWorld</div>'+
  '<div class="lw36-eyebrow">'+t.sub+'</div>'+
  '<h1>'+t.welcome+'</h1>'+
  '<p>'+t.hint+'</p>'+
  '<div class="lw36-flags" role="group" aria-label="'+t.choose+'">'+
  worlds.map(w=>'<button class="lw36-flag" type="button" data-world="'+w.code+'" aria-label="'+w.name+' – '+w.place+'"><span class="lw36-flag-circle">'+w.flag+'</span><strong>'+w.name+'</strong><small>'+w.place+'</small><span class="lw36-flag-arrow" aria-hidden="true">↗</span></button>').join('')+
  '</div><div class="lw36-footer">KOREA <span>✦</span> DEUTSCHLAND <span>✦</span> UNITED KINGDOM</div>'+
  '</div>';
 document.body.append(root);
 root.querySelectorAll('[data-world]').forEach(b=>b.addEventListener('click',()=>chooseWorld(b.dataset.world)));
 root.querySelector('[data-world="'+(wjTarget||'ko')+'"]')?.focus({preventScroll:true});
}
document.addEventListener('click',function(e){
 // Replace the old secondary language picker with the same three-flag welcome.
 if(e.target.closest('.lw35-current-world,.lw34-current-world')){
  e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();show();
 }
},true);
// Show the chooser on each fresh page load, but not after internal navigation.
show();
window.lw36OpenWorldPicker=show;
})();