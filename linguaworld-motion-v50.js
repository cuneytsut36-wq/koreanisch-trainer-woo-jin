/* LinguaWorld V50 - animated world preview: one tap previews, double tap enters learning app. */
(function(){'use strict';
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


const POSTERS={
 ko:'https://d8j0ntlcm91z4.cloudfront.net/user_3KgDSNgRcYHCEkF9DO7qAnjsYND/hf_20261016_075744_cbd09519-478e-4b2f-b29d-4bca024aee6e.png',
 de:'https://d8j0ntlcm91z4.cloudfront.net/user_3KgDSNgRcYHCEkF9DO7qAnjsYND/hf_20261016_084026_d445abd0-bfd6-40e9-af87-ad85428c1789.png',
 en:'https://d8j0ntlcm91z4.cloudfront.net/user_3KgDSNgRcYHCEkF9DO7qAnjsYND/hf_20261016_084026_0c3ef4b3-5b27-4b0e-ac38-7d38722bc485.png'
};
const VIDEOS={
 ko:'https://d8j0ntlcm91z4.cloudfront.net/user_3KgDSNgRcYHCEkF9DO7qAnjsYND/hf_20261016_085306_b5bee684-a45c-49d1-8df6-ac16dbd39667.mp4',
 de:'https://d8j0ntlcm91z4.cloudfront.net/user_3KgDSNgRcYHCEkF9DO7qAnjsYND/hf_20261016_085305_6fbafab3-283e-4a7b-a6b6-ef1c2f6fb2c3.mp4',
 en:'https://d8j0ntlcm91z4.cloudfront.net/user_3KgDSNgRcYHCEkF9DO7qAnjsYND/hf_20261016_085305_84602865-df4b-46f1-805c-1193966b461c.mp4'
};
const INSTRUCTION={
 de:'Einmal tippen: Welt ansehen · Doppelt tippen: Lernen starten',
 en:'Tap once to preview · Double tap to start learning',
 tr:'Bir kez dokun: Dünyayı gör · İki kez dokun: Öğrenmeye başla',
 ko:'한 번 탭: 미리보기 · 두 번 탭: 학습 시작',
 ja:'1回タップでプレビュー · 2回タップで学習開始',
 es:'Un toque: vista previa · Dos toques: empezar',
 fr:'Une fois : aperçu · Deux fois : commencer'
};
let currentRoot=null,selectedWorld='ko',tappedAt=0,tappedWorld='',switchToken=0;
const reducedMotion=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
function teardown(){if(!currentRoot)return;currentRoot.querySelectorAll('video').forEach(v=>{v.pause();v.removeAttribute('src');v.load()});currentRoot.remove();currentRoot=null}
function showPreview(code){
 if(!currentRoot||!POSTERS[code])return;
 selectedWorld=code;currentRoot.dataset.preview=code;
 currentRoot.querySelectorAll('.lw45-world[data-world]').forEach(b=>{
  const selected=b.dataset.world===code;b.classList.toggle('selected',selected);b.setAttribute('aria-pressed',String(selected))
 });
 const scene=currentRoot.querySelector('.lw45-scene');
 scene.style.setProperty('background-image','linear-gradient(180deg,rgba(255,250,244,0) 0%,rgba(251,250,247,.06) 54%,rgba(251,250,247,.85) 78%,#fbfaf7 96%),url("'+POSTERS[code]+'")','important');
 const currentVideo=currentRoot.querySelector('.lw50-video');
 if(!currentVideo)return;
 currentVideo.style.opacity='0';currentVideo.pause();
 currentVideo.removeAttribute('src');currentVideo.load();
 const url=VIDEOS[code];
 if(!url||url.startsWith('__')||reducedMotion)return;
 const token=++switchToken;
 currentVideo.src=url;currentVideo.muted=true;currentVideo.defaultMuted=true;currentVideo.loop=true;currentVideo.playsInline=true;currentVideo.setAttribute('playsinline','');currentVideo.setAttribute('webkit-playsinline','');currentVideo.setAttribute('muted','');
 const ready=()=>{if(token!==switchToken||!currentRoot||selectedWorld!==code)return;currentVideo.style.opacity='1';currentVideo.play().catch(()=>{currentVideo.style.opacity='0'})};
 currentVideo.addEventListener('playing',ready,{once:true});
 currentVideo.play().then(ready).catch(()=>{currentVideo.style.opacity='0'});
}
function enterLearning(code){
 if(!currentRoot)return;
 teardown();
 try{localStorage.setItem('linguaworld-v34-world-chosen','yes')}catch(e){}
 window.__lw34Selected=true;
 if(typeof wjSwitchTarget==='function'&&wjTarget!==code)wjSwitchTarget(code);
 if(typeof go==='function')go('home');
}
function languageClick(code){
 const now=Date.now();
 const isDouble=code===tappedWorld&&(now-tappedAt)<480;
 tappedWorld=code;tappedAt=now;
 if(isDouble){enterLearning(code);return}
 showPreview(code);
}
function openWelcome(){
 document.querySelectorAll('.lw34-welcome,.lw35-world-overlay,.lw36-welcome').forEach(n=>n.remove());
 const t=TEXT[locale()],initial=typeof wjTarget==='string'&&POSTERS[wjTarget]?wjTarget:'ko';
 tappedAt=0;tappedWorld='';
 const root=document.createElement('section');root.className='lw36-welcome lw45-welcome lw50-welcome';
 root.setAttribute('role','dialog');root.setAttribute('aria-modal','true');root.setAttribute('aria-label',t[2]);root.dataset.preview=initial;
 root.innerHTML='<div class="lw45-scene" aria-hidden="true"><video class="lw50-video" autoplay muted loop playsinline webkit-playsinline preload="metadata" disablepictureinpicture aria-hidden="true"></video></div>'+
 '<div class="lw45-content"><div class="lw45-heading"><div class="lw45-wordmark">Lingua<span>World</span><span class="lw45-leaf" aria-hidden="true">◕</span></div>'+
 '<div class="lw45-subline">'+safe(t[0])+'<br>'+safe(t[1])+'</div></div>'+
 '<div class="lw45-lower"><h1>'+safe(t[2])+'</h1><p>'+safe(t[3])+'<br>'+safe(t[4])+'</p>'+
 '<div class="lw45-worlds" role="group" aria-label="'+safe(t[3])+'">'+worlds.map((w,i)=>'<button type="button" class="lw45-world" data-world="'+w.code+'" aria-pressed="false" aria-label="'+safe(t[5+i])+'"><span class="lw45-flag">'+w.flag+'</span><strong>'+safe(t[5+i])+'</strong><span class="lw45-world-image" aria-hidden="true"></span><span class="lw45-arrow" aria-hidden="true">→</span></button>').join('')+'</div>'+
 '<div class="lw50-instruction" aria-live="polite">'+safe(INSTRUCTION[locale()]||INSTRUCTION.de)+'</div></div></div>';
 document.body.append(root);currentRoot=root;
 const btns=root.querySelectorAll('[data-world]');
 btns.forEach(b=>b.addEventListener('click',e=>{e.preventDefault();languageClick(b.dataset.world)}));
 showPreview(initial);
 if(typeof window.lw49RefreshBrand==='function')window.lw49RefreshBrand();
}
document.addEventListener('click',function(e){
 if(e.target.closest('.lw35-current-world,.lw34-current-world')){e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();openWelcome()}
},true);
window.lw36OpenWorldPicker=openWelcome;
window.lw50PreviewLanguage=showPreview;
window.lw50EnterLanguage=enterLearning;
openWelcome();
})();
