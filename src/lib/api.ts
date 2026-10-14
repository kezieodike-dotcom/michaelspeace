import type {WeddingConfig,Guest,RSVPResponse,GalleryImage,LoveStoryEntry,WeddingWish,AdminUser} from '../types/wedding';
import {WRITTEN_IN_NOVEMBER} from '../data/story';
import {CHILDHOOD_GALLERY} from '../data/gallery';
export interface WeddingData {config:WeddingConfig; gallery:GalleryImage[]; stories:LoveStoryEntry[]; wishes:WeddingWish[]; mode?:'demo'|'live'|'setup';}
export interface AdminData extends WeddingData {guests:Guest[]; rsvps:RSVPResponse[];}
export interface EmailReport {status:'accepted'|'failed'|'not_configured'|'not_requested';message:string;}
export class RequestError extends Error {constructor(public status:number,message:string){super(message);}}
export async function api<T>(path:string,method='GET',body?:unknown):Promise<T>{
  const response=await fetch('/api'+path,{method,credentials:'same-origin',headers:{'Content-Type':'application/json'},...(body!==undefined?{body:JSON.stringify(body)}:{})});
  const data=await response.json().catch(()=>({error:'Unable to contact the wedding service.'}));
  if(!response.ok)throw new RequestError(response.status,data.error||'Something went wrong. Please try again.');
  return data as T;
}
export async function publicData(){const data=await api<WeddingData>('/public');return data.mode==='setup'?{...data,stories:data.stories.length?data.stories:WRITTEN_IN_NOVEMBER,gallery:data.gallery.length?data.gallery:CHILDHOOD_GALLERY}:data;}
export const adminData=()=>api<AdminData>('/admin/data');
export const adminSession=()=>api<{user:AdminUser}>('/admin/me');
