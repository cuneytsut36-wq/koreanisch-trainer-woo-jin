import http from 'node:http';
import {readFile, stat} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const ROOT=path.dirname(fileURLToPath(import.meta.url));
const PORT=Number(process.env.PORT||3000);
const MODEL=process.env.OPENAI_MODEL||'gpt-4.1-mini';
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.webp':'image/webp','.svg':'image/svg+xml','.webmanifest':'application/manifest+json','.txt':'text/plain; charset=utf-8'};
const LIMIT=20_000;
const counters=new Map();
const reply=(res,status,body)=>{res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});res.end(JSON.stringify(body))};
const system=`Du bist Woo Jin, ein erfundener, ruhiger, loyaler, manchmal trockener koreanischer Lerncoach aus Seoul. Du bist eine KI-Figur, keine echte Person. Sprich freundlich, direkt und respektvoll, mit dezenten, natürlichen Reaktionen. Du unterrichtest Koreanisch auf Deutsch. Koreanische Wörter und Sätze IMMER ausschließlich in lateinischer Umschrift schreiben, niemals Hangul, auch nicht als Beispiel oder in Klammern. Erkläre auf Deutsch. Passe dich dem Lernniveau an. Stelle oft eine passende Rückfrage oder Rollenspiel-Frage, korrigiere freundlich und konkret. Bei Unsicherheit nicht halluzinieren. Antworte ausschließlich als JSON-Objekt mit zwei String-Feldern ko und de. ko enthält 1 bis 3 kurze koreanische Sätze in lateinischer Umschrift; de enthält deutsche Übersetzung, Erläuterung und gegebenenfalls die nächste Frage. Keine Markdown-Codeblöcke. Keine Behauptungen über persönliche reale Erlebnisse.`;
async function bodyJSON(req){let text='';for await(const c of req){text+=c;if(text.length>LIMIT)throw Error('Anfrage zu groß')}return JSON.parse(text)}
async function chat(req,res){
 if(!process.env.OPENAI_API_KEY)return reply(res,503,{error:'OPENAI_API_KEY fehlt auf dem Server'});
 const ip=req.socket.remoteAddress||'unknown',now=Date.now();const data=counters.get(ip)||[];const recent=data.filter(t=>now-t<60_000);if(recent.length>=15)return reply(res,429,{error:'Zu viele Anfragen. Bitte kurz warten.'});recent.push(now);counters.set(ip,recent);
 let payload;try{payload=await bodyJSON(req)}catch{return reply(res,400,{error:'Ungültige Anfrage'})}
 const message=typeof payload.message==='string'?payload.message.trim().slice(0,1000):'';
 if(!message)return reply(res,400,{error:'Nachricht fehlt'});
 const allowed=['cafe','reise','freunde','arbeit'];const scene=allowed.includes(payload.scene)?payload.scene:'cafe';
 const level=['A1','A2','B1','B2','C1','C2'].includes(payload.level)?payload.level:'A1';
 const mood=['calm','coach','friendly'].includes(payload.mood)?payload.mood:'calm';
 const history=Array.isArray(payload.history)?payload.history.slice(-10):[];
 const context=history.filter(x=>x&&typeof x.ko==='string'&&['bot','me'].includes(x.who)).map(x=>({role:x.who==='bot'?'assistant':'user',content:String(x.ko).slice(0,600)+(x.who==='bot'?' / '+String(x.de||'').slice(0,600):'')}));
 const controller=new AbortController();const timeout=setTimeout(()=>controller.abort(),35_000);
 try{
  const r=await fetch('https://api.openai.com/v1/responses',{method:'POST',headers:{'Authorization':`Bearer ${process.env.OPENAI_API_KEY}`,'Content-Type':'application/json'},signal:controller.signal,body:JSON.stringify({model:MODEL,store:false,max_output_tokens:400,instructions:system+`\nLernniveau: ${level}. Szene: ${scene}. Stimmung: ${mood}.`,input:[{role:'developer',content:'Antworte als JSON-Objekt mit den String-Feldern ko und de. Koreanisch nur in lateinischer Umschrift.'},...context,{role:'user',content:message}],text:{format:{type:'json_object'}}})});
  if(!r.ok){const e=await r.text();console.error('OpenAI error',r.status,e.slice(0,350));return reply(res,502,{error:r.status===401?'API-Schlüssel ungültig':r.status===429?'API-Kontingent oder Limit erreicht':'KI-Dienst derzeit nicht erreichbar'})}
  const out=await r.json();const text=out.output_text||out.output?.flatMap(x=>x.content||[]).filter(x=>x.type==='output_text').map(x=>x.text).join('')||'';
  let answer;try{answer=JSON.parse(text)}catch{return reply(res,502,{error:'KI-Antwort konnte nicht gelesen werden'})}
  if(typeof answer.ko!=='string'||typeof answer.de!=='string')return reply(res,502,{error:'Ungültige KI-Antwort'});
  // Guard: never display Hangul in this romanization-only app
  answer.ko=answer.ko.replace(/[\u1100-\u11ff\u3130-\u318f\uac00-\ud7af]/g,'').trim();
  answer.de=answer.de.replace(/[\u1100-\u11ff\u3130-\u318f\uac00-\ud7af]/g,'').trim();
  reply(res,200,{ko:answer.ko.slice(0,1200),de:answer.de.slice(0,1600)})
 }catch(e){console.error('Chat error:',e.message);reply(res,502,{error:'KI-Anfrage fehlgeschlagen oder Zeitüberschreitung'})}finally{clearTimeout(timeout)}
}
const server=http.createServer(async(req,res)=>{
 const pathname=new URL(req.url||'/',`http://${req.headers.host||'localhost'}`).pathname;
 if(pathname==='/api/status'&&req.method==='GET')return reply(res,200,{ready:!!process.env.OPENAI_API_KEY,mode:process.env.OPENAI_API_KEY?'openai':'offline'});
 if(pathname==='/api/woo-jin'&&req.method==='POST')return chat(req,res);
 if(req.method!=='GET'&&req.method!=='HEAD')return reply(res,405,{error:'Methode nicht erlaubt'});
 let filename=pathname==='/'?'/index.html':pathname;
 if(!/^\/[a-zA-Z0-9_.\/-]+$/.test(filename)||filename.includes('..')||filename.startsWith('/server.')||filename.startsWith('/.'))return reply(res,404,{error:'Nicht gefunden'});
 const filepath=path.join(ROOT,filename);
 try{const file=await readFile(filepath);res.writeHead(200,{'Content-Type':mime[path.extname(filepath)]||'application/octet-stream','X-Content-Type-Options':'nosniff'});res.end(req.method==='HEAD'?undefined:file)}catch{reply(res,404,{error:'Nicht gefunden'})}
});
server.listen(PORT,'0.0.0.0',()=>console.log(`Woo Jin App: http://localhost:${PORT} | KI ${process.env.OPENAI_API_KEY?'aktiv':'noch nicht konfiguriert'}`));
