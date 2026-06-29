# Industrial Cleaning Services — Developer Handoff

Welcome. This document gets a new developer from a fresh clone to a working
local copy in roughly 30 minutes, and explains the moving parts of the
production application.

## Stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| UI primitives | React 19 |
| Database | Supabase (PostgreSQL) |
| Transactional email | Resend |
| Admin SMS notifications | Twilio (toll-free SMS) |
| Hosting | Vercel |
| Drag-and-drop pipeline | dnd-kit |
| Charts | Recharts |

The app is a single Next.js project — the marketing site, the booking API,
and the internal admin CRM all live under `src/app/`.

## Directory layout

```
src/
├── app/
│   ├── layout.tsx          Root <html> + font loading
│   ├── page.tsx            Public marketing homepage
│   ├── privacy/            Privacy policy page
│   ├── admin/              Admin panel (password-gated)
│   │   ├── bookings/       List + detail views for customer bookings
│   │   ├── invoices/       Invoice management
│   │   ├── leads/          Lead intake
│   │   ├── pipeline/       Drag-and-drop deal pipeline
│   │   └── login/          Admin password gate
│   └── api/
│       ├── bookings/       Public POST endpoint that creates a booking
│       └── admin/          Auth + CRUD endpoints for the admin panel
├── components/             Shared React components (Navbar, Footer, sections,
│                           BookingWidget, admin widgets)
└── lib/
    ├── supabase.ts         Supabase client factory
    ├── email.ts            Resend-backed email helpers
    ├── sms.ts              Twilio-backed admin SMS helper
    ├── pricing.ts          Pricing calculation
    ├── invoice.ts          Invoice generation helpers
    └── types.ts            Shared TypeScript types
```

The single source of truth for the database schema is
`supabase-schema.sql` in the repo root.

## Local setup

```bash
# 1. Install dependencies
npm install

# 2. Create your local env file
cp .env.local.example .env.local

# 3. Fill in real credentials in .env.local (see "Environment variables" below)

# 4. Apply the schema to a fresh Supabase project
#    (Open supabase-schema.sql, paste into Supabase SQL Editor, run)

# 5. Run the dev server
npm run dev
```

The site will be at `http://localhost:3000`. The admin panel is at
`http://localhost:3000/admin/login`.

## Environment variables

All variables go in `.env.local` (gitignored). Production values live in the
Vercel dashboard under Project → Settings → Environment Variables.

| Variable | Purpose | Where to get it |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Supabase dashboard → Project Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only Supabase service role key | Supabase dashboard → Project Settings → API. **Server-side only — never expose to the browser.** |
| `RESEND_API_KEY` | Resend API key for transactional email | resend.com → API Keys |
| `EMAIL_FROM` | Display name + verified from-address | Set to your verified Resend domain, e.g. `Industrial Cleaning Services <bookings@yourdomain.com>` |
| `ADMIN_EMAIL` | Where admin notifications are delivered | Any inbox you own |
| `TWILIO_ACCOUNT_SID` | Twilio account SID | Twilio Console homepage → Account Info |
| `TWILIO_AUTH_TOKEN` | Twilio auth token | Twilio Console homepage → Account Info |
| `TWILIO_FROM_NUMBER` | Twilio outbound number in E.164 format | Twilio Console → Phone Numbers |
| `ADMIN_PHONE` | Where admin SMS notifications are delivered, E.164 format | Any number you own |
| `ADMIN_PASSWORD` | Password that gates the `/admin` panel | Choose a long random string |

`NEXT_PUBLIC_` prefix means the variable is exposed to the browser. Anything
else stays server-side. Treat all non-prefixed variables as production
secrets.

## Database

The schema is in `supabase-schema.sql`. Tables:

- `customers` — name, contact info, address
- `bookings` — references a customer, holds bedroom/bathroom counts,
  frequency, scheduled date/time, price, status, free-form notes
- `leads` — pre-booking inquiries
- `invoices` — finance records linked to bookings

Run the schema once in the Supabase SQL Editor against a fresh project.

The app uses the **service role key** server-side — no row-level security is
configured, so the application code is the security boundary. Do not point
client-side code at the service role key.

## Booking flow

1. A visitor fills out `<BookingWidget />` on the homepage and submits.
2. The browser POSTs to `/api/bookings/route.ts`.
3. The route validates the payload, recalculates the price server-side via
   `lib/pricing.ts`, upserts the customer by email, and inserts the booking.
4. Three notifications fire in parallel (non-blocking) via
   `Promise.allSettled`:
   - Customer email confirmation (`sendBookingConfirmation`)
   - Admin email notification (`sendAdminNotification`)
   - Admin SMS notification (`sendAdminBookingSMS`)
5. The browser receives `{ success: true, bookingId }` and shows a
   confirmation UI.

If any of the three notifications fail, the booking is still recorded —
failures are logged but never block the response.

## Admin panel

The `/admin/*` routes are gated by a single password (`ADMIN_PASSWORD`) and
a session cookie set by `/api/admin/auth/route.ts`. The admin dashboard
shows totals, recent activity, and a 12-week revenue chart. Each table
(bookings, invoices, leads, pipeline) has its own list and detail views.

If you need real multi-user auth, replace the password gate with Supabase
Auth or Clerk; the data model already separates application code from auth.

## Deployment

The repo deploys to Vercel on every push to `master`. Production env vars
are managed in the Vercel dashboard. There's no separate staging environment
configured — Vercel preview deployments are created automatically for
non-`master` branches if you want one.

Build command: `next build` (default). Output: static + serverless functions
in `.next/`. No custom build steps.

## Email

Outbound email goes through Resend. The sending domain must be verified in
the Resend dashboard (DKIM, SPF, and a DMARC record). Once verified, set
`EMAIL_FROM` to use that domain — e.g.
`Industrial Cleaning Services <bookings@industrialcleaning.services>`.

If `RESEND_API_KEY` is unset, email sends will throw. The booking flow
catches these in `Promise.allSettled` so the booking still records, but the
admin and customer never get a confirmation.

## SMS

Outbound admin SMS goes through Twilio. The from-number should be a
toll-free number with messaging verification approved by carriers. Carrier
approval applies per phone number, so if the number changes, verification
must be re-submitted.

If any of `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_FROM_NUMBER`,
or `ADMIN_PHONE` is unset, `sendAdminBookingSMS` warns and returns without
sending, leaving the rest of the booking flow untouched.

## Common edits

| Want to change | File |
| --- | --- |
| Hero photo | `public/hero3.jpeg` |
| Logo | `public/web-ics-logo-officisl.png` |
| Pricing math | `src/lib/pricing.ts` |
| Booking confirmation email template | `src/lib/email.ts` (`sendBookingConfirmation`) |
| Admin email template | `src/lib/email.ts` (`sendAdminNotification`) |
| SMS body | `src/lib/sms.ts` |
| Service area list (footer) | `src/components/Footer.tsx` |
| Reviews shown on homepage | `src/components/Reviews.tsx` |
| Service categories | `src/components/ServicesSection.tsx` |
| Privacy policy copy | `src/app/privacy/page.tsx` |

## Conventions

- All times in the database are stored as `TIMESTAMPTZ` (UTC). Display
  conversion is done at render time.
- Prices are stored as integers (whole dollars). No cents.
- Booking statuses: `pending`, `confirmed`, `completed`, `cancelled`.
- Phone numbers in the database are stored as user-entered strings;
  `ADMIN_PHONE` and `TWILIO_FROM_NUMBER` env vars must be E.164 format
  (`+1XXXXXXXXXX`).

## Troubleshooting

| Symptom | Likely cause |
| --- | --- |
| Booking returns 500 | Supabase env var wrong, or schema not applied |
| No customer email arrives | `RESEND_API_KEY` missing or `EMAIL_FROM` uses an unverified domain |
| No admin SMS arrives | Twilio env vars missing, or the toll-free number does not yet have approved carrier verification |
| Admin login loops back | `ADMIN_PASSWORD` mismatch, or cookies blocked |
| Build fails on Vercel but works locally | Missing env var in Vercel dashboard, or Node version mismatch |

## Production checklist for a fresh deploy

- [ ] New Supabase project created and `supabase-schema.sql` applied
- [ ] Resend domain verified (DKIM + SPF + DMARC)
- [ ] Twilio toll-free number purchased and messaging verification approved
- [ ] All env vars set in Vercel for the Production environment
- [ ] Custom domain pointed at Vercel and SSL active
- [ ] Admin login test passes
- [ ] Test booking creates a row, sends customer email, sends admin email,
      sends admin SMS

That's it. Open an issue or reach out to the previous maintainer if you get
stuck on any of the integrations.
