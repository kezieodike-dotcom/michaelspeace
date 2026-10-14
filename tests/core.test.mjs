import test from 'node:test';
import assert from 'node:assert/strict';
const core = await import('../src/lib/event.mjs').catch(() => ({}));
test('10 AM Lagos is 09:00 UTC independent of visitor daylight saving', () => {
  assert.equal(typeof core.countdown, 'function', 'countdown must be implemented');
  const target = '2026-11-07T10:00:00+01:00';
  assert.deepEqual(core.countdown(target, Date.parse('2026-11-06T09:00:00Z')), {days:1,hours:0,minutes:0,seconds:0,isPast:false});
  assert.equal(core.calendarStamp(target), '20261107T090000Z');
});
test('countdown never goes negative after the ceremony', () => {
  assert.equal(typeof core.countdown, 'function');
  assert.deepEqual(core.countdown('2026-11-07T10:00:00+01:00', Date.parse('2026-11-08T09:00:00Z')), {days:0,hours:0,minutes:0,seconds:0,isPast:true});
});
test('calendar escapes untrusted delimiters and does not invent an end time', () => {
  assert.equal(typeof core.calendarFile, 'function');
  const ics=core.calendarFile({id:'wedding',coupleDisplayNames:'Peace and Micheal',ceremonyIsoTimestamp:'2026-11-07T10:00:00+01:00',venueName:'DIGC',venueAddress:'117, Agbani Road\nAchara Layout'});
  assert.match(ics,/DTSTART:20261107T090000Z/);
  assert.ok(!ics.includes('DTEND'));
  assert.ok(ics.includes('117\\, Agbani Road\\nAchara Layout'));
});
