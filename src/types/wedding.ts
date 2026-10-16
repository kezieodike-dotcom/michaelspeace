export interface WeddingConfig {
  id: string;
  coupleDisplayNames: string;
  eventDate: string; // "2026-11-07"
  timezone: string; // "Africa/Lagos (WAT, UTC+1)"
  ceremonyStartTime: string; // "10:00 AM WAT"
  ceremonyIsoTimestamp: string; // "2026-11-07T10:00:00+01:00"
  venueName: string;
  venueAddress: string;
  venueMapUrl: string;
  dressCode: string;
  receptionDetails: string;
  rsvpDeadline: string; // "2026-10-31"
  welcomeMessage: string;
  contactNumbers: string[];
  featureSettings: { mealSelectionEnabled: boolean; accessibilityRequestsEnabled: boolean; allowRsvpUpdates: boolean };
  travelInformation?: string;
  scheduleDetails?: string;
}

export interface Guest {
  id: string;
  weddingId: string;
  fullName: string;
  email?: string;
  phone?: string;
  invitationCode?: string; // Never exposed to guests; live storage uses invitationTokenHash.
  maxAttendees: number;
  invitationStatus: 'invited' | 'responded' | 'revoked' | 'expired';
  invitationExpiry?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface RSVPResponse {
  id: string;
  guestId: string;
  guestName: string;
  attendanceStatus: 'attending' | 'declined';
  attendeeCount: number;
  mealPreference?: string;
  accessibilityRequest?: string;
  privateMessage?: string;
  submittedAt: string;
  updatedAt: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  storagePath?: string;
  caption: string;
  altText: string;
  category: 'engagement' | 'ceremony' | 'celebration' | 'portraits';
  displayOrder: number;
  published: boolean;
  createdAt: string;
}

export interface LoveStoryEntry {
  id: string;
  title: string;
  subtitle?: string;
  dateStr?: string;
  content: string;
  imageUrl?: string;
  imageUrls?: string[];
  imageId?: string | null;
  displayOrder: number;
  published: boolean;
  createdAt: string;
}

export interface WeddingWish {
  id: string;
  displayName: string;
  message: string;
  moderationStatus: 'approved' | 'pending' | 'rejected' | 'hidden';
  createdAt: string;
}

export interface AdminUser {
  id: string;
  username: string;
  name: string;
  role: 'super_admin' | 'wedding_coordinator';
}
