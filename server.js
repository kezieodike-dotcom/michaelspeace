import 'dotenv/config';
import express from 'express';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createApp} from './server/app.mjs';
const root=path.dirname(fileURLToPath(import.meta.url));
const app=await createApp();
if(process.env.NODE_ENV==='production')app.use(express.static(path.join(root,'dist')));
else {const {createServer}=await import('vite');const vite=await createServer({server:{middlewareMode:true},appType:'spa'});app.use(vite.middlewares);}
if(process.env.NODE_ENV==='production')app.get('*',(req,res)=>res.sendFile(path.join(root,'dist','index.html')));
const port=Number(process.env.PORT)||3000;
app.listen(port,'0.0.0.0',()=>console.log('Micheal’sPeace running at http://localhost:'+port));
