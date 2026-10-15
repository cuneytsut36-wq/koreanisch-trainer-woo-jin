/* V24 – Game-ready Higgsfield art direction. Reusable visuals, smooth quest flow,
   click-to-play retro audio. All course logic, translation, accounts, and progress remain in existing modules. */
(function(){
'use strict';
const W={
 ko:{name:'Korea',portrait:'assets/v18-avatar-woo-jin.svg',scene:'assets/v24-ko-dreamscape.svg',guide:'Woo Jin',flag:'🇰🇷',icons:['🏯','🗼','⛩️','🌸','⛰️'],landmarks:[[14,17],[80,13],[8,75],[80,83]],hint:'SEOUL • BUSAN • GYEONGJU • JEJU'},
 de:{name:'Deutschland',portrait:'assets/v18-avatar-lukas.svg',scene:'assets/v24-de-dreamscape.svg',guide:'Lukas',flag:'🇩🇪',icons:['🏰','🏛️','⛪','🚉','🌲'],landmarks:[[12,22],[79,15],[12,73],[85,80]],hint:'BERLIN • MÜNCHEN • HAMBURG • KÖLN'},
 en:{name:'Großbritannien',portrait:'assets/v18-avatar-alex.svg',scene:'assets/v24-en-dreamscape.svg',guide:'Alex',flag:'🇬🇧',icons:['🏰','🕰️','🌉','🚌','☕'],landmarks:[[12,15],[80,13],[8,78],[80,82]],hint:'LONDON • EDINBURGH • OXFORD • MANCHESTER'}
};
const animatedGif={spark:'data:image/gif;base64,R0lGODlhFAAUAIEAAAAAAP/yoAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQJEgAAACwAAAAAFAAUAAAILQABCBxIsKDBgwgTKlzIsKHDhxAjQgxAcSLFig4vYmyoMYBFjxJDihxJsqTJgAAh+QQJEgAAACwHAAcABwAHAIEAAAD31ncAAAAAAAAIGAABAAhAUKBAggEOIlzIsGHBgQ8VJgQQEAAh+QQJEgAAACwFAAUACwALAIEAAAD//OsAAAAAAAAIKAABCAQQoODAgwQNIhRYMMBChgohNpxIsaLFigcbPkzo8KFGjxEBBAQAIfkECRIAAAAsBwAHAAcABwCBAAAA99Z3AAAAAAAACBgAAQAIQFCgQIIBDiJcyLBhwYEPFSYEEBAAOw==',ship:'data:image/gif;base64,R0lGODlhGAAYAIEAAAAAAHa4/+r2///PciH/C05FVFNDQVBFMi4wAwEAAAAh+QQJDwAAACwAAAAAGAAYAAAIZwABCBxIsKDBgwgTKlzIsKHDhxAjDgwgkWCAixUBXNwocaNHiAEEiBwpgGLDiyRHYly4MaVIjgk9uiwJ06DHmzhXHsyJkyHPmj57RrwZcYBRjQCMDniodGBTh0+THoU6VepSqlcXBgQAIfkECQ8AAAAsBAAFABEAEwCBAAAAdrj//89y6vb/CF0AAQgcKDAAwYMIAyhEyFChQ4YEHUqECCDAgIsYBxhMaDHjxYURFXr8CLKiw5EaH0pcyRJkS5YHXz5sCJOiyZkQBeisCECngJw7BfoE+lNoUIRDjRZFejQp06UMAwIAIfkECQ8AAAAsBAAEABEAEgCBAAAAdrj/6vb//89yCFkAAQgcKDAAwYMIAyhEyFChQ4YEHUqECCCAgIsYBRhMaDHjxYURFXr8CLKiw5EaH0pcyRJkS5YHXz5sCJOiyZkQB+isCEDngJw7BfoE+lNoUIRDjRZFepRhQAAh+QQJDwAAACwEAAUAEQATAIEAAAB2uP//z3Lq9v8IXQABCBwoMADBgwgDKETIUKFDhgQdSoQIIIMCAixgHGExoMePFhREVevwIsqLDkRofSlzJEmRLlgdfPmwIk6LJmRAH6KwIQKeAnDsF+gT6U2hQhEONFkV6NCnTpQwDAgAh+QQJDwAAACwEAAYAEQASAIEAAAB2uP/q9v//z3IIWQABCBwoMADBgwgDKETIUKFDhgQdSoQIIICAixgFGExoMePFhREVevwIsqLDkRofSlzJEmRLlgdfPmwIk6LJmRAH6KwIQOeAnDsF+gT6U2hQhEONFkV6lGFAADs='};
const concepts=[
 ['Korea · Start','https://d8j0ntlcm91z4.cloudfront.net/user_3KgDSNgRcYHCEkF9DO7qAnjsYND/hf_20261015_145647_b1382254-572d-4f86-bd90-223f03f1b7dc.png'],
 ['Korea · Karte','https://d8j0ntlcm91z4.cloudfront.net/user_3KgDSNgRcYHCEkF9DO7qAnjsYND/hf_20261015_145647_dcc8e91a-4034-4d33-9361-1e509b4a87f4.png'],
 ['Deutschland · Karte','https://d8j0ntlcm91z4.cloudfront.net/user_3KgDSNgRcYHCEkF9DO7qAnjsYND/hf_20261015_145647_400fac1b-18d2-4f09-b023-8bd4bf1e7e8d.png'],
 ['Story · Quiz','https://d8j0ntlcm91z4.cloudfront.net/user_3KgDSNgRcYHCEkF9DO7qAnjsYND/hf_20261015_145647_d0d6ce16-8fc3-4e63-8a99-55793f20e952.png'],
 ['Charaktere · Sprites','https://d8j0ntlcm91z4.cloudfront.net/user_3KgDSNgRcYHCEkF9DO7qAnjsYND/hf_20261015_145647_f24620b9-2eea-43d8-830c-3391980b6ed7.png']
];
const localize=(s)=>typeof window.wjUniversalText==='function'?window.wjUniversalText(s):s;
function lang(){return W[wjTarget]?wjTarget:'ko'}
function current(){return W[lang()]}
function appendSparkles(host){
 if(!host||host.querySelector('.v24-scenery-vfx'))return;
 const v=document.createElement('div');v.className='v24-scenery-vfx';v.setAttribute('aria-hidden','true');
 let bits='<span class="v24-cloud"></span><span class="v24-cloud"></span>';
 for(let i=0;i<10;i++)bits+='<i class="v24-sakura" style="--left:'+(i*9+5)+'%;--speed:'+(7+i%6)+'s;--delay:-'+(i*1.4)+'s"></i>';
 for(let i=0;i<8;i++)bits+='<i class="v24-glint" style="--left:'+(8+(i*13)%86)+'%;--top:'+(9+(i*22)%76)+'%;--delay:-'+i*.43+'s"></i>';
 v.innerHTML=bits;const gif=document.createElement('img');gif.src=animatedGif.spark;gif.alt='';gif.className='v24-real-gif v24-twinkle-gif';v.append(gif);host.appendChild(v);
}
function createImage(className,src,alt){const img=document.createElement('img');img.className=className;img.src=src;img.alt=alt;img.loading='lazy';return img}
function banner(cls,scene,caption){
 const b=document.createElement('div');b.className=cls;
 b.appendChild(createImage('v24-country-picture',scene,caption));
 const label=document.createElement('span');label.className=cls==='v24-map-hero'?'v24-banner-caption':'v24-mission-caption';label.textContent=caption;b.append(label);appendSparkles(b);
 return b;
}
function addHome(){
 const root=document.querySelector('#main .v19-home');if(!root)return;
 const w=current();const hero=root.querySelector('.v19-hero');
 if(hero){const bg=hero.querySelector('.v19-scene');if(bg&&bg.getAttribute('src')!==w.scene)bg.src=w.scene;appendSparkles(hero)}
 const strip=root.querySelector('.v19-guide-note');if(strip&&!strip.querySelector('.v24-pixel-trophy')){
   const star=document.createElement('span');star.className='v24-pixel-trophy';star.textContent='✦';strip.prepend(star);
 }
 if(!root.querySelector('.v24-artbook')){
  const d=document.createElement('details');d.className='v24-artbook';
  const s=document.createElement('summary');s.textContent='✦ '+({'de':'Pixel-Kunstgalerie','en':'Pixel art gallery','tr':'Piksel sanat galerisi','ja':'ピクセルアートギャラリー','ko':'픽셀 아트 갤러리','es':'Galería de arte pixelado','fr':'Galerie pixel art'}[v27Lang]||'Pixel-Kunstgalerie');
  d.append(s);
  const content=document.createElement('div');content.className='v24-artbook-grid';
  concepts.forEach(([label,url])=>{const figure=document.createElement('figure');const img=createImage('',url,label);img.loading='lazy';figure.append(img);const fc=document.createElement('figcaption');fc.textContent=label;figure.append(fc);content.append(figure)});
  d.append(content);root.append(d);
 }
}
function addMap(){
 const root=document.querySelector('#main .v18-map-page');if(!root)return;
 const w=current();
 if(!root.querySelector('.v24-map-hero')){
  const b=banner('v24-map-hero',w.scene,w.flag+' '+w.hint);
  const tabs=root.querySelector('.v18-country-tabs');if(tabs)tabs.before(b);
 }
 const map=root.querySelector('.v18-map-canvas');if(map&&!map.querySelector('.v24-map-landmarks')){
  const overlay=document.createElement('div');overlay.className='v24-map-landmarks';overlay.setAttribute('aria-hidden','true');
  const water=document.createElement('div');water.className='v24-river';overlay.append(water);
  w.landmarks.forEach(([left,top],i)=>{const el=document.createElement('span');el.className='v24-landmark';el.style.left=left+'%';el.style.top=top+'%';el.textContent=w.icons[i];overlay.append(el)});
  [[22,12],[80,53],[18,66]].forEach(([left,top])=>{const el=document.createElement('span');el.className='v24-map-star';el.style.left=left+'%';el.style.top=top+'%';overlay.append(el)});
  const ship=document.createElement('img');ship.src=animatedGif.ship;ship.alt='';ship.className='v24-real-gif v24-ship-gif';overlay.append(ship);map.append(overlay);
 }
 const strip=root.querySelector('.v18-scene-strip img');if(strip)strip.src=w.scene;
}
function addMission(){
 const root=document.querySelector('#main .v18-shell');if(!root||root.classList.contains('v18-map-page')||root.classList.contains('v19-home'))return;
 const w=current();const strip=root.querySelector('.v18-scene-strip img');
 if(strip)strip.src=w.scene;
 const mission=root.querySelector('.wj-world-mission,.s32-mission,.v36-quiz-sheet,.v36-level-quiz');
 if(mission&&!root.querySelector('.v24-mission-banner')){
   const b=banner('v24-mission-banner',w.scene,w.flag+' '+w.name);
   mission.before(b);
 }
 const card=root.querySelector('.wj-world-mission-step,.s32-scene,.v36-quiz-sheet');
 if(card&&!root.querySelector('.v24-chapter-ornament')){
  const strip=document.createElement('div');strip.className='v24-chapter-ornament';strip.innerHTML='<span class="v24-pixel-trophy">✦</span><span>'+w.flag+' '+w.name+' · A1—C2</span>';
  card.before(strip);
 }
}
function addVocabulary(){
 const root=document.querySelector('#main .v18-shell');if(!root||!root.querySelector('.v18-vocab-promo')||root.querySelector('.v24-vocab-flag'))return;
 const w=current();const div=document.createElement('div');div.className='v24-vocab-flag';
 div.append(createImage('',w.scene,w.name));
 const t=document.createElement('span');t.textContent=w.flag+' '+w.name+' · '+({'de':'Bildkarten & Aussprache','en':'Illustrated words & pronunciation','tr':'Resimli kelimeler ve telaffuz','ja':'イラスト付き単語と発音','ko':'그림 단어와 발음','es':'Palabras ilustradas y pronunciación','fr':'Vocabulaire illustré et prononciation'}[v27Lang]||'Bildkarten & Aussprache');div.append(t);
 root.querySelector('.v18-vocab-promo').before(div);
}
function addTutor(){
 const root=document.querySelector('#main .v18-coach-mount');if(!root)return;
 const w=current();const existing=root.querySelector('.v18-guide-page');
 if(existing){let avatar=existing.querySelector('img');if(avatar)avatar.src=w.portrait;return}
 if(root.querySelector('.v24-avatar-stage'))return;
 const card=document.createElement('section');card.className='v24-avatar-stage';card.append(createImage('',w.portrait,w.guide));
 const inner=document.createElement('div');const name=document.createElement('strong');name.textContent=w.guide;inner.append(name);
 const desc=document.createElement('small');desc.textContent=w.flag+' '+({'de':'Dein persönlicher Sprachbegleiter','en':'Your personal language tutor','tr':'Kişisel dil eğitmenin','ja':'あなた専用の語学コーチ','ko':'나만의 언어 코치','es':'Tu tutor de idiomas','fr':'Ton coach linguistique'}[v27Lang]||'Dein Sprachbegleiter');inner.append(desc);
 const dots=document.createElement('div');dots.className='v24-chat-indicator';dots.innerHTML='<i></i><i></i><i></i>';dots.setAttribute('aria-hidden','true');inner.append(dots);card.append(inner);root.prepend(card);
}
const SOUND_KEY='wj-v24-sound';
let enabled=false;
try{enabled=localStorage.getItem(SOUND_KEY)==='1'}catch(e){}
let ctx=null;
function beep(type){
 if(!enabled)return;
 try{
  const Audio=window.AudioContext||window.webkitAudioContext;if(!Audio)return;
  if(!ctx)ctx=new Audio();
  if(ctx.state==='suspended')ctx.resume();
  let seq=type==='win'?[[523,.00,.075],[659,.09,.08],[784,.19,.09],[1046,.3,.15]]:type==='open'?[[390,0,.06],[540,.08,.07]]:type==='error'?[[220,0,.09],[165,.1,.14]]:[[350,0,.035]];
  const base=ctx.currentTime;
  seq.forEach(([hz,t,d])=>{
    const osc=ctx.createOscillator(),g=ctx.createGain();
    osc.type=type==='win'?'triangle':'square';
    osc.frequency.setValueAtTime(hz,base+t);g.gain.setValueAtTime(.0001,base+t);g.gain.exponentialRampToValueAtTime(.035,base+t+.012);g.gain.exponentialRampToValueAtTime(.0001,base+t+d);
    osc.connect(g);g.connect(ctx.destination);osc.start(base+t);osc.stop(base+t+d+.015);
  });
 }catch(e){}
}
function updateSoundToggle(){
 const old=document.querySelector('.v24-sfx-toggle');if(old){old.setAttribute('aria-pressed',String(enabled));old.textContent=enabled?'♫':'♪';old.title=enabled?'8-Bit-Klänge ausschalten':'8-Bit-Klänge einschalten';return}
 const b=document.createElement('button');b.className='v24-sfx-toggle';b.type='button';b.textContent=enabled?'♫':'♪';b.title=enabled?'8-Bit-Klänge ausschalten':'8-Bit-Klänge einschalten';b.setAttribute('aria-label',b.title);b.setAttribute('aria-pressed',String(enabled));
 b.addEventListener('click',()=>{enabled=!enabled;try{localStorage.setItem(SOUND_KEY,enabled?'1':'0')}catch(e){}updateSoundToggle();beep('open')});document.body.append(b);
}
document.addEventListener('click',e=>{
 const target=e.target.closest('button');if(!target||target.classList.contains('v24-sfx-toggle'))return;
 if(target.closest('.v36-quiz-options,.s32-options')||target.classList.contains('right'))beep('open');
 else if(target.matches('[onclick*="go("],[onclick*="wjSwitchTarget"],.v19-flag,.v18-map-pin,.v18-country-tabs button'))beep('open');
 else beep('tap');
},{passive:true});
function decorate(){
 try{addHome();addMap();addMission();addVocabulary();addTutor();updateSoundToggle()}catch(e){console.warn('Pixel Adventure decor:',e)}
}
const previous=render;
render=function(){const r=previous.apply(this,arguments);decorate();return r};
window.wjV24Decorate=decorate;
decorate();
})();