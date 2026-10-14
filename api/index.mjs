import {createApp} from '../server/app.mjs';
let appPromise;
export default async function handler(req,res){
  try{appPromise ||= createApp();const app=await appPromise;return app(req,res);}catch{res.statusCode=503;res.setHeader('Content-Type','application/json');res.end(JSON.stringify({error:'Configure the wedding service environment before continuing.'}));}
}
