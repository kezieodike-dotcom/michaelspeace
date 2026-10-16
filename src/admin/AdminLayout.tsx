import {useCallback,useEffect,useState} from 'react';
import {ArrowUpRight,LogOut,RefreshCw} from 'lucide-react';
import {adminData,adminSession,api,RequestError,AdminData} from '../lib/api';
import type {AdminUser} from '../types/wedding';
import {Notice} from '../components/Editorial';
import {AdminLogin} from './AdminLogin';
import {AdminOverview} from './AdminOverview';
import {AdminGuests} from './AdminGuests';
import {AdminResponses} from './AdminResponses';
import {AdminSettings} from './AdminSettings';
import {AdminContent} from './AdminContent';
import type {AdminAction} from './types';
const routes=[['Overview','/admin'],['Guests & invitations','/admin/guests'],['RSVP responses','/admin/responses'],['Photographs','/admin/gallery'],['Our story','/admin/story'],['Wedding wishes','/admin/wishes'],['Wedding settings','/admin/settings']];
export function AdminLayout({currentPath,onNavigate}:{currentPath:string;onNavigate:(p:string)=>void}){
  const [user,setUser]=useState<AdminUser|null>(null);const [checking,setChecking]=useState(true);const [data,setData]=useState<AdminData|null>(null);const [busy,setBusy]=useState(false);const [error,setError]=useState('');const [message,setMessage]=useState('');
  const reload=useCallback(async()=>{try{setData(await adminData());setError('');}catch(e){setError((e as Error).message);if(e instanceof RequestError&&[401,403].includes(e.status)){setUser(null);setData(null);}}},[]);
  useEffect(()=>{let active=true;adminSession().then(result=>{if(active)setUser(result.user);}).catch(()=>{}).finally(()=>{if(active)setChecking(false);});return()=>{active=false;};},[]);
  useEffect(()=>{if(user)void reload();},[user,reload]);
  const action:AdminAction=async(path,method,body)=>{setBusy(true);setError('');setMessage('');try{const result=await api(path,method,body);await reload();setMessage('Changes saved.');return result;}catch(e){setError((e as Error).message);if(e instanceof RequestError&&[401,403].includes(e.status)){setUser(null);setData(null);}return null;}finally{setBusy(false);}};
  async function logout(){const result=await action('/admin/logout','POST',{});if(result){setData(null);setUser(null);onNavigate('/admin/login');}}
  if(checking)return <div className="admin-login"><div className="skeleton h-64 w-full max-w-md" aria-label="Checking administrator session" aria-busy="true"/></div>;
  if(!user)return <AdminLogin onLoginSuccess={u=>{setUser(u);onNavigate('/admin');}} onNavigatePublic={()=>onNavigate('/')}/>;
  const title=routes.find(([,path])=>path===currentPath)?.[0]||'Overview';const view=currentPath==='/admin/login'?'/admin':currentPath;
  return <div className="admin-shell"><aside className="admin-sidebar"><a href="/admin" className="wordmark" onClick={e=>{e.preventDefault();onNavigate('/admin');}}>Michael’sPeace.</a><p className="eyebrow mt-3 mb-10">Wedding team</p><nav aria-label="Administration">{routes.map(([label,path])=><a href={path} key={path} aria-current={view===path?'page':undefined} onClick={e=>{if(e.metaKey||e.ctrlKey)return;e.preventDefault();setMessage('');onNavigate(path);}}>{label}</a>)}</nav><div className="admin-sidebar-bottom"><p className="text-xs muted break-all mb-5">{user.username}</p><button className="text-link text-xs" onClick={()=>onNavigate('/')}>View website <ArrowUpRight size={14}/></button><button className="text-link text-xs mt-4" onClick={()=>void logout()} disabled={busy}><LogOut size={14}/> Sign out</button></div></aside><main className="admin-main"><header className="flex items-center justify-between gap-4 mb-10"><div><p className="eyebrow">Peace and Michael / Administration</p><h1 className="text-3xl font-sans tracking-tight">{title}</h1></div><button className="button secondary small" onClick={()=>void reload()} aria-label="Refresh data"><RefreshCw size={15}/><span className="hidden sm:inline">Refresh</span></button></header>{error&&<Notice error>{error}</Notice>}{message&&<Notice>{message}</Notice>}{!data?<div className="skeleton h-96" aria-busy="true" aria-label="Loading administration data"/>:<fieldset disabled={busy} className="min-w-0" aria-busy={busy}>{view==='/admin'?<AdminOverview data={data}/>:view==='/admin/guests'?<AdminGuests data={data} action={action} busy={busy}/>:view==='/admin/responses'?<AdminResponses data={data}/>:view==='/admin/settings'?<AdminSettings data={data} action={action} busy={busy}/>:['/admin/gallery','/admin/story','/admin/wishes'].includes(view)?<AdminContent key={view} kind={view.split('/')[2] as 'gallery'|'story'|'wishes'} data={data} action={action} busy={busy}/>:<div className="admin-panel">This administration page does not exist.</div>}</fieldset>}</main></div>;
}
