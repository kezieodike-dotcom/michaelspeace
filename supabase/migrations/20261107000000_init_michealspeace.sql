-- ====================================================================
-- MICHEAL’SPEACE PREMIUM WEDDING DATABASE SCHEMA & MIGRATIONS
-- Couple: Peace and Micheal
-- Wedding Date: Saturday, 7 November 2026 at 10:00 AM WAT (UTC+1)
-- Venue: Dunamis Intl Gospel Centre (DIGC), 117, Agbani Road, Achara Layout, Enugu, Nigeria
-- ====================================================================

-- Enable pgcrypto for UUID generation & SHA-256 token hashing
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. WEDDINGS TABLE
CREATE TABLE IF NOT EXISTS public.weddings (
    id TEXT PRIMARY KEY DEFAULT 'michealspeace-2026',
    couple_display_names TEXT NOT NULL DEFAULT 'Peace and Micheal',
    event_date TEXT NOT NULL DEFAULT 'Saturday, 7 November 2026',
    timezone TEXT NOT NULL DEFAULT 'Africa/Lagos (WAT, UTC+1)',
    ceremony_start_time TEXT NOT NULL DEFAULT '10:00 AM WAT',
    ceremony_iso_timestamp TIMESTAMPTZ NOT NULL DEFAULT '2026-11-07T10:00:00+01:00',
    venue_name TEXT NOT NULL DEFAULT 'Dunamis Intl Gospel Centre (DIGC)',
    venue_address TEXT NOT NULL DEFAULT '117, Agbani Road, Achara Layout, Enugu, Nigeria',
    venue_map_url TEXT NOT NULL DEFAULT '',
    dress_code TEXT NOT NULL DEFAULT '',
    reception_details TEXT NOT NULL DEFAULT '',
    rsvp_deadline TEXT NOT NULL DEFAULT '',
    welcome_message TEXT NOT NULL DEFAULT 'With immense joy and gratitude to God Almighty, Peace and Micheal joyfully invite you to celebrate their sacred union in holy matrimony.',
    contact_numbers TEXT[] NOT NULL DEFAULT ARRAY['08114203510', '07082975978', '08148756975'],
    feature_settings JSONB NOT NULL DEFAULT '{"mealSelectionEnabled": true, "accessibilityRequestsEnabled": true, "wishesGuestbookEnabled": true, "galleryEnabled": true}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. GUESTS TABLE
CREATE TABLE IF NOT EXISTS public.guests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    wedding_id TEXT NOT NULL REFERENCES public.weddings(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    invitation_code TEXT UNIQUE,
    invitation_token_hash TEXT NOT NULL,
    max_attendees INTEGER NOT NULL DEFAULT 1 CHECK (max_attendees >= 1 AND max_attendees <= 10),
    invitation_status TEXT NOT NULL DEFAULT 'invited' CHECK (invitation_status IN ('invited', 'responded', 'revoked', 'expired')),
    invitation_expiry TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_guests_wedding_id ON public.guests(wedding_id);
CREATE INDEX IF NOT EXISTS idx_guests_token_hash ON public.guests(invitation_token_hash);
CREATE INDEX IF NOT EXISTS idx_guests_code ON public.guests(invitation_code);

-- 3. RSVPS TABLE
CREATE TABLE IF NOT EXISTS public.rsvps (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    guest_id UUID NOT NULL UNIQUE REFERENCES public.guests(id) ON DELETE CASCADE,
    attendance_status TEXT NOT NULL CHECK (attendance_status IN ('attending', 'declined')),
    attendee_count INTEGER NOT NULL DEFAULT 0 CHECK (attendee_count >= 0),
    meal_preference TEXT,
    accessibility_request TEXT,
    private_message TEXT,
    submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_rsvps_guest_id ON public.rsvps(guest_id);
CREATE INDEX IF NOT EXISTS idx_rsvps_status ON public.rsvps(attendance_status);

-- 4. GALLERY IMAGES TABLE
CREATE TABLE IF NOT EXISTS public.gallery_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    wedding_id TEXT NOT NULL REFERENCES public.weddings(id) ON DELETE CASCADE,
    storage_path TEXT,
    url TEXT NOT NULL DEFAULT '',
    caption TEXT NOT NULL,
    alt_text TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'general' CHECK (category IN ('portraits', 'engagement', 'ceremony', 'celebration', 'general')),
    display_order INTEGER NOT NULL DEFAULT 0,
    published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_gallery_wedding_published ON public.gallery_images(wedding_id, published, display_order);

-- 5. LOVE STORY ENTRIES TABLE
CREATE TABLE IF NOT EXISTS public.love_story_entries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    wedding_id TEXT NOT NULL REFERENCES public.weddings(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    subtitle TEXT,
    date_str TEXT NOT NULL,
    content TEXT NOT NULL,
    milestone_date DATE,
    image_url TEXT,
    image_id UUID,
    display_order INTEGER NOT NULL DEFAULT 0,
    published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_story_wedding_published ON public.love_story_entries(wedding_id, published, display_order);

-- 6. WISHES (GUESTBOOK) TABLE
CREATE TABLE IF NOT EXISTS public.wishes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    wedding_id TEXT NOT NULL REFERENCES public.weddings(id) ON DELETE CASCADE,
    display_name TEXT NOT NULL,
    message TEXT NOT NULL CHECK (char_length(message) <= 500),
    moderation_status TEXT NOT NULL DEFAULT 'pending' CHECK (moderation_status IN ('pending', 'approved', 'rejected', 'hidden')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_wishes_wedding_moderation ON public.wishes(wedding_id, moderation_status, created_at DESC);

-- 7. ADMIN PROFILES TABLE (referencing auth.users)
CREATE TABLE IF NOT EXISTS public.admin_profiles (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    wedding_id TEXT NOT NULL REFERENCES public.weddings(id) ON DELETE CASCADE,
    role TEXT NOT NULL DEFAULT 'coordinator' CHECK (role IN ('super_admin', 'coordinator', 'viewer')),
    full_name TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ====================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ====================================================================

ALTER TABLE public.weddings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.guests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rsvps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.love_story_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;

-- Helper function to verify admin status
CREATE OR REPLACE FUNCTION public.is_authorized_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.admin_profiles
    WHERE user_id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 1. Weddings Policies
CREATE POLICY "Public can view wedding details"
    ON public.weddings FOR SELECT
    USING (true);

CREATE POLICY "Admins can update wedding details"
    ON public.weddings FOR UPDATE
    TO authenticated
    USING (public.is_authorized_admin())
    WITH CHECK (public.is_authorized_admin());

-- 2. Guests Policies
-- Public CANNOT view all guests!
CREATE POLICY "Admins full access to guests"
    ON public.guests FOR ALL
    TO authenticated
    USING (public.is_authorized_admin())
    WITH CHECK (public.is_authorized_admin());

-- 3. RSVPs Policies
-- Public CANNOT view all RSVPs
CREATE POLICY "Admins full access to rsvps"
    ON public.rsvps FOR ALL
    TO authenticated
    USING (public.is_authorized_admin())
    WITH CHECK (public.is_authorized_admin());

-- 4. Gallery Policies
CREATE POLICY "Public can view published gallery images"
    ON public.gallery_images FOR SELECT
    USING (published = true);

CREATE POLICY "Admins full access to gallery"
    ON public.gallery_images FOR ALL
    TO authenticated
    USING (public.is_authorized_admin())
    WITH CHECK (public.is_authorized_admin());

-- 5. Love Story Policies
CREATE POLICY "Public can view published love story entries"
    ON public.love_story_entries FOR SELECT
    USING (published = true);

CREATE POLICY "Admins full access to love story"
    ON public.love_story_entries FOR ALL
    TO authenticated
    USING (public.is_authorized_admin())
    WITH CHECK (public.is_authorized_admin());

-- 6. Wishes Policies
CREATE POLICY "Public can view approved wishes"
    ON public.wishes FOR SELECT
    USING (moderation_status = 'approved');

CREATE POLICY "Public can submit new wishes (pending moderation)"
    ON public.wishes FOR INSERT
    WITH CHECK (moderation_status = 'pending');

CREATE POLICY "Admins full access to wishes"
    ON public.wishes FOR ALL
    TO authenticated
    USING (public.is_authorized_admin())
    WITH CHECK (public.is_authorized_admin());

-- 7. Admin Profiles Policies
CREATE POLICY "Admins can view their own profile"
    ON public.admin_profiles FOR SELECT
    TO authenticated
    USING (user_id = auth.uid() OR public.is_authorized_admin());

-- ====================================================================
-- SEED DATA: OFFICIAL CONFIRMED DETAILS FOR PEACE & MICHEAL
-- ====================================================================

INSERT INTO public.weddings (
    id,
    couple_display_names,
    event_date,
    timezone,
    ceremony_start_time,
    ceremony_iso_timestamp,
    venue_name,
    venue_address,
    venue_map_url,
    dress_code,
    reception_details,
    rsvp_deadline,
    welcome_message,
    contact_numbers
) VALUES (
    'michealspeace-2026',
    'Peace and Micheal',
    'Saturday, 7 November 2026',
    'Africa/Lagos (WAT, UTC+1)',
    '10:00 AM WAT',
    '2026-11-07T10:00:00+01:00',
    'Dunamis Intl Gospel Centre (DIGC)',
    '117, Agbani Road, Achara Layout, Enugu, Nigeria',
    '',
    '',
    '',
    '',
    'With immense joy and gratitude to God Almighty, Peace and Micheal joyfully invite you to celebrate their sacred union in holy matrimony.',
    ARRAY['08114203510', '07082975978', '08148756975']
) ON CONFLICT (id) DO UPDATE SET
    couple_display_names = EXCLUDED.couple_display_names,
    event_date = EXCLUDED.event_date,
    timezone = EXCLUDED.timezone,
    ceremony_start_time = EXCLUDED.ceremony_start_time,
    ceremony_iso_timestamp = EXCLUDED.ceremony_iso_timestamp,
    venue_name = EXCLUDED.venue_name,
    venue_address = EXCLUDED.venue_address,
    venue_map_url = EXCLUDED.venue_map_url,
    contact_numbers = EXCLUDED.contact_numbers;

-- Runtime support used by the server repository.
ALTER TABLE public.guests ALTER COLUMN invitation_code DROP NOT NULL;
ALTER TABLE public.gallery_images ALTER COLUMN url SET DEFAULT '';
ALTER TABLE public.love_story_entries ADD COLUMN IF NOT EXISTS image_id UUID REFERENCES public.gallery_images(id) ON DELETE SET NULL;

CREATE OR REPLACE FUNCTION public.is_authorized_admin()
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.admin_profiles WHERE user_id = (SELECT auth.uid()) AND role IN ('super_admin', 'coordinator'));
$$;
REVOKE ALL ON FUNCTION public.is_authorized_admin() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_authorized_admin() TO authenticated;

DROP POLICY IF EXISTS "Public can view wedding details" ON public.weddings;
CREATE POLICY "Public can view wedding details" ON public.weddings FOR SELECT TO anon, authenticated USING (id = 'michealspeace-2026');

CREATE TABLE IF NOT EXISTS public.wedding_rate_limits (
  key TEXT PRIMARY KEY,
  window_started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  attempts INTEGER NOT NULL DEFAULT 0
);
ALTER TABLE public.wedding_rate_limits ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.wedding_rate_limits FROM anon, authenticated;

CREATE OR REPLACE FUNCTION public.consume_wedding_rate_limit(p_key TEXT, p_limit INTEGER, p_seconds INTEGER)
RETURNS BOOLEAN LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE current_row public.wedding_rate_limits;
BEGIN
  SELECT * INTO current_row FROM public.wedding_rate_limits WHERE key = p_key FOR UPDATE;
  IF current_row IS NULL OR current_row.window_started_at + make_interval(secs => p_seconds) <= now() THEN
    INSERT INTO public.wedding_rate_limits(key, window_started_at, attempts) VALUES (p_key, now(), 1)
      ON CONFLICT (key) DO UPDATE SET window_started_at = now(), attempts = 1;
    RETURN true;
  END IF;
  IF current_row.attempts >= p_limit THEN RETURN false; END IF;
  UPDATE public.wedding_rate_limits SET attempts = attempts + 1 WHERE key = p_key;
  RETURN true;
END;
$$;
REVOKE ALL ON FUNCTION public.consume_wedding_rate_limit(TEXT, INTEGER, INTEGER) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.consume_wedding_rate_limit(TEXT, INTEGER, INTEGER) TO anon, authenticated;

CREATE OR REPLACE FUNCTION public.submit_wedding_rsvp(
  p_wedding_id TEXT, p_hash TEXT, p_status TEXT, p_count INTEGER,
  p_meal TEXT DEFAULT NULL, p_accessibility TEXT DEFAULT NULL, p_note TEXT DEFAULT NULL
) RETURNS JSONB LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE g public.guests; existing public.rsvps; result public.rsvps; can_update BOOLEAN;
BEGIN
  SELECT * INTO g FROM public.guests WHERE wedding_id = p_wedding_id AND invitation_token_hash = p_hash FOR UPDATE;
  IF g.id IS NULL OR g.invitation_status IN ('revoked', 'expired') OR (g.invitation_expiry IS NOT NULL AND g.invitation_expiry <= now()) THEN RAISE EXCEPTION 'Invitation unavailable' USING ERRCODE = 'P0001'; END IF;
  IF EXISTS (SELECT 1 FROM public.weddings WHERE id = p_wedding_id AND NULLIF(rsvp_deadline, '') IS NOT NULL AND rsvp_deadline::timestamptz <= now()) THEN RAISE EXCEPTION 'RSVP deadline passed' USING ERRCODE = 'P0001'; END IF;
  SELECT COALESCE((SELECT (feature_settings->>'allowRsvpUpdates')::boolean FROM public.weddings WHERE id = p_wedding_id), true) INTO can_update;
  SELECT * INTO existing FROM public.rsvps WHERE guest_id = g.id FOR UPDATE;
  IF existing.id IS NOT NULL AND NOT can_update THEN RAISE EXCEPTION 'Response updates closed' USING ERRCODE = 'P0001'; END IF;
  IF p_status NOT IN ('attending', 'declined') OR p_count < 0 OR p_count > g.max_attendees OR (p_status = 'attending' AND p_count < 1) OR (p_status = 'declined' AND p_count <> 0) THEN RAISE EXCEPTION 'Invalid RSVP' USING ERRCODE = '23514'; END IF;
  INSERT INTO public.rsvps(guest_id, attendance_status, attendee_count, meal_preference, accessibility_request, private_message)
    VALUES(g.id, p_status, p_count, p_meal, p_accessibility, p_note)
    ON CONFLICT (guest_id) DO UPDATE SET attendance_status=EXCLUDED.attendance_status, attendee_count=EXCLUDED.attendee_count, meal_preference=EXCLUDED.meal_preference, accessibility_request=EXCLUDED.accessibility_request, private_message=EXCLUDED.private_message, updated_at=now()
    RETURNING * INTO result;
  UPDATE public.guests SET invitation_status='responded', updated_at=now() WHERE id=g.id;
  RETURN jsonb_build_object('rsvp', to_jsonb(result), 'updated', existing.id IS NOT NULL);
END;
$$;
REVOKE ALL ON FUNCTION public.submit_wedding_rsvp(TEXT, TEXT, TEXT, INTEGER, TEXT, TEXT, TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.submit_wedding_rsvp(TEXT, TEXT, TEXT, INTEGER, TEXT, TEXT, TEXT) TO anon, authenticated;
