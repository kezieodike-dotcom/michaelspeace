import type {AdminData} from '../lib/api';
export type AdminAction=(path:string,method:string,body?:unknown)=>Promise<any|null>;
export interface AdminViewProps {data:AdminData;action:AdminAction;busy:boolean;}
