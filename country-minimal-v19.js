/* V19 Minimal Länderwelten: ein Modus, eine Farbwelt, Sprachwechsel nur auf Start. */
(function(){
'use strict';
const MODES={
 ko:{flag:'🇰🇷',name:'Koreanisch',land:'Korea',greeting:'Annyeong!',guide:'Woo Jin',avatar:'assets/v18-avatar-woo-jin.svg',scene:'assets/v18-scene-ko.svg',description:'Entdecke Korea und lerne in deinem Tempo.'},
 de:{flag:'🇩🇪',name:'Deutsch',land:'Deutschland',greeting:'Hallo!',guide:'Lukas',avatar:'assets/v18-avatar-lukas.svg',scene:'assets/v18-scene-de.svg',description:'Entdecke Deutschland und lerne in deinem Tempo.'},
 en:{flag:'🇬🇧',name:'English',land:'United Kingdom',greeting:'Hello!',guide:'Alex',avatar:'assets/v18-avatar-alex.svg',scene:'assets/v18-scene-en.svg',description:'Explore Britain and learn at your own pace.'}
};
const nativeLanguages=['de','en','tr','ja','ko','es','fr'];
function ui(de,en){if(typeof window.wjNativeUI==='function')return window.wjNativeUI(de,en);return v27Lang==='en'?en:de}
function mode(){return MODES[wjTarget]||MODES.ko}
function syncMode(){
 const safe=MODES[wjTarget]?wjTarget:'ko';
 const locale=nativeLanguages.includes(v27Lang)?v27Lang:'de';
 if(v27Lang!==locale)v27Lang=locale;
 try{localStorage.setItem('wj-learning-language',safe)}catch(e){}
 document.documentElement.dataset.learningMode=safe;
 document.documentElement.lang=locale;
 document.documentElement.setAttribute('translate','no');
 const tint={ko:'#21192f',de:'#2b261b',en:'#172b47'}[safe];
 const metaTheme=document.querySelector('meta[name="theme-color"]');if(metaTheme)metaTheme.content=tint;
}
syncMode();
const oldSwitch=wjSwitchTarget;
wjSwitchTarget=function(lang){
 if(state.page!=='home'||!MODES[lang])return;
 if(lang===wjTarget){syncMode();return;}
 oldSwitch(lang);
 syncMode();
};
v27SetLanguage=function(lang){
 /* The learner's native language is independent from their chosen study language. */
 if(!nativeLanguages.includes(lang))return;
 v27Lang=lang;
 try{localStorage.setItem('v27-language',lang)}catch(e){}
 document.documentElement.lang=lang;
 document.documentElement.setAttribute('translate','no');
 render();
};
const englishTitles={
 'Begrüßung':'Greetings','Im Café':'At the café','Am Flughafen':'At the airport','Unterwegs':'Getting around',
 'Einkaufen':'Shopping','Neue Freunde':'New friends','Im Restaurant':'At the restaurant','Im Hotel':'At the hotel',
 'Pläne machen':'Making plans','Gesundheit':'Health','In der Schule':'At school','Freizeit':'Free time',
 'Neues Zuhause':'A new home','Bei der Arbeit':'At work','Ein Missverständnis':'A misunderstanding',
 'Erlebnisse':'Experiences','Meinung sagen':'Expressing opinions','Kultur erleben':'Exploring culture',
 'Im Team':'Teamwork','Verhandeln':'Negotiating','Streit lösen':'Resolving conflict',
 'Eine Präsentation':'Giving a presentation','Gesellschaft':'Society','Geschichten':'Stories',
 'Politik und Gesellschaft':'Politics and society','Wissenschaft':'Science','Kulturgeschichte':'Cultural history',
 'Beruf und Führung':'Work and leadership','Medienkritik':'Media criticism','Tiefes Gespräch':'Deep conversation',
 'Diplomatie':'Diplomacy','Feiner Humor':'Subtle humour','Philosophie':'Philosophy',
 'Komplexe Verhandlung':'Complex negotiations','Literatur und Stil':'Literature and style',
 'Freies Argumentieren':'Open discussion'
};
if(window.wjLanguageWorlds&&Array.isArray(window.wjLanguageWorlds.en)){
 window.wjLanguageWorlds.en.forEach(level=>level.chapters.forEach(ch=>{if(englishTitles[ch.title])ch.title=englishTitles[ch.title]}));
}
wjWorldSupport=function(word){
 if(!word)return '';
 if(wjTarget==='de')return String(word.en||word.de||word.term||'');
 if(wjTarget==='en')return String(word.de||word.en||word.term||'');
 return String(word.de||word.en||word.term||'');
};
wjWorldChooser=function(){return ''};
wjWorldMenu=function(){return ''};
wjWorldToggleMenu=function(){};
function flags(){
 return '<div class="v19-flag-picker" role="group" aria-label="'+ui('Lernsprache wählen','Choose learning language')+'">'+
 Object.entries(MODES).map(([lang,m])=>
 '<button type="button" class="v19-flag '+(wjTarget===lang?'selected':'')+'" onclick="wjSwitchTarget(\''+lang+'\')" aria-pressed="'+(wjTarget===lang)+'" aria-label="'+(lang==='ko'?'Koreanisch':lang==='de'?'Deutsch':'Englisch')+'">'+m.flag+'</button>').join('')+'</div>';
}
function stats(){
 if(wjTarget==='ko'){
  const lesson=selected(),words=lesson?.words||[],knownWords=known(),count=words.filter((_,i)=>knownWords[lesson.id+':'+i]).length;
  return [[Object.values(knownWords).filter(Boolean).length,ui('Wörter gelernt','Words learned')],[count+'/'+words.length,ui('Aktuelle Lektion','Current lesson')],[streak(),ui('Tage in Folge','Day streak')]];
 }
 const finished=Object.keys(wjWorldProgress).filter(k=>k.startsWith(wjTarget+':')&&wjWorldProgress[k]).length;
 return [[finished,ui('Lernschritte','Study steps')],[wjWorldLevel,ui('Sprachniveau','Study level')],[wjWorldData().length*6,ui('Kapitel','Chapters')]];
}
function homeMinimal(){
 const m=mode(),numbers=stats();
 const cards=[
  ['🗺️',ui('Story','Stories'),ui('Länderkarte & Kapitel','Country map & chapters'),'storyMap'],
  ['📚',ui('Vokabeln','Vocabulary'),ui('Bilder & Aussprache','Images & pronunciation'),'studyScroll'],
  ['✦',ui('Sprachcoach','Language coach'),m.guide,'wooJin']
 ];
 return '<section class="v18-shell v19-home" data-lang="'+wjTarget+'">'+
  '<header class="v19-welcome"><div><span class="v18-kicker">LINGUAWORLD · LANGUAGE STUDIO</span><h1>'+ui('Deine Lernwelt','Your learning world')+'</h1><p>'+ui('Ich möchte lernen','I want to learn')+'</p></div>'+flags()+'</header>'+(typeof window.wjNativePicker==='function'?window.wjNativePicker():'')+
  '<section class="v19-hero"><img class="v19-scene" src="'+m.scene+'" alt="'+ui('Pixelart-Landschaft','Pixel-art landscape')+' '+m.land+'">'+
   '<div class="v19-shade"></div><div class="v19-hero-body"><span class="v19-country">'+m.flag+' '+m.land+'</span>'+
   '<h2>'+m.greeting+'</h2><p>'+(typeof window.wjNativeDescription==='function'?window.wjNativeDescription(wjTarget):m.description)+'</p>'+
   '<button class="v18-btn" type="button" onclick="go(\'storyMap\')">'+ui('Jetzt entdecken','Explore now')+' <span>↗</span></button></div>'+
   '<img class="v19-hero-avatar" src="'+m.avatar+'" alt="'+m.guide+' Pixelart-Avatar"></section>'+
  '<div class="v19-guide-note"><span class="v19-guide-dot">✦</span><span><strong>'+m.guide+'</strong> · '+ui('Dein Sprachbegleiter','Your language companion')+'</span></div>'+
  '<div class="v19-action-grid">'+cards.map(c=>'<button type="button" class="v19-action" onclick="go(\''+c[3]+'\')"><span class="v19-action-icon">'+c[0]+'</span><span><strong>'+c[1]+'</strong><small>'+c[2]+'</small></span><span aria-hidden="true" class="v19-chevron">↗</span></button>').join('')+'</div>'+
  '<div class="v19-progress">'+numbers.map(n=>'<div><strong>'+n[0]+'</strong><small>'+n[1]+'</small></div>').join('')+'</div>'+
 '</section>';
}
home=homeMinimal;
wjWorldHeader=homeMinimal;
const oldNav=nav;
nav=function(){
 const m=mode();
 const labels=[
  ['home','⌂',ui('Start','Home')],['storyMap','◇',ui('Story','Stories')],
  ['studyScroll','▤',ui('Vokabeln','Vocabulary')],['media','▶',ui('Medien','Media')],
  ['wooJin','✦',m.guide]
 ];
 const side=document.getElementById('sideNav'),bottom=document.getElementById('bottomNav');
 if(side)side.innerHTML='<div class="v19-side-brand">LINGUAWORLD<small>'+m.flag+' '+m.name+'</small></div>'+
   labels.map(([page,symbol,name])=>'<button type="button" class="nav '+(state.page===page?'active':'')+'" onclick="go(\''+page+'\')"><span class="v22-navico">'+symbol+'</span> '+name+'</button>').join('')+
   '<p class="v19-side-hint">'+ui('Sprache ändern: Startseite','Change language: Home')+'</p>';
 if(bottom)bottom.innerHTML=labels.map(([page,symbol,name])=>'<button type="button" class="'+(state.page===page||(page==='studyScroll'&&state.page==='lesson')?'current':'')+'" onclick="go(\''+page+'\')"><span>'+symbol+'</span>'+name+'</button>').join('');
};
socialTop=function(){
 const m=mode(),head=document.getElementById('socialHeader'),storyModes=document.getElementById('storyModes');
 if(head)head.innerHTML='<div class="v22-topbar v19-topbar"><button class="v19-top-logo" type="button" onclick="go(\'home\')" aria-label="'+ui('Zur Startseite','Go to Home')+'">LinguaWorld <span>✦</span></button>'+
  '<div class="v19-top-actions"><span class="v19-current-mode">'+m.flag+' '+m.name+'</span>'+
  '<button type="button" class="v36-progress-trigger" onclick="v36OpenProgress()" aria-label="'+ui('Lernfortschritt anzeigen','Show learning progress')+'"><img src="'+m.avatar+'" alt=""><span class="v36-online-dot"></span></button></div></div>';
 if(storyModes)storyModes.innerHTML='';
};
function translateEnglishInterface(){
 if(v27Lang!=='en')return;
 const main=document.getElementById('main');if(!main)return;
 const texts={
  'Deine Großbritannien-Karte.':'Your United Kingdom map.',
  'Tippe auf Orte, entdecke Geschichten und schalte neue Kapitel frei.':'Tap a place, discover stories and unlock new chapters.',
  '← Startseite':'← Home','← Landkarte':'← Map','← Korea-Karte':'← Korea map',
  'DEINE STATIONEN':'YOUR STOPS',
  'Alle sechs Kapitel eines Niveaus führen dich durch Geschichten, Vokabeln und einen Abschlusstest.':'Each level has six story chapters, vocabulary and a final quiz.',
  'Entdecke die Kultur':'Discover the culture',
  'Dein Sprachbegleiter':'Your language companion',
  'Story-Modus':'Story mode',
  'Vokabeln':'Vocabulary','Hören':'Listen','Merken':'Save','Gelernt':'Learned',
  'Weiter ↓':'Next ↓','Zurück':'Back','Weiter →':'Next →',
  'Bitte lade die Lernwelt erneut.':'Please reload the learning world.',
  'DEINE NÄCHSTE REISE':'YOUR NEXT JOURNEY',
  'Wähle die richtige Bedeutung.':'Choose the correct meaning.',
  'Höre die Aussprache und sprich nach.':'Listen and repeat.',
  'Schreibe den Ausdruck aus dem Gedächtnis.':'Write the expression from memory.',
  'Letzte Aufgabe – ohne Hilfen.':'Final task – no hints.',
  'Entdecke einen neuen Ausdruck.':'Discover a new expression.',
  'Nächster Satz':'Next sentence','Teste mich':'Quiz me','Begrüßung':'Greetings',
  'Schreibt •••':'Typing •••'
 };
 const elements=main.querySelectorAll('.v18-map-page .v18-sub,.v18-map-page .v18-map-head .v18-btn,.v18-chapters>p,.v18-chapters .v18-kicker,.v18-scene-strip>span,.wj-world-return,.wj-world-mission-scene>p,.wj-world-suggestions button,.wj-world-msg p,.wj-world-next,.wj-world-vocab-head>p,.wj-world-vocab-head>small,.wj-world-note');
 for(const el of elements){if(el.closest('.wj-target-term,.wj-target-gloss,.wj-world-msg.user'))continue;
  const source=el.textContent.trim(),localized=texts[source];
  if(localized)el.textContent=localized;
  if(el.matches('.v18-scene-strip>span'))el.textContent=el.textContent.replace('Entdecke die Kultur','Discover the culture').replace('Story in ','Story in ');
 }
 const mapTitle=main.querySelector('.v18-map-page .v18-title');if(mapTitle)mapTitle.innerHTML='Your United Kingdom map<span style="color:var(--v18-accent)">.</span>';
}

/* Restrict translations to interface labels: never rewrite studied words, their meanings, messages, or quiz answer options. */
function localizeEnglishLabels(){
 if(v27Lang!=='en')return;
 const root=document.getElementById('main');if(!root||typeof NodeFilter==='undefined')return;
 const dict={
  'Vokabeln':'Vocabulary','Vokabeln.':'Vocabulary.','ENGLISCH':'ENGLISH',
  'Nach oben wischen. Hören. Merken.':'Swipe up. Listen. Learn.',
  '♫ Hören':'♫ Listen','♫ Hören.':'♫ Listen.','○ Merken':'○ Save','✓ Gelernt':'✓ Learned',
  'Weiter ↓':'Next ↓','Weiter →':'Continue →','Kapitel abgeschlossen ✓':'Chapter complete ✓',
  'Ⅱ Auto an':'Ⅱ Auto on','▶ Auto aus':'▶ Auto off',
  'Automatisch weiterblättern. Sprachausgabe durch Tippen aktivieren.':'Cards advance automatically. Tap to enable audio.',
  'Bedeutung verborgen':'Meaning hidden','◇ Tipp':'◇ Hint','Prüfen':'Check','Antwort schreiben …':'Type your answer …',
  '✓ Richtig!':'✓ Correct!','Noch nicht – versuche es erneut.':'Not quite – try again.',
  'Schreibe den Ausdruck aus dem Gedächtnis.':'Write the expression from memory.',
  'Was bedeutet dieser Satz?':'What does this sentence mean?',
  'Senden ↗':'Send ↗','Nachricht an Alex …':'Message Alex …',
  'Teste mich':'Quiz me','Begrüßung':'Greetings','Nächster Satz':'Next sentence',
  'Mit Alex üben.':'Practice with Alex.','Mit Alex üben':'Practice with Alex',
  'Kurze Lern-Dialoge und Vokabeltraining in Englisch. Ohne bezahlte KI.':'Short conversations and vocabulary practice in English. No paid AI needed.',
  'Offline-Übungen aktiv · freie KI-Gespräche benötigen ein optionales Sprachmodell.':'Offline practice available · free-form AI chat needs an optional language model.',
  'KI-Gespräch aktiviert · dein persönlicher Sprachbegleiter.':'AI chat active · your personal language coach.',
  'Antwort schreiben …':'Type your answer …',
  'Level bestanden':'Level passed','Dein Level-Quiz wartet!':'Your level quiz is ready!',
  'Finaler Level-Test':'Final level quiz','Quiz starten →':'Start quiz →',
  'Wiederholen ↗':'Review ↗','Erneut versuchen ↻':'Try again ↻',
  'Zur Story-Karte':'Back to the story map','Zur Story-Karte →':'Back to the story map →',
  '← Story-Karte':'← Story map','← Zur Story':'← Back to story',
  'Story-Level-Test':'Story level quiz','Level geschafft!':'Level completed!','Weiter üben!':'Keep practising!',
  'Nächstes Level freigeschaltet.':'Next level unlocked.',
  'Du brauchst mindestens 4 richtige Antworten.':'You need at least four correct answers.',
  'Welche Bedeutung passt zu diesem Ausdruck?':'Which meaning matches this expression?',
  'Ergebnis ansehen':'View results','Nächste Frage →':'Next question →',
  'Vertikal wischen und echte Lernvideos ansehen.':'Swipe vertically to watch real learning videos.',
  'Weitere Videos suchen ↗':'Find more videos ↗',
  'Nächstes ↓':'Next ↓','Untertitel über CC aktivieren.':'Turn on subtitles with CC.',
  'Autoplay mit Ton ist auf dem iPhone oft blockiert. Untertitel sind nicht für jedes Video verfügbar.':'Autoplay with sound may be blocked on iPhone. Subtitles are not available for every video.',
  '✦ Echte KI starten':'✦ Start AI chat','Modell lädt …':'Loading model …',
  '✦ Freier KI-Chat · auf diesem Gerät':'✦ AI chat · on this device',
  '✦ Freier KI-Chat · Servermodell':'✦ AI chat · server model',
  'Offline-Lerncoach · echte KI optional':'Offline learning coach · optional AI model',
  'Ein richtiges Sprachmodell kann frei antworten und den Gesprächsverlauf berücksichtigen. Lokal nur auf Geräten mit WebGPU. Der erste Download kann mehrere hundert MB groß sein.':'A language model can respond freely and follow your conversation. Local AI requires WebGPU and may need a large download.',
  'Aktiv':'Active','Schreibt •••':'Typing •••','SPRACHCOACH':'LANGUAGE COACH',
  'Lernsprache auswählen':'Choose learning language'
 };
 const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
 const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
 for(const node of nodes){
  const parent=node.parentElement;if(!parent)continue;
  if(parent.closest('.wj-target-term,.wj-target-gloss,.wj-world-word-stage h2,.wj-world-msg,.wj-message,.v36-quiz-options,.v36-quiz-summary,.v36-quiz-sheet h1,.wj-world-video-body strong,[data-study-term]'))continue;
  const raw=node.nodeValue,text=raw.trim();if(!text)continue;
  let translated=dict[text];
  if(!translated&&/^\d+ Ausdrücke$/.test(text))translated=text.replace('Ausdrücke','expressions');
  if(!translated&&/^\d+ \/ 6 abgeschlossen$/.test(text))translated=text.replace('abgeschlossen','complete');
  if(!translated&&/^\d+ von 5 richtig/.test(text))translated=text.replace('von 5 richtig','of 5 correct').replace('Nächstes Level freigeschaltet.','Next level unlocked.').replace('Du brauchst mindestens 4 richtige Antworten.','You need at least four correct answers.');
  if(!translated&&text.includes(' · LEVEL-ABSCHLUSS'))translated=text.replace('LEVEL-ABSCHLUSS','LEVEL QUIZ');
  if(!translated&&/^FRAGE \d+/.test(text))translated=text.replace('FRAGE','QUESTION');
  if(!translated&&text.startsWith('Richtige Antwort: '))translated=text.replace('Richtige Antwort: ','Correct answer: ');
  if(!translated&&text.startsWith('Sprich den Satz laut nach!'))translated=text.replace('Sprich den Satz laut nach!','Say the sentence aloud!');
  if(translated)node.nodeValue=raw.replace(text,translated);
 }
 for(const input of root.querySelectorAll('input[placeholder]')){
  if(input.closest('.wj-world-coach,.wj-world-mission')&&dict[input.placeholder])input.placeholder=dict[input.placeholder];
 }
}

const baseRender=render;
render=function(){
 syncMode();
 const result=baseRender.apply(this,arguments);
 translateEnglishInterface();
 localizeEnglishLabels();
 return result;
};
document.getElementById('v26-welcome')?.remove();
try{sessionStorage.setItem('v26-welcome','1')}catch(e){}
render();
})();