implement this in this project # MASTER BUILD PROMPT: MICHEAL’SPEACE PREMIUM WEDDING WEBSITE

## PROJECT IDENTITY

Project name: Micheal’sPeace

Couple's official display names: **Peace and Micheal**

Wedding date: **Saturday, 7 November 2026**

Wedding time: **10:00 AM West Africa Time (WAT, UTC+1)**

Wedding venue: **Dunamis Intl Gospel Centre (DIGC), 117, Agbani Road, Achara Layout, Enugu, Nigeria.**

Official RSVP contact numbers:
- 08114203510
- 07082975978
- 08148756975

Brand colors: **White, Gold, and Black**

Initial hosting: Vercel free subdomain.

Application type: Full-stack, premium wedding website with a public-facing experience and a private RSVP system and administration dashboard.

## 1. YOUR ROLE

Act as a senior full-stack engineer, premium UI/UX designer, product architect, database engineer, and application security specialist.

Build Micheal’sPeace as a complete, production-quality wedding website. Do not stop at a static landing page or a visual mockup.

Implement the real pages, functional forms, database integration, authentication, guest invitation flow, administrator dashboard, responsive layouts, and deployment documentation.

Inspect the existing project before making changes. If the repository already contains a project, preserve working features and integrate the new requirements instead of unnecessarily rebuilding everything.

## 2. PROJECT VISION

Micheal’sPeace should feel like a premium digital wedding invitation designed specifically for Peace and Micheal.

The experience should combine:
- A cinematic wedding homepage.
- A romantic presentation of their love story.
- Complete wedding information.
- A live countdown to the ceremony.
- Private guest RSVP.
- A beautiful photograph gallery.
- A wedding wishes guestbook.
- A protected administration dashboard.

The website should communicate elegance, intimacy, love, celebration, and attention to detail.

Use the actual wedding details specified in this prompt throughout the application. Do not replace them with generic sample dates, invented venues, or different contact numbers.

Unknown information, including the couple's photographs, full legal names, ceremony schedule beyond the stated start time, reception details, dress code, and RSVP deadline, must remain editable placeholders until confirmed.

## 3. VISUAL IDENTITY AND DESIGN SYSTEM

Use a premium editorial wedding aesthetic called “Timeless Luxury.”

### Official palette

White:
- HEX: #FFFFFF
- Primary page backgrounds, cards, and clean visual space.

Gold:
- HEX: #C5A46D
- Fine borders, decorative accents, elegant icons, and selected buttons.

Black:
- HEX: #111111
- Main headings, navigation, text, footer, and high-contrast elements.

Supporting colors:
- Soft ivory: #F7F2E9
- Warm champagne: #E9DFD0
- Muted taupe: #766452

White, gold, and black must remain the dominant identity. Supporting neutrals must never overpower the official palette.

### Typography

Use Cormorant Garamond for editorial headings, romantic titles, and prominent names.

Use Inter for body text, form labels, navigation, buttons, and administrative data.

Use elegant typographic contrast:
- Large serif headings.
- Clean, readable body text.
- Small uppercase editorial labels.
- Fine decorative separators.
- Comfortable line spacing.

### Visual principles

- Use generous whitespace.
- Use premium, authorized photographs of Peace and Micheal when supplied.
- Use large editorial photographs and sophisticated image crops.
- Use subtle gold lines and refined borders.
- Keep shadows restrained.
- Use understated motion and smooth page transitions.
- Create a distinctive mobile navigation experience.
- Ensure every public page looks coherent and intentionally designed.

Avoid excessive gradients, cluttered card layouts, cartoonish elements, excessive animation, and generic SaaS-style design on the public website.

Create reusable design tokens, buttons, form controls, typography styles, navigation components, and responsive layout components.

## 4. TECHNOLOGY STACK

Use the following stack unless the existing repository requires a compatible alternative:

- Next.js with App Router.
- React.
- TypeScript.
- Tailwind CSS.
- shadcn/ui where appropriate.
- Framer Motion for restrained animation.
- Lucide icons.
- Supabase PostgreSQL.
- Supabase Auth for administrator authentication.
- Supabase Storage for photographs.
- Resend for transactional email.
- Vercel for hosting.

Use maintained, compatible dependencies and follow current official documentation.

Organize the project into reusable components, typed data models, server-side operations, validation utilities, and maintainable database migrations.

## 5. HOMEPAGE

Build a visually impressive homepage with the following sections.

### Navigation

Display the Micheal’sPeace wordmark and navigation links:
- Home
- Our Story
- Wedding Details
- Gallery
- RSVP
- Wishes

Add a clear RSVP button.

The mobile menu must be responsive, accessible, and easy to use.

### Hero section

Use a large, cinematic photograph of the couple when supplied.

Display:
- An elegant label: “A Celebration of Love.”
- Main heading: “Peace & Micheal.”
- Tagline: “Two Hearts. One Promise. Forever Begins Here.”
- Date: “Saturday, 7 November 2026.”
- Time: “10:00 AM WAT.”
- Venue summary: “Dunamis Intl Gospel Centre, Enugu.”
- A live wedding countdown.
- A prominent “RSVP Now” button.
- An “Explore Our Story” link.

Use a beautiful white, gold, and black composition.

The hero must be visually balanced on mobile and desktop.

### Countdown

Calculate the countdown using the confirmed event date and the Africa/Lagos timezone.

Show days, hours, minutes, and seconds.

Update the countdown accurately and prevent negative values after the event begins.

Test timezone handling and daylight-saving assumptions explicitly; Nigeria uses UTC+1.

After the ceremony begins, replace the countdown with a graceful event-day or celebration message.

### Remaining homepage sections

Include:
- A welcome message.
- A short love story preview.
- A wedding information preview.
- A gallery preview.
- An RSVP call to action.
- A guest wishes preview displaying approved messages only.
- A footer with the couple's names, wedding date, and navigation.

Do not invent the couple's personal story. Use editable placeholders until the actual story is supplied.

## 6. OUR LOVE STORY

Create an elegant editorial page containing:
- An introduction to Peace and Micheal.
- How they met.
- Important relationship milestones.
- Their engagement story.
- Personal messages from each partner.
- A concluding message about their wedding.

Use a chronological timeline with photographs and refined typography.

Allow administrators to create, edit, reorder, publish, and unpublish story entries.

If the content has not been supplied, show clear placeholders in the development environment and do not present fictional personal history as fact.

## 7. WEDDING DETAILS

Display the confirmed information prominently.

Couple: Peace and Micheal.

Date: Saturday, 7 November 2026.

Time: 10:00 AM WAT.

Venue: Dunamis Intl Gospel Centre (DIGC).

Address: 117, Agbani Road, Achara Layout, Enugu, Nigeria.

Include:
- A clear date and time presentation.
- A venue information section.
- A directions button.
- A map link based on a verified venue location.
- An add-to-calendar feature.
- Dress code, once supplied.
- Reception details, once supplied.
- Additional event schedule, if supplied.
- Travel and parking information, if confirmed.

Do not invent reception details, map coordinates, dress code, or event schedules.

Provide appropriate links for opening directions in a mapping application.

Ensure that the displayed venue address remains editable from the administration dashboard.

## 8. RSVP CONTACT INFORMATION

Display these official contact numbers wherever RSVP assistance is offered:

- 08114203510
- 07082975978
- 08148756975

Use the exact numbers provided. Do not change their order or digits.

Make each number a clickable telephone link using the corresponding international-format `tel:` URI.

Display an appropriate label such as “For RSVP Enquiries” or “Need Help With Your RSVP?”

On mobile devices, guests should be able to tap a number to initiate a call.

Keep the contact information visible on the RSVP page and accessible from the wedding details section.

Do not use the numbers as administrator credentials, database passwords, or authentication secrets.

## 9. PRIVATE RSVP EXPERIENCE

Implement a genuine invitation-based RSVP system.

The public website may be viewed by anyone, but submitting an RSVP must require a valid invitation.

Each invited guest should have:
- A unique guest ID.
- Full name.
- Optional email address.
- Optional phone number.
- A permitted attendee count.
- An invitation status.
- A securely generated invitation token or code.
- An optional invitation expiry.
- An optional RSVP deadline.

The RSVP experience should allow a verified guest to:
- Confirm attendance.
- Decline attendance.
- Confirm the guest's name.
- Specify the number attending within the permitted limit.
- Select meal preferences if enabled.
- Submit accessibility requests if enabled.
- Leave an optional private note.

Provide clear success and error states.

Prevent:
- Invalid or expired invitations.
- Unauthorized access to guest information.
- Duplicate RSVP records.
- Attendee counts above the allowed maximum.
- Unauthorized updates after the RSVP deadline.
- Enumeration of other guests.
- Abuse through repeated submissions.

Use cryptographically secure invitation tokens, securely store token hashes where applicable, and avoid placing personal information in URLs.

A guest should be able to update their response only after valid invitation verification and only when the configured rules allow it.

If the invitation is invalid, direct the guest to contact the wedding team using the official RSVP phone numbers.

Do not allow public visitors to browse the guest list.

## 10. DATABASE AND BACKEND

Use Supabase PostgreSQL.

Create migrations for these tables:

### weddings
- id
- couple_display_names
- event_date
- timezone
- ceremony_start_time
- venue_name
- venue_address
- venue_map_url
- dress_code
- reception_details
- RSVP deadline
- welcome_message
- contact numbers
- optional feature settings
- created_at
- updated_at

Seed the main wedding configuration with the confirmed information in this prompt.

### guests
- id
- wedding_id
- full_name
- email, nullable
- phone, nullable
- invitation_token_hash
- max_attendees
- invitation_status
- invitation_expiry, nullable
- created_at
- updated_at

### rsvps
- id
- guest_id, unique
- attendance_status
- attendee_count
- meal_preference, nullable
- accessibility_request, nullable
- private_message, nullable
- submitted_at
- updated_at

### gallery_images
- id
- wedding_id
- storage_path
- caption
- alt_text
- display_order
- published
- created_at

### love_story_entries
- id
- wedding_id
- title
- content
- milestone_date, nullable
- image reference, nullable
- display_order
- published
- created_at
- updated_at

### wishes
- id
- wedding_id
- display_name
- message
- moderation_status
- created_at
- updated_at

### admin_profiles
- user_id referencing Supabase Auth
- wedding_id
- role
- created_at

Add foreign keys, appropriate indexes, status constraints, timestamps, and data validation constraints.

Use a unique constraint on the RSVP guest reference and implement safe transactional operations where necessary.

Use Supabase Storage for the gallery. Store metadata and storage paths in the database.

Create development-only sample data clearly labelled as fictional. Never use fictional guest records in the live wedding database.

## 11. ADMINISTRATION DASHBOARD

Create a protected `/admin` area.

Use Supabase Auth and explicitly authorized administrator accounts.

Dashboard overview:
- Total invited guests.
- Accepted invitations.
- Declined invitations.
- Pending responses.
- Confirmed attendee count.
- RSVP response rate.
- Recent activity.

Guest management:
- Add and edit guests.
- Search guests.
- Filter by invitation or RSVP status.
- Set attendee limits.
- Generate, revoke, and resend invitation links.
- Review individual responses.
- Export authorized records to CSV.

Wedding management:
- Edit couple display names.
- Update the date and time.
- Update the venue and map link.
- Manage RSVP contact numbers.
- Set the RSVP deadline.
- Update dress code and event details.
- Edit love story entries.
- Upload and manage photographs.
- Moderate wedding wishes.

All administrative functions must work with the database. Do not create buttons that merely look functional.

Show loading indicators, confirmation dialogs, error messages, and success feedback.

Never permit a newly registered public user to become an administrator automatically.

## 12. GALLERY

Implement:
- Responsive photo grid.
- Full-screen lightbox.
- Keyboard-accessible navigation.
- Image captions and alt text.
- Lazy loading.
- Image optimization.
- Mobile-friendly interactions.
- Empty states when photos are unavailable.

Administrators must be able to upload, reorder, publish, unpublish, and delete images.

Only published, approved wedding photographs should be publicly visible.

Use actual couple photographs once supplied.

## 13. WEDDING WISHES

Allow guests to submit congratulatory messages.

Fields:
- Display name.
- Message.

Requirements:
- Validate the message length.
- Sanitize displayed content.
- Rate-limit submissions.
- Store messages in Supabase.
- Require administrator moderation.
- Publish approved messages only.
- Allow administrators to approve, reject, hide, and delete submissions.

Do not expose moderation notes or private guest information.

## 14. EMAIL NOTIFICATIONS

Use Resend for optional transactional emails.

Implement:
- RSVP confirmation emails.
- RSVP update confirmation emails.
- Optional administrator notifications.
- Optional reminders for guests who have not responded, with explicit administrative approval.

Use elegant branded email templates.

Use a verified sender address when configured.

If email delivery fails after an RSVP has been saved, preserve the RSVP and report the notification failure. Do not lose the response because an email could not be sent.

Do not claim that an email was delivered without confirmation from the provider.

## 15. SECURITY REQUIREMENTS

Enable Row Level Security on every exposed database table.

Use least-privilege access policies.

Public users may read published wedding content and approved wishes only.

Private guest data, invitation tokens, RSVP records, and administrator profiles must not be publicly readable.

Protect every administrator route, API endpoint, and server action with server-side authorization.

Verify guest invitations on the server.

Keep privileged Supabase keys on the server only.

Never commit secrets to the repository.

Validate all inputs on the server, apply rate limits, sanitize output, and use secure token handling.

Protect CSV exports and all guest management functions.

Test both authorized and unauthorized access paths.

## 16. REQUIRED ROUTES

Public:
- `/`
- `/our-story`
- `/wedding-details`
- `/gallery`
- `/rsvp`
- `/wishes`

Administration:
- `/admin/login`
- `/admin`
- `/admin/guests`
- `/admin/responses`
- `/admin/gallery`
- `/admin/story`
- `/admin/wishes`
- `/admin/settings`

Use a shared public layout and a distinct administration layout.

## 17. PROJECT STRUCTURE

Organize the codebase into:
- `app/` for pages and server routes.
- `components/` for reusable interface components.
- `lib/supabase/` for database and authentication clients.
- `lib/validation/` for input validation.
- `lib/email/` for notification services.
- `supabase/migrations/` for version-controlled SQL.
- `public/images/` for approved static assets.
- `.env.example` for documented environment variables.
- `README.md` for setup and deployment instructions.

Follow secure Next.js and Supabase practices.

## 18. DEPLOYMENT

Deploy to Vercel and use the free Vercel subdomain initially.

Provide environment variable placeholders for:
- Supabase project URL.
- Supabase publishable key.
- Resend API key.
- Verified sender email.
- Public site URL.
- Any additional required server-only configuration.

Do not commit actual credentials.

Document how to:
1. Install dependencies.
2. Run the application locally.
3. Create and configure the Supabase project.
4. Run database migrations.
5. Configure authentication and storage.
6. Configure the email provider.
7. Create the first authorized administrator securely.
8. Deploy to Vercel.
9. Test the live website on a mobile device.

Do not claim that the application has been deployed or configured unless those actions have actually been completed.

## 19. TESTING AND QUALITY ASSURANCE

Test:
- Correct wedding date and local time.
- Countdown accuracy.
- Mobile and desktop layouts.
- RSVP submission and updates.
- Invalid, expired, and revoked invitations.
- Attendee-count restrictions.
- Duplicate response prevention.
- Database permissions.
- Administrator authentication.
- Private guest data protection.
- Gallery publication permissions.
- Wishes moderation.
- Email failure handling.
- CSV export authorization.
- Production build and type checking.

Resolve errors before declaring a phase complete.

## 20. IMPLEMENTATION PLAN

Phase 1: Establish the application foundation, design system, navigation, homepage, love story, and wedding details.

Phase 2: Configure Supabase, database migrations, storage, authentication, and security policies.

Phase 3: Implement private invitation verification, RSVP, validation, and notifications.

Phase 4: Implement the gallery and moderated wedding guestbook.

Phase 5: Implement the administration dashboard, guest management, analytics, and exports.

Phase 6: Perform security, accessibility, responsive, and production testing, then deploy to Vercel.

Prioritize a fully working core experience over optional enhancements.

## 21. ACCEPTANCE CRITERIA

The project is complete when:
- The website displays Peace and Micheal's confirmed wedding information accurately.
- The design consistently uses white, gold, and black.
- The wedding venue, address, date, and 10:00 AM time are correct.
- All three RSVP phone numbers are displayed and clickable.
- Guests can RSVP only through valid invitations.
- Unauthorized visitors cannot read private guest records.
- The gallery and guestbook work.
- Administrators can manage the wedding and guest list.
- Database policies and server-side authorization are tested.
- The application builds successfully for production.
- Deployment instructions are documented.
- No essential button or workflow is a nonfunctional placeholder.

Begin by inspecting the existing repository and implementing Phase 1. Continue through the remaining phases, providing a summary of completed work, changed files, setup requirements, and test results after each phase.

Use the confirmed wedding information as the source of truth throughout the application. Ask for missing personal details only when necessary, and never invent them.