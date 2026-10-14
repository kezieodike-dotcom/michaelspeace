export function countdown(target, now = Date.now()) {
  const difference = Math.max(0, new Date(target).getTime() - now);
  const seconds = Math.floor(difference / 1000);
  return {days: Math.floor(seconds / 86400), hours: Math.floor(seconds % 86400 / 3600), minutes: Math.floor(seconds % 3600 / 60), seconds: seconds % 60, isPast: difference === 0 || !Number.isFinite(difference)};
}
export function calendarStamp(iso) {return new Date(iso).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';}
const escapeIcs = value => String(value).replace(/\\/g, '\\\\').replace(/\r?\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;');
export function calendarFile(config) {
  return ['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//MichealsPeace//Wedding//EN','CALSCALE:GREGORIAN','BEGIN:VEVENT','UID:' + config.id + '@michealspeace','DTSTAMP:' + calendarStamp(new Date().toISOString()),'DTSTART:' + calendarStamp(config.ceremonyIsoTimestamp),'SUMMARY:' + escapeIcs(config.coupleDisplayNames + ' — Wedding'),'LOCATION:' + escapeIcs(config.venueName + ', ' + config.venueAddress),'END:VEVENT','END:VCALENDAR',''].join('\r\n');
}
export function formatEvent(iso) {
  const date = new Date(iso);
  return {date: new Intl.DateTimeFormat('en-GB',{timeZone:'Africa/Lagos',weekday:'long',day:'numeric',month:'long',year:'numeric'}).format(date),time: new Intl.DateTimeFormat('en-GB',{timeZone:'Africa/Lagos',hour:'numeric',minute:'2-digit',hour12:true}).format(date).toUpperCase() + ' WAT'};
}
