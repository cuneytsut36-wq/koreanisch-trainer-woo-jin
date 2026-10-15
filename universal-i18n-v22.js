/* V22 Universal localisation: independently translate the whole learning interface.
   Protect the target language, native meaning, quiz answers and user/AI conversations. */
(function(){
 'use strict';
 const SUPPORTED=['de','en','tr','ja','ko','es','fr'];
 const DATA=window.wjUiV22||{};
 const ADDITIONAL={
 'SWIPE LEARNING':{en:'SWIPE LEARNING',tr:'KAYDIRARAK ÖĞREN',ja:'スワイプ学習',ko:'스와이프 학습',es:'APRENDER DESLIZANDO',fr:'APPRENTISSAGE PAR BALAYAGE'},
 'VIDEO LEARNING':{en:'VIDEO LEARNING',tr:'VİDEO İLE ÖĞREN',ja:'動画学習',ko:'영상 학습',es:'APRENDIZAJE CON VÍDEOS',fr:'APPRENTISSAGE EN VIDÉO'},
 'SPRACHCOACH':{en:'LANGUAGE COACH',tr:'DİL EĞİTMENİ',ja:'語学コーチ',ko:'언어 코치',es:'TUTOR DE IDIOMAS',fr:'COACH LINGUISTIQUE'},
 'DEINE REISE':{en:'YOUR JOURNEY',tr:'SENİN YOLCULUĞUN',ja:'あなたの旅',ko:'나의 여행',es:'TU VIAJE',fr:'TON VOYAGE'},
 'Deine Reise':{en:'Your journey',tr:'Senin yolculuğun',ja:'あなたの旅',ko:'나의 여행',es:'Tu viaje',fr:'Ton voyage'},
 'Lerninhalte nicht geladen. Bitte Seite neu laden.':{en:'Lessons could not load. Please reload the page.',tr:'Dersler yüklenemedi. Lütfen sayfayı yenile.',ja:'レッスンを読み込めません。ページを再読み込みしてください。',ko:'학습 내용을 불러오지 못했습니다. 새로고침하세요.',es:'No se pudieron cargar las lecciones. Recarga la página.',fr:'Impossible de charger les leçons. Actualise la page.'},
 'LEVEL-ABSCHLUSS':{en:'LEVEL QUIZ',tr:'SEVİYE TESTİ',ja:'レベルテスト',ko:'레벨 테스트',es:'PRUEBA DE NIVEL',fr:'TEST DE NIVEAU'},
 'LEVEL-TEST':{en:'LEVEL TEST',tr:'SEVİYE TESTİ',ja:'レベルテスト',ko:'레벨 테스트',es:'PRUEBA DE NIVEL',fr:'TEST DE NIVEAU'},
 'FRAGE':{en:'QUESTION',tr:'SORU',ja:'問題',ko:'문제',es:'PREGUNTA',fr:'QUESTION'},
 'Ausdrücke':{en:'expressions',tr:'ifade',ja:'表現',ko:'표현',es:'expresiones',fr:'expressions'},
 'Vokabeln als illustrierte Lernkarten':{en:'Illustrated vocabulary cards',tr:'Resimli kelime kartları',ja:'イラスト付き単語カード',ko:'그림 어휘 카드',es:'Tarjetas ilustradas',fr:'Cartes de vocabulaire illustrées'},
 'Bildliche Vokabeln':{en:'Illustrated vocabulary',tr:'Görselli kelimeler',ja:'イラスト付き単語',ko:'그림 어휘',es:'Vocabulario ilustrado',fr:'Vocabulaire illustré'},
 'Hören · Merken · Automatisch weiterlernen':{en:'Listen · Save · Learn automatically',tr:'Dinle · Kaydet · Otomatik öğren',ja:'聞く・覚える・自動学習',ko:'듣기 · 외우기 · 자동 학습',es:'Escuchar · Guardar · Aprender automáticamente',fr:'Écouter · Mémoriser · Apprendre automatiquement'},
 'Aussprache':{en:'Pronunciation',tr:'Telaffuz',ja:'発音',ko:'발음',es:'Pronunciación',fr:'Prononciation'},
 'Richtige Antwort':{en:'Correct answer',tr:'Doğru cevap',ja:'正解',ko:'정답',es:'Respuesta correcta',fr:'Bonne réponse'},
 'Ein Lernweg.':{en:'One learning journey.',tr:'Tek öğrenme yolu.',ja:'一つの学習の旅。',ko:'하나의 학습 여정.',es:'Un camino de aprendizaje.',fr:'Un parcours d’apprentissage.'},
 'Untertitel':{en:'Subtitles',tr:'Altyazılar',ja:'字幕',ko:'자막',es:'Subtítulos',fr:'Sous-titres'},
 'Sprache wählen':{en:'Choose language',tr:'Dil seç',ja:'言語を選ぶ',ko:'언어 선택',es:'Elegir idioma',fr:'Choisir la langue'},
 'Langsam sprechen':{en:'Speak slowly',tr:'Yavaş konuş',ja:'ゆっくり話す',ko:'천천히 말하기',es:'Habla despacio',fr:'Parle lentement'}
 };
 for(const [k,v] of Object.entries(ADDITIONAL))DATA[k]=Object.assign({},DATA[k]||{},v);
 const BLOCK='.wj-target-term,[data-study-term],[data-native-src],[data-wj-gloss],.wj-target-gloss,.s32-target-term,.s32-scene h2,.s32-options button,.v25-caption h2,.v36-quiz-sheet h1,.v36-quiz-options button,.v36-quiz-summary strong,.options .option,.v25-card-foot [data-native-src],.wj-world-msg,.wj-message,.wj-chat-message,.wj-world-chat,.v22-wj-messages,.wj-world-word-stage h2,.v25-word .v25-caption p,code,pre,script,style,svg,iframe,select,option';
 const NATIVE_UI_COUNTRY={
 ko:{de:'Korea',en:'Korea',tr:'Kore',ja:'韓国',ko:'한국',es:'Corea',fr:'Corée'},
 de:{de:'Deutschland',en:'Germany',tr:'Almanya',ja:'ドイツ',ko:'독일',es:'Alemania',fr:'Allemagne'},
 en:{de:'Großbritannien',en:'United Kingdom',tr:'Birleşik Krallık',ja:'イギリス',ko:'영국',es:'Reino Unido',fr:'Royaume-Uni'}
 };
 const NATIVE_STUDY={
 ko:{de:'Koreanisch',en:'Korean',tr:'Korece',ja:'韓国語',ko:'한국어',es:'Coreano',fr:'Coréen'},
 de:{de:'Deutsch',en:'German',tr:'Almanca',ja:'ドイツ語',ko:'독일어',es:'Alemán',fr:'Allemand'},
 en:{de:'Englisch',en:'English',tr:'İngilizce',ja:'英語',ko:'영어',es:'Inglés',fr:'Anglais'}
 };
 function locale(){return SUPPORTED.includes(v27Lang)?v27Lang:'de'}
 function country(){return window.wjNativeCountry?.(wjTarget)||NATIVE_UI_COUNTRY[wjTarget]?.[locale()]||'Korea'}
 function study(){return window.wjNativeStudyName?.(wjTarget)||NATIVE_STUDY[wjTarget]?.[locale()]||'Koreanisch'}
 function exact(source){
  if(locale()==='de')return source;
  const entry=DATA[source];
  if(entry?.[locale()])return entry[locale()];
  const before=source;
  if(typeof window.wjNativeUI==='function'){const a=window.wjNativeUI(source);if(a&&a!==source)return a}
  if(typeof v39T==='function'){const a=v39T(source);if(a&&a!==source)return a}
  if(typeof v27T==='function'){const a=v27T(source);if(a&&a!==source)return a}
  return before;
 }
 function heading(mode){
  const c=country(),l=locale();
  const templates={
   de:'Deine '+c+'-Karte',
   en:'Your '+c+' map',
   tr:c+' haritan',
   ja:c+'の地図',
   ko:c+' 지도',
   es:'Tu mapa de '+c,
   fr:'Ta carte de '+c
  };
  return templates[l]||templates.de;
 }
 function dynamic(source){
  const original=String(source||'').trim();
  if(!original)return original;
  const l=locale();
  if(l==='de')return original;
  const direct=exact(original);
  if(direct!==original)return direct;
  const chapters=original.match(/^(\d+)\s*\/\s*(\d+)\s+Kapitel abgeschlossen$/i);
  if(chapters){
   const [_,done,all]=chapters;
   const ending={en:'chapters completed',tr:'bölüm tamamlandı',ja:'チャプター完了',ko:'챕터 완료',es:'capítulos completados',fr:'chapitres terminés'};
   return done+' / '+all+' '+ending[l];
  }
  const expressionCount=original.match(/^(\d+)\s+(Ausdrücke|Vokabeln|Kapitel|Lernphrasen)$/i);
  if(expressionCount)return expressionCount[1]+' '+(exact(expressionCount[2])!==expressionCount[2]?exact(expressionCount[2]):ADDITIONAL[expressionCount[2]]?.[l]||expressionCount[2]);
  const chapterLabel=original.match(/^(KAPITEL|Kapitel)\s+(\d+)$/);
  if(chapterLabel)return (exact('Kapitel')||'Kapitel')+' '+chapterLabel[2];
  const questionNumber=original.match(/^FRAGE\s+(\d+)\s*\/\s*(\d+)$/);
  if(questionNumber)return (exact('FRAGE')||'FRAGE')+' '+questionNumber[1]+' / '+questionNumber[2];
  const progress=original.match(/^(\d+)\s+von\s+(\d+)\s+richtig(.*)$/i);
  if(progress){const tail={en:'correct',tr:'doğru',ja:'正解',ko:'정답',es:'correctas',fr:'bonnes réponses'};return progress[1]+' / '+progress[2]+' '+tail[l]+(progress[3]||'')}
  if(original.startsWith('Richtige Antwort:'))return exact('Richtige Antwort:')+original.slice('Richtige Antwort:'.length);
  if(original.includes(' · LEVEL-ABSCHLUSS'))return original.replace('LEVEL-ABSCHLUSS',exact('LEVEL-ABSCHLUSS'));
  if(original.includes(' · STORY MODE'))return original.replace('STORY MODE',exact('STORY MODE'));
  if(original.includes(' · SPRACHCOACH'))return original.replace('SPRACHCOACH',exact('SPRACHCOACH'));
  if(original==='📍 DEINE STATIONEN')return '📍 '+exact('DEINE STATIONEN');
  if(original.startsWith('🌐 Ich spreche'))return '🌐 '+exact('Ich spreche');
  if(original.startsWith('✦ ')){const x=exact(original.slice(2));if(x!==original.slice(2))return '✦ '+x}
  if(original.includes('Entdecke die Kultur'))return original.replace('Entdecke die Kultur',exact('Entdecke die Kultur'));
  const progressCount=original.match(/^(\d+)\s*\/\s*(\d+)\s+(Kapitel)\s+(abgeschlossen)$/i);
  if(progressCount){return progressCount[1]+' / '+progressCount[2]+' '+exact('Kapitel')+' '+exact('abgeschlossen')}
  if(original==='Lukas · Sprachcoach'||original==='Alex · Sprachcoach'||original==='Woo Jin · Sprachcoach')return original.replace('Sprachcoach',exact('Sprachcoach'));
  return original;
 }
 function forbidden(element){
  if(!element)return true;
  if(element.closest(BLOCK))return true;
  /* preserve target expressions even if they have no dedicated study-term class */
  if(element.closest('.v25-word .v25-caption h2,.s32-scene h2,.wj-world-mission-scene h2,.v36-quiz-options,.s32-options,.wj-world-msg.user,.wj-world-msg.bot'))return true;
  return false;
 }
 const UI_CONTAINERS=['main','sideNav','bottomNav','socialHeader','storyModes'];
 let busy=false,queued=false,observed=false;
 function updateNode(node){
  const parent=node?.parentElement;
  if(!parent||forbidden(parent))return;
  const raw=node.nodeValue||'',trim=raw.trim();
  if(!trim||trim.length>350)return;
  if(/^(?:https?:\/\/|\d[\d\s.:%/-]*|A1|A2|B1|B2|C1|C2|▶|♫|✦|✓|🔒)$/.test(trim))return;
  const value=dynamic(trim);
  if(value!==trim)node.nodeValue=raw.replace(trim,value);
 }
 function localizeAttrs(root){
  for(const element of root.querySelectorAll('input[placeholder],textarea[placeholder],button[aria-label],img[alt],a[title]')){
   if(forbidden(element))continue;
   for(const name of ['placeholder','aria-label','alt','title']){
    if(!element.hasAttribute(name))continue;
    const val=element.getAttribute(name);
    const translated=dynamic(val);
    if(translated!==val)element.setAttribute(name,translated);
   }
  }
 }
 function localizeMap(root){
  const map=root.querySelector('.v18-map-page');
  if(!map)return;
  const title=map.querySelector('.v18-map-head h1');
  if(title){
   const node=Array.from(title.childNodes).find(n=>n.nodeType===3);
   if(node&&node.nodeValue!==heading(wjTarget)){node.nodeValue=heading(wjTarget)}
  }
  const label=map.querySelector('.v18-map-head .v18-kicker');
  if(label)label.textContent=(wjTarget==='ko'?'🇰🇷':wjTarget==='de'?'🇩🇪':'🇬🇧')+' '+country().toUpperCase()+' · '+exact('STORY MODE');
  const caption=map.querySelector('.v18-map-caption');
  if(caption)caption.textContent=(wjTarget==='ko'?'🇰🇷':wjTarget==='de'?'🇩🇪':'🇬🇧')+' '+country()+' · A1–C2';
  const banner=map.querySelector('.v18-scene-strip span');
  if(banner)banner.textContent=(wjTarget==='ko'?'🌸':wjTarget==='de'?'🏰':'🎡')+' '+exact('Entdecke die Kultur');
 }
 function localizeRoot(root){
  if(!root)return;
  if(root.id==='main')localizeMap(root);
  const walk=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,null);
  const nodes=[];let node;
  while((node=walk.nextNode()))nodes.push(node);
  nodes.forEach(updateNode);
  localizeAttrs(root);
 }
 function localizeAll(){
  if(busy)return;
  busy=true;
  try{
   document.documentElement.lang=locale();
   for(const id of UI_CONTAINERS)localizeRoot(document.getElementById(id));
  }catch(err){console.warn('UI localization:',err)}
  finally{busy=false}
 }
 function schedule(){
  if(queued)return;
  queued=true;
  Promise.resolve().then(()=>{queued=false;localizeAll()});
 }
 const priorRender=render;
 render=function(){const value=priorRender.apply(this,arguments);localizeAll();return value;};
 if(typeof MutationObserver==='function'){
  const obs=new MutationObserver(()=>{if(!busy)schedule()});
  for(const id of UI_CONTAINERS){
   const element=document.getElementById(id);
   if(element)obs.observe(element,{subtree:true,childList:true,characterData:true});
  }
 }
 window.wjUniversalLocalize=localizeAll;
 window.wjUniversalText=dynamic;
 localizeAll();
})();
