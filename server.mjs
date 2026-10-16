import http from 'node:http';
import {readFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const ROOT=path.dirname(fileURLToPath(import.meta.url));
const PORT=Number(process.env.PORT||3000);
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.webp':'image/webp','.png':'image/png','.jpeg':'image/jpeg','.jpg':'image/jpeg','.mp3':'audio/mpeg','.svg':'image/svg+xml','.webmanifest':'application/manifest+json','.txt':'text/plain; charset=utf-8'};
const respond=(res,status,data)=>{res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});res.end(JSON.stringify(data))};
const aiUsage=new Map();
const server=http.createServer(async(req,res)=>{
 const pathname=new URL(req.url||'/',`http://${req.headers.host||'localhost'}`).pathname;
 const enabled=!!process.env.WJ_AI_API_KEY;
 if(pathname==='/api/status')return respond(res,200,{ready:true,mode:enabled?'connected':'offline',voice:'device',ai:enabled});
 if(pathname==='/api/chat'&&req.method==='POST'){
  if(!enabled)return respond(res,503,{error:'Kein serverseitiges KI-Modell eingerichtet. Lokalen Browsermodus nutzen.'});
  const ip=String(req.headers['x-forwarded-for']||req.socket.remoteAddress||'unknown').split(',')[0].slice(0,80);
  const now=Date.now(),usage=aiUsage.get(ip)||{window:now,count:0};
  if(now-usage.window>60000){usage.window=now;usage.count=0}
  usage.count++;aiUsage.set(ip,usage);
  if(usage.count>8)return respond(res,429,{error:'Zu viele Anfragen. Bitte später erneut versuchen.'});
  let body='';
  try{for await(const chunk of req){body+=chunk.toString('utf8');if(body.length>16000)throw Error('Eingabe zu lang')}}catch{return respond(res,413,{error:'Nachricht zu lang'})}
  try{
   const payload=JSON.parse(body);
   if(!Array.isArray(payload.messages))throw Error('messages');
   const msgs=payload.messages.slice(-17).filter(m=>['system','user','assistant'].includes(m.role)&&typeof m.content==='string'&&m.content.length<=2000).map(m=>({role:m.role,content:m.content}));
   if(msgs.length<2||msgs[0].role!=='system')throw Error('conversation');
   msgs[0]={role:'system',content:msgs[0].content.slice(0,1300)};
   const ctrl=new AbortController(),timer=setTimeout(()=>ctrl.abort(),21000);
   let upstream;
   try{upstream=await fetch('https://api.groq.com/openai/v1/chat/completions',{method:'POST',headers:{'Authorization':'Bearer '+process.env.WJ_AI_API_KEY,'Content-Type':'application/json'},body:JSON.stringify({model:process.env.WJ_AI_MODEL||'openai/gpt-oss-20b',messages:msgs,temperature:.62,max_tokens:450,stream:false}),signal:ctrl.signal})}finally{clearTimeout(timer)}
   if(!upstream.ok)return respond(res,502,{error:'KI-Anbieter gerade nicht erreichbar'});
   const data=await upstream.json(),answer=String(data.choices?.[0]?.message?.content||'').trim().slice(0,2500);
   return respond(res,200,{answer});
  }catch{return respond(res,502,{error:'KI-Verbindung fehlgeschlagen'})}
 }
 if(pathname.startsWith('/api/'))return respond(res,404,{error:'Unbekannte API'});
 if(req.method!=='GET'&&req.method!=='HEAD')return respond(res,405,{error:'Methode nicht erlaubt'});
 const filename=pathname==='/'?'/index.html':pathname;
 if(!/^\/[a-zA-Z0-9_.\/-]+$/.test(filename)||filename.includes('..')||filename.startsWith('/server.')||filename.startsWith('/.'))return respond(res,404,{error:'Nicht gefunden'});
 try{const buffer=await readFile(path.join(ROOT,filename));res.writeHead(200,{'Content-Type':mime[path.extname(filename)]||'application/octet-stream','X-Content-Type-Options':'nosniff','Cache-Control':filename==='/index.html'?'no-cache':'public, max-age=3600'});res.end(req.method==='HEAD'?undefined:buffer)}catch{return respond(res,404,{error:'Nicht gefunden'})}
});
server.listen(PORT,'0.0.0.0',()=>console.log(`Woo Jin auf Port ${PORT} · KI optional serverseitig`));
