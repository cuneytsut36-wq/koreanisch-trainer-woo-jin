/* V20: independent mother tongue for real learning, not only for menu labels. */
(function(){
'use strict';
const LANGS=[['de','🇩🇪','Deutsch'],['tr','🇹🇷','Türkçe'],['en','🇬🇧','English'],['ja','🇯🇵','日本語'],['ko','🇰🇷','한국어'],['es','🇪🇸','Español'],['fr','🇫🇷','Français']];
const KEYWORDS={
 'Deine Lernwelt':{tr:'Senin öğrenme dünyan',ja:'あなたの学習の世界',ko:'나의 학습 세계',es:'Tu mundo de aprendizaje',fr:'Ton univers d’apprentissage'},
 'Your learning world':{tr:'Senin öğrenme dünyan',ja:'あなたの学習の世界',ko:'나의 학습 세계',es:'Tu mundo de aprendizaje',fr:'Ton univers d’apprentissage'},
 'Ich möchte lernen':{en:'I want to learn',tr:'Öğrenmek istiyorum',ja:'学びたい言語',ko:'배우고 싶은 언어',es:'Quiero aprender',fr:'Je veux apprendre'},
 'I want to learn':{en:'I want to learn',tr:'Öğrenmek istiyorum',ja:'学びたい言語',ko:'배우고 싶은 언어',es:'Quiero aprender',fr:'Je veux apprendre'},
 'Ich spreche':{en:'I speak',tr:'Konuştuğum dil',ja:'母語',ko:'모국어',es:'Hablo',fr:'Je parle'},
 'Lernsprache wählen':{en:'Choose a learning language',tr:'Öğrenmek istediğin dili seç',ja:'学習する言語を選ぶ',ko:'배울 언어 선택',es:'Elige un idioma',fr:'Choisis une langue'},
 'Wörter gelernt':{en:'Words learned',tr:'Öğrenilen kelimeler',ja:'覚えた単語',ko:'배운 단어',es:'Palabras aprendidas',fr:'Mots appris'},
 'Aktuelle Lektion':{en:'Current lesson',tr:'Şu anki ders',ja:'今のレッスン',ko:'현재 레슨',es:'Lección actual',fr:'Leçon actuelle'},
 'Tage in Folge':{en:'Day streak',tr:'Ardışık günler',ja:'連続学習日数',ko:'연속 학습 일수',es:'Días seguidos',fr:'Jours consécutifs'},
 'Lernschritte':{en:'Learning steps',tr:'Öğrenme adımları',ja:'学習ステップ',ko:'학습 단계',es:'Pasos de aprendizaje',fr:'Étapes'},
 'Sprachniveau':{en:'Language level',tr:'Dil seviyesi',ja:'言語レベル',ko:'언어 수준',es:'Nivel',fr:'Niveau'},
 'Kapitel':{en:'Chapters',tr:'Bölümler',ja:'章',ko:'챕터',es:'Capítulos',fr:'Chapitres'},
 'Länderkarte & Kapitel':{en:'Country map & chapters',tr:'Ülke haritası ve bölümler',ja:'国の地図と章',ko:'나라 지도와 챕터',es:'Mapa y capítulos',fr:'Carte et chapitres'},
 'Bilder & Aussprache':{en:'Pictures & pronunciation',tr:'Görseller ve telaffuz',ja:'画像と発音',ko:'그림과 발음',es:'Imágenes y pronunciación',fr:'Images et prononciation'},
 'Dein Sprachbegleiter':{en:'Your language coach',tr:'Dil öğrenme arkadaşın',ja:'語学学習のパートナー',ko:'언어 학습 도우미',es:'Tu tutor de idiomas',fr:'Ton tuteur de langue'},
 'Sprachcoach':{en:'Language coach',tr:'Dil eğitmeni',ja:'語学コーチ',ko:'언어 코치',es:'Tutor de idiomas',fr:'Tuteur de langue'},
 'Story':{en:'Stories',tr:'Hikâyeler',ja:'ストーリー',ko:'스토리',es:'Historias',fr:'Histoires'},
 'Vokabeln':{en:'Vocabulary',tr:'Kelimeler',ja:'単語',ko:'어휘',es:'Vocabulario',fr:'Vocabulaire'},
 'Medien':{en:'Media',tr:'Medya',ja:'動画',ko:'미디어',es:'Medios',fr:'Médias'},
 'Start':{en:'Home',tr:'Ana sayfa',ja:'ホーム',ko:'홈',es:'Inicio',fr:'Accueil'},
 'Sprache ändern: Startseite':{en:'Change language: Home',tr:'Dili değiştirmek için ana sayfaya dön',ja:'言語変更はホームで',ko:'언어 변경은 홈에서',es:'Cambia el idioma en Inicio',fr:'Change la langue à l’accueil'},
 'Jetzt entdecken':{en:'Explore now',tr:'Keşfetmeye başla',ja:'さっそく探索',ko:'지금 탐험하기',es:'Explorar',fr:'Explorer'},
 'Pixelart-Landschaft':{en:'Pixel-art landscape',tr:'Piksel sanat manzarası',ja:'ピクセルアートの風景',ko:'픽셀 아트 풍경',es:'Paisaje pixel art',fr:'Paysage pixel art'},
 'Dein Sprachabenteuer':{en:'Your language adventure',tr:'Dil maceran',ja:'語学アドベンチャー',ko:'나의 언어 모험',es:'Tu aventura lingüística',fr:'Ton aventure linguistique'},
 'Korea erkunden':{en:'Explore Korea',tr:'Kore’yi keşfet',ja:'韓国を探索',ko:'한국 탐험',es:'Explora Corea',fr:'Explore la Corée'},
 'Deine Bedeutung':{en:'Your translation',tr:'Anlamı',ja:'意味',ko:'뜻',es:'Significado',fr:'Signification'}
};
const DESCRIPTIONS={
 ko:{de:'Entdecke Korea und lerne in deinem Tempo.',en:'Explore Korea and learn at your own pace.',tr:'Kore’yi keşfet ve kendi hızında öğren.',ja:'韓国を探索し、自分のペースで学びましょう。',ko:'한국을 탐험하고 자신의 속도로 배워 보세요.',es:'Explora Corea y aprende a tu ritmo.',fr:'Explore la Corée et apprends à ton rythme.'},
 de:{de:'Entdecke Deutschland und lerne in deinem Tempo.',en:'Explore Germany and learn at your own pace.',tr:'Almanya’yı keşfet ve kendi hızında öğren.',ja:'ドイツを探索し、自分のペースで学びましょう。',ko:'독일을 탐험하고 자신의 속도로 배워 보세요.',es:'Explora Alemania y aprende a tu ritmo.',fr:'Explore l’Allemagne et apprends à ton rythme.'},
 en:{de:'Entdecke Großbritannien und lerne in deinem Tempo.',en:'Explore Britain and learn at your own pace.',tr:'Britanya’yı keşfet ve kendi hızında öğren.',ja:'イギリスを探索し、自分のペースで学びましょう。',ko:'영국을 탐험하고 자신의 속도로 배워 보세요.',es:'Explora el Reino Unido y aprende a tu ritmo.',fr:'Explore le Royaume-Uni et apprends à ton rythme.'}
};
const englishByGerman=new Map();
for(const lang of ['de','en'])for(const level of (window.wjLanguageWorlds?.[lang]||[]))for(const chapter of level.chapters)for(const item of chapter.words){if(item?.de&&item?.en&&!englishByGerman.has(item.de))englishByGerman.set(item.de,item.en);}
const dictionary=window.wjNativeGlossary||{};
function currentNative(){return LANGS.some(x=>x[0]===v27Lang)?v27Lang:'de'}
/* Keep quiz answer badges (A, B, C, D) while changing only the meaning. */
function writeNativeMeaning(element,value,native){
 if(element.matches?.('.v36-quiz-options button')){
  let label=element.querySelector('.v20-native-answer');
  if(!label){
   for(const node of Array.from(element.childNodes)){if(node.nodeType===3)element.removeChild(node)}
   label=document.createElement('span');label.className='v20-native-answer';element.appendChild(label);
  }
  label.textContent=value;
 }else element.textContent=value;
 element.setAttribute('lang',native);
 element.setAttribute('translate','no');
}
function displayMeaning(german,english){
 const original=String(german??'');
 const native=currentNative();
 if(!original||/^\d+(?:[.,]\d+)?$/.test(original))return original;
 if(native==='de')return original;
 const offline=dictionary[original]||{};
 if(native==='en')return String(english||offline.en||englishByGerman.get(original)||v28Stored(original,'en')||original);
 if(offline[native])return offline[native];
 const cached=typeof v28Stored==='function'?v28Stored(original,native):null;
 if(cached)return cached;
 if(typeof v28QueueTranslation==='function'){
  v28QueueTranslation(original,native,function(value){
   for(const element of document.querySelectorAll('[data-native-src]')){
    if(element.getAttribute('data-native-src')===original&&element.isConnected){
     writeNativeMeaning(element,value,native);
    }
   }
   for(const element of document.querySelectorAll('[data-wj-gloss]')){
    if(element.getAttribute('data-wj-gloss')===original&&element.isConnected&&!element.hasAttribute('data-native-hidden')){
     writeNativeMeaning(element,value,native);
    }
   }
  });
 }
 return String(english||offline.en||englishByGerman.get(original)||original);
}
function nativeUI(german,english){
 const native=currentNative();
 if(native==='de')return german;
 if(native==='en')return english||KEYWORDS[german]?.en||german;
 const exact=KEYWORDS[german]?.[native];
 if(exact)return exact;
 const fromEnglish=KEYWORDS[english]?.[native];
 if(fromEnglish)return fromEnglish;
 if(typeof v39T==='function'){const alt=v39T(german);if(alt!==german)return alt;}
 if(typeof v27T==='function'){const alt=v27T(german);if(alt!==german)return alt;}
 return german;
}
function nativePicker(){
 const native=currentNative();
 return '<div class="v20-native-picker"><label for="v20-native-language"><span>🌐 '+nativeUI('Ich spreche','I speak')+'</span></label><select id="v20-native-language" aria-label="'+nativeUI('Ich spreche','I speak')+'" onchange="v27SetLanguage(this.value)">'+LANGS.map(x=>'<option value="'+x[0]+'" '+(x[0]===native?'selected':'')+'>'+x[1]+' '+x[2]+'</option>').join('')+'</select></div>';
}
window.wjNativeMeaning=displayMeaning;
window.wjNativeUI=nativeUI;
window.wjNativePicker=nativePicker;
window.wjNativeDescription=function(mode){return DESCRIPTIONS[mode]?.[currentNative()]||DESCRIPTIONS.ko.de};
window.wjNativeLangList=LANGS;
/* Replaces only explanations, never the text the student is learning. */
wjWorldSupport=function(word){if(!word)return '';return displayMeaning(word.de||word.term,word.en)};
wjWorldTranslateGlosses=function(){
 wjWorldProtectTerms();
 if(wjTarget==='ko')return;
 for(const item of document.querySelectorAll('#main [data-wj-gloss]')){
  const source=item.getAttribute('data-wj-gloss');
  if(!source)continue;
  item.textContent=displayMeaning(source,englishByGerman.get(source));
  item.setAttribute('lang',currentNative());
  item.setAttribute('translate','no');
 }
};
/* Make native-language translations of earlier A1 meanings visible as soon as they arrive. */
function refreshNativeMeanings(){
 if(wjTarget!=='ko')wjWorldTranslateGlosses();
 for(const item of document.querySelectorAll('#main [data-native-src]')){
  const source=item.getAttribute('data-native-src'),english=item.getAttribute('data-native-en');
  if(!source)continue;
  writeNativeMeaning(item,displayMeaning(source,english),currentNative());
  item.lang=currentNative();
  item.setAttribute('translate','no');
 }
}
/* The learner's target language (including Korean romanization) must never be machine-translated. */
const previousShouldTranslate=v28ShouldTranslate;
v28ShouldTranslate=function(text,node){
 const p=node?.parentElement;
 if(p?.closest('.s32-scene h2,.s32-meaning,.s32-options,.v25-caption h2,.v25-caption [data-native-src],.v25-card-foot [data-native-src],.v36-quiz-options,.v36-quiz-sheet h1,.v36-quiz-summary,.question[data-native-src],.wj-target-term,.wj-target-gloss,[data-native-src],[data-wj-gloss],.wj-world-video-body strong'))return false;
 return previousShouldTranslate(text,node);
};

const precedingRender=render;
render=function(){
 const result=precedingRender.apply(this,arguments);
 refreshNativeMeanings();
 return result;
};
render();
})();