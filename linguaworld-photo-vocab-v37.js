/* LinguaWorld V37 – clean social-style vocabulary feed with relevant verified online photos.
 * Original animated vocabulary visuals remain fallback. Original swipe, speech, favorite,
 * mark, level filters and persistence remain controlled by the course engine.
 */
(function(){
'use strict';
const BASE='https://images.unsplash.com/';
const photos=[
 {key:/\b(sushi|nigiri|sashimi|すし|寿司|스시|초밥)\b/i,id:'photo-1579871494447-9811cf80d66c',label:'Sushi'},
 {key:/\b(ramen|ramyeon|ramyun|라면|ラーメン)\b/i,id:'photo-1569718212165-3a8278d5f624',label:'Ramen'},
 {key:/\b(restaurant|restoran|식당|레스토랑|café|cafe|카페)\b/i,id:'photo-1552566626-52f8b828add9',label:'Restaurant'},
 {key:/\b(salat|salad|샐러드)\b/i,id:'photo-1512621776951-a57141f2eefd',label:'Salat'},
 {key:/\b(bibimbap|비빔밥|bowl)\b/i,id:'photo-1546069901-ba9599a7e63c',label:'Essen'},
 {key:/\b(banane|banana|바나나)\b/i,id:'photo-1571771894821-ce9b6c11b08e',label:'Banane'},
 {key:/\b(wasser|water|su|물|mulgwa)\b/i,id:'photo-1528825871115-3581a5387919',label:'Wasser'},
 {key:/\b(kaffee|coffee|커피|americano|아메리카노)\b/i,id:'photo-1509042239860-f550ce710b93',label:'Kaffee'},
 {key:/\b(katze|cat|goyangi|고양이)\b/i,id:'photo-1514888286974-6c03e2ca1dba',label:'Katze'},
 {key:/\b(hund|dog|gae|강아지|개)\b/i,id:'photo-1552053831-71594a27632d',label:'Hund'},
 {key:/\b(apfel|apple|sagwa|사과)\b/i,id:'photo-1560806887-1e4cd0b6cbd6',label:'Apfel'},
 {key:/\b(zug|train|기차|전철|지하철)\b/i,id:'photo-1474487548417-781cb71495f3',label:'Zug'},
 {key:/\b(flugzeug|airplane|aircraft|비행기)\b/i,id:'photo-1436491865332-7a61a109cc05',label:'Flugzeug'},
 {key:/\b(ber[gk]|mountain|산|fuji|산악)\b/i,id:'photo-1464822759023-fed622ff2c3b',label:'Berg'},
 {key:/\b(blumen|flower|꽃|벚꽃|cherry blossom)\b/i,id:'photo-1490750967868-88aa4486c946',label:'Blumen'},
 {key:/\b(buch|book|책)\b/i,id:'photo-1497633762265-9d179a990aa6',label:'Buch'},
 {key:/\b(schule|school|학교)\b/i,id:'photo-1503676260728-1c00da094a0b',label:'Schule'},
 {key:/\b(auto|car|자동차)\b/i,id:'photo-1503376780353-7e6692767b70',label:'Auto'},
 {key:/\b(haus|house|집)\b/i,id:'photo-1600596542815-ffad4c1539a9',label:'Haus'},
 {key:/\b(telefon|phone|smartphone|핸드폰|전화)\b/i,id:'photo-1511707171634-5f897ff02aa9',label:'Telefon'}
];
const worlds={ko:{name:'Koreanisch',flag:'🇰🇷'},de:{name:'Deutsch',flag:'🇩🇪'},en:{name:'Englisch',flag:'🇬🇧'}};
const dict={
 de:{swipe:'Nach oben wischen',sound:'Hören',mark:'Merken',next:'Weiter',photo:'Foto',level:'Level',words:'Vokabeln'},
 en:{swipe:'Swipe up',sound:'Listen',mark:'Remember',next:'Next',photo:'Photo',level:'Level',words:'Vocabulary'},
 tr:{swipe:'Yukarı kaydır',sound:'Dinle',mark:'Öğren',next:'Devam',photo:'Fotoğraf',level:'Seviye',words:'Kelimeler'},
 es:{swipe:'Desliza hacia arriba',sound:'Escuchar',mark:'Guardar',next:'Siguiente',photo:'Foto',level:'Nivel',words:'Palabras'},
 fr:{swipe:'Glisse vers le haut',sound:'Écouter',mark:'Retenir',next:'Suivant',photo:'Photo',level:'Niveau',words:'Vocabulaire'},
 ja:{swipe:'上にスワイプ',sound:'聴く',mark:'覚える',next:'次へ',photo:'写真',level:'レベル',words:'単語'},
 ko:{swipe:'위로 밀어 넘기기',sound:'듣기',mark:'기억하기',next:'다음',photo:'사진',level:'레벨',words:'단어'}
};
const word=(k)=>(dict[typeof v27Lang==='string'?v27Lang:'de']||dict.de)[k]||dict.de[k]||k;
function feedPage(){return state&&['studyScroll','lesson'].includes(state.page)}
function cardInfo(card){
 const title=card.querySelector('.v25-caption h2,.wj-world-word-stage h2')?.textContent?.trim()||'';
 const desc=card.querySelector('.v25-caption [data-native-src],.wj-world-word-stage [data-native-src]')?.getAttribute('data-native-src')||
 card.querySelector('.v25-caption p,.wj-world-word-stage p')?.textContent?.trim()||'';
 return {title,desc};
}
function matchPhoto(info){const text=[info.title,info.desc].join(' ').normalize('NFKC');
 return photos.find(x=>x.key.test(text));
}
function decorateCard(card){
 if(card.dataset.lw37==='1')return;
 card.dataset.lw37='1';
 card.classList.add('lw37-card');
 const visual=card.querySelector('.v25-stage,.wj-world-word-stage');
 if(!visual)return;
 visual.classList.add('lw37-visual');
 const caption=visual.querySelector('.v25-caption');if(caption)caption.classList.add('lw37-caption');
 const info=cardInfo(card),photo=matchPhoto(info);
 if(photo){
  // Preserve the original illustration and restore it automatically if external photos fail.
  const frame=document.createElement('div');frame.className='lw37-photo-frame';
  const img=document.createElement('img');
  img.className='lw37-photo';img.loading='lazy';img.decoding='async';
  img.alt=photo.label;img.referrerPolicy='no-referrer';
  img.onerror=()=>{frame.remove();visual.classList.remove('lw37-has-photo')};
  img.onload=()=>{if(img.naturalWidth)visual.classList.add('lw37-has-photo')};
  img.src=window.LWPrivacy.allowed('media')?BASE+photo.id+'?auto=format&fit=crop&w=950&h=600&q=80':'privacy-scene.svg';
  const source=document.createElement('a');source.className='lw37-credit';
  source.href='https://unsplash.com/s/photos/'+encodeURIComponent(photo.label);
  source.target='_blank';source.rel='noopener noreferrer';source.textContent=window.LWPrivacy.allowed('media')?word('photo')+' · Unsplash':'Illustration · Lokaler Modus';
  source.setAttribute('aria-label',photo.label+' – Unsplash');
  frame.append(img,source);visual.insertBefore(frame,visual.firstChild);
 }
 const footer=card.querySelector('.v25-card-foot,.wj-world-word-actions');
 if(footer)footer.classList.add('lw37-footer');
 const buttons=footer?.querySelectorAll('.v25-card-actions button,button');
 if(buttons&&buttons.length>=3){
  buttons[0].classList.add('lw37-sound');
  buttons[1].classList.add('lw37-mark');
  buttons[2].classList.add('lw37-next');
 }
}
function enhance(){
 if(!feedPage())return;
 const main=document.getElementById('main');if(!main)return;
 main.classList.add('lw37-vocab');document.documentElement.dataset.lw37=wjTarget;
 const feed=main.querySelector('#v25-track,#wj-world-feed');if(!feed)return;
 feed.classList.add('lw37-feed');
 const cards=[...feed.querySelectorAll('.v25-word,.wj-world-word')];cards.forEach(decorateCard);
 const header=main.querySelector('.lw35-counter,.lw35-swipe-info');if(header)header.classList.add('lw37-counter');
 const oldTip=main.querySelector('.lw33-swipe-tip');if(oldTip)oldTip.textContent=word('swipe')+' · '+word('words');
 // Unmodified scroll-snap behavior; no reparenting of word cards.
}
function refine(){
 document.documentElement.dataset.lw37=wjTarget;
 const main=document.getElementById('main');if(!main)return;
 if(feedPage())enhance();else main.classList.remove('lw37-vocab');
}
const oldRender=render;
render=function(){const result=oldRender.apply(this,arguments);try{refine()}catch(e){console.warn('LinguaWorld V37:',e)}return result};
window.lw37Refine=refine;
refine();
})();