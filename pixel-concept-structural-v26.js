/* V26 – structural pixel-RPG remake.
   Every visual is an individual DOM/SVG element. NO Higgsfield screenshots/background
   as UI. Preserve all existing navigation, mission, native-language, quiz and chat logic. */
(function(){
'use strict';
const L={
ko:{flag:'🇰🇷',name:'Korea',guide:'Woo Jin',avatar:'assets/v18-avatar-woo-jin.svg',cities:['SEOUL','BUSAN','GYEONGJU','JEJU'],monuments:['palace','tower','hanok','mountain'],title:'SEOUL QUEST',tag:'KOREA ADVENTURE',sky:'sunset'},
de:{flag:'🇩🇪',name:'Deutschland',guide:'Lukas',avatar:'assets/v18-avatar-lukas.svg',cities:['BERLIN','MÜNCHEN','HAMBURG','KÖLN'],monuments:['gate','castle','church','town'],title:'BERLIN QUEST',tag:'GERMANY ADVENTURE',sky:'gold'},
en:{flag:'🇬🇧',name:'Großbritannien',guide:'Alex',avatar:'assets/v18-avatar-alex.svg',cities:['LONDON','EDINBURGH','OXFORD','MANCHESTER'],monuments:['clock','bridge','castle','bus'],title:'LONDON QUEST',tag:'BRITAIN ADVENTURE',sky:'blue'}
};
const translations={de:['Wähle deine Welt','Deine Reise beginnt hier','Geschichten entdecken','Vokabeln sammeln','Mit Coach sprechen','Lernfortschritt','Zur Karte','Level auswählen','Neue Abenteuer warten'],en:['Choose your world','Your journey begins here','Explore stories','Collect vocabulary','Talk to your coach','Learning progress','Open map','Select level','New adventures await'],tr:['Dünyanı seç','Yolculuğun burada başlıyor','Hikâyeleri keşfet','Kelimeleri öğren','Eğitmenle konuş','Öğrenme ilerlemesi','Haritayı aç','Seviye seç','Yeni maceralar seni bekliyor'],ja:['世界を選ぼう','ここから冒険が始まる','物語を探検','単語を集めよう','先生と話そう','学習の進捗','地図を開く','レベルを選ぶ','新しい冒険が待っている'],ko:['세계를 선택하세요','여기서 여행이 시작돼요','이야기 탐험','단어 모으기','코치와 대화','학습 진도','지도 열기','레벨 선택','새로운 모험이 기다려요'],es:['Elige tu mundo','Tu viaje comienza aquí','Explora historias','Aprende vocabulario','Habla con tu tutor','Progreso de aprendizaje','Abrir mapa','Elige nivel','Te esperan nuevas aventuras'],fr:['Choisis ton monde','Ton aventure commence ici','Découvre les histoires','Apprends des mots','Parle à ton coach','Progrès','Ouvrir la carte','Choisis un niveau','De nouvelles aventures arrivent']};
function label(i){return(translations[v27Lang]||translations.de)[i]}
function land(){return L[wjTarget]||L.ko}
const el=(tag,cls,text)=>{let e=document.createElement(tag);if(cls)e.className=cls;if(text!==undefined)e.textContent=text;return e};
const P={
roof:(a,b)=>'<path d="M'+a+' '+b+'h80l-40 -24Z" fill="var(--sprite-roof)" stroke="var(--sprite-dark)" stroke-width="6" stroke-linejoin="miter"/>',
palace:'<path d="M12 70H188V118H12Z" fill="#edcda8"/><path d="M0 70H200L166 48H35Z" fill="#4a6267"/><path d="M5 49H195L165 29H35Z" fill="#e1a85e"/><rect x="27" y="80" width="19" height="38" fill="#985e50"/><rect x="154" y="80" width="19" height="38" fill="#985e50"/><rect x="87" y="73" width="27" height="45" fill="#5c3b47"/><rect x="6" y="121" width="194" height="9" fill="#cbb188"/>',
tower:'<rect x="90" y="32" width="21" height="115" fill="#e0d2cb"/><rect x="58" y="76" width="85" height="13" fill="#edc0b1"/><rect x="65" y="64" width="72" height="14" fill="#e3a7ba"/><path d="M98 0L83 64H113Z" fill="#ddd2dc"/><rect x="75" y="147" width="52" height="10" fill="#695569"/>',
hanok:'<rect x="27" y="68" width="151" height="67" fill="#dcb798"/><path d="M2 69h195l-26 -27H28Z" fill="#505d74"/><rect x="45" y="80" width="22" height="48" fill="#b65d50"/><rect x="86" y="84" width="35" height="50" fill="#56485a"/><rect x="142" y="80" width="22" height="48" fill="#b65d50"/>',
mountain:'<path d="M4 140L75 21l44 60 34-39 47 98Z" fill="#63856a"/><path d="M53 63l22 -42 25 36-23 -7Z" fill="#f5e5c4"/><path d="M137 59l16 -17 18 27-18 -5Z" fill="#e5e3d5"/>',
gate:'<rect x="3" y="53" width="190" height="80" fill="#e8d6ab"/><rect x="10" y="41" width="180" height="19" fill="#f3dab2"/><rect x="28" y="17" width="145" height="24" fill="#d8b080"/><rect x="42" y="4" width="118" height="14" fill="#f1d8ad"/>'+[15,48,80,112,145,178].map(x=>'<rect x="'+x+'" y="62" width="13" height="71" fill="#ae9b77"/>').join(''),
castle:'<path d="M9 81L70 51 122 75 168 55 194 77V146H9Z" fill="#eddbbf"/><rect x="27" y="47" width="24" height="96" fill="#e3d3b9"/><path d="M27 47l12 -25 12 25Z" fill="#8b6f86"/><rect x="141" y="33" width="26" height="109" fill="#d3c9bb"/><path d="M141 33l13 -28 13 28Z" fill="#96728c"/><rect x="85" y="85" width="25" height="59" fill="#91756f"/>',
church:'<rect x="36" y="76" width="134" height="66" fill="#dcbf9e"/><rect x="88" y="18" width="30" height="124" fill="#d8c6ab"/><path d="M88 18L103 0l15 18Z" fill="#7d7c8f"/><rect x="96" y="28" width="14" height="18" fill="#6b849a"/><rect x="55" y="85" width="28" height="38" fill="#a97766"/>',
town:'<rect x="20" y="54" width="75" height="91" fill="#f5d4ad"/><rect x="106" y="65" width="77" height="79" fill="#b97b6c"/><path d="M12 54l45 -31 47 31Z" fill="#aa645d"/><path d="M100 65l45 -35 45 35Z" fill="#775769"/><rect x="49" y="95" width="20" height="49" fill="#815654"/><rect x="132" y="83" width="19" height="25" fill="#e7d8bd"/>',
clock:'<rect x="66" y="35" width="72" height="111" fill="#d1b78d"/><rect x="59" y="28" width="87" height="16" fill="#e9d1a4"/><path d="M66 28l36 -27 36 27Z" fill="#7e8199"/><rect x="50" y="76" width="105" height="18" fill="#a7816f"/><circle cx="103" cy="67" r="24" fill="#f3dc9c" stroke="#71566d" stroke-width="6"/><path d="M103 53V67L114 72" fill="none" stroke="#5d5261" stroke-width="4"/>',
bridge:'<rect x="29" y="53" width="26" height="90" fill="#decab1"/><rect x="141" y="53" width="26" height="90" fill="#decab1"/><path d="M0 105H200V123H0Z" fill="#ad8882"/><path d="M29 68l85 48 53-48" fill="none" stroke="#c6c4cb" stroke-width="7"/><rect x="20" y="43" width="43" height="14" fill="#a1a2b0"/><rect x="132" y="43" width="43" height="14" fill="#a1a2b0"/>',
bus:'<rect x="18" y="29" width="160" height="93" rx="5" fill="#bf4b54"/><rect x="32" y="42" width="129" height="27" fill="#a7d2e3"/><rect x="32" y="77" width="129" height="21" fill="#a7d2e3"/><circle cx="51" cy="124" r="16" fill="#36435a"/><circle cx="146" cy="124" r="16" fill="#36435a"/>'
};
function monument(type,extra=''){return '<svg class="rpg26-monument '+extra+'" viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges" aria-hidden="true">'+(P[type]||P.town)+'</svg>'}
function background(m){
const skyline=Array.from({length:17},(_,i)=>{let height=25+(i*23)%86,x=i*39;return '<rect x="'+x+'" y="'+(230-height)+'" width="'+(33+(i%3)*4)+'" height="'+height+'" fill="'+(i%2?'#1e2946':'#302d56')+'"/>'}).join('');
return '<svg class="rpg26-sky" viewBox="0 0 720 280" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><rect width="720" height="280" fill="var(--rpg-sky)"/><circle class="rpg26-moon" cx="550" cy="77" r="44" fill="var(--rpg-sun)"/><path d="M0 188l69-43 110 34 119-83 89 69 103-54 104 53 130-35v151H0Z" fill="var(--rpg-hills)"/>'+skyline+'<path d="M0 259l69-18 111 13 90-10 127 18 132-21 191 14v25H0Z" fill="#111931"/><g fill="#fff2b4" opacity=".7">'+Array.from({length:15},(_,i)=>'<rect x="'+(i*57%710)+'" y="'+(15+i*19%115)+'" width="4" height="4"/>').join('')+'</g></svg>'
}
function heroScene(){
const m=land(),t=m.monuments;
return '<div class="rpg26-scene" aria-hidden="true">'+background(m)+'<div class="rpg26-scenery">'+monument(t[0],'rpg26-castle')+monument(t[1],'rpg26-tower')+monument(t[2],'rpg26-house')+'</div><div class="rpg26-cloud c1"></div><div class="rpg26-cloud c2"></div><div class="rpg26-fireflies"><i></i><i></i><i></i><i></i><i></i></div><div class="rpg26-ground"></div></div>'
}
function navigationGlyph(type){const path={map:'M2 6L9 3L16 6L23 3V19L16 22L9 19L2 22ZM9 3V19M16 6V22',book:'M4 4H12V20H4ZM12 4H20V20H12ZM7 8H10M14 8H18',chat:'M3 4H21V17H12L6 22V17H3Z M7 9H17M7 12H14',video:'M3 5H21V19H3ZM10 8L16 12L10 16Z',home:'M3 12L12 4L21 12V21H14V15H10V21H3Z'}[type]||'M5 5H19V19H5Z';return '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linejoin="miter">'+path.split(' M').join(' M')+'</svg>'}
function getStats(){const box=document.querySelector('#main .v19-progress');return box?[...box.children].map(x=>({value:x.querySelector('strong')?.textContent||'0',label:x.querySelector('small')?.textContent||''})):[]}
function buildHome(){
const root=document.querySelector('#main .v19-home');if(!root)return;const m=land(),stats=getStats();
const welcome=root.querySelector('.v19-welcome'),picker=root.querySelector('.v20-native-picker');
const top=el('header','rpg26-header');top.innerHTML='<div class="rpg26-heading"><span class="rpg26-eyebrow">✦ LINGUAWORLD / PIXEL ADVENTURE</span><h1>'+label(0)+'</h1><p>'+label(1)+'</p></div>';
const langs=el('div','rpg26-lang-panel');
const flags=welcome?.querySelector('.v19-flag-picker');
if(flags){flags.classList.add('rpg26-flags');langs.append(flags)}
if(picker){picker.classList.add('rpg26-native');langs.append(picker)}
top.append(langs);
const hero=el('section','rpg26-hero');hero.append(el('span','rpg26-scene-tag',m.flag+' '+m.tag));
const art=el('div','rpg26-hero-art');art.innerHTML=heroScene();hero.append(art);
const copy=el('div','rpg26-copy');copy.innerHTML='<span class="rpg26-kicker">✦ '+m.title+' • LV. 01</span><h2>'+({'ko':'Annyeong!','de':'Hallo!','en':'Hello!'}[wjTarget]||'Annyeong!')+'</h2><p>'+label(8)+'</p><button type="button" class="rpg26-primary" onclick="go(\'storyMap\')">'+label(6)+' <span>➜</span></button>';hero.append(copy);
const avatar=el('div','rpg26-avatar');avatar.innerHTML='<img src="'+m.avatar+'" alt="'+m.guide+'"><div class="rpg26-avatar-name">✦ '+m.guide+'</div>';hero.append(avatar);
const divider=el('div','rpg26-divider');divider.innerHTML='<span>✦</span> '+label(0)+' <span>✦</span>';
const grid=el('div','rpg26-quests');
const tasks=[['map',label(2),'STORY QUEST','storyMap'],['book',label(3),'WORD COLLECTION','studyScroll'],['chat',label(4),m.guide,'wooJin'],['video',label(8),'MEDIA QUEST','media']];
tasks.forEach(([icon,text,subtitle,page],i)=>{
 const btn=el('button','rpg26-quest');btn.type='button';btn.addEventListener('click',()=>go(page));
 btn.innerHTML='<span class="rpg26-quest-glyph">'+navigationGlyph(icon)+'</span><span class="rpg26-quest-copy"><small>QUEST 0'+(i+1)+'</small><strong>'+text+'</strong><em>'+subtitle+'</em></span><span class="rpg26-go">➜</span>';grid.append(btn)
});
const statrow=el('section','rpg26-statrow');
stats.forEach((s,i)=>{const col=el('div','rpg26-stat');col.innerHTML='<span class="rpg26-stat-mark">'+['✦','◈','★'][i]+'</span><strong>'+s.value+'</strong><small>'+s.label+'</small><div class="rpg26-xp"><i style="width:'+Math.max(12,((i+1)*21)%98)+'%"></i></div>';statrow.append(col)});
root.replaceChildren(top,hero,divider,grid,statrow);
root.classList.add('rpg26-home');
}
function enrichMap(){
const root=document.querySelector('#main .v18-map-page');if(!root)return;const m=land();
root.classList.add('rpg26-map-page');
root.querySelector('.v24-map-hero')?.remove();root.querySelector('.hf25-map-banner')?.remove();root.querySelector('.v18-scene-strip')?.remove();
const head=root.querySelector('.v18-map-head');if(head&&!root.querySelector('.rpg26-map-intro')){
 const section=el('div','rpg26-map-intro');section.innerHTML='<div><span>✦ '+m.tag+'</span><strong>'+label(7)+' · A1–C2</strong><small>'+m.cities.join(' · ')+'</small></div><div class="rpg26-mini-monuments">'+monument(m.monuments[0])+monument(m.monuments[1])+'</div>';head.after(section)
}
const canvas=root.querySelector('.v18-map-canvas');if(canvas){
 canvas.querySelector('.v24-map-landmarks')?.remove();canvas.querySelector('.hf25-pixel-locations')?.remove();
 if(!canvas.querySelector('.rpg26-terrain')){
  const decor=el('div','rpg26-terrain');decor.innerHTML='<div class="rpg26-terrain-grid"></div><div class="rpg26-map-ornament top">✦ '+m.cities[0]+'</div><div class="rpg26-map-ornament bottom">✦ '+m.cities[3]+'</div>'+monument(m.monuments[0],'rpg26-map-monument first')+monument(m.monuments[2],'rpg26-map-monument second')+'<div class="rpg26-map-sparkle">✦</div>';canvas.prepend(decor);
 }
}
const chapters=root.querySelector('.v18-chapters');if(chapters){
 chapters.classList.add('rpg26-chapters');
 chapters.querySelectorAll('.wj-world-chapter,.s32-chapters button').forEach((btn,i)=>{
  btn.classList.add('rpg26-chapter');
  btn.querySelector('.hf25-chapter-art')?.remove();
  if(!btn.querySelector('.rpg26-chapter-icon')){const ico=el('span','rpg26-chapter-icon');ico.innerHTML=monument(m.monuments[i%4]);btn.prepend(ico)}
 });
}
}
function additionalPages(){
const root=document.querySelector('#main .v18-shell');if(!root||root.classList.contains('rpg26-home')||root.classList.contains('v18-map-page'))return;
root.classList.add('rpg26-content');
root.querySelector('.hf25-quest-head')?.remove();
const m=land();
const targets=root.querySelector('.wj-world-mission,.s32-mission,.v36-level-quiz,.v36-quiz-sheet,.v18-vocab-promo,.v18-guide-page');
if(targets&&!root.querySelector('.rpg26-page-banner')){
 const banner=el('div','rpg26-page-banner');
 banner.innerHTML='<div class="rpg26-page-sprite">'+monument(m.monuments[0])+'</div><div><span>✦ '+m.tag+'</span><strong>'+m.guide+' · '+label(8)+'</strong></div><span class="rpg26-level-chip">LV A1–C2</span>';targets.before(banner);
}
const old=root.querySelector('.v24-mission-banner');if(old)old.remove();
root.querySelectorAll('.v25-card,.wj-world-word,.wj-world-mission-scene,.s32-scene,.v36-quiz-sheet').forEach(c=>c.classList.add('rpg26-game-card'));
}
function decorate(){
if(!document.getElementById('main'))return;
if(state.page==='home')buildHome();else{enrichMap();additionalPages()}
document.querySelectorAll('.v24-artbook,.hf25-map-banner').forEach(x=>x.remove());
document.getElementById('sideNav')?.classList.add('rpg26-sidebar');
}
const previous=render;
render=function(){const result=previous.apply(this,arguments);try{decorate()}catch(e){console.warn('RPG26',e)}return result};
window.rpg26Decorate=decorate;decorate();
})();