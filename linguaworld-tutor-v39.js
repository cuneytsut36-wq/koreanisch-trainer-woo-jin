/* LinguaWorld AI Tutor V39: better conversation instructions and truly adaptive offline practice.
   No model weights are retrained; this module improves tutor behavior and learner interaction.
   AI keys remain on the server, never in browser source. */
(function(){
'use strict';
const PROFILES={
 ko:{name:'Woo Jin',language:'Korean',country:'Korea',voice:'calm, observant, warm, subtly playful',roman:'Always use Korean LATIN romanization, never Hangul, unless explicitly asked for Hangul. Do not force lessons when learner wants to chat.'},
 de:{name:'Lukas',language:'German',country:'Germany',voice:'friendly, lightly humorous, practical, patient',roman:'Speak in accessible German with natural everyday vocabulary.'},
 en:{name:'Alex',language:'English',country:'United Kingdom',voice:'relaxed, curious, witty in moderation, patient',roman:'Use natural conversational English and avoid stilted textbook dialogue.'}
};
const INTERFACE={de:'German',tr:'Turkish',en:'English',ja:'Japanese',ko:'Korean',es:'Spanish',fr:'French'};
const LAST={ko:'',de:'',en:''};
const OFFLINE={de:{pending:null,seen:[],wrong:0,correct:0},en:{pending:null,seen:[],wrong:0,correct:0}};
const TRANSLATE={
 de:{quiz:'Übersetze ins Deutsche:',good:'Richtig! Gut gemacht.',close:'Fast! Eine natürliche Antwort ist:',next:'Nächste Frage?',intro:'Ich bin Lukas. Wir üben kurze, natürliche Sätze. Wir können auch einfach reden.',tip:'Tipp: Versuche, den ganzen Satz zu sagen.',pron:'Sprich den Beispielsatz laut nach.',grammar:'Achte auf Wortstellung, Artikel und die passende Verbform.',what:'Was bedeutet',step:'Ich wähle einen alltagstauglichen Satz für dich.'},
 en:{quiz:'Translate into English:',good:'Correct! Nice work.',close:'Not quite. One natural answer is:',next:'Next question?',intro:"I'm Alex. Let's practise useful sentences at your pace. We can just chat, too.",tip:'Try saying the full sentence.',pron:'Say the example sentence aloud.',grammar:'Pay attention to word order, tense, and natural phrasing.',what:'What does',step:"I'll choose a useful everyday sentence for you."}
};
function mode(){return ['ko','de','en'].includes(wjTarget)?wjTarget:'ko'}
function currentLevel(){const v=mode()==='ko'?state?.level:typeof wjWorldLevel!=='undefined'?wjWorldLevel:'A1';return ['A1','A2','B1','B2','C1','C2'].includes(String(v))?String(v):'A1'}
function appLanguage(){return INTERFACE[typeof v27Lang==='string'?v27Lang:'de']||'German'}
function prompt(){
 const p=PROFILES[mode()],level=currentLevel();
 return [
  'You are '+p.name+', a fictional AI language partner from '+p.country+' (never claim to be human). Personality: '+p.voice+'.',
  'You teach '+p.language+' at CEFR '+level+'. Interface language: '+appLanguage()+'.',
  p.roman,
  'Be a real conversational partner: respond to the actual message, remember prior conversation in supplied messages, and ask at most one meaningful follow-up question when appropriate.',
  'Prefer 1-3 short conversational sentences. At A1/A2 use very short, familiar target-language expressions; at B1/B2 expand naturally; at C1/C2 allow nuance.',
  'If asked to practise: present exactly one role-play question or one short translation challenge. Wait for the answer before continuing. Vary topics: cafe, travel, friends, work, directions, culture.',
  'When the learner tries a target-language answer, gently correct only the most important mistake: give a natural corrected example, a very brief explanation in interface language, then continue. Never mark an acceptable variant wrong.',
  'For grammar explain simply with one example. If asked for pronunciation, write a speakable example and short pronunciation hint, not invented audio. Do not repeat generic praise.',
  'Never invent saved learner history, course progress, external facts, or personal experiences. If chat is casual, do not turn it into a quiz.'
 ].join(' ');
}
const oldPrompt=typeof wjOpenSystemPrompt==='function'?wjOpenSystemPrompt:null;
if(oldPrompt){wjOpenSystemPrompt=function(){return prompt().slice(0,1270)}}
function norm(s){return String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('en-US').replace(/[^\p{L}\p{N} ]/gu,'').replace(/\s+/g,' ').trim()}
function stripPrefix(s){return norm(s).replace(/^(ich sage|die antwort ist|meine antwort ist|it is|my answer is)\s+/,'')}
function suggestions(){
 return mode()==='ko'?[
  ['🗣','Rollenspiel','Spiele mit mir eine kurze Café-Szene. Stelle nur eine Frage.'],
  ['✓','Korrigieren','Korrigiere meinen nächsten koreanischen Satz kurz und erkläre die wichtigste Änderung.'],
  ['?','Mini-Quiz','Teste mich mit genau einer A1-Frage und warte auf meine Antwort.'],
  ['↻','Wiederholen','Wiederholen']
 ]:mode()==='de'?[
  ['🗣','Rollenspiel','Rollenspiel im Café'],
  ['✓','Satz üben','Teste mich'],
  ['?','Grammatik','Erkläre Grammatik'],
  ['↻','Wiederholen','Wiederholen']
 ]:[
  ['🗣','Roleplay','Roleplay at a cafe'],
  ['✓','Sentence practice','Test me'],
  ['?','Grammar','Explain grammar'],
  ['↻','Review','Review']
 ];
}
function send(text){
 if(mode()==='ko'){if(typeof wjSend==='function')return wjSend(text)}
 else if(typeof wjWorldCoachSend==='function')return wjWorldCoachSend(text);
}
function accentPanel(){
 if(state?.page!=='wooJin')return;
 const root=document.querySelector('#main');
 const target=mode()==='ko'?root?.querySelector('.v22-woojin'):root?.querySelector('.wj-world-coach');
 if(!target)return;
 const after=target.querySelector('#wj-open-panel');
 if(!target.querySelector('.lw39-coach-header')){
   let bar=document.createElement('div');bar.className='lw39-coach-header';
   const name=PROFILES[mode()].name;
   bar.innerHTML='<span class="lw39-icon" aria-hidden="true">✦</span><div><strong>'+name+' · '+currentLevel()+'</strong><small>'+((typeof v27Lang!=='undefined'&&v27Lang==='en')?'Speak naturally. Practise at your pace.':'Sprich natürlich. Übe in deinem Tempo.')+'</small></div><span class="lw39-hint">AI / offline</span>';
   if(after)after.after(bar);else target.prepend(bar);
 }
 if(!target.querySelector('.lw39-practice')){
   const row=document.createElement('div');row.className='lw39-practice';row.setAttribute('aria-label','Lernübungen');
   suggestions().forEach(([ico,name,message])=>{
     const b=document.createElement('button');b.type='button';b.className='lw39-practice-btn';
     const x=document.createElement('span');x.textContent=ico;
     const label=document.createElement('span');label.textContent=name;b.append(x,label);
     b.addEventListener('click',()=>send(message));row.append(b);
   });
   const chat=target.querySelector('#wjChat,#wj-world-chat');
   if(chat)chat.before(row);else target.append(row);
 }
}
function worldWords(){if(typeof wjWorldWords==='function')return wjWorldWords();return []}
function getOfflineWord(code){
 const o=OFFLINE[code],pool=worldWords();
 if(!pool?.length)return null;
 let available=pool.filter(x=>x&&typeof x.term==='string'&&x.term.trim());
 if(!available.length)return null;
 let picked=available.find(x=>!o.seen.includes(x.term));
 if(!picked)picked=available[(o.correct+o.wrong)%available.length];
 o.seen.push(picked.term);o.seen=o.seen.slice(-Math.min(available.length,24));
 return picked;
}
function nativeMeaning(w){if(typeof wjWorldSupport==='function')return wjWorldSupport(w);return w.meaning||w.translation||''}
function offlineWorldReply(q,code){
 const t=norm(q),o=OFFLINE[code],words=TRANSLATE[code];
 const isStart=/(^|\s)(test|teste|testen|quiz|pruf|prufe|frage|abfragen|mini quiz|practice|sentence practice|test me|teste mich)(\s|$)/.test(t);
 const isReview=/(wiederhol|review|nochmal|again)/.test(t);
 const isGrammar=/(grammatik|grammar|erklare|explain)/.test(t);
 const isRoleplay=/(rollenspiel|roleplay|cafe|restaurant|café)/.test(t);
 const isHelp=/(hilfe|help|tipp|hint)/.test(t);
 const p=o.pending;
 if(p&&(isHelp||isGrammar)){return words.tip+' '+p.hint}
 if(p&&!isStart&&!isReview&&!isRoleplay&&!isGrammar){
   o.pending=null;
   const candidate=stripPrefix(q),expected=norm(p.answer);
   const ok=candidate===expected||candidate===norm(p.alternative||'');
   if(ok){o.correct++;return words.good+' '+words.next}
   o.wrong++;return words.close+' „'+p.answer+'“. '+words.next;
 }
 if(isGrammar)return words.grammar+' '+(code==='de'?'Beispiel: „Ich möchte einen Kaffee.“':'Example: “I would like a coffee.”');
 if(isRoleplay){o.pending=null;return code==='de'?'Willkommen im Café! Was möchten Sie bestellen?':'Welcome to our café! What would you like to order?'}
 if(isStart||isReview||/^(next|weiter|nachste frage)$/.test(t)){
   const selected=getOfflineWord(code);
   if(!selected)return words.intro;
   const meaning=String(nativeMeaning(selected)||'').trim(),answer=String(selected.term||'').trim();
   if(!meaning||!answer)return words.intro;
   o.pending={answer,hint:answer.slice(0,Math.min(3,answer.length))+'…'};
   return words.quiz+' „'+meaning+'“? '+words.tip;
 }
 if(/^(hi|hallo|hello|hey|selam|merhaba|guten morgen)/.test(t))return words.intro;
 if(/(fortschritt|progress|punkte|score)/.test(t))return (code==='de'?'Offline-Übungen: ':'Offline practice: ')+o.correct+' ✓ / '+o.wrong+' ✗. '+words.next;
 if(/(wie geht|how are you)/.test(t))return code==='de'?'Mir geht es gut, danke! Und wie geht es dir heute?':"I'm good, thanks! How has your day been?";
 if(/(ich heisse|my name is|mein name ist)/.test(t))return code==='de'?'Schön, dich kennenzulernen! Was machst du gern in deiner Freizeit?':"Nice to meet you! What do you like doing in your free time?";
 return code==='de'?'Ich verstehe. Magst du mir mehr erzählen, oder sollen wir einen kurzen deutschen Satz üben?':'I see! Tell me a little more, or we can practise a short English sentence together.';
}
const oldWorldSend=typeof wjWorldCoachSend==='function'?wjWorldCoachSend:null;
if(oldWorldSend){
 wjWorldCoachSend=async function(raw){
  const q=String(raw||'').trim();if(!q||wjOpenChat.busy)return;
  const code=mode();
  if(code==='ko'||wjOpenChat.backend||wjOpenChat.localReady)return oldWorldSend(q);
  const data=wjWorldChatData[code];if(!data)return oldWorldSend(q);
  data.push({role:'user',text:q});wjWorldSaveChats();wjOpenChat.busy=true;render();
  try{
   await new Promise(res=>setTimeout(res,Math.min(650,230+q.length*9)));
   data.push({role:'bot',text:offlineWorldReply(q,code)});
   wjWorldSaveChats();
  }finally{wjOpenChat.busy=false;if(state.page==='wooJin'){render();const chat=document.getElementById('wj-world-chat');if(chat)chat.scrollTop=chat.scrollHeight}}
 };
}
function decorate(){
 try{if(state?.page==='wooJin')accentPanel()}catch(e){console.warn('Tutor interface:',e)}
}
const originalRender=render;
render=function(){const res=originalRender.apply(this,arguments);decorate();return res};
window.lw39Tutor={prompt,decorate,getOfflineWord,offlineWorldReply};
decorate();
})();