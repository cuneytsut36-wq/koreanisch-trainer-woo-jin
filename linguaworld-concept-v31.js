/* LinguaWorld V31 – image-to-code iteration faithfully reconstructing reference components.
   Gameplay, mission completion, vocabulary, progress and translations remain in the original engine. */
(function(){
'use strict';
const portraits={
 ko:window.LWPrivacy.asset('https://d2ol7oe51mr4n9.cloudfront.net/user_3KgDSNgRcYHCEkF9DO7qAnjsYND/77dcbb63-fce5-463b-a25f-de16f2122a09.png','privacy-scene.svg'),
 de:window.LWPrivacy.asset('https://d2ol7oe51mr4n9.cloudfront.net/user_3KgDSNgRcYHCEkF9DO7qAnjsYND/231cb641-672d-4a79-b738-844d2214a849.png','privacy-scene.svg'),
 en:window.LWPrivacy.asset('https://d2ol7oe51mr4n9.cloudfront.net/user_3KgDSNgRcYHCEkF9DO7qAnjsYND/34688424-985b-4ec8-9f4e-36916212492e.png','privacy-scene.svg')
};
const art={
 map:window.LWPrivacy.asset('https://d8j0ntlcm91z4.cloudfront.net/user_3KgDSNgRcYHCEkF9DO7qAnjsYND/hf_20261015_165144_07658f79-7120-4560-b618-0148832db437.png','privacy-scene.svg'),
 korea:window.LWPrivacy.asset('https://d8j0ntlcm91z4.cloudfront.net/user_3KgDSNgRcYHCEkF9DO7qAnjsYND/hf_20261015_163340_375b460e-df89-4d21-9f9f-baf3d039814b.png','privacy-scene.svg')
};
const W={
 ko:{flag:'🇰🇷',name:'Korea',label:'한국어',guide:'Woo Jin',lang:'Koreanisch',hello:'안녕하세요!'},
 de:{flag:'🇩🇪',name:'Deutschland',label:'Deutsch',guide:'Lukas',lang:'Deutsch',hello:'Hallo!'},
 en:{flag:'🇬🇧',name:'UK',label:'English',guide:'Alex',lang:'Englisch',hello:'Hello!'}
};
function esc31(s){return String(s??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;')}
function lang31(){return W[wjTarget]||W.ko}
function trans31(de,en,tr){const n=typeof window.wjNativeLang==='string'?window.wjNativeLang:typeof v27Lang==='string'?v27Lang:typeof window.wjNativeMode==='string'?window.wjNativeMode:'de';return n==='tr'?(tr||de):n==='en'?(en||de):de}
function headingIcons(name){const D={home:'M4 11L12 4L20 11V20H14V14H10V20H4Z',map:'M3 5L10 2L15 5L21 2V18L15 21L10 18L3 21Z',book:'M3 4Q8 2 12 5Q16 2 21 4V20Q16 18 12 21Q8 18 3 20Z',chat:'M3 4H21V17H12L7 21V17H3Z',quiz:'M12 2L15 8L22 9L17 14L18 22L12 18L6 22L7 14L2 9L9 8Z',media:'M3 6H21V20H3ZM10 9L16 13L10 17Z',progress:'M4 20V13H8V20ZM10 20V8H14V20ZM16 20V3H20V20Z'};
return '<svg viewBox="0 0 24 24" width="23" height="23" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="'+(D[name]||D.home)+'"/></svg>'}
function char31(el,code){if(!el)return;el.classList.add('lw31-cutout');el.style.backgroundImage='url("'+portraits[code||wjTarget]+'")';el.style.backgroundPosition='center bottom';el.style.backgroundSize='contain';el.style.backgroundRepeat='no-repeat';el.style.imageRendering='pixelated';el.setAttribute('role','img');el.setAttribute('aria-label',(W[code||wjTarget]||W.ko).guide)}
function calcLevel(){let xp=0;try{xp=Number(state.xp||0)}catch(e){}return Math.max(1,Math.floor(xp/100)+1)}
function decorateHome(){
 const home=document.querySelector('.lw30-home');if(!home)return;
 home.classList.add('lw31-home');
 home.querySelectorAll('.lw30-character').forEach(el=>char31(el));
 const status=home.querySelector('.lw30-status');if(status){
  const face=status.querySelector('.lw30-face');if(face){face.innerHTML='<img alt="'+esc31(lang31().guide)+'" src="'+portraits[wjTarget]+'">';}
  const label=status.querySelector('.lw30-level strong');if(label)label.textContent='Lv. '+calcLevel();
  const progress=status.querySelector('.lw30-level i b');if(progress){const xp=Number(state?.xp||0);progress.style.width=(Math.max(4,xp%100))+'%'}
  const gems=status.querySelector('.lw30-gem');if(gems){const learned=typeof known==='function'?Object.values(known()).filter(Boolean).length:0;gems.textContent='💎 '+learned}
 }
 const hero=home.querySelector('.lw30-hero-scene');
 if(hero){
   hero.classList.add('lw31-hero');const words=hero.querySelector('.lw30-hero-words');
   if(words){let p=words.querySelector('p');if(p)p.textContent=trans31('Sprich. Erlebe. Entdecke '+lang31().name+'.','Speak. Experience. Explore '+lang31().name+'.','Konuş. Yaşa. '+lang31().name+' keşfet.')}
   if(!hero.querySelector('.lw31-hanok')){const caption=document.createElement('div');caption.className='lw31-hanok';caption.textContent='✦ '+lang31().name+' · '+lang31().label;hero.append(caption)}
 }
 const world=home.querySelector('.lw30-worlds');if(world)world.classList.add('lw31-country-switch');
 const box=home.querySelector('.lw30-speech');if(box){const small=box.querySelector('small');if(small)small.textContent=lang31().guide;let strong=box.querySelector('strong');if(strong)strong.textContent=lang31().hello;box.classList.add('lw31-speech')}
 const quest=home.querySelector('.lw30-quest-grid');if(quest)quest.classList.add('lw31-actions');
 if(!home.querySelector('.lw31-petals')){const petals=document.createElement('div');petals.className='lw31-petals';petals.setAttribute('aria-hidden','true');for(let i=0;i<12;i++){let sp=document.createElement('span');sp.textContent=i%3?'✿':'✦';sp.style.cssText='--i:'+i+';left:'+(i*37%98)+'%;animation-delay:-'+(i%6)*1.2+'s';petals.append(sp)}home.prepend(petals)}
 const nav=document.getElementById('bottomNav');if(nav)nav.classList.add('lw31-bottom');
}
function desktopSidebar(){
 const sidebar=document.getElementById('sideNav');if(!sidebar)return;
 sidebar.classList.add('lw31-sidebar');const active=lang31();const onHome=state.page==='home';
 const guides=(onHome?Object.entries(W):[[wjTarget,active]]).map(([key,w])=>'<button class="lw31-guide '+(key===wjTarget?'selected':'')+'" type="button" onclick="'+(onHome?'wjSwitchTarget(\''+key+'\')':'go(\'home\')')+'" aria-label="'+esc31(w.name)+' – '+esc31(w.guide)+'"><img src="'+portraits[key]+'" alt=""><span class="lw31-guide-copy"><strong>'+esc31(w.guide)+'</strong><small>'+esc31(w.name)+' · '+esc31(w.lang)+'</small><em>'+esc31(w.hello)+'</em></span><span class="lw31-guide-flag">'+w.flag+'</span></button>').join('');
 const menu=[
 ['home','home',trans31('Start','Home','Ana sayfa')],
 ['storyMap','map',trans31('Story Mode','Story Mode','Hikâye modu')],
 ['studyScroll','book',trans31('Vokabeln','Vocabulary','Kelimeler')],
 ['quiz','quiz',trans31('Quiz','Quiz','Test')],
 ['wooJin','chat',trans31('Chat','Chat','Sohbet')],
 ['progress','progress',trans31('Fortschritt','Progress','İlerleme')],
 ['media','media',trans31('Kultur & Medien','Culture & Media','Kültür ve medya')]
 ];
 sidebar.innerHTML='<div class="lw31-side-logo"><span class="lw31-globe">🌍</span><div><strong>LinguaWorld</strong><small>'+trans31('Lernen mit Charakter','Learn with character','Karakterlerle öğren')+'</small></div></div>'+
 '<div class="lw31-guides">'+guides+'</div><div class="lw31-nav-list">'+menu.map(([route,i,label])=>'<button class="lw31-nav-link '+(state.page===route||route==='quiz'&&state.page==='quiz'?'active':'')+'" onclick="'+(route==='quiz'?"startQuiz('all')":"go('"+route+"')")+'">'+headingIcons(i)+'<span>'+label+'</span></button>').join('')+'</div>'+
 '<div class="lw31-daily"><strong>🔥 '+trans31('Tagesziel','Daily goal','Günlük hedef')+'</strong><div class="lw31-daily-track"><i style="width:'+Math.min(100,Math.max(4,Number(typeof todayCount==='function'?todayCount():0)*10))+'%"></i></div><small>'+Math.min(10,Number(typeof todayCount==='function'?todayCount():0))+' / 10</small><span>✦ '+trans31('Jeden Tag ein Abenteuer','A new adventure every day','Her gün bir macera')+'</span></div>';
}
function relocateMap(){
 const root=document.querySelector('.lw30-map');if(!root)return;
 root.classList.add('lw31-map');
 const shell=root.querySelector('.v18-map-layout');if(shell)shell.classList.add('lw31-map-layout');
 const map=root.querySelector('.lw30-map-canvas');if(map){
  if(wjTarget==='ko')map.style.setProperty('--lw30-map-art','url("'+art.map+'")');
  const pins=[...map.querySelectorAll('.lw30-map-pin')];
  const pts=wjTarget==='ko'?[[35,25],[50,33],[68,65],[70,77],[70,48],[38,89]]:[[35,22],[60,34],[70,65],[45,55],[55,77],[30,85]];
  pins.forEach((pin,i)=>{
   pin.style.left=pts[i][0]+'%';pin.style.top=pts[i][1]+'%';
   pin.classList.add('lw31-world-pin');
   const l=pin.querySelector('strong');if(l&&wjTarget==='ko'&&typeof s32Worlds!=='undefined')l.textContent=s32Worlds[i].region;
   const s=pin.querySelector('small');if(s&&wjTarget==='ko'&&typeof s32Worlds!=='undefined')s.textContent=s32Worlds[i].level;
   if(pin.classList.contains('selected'))pin.innerHTML+='<span class="lw31-pin-dot">●</span>'
  });
  if(!map.querySelector('.lw31-map-sparkle')){const sp=document.createElement('span');sp.className='lw31-map-sparkle';sp.textContent='✦';sp.setAttribute('aria-hidden','true');map.append(sp)}
 }
 const chapters=root.querySelector('.lw30-chapters');
 if(chapters){
  chapters.classList.add('lw31-chapters');const rows=chapters.querySelectorAll('.lw30-chapter');
  rows.forEach((ch,i)=>{
   ch.classList.add('lw31-level-chapter');
   if(!ch.querySelector('.lw31-play-indicator')){const indicator=document.createElement('span');indicator.className='lw31-play-indicator';indicator.textContent=ch.classList.contains('locked')?'🔒':(i===0?'▶':'›');ch.append(indicator)}
  });
  const title=chapters.querySelector('h2');if(title)title.classList.add('lw31-chapters-title');
 }
 const banner=root.querySelector('.v18-scene-strip');if(banner)banner.remove();
}
function sceneMission(){
 const root=document.querySelector('.lw30-story');if(!root)return;root.classList.add('lw31-story');
 const scene=root.querySelector('.s32-scene,.wj-world-mission-scene,.wj-world-scene');if(!scene)return;
 const artBox=scene.querySelector('.lw30-story-art');if(!artBox)return;
 artBox.classList.add('lw31-story-art');
 char31(artBox.querySelector('.lw30-character'));
 const term=scene.querySelector('.s32-target-term');const meaning=scene.querySelector('.s32-meaning');
 const word=term?.textContent?.trim()||'';const translated=meaning?.textContent?.trim()||'';
 const dialog=artBox.querySelector('.lw30-story-dialog');
 if(dialog){
  dialog.classList.add('lw31-story-bubble');
  dialog.innerHTML='<small>✦ '+esc31(lang31().guide)+'</small><strong>'+esc31(word)+'</strong><span>'+esc31(translated)+'</span><button class="lw31-speaker" type="button" aria-label="'+trans31('Anhören','Listen','Dinle')+'">🔊</button>';
  dialog.querySelector('.lw31-speaker')?.addEventListener('click',()=>{if(typeof speak==='function')speak(word)});
 }
 const parent=artBox.parentElement;
 if(parent && !parent.querySelector('.lw31-story-termcards')){
  const list=document.createElement('div');list.className='lw31-story-termcards';const pool=wjTarget==='ko'&&typeof s32Pool==='function'?s32Pool(s32World,s32Chapter):[];
  const fallback=[[word,translated]];let terms=pool.length?pool:fallback;terms=terms.slice(0,4);
  const emojis=['🚶','🏯','📷','🍜'];terms.forEach((pair,i)=>{
   const b=document.createElement('button');b.type='button';b.className='lw31-phrase-card';
   b.innerHTML='<span class="lw31-phrase-icon">'+emojis[i]+'</span><strong>'+esc31(pair[0])+'</strong><small>'+esc31(typeof wjNativeMeaning==='function'?wjNativeMeaning(pair[1]):pair[1])+'</small><span class="lw31-card-sound">♪</span>';
   b.addEventListener('click',()=>{if(typeof speak==='function')speak(pair[0])});list.append(b);
  });
  if(terms.length)artBox.insertAdjacentElement('afterend',list);
 }
 const heading=root.querySelector('h1');if(heading)heading.classList.add('lw31-story-title');
 const next=root.querySelector('.lw30-next');if(next)next.classList.add('lw31-next');
}
function classifyWord(word){const text=word.toLowerCase();
 if(/kaffee|café|cafe|essen|trink|food|sushi|ramen|reis|brot|wasser|tee|fleisch|huhn|bestell|restaurant|kimbap|americano|milch|coffee|food|sugar|rechnung|bezahlen|dessert|steak|hungr|mahlzeit|baeg|eum|meog|juseyo/.test(text))return 'food';
 if(/fahren|ankunft|zug|bus|metro|straße|weg|flug|ticket|airport|bahn|taxi|fahr|fahren|reise|flugzeug|gayo|gareul|eodi|entfern|stadt|seoul|busan|jeju/.test(text))return 'travel';
 if(/kultur|tempel|palast|museum|kunst|tradition|geschichte|musik|kirche|fest|feier|hanbok|museum|kong|histor/.test(text))return 'culture';
 return 'daily'}
function allVocabCards(){return [...document.querySelectorAll('.lw30-vocab .v25-word')]}
function vocabularyGrid(){
 // New minimalist swipe view preserves the original lesson engine and IntersectionObserver.
 if(window.lw33ClassicSwipe===true)return;
 const main=document.getElementById('main');if(!main||!['studyScroll','lesson'].includes(state.page))return;
 main.classList.add('lw31-vocab');
 const learning=main.querySelector('.v25-learning'),track=main.querySelector('.v25-track');if(!learning||!track)return;
 const header=main.querySelector('.lw30-vocab-head');if(header)header.classList.add('lw31-vocab-header');
 const cards=[...track.querySelectorAll('.v25-word')];if(!cards.length)return;
 cards.forEach((card,i)=>{
   card.classList.add('lw31-vocab-tile');
   card.dataset.lw31Category=classifyWord(card.textContent);
   card.dataset.lw31Index=String(i);
   card.addEventListener('click',ev=>{if(ev.target.closest('button'))return;selectVocab(card)});
 });
 let selection=main.querySelector('.lw31-vocab-detail');
 if(!selection){selection=document.createElement('div');selection.className='lw31-vocab-detail';learning.insertAdjacentElement('afterend',selection)}
 function selectVocab(card){
   cards.forEach(c=>c.classList.toggle('lw31-selected',c===card));
   const title=card.querySelector('.v25-caption h2')?.textContent?.trim()||'';
   const meaning=card.querySelector('.v25-caption p')?.textContent?.trim()||'';
   const picture=card.querySelector('.v25-stage img');
   selection.innerHTML='<div class="lw31-detail-art"></div><div class="lw31-detail-copy"><span class="lw31-kicker">✦ '+esc31(lang31().lang.toUpperCase())+' · VOCABULARY</span><h2>'+esc31(title)+'</h2><p>'+esc31(meaning)+'</p><div class="lw31-detail-meta"><span>🔊 '+trans31('Aussprache','Pronunciation','Telaffuz')+'</span><span>✦ A1–C2</span></div><button class="lw31-detail-audio" type="button">🔊 '+trans31('Wort anhören','Listen to the word','Kelimeyi dinle')+'</button></div>';
   if(picture){let img=picture.cloneNode(true);img.loading='eager';selection.querySelector('.lw31-detail-art').append(img)}
   selection.querySelector('.lw31-detail-audio')?.addEventListener('click',()=>{if(typeof speak==='function')speak(title)});
 }
 function filter(category){
   const visible=cards.filter(card=>category==='all'||card.dataset.lw31Category===category);
   cards.forEach(card=>card.style.setProperty('display','none','important'));
   visible.slice(0,9).forEach(card=>card.style.removeProperty('display'));
   const old=learning.querySelector('.lw31-vocab-more');if(old)old.remove();
   if(visible.length>9){let shown=9;const more=document.createElement('button');more.type='button';more.className='lw31-vocab-more';more.textContent=trans31('Weitere Wörter anzeigen ↓','Load more words ↓','Daha fazla kelime ↓');more.addEventListener('click',()=>{
     visible.slice(shown,shown+9).forEach(card=>card.style.removeProperty('display'));
     shown+=9;if(shown>=visible.length)more.remove();
   });track.insertAdjacentElement('afterend',more)}
   let empty=learning.querySelector('.lw31-vocab-empty');if(empty)empty.remove();
   if(!visible.length){empty=document.createElement('p');empty.className='lw31-vocab-empty';empty.textContent=trans31('In diesem Abschnitt noch keine passenden Wörter. Wähle „Alle“.','No matching words in this section. Choose All.','Bu bölümde eşleşen kelime yok. Tümünü seç.');track.insertAdjacentElement('afterend',empty);}
   if(visible.length)selectVocab(visible[0]);else selection.innerHTML='';
 }
 const tabs=main.querySelectorAll('.lw30-vocab-cats [data-tab]');
 tabs.forEach(btn=>{btn.addEventListener('click',evt=>{evt.stopPropagation();tabs.forEach(x=>x.classList.toggle('active',x===btn));filter(btn.dataset.tab)})});
 filter('all');
 learning.querySelector('.v25-title')?.classList.add('lw31-original-vocab-header');
}
function beep(){try{
 if(localStorage.getItem('lw31-sfx')==='off')return;
 const A=window.AudioContext||window.webkitAudioContext;if(!A)return;
 const ac=window.lw31Audio||(window.lw31Audio=new A());if(ac.state==='suspended')ac.resume();
 [0,1].forEach((v,i)=>{const osc=ac.createOscillator(),gain=ac.createGain(),t=ac.currentTime+i*.073;osc.type='square';osc.frequency.setValueAtTime(v?740:520,t);gain.gain.setValueAtTime(.019,t);gain.gain.exponentialRampToValueAtTime(.001,t+.067);osc.connect(gain);gain.connect(ac.destination);osc.start(t);osc.stop(t+.07)})
 }catch(e){}}
document.addEventListener('click',e=>{if(e.target.closest('.lw31-home button,.lw31-sidebar button,.lw31-map button,.lw31-story button,.lw31-vocab button'))beep()},{capture:false});
function refine(){try{
 document.documentElement.dataset.lw31=wjTarget;
 desktopSidebar();
 const area=document.getElementById('main');if(!area)return;
 if(state.page==='home')decorateHome();
 else if(state.page==='storyMap')relocateMap();
 else if(state.page==='storyMission')sceneMission();
 else if(['studyScroll','lesson'].includes(state.page))vocabularyGrid();
 }catch(e){console.warn('LinguaWorld V31 screen refinement:',e)}}
const oldRender=render;
render=function(){const r=oldRender.apply(this,arguments);refine();return r};
refine();
window.lw31Refine=refine;
})();