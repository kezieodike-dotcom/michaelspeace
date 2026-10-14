# MICHEAL’SPEACE

## Wedding Website — Product Requirements Document (PRD)

Version 1.0 · Prepared 14 October 2026 · Status: Baseline for design and development

Couple: Peace and Micheal Wedding date: Saturday, 7 November 2026 Time: 10:00 AM West Africa Time (WAT, UTC+1) Venue: Dunamis Intl Gospel Centre (DIGC), 117, Agbani Road, Achara Layout, Enugu, Nigeria.

## 1. Document Control

| Field              | Details                                              |
| ------------------ | ---------------------------------------------------- |
| Project name       | Micheal’sPeace Wedding Website                       |
| Document           | Product Requirements Document (PRD)                  |
| Version            | 1.0                                                  |
| Prepared date      | 14 October 2026                                      |
| Primary audience   | Project owner, UI/UX designer, developers, QA tester |
| Initial deployment | Vercel free subdomain                                |

## 2. Executive Summary

Micheal’sPeace is a premium, mobile-first wedding website for Peace and Micheal. It will serve as the couple’s digital invitation and central information hub, enabling guests to learn about the couple, view wedding details, submit private RSVPs, browse approved photographs, and leave messages of goodwill.

A protected administration area will allow authorised administrators to manage invited guests, review responses, moderate wishes, and update public content.

The experience should feel timeless, romantic, elegant, and trustworthy, using white, gold, and black as the core brand colours. The public website may be shared freely, but invitation details, guest records, and RSVP responses must remain private and protected.

## 3. Product Vision and Objectives

Vision: To create an elegant digital wedding experience that makes event information easy to access and RSVP management simple for the couple.

### Objectives

- Present the couple and their wedding details in a polished, memorable way.
- Make the date, time, venue, directions, and RSVP options easy to find on mobile and desktop.
- Allow only invited guests with a valid invitation code or token to submit an RSVP.
- Give authorised administrators a secure place to manage guests and responses.
- Display selected gallery images and approved guest wishes without exposing private records.
- Launch initially on a free Vercel subdomain, with the option to connect a custom domain later.

## 4. Success Metrics

| Metric                | Success condition                                                                                     |
| --------------------- | ----------------------------------------------------------------------------------------------------- |
| Usability             | Guests can locate event details and the RSVP action without assistance.                               |
| RSVP integrity        | Only valid invitation codes or tokens can create or update an RSVP.                                   |
| Privacy               | Guest lists, contact details, invitation codes, and individual responses are not publicly accessible. |
| Admin efficiency      | An authorised administrator can search and filter guests and export RSVP records to CSV.              |
| Responsive experience | Core pages and the RSVP flow work across common mobile, tablet, and desktop sizes.                    |
| Performance           | Core pages load efficiently, with compressed and appropriately sized images.                          |

## 5. Target Users and Roles

### 5.1 Wedding Guest

Needs:

- View wedding details and the couple’s story.
- Browse approved photographs.
- Submit an RSVP using a valid invitation code.
- Optionally leave a wish for the couple.
- Contact the wedding team for assistance.

Permissions: Public content access, invitation-authorised RSVP submission, and wish submission for moderation.

### 5.2 Administrator

Needs:

- Manage invited guests.
- Review RSVP responses and attendance numbers.
- Manage gallery and story content.
- Moderate guest wishes.
- Export guest and RSVP data.

Permissions: Authenticated access to assigned administration functions.

### 5.3 Super Administrator

Needs:

- Manage all administrative functions and settings.
- Authorise administrator accounts.
- Oversee security and data management.

Permissions: Full privileged access, restricted to the project owner or explicitly approved operators.

## 6. Scope of the Product

### 6.1 Features Included in the Initial Release

- Responsive public wedding website.
- Home page with couple’s names, wedding date, countdown, and RSVP call to action.
- Our Story page with editable story content and optional timeline.
- Wedding Details page with the venue, address, date, time, directions link, and RSVP contacts.
- Gallery with image viewing and lightbox functionality.
- Invitation-code/token-based RSVP.
- Attending and unable-to-attend response options.
- Configurable guest or party attendance limits.
- Optional meal and accessibility notes.
- Wishes/guestbook with moderation.
- Protected admin login and dashboard.
- Guest and response management.
- RSVP statistics and CSV export.
- Content management for the story and gallery.
- Optional email notifications through Resend.
- Supabase database, authentication, and storage integration.
- Deployment documentation, environment-variable template, and basic automated tests.

### 6.2 Out of Scope for the Initial Release

- Online gift payments or a cash contribution system.
- Public browsing or searching of the invited guest list.
- Public self-registration for administrator access.
- Live streaming or video conferencing.
- Paid hosting or a custom domain purchase.
- Unconfirmed reception details, dress codes, programme schedules, or after-party information.
- Fabricated couple photographs, personal history, or venue coordinates.

## 7. Confirmed Wedding Information

| Item                   | Confirmed value                                 |
| ---------------------- | ----------------------------------------------- |
| Project name           | Micheal’sPeace                                  |
| Couple’s display names | Peace and Micheal                               |
| Wedding date           | Saturday, 7 November 2026                       |
| Wedding time           | 10:00 AM WAT                                    |
| Timezone               | Africa/Lagos, UTC+1                             |
| Venue                  | Dunamis Intl Gospel Centre (DIGC)               |
| Address                | 117, Agbani Road, Achara Layout, Enugu, Nigeria |
| RSVP contact 1         | 08114203510                                     |
| RSVP contact 2         | 07082975978                                     |
| RSVP contact 3         | 08148756975                                     |

The three RSVP contact numbers must be displayed accurately wherever RSVP assistance is offered. Each number should be clickable as a telephone link on supported devices.

These numbers are contact details only and must not be used as administrator credentials.

## 8. Brand and User Experience Requirements

| Element             | Specification                                                                                                           |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Primary colour      | White — `#FFFFFF`                                                                                                       |
| Gold accent         | Gold — `#C5A46D`                                                                                                        |
| Primary dark colour | Black — `#111111`                                                                                                       |
| Supporting colour   | Ivory — `#F7F2E9`                                                                                                       |
| Supporting colour   | Champagne — `#E9DFD0`                                                                                                   |
| Supporting colour   | Taupe — `#766452`                                                                                                       |
| Visual direction    | Timeless luxury, editorial layouts, generous whitespace, elegant imagery, and restrained gold accents                   |
| Heading font        | Cormorant Garamond                                                                                                      |
| Body font           | Inter                                                                                                                   |
| Animation           | Subtle fade and slide transitions with tasteful hover effects                                                           |
| Responsive design   | Mobile-first, adapting to mobile phones, tablets, and desktop screens                                                   |
| Accessibility       | Semantic headings, readable contrast, keyboard navigation, visible focus indicators, labelled forms, and image alt text |

The website should feel premium without being visually crowded. Animations should remain subtle and respect users who prefer reduced motion.

## 9. Information Architecture and Website Pages

### 9.1 Public Pages

| Route              | Purpose and content                                                                                            |
| ------------------ | -------------------------------------------------------------------------------------------------------------- |
| `/`                | Hero section, couple’s names, date, countdown, RSVP button, welcome message, story preview, and event summary. |
| `/our-story`       | Editable couple story and optional relationship timeline.                                                      |
| `/wedding-details` | Wedding date, time, venue, address, directions, and RSVP contact information.                                  |
| `/gallery`         | Approved photographs displayed in a responsive grid with a lightbox.                                           |
| `/rsvp`            | Invitation-code validation and private RSVP form.                                                              |
| `/wishes`          | Wish submission form and publicly visible approved messages only.                                              |

### 9.2 Administration Pages

| Route              | Purpose                                                                                |
| ------------------ | -------------------------------------------------------------------------------------- |
| `/admin/login`     | Secure administrator sign-in.                                                          |
| `/admin`           | Dashboard with RSVP statistics and management shortcuts.                               |
| `/admin/guests`    | Manage invited guests, invitation codes, attendance limits, and CSV exports.           |
| `/admin/responses` | Review RSVP responses and filter by attendance status.                                 |
| `/admin/gallery`   | Upload, organise, publish, and remove photographs.                                     |
| `/admin/story`     | Edit and publish the couple’s story.                                                   |
| `/admin/wishes`    | Approve, reject, hide, or delete submitted wishes.                                     |
| `/admin/settings`  | Manage approved public content, settings, and administrative access where implemented. |

All administration routes must be protected against unauthorised access.

## 10. Functional Requirements

### 10.1 Home Page and Countdown

The home page must:

- Display the exact couple names, Peace and Micheal, and project name, Micheal’sPeace.
- Display the wedding date and time prominently.
- Include a live countdown to the wedding.
- Provide clear calls to action for RSVP, wedding details, and the couple’s story.
- Offer easy navigation to the gallery and wishes section.
- Use optimised imagery and graceful placeholders until approved photographs are supplied.

Countdown requirement: The target is 7 November 2026 at 10:00 AM in the `Africa/Lagos` timezone. The implementation must handle timezones correctly rather than relying on the visitor’s device timezone.

### 10.2 Wedding Details and Directions

The page must:

- Show the confirmed venue and full address exactly as supplied.
- Display the wedding date and time.
- Provide a directions link once the destination has been verified.
- Display all three RSVP contact numbers.
- Make the contact numbers clickable using telephone links.
- Avoid adding unconfirmed details, such as a reception venue, dress code, or programme schedule.

### 10.3 Private RSVP System

The RSVP system must:

1. Require a valid invitation code or token before allowing a guest to access or submit an RSVP.
2. Allow administrators to define each invitation’s permitted attendance limit.
3. Allow guests to select either Attending or Unable to Attend.
4. Capture the permitted guest information, such as guest name and number attending.
5. Support optional meal preferences or accessibility notes if the couple decides to collect them.
6. Validate all submitted information on the server, not only in the browser.
7. Reject invalid, expired, revoked, or over-limit invitation codes.
8. Display a clear confirmation after a successful submission.
9. Avoid exposing other guests’ information.
10. Provide a contact-help option for guests who have trouble with their invitation codes.

Repeat submissions: The system should update an existing RSVP for the same invitation according to the defined policy, rather than creating uncontrolled duplicate responses.

### 10.4 Guest and RSVP Administration

Administrators must be able to:

- Create, edit, deactivate, and search guest records.
- Issue unique, difficult-to-guess invitation codes or tokens.
- Revoke or regenerate invitation codes when necessary.
- View the number of invited guests and response statistics.
- See attending, declining, and awaiting-response counts.
- Filter guests and responses by status.
- Export guest and RSVP records to CSV.
- Review individual responses securely.

Private guest data must not appear in public APIs, client-side bundles, page source, or publicly accessible database queries.

### 10.5 Story and Gallery Management

The website must allow authorised administrators to:

- Create and edit story text.
- Add, edit, and reorder optional timeline entries.
- Upload photographs.
- Add image captions and alternative text.
- Reorder images.
- Publish or unpublish photographs.
- Remove images when necessary.

Supabase Storage or an equivalent configured storage service should be used, with appropriate access controls.

Only published photographs may appear in the public gallery. Until the couple provides approved images and story details, the site must use clearly identified placeholders rather than invented content.

### 10.6 Wishes and Guestbook

Visitors should be able to submit a name and a message for the couple.

Requirements:

- New wishes must be stored with a pending moderation status.
- Only approved wishes may appear publicly.
- Administrators must be able to approve, reject, hide, or delete wishes.
- The form must enforce reasonable message-length limits.
- User-submitted content must be rendered safely to prevent malicious scripts or injection.
- Basic spam protection must be implemented.

### 10.7 Optional Email Notifications

If Resend is configured, the website may:

- Send a confirmation email after a valid RSVP is submitted, provided an email address is collected.
- Notify authorised administrators of new RSVPs.
- Notify administrators of newly submitted wishes.

Email notifications must not be required for the RSVP to succeed. A delivery failure must not erase or invalidate a successfully saved response.

All email API keys must remain in server-only environment variables. Sender-domain verification must be completed before production email delivery is enabled.

## 11. Core User Flows

### 11.1 Guest RSVP Flow

1. The guest opens the wedding website.
2. The guest reviews the couple’s story and wedding details.
3. The guest selects the RSVP option.
4. The guest enters their invitation code or follows their invitation-specific link.
5. The server validates the invitation and permitted attendance limit.
6. The guest selects attending or unable to attend.
7. The guest completes any required fields and optional notes.
8. The server validates and saves the response.
9. The guest sees a confirmation message.
10. If assistance is required, the guest can contact one of the supplied RSVP numbers.

### 11.2 Administrator Guest Management Flow

1. The administrator signs in.
2. The administrator opens the dashboard.
3. The dashboard displays RSVP statistics.
4. The administrator searches or filters guest records.
5. The administrator updates guest or invitation information as required.
6. The administrator reviews responses and exports a CSV when needed.
7. The administrator signs out.

Protected pages and administrative operations must remain inaccessible to unauthorised users.

## 12. Proposed Database Structure

The following tables are proposed for Supabase Postgres. The final schema should be implemented through version-controlled database migrations.

| Table            | Key fields and purpose                                                                                                   |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `admin_profiles` | `user_id` linked to Supabase Auth, role, and creation timestamp. Defines authorised administrative roles.                |
| `guests`         | Guest ID, display name, invitation token reference, maximum attendees, status, optional contact details, and timestamps. |
| `rsvps`          | RSVP ID, guest ID, attendance status, attendee count, optional notes, submission time, and update time.                  |
| `story_sections` | Section ID, title, body, order index, publication status, and update time.                                               |
| `gallery_items`  | Image ID, storage path, alt text, caption, order index, publication status, and creation time.                           |
| `wishes`         | Wish ID, display name, message, moderation status, creation time, moderator, and moderation time.                        |
| `site_settings`  | Approved public event settings and content. Must not contain secrets or sensitive administrator credentials.             |

### Database Rules

- Enforce appropriate foreign-key relationships and database constraints.
- Prevent uncontrolled duplicate RSVP records for the same invitation.
- Use indexes for commonly searched guest and RSVP fields.
- Store invitation secrets safely, preferably as hashes or high-entropy tokens.
- Use Row Level Security (RLS) on tables exposed through Supabase APIs.
- Restrict public access to approved content only.

## 13. Security, Privacy, and Data Protection

Security is a critical requirement because the website will handle personal guest information.

The implementation must:

1. Enable Supabase Row Level Security on relevant tables.
2. Apply explicit, least-privilege access policies.
3. Never expose the Supabase service-role key, Resend API key, or other server secrets in browser code.
4. Keep guest lists, contact details, invitation codes, and RSVP responses private.
5. Validate invitation tokens, attendance limits, and submitted data on the server.
6. Protect all administrator pages and mutations through authentication and role checks.
7. Implement rate limiting or equivalent abuse controls for invitation validation and public submission endpoints.
8. Safely render user-submitted content to prevent cross-site scripting.
9. Avoid collecting personal information that is not required for the event.
10. Define a post-event policy for retaining or deleting guest and RSVP data.
11. Use HTTPS in production.
12. Provide an `.env.example` file containing variable names and placeholders only.
13. Ensure no secret keys are committed to the source-code repository.

Important: A hidden button or an unlinked admin page is not sufficient security. Authorisation must be enforced on the server and at the database level.

## 14. Non-Functional Requirements

| Area            | Requirement                                                                                                                  |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Performance     | Optimise images, minimise unnecessary client-side JavaScript, and use responsive image sizing.                               |
| Availability    | Use managed hosting and services appropriate for the event website, documenting any free-tier limitations.                   |
| Accessibility   | Follow WCAG 2.2 AA practices where practical, including keyboard navigation, contrast, labels, and focus states.             |
| Compatibility   | Support current major versions of Chrome, Safari, Firefox, and Edge on mobile and desktop.                                   |
| Maintainability | Use typed, modular components, reusable UI elements, clear naming, and documented setup instructions.                        |
| Reliability     | Provide loading, empty, success, and error states for forms and administration operations.                                   |
| Privacy         | Minimise exposure of guest data and prevent public access to private RSVP and admin routes.                                  |
| SEO and sharing | Provide appropriate page titles, descriptions, social-sharing metadata, and an approved social preview image when available. |

## 15. Recommended Technology Stack

| Layer             | Technology                                  | Purpose                                                                 |
| ----------------- | ------------------------------------------- | ----------------------------------------------------------------------- |
| Web application   | Next.js App Router, React, TypeScript       | Application structure, routing, typed code, and server-side operations. |
| Styling           | Tailwind CSS                                | Responsive layouts and consistent design tokens.                        |
| UI components     | shadcn/ui, where useful                     | Reusable and accessible interface components.                           |
| Animations        | Framer Motion                               | Subtle transitions and visual effects.                                  |
| Icons             | Lucide                                      | Consistent interface icons.                                             |
| Database          | Supabase Postgres                           | Guest records, RSVPs, wishes, and website content.                      |
| Authentication    | Supabase Auth                               | Administrator authentication.                                           |
| Image storage     | Supabase Storage                            | Gallery image management.                                               |
| Email             | Resend, optional                            | Transactional confirmations and notifications.                          |
| Deployment        | Vercel free subdomain initially             | Hosting and deployment.                                                 |
| Quality assurance | TypeScript checks, linting, automated tests | Detect common errors and protect critical flows.                        |

### Deployment Approach

The application should initially be deployed to a Vercel-provided free subdomain. A custom domain may be connected later if required.

The repository should include:

- Database migration files.
- An `.env.example` file.
- Local setup instructions.
- Deployment instructions.
- Tests for critical RSVP and access-control rules.

## 16. Analytics and Reporting

The admin dashboard should show:

- Total invited guests.
- Number of guests attending.
- Number of guests declining.
- Number of guests who have not responded.
- Estimated total attendees, where attendee counts are supported.

The system should distinguish between the number of RSVP responses and the total number of people expected to attend.

Analytics must not expose invitation tokens, guest contact details, names, or individual RSVP content unnecessarily.

CSV exports should contain only fields required for event operations and must be restricted to authorised administrators.

## 17. Acceptance Criteria

The project will be considered functionally acceptable when the following conditions are met:

- The public website displays the exact couple names, wedding date, time, venue, and address.
- The countdown uses 10:00 AM Africa/Lagos time on 7 November 2026.
- The site follows the specified white, gold, and black luxury design.
- The website works on mobile, tablet, and desktop.
- All three RSVP contact numbers are accurate and clickable.
- Invalid, revoked, missing, or over-limit invitation codes cannot submit an RSVP.
- A valid invited guest can submit an attending or declining response.
- A successful RSVP displays a clear confirmation.
- Repeat submissions follow the defined update policy without uncontrolled duplicates.
- Unauthenticated users cannot access protected admin pages or privileged operations.
- Public users cannot retrieve private guest lists, individual RSVP records, invitation tokens, or admin-only data.
- Only approved wishes and published gallery images appear publicly.
- An authorised administrator can manage guests, review responses, moderate wishes, and manage gallery and story content.
- An authorised administrator can export guest and RSVP records to CSV.
- No secret keys are exposed in client-side code or committed source files.
- Database migrations, `.env.example`, setup instructions, deployment instructions, and critical tests are included.

## 18. Testing Plan

| Test type             | Minimum coverage                                                                                                      |
| --------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Unit tests            | Countdown and timezone handling, invitation validation, RSVP business rules, and form validation.                     |
| Integration tests     | RSVP creation and updating, attendance limits, admin authorisation, wish moderation, and RLS behaviour.               |
| End-to-end tests      | Guest RSVP success and failure, admin login, guest search, CSV export, and content moderation.                        |
| Responsive testing    | Mobile navigation, forms, gallery, admin tables, and layout adaptation.                                               |
| Accessibility testing | Keyboard operation, form labels, focus states, contrast, and reduced-motion behaviour.                                |
| Deployment testing    | Environment variables, migrations, storage policies, HTTPS, optional email configuration, and secret exposure checks. |

## 19. Delivery Phases

1

Foundation

Set up the repository, design system, navigation, responsive shell, database schema, migrations, and environment template.

2

Public Website

Build Home, Our Story, Wedding Details, Gallery, and Wishes pages, including responsive styling and approved content placeholders.

3

RSVP and Administration

Implement invitation validation, RSVP processing, admin authentication, guest management, response dashboard, and CSV export.

4

Content Management and Email

Add story and gallery management, wishes moderation, optional Resend notifications, and complete error and empty states.

5

Quality Assurance and Launch

Review security and RLS, test accessibility and responsiveness, run automated tests, deploy to Vercel, and prepare handover instructions.

## 20. Assumptions, Dependencies, and Open Items

The following items should be supplied or confirmed before their associated features are finalised:

- The couple’s approved story, relationship milestones, and preferred invitation wording.
- Approved photographs and permission to publish them.
- Whether a reception or additional event will take place.
- Any confirmed dress code or programme details.
- Whether RSVP email addresses will be collected.
- The verified sender email address for optional notifications.
- The administrator accounts and people authorised to manage guest data.
- Whether meal preferences, accessibility requirements, plus-ones, or children should be captured.
- A verified map or directions destination.
- The invited guest list and invitation-code distribution process.
- The post-event policy for retaining or deleting guest and RSVP information.

Until these items are confirmed, the implementation must use clearly identified placeholders or omit the unconfirmed feature. It must not invent personal details or event information.

## 21. Launch Checklist

Before the website goes live:

- Confirm all public copy, wedding details, story content, and photographs with the couple.
- Import and verify the invited guest list and attendance limits.
- Create and test authorised administrator accounts.
- Run database migrations and verify RLS policies.
- Configure Vercel environment variables and verify the correct Supabase project.
- Test valid, invalid, revoked, and repeat RSVP submissions.
- Test privacy boundaries and administrator access restrictions.
- Verify all RSVP telephone links on mobile devices.
- Verify the directions link.
- Confirm the countdown date, time, and timezone.
- If email is enabled, verify Resend sender configuration and test delivery.
- Run responsive, accessibility, and end-to-end tests.
- Share the live Vercel URL with the project owner.
- Deliver administrator handover instructions securely.

## 22. Final Product Definition

The initial release of Micheal’sPeace is complete when:

1. The public wedding website presents the confirmed wedding information in a polished, responsive experience.
2. Invited guests can securely submit private RSVPs.
3. Only approved public content is displayed.
4. Authorised administrators can manage guests, responses, gallery content, story content, and wishes through a protected dashboard.
5. The website can be deployed to a Vercel free subdomain with documented configuration and no exposed secrets.

End of Product Requirements Document.