/* LinguaWorld V48 - real homepage structure + dedicated app-language settings */
(function(){
'use strict';
const LOCALES={
 de:{greet:'Guten Morgen,',hero:'Weiter geht’s!',desc:'Lerne {lang} und entdecke eine faszinierende Kultur.',progress:'Dein Fortschritt',story:'Story',storySub:'Spannende Geschichten erleben',words:'Vokabeln',wordsSub:'Neue Wörter effektiv lernen',media:'Medien',mediaSub:'Videos, Musik & Alltagsdialoge',coach:'Coach',coachSub:'Dein Sprachbegleiter mit KI',settings:'Einstellungen',appLang:'App-Sprache',appHelp:'Sprache der Menüs und Übersetzungen',learnLang:'Lernsprache',learnHelp:'Die Sprache, die du gerade lernst',change:'Ändern',close:'Schließen'},
 en:{greet:'Good morning,',hero:'Keep going!',desc:'Learn {lang} and discover a fascinating culture.',progress:'Your progress',story:'Stories',storySub:'Discover exciting stories',words:'Vocabulary',wordsSub:'Learn useful new words',media:'Media',mediaSub:'Videos, music & conversations',coach:'Coach',coachSub:'Your AI language companion',settings:'Settings',appLang:'App language',appHelp:'Language of menus and translations',learnLang:'Learning language',learnHelp:'The language you are learning',change:'Change',close:'Close'},
 tr:{greet:'Günaydın,',hero:'Devam edelim!',desc:'{lang} öğren ve büyüleyici bir kültür keşfet.',progress:'İlerlemen',story:'Hikâyeler',storySub:'Heyecan verici hikâyeler keşfet',words:'Kelimeler',wordsSub:'Yeni kelimeleri etkili öğren',media:'Medya',mediaSub:'Videolar, müzik ve diyaloglar',coach:'Koç',coachSub:'Yapay zekâ dil arkadaşın',settings:'Ayarlar',appLang:'Uygulama dili',appHelp:'Menü ve çevirilerin dili',learnLang:'Öğrenme dili',learnHelp:'Şu anda öğrendiğin dil',change:'Değiştir',close:'Kapat'},
 ko:{greet:'좋은 아침이에요,',hero:'계속 배워봐요!',desc:'{lang}를 배우고 멋진 문화를 만나보세요.',progress:'학습 진도',story:'스토리',storySub:'재미있는 이야기를 만나보세요',words:'단어',wordsSub:'새로운 단어를 배워요',media:'미디어',mediaSub:'영상과 음악, 일상 대화',coach:'코치',coachSub:'AI 언어 학습 파트너',settings:'설정',appLang:'앱 언어',appHelp:'메뉴와 번역에 사용할 언어',learnLang:'학습 언어',learnHelp:'현재 배우는 언어',change:'변경',close:'닫기'},
 ja:{greet:'おはようございます、',hero:'続きを学ぼう！',desc:'{lang}を学んで新しい文化に触れよう。',progress:'学習進捗',story:'ストーリー',storySub:'楽しい物語を読む',words:'単語',wordsSub:'新しい単語を覚える',media:'メディア',mediaSub:'動画、音楽、会話',coach:'コーチ',coachSub:'AI言語学習パートナー',settings:'設定',appLang:'アプリの言語',appHelp:'メニューと翻訳の言語',learnLang:'学習言語',learnHelp:'現在学んでいる言語',change:'変更',close:'閉じる'},
 es:{greet:'Buenos días,',hero:'¡Sigamos!',desc:'Aprende {lang} y descubre una cultura fascinante.',progress:'Tu progreso',story:'Historias',storySub:'Descubre historias emocionantes',words:'Vocabulario',wordsSub:'Aprende palabras nuevas',media:'Medios',mediaSub:'Vídeos, música y diálogos',coach:'Coach',coachSub:'Tu compañero de idiomas con IA',settings:'Ajustes',appLang:'Idioma de la app',appHelp:'Idioma de menús y traducciones',learnLang:'Idioma de aprendizaje',learnHelp:'Idioma que estás aprendiendo',change:'Cambiar',close:'Cerrar'},
 fr:{greet:'Bonjour,',hero:'On continue !',desc:'Apprends le {lang} et découvre une culture fascinante.',progress:'Ta progression',story:'Histoires',storySub:'Découvre des histoires passionnantes',words:'Vocabulaire',wordsSub:'Apprends de nouveaux mots',media:'Médias',mediaSub:'Vidéos, musique et dialogues',coach:'Coach',coachSub:'Ton compagnon linguistique IA',settings:'Paramètres',appLang:'Langue de l’app',appHelp:'Langue des menus et traductions',learnLang:'Langue étudiée',learnHelp:'La langue que tu apprends',change:'Changer',close:'Fermer'}
};
const LANGUAGES=[['de','🇩🇪','Deutsch'],['tr','🇹🇷','Türkçe'],['en','🇬🇧','English'],['ja','🇯🇵','日本語'],['ko','🇰🇷','한국어'],['es','🇪🇸','Español'],['fr','🇫🇷','Français']];
const WORLDS={ko:['🇰🇷','Koreanisch','Korean','Korece','한국어','韓国語','coreano','coréen'],de:['🇩🇪','Deutsch','German','Almanca','독일어','ドイツ語','alemán','allemand'],en:['🇬🇧','Englisch','English','İngilizce','영어','英語','inglés','anglais']};
const names={de:1,en:2,tr:3,ko:4,ja:5,es:6,fr:7};
function lang(){return typeof v27Lang==='string'&&LOCALES[v27Lang]?v27Lang:'de'}
function t(){return LOCALES[lang()]}
function world(){return typeof wjTarget==='string'&&WORLDS[wjTarget]?wjTarget:'ko'}
function worldName(){let d=WORLDS[world()];return d[names[lang()]||1]}
function esc(v){return String(v).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}
function icon(name){
 const p={gear:'<circle cx="12" cy="12" r="3"/><path d="M19 13.5a7.8 7.8 0 0 0 .03-3l2-1.5-2-3.4-2.35 1a8 8 0 0 0-2.6-1.5L13.6 2h-3.2l-.5 3.1a8 8 0 0 0-2.6 1.5l-2.35-1-2 3.4 2 1.5a7.8 7.8 0 0 0 .03 3L3 15l2 3.4 2.3-1a8 8 0 0 0 2.6 1.5l.5 3.1h3.2l.5-3.1a8 8 0 0 0 2.6-1.5l2.3 1 2-3.4z"/>',book:'<path d="M12 6C9 4 6 4 2.8 4.5v14C6 18 9 18 12 20c3-2 6-2 9.2-1.5v-14C18 4 15 4 12 6zm0 0v14"/>',cards:'<rect x="4" y="6" width="12" height="14" rx="2"/><path d="M9 4h10a2 2 0 0 1 2 2v11"/><circle cx="10" cy="13" r="2"/>',headphones:'<path d="M4 14v-2a8 8 0 0 1 16 0v2"/><rect x="2.5" y="13" width="4" height="8" rx="1.5"/><rect x="17.5" y="13" width="4" height="8" rx="1.5"/>',bot:'<rect x="3.3" y="7" width="17.4" height="14" rx="5"/><path d="M12 7V3m-3 0h6"/><circle cx="9" cy="14" r="1"/><circle cx="15" cy="14" r="1"/><path d="M9 18c2 1 4 1 6 0"/>',arrow:'<path d="m9 5 7 7-7 7"/>',close:'<path d="M5 5l14 14M19 5 5 19"/>'};
 return '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+p[name]+'</svg>';
}
let lastFocus=null;
function closeSettings(){document.querySelector('.lw48-settings-layer')?.remove();document.body.classList.remove('lw48-modal-open');lastFocus?.focus?.()}
function openSettings(){
 closeSettings();lastFocus=document.activeElement;
 const copy=t(),modal=document.createElement('div');modal.className='lw48-settings-layer';modal.setAttribute('role','presentation');
 const current=lang(),w=world();
 modal.innerHTML='<section class="lw48-settings-panel" role="dialog" aria-modal="true" aria-label="'+esc(copy.settings)+'"><div class="lw48-settings-heading"><h2>'+esc(copy.settings)+'</h2><button class="lw48-close" type="button" aria-label="'+esc(copy.close)+'">'+icon('close')+'</button></div>'+
 '<div class="lw48-field"><label for="lw48-app-select">'+esc(copy.appLang)+'</label><p>'+esc(copy.appHelp)+'</p><select id="lw48-app-select">'+LANGUAGES.map(item=>'<option value="'+item[0]+'"'+(item[0]===current?' selected':'')+'>'+item[1]+' '+esc(item[2])+'</option>').join('')+'</select></div>'+
 '<div class="lw48-field"><div class="lw48-setting-row"><div><label>'+esc(copy.learnLang)+'</label><p>'+esc(copy.learnHelp)+'</p><strong>'+WORLDS[w][0]+' '+esc(worldName())+'</strong></div><button class="lw48-change-world" type="button">'+esc(copy.change)+'</button></div></div></section>';
 document.body.append(modal);document.body.classList.add('lw48-modal-open');
 modal.addEventListener('click',e=>{if(e.target===modal)closeSettings()});
 modal.querySelector('.lw48-close').addEventListener('click',closeSettings);
 modal.querySelector('.lw48-change-world').addEventListener('click',()=>{closeSettings();if(typeof window.lw36OpenWorldPicker==='function')window.lw36OpenWorldPicker()});
 modal.querySelector('#lw48-app-select').addEventListener('change',e=>{const code=e.target.value; if(typeof v27SetLanguage==='function'){v27SetLanguage(code)}else{try{localStorage.setItem('v27-language',code)}catch(_){}location.reload()}closeSettings()});
 modal.querySelector('.lw48-close').focus();
}
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&document.querySelector('.lw48-settings-layer'))closeSettings()});
const sections=[['storyMap','book','story','storySub'],['studyScroll','cards','words','wordsSub'],['media','headphones','media','mediaSub'],['wooJin','bot','coach','coachSub']];
function home(){
 const old=document.querySelector('#main .lw30-home');
 if(!old||document.querySelector('#main .lw48-home'))return;
 const copy=t(),xp=Math.max(0,Number(state?.xp)||0),level=Math.floor(xp/100)+1,within=xp%100,pct=within;
 const root=document.createElement('section');root.className='lw48-home';
 const w=world();root.dataset.world=w;
 root.innerHTML='<header class="lw48-header"><div class="lw48-brand" aria-label="LinguaWorld">Lingua<span>World</span></div><div class="lw48-header-actions">'+
 '<button type="button" class="lw48-world-pill" aria-label="'+esc(copy.learnLang)+'"><span>'+WORLDS[w][0]+'</span><strong>'+esc(worldName())+'</strong><span class="lw48-caret">⌄</span></button>'+
 '<button type="button" class="lw48-settings-btn" aria-label="'+esc(copy.settings)+'" title="'+esc(copy.settings)+'">'+icon('gear')+'</button></div></header>'+
 '<div class="lw48-hero" role="group" aria-label="'+esc(copy.greet+' '+copy.hero)+'"><div class="lw48-hero-text"><p class="lw48-greeting">'+esc(copy.greet)+'</p><h1>'+esc(copy.hero)+'</h1><p class="lw48-description">'+esc(copy.desc.replace('{lang}',worldName()))+'</p></div></div>'+
 '<section class="lw48-progress" aria-label="'+esc(copy.progress)+'"><div class="lw48-progress-heading"><strong>'+esc(copy.progress)+'</strong><span>Lv. '+level+'</span></div><div class="lw48-progress-bottom"><div class="lw48-track" role="progressbar" aria-label="'+esc(copy.progress)+'" aria-valuenow="'+within+'" aria-valuemin="0" aria-valuemax="100"><span style="width:'+pct+'%"></span></div><span class="lw48-xp">'+within+' / 100 XP</span></div></section>'+
 '<div class="lw48-feature-grid">'+sections.map(([route,ic,title,description])=>'<button type="button" class="lw48-feature lw48-feature-'+ic+'" data-go="'+route+'"><span class="lw48-feature-art">'+icon(ic)+'</span><strong>'+esc(copy[title])+'</strong><span class="lw48-feature-sub">'+esc(copy[description])+'</span><span class="lw48-feature-arrow">'+icon('arrow')+'</span></button>').join('')+'</div>';
 old.replaceWith(root);
 document.querySelector('#main .lw34-topbar')?.remove();
 root.querySelector('.lw48-world-pill').addEventListener('click',()=>{if(typeof window.lw36OpenWorldPicker==='function')window.lw36OpenWorldPicker()});
 root.querySelector('.lw48-settings-btn').addEventListener('click',openSettings);
 root.querySelectorAll('[data-go]').forEach(b=>b.addEventListener('click',()=>{if(typeof go==='function')go(b.dataset.go)}));
}
function otherHeader(){
 const bar=document.querySelector('#main .lw34-topbar');
 if(!bar)return;
 bar.querySelectorAll('.lw43-app-language,.lw38-picker-header').forEach(n=>n.remove());
 const actions=bar.querySelector('.lw34-top-actions');if(!actions)return;
 if(!actions.querySelector('.lw48-other-settings')){const b=document.createElement('button');b.type='button';b.className='lw48-other-settings';b.innerHTML=icon('gear');b.setAttribute('aria-label',t().settings);b.title=t().settings;b.addEventListener('click',openSettings);actions.append(b)}
}
function styleNavigation(){
 const nav=document.getElementById('bottomNav');
 if(!nav)return;
 nav.querySelectorAll('button').forEach(btn=>{
  const active=btn.classList.contains('active')||btn.getAttribute('aria-current')==='page';
  btn.style.setProperty('background',active?'#e5f3ec':'transparent','important');
  btn.style.setProperty('color',active?'#278267':'#8996a6','important');
  btn.style.setProperty('border','0','important');
  btn.style.setProperty('box-shadow','none','important');
  btn.querySelectorAll('span,svg').forEach(el=>el.style.setProperty('color','inherit','important'));
 });
}
function update(){
 try{
  document.documentElement.dataset.lw48='on';
  document.querySelectorAll('#main .lw43-app-language,#main .lw38-picker-header').forEach(n=>n.remove());
  if(typeof state!=='undefined'&&state.page==='home'){home()}else{otherHeader()}
  styleNavigation()
 }catch(e){console.warn('LinguaWorld home V48',e)}
}
const prior=render;
render=function(){const result=prior.apply(this,arguments);update();return result};
window.lw48OpenSettings=openSettings;
update();
})();