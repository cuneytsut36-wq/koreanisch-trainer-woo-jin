/* Woo Jin V41 — optional generative language model, isolated from the app startup.
 * WebGPU local inference is strictly opt-in and lazy-loaded.
 * A hosted OpenAI-compatible provider is available only if configured on the server.
 */
const wjOpenChat={
 engine:null, loading:false, localReady:false, backend:false, status:'', error:'', busy:false,
 modelId:'Qwen2.5-0.5B-Instruct-q4f16_1-MLC'
};
function wjOpenLabel(s){return wjTarget==='ko'?s:typeof v39T==='function'?v39T(s):s}
function wjOpenStatusLine(){if(wjOpenChat.localReady)return '✦ Freier KI-Chat · auf diesem Gerät';
 if(wjOpenChat.backend)return '✦ Freier KI-Chat · Servermodell';
 if(wjOpenChat.loading)return wjOpenChat.status||'KI-Modell wird geladen …';
 return wjOpenChat.error||'Offline-Lerncoach · echte KI optional';}
function wjOpenControls(){
 return '<section class="wj-open-status" aria-live="polite"><div class="wj-open-badge"><span class="wj-open-light '+(wjOpenChat.localReady||wjOpenChat.backend?'ready':'')+'"></span><div><strong>Woo Jin · freier Chat</strong><small id="wj-open-note">'+esc(wjOpenStatusLine())+'</small></div></div>'+
 (!wjOpenChat.localReady&&!wjOpenChat.backend?'<button id="wj-open-button" onclick="wjOpenStart()" '+(wjOpenChat.loading?'disabled':'')+'>'+(wjOpenChat.loading?'Modell lädt …':'✦ Echte KI starten')+'</button>':'<span class="wj-open-active">Aktiv</span>')+
 '<p>Ein richtiges Sprachmodell kann frei antworten und den Gesprächsverlauf berücksichtigen. Lokal nur auf Geräten mit WebGPU. Der erste Download kann mehrere hundert MB groß sein.</p></section>';
}
function wjOpenRefresh(){
 const el=document.getElementById('wj-open-panel');
 if(el)el.innerHTML=wjOpenControls();
}
async function wjOpenCheck(){
 try{const r=await fetch('/api/status',{cache:'no-store'});if(!r.ok)return;const s=await r.json();wjOpenChat.backend=!!s.ai;wjOpenRefresh()}catch{}
}
function wjOpenSystemPrompt(){
 const langs={de:'German',en:'English',tr:'Turkish',ko:'Korean',ja:'Japanese',es:'Spanish',fr:'French'};
 const target={ko:'Korean',de:'German',en:'English'}[wjTarget]||'Korean';
 const level=wjTarget==='ko'?state.level:wjWorldLevel;
 return 'You are Woo Jin, a thoughtful, friendly Korean character and real conversational learning companion. '+
 'Hold a natural conversation like a helpful person, not a scripted menu. Respond thoughtfully to any reasonable topic, remember context in this exchange, ask occasional relevant questions, and be warm without repetitive praise. '+
 'The user is learning '+target+' at CEFR level '+level+'. Their interface language is '+(langs[v27Lang]||'German')+'. '+
 'Normally respond in that interface language. Help them practise '+target+' when appropriate, give natural examples, correct mistakes gently and only when relevant. '+
 'Important: when showing Korean examples use ONLY Latin romanization, NEVER Hangul; use Japanese or other native scripts only if the user is learning those languages. '+
 'Do not invent personal memories, never claim to be human, and admit uncertainty. Keep responses concise, generally 1–4 sentences. If the user asks to chat casually, do so rather than forcing a lesson.';
}
function wjOpenMessages(){
 const hist=wjTarget==='ko'?
  wjHistory.slice(-18).map(x=>({role:x.who==='me'?'user':'assistant',content:x.who==='me'?x.ko:[x.ko,x.de].filter(Boolean).join(' — ')})):
  (wjWorldChatData[wjTarget]||[]).slice(-18).map(x=>({role:x.role==='user'?'user':'assistant',content:x.text}));
 return [{role:'system',content:wjOpenSystemPrompt()},...hist.filter(x=>x.content)];
}
async function wjOpenLocalReply(messages){
 const result=await wjOpenChat.engine.chat.completions.create({messages,temperature:.7,max_tokens:240,top_p:.9});
 return String(result?.choices?.[0]?.message?.content||'').replace(/<think>[\s\S]*?<\/think>/gi,'').trim();
}
async function wjOpenServerReply(messages){
 const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),22000);
 try{
  const response=await fetch('/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({messages}),signal:controller.signal});
  if(!response.ok)throw new Error('Servermodell nicht verfügbar');
  const json=await response.json();return String(json.answer||'').trim();
 }finally{clearTimeout(timer)}
}
async function wjOpenReply(){
 const msgs=wjOpenMessages();
 if(wjOpenChat.backend){try{const text=await wjOpenServerReply(msgs);if(text)return text}catch(e){wjOpenChat.error='Servermodell momentan nicht erreichbar';wjOpenChat.backend=false}}
 if(wjOpenChat.localReady){const result=await wjOpenLocalReply(msgs);if(result)return result}
 throw Error('Kein freies Modell gestartet');
}
async function wjOpenStart(){
 if(wjOpenChat.localReady||wjOpenChat.loading)return;
 if(wjOpenChat.backend){wjOpenRefresh();return}
 if(!navigator.gpu){wjOpenChat.error='WebGPU fehlt. Die Offline-Übungen funktionieren weiter; für freien KI-Chat ist ein kompatibler Browser nötig.';wjOpenRefresh();return}
 if(!confirm('Ein kostenloses lokales Sprachmodell laden? Etwa 400 MB oder mehr Download; kann Akku und Gerätespeicher beanspruchen. Keine bezahlte API.'))return;
 wjOpenChat.loading=true;wjOpenChat.error='';wjOpenChat.status='Prüfe KI-Modell …';wjOpenRefresh();
 try{
  const {CreateMLCEngine,prebuiltAppConfig}=await import('https://esm.sh/@mlc-ai/web-llm@0.2.85?bundle');
  const model=prebuiltAppConfig?.model_list?.find(x=>x.model_id===wjOpenChat.modelId)||prebuiltAppConfig?.model_list?.find(x=>x.model_id==='Qwen2-0.5B-Instruct-q4f16_1-MLC');
  if(!model)throw Error('Kein kleines unterstütztes Modell gefunden');
  wjOpenChat.modelId=model.model_id;
  wjOpenChat.engine=await CreateMLCEngine(wjOpenChat.modelId,{
   initProgressCallback:p=>{wjOpenChat.status='Lade KI-Modell · '+Math.round(Math.max(0,Math.min(1,Number(p.progress)||0))*100)+'%';wjOpenRefresh();}
  });
  wjOpenChat.localReady=true;wjOpenChat.status='KI bereit';
 }catch(e){
  wjOpenChat.localReady=false;wjOpenChat.engine=null;wjOpenChat.error='KI nicht gestartet: '+String(e?.message||e).slice(0,95)+'. Offline-Chat bleibt verfügbar.';
 }finally{wjOpenChat.loading=false;wjOpenRefresh()}
}
async function wjOpenTypeMessage(text){
 const chat=document.getElementById(wjTarget==='ko'?'wjChat':'wj-world-chat');
 if(!chat)return;
 const bubble=document.createElement('div');
 bubble.className=wjTarget==='ko'?'wj-message theirs wj-open-preview':'wj-world-msg bot wj-open-preview';
 bubble.innerHTML=wjTarget==='ko'?'<span class="wj-avatar-mini"><img src="woo-jin-pixel.svg" alt=""></span><div class="wj-bubble"><div class="wj-korean"></div></div>':'<strong>Woo Jin</strong><p></p>';
 const node=bubble.querySelector(wjTarget==='ko'?'.wj-korean':'p');
 chat.appendChild(bubble);
 const chars=Array.from(text),chunk=Math.max(1,Math.ceil(chars.length/125));
 let i=0;
 while(i<chars.length&&bubble.isConnected){
  i=Math.min(chars.length,i+chunk);node.textContent=chars.slice(0,i).join('');chat.scrollTop=chat.scrollHeight;
  await new Promise(r=>setTimeout(r,14));
 }
 bubble.remove();
}
