/* LinguaWorld V54: Woo Jin greets once, then rests motionless for at least 60 seconds.
   Uses a 10-second forward-and-back segment of the existing 20-second clip. */
(function(){
'use strict';
const VID="https://d2ol7oe51mr4n9.cloudfront.net/user_3KgDSNgRcYHCEkF9DO7qAnjsYND/35bd4e71-d0b7-42b3-8d8f-4b5f2e5a26aa.mp4", POSTER="https://d8j0ntlcm91z4.cloudfront.net/user_3KgDSNgRcYHCEkF9DO7qAnjsYND/hf_20261016_092745_deade43d-0db4-4429-92a3-6c1128d65db1.png";
const words={
 de:{label:'Woo Jin – interaktiver KI-Avatar',intro:'Annyeong! Schön, dass du da bist. Wollen wir etwas Koreanisch üben?',greet:'Begrüßen',chat:'KI-Chat',mic:'Sprechen',close:'Schließen',hint:'Tippe auf Woo Jin',listening:'Ich höre zu …',notSupported:'Spracherkennung ist hier nicht verfügbar. Öffne den KI-Chat.',miss:'Ich habe dich nicht verstanden. Versuch es noch einmal.',microphone:'Mikrofon'},
 tr:{label:'Woo Jin – etkileşimli yapay zekâ avatarı',intro:'Annyeong! Bugün biraz Korece çalışalım mı?',greet:'Selamla',chat:'Yapay zekâ sohbeti',mic:'Konuş',close:'Kapat',hint:'Woo Jin’e dokun',listening:'Dinliyorum …',notSupported:'Ses algılama bu tarayıcıda yok. Sohbeti aç.',miss:'Seni anlayamadım. Tekrar deneyelim.',microphone:'Mikrofon'},
 en:{label:'Woo Jin – interactive AI avatar',intro:'Annyeong! Ready to practise some Korean today?',greet:'Say hello',chat:'AI chat',mic:'Speak',close:'Close',hint:'Tap Woo Jin',listening:'Listening …',notSupported:'Speech recognition is unavailable here. Open AI chat.',miss:'I did not catch that. Try again.',microphone:'Microphone'},
 ko:{label:'우진 – 인터랙티브 AI 아바타',intro:'안녕하세요! 오늘도 한국어를 연습해 볼까요?',greet:'인사하기',chat:'AI 채팅',mic:'말하기',close:'닫기',hint:'우진을 눌러보세요',listening:'듣고 있어요 …',notSupported:'음성 인식을 사용할 수 없습니다. AI 채팅을 열어주세요.',miss:'잘 못 들었어요. 다시 말해 주세요.',microphone:'마이크'},
 ja:{label:'ウジン – AI アバター',intro:'アンニョン！今日も韓国語を練習しよう。',greet:'挨拶',chat:'AI チャット',mic:'話す',close:'閉じる',hint:'ウジンをタップ',listening:'聞いています…',notSupported:'音声認識に対応していません。チャットを開いてください。',miss:'聞き取れませんでした。',microphone:'マイク'},
 es:{label:'Woo Jin – avatar de IA',intro:'¡Annyeong! ¿Practicamos un poco de coreano?',greet:'Saludar',chat:'Chat IA',mic:'Hablar',close:'Cerrar',hint:'Toca a Woo Jin',listening:'Escuchando…',notSupported:'El reconocimiento de voz no está disponible. Abre el chat.',miss:'No te entendí. Inténtalo otra vez.',microphone:'Micrófono'},
 fr:{label:'Woo Jin – avatar IA',intro:'Annyeong ! On pratique un peu de coréen ?',greet:'Saluer',chat:'Chat IA',mic:'Parler',close:'Fermer',hint:'Touche Woo Jin',listening:'J’écoute…',notSupported:'La reconnaissance vocale est indisponible. Ouvre le chat.',miss:'Je n’ai pas compris. Réessaie.',microphone:'Micro'}
};
function dict(){let l=typeof v27Lang==='string'?v27Lang:'de';return words[l]||words.de}
function esc(t){return String(t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;')}
let recognition=null;
function close(hero){
 if(recognition){try{recognition.abort()}catch(_){ }recognition=null}
 hero?.classList.remove('lw53-open','lw53-speaking');
 const p=hero?.querySelector('.lw53-panel');if(p){p.hidden=true;p.setAttribute('aria-hidden','true')}
 const btn=hero?.querySelector('.lw53-avatar');if(btn)btn.setAttribute('aria-expanded','false');
}
function speak(hero){
 hero?.querySelector('.lw53-video')?.__lw54Greet?.();
 if(!('speechSynthesis' in window))return;
 try{window.speechSynthesis.cancel();const phrase=new SpeechSynthesisUtterance('안녕하세요! 저는 우진이에요. 같이 한국어를 배워요!');phrase.lang='ko-KR';phrase.rate=.78;phrase.pitch=1;phrase.onstart=()=>hero.classList.add('lw53-speaking');phrase.onend=phrase.onerror=()=>hero.classList.remove('lw53-speaking');window.speechSynthesis.speak(phrase)}catch(e){console.warn('Woo Jin voice',e)}
}
function coach(value){
 close(document.querySelector('#main .lw48-hero'));
 if(typeof go!=='function')return;
 go('wooJin');
 if(!value)return;
 // Send to the existing language coach, not a parallel or fake chat.
 window.setTimeout(()=>{
  try{
    if(typeof wjSend==='function'){wjSend(value);return}
    const input=document.querySelector('#wjInput,#wj-world-input');
    if(input){input.value=value;input.dispatchEvent(new Event('input',{bubbles:true}))}
  }catch(e){console.warn('Woo Jin message',e)}
 },200);
}
function mic(hero){
 const R=window.SpeechRecognition||window.webkitSpeechRecognition;
 const status=hero.querySelector('.lw53-status');const d=dict();
 if(!R){status.textContent=d.notSupported;return}
 if(recognition){try{recognition.abort()}catch(_){}recognition=null;status.textContent='';return}
 try{
  const r=new R();recognition=r;r.lang=typeof wjTarget==='string'&&wjTarget==='de'?'de-DE':typeof wjTarget==='string'&&wjTarget==='en'?'en-US':'ko-KR';
  r.interimResults=false;r.continuous=false;r.maxAlternatives=1;
  r.onstart=()=>{hero.classList.add('lw53-listening');status.textContent=d.listening};
  r.onresult=e=>{const result=e.results?.[0]?.[0]?.transcript?.trim();if(result)coach(result);else status.textContent=d.miss};
  r.onerror=e=>{status.textContent=e.error==='not-allowed'?d.notSupported:d.miss};
  r.onend=()=>{hero.classList.remove('lw53-listening');recognition=null};
  r.start();
 }catch(e){status.textContent=d.notSupported}
}
/* One natural greeting cycle (5 seconds forward, 5 seconds back); never loop continuously. */
const LW54_GREETING_SECONDS=10.08;
const LW54_REST_MILLIS=60000;
function lw54Control(video,hero){
 let stopped=false,replayTimer=null;
 function clearReplay(){if(replayTimer!==null){clearTimeout(replayTimer);replayTimer=null}}
 function scheduleReplay(){
  clearReplay();
  replayTimer=setTimeout(()=>{
   replayTimer=null;
   if(!hero.isConnected){stopped=true;return}
   if(document.hidden){scheduleReplay();return}
   startGreeting();
  },LW54_REST_MILLIS);
 }
 function finishGreeting(){
  if(stopped)return;
  stopped=true;
  video.pause();
  // Keep the last rendered frame displayed while Woo Jin is idle.
  if(video.readyState>=2){try{video.currentTime=Math.min(LW54_GREETING_SECONDS,Math.max(.1,video.duration-.1))}catch(_){}}
  scheduleReplay();
 }
 function startGreeting(){
  if(!hero.isConnected)return;
  clearReplay();stopped=false;
  try{video.currentTime=0}catch(_){}
  const promise=video.play();
  if(promise&&promise.catch)promise.catch(()=>{finishGreeting()});
 }
 video.loop=false;
 video.removeAttribute('loop');
 video.addEventListener('timeupdate',()=>{
  if(!stopped && video.currentTime>=LW54_GREETING_SECONDS-.08)finishGreeting();
 });
 video.addEventListener('ended',finishGreeting);
 video.addEventListener('error',()=>{clearReplay();video.style.display='none'});
 video.__lw54Greet=function(){if(!stopped)return;startGreeting()};
 video.__lw54GetState=()=>({stopped,resting:replayTimer!==null,currentTime:video.currentTime});
 video.addEventListener('loadedmetadata',()=>{if(video.duration>0&&video.duration<LW54_GREETING_SECONDS)console.warn('Woo Jin shorter than greeting segment')},{once:true});
 startGreeting();
}
function install(){
 const hero=document.querySelector('#main .lw48-hero');
 if(!hero||hero.querySelector('.lw53-avatar'))return;
 hero.classList.add('lw53-hero');
 const d=dict();const canAnimate=!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
 const layer=document.createElement('div');layer.className='lw53-motion';layer.setAttribute('aria-hidden','true');
 if(canAnimate){
  const v=document.createElement('video');v.className='lw53-video';v.src=VID;v.poster=POSTER;v.muted=true;v.defaultMuted=true;v.loop=false;v.autoplay=false;v.playsInline=true;v.preload='metadata';v.setAttribute('playsinline','');v.setAttribute('webkit-playsinline','');v.setAttribute('disablepictureinpicture','');
  layer.appendChild(v);
  lw54Control(v,hero);
 }
 const hotspot=document.createElement('button');hotspot.className='lw53-avatar';hotspot.type='button';hotspot.setAttribute('aria-label',d.label);hotspot.setAttribute('aria-expanded','false');hotspot.setAttribute('aria-controls','lw53-panel');hotspot.innerHTML='<span class="lw53-avatar-label"><span class="lw53-dot"></span>Woo Jin <span aria-hidden="true">›</span></span>';
 const panel=document.createElement('section');panel.className='lw53-panel';panel.id='lw53-panel';panel.hidden=true;panel.setAttribute('aria-hidden','true');panel.setAttribute('aria-label',d.label);
 panel.innerHTML='<div class="lw53-panel-top"><strong>Woo Jin</strong><button class="lw53-close" type="button" aria-label="'+esc(d.close)+'">×</button></div><p>'+esc(d.intro)+'</p><div class="lw53-panel-actions"><button type="button" class="lw53-hello">♫ '+esc(d.greet)+'</button><button type="button" class="lw53-talk">🎙 '+esc(d.mic)+'</button><button type="button" class="lw53-coach">'+esc(d.chat)+' →</button></div><p class="lw53-status" role="status" aria-live="polite"></p>';
 hero.prepend(layer);
 hero.append(hotspot,panel);
 hotspot.addEventListener('click',()=>{const open=!hero.classList.contains('lw53-open');if(!open){close(hero);return}hero.classList.add('lw53-open');panel.hidden=false;panel.setAttribute('aria-hidden','false');hotspot.setAttribute('aria-expanded','true');hero.querySelector('.lw53-status').textContent=''});
 panel.querySelector('.lw53-close').addEventListener('click',()=>close(hero));
 panel.querySelector('.lw53-hello').addEventListener('click',()=>speak(hero));
 panel.querySelector('.lw53-talk').addEventListener('click',()=>mic(hero));
 panel.querySelector('.lw53-coach').addEventListener('click',()=>coach());
}
const oldRender=typeof render==='function'?render:null;
if(oldRender){render=function(){let result=oldRender.apply(this,arguments);install();return result}}
window.addEventListener('pagehide',()=>{if(recognition)try{recognition.abort()}catch(_){}});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){const hero=document.querySelector('.lw53-hero');if(hero?.classList.contains('lw53-open'))close(hero)}});
install();
})();