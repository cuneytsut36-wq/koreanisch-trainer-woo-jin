/* Woo Jin V42 — natural, deliberately paced conversational layer.
   Offline fallback is rule-based, not falsely presented as a generative AI.
   Hosted AI / local WebGPU remains optional. No credentials in client code. */
const wj42={recognition:null,voiceActive:false,thinkingMin:1450,thinkingMax:3100};
const wj42Wait=ms=>new Promise(resolve=>setTimeout(resolve,ms));
const wj43Conversation={lastTopic:'',lastQuestion:'',lastUser:''};
function wj43ContextReply(raw){
 const t=wjNorm(raw),p=wj43Conversation.lastTopic;
 if(/^(ja|ja klar|ja gerne|gerne|klar|yes|okay|ok|sure|evet)$/.test(t)&&p==='day')return {ko:'Geuraeyo!',de:'Schön. Erzähl mir, was heute passiert ist. Ich höre zu.'};
 if(/^(nein|nee|no|hayir)$/.test(t)&&p==='day')return {ko:'Algesseoyo.',de:'Alles gut. Dann reden wir über etwas anderes. Was liegt dir gerade im Kopf?'};
 if(/^(ja|ja klar|ja gerne|gerne|klar|yes|okay|ok|sure|evet)$/.test(t)&&p==='korea')return {ko:'Joayo!',de:'Was interessiert dich mehr: Alltag in Seoul, Essen oder die koreanische Sprache?'};
 if(/^(warum|wieso|weshalb|why)\??$/.test(t)&&wj43Conversation.lastQuestion)return {ko:'Jal saenggakhaebwayo.',de:'Ich habe gerade nach '+wj43Conversation.lastQuestion+' gefragt, weil ich besser verstehen möchte, was dich interessiert. Du kannst auch einfach ein anderes Thema anfangen.'};
 if(/^(und du|du auch|and you|sen|ya sen)\??$/.test(t))return {ko:'Jeoneun Woo Jin-ieyo.',de:'Ich habe keine eigenen Erlebnisse wie ein Mensch, aber ich unterhalte mich gerne mit dir darüber. Was würdest du mir erzählen?'};
 return null;
}
function wj43Remember(raw,result){wj43Conversation.lastUser=String(raw).slice(0,250);const t=wjNorm(raw);if(/(tag|heute|day|bugun)/.test(t))wj43Conversation.lastTopic='day';else if(/(korea|seoul|sudkorea)/.test(t))wj43Conversation.lastTopic='korea';if(result?.de){const match=String(result.de).match(/([^.!?]{8,})\?/);if(match)wj43Conversation.lastQuestion=match[1].trim().toLowerCase()}}
function wj42Reply(raw){
 const t=wjNorm(raw),prev=wjHistory.filter(x=>x.who==='me').slice(-3).map(x=>wjNorm(x.ko));
 const who=typeof wjV2!=='undefined'&&wjV2.name?wjV2.name:'';
 const prefix=who?who+', ':'';
 if(/^(hallo|hi|hey|moin|servus|guten morgen|guten abend|annyeong|hello|selam)(\b|$)/.test(t))return {ko:'Annyeong!',de:prefix+['Hey! Schön, dass du da bist. Wie war dein Tag bisher?','Hi! Ich bin da. Worüber möchtest du heute reden?','Annyeong! Was beschäftigt dich gerade?'][wjHistory.length%3]};
 if(/(wie geht es dir|wie gehts|wie geht s|how are you|nasilsin)/.test(t))return {ko:'Jal jinaeyo!',de:'Ganz gut, danke! Ich bin bereit für ein bisschen Gespräch. Und wie geht es dir heute?'};
 if(/(mir geht es gut|mir gehts gut|mir geht s gut|bin gut drauf|ich bin glucklich|ich freue mich|sehr gut)/.test(t))return {ko:'Jeongmal joayo!',de:'Das freut mich! Was hat deinen Tag so gut gemacht?'};
 if(/(mir geht es schlecht|mir gehts schlecht|mir geht s schlecht|bin traurig|bin gestresst|bin mude|bin erschopft|ich habe angst)/.test(t))return {ko:'Gwaenchanayo.',de:'Das klingt anstrengend. Möchtest du erzählen, was los ist, oder lieber über etwas Leichtes reden?'};
 if(/(was machst du|was geht ab|was geht|was lauft|was treibst du)/.test(t))return {ko:'Yeogi isseoyo!',de:'Ich bin gerade hier und unterhalte mich mit dir. Hast du heute etwas Interessantes erlebt?'};
 if(/(wer bist du|bist du echt|bist du mensch|bist du ki|bist du eine ki)/.test(t))return {ko:'Je ireumeun Woo Jin-ieyo.',de:'Ich bin Woo Jin, dein virtueller Lernbegleiter. Kein Mensch, aber ich kann mit dir reden und dir beim Sprachenlernen helfen.'};
 if(/(wie alt bist du|wo wohnst du|woher kommst du)/.test(t))return {ko:'Jeoneun Woo Jin-ieyo.',de:'Ich habe kein echtes Alter und keinen Wohnort – ich bin dein digitaler Gesprächspartner. Erzähl mir lieber etwas von dir: Was interessiert dich?'};
 if(/(korea|seoul|sudkorea|koreanische kultur)/.test(t)&&!/(ubersetz|wie sagt|grammatik|lerne|test|quiz)/.test(t))return {ko:'Hanguk-eun jeongmal jaemiisseoyo.',de:'Korea hat so viele spannende Seiten – Streetfood, Cafés, Musik und die Geschichte Seouls. Was davon interessiert dich am meisten?'};
 if(/(k pop|kpop|musik|song|lieder)/.test(t))return {ko:'Eotteon eumageul joahaeyo?',de:'Musik ist ein gutes Gesprächsthema! Hörst du lieber K-Pop, Hip-Hop oder etwas ganz anderes?'};
 if(/(essen|hunger|restaurant|cafe|kaffee)/.test(t)&&!/(ubersetz|wie sagt|grammatik|lerne|test|quiz)/.test(t))return {ko:'Mwo meokgo sipeoyo?',de:'Jetzt bekomme ich fast Lust auf ein Café-Gespräch. Was würdest du dir bestellen?'};
 if(/(reise|urlaub|fliegen|flugzeug|reisen)/.test(t)&&!/(ubersetz|wie sagt|grammatik|lerne|test|quiz)/.test(t))return {ko:'Eodi gago sipeoyo?',de:'Reisen klingt spannend. Welches Land würdest du am liebsten als Nächstes besuchen?'};
 if(/(ich mag|ich liebe|mein hobby|ich spiele|ich schaue|ich hore|ich interessiere mich fur)/.test(t))return {ko:'Jeongmalyo?',de:'Erzähl mir mehr davon! Wie bist du dazu gekommen?'};
 if(/(warum|wieso|weshalb)/.test(t)&&prev.length>1)return {ko:'Geureoke saenggakhal sudo isseoyo.',de:'Gute Frage. Ich möchte dir nichts ausdenken: Kannst du kurz sagen, worauf sich dein „Warum“ bezieht? Dann gehe ich genauer darauf ein.'};
 if(/^(ja|genau|stimmt|okay|ok|klar|nein|nicht wirklich|vielleicht|weiß nicht|weiss nicht)$/.test(t))return {ko:'Geuraeyo?',de:['Verstehe. Was denkst du persönlich darüber?','Okay. Erzähl mir ruhig mehr – ich höre zu.','Alles klar. Möchtest du darüber weitersprechen oder das Thema wechseln?'][wjHistory.length%3]};
 return null;
}
function wj42StudyIntent(text){const t=wjNorm(text);return /(teste mich|mini test|quiz|abfragen|grammatik|ubersetze|ubersetzung|was bedeutet|wie sagt|wie heisst|wie heißt|koreanisch|vokabel|wiederholen|mein fortschritt|empfehlung|was soll ich lernen|erklar|lernen|ubung|ubungen|lektion|a1|a2|b1|b2|c1|c2)/.test(t)}
async function wj42Typing(text){
 const chat=document.getElementById('wjChat');if(!chat)return;
 const bubble=document.createElement('div');bubble.className='wj-message theirs wj42-live';bubble.innerHTML='<span class="wj-avatar-mini"><img src="woo-jin-pixel.svg" alt=""></span><div class="wj-bubble"><div class="wj-korean"></div><div class="wj-de"></div></div>';chat.appendChild(bubble);
 const node=bubble.querySelector('.wj-korean'),secondary=bubble.querySelector('.wj-de');const words=Array.from(String(text.ko||'')),de=Array.from(String(text.de||''));let i=0;
 while(i<words.length&&bubble.isConnected){i=Math.min(words.length,i+2);node.textContent=words.slice(0,i).join('');chat.scrollTop=chat.scrollHeight;await wj42Wait(58)}
 if(de.length){await wj42Wait(240);i=0;while(i<de.length&&bubble.isConnected){i=Math.min(de.length,i+2);secondary.textContent=de.slice(0,i).join('');chat.scrollTop=chat.scrollHeight;await wj42Wait(54)}}
 if(bubble.isConnected)bubble.remove();
}
async function wj42Send(value){
 const text=String(value||document.getElementById('wjInput')?.value||'').trim();if(!text||wjBusy)return;
 wjAdd('me',text,'');wjBusy=true;render();wjTypingIndicator();
 const started=Date.now();
 try{
  let result;
  if(wjOpenChat.backend||wjOpenChat.localReady){
   try{const answer=await wjOpenReply();if(answer)result={ko:answer,de:''}}catch(e){wjOpenChat.error='KI-Verbindung unterbrochen · Offline-Gespräch verfügbar';wjOpenChat.backend=false}
  }
  if(!result){result=wj42StudyIntent(text)?wjV2Respond(text):(wj43ContextReply(text)||wj42Reply(text)||wjV2Respond(text))}wj43Remember(text,result)
  const delay=Math.min(wj42.thinkingMax,Math.max(wj42.thinkingMin,750+text.length*28));
  await wj42Wait(Math.max(0,delay-(Date.now()-started)));
  document.getElementById('wj-type-indicator')?.remove();
  await wj42Typing(result);
  wjAdd('bot',result.ko,result.de);
 }catch(e){document.getElementById('wj-type-indicator')?.remove();wjAdd('bot','Gwaenchanayo.','Entschuldige, da ist etwas schiefgelaufen. Versuch es bitte noch einmal.')}
 finally{wjBusy=false;if(state.page==='wooJin'){render();const chat=document.getElementById('wjChat');if(chat)chat.scrollTop=chat.scrollHeight}}
}
function wj42Mic(){
 const Speech=window.SpeechRecognition||window.webkitSpeechRecognition;
 if(!Speech){alert('Spracheingabe ist in diesem Browser nicht verfügbar. Auf iPhone kannst du das Mikrofon deiner Tastatur verwenden.');return}
 if(wj42.recognition){try{wj42.recognition.stop()}catch{}wj42.recognition=null;return}
 const rec=new Speech();rec.lang=({de:'de-DE',en:'en-US',tr:'tr-TR',ko:'ko-KR',ja:'ja-JP',es:'es-ES',fr:'fr-FR'})[typeof v27Lang==='string'?v27Lang:'de']||'de-DE';
 rec.interimResults=false;rec.continuous=false;rec.maxAlternatives=1;wj42.recognition=rec;
 const btn=document.getElementById('wj42-mic');if(btn)btn.classList.add('listening');
 rec.onresult=e=>{const heard=Array.from(e.results).map(x=>x[0].transcript).join(' ').trim();const input=document.getElementById('wjInput');if(input){input.value=heard;input.focus()}};
 rec.onend=()=>{wj42.recognition=null;document.getElementById('wj42-mic')?.classList.remove('listening')};
 rec.onerror=e=>{if(e.error!=='no-speech')console.warn('Woo Jin voice input:',e.error)};
 try{rec.start()}catch{wj42.recognition=null;btn?.classList.remove('listening')}
}
