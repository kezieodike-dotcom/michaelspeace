import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp, rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
const api=await import('../server/app.mjs').catch(() => ({}));
test('server-backed invitation and administrator workflows', async t => {
  assert.equal(typeof api.createApp, 'function', 'secure API must replace the demo server');
  const dir=await mkdtemp(join(tmpdir(),'mp-test-'));
  const app=await api.createApp({demo:true,dbFile:join(dir,'db.json'),adminEmail:'test@example.com',adminPassword:'A-test-password-784!',siteUrl:'http://localhost',rateLimit:1000});
  const server=app.listen(0,'127.0.0.1'); await new Promise(r=>server.once('listening',r));
  const base='http://127.0.0.1:'+server.address().port;
  let cookie='';
  async function req(path,method='GET',body,auth=false,origin='http://localhost'){
    const res=await fetch(base+'/api'+path,{method,headers:{'Content-Type':'application/json','Origin':origin,...(auth?{Cookie:cookie}:{})},...(body!==undefined?{body:JSON.stringify(body)}:{})});
    if(res.headers.get('set-cookie'))cookie=res.headers.get('set-cookie').split(';')[0];
    const text=await res.text();let data;try{data=JSON.parse(text)}catch{data=text}return {status:res.status,data};
  }
  try {
    await t.test('public data has confirmed details and no private/demo content',async()=>{
      const r=await req('/public');assert.equal(r.status,200);assert.equal(r.data.config.ceremonyIsoTimestamp,'2026-11-07T10:00:00+01:00');assert.deepEqual(r.data.config.contactNumbers,['08114203510','07082975978','08148756975']);assert.equal(r.data.config.rsvpDeadline,'');assert.equal(r.data.config.dressCode,'');assert.deepEqual(r.data.gallery,[]);assert.deepEqual(r.data.stories,[]);assert.ok(!('guests' in r.data));
    });
    await t.test('all administrator reads and writes reject unauthenticated visitors',async()=>{
      for(const p of ['/admin/data','/admin/export-csv','/admin/me'])assert.equal((await req(p)).status,401);
      assert.equal((await req('/admin/guests','POST',{fullName:'Intruder',maxAttendees:1})).status,401);
    });
    await t.test('cross-origin mutations are rejected',async()=>{assert.equal((await req('/wishes','POST',{displayName:'Visitor',message:'Congratulations to you both!'},false,'https://evil.example')).status,403)});
    await t.test('known former hardcoded admin password no longer works',async()=>{assert.equal((await req('/admin/login','POST',{email:'admin@michealspeace.com',password:'michealspeace2026'})).status,401)});
    await t.test('authorized local-only test administrator can sign in',async()=>{assert.equal((await req('/admin/login','POST',{email:'test@example.com',password:'A-test-password-784!'})).status,200);assert.equal((await req('/admin/me','GET',undefined,true)).status,200)});
    let guest,token;
    await t.test('admin creates a guest and receives a secure invitation only once',async()=>{const r=await req('/admin/guests','POST',{fullName:'Fictional Test Party',maxAttendees:2,email:'fictional@example.com'},true);assert.equal(r.status,201);guest=r.data.guest;token=r.data.token;assert.match(token,/^[A-Za-z0-9_-]{43}$/);const data=(await req('/admin/data','GET',undefined,true)).data;assert.ok(!JSON.stringify(data).includes(token));assert.ok(!JSON.stringify(data).includes('invitationTokenHash'))});
    await t.test('invalid invitations return no guest records',async()=>{const r=await req('/invitations/verify','POST',{token:'bad'});assert.equal(r.status,400);assert.ok(!r.data.fullName)});
    await t.test('verified invitation exposes only its party and permitted seats',async()=>{const r=await req('/invitations/verify','POST',{token});assert.equal(r.status,200);assert.equal(r.data.guest.maxAttendees,2);assert.ok(!r.data.guest.email);assert.ok(!r.data.guest.phone)});
    await t.test('attendee overflow, fractions, and tampered IDs are rejected',async()=>{for(const count of [3,1.5,-1])assert.equal((await req('/rsvp','POST',{token,guestId:'other',attendanceStatus:'attending',attendeeCount:count})).status,400)});
    await t.test('RSVP is persisted despite missing email configuration',async()=>{const r=await req('/rsvp','POST',{token,attendanceStatus:'attending',attendeeCount:2});assert.equal(r.status,200);assert.equal(r.data.email.status,'not_configured');assert.equal(r.data.rsvp.attendeeCount,2)});
    await t.test('simultaneous repeat submissions create one response',async()=>{await Promise.all(Array.from({length:4},()=>req('/rsvp','POST',{token,attendanceStatus:'declined',attendeeCount:0})));const data=(await req('/admin/data','GET',undefined,true)).data;assert.equal(data.rsvps.length,1);assert.equal(data.rsvps[0].attendanceStatus,'declined')});
    await t.test('revoked invitations cannot read or update their response',async()=>{assert.equal((await req('/admin/guests/'+guest.id,'PATCH',{invitationStatus:'revoked'},true)).status,200);assert.equal((await req('/invitations/verify','POST',{token})).status,400);assert.equal((await req('/rsvp','POST',{token,attendanceStatus:'attending',attendeeCount:1})).status,400)});
    await t.test('rotation invalidates the old invitation',async()=>{const r=await req('/admin/guests/'+guest.id+'/rotate','POST',{},true);assert.equal(r.status,200);assert.notEqual(r.data.token,token);assert.equal((await req('/invitations/verify','POST',{token})).status,400);token=r.data.token;assert.equal((await req('/invitations/verify','POST',{token})).status,200)});
    await t.test('expired invitations are rejected',async()=>{await req('/admin/guests/'+guest.id,'PATCH',{invitationExpiry:'2020-01-01T00:00:00Z'},true);assert.equal((await req('/invitations/verify','POST',{token})).status,400);await req('/admin/guests/'+guest.id,'PATCH',{invitationExpiry:null},true)});
    await t.test('RSVP deadline is enforced by the server',async()=>{await req('/admin/settings','PATCH',{rsvpDeadline:'2020-01-01T00:00:00Z'},true);assert.equal((await req('/rsvp','POST',{token,attendanceStatus:'attending',attendeeCount:1})).status,400);await req('/admin/settings','PATCH',{rsvpDeadline:''},true)});
    await t.test('wishes require valid lengths and approval before publication',async()=>{assert.equal((await req('/wishes','POST',{displayName:'',message:'x'})).status,400);const r=await req('/wishes','POST',{displayName:'Fictional test visitor',message:'Congratulations, Peace and Micheal!'});assert.equal(r.status,201);assert.equal((await req('/public')).data.wishes.length,0);const wish=(await req('/admin/data','GET',undefined,true)).data.wishes[0];await req('/admin/wishes/'+wish.id,'PATCH',{moderationStatus:'approved'},true);assert.equal((await req('/public')).data.wishes.length,1)});
    await t.test('unpublished story content is private',async()=>{const r=await req('/admin/story','POST',{title:'Fictional test milestone',content:'Test content only',displayOrder:0,published:false},true);assert.equal(r.status,201);assert.equal((await req('/public')).data.stories.length,0);await req('/admin/story/'+r.data.id,'PATCH',{published:true},true);assert.equal((await req('/public')).data.stories.length,1)});
    await t.test('CSV export is authenticated and neutralizes spreadsheet formulas',async()=>{await req('/admin/guests/'+guest.id,'PATCH',{fullName:'=SUM(1,2)'},true);const r=await req('/admin/export-csv','GET',undefined,true);assert.equal(r.status,200);assert.ok(r.data.includes("'=SUM(1,2)"));assert.ok(!r.data.includes(token))});
    await t.test('invalid image uploads are rejected',async()=>{assert.equal((await req('/admin/gallery/upload','POST',{data:'YWJj',contentType:'image/jpeg',caption:'Test',altText:'Test'},true)).status,400)});
    await t.test('logout invalidates the administrator session',async()=>{assert.equal((await req('/admin/logout','POST',{},true)).status,200);assert.equal((await req('/admin/data','GET',undefined,true)).status,401)});
  } finally {await new Promise(r=>server.close(r));await rm(dir,{recursive:true,force:true})}
});
