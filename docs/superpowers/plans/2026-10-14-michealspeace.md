# Micheal’sPeace Implementation Plan

Goal: Deliver the supplied wedding build specification in the existing project.
Architecture: Preserve React/Vite and Tailwind; one Express API runs locally and as a Vercel function. Server-only Supabase credentials, verified administrator sessions, hashed invitations, private photograph storage, and transactional RSVP persistence. Local demonstration is explicit and disabled in production.
Spec: ../specs/2026-10-14-michealspeace-design.md
Execution: Native in this session, as requested in the supplied phased build prompt.

Global constraints: Exact confirmed wedding details; no invented personal story or photographs; no browser guest registry, privileged credentials, or fake authentication. Unknown details remain empty and editable.
Review focus: Concurrent duplicate responses; ordinary authenticated users; expired/regenerated invitations; email failures after persistence; unpublished photographs and guest data.

- [ ] Phase 1: Replace fictional seed content; retain editorial palette and reusable public components; add accessible empty states, correct timezone/calendar utilities, contact links, and complete navigation. Verify countdown and calendar with Node tests.
- [ ] Phase 2: Implement server repository (Supabase plus opt-in local demo), schema upgrade migration, scoped RLS, private storage, verified cookie authentication, durable rate limiting, same-origin writes. Test rejected anonymous administration before wiring UI.
- [ ] Phase 3: Invitation POST verification and RSVP transaction, generated tokens stored as SHA-256 only, expiry/revocation/deadline enforcement, strict validation, provider-confirmed email status. Test invalid, expired, revoked, excessive, repeated, and concurrent submissions.
- [ ] Phase 4: Private storage upload with server MIME/size checks, signed published URLs, real moderated wishes, message length and spam controls. Test publication and moderation boundaries.
- [ ] Phase 5: Real URL-based administrator routes, registry editing/filtering, invitation copy/resend/rotation, response analytics/CSV, story/photo ordering, moderation, config editing, feedback and confirmations. Verify API authorization and browser workflows.
- [ ] Phase 6: Type check, production build, Node integration tests and SQL permission tests; desktop/mobile browser verification; document configuration and deployment. Deploy only to the intended connected project after credentials/account are identified.
