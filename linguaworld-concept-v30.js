/* LinguaWorld V30 — original editable four-screen game UI, art is scenery only. */
(function(){
'use strict';
const A={
  hero:'https://d8j0ntlcm91z4.cloudfront.net/user_3KgDSNgRcYHCEkF9DO7qAnjsYND/hf_20261015_163340_375b460e-df89-4d21-9f9f-baf3d039814b.png',
  map:'https://d8j0ntlcm91z4.cloudfront.net/user_3KgDSNgRcYHCEkF9DO7qAnjsYND/hf_20261015_163338_81d5bc85-afed-4f6c-a934-ec72f5702f86.png',
  story:'https://d8j0ntlcm91z4.cloudfront.net/user_3KgDSNgRcYHCEkF9DO7qAnjsYND/hf_20261015_163338_021e797c-752a-4918-b518-0d20d2656c8c.png',
  characters:'https://d8j0ntlcm91z4.cloudfront.net/user_3KgDSNgRcYHCEkF9DO7qAnjsYND/hf_20261015_154838_680232c9-9ba0-4ddd-8be2-78b606d93fe2.png'
};
const W={
ko:{flag:'🇰🇷',region:'Korea',label:'한국어',learn:'Koreanisch',greet:'안녕하세요!',guide:'Woo Jin',alt:'Seoul',cities:['Seoul','Gyeongju','Busan','Jeju'],citySub:['Lv. 1 – 10','Lv. 21 – 30','Lv. 11 – 20','Lv. 31 – 40']},
de:{flag:'🇩🇪',region:'Deutschland',label:'Deutsch',learn:'Deutsch',greet:'Hallo!',guide:'Lukas',alt:'Berlin',cities:['Berlin','München','Hamburg','Köln'],citySub:['Lv. 1 – 10','Lv. 11 – 20','Lv. 21 – 30','Lv. 31 – 40']},
en:{flag:'🇬🇧',region:'UK',label:'English',learn:'Englisch',greet:'Hello!',guide:'Alex',alt:'London',cities:['London','Edinburgh','Oxford','Manchester'],citySub:['Lv. 1 – 10','Lv. 11 – 20','Lv. 21 – 30','Lv. 31 – 40']}
};
const T={
de:{home:'Start',map:'Karte',learn:'Lernen',words:'Vokabeln',profile:'Profil',stories:'Story',media:'Medien',coach:'Coach',cont:'Weiter',trip:'Reisekarte',choose:'Wähle eine Lernwelt',hello:'Lass uns gemeinsam lernen!',desc:'Sprich. Erlebe. Entdecke Korea.',level:'Kapitel',arrival:'Ankunft in Seoul',cafe:'Im Café',sites:'Sehenswürdigkeiten',traditional:'Traditionen und Kultur',all:'Alle',daily:'Alltag',food:'Essen',travel:'Reisen',culture:'Kultur',read:'Geschichten erleben und die Sprache anwenden',wordsSub:'Wörter lernen und im Alltag nutzen',mediaSub:'Videos, Musik und kulturelle Inhalte',coachSub:'Dein persönlicher Lernbegleiter',chapter:'Deine Reise beginnt hier',explore:'Tippe auf einen Ort und entdecke neue Geschichten',unlocked:'Freigeschaltet'},
en:{home:'Home',map:'Map',learn:'Learn',words:'Words',profile:'Profile',stories:'Stories',media:'Media',coach:'Coach',cont:'Continue',trip:'Travel map',choose:'Choose a learning world',hello:"Let's learn together!",desc:'Speak. Experience. Explore Korea.',level:'Chapter',arrival:'Arriving in Seoul',cafe:'At the café',sites:'Sightseeing',traditional:'Traditions and culture',all:'All',daily:'Daily',food:'Food',travel:'Travel',culture:'Culture',read:'Experience stories and use the language',wordsSub:'Learn words in daily life',mediaSub:'Videos, music and culture',coachSub:'Your personal language coach',chapter:'Your journey starts here',explore:'Tap a place to discover stories',unlocked:'Unlocked'},
tr:{home:'Ana sayfa',map:'Harita',learn:'Öğren',words:'Kelimeler',profile:'Profil',stories:'Hikâyeler',media:'Medya',coach:'Eğitmen',cont:'Devam',trip:'Seyahat haritası',choose:'Bir dünya seç',hello:'Birlikte öğrenelim!',desc:'Konuş. Yaşa. Kore’yi keşfet.',level:'Bölüm',arrival:'Seul’e varış',cafe:'Kafede',sites:'Gezilecek yerler',traditional:'Gelenekler ve kültür',all:'Tümü',daily:'Günlük',food:'Yemek',travel:'Seyahat',culture:'Kültür',read:'Hikâyelerle dili öğren',wordsSub:'Günlük hayatta kelimeler öğren',mediaSub:'Video, müzik ve kültür',coachSub:'Kişisel dil öğretmenin',chapter:'Yolculuğun burada başlıyor',explore:'Yeni hikâyeler için bir yere dokun',unlocked:'Açık'}
};
function tr(k){let lang=typeof v27Lang==='string'?v27Lang:'de';return (T[lang]||T.de)[k]||T.de[k]||k}
function mode(){return W[wjTarget]||W.ko}
function safe(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;')}
function icon(name){
 const paths={home:'M3 12 12 4 21 12 21 21 14 21 14 15 10 15 10 21 3 21Z',pin:'M12 22Q2 13 2 10A10 10 0 1 1 22 10Q22 13 12 22ZM12 6A4 4 0 1 0 12 14A4 4 0 1 0 12 6',book:'M4 4H12V21H4ZM12 4H20V21H12',chat:'M3 4H21V17H12L6 22V17H3Z',camera:'M4 8H8L10 5H16L18 8H21V20H3V8ZM12 10A4 4 0 1 0 12 18A4 4 0 1 0 12 10',user:'M12 12A4 4 0 1 0 12 4A4 4 0 1 0 12 12ZM4 21C4 12 20 12 20 21Z'};
 return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round" aria-hidden="true"><path d="'+paths[name]+'"/></svg>';
}
function worldFlags(){
return Object.entries(W).map(([k,m])=>'<button class="lw30-world '+(k===wjTarget?'selected':'')+'" type="button" onclick="wjSwitchTarget(\''+k+'\')" aria-pressed="'+(k===wjTarget)+'"><span>'+m.flag+'</span><strong>'+m.region+'</strong><small>'+m.learn+'</small></button>').join('');
}
function character(wide=false){return '<div class="lw30-character '+(wide?'large':'')+'" style="--lw30-char-x:'+({ko:'0%',de:'50%',en:'100%'})[wjTarget]+'" role="img" aria-label="'+mode().guide+'"></div>'}
function statusBar(){
const n=typeof streak==='function'?streak():0;let num=0;
try{num=Object.values(known()).filter(Boolean).length}catch(e){}
return '<div class="lw30-status"><span class="lw30-face">🎮</span><span class="lw30-level"><strong>Lv. 3</strong><i><b></b></i></span><span class="lw30-fire">🔥 '+n+'</span><span class="lw30-gem">💎 '+num+'</span><button type="button" onclick="go(\'progress\')" aria-label="Profil">⚙</button></div>';
}
function mainHome(){
const m=mode(),native=typeof window.wjNativePicker==='function'?window.wjNativePicker():'';
return '<section class="lw30 lw30-home" data-world="'+wjTarget+'">'+
statusBar()+
'<section class="lw30-hero-scene"><img src="'+(wjTarget==='ko'?A.hero:'assets/v18-scene-'+wjTarget+'.svg')+'" alt=""><div class="lw30-hero-veil"></div><div class="lw30-sakura">✿ ✦ ✿</div><div class="lw30-hero-words"><span class="lw30-title">LinguaWorld</span><span class="lw30-foreign">'+m.label+'</span><span class="lw30-language">'+m.learn+'</span><p>'+tr('desc')+'</p></div></section>'+
'<div class="lw30-worlds">'+worldFlags()+'</div>'+
'<div class="lw30-language-options">'+native+'</div>'+
'<div class="lw30-guide"><div class="lw30-guide-person">'+character(true)+'</div><div class="lw30-speech"><small>'+m.guide+'</small><strong>'+m.greet+'</strong><span>'+tr('hello')+'</span><span>'+m.guide+' ✦ '+m.region+'</span></div></div>'+
'<div class="lw30-quest-grid">'+[
['storyMap','pin',tr('stories'),tr('read'),'purple'],
['studyScroll','book',tr('words'),tr('wordsSub'),'aqua'],
['media','camera',tr('media'),tr('mediaSub'),'rose'],
['wooJin','chat',tr('coach'),tr('coachSub'),'cyan']
].map(c=>'<button class="lw30-quest '+c[4]+'" type="button" onclick="go(\''+c[0]+'\')"><span class="lw30-qicon">'+icon(c[1])+'</span><span><strong>'+c[2]+'</strong><small>'+c[3]+'</small></span></button>').join('')+'</div>'+
'<div class="lw30-bottom-space"></div>'+
'</section>';
}
function addNavigation(){
const nav=document.getElementById('bottomNav');if(!nav)return;
const tabs=[['home','home','home'],['storyMap','pin','map'],['studyScroll','book','learn'],['media','camera','words'],['progress','user','profile']];
nav.classList.add('lw30-nav');
nav.innerHTML=tabs.map(([page,glyph,key])=>'<button class="'+(state.page===page?'current':'')+'" type="button" onclick="go(\''+page+'\')">'+icon(glyph)+'<span>'+tr(key)+'</span></button>').join('');
const side=document.getElementById('sideNav');if(side)side.classList.add('lw30-side');
}
function buildMap(){
const root=document.querySelector('#main .v18-map-page');if(!root)return;
root.classList.add('lw30','lw30-map');const m=mode();
root.querySelectorAll('.rpg26-map-intro,.v18-scene-strip,.rpg26-terrain,.v24-map-landmarks,.hf25-map-banner,.rpg27-map-marker,.rpg28-floating-guild').forEach(el=>el.remove());
const header=root.querySelector('.v18-map-head');
if(header){header.classList.add('lw30-map-head');header.innerHTML='<div><span class="lw30-kicker">✦ '+m.region.toUpperCase()+' · STORY MODE</span><h1>'+m.flag+' '+m.region+' – '+tr('trip')+'</h1><p>'+tr('explore')+'</p></div><button class="lw30-back" type="button" onclick="go(\'home\')">❮</button>'}
const lv=root.querySelector('.v18-country-tabs');if(lv)lv.classList.add('lw30-levels');
const map=root.querySelector('.v18-map-canvas');
if(map){map.classList.add('lw30-map-canvas');map.querySelectorAll('.v18-map-svg,.rpg26-terrain,.rpg29-monument,.rpg28-landmark,.v18-map-cloud').forEach(x=>x.remove());
 map.style.setProperty('--lw30-map-art','url("'+(wjTarget==='ko'?A.map:'assets/v18-scene-'+wjTarget+'.svg')+'")');
 map.querySelectorAll('.v18-map-pin').forEach((btn,i)=>{btn.classList.add('lw30-map-pin');btn.querySelector('.pin-icon')?.remove();btn.querySelector('.v18-lock')?.remove();btn.dataset.pin=(i%2===0?'cyan':'orange')});
}
const chapter=root.querySelector('.v18-chapters');if(chapter){chapter.classList.add('lw30-chapters');chapter.querySelectorAll('.rpg26-chapter-icon,.rpg27-card-mark,.rpg29-monument').forEach(x=>x.remove());chapter.querySelectorAll('.s32-chapters button,.wj-world-chapters button').forEach((b,i)=>{b.classList.add('lw30-chapter');const n=b.querySelector('span');if(n&&!n.querySelector('img')){let art=document.createElement('span');art.className='lw30-chapter-art';art.textContent=['🏯','☕','⛩️','🍜','🎎','🏆'][i%6];b.prepend(art)}})}
}
function buildStory(){
const root=document.querySelector('#main .s32-mission,#main .wj-world-mission,#main .wj-world-mission-page');
if(!root)return;
root.classList.add('lw30','lw30-story');
const m=mode(),scene=root.querySelector('.s32-scene,.wj-world-mission-scene,.wj-world-scene');
if(scene&&!scene.querySelector('.lw30-story-art')){
 const art=document.createElement('div');art.className='lw30-story-art';art.style.backgroundImage='url("'+(wjTarget==='ko'?A.story:'assets/v18-scene-'+wjTarget+'.svg')+'")';
 const av=document.createElement('div');av.className='lw30-story-avatar';av.innerHTML=character(true);
 const balloon=document.createElement('div');balloon.className='lw30-story-dialog';balloon.innerHTML='<small>✦ '+m.guide+'</small><strong>'+m.greet+'</strong><span>'+tr('hello')+'</span>';art.append(av,balloon);scene.prepend(art);
 }
 root.querySelectorAll('.s32-options button,.wj-world-options button').forEach((b,i)=>{b.classList.add('lw30-answer');if(!b.querySelector('.lw30-letter')){const s=document.createElement('span');s.className='lw30-letter';s.textContent='ABCD'[i%4];b.prepend(s)}});
 root.querySelector('.s32-next,.wj-world-next')?.classList.add('lw30-next');
}
function buildVocab(){
const main=document.getElementById('main');if(!main||!['studyScroll','lesson','cards'].includes(state.page))return;
if(main.querySelector('.lw30-vocab-head'))return;
const m=mode(),header=document.createElement('div');header.className='lw30-vocab-head';
header.innerHTML='<div><span class="lw30-kicker">✦ '+m.region.toUpperCase()+' / VOCABULARY</span><h1>'+tr('words')+' – '+m.region+'</h1></div><div class="lw30-vocab-cats">'+['all','daily','food','travel','culture'].map((x,i)=>'<button type="button" class="'+(i===0?'active':'')+'" data-tab="'+x+'">'+tr(x)+'</button>').join('')+'</div>';
main.prepend(header);main.classList.add('lw30-vocab');
header.querySelectorAll('[data-tab]').forEach(b=>b.addEventListener('click',()=>{header.querySelectorAll('[data-tab]').forEach(x=>x.classList.toggle('active',x===b));const real=main.querySelector('.v18-vocab-filters button,.v25-vocab-tabs button,.v19-vocab-tabs button');if(real)real.click()}));
main.querySelectorAll('.v25-word-card,.v18-vocab-card,.wj-world-word,.v25-vocab-card,.word-card,.vocab-card').forEach(c=>c.classList.add('lw30-vocab-card'));
}
function skin(){
const root=document.getElementById('main');if(!root)return;
if(state.page==='home'){root.innerHTML=mainHome();}else if(state.page==='storyMap'){buildMap()}else if(state.page==='storyMission'){buildStory()}else if(['studyScroll','lesson','cards'].includes(state.page)){buildVocab()}
addNavigation();document.documentElement.dataset.lw30=wjTarget;
}
const old=render;render=function(){const res=old.apply(this,arguments);try{skin()}catch(e){console.warn('LinguaWorld v30:',e)}return res};
skin();window.lw30Skin=skin;
})();