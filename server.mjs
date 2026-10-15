import http from 'node:http';
import {readFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const ROOT=path.dirname(fileURLToPath(import.meta.url));
const PORT=Number(process.env.PORT||3000);
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.webp':'image/webp','.png':'image/png','.jpeg':'image/jpeg','.jpg':'image/jpeg','.mp3':'audio/mpeg','.svg':'image/svg+xml','.webmanifest':'application/manifest+json','.txt':'text/plain; charset=utf-8'};
const respond=(res,status,data)=>{res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});res.end(JSON.stringify(data))};
const server=http.createServer(async(req,res)=>{
 const pathname=new URL(req.url||'/',`http://${req.headers.host||'localhost'}`).pathname;
 if(pathname==='/api/status')return respond(res,200,{ready:true,mode:'offline',voice:'device',ai:false});
 if(pathname.startsWith('/api/'))return respond(res,410,{error:'Cloud-KI wurde entfernt. Woo Jin funktioniert lokal und kostenlos.'});
 if(req.method!=='GET'&&req.method!=='HEAD')return respond(res,405,{error:'Methode nicht erlaubt'});
 const filename=pathname==='/'?'/index.html':pathname;
 if(!/^\/[a-zA-Z0-9_.\/-]+$/.test(filename)||filename.includes('..')||filename.startsWith('/server.')||filename.startsWith('/.'))return respond(res,404,{error:'Nicht gefunden'});
 try{const buffer=await readFile(path.join(ROOT,filename));res.writeHead(200,{'Content-Type':mime[path.extname(filename)]||'application/octet-stream','X-Content-Type-Options':'nosniff','Cache-Control':filename==='/index.html'?'no-cache':'public, max-age=3600'});res.end(req.method==='HEAD'?undefined:buffer)}catch{return respond(res,404,{error:'Nicht gefunden'})}
});
server.listen(PORT,'0.0.0.0',()=>console.log(`Woo Jin Offline Lerncoach auf Port ${PORT} · keine KI-API`));
