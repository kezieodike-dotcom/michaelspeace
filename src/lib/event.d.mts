export interface RemainingTime {days:number;hours:number;minutes:number;seconds:number;isPast:boolean;}
export function countdown(target:string,now?:number):RemainingTime;
export function calendarStamp(iso:string):string;
export function calendarFile(config:{id:string;coupleDisplayNames:string;ceremonyIsoTimestamp:string;venueName:string;venueAddress:string}):string;
export function formatEvent(iso:string):{date:string;time:string};
