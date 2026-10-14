export const WEDDING_ID = 'michealspeace-2026';
export const defaultConfig = {
  id:WEDDING_ID,coupleDisplayNames:'Peace and Micheal',eventDate:'Saturday, 7 November 2026',timezone:'Africa/Lagos',ceremonyStartTime:'10:00 AM WAT',ceremonyIsoTimestamp:'2026-11-07T10:00:00+01:00',venueName:'Dunamis Intl Gospel Centre (DIGC)',venueAddress:'117, Agbani Road, Achara Layout, Enugu, Nigeria',venueMapUrl:'',dressCode:'',receptionDetails:'',rsvpDeadline:'',welcomeMessage:'Peace and Micheal invite you to celebrate their wedding. We look forward to sharing this special day with you.',contactNumbers:['08114203510','07082975978','08148756975'],featureSettings:{mealSelectionEnabled:false,accessibilityRequestsEnabled:false,allowRsvpUpdates:true},travelInformation:'',scheduleDetails:''
};
export const emptyDatabase = () => ({config:structuredClone(defaultConfig),guests:[],rsvps:[],gallery:[],stories:[],wishes:[]});
