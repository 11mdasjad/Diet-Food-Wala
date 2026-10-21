import http from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import path from 'node:path';
const root=process.cwd(),port=Number(process.env.PORT)||3000;
const mime={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.json':'application/json','.jpg':'image/jpeg','.webp':'image/webp','.svg':'image/svg+xml','.xml':'application/xml','.txt':'text/plain','.woff2':'font/woff2'};
http.createServer(async(req,res)=>{try{const url=new URL(req.url,'http://localhost');const decoded=decodeURIComponent(url.pathname);const filename=path.resolve(root,'.'+decoded+(decoded.endsWith('/')?'index.html':''));if(!filename.startsWith(root+path.sep)||decoded.split('/').some(x=>x.startsWith('.'))){res.writeHead(403);res.end('Forbidden');return;}const file=await stat(filename);if(!file.isFile())throw new Error('Not a file');res.writeHead(200,{'Content-Type':mime[path.extname(filename)]||'application/octet-stream','X-Content-Type-Options':'nosniff'});res.end(await readFile(filename));}catch{res.writeHead(404,{'Content-Type':'text/plain'});res.end('Page not found');}}).listen(port,'127.0.0.1',()=>console.log(`Diet Food Wala preview: http://127.0.0.1:${port}`));
