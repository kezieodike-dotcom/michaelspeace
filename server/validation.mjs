import {createHash, randomBytes} from 'node:crypto';
import {formatEvent} from '../src/lib/event.mjs';
export class ApiError extends Error {constructor(status,message){super(message);this.status=status;}}
export const bad = message => {throw new ApiError(400,message);};
export function text(value,label,max=200,required=true){
  if(value == null && !required)return '';
  if(typeof value !== 'string')bad(label + ' must be text.');
  const result=value.trim();
  if((required && !result) || result.length>max || /[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(result))bad(label + ' must contain ' + (required?'1':'0') + '–' + max + ' characters.');
  return result;
}
export function integer(value,label,min,max){if(!Number.isInteger(value)||value<min||value>max)bad(label+' must be a whole number between '+min+' and '+max+'.');return value;}
export function choice(value,allowed,label){if(!allowed.includes(value))bad('Invalid '+label+'.');return value;}
export function flag(value,label){if(typeof value!=='boolean')bad(label+' must be true or false.');return value;}
export function iso(value,label){if(!value)return null;if(typeof value!=='string'||!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2}(\.\d+)?)?(Z|[+-]\d{2}:\d{2})$/.test(value)||!Number.isFinite(Date.parse(value)))bad(label+' must include a date, time, and timezone.');return new Date(value).toISOString();}
export function safeUrl(value,label){const url=text(value,label,2000,false);if(!url)return '';try{if(new URL(url).protocol!=='https:')bad(label+' must use HTTPS.');}catch{bad(label+' must be a valid HTTPS URL.');}return url;}
export const newToken = () => randomBytes(32).toString('base64url');
export const hashToken = token => createHash('sha256').update(token).digest('hex');
export function validateToken(value){const token=text(value,'Invitation',100);if(!/^[A-Za-z0-9_-]{43}$/.test(token))bad('This invitation is unavailable. Please contact the wedding team.');return token;}
export function assertInvitation(guest,config,now=Date.now()){
  if(!guest||['revoked','expired'].includes(guest.invitationStatus)||(guest.invitationExpiry&&Date.parse(guest.invitationExpiry)<=now))bad('This invitation is unavailable. Please contact the wedding team.');
  if(config.rsvpDeadline&&Date.parse(config.rsvpDeadline)<=now)bad('The RSVP deadline has passed. Please contact the wedding team.');
}
export function guestInput(body,partial=false){
  const out={};
  if(!partial||'fullName' in body)out.fullName=text(body.fullName,'Guest name',160);
  if(!partial||'maxAttendees' in body)out.maxAttendees=integer(body.maxAttendees,'Permitted attendees',1,10);
  if('email' in body){out.email=text(body.email,'Email',254,false);if(out.email&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(out.email))bad('Enter a valid email address.');}
  if('phone' in body)out.phone=text(body.phone,'Phone',30,false);
  if('invitationExpiry' in body)out.invitationExpiry=iso(body.invitationExpiry,'Invitation expiry');
  if('invitationStatus' in body)out.invitationStatus=choice(body.invitationStatus,['invited','responded','revoked','expired'],'invitation status');
  return out;
}
export function responseInput(body,guest,config){
  const attendanceStatus=choice(body.attendanceStatus,['attending','declined'],'attendance status');
  const attendeeCount=integer(body.attendeeCount,'Attendee count',attendanceStatus==='attending'?1:0,attendanceStatus==='attending'?guest.maxAttendees:0);
  return {guestId:guest.id,attendanceStatus,attendeeCount,mealPreference:config.featureSettings.mealSelectionEnabled?text(body.mealPreference,'Meal preference',200,false):'',accessibilityRequest:config.featureSettings.accessibilityRequestsEnabled?text(body.accessibilityRequest,'Accessibility request',500,false):'',privateMessage:text(body.privateMessage,'Private note',1000,false)};
}
export function contentInput(type,body,partial=false){const out={};const field=(name,max,required=true)=>{if(!partial||name in body)out[name]=text(body[name],name,max,required);};
  if(type==='stories'){field('title',160);field('content',10000);field('subtitle',200,false);field('dateStr',100,false);if('imageUrl' in body)out.imageUrl=safeUrl(body.imageUrl,'Story photograph URL');if('imageId' in body){if(body.imageId!==null&&(typeof body.imageId!=='string'||! /^[a-f0-9-]{36}$/i.test(body.imageId)))bad('Choose a valid gallery photograph.');out.imageId=body.imageId;}}
  if(type==='gallery'){field('caption',200);field('altText',250);if('category' in body)out.category=choice(body.category,['portraits','engagement','ceremony','celebration'],'category');}
  if(type==='wishes'){if('moderationStatus' in body)out.moderationStatus=choice(body.moderationStatus,['pending','approved','rejected','hidden'],'moderation status');return out;}
  if('displayOrder' in body)out.displayOrder=integer(body.displayOrder,'Display order',0,10000);
  if('published' in body)out.published=flag(body.published,'Publication');
  return out;
}
export function settingsInput(body){
  const out={};
  for(const field of ['coupleDisplayNames','venueName','venueAddress','welcomeMessage','dressCode','receptionDetails','travelInformation','scheduleDetails'])if(field in body)out[field]=text(body[field],field,field==='welcomeMessage'?2000:1000,['coupleDisplayNames','venueName','venueAddress'].includes(field));
  if('venueMapUrl' in body)out.venueMapUrl=safeUrl(body.venueMapUrl,'Verified map URL');
  if('ceremonyIsoTimestamp' in body){out.ceremonyIsoTimestamp=iso(body.ceremonyIsoTimestamp,'Ceremony');if(!out.ceremonyIsoTimestamp)bad('Ceremony time is required.');const f=formatEvent(out.ceremonyIsoTimestamp);out.eventDate=f.date.replace(/^(\w+)( )/,'$1, ');out.ceremonyStartTime=f.time;out.timezone='Africa/Lagos';}
  if('rsvpDeadline' in body)out.rsvpDeadline=iso(body.rsvpDeadline,'RSVP deadline')||'';
  if('contactNumbers' in body){if(!Array.isArray(body.contactNumbers)||body.contactNumbers.length!==3||body.contactNumbers.some(n=>typeof n!=='string'||!/^0\d{10}$/.test(n)))bad('Provide three valid Nigerian contact numbers in order.');out.contactNumbers=body.contactNumbers;}
  if('featureSettings' in body){const f=body.featureSettings;if(!f||typeof f!=='object')bad('Invalid feature settings.');out.featureSettings={mealSelectionEnabled:flag(f.mealSelectionEnabled,'Meal selection'),accessibilityRequestsEnabled:flag(f.accessibilityRequestsEnabled,'Accessibility requests'),allowRsvpUpdates:flag(f.allowRsvpUpdates,'RSVP updates')};}
  return out;
}
export function csvCell(value){let s=String(value??'');if(/^[\s]*[=+@-]/.test(s))s="'"+s;return '"'+s.replace(/"/g,'""')+'"';}
export function guestCsv(data){const rows=[['Name','Email','Phone','Permitted attendees','Invitation status','Attendance','Attendees','Meal preference','Accessibility','Private note','Submitted at']];for(const g of data.guests){const r=data.rsvps.find(r=>r.guestId===g.id);rows.push([g.fullName,g.email,g.phone,g.maxAttendees,g.invitationStatus,r?.attendanceStatus||'pending',r?.attendeeCount||0,r?.mealPreference,r?.accessibilityRequest,r?.privateMessage,r?.submittedAt]);}return '\uFEFF'+rows.map(row=>row.map(csvCell).join(',')).join('\r\n');}
