/* LinguaWorld V46 direct entry screen — replaces legacy chooser instead of decorating it. */
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

function openWelcome(){
 document.querySelectorAll('.lw34-welcome,.lw35-world-overlay,.lw36-welcome').forEach(n=>n.remove());
 const t=TEXT[locale()], selected=typeof wjTarget==='string'?wjTarget:'ko';
 const root=document.createElement('section');root.className='lw36-welcome lw45-welcome';
 root.setAttribute('role','dialog');root.setAttribute('aria-modal','true');root.setAttribute('aria-label',t[2]);
 root.innerHTML='<div class="lw45-scene" aria-hidden="true"></div><div class="lw45-content">'+
 '<div class="lw45-heading"><div class="lw45-wordmark">Lingua<span>World</span><span class="lw45-leaf" aria-hidden="true">◕</span></div>'+
 '<div class="lw45-subline">'+safe(t[0])+'<br>'+safe(t[1])+'</div></div>'+
 '<div class="lw45-lower"><h1>'+safe(t[2])+'</h1><p>'+safe(t[3])+'<br>'+safe(t[4])+'</p>'+
 '<div class="lw45-worlds" role="group" aria-label="'+safe(t[3])+'">'+worlds.map((w,i)=>'<button type="button" class="lw45-world'+(selected===w.code?' selected':'')+'" data-world="'+w.code+'" aria-label="'+safe(t[5+i])+'"><span class="lw45-flag">'+w.flag+'</span><strong>'+safe(t[5+i])+'</strong><span class="lw45-world-image" aria-hidden="true"></span><span class="lw45-arrow" aria-hidden="true">→</span></button>').join('')+'</div></div></div>';
 document.body.append(root);
 root.querySelectorAll('[data-world]').forEach(b=>b.addEventListener('click',()=>{
 const code=b.dataset.world;root.remove();try{localStorage.setItem('linguaworld-v34-world-chosen','yes')}catch(e){}
 window.__lw34Selected=true;if(typeof wjSwitchTarget==='function'&&wjTarget!==code)wjSwitchTarget(code);
 if(typeof go==='function')go('home');
 }));
}
document.addEventListener('click',function(e){
 if(e.target.closest('.lw35-current-world,.lw34-current-world')){e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();openWelcome()}
},true);
window.lw36OpenWorldPicker=openWelcome;
openWelcome();
})();