/* LinguaWorld V38 – restore independent seven-language app UI picker.
   Keeps learning-world flags independent of interface language.
   Uses existing v27SetLanguage() and preserves stored preference.
*/
(function(){
'use strict';
const locales=[
  ['de','🇩🇪','Deutsch'],['tr','🇹🇷','Türkçe'],['en','🇬🇧','English'],
  ['ja','🇯🇵','日本語'],['ko','🇰🇷','한국어'],['es','🇪🇸','Español'],['fr','🇫🇷','Français']
];
const texts={
 de:{label:'App-Sprache',hint:'Sprache der Menüs und Übersetzungen',welcome:'Willkommen bei LinguaWorld',choose:'Welche Sprache möchtest du lernen?',sub:'Wähle deine Lernwelt',pick:'Lernsprache auswählen'},
 tr:{label:'Uygulama dili',hint:'Menülerin ve çevirilerin dili',welcome:'LinguaWorld’a hoş geldin',choose:'Hangi dili öğrenmek istersin?',sub:'Öğrenme dünyanı seç',pick:'Öğrenilecek dili seç'},
 en:{label:'App language',hint:'Language for menus and translations',welcome:'Welcome to LinguaWorld',choose:'Which language would you like to learn?',sub:'Choose your learning world',pick:'Choose a learning language'},
 ja:{label:'アプリの言語',hint:'メニューと翻訳の言語',welcome:'LinguaWorldへようこそ',choose:'どの言語を学びたいですか？',sub:'学ぶ世界を選びましょう',pick:'学習する言語を選択'},
 ko:{label:'앱 언어',hint:'메뉴와 번역 언어',welcome:'LinguaWorld에 오신 것을 환영합니다',choose:'어떤 언어를 배우고 싶나요?',sub:'학습 세계를 선택하세요',pick:'학습할 언어 선택'},
 es:{label:'Idioma de la app',hint:'Idioma de menús y traducciones',welcome:'Bienvenido a LinguaWorld',choose:'¿Qué idioma quieres aprender?',sub:'Elige tu mundo de aprendizaje',pick:'Elegir idioma de aprendizaje'},
 fr:{label:"Langue de l’app",hint:'Langue des menus et traductions',welcome:'Bienvenue sur LinguaWorld',choose:'Quelle langue veux-tu apprendre ?',sub:'Choisis ton univers',pick:'Choisir une langue à apprendre'}
};
function current(){return locales.some(x=>x[0]===v27Lang)?v27Lang:'de'}
function tr(){return texts[current()]||texts.de}
function control(context){
 const box=document.createElement('label');box.className='lw38-picker lw38-picker-'+context;
 const id='lw38-'+context;
 box.setAttribute('for',id);
 const title=document.createElement('span');title.className='lw38-picker-title';title.textContent='🌐 '+tr().label;box.append(title);
 const select=document.createElement('select');select.id=id;select.className='lw38-select';select.setAttribute('aria-label',tr().label);
 locales.forEach(([key,flag,name])=>{const option=document.createElement('option');option.value=key;option.textContent=flag+' '+name;option.selected=key===current();select.append(option)});
 select.addEventListener('change',()=>{
  const value=select.value;
  if(typeof v27SetLanguage==='function')v27SetLanguage(value);
  update();
  // The welcome overlay is not part of render(), so update its copy without closing it.
  const welcome=document.querySelector('.lw36-welcome');
  if(welcome){const t=tr();const h=welcome.querySelector('.lw36-entry h1'),p=welcome.querySelector('.lw36-entry p'),ey=welcome.querySelector('.lw36-eyebrow');
   if(h)h.textContent=t.welcome;if(p)p.textContent=t.choose;if(ey)ey.textContent=t.sub;
   welcome.setAttribute('aria-label',t.welcome);
   welcome.querySelector('.lw36-flags')?.setAttribute('aria-label',t.pick);
  }
 });
 box.append(select);return box;
}
function showWelcomePicker(){
 const root=document.querySelector('.lw36-welcome .lw36-entry');if(!root)return;
 let existing=root.querySelector('.lw38-welcome-language');
 if(!existing){existing=document.createElement('div');existing.className='lw38-welcome-language';
  const para=root.querySelector('p');if(para)para.after(existing);else root.prepend(existing);
 }
 if(!existing.querySelector('select'))existing.append(control('welcome'));
}
function showHeaderPicker(){
 const bar=document.querySelector('#main .lw34-topbar');if(!bar)return;
 const actions=bar.querySelector('.lw34-top-actions');if(!actions)return;
 let picker=actions.querySelector('.lw38-picker-header');
 if(!picker){picker=control('header');actions.insertBefore(picker,actions.firstChild)}
}
function update(){
 try{
  document.documentElement.dataset.lw38=current();
  showWelcomePicker();
  showHeaderPicker();
  document.querySelectorAll('.lw38-picker').forEach(box=>{
   const name=box.querySelector('.lw38-picker-title');if(name)name.textContent='🌐 '+tr().label;
   const select=box.querySelector('select');
   if(select){select.value=current();select.setAttribute('aria-label',tr().label)}
  });
 }catch(e){console.warn('LinguaWorld language selection:',e)}
}
const original=render;
render=function(){const value=original.apply(this,arguments);update();return value};
window.lw38AppLanguage=update;
update();
})();