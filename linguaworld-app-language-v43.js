/* V43: discoverable independent app-language selector, preserves learning-world choice. */
(function(){
'use strict';
const languages=[
 {key:'de',flag:'🇩🇪',name:'Deutsch'},{key:'tr',flag:'🇹🇷',name:'Türkçe'},
 {key:'en',flag:'🇬🇧',name:'English'},{key:'ja',flag:'🇯🇵',name:'日本語'},
 {key:'ko',flag:'🇰🇷',name:'한국어'},{key:'es',flag:'🇪🇸',name:'Español'},
 {key:'fr',flag:'🇫🇷',name:'Français'}
];
const titles={de:'App-Sprache',tr:'Uygulama dili',en:'App language',ja:'アプリ言語',ko:'앱 언어',es:'Idioma de la app',fr:'Langue de l’app'};
function current(){return languages.some(x=>x.key===v27Lang)?v27Lang:'de'}
function caption(){return titles[current()]||titles.de}
function ensureToolbar(){
 const actions=document.querySelector('#main .lw34-topbar .lw34-top-actions');
 if(!actions)return;
 let node=actions.querySelector('.lw43-app-language');
 if(!node){
  node=document.createElement('label');node.className='lw43-app-language';
  const icon=document.createElement('span');icon.className='lw43-icon';icon.textContent='🌐';icon.setAttribute('aria-hidden','true');
  const txt=document.createElement('span');txt.className='lw43-label';
  const arrow=document.createElement('span');arrow.className='lw43-chevron';arrow.textContent='⌄';arrow.setAttribute('aria-hidden','true');
  const select=document.createElement('select');select.className='lw43-select';select.setAttribute('aria-label',caption());
  languages.forEach(l=>{const option=document.createElement('option');option.value=l.key;option.textContent=l.flag+' '+l.name;select.append(option)});
  select.addEventListener('change',()=>{
   const next=select.value;
   if(typeof v27SetLanguage==='function')v27SetLanguage(next);
   refresh();
  });
  node.append(icon,txt,arrow,select);
  const original=actions.querySelector('.lw38-picker-header');
  if(original)original.insertAdjacentElement('afterend',node);else actions.prepend(node);
 }
 const txt=node.querySelector('.lw43-label'),select=node.querySelector('select'),selected=languages.find(x=>x.key===current())||languages[0];
 txt.textContent=selected.name;
 select.value=current();select.setAttribute('aria-label',caption());
 node.setAttribute('title',caption()+' – '+selected.name);
}
function welcome(){
 const root=document.querySelector('.lw36-welcome .lw36-entry');
 if(!root)return;
 const picker=root.querySelector('.lw38-welcome-language');
 if(picker)picker.classList.add('lw43-welcome-language');
 const title=root.querySelector('.lw38-picker-title');
 if(title)title.textContent='🌐 '+caption();
 // Other flags are target-language choices. This sentence distinguishes them.
 const group=root.querySelector('.lw36-flags');
 if(group)group.setAttribute('aria-label',({de:'Lernsprache auswählen',tr:'Öğrenilecek dili seç',en:'Select a learning language',ja:'学習する言語を選択',ko:'배울 언어 선택',es:'Elige el idioma que aprenderás',fr:'Choisis la langue à apprendre'})[current()]);
}
function refresh(){
 try{document.documentElement.dataset.lw43=current();ensureToolbar();welcome()}catch(e){console.warn('App language V43:',e)}
}
const previous=render;
render=function(){const r=previous.apply(this,arguments);refresh();return r};
window.lw43RefreshLanguage=refresh;
refresh();
})();
