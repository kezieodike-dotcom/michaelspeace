import {readFile, writeFile, mkdir, rename} from 'node:fs/promises';
import {dirname} from 'node:path';
import {randomUUID} from 'node:crypto';
let createClient;
export async function supabaseRepository(url,key,publishable){({createClient}=await import('@supabase/supabase-js'));return new SupabaseRepository(url,key,publishable);}
import {emptyDatabase, WEDDING_ID} from './defaults.mjs';
import {ApiError, assertInvitation, responseInput} from './validation.mjs';
const tables={guests:'guests',rsvps:'rsvps',gallery:'gallery_images',stories:'love_story_entries',wishes:'wishes'};
const camelKey=s=>s.replace(/_([a-z])/g,(_,c)=>c.toUpperCase());
const snakeKey=s=>s.replace(/[A-Z]/g,c=>'_'+c.toLowerCase());
const camel=row=>Object.fromEntries(Object.entries(row).map(([k,v])=>[camelKey(k),v]));
const snake=row=>Object.fromEntries(Object.entries(row).map(([k,v])=>[snakeKey(k),v]));
function checked(result){if(result.error){console.error('[Database]',result.error.code);throw new ApiError(503,'The wedding service is temporarily unavailable. Please try again.');}return result.data;}
export class LocalRepository {
  constructor(file){this.file=file;this.queue=Promise.resolve();this.demo=true;}
  async init(){try{this.data=JSON.parse(await readFile(this.file,'utf8'));}catch(e){if(e.code!=='ENOENT')throw e;this.data=emptyDatabase();await this.persist();}}
  async persist(){await mkdir(dirname(this.file),{recursive:true});const tmp=this.file+'.tmp';await writeFile(tmp,JSON.stringify(this.data,null,2));await rename(tmp,this.file);}
  async mutate(work){const operation=this.queue.then(async()=>{const result=work(this.data);await this.persist();return structuredClone(result);});this.queue=operation.catch(()=>{});return operation;}
  async config(){await this.queue;return structuredClone(this.data.config);}
  async list(type){await this.queue;return structuredClone(this.data[type]);}
  async byToken(hash){await this.queue;return structuredClone(this.data.guests.find(g=>g.invitationTokenHash===hash)||null);}
  async insert(type,fields){return this.mutate(db=>{const row={id:randomUUID(),weddingId:WEDDING_ID,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString(),...fields};db[type].push(row);return row;});}
  async update(type,id,fields){return this.mutate(db=>{const row=db[type].find(r=>r.id===id);if(!row)throw new ApiError(404,'Record not found.');Object.assign(row,fields,{updatedAt:new Date().toISOString()});return row;});}
  async remove(type,id){return this.mutate(db=>{db[type]=db[type].filter(r=>r.id!==id);if(type==='guests')db.rsvps=db.rsvps.filter(r=>r.guestId!==id);return {success:true};});}
  async settings(fields){return this.mutate(db=>Object.assign(db.config,fields));}
  async submit(hash,body){return this.mutate(db=>{const guest=db.guests.find(g=>g.invitationTokenHash===hash);assertInvitation(guest,db.config);let row=db.rsvps.find(r=>r.guestId===guest.id);const updated=!!row;if(updated&&!db.config.featureSettings.allowRsvpUpdates)throw new ApiError(400,'Response updates are closed. Please contact the wedding team.');const response=responseInput(body,guest,db.config);const now=new Date().toISOString();if(row)Object.assign(row,response,{updatedAt:now});else{row={id:randomUUID(),...response,submittedAt:now,updatedAt:now};db.rsvps.push(row);}guest.invitationStatus='responded';guest.updatedAt=now;return {rsvp:row,updated,guest};});}
  async galleryUrls(rows){return rows.map(row=>({...row,url:'/api/media/'+row.id}));}
  async upload(bytes,contentType){return {storagePath:randomUUID(),imageData:bytes.toString('base64'),contentType};}
}
export class SupabaseRepository {
  constructor(url,key,publishable){this.demo=false;this.url=url;this.publishable=publishable;this.client=createClient(url,key,{auth:{persistSession:false,autoRefreshToken:false,detectSessionInUrl:false}});}
  authClient(){return createClient(this.url,this.publishable,{auth:{persistSession:false,autoRefreshToken:false,detectSessionInUrl:false}});}
  async config(){return camel(checked(await this.client.from('weddings').select('*').eq('id',WEDDING_ID).single()));}
  async list(type){let q=this.client.from(tables[type]).select('*');if(type==='rsvps')q=this.client.from('rsvps').select('*, guests!inner(wedding_id)').eq('guests.wedding_id',WEDDING_ID);else q=q.eq('wedding_id',WEDDING_ID);return checked(await q).map(row=>{const r=camel(row);delete r.guests;return r;});}
  async byToken(hash){const row=checked(await this.client.from('guests').select('*').eq('wedding_id',WEDDING_ID).eq('invitation_token_hash',hash).maybeSingle());return row?camel(row):null;}
  async insert(type,fields){return camel(checked(await this.client.from(tables[type]).insert(snake({weddingId:WEDDING_ID,...fields})).select().single()));}
  async update(type,id,fields){return camel(checked(await this.client.from(tables[type]).update(snake({...fields,updatedAt:new Date().toISOString()})).eq('id',id).eq('wedding_id',WEDDING_ID).select().single()));}
  async remove(type,id){if(type==='gallery'){const row=(await this.list('gallery')).find(r=>r.id===id);checked(await this.client.from(tables[type]).delete().eq('id',id).eq('wedding_id',WEDDING_ID));if(row?.storagePath)checked(await this.client.storage.from('wedding-photos').remove([row.storagePath]));}else checked(await this.client.from(tables[type]).delete().eq('id',id).eq('wedding_id',WEDDING_ID));return {success:true};}
  async settings(fields){const {rsvpDeadline,...rest}=fields;const data={...rest,...('rsvpDeadline' in fields?{rsvpDeadline:rsvpDeadline||null}:{})};return camel(checked(await this.client.from('weddings').update(snake(data)).eq('id',WEDDING_ID).select().single()));}
  async submit(hash,body){const {data,error}=await this.client.rpc('submit_wedding_rsvp',{p_wedding_id:WEDDING_ID,p_hash:hash,p_status:body.attendanceStatus,p_count:body.attendeeCount,p_meal:body.mealPreference||null,p_accessibility:body.accessibilityRequest||null,p_note:body.privateMessage||null});if(error){if(error.code==='P0001'||error.code==='23514')throw new ApiError(400,'This response could not be accepted. Check your invitation, attendance limit, and RSVP deadline.');checked({error});}return {rsvp:camel(data.rsvp),updated:data.updated,guest:await this.byToken(hash)};}
  async galleryUrls(rows){return await Promise.all(rows.map(async row=>{if(!row.storagePath)return {...row,url:''};const data=checked(await this.client.storage.from('wedding-photos').createSignedUrl(row.storagePath,300));return {...row,url:data.signedUrl};}));}
  async upload(bytes,contentType){const suffix={'image/jpeg':'jpg','image/png':'png','image/webp':'webp'}[contentType];const storagePath=WEDDING_ID+'/'+randomUUID()+'.'+suffix;checked(await this.client.storage.from('wedding-photos').upload(storagePath,bytes,{contentType,upsert:false,cacheControl:'300'}));return {storagePath};}
  async profile(userId){return checked(await this.client.from('admin_profiles').select('*').eq('user_id',userId).eq('wedding_id',WEDDING_ID).in('role',['super_admin','coordinator']).maybeSingle());}
  async limit(key,max,seconds){return checked(await this.client.rpc('consume_wedding_rate_limit',{p_key:key,p_limit:max,p_seconds:seconds}));}
}
