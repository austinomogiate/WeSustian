# We Sustain

Volunteer matching platform for company staff built with Next.js 14, Supabase, Prisma, and Tailwind CSS.

## Getting Started

1. Install dependencies:
   - `npm install`
2. Copy `.env.example` to `.env.local` and fill in all values.
3. Run development server:
   - `npm run dev`

## Scaffolded Routes

- `/` public landing page
- `/auth/login` public login
- `/auth/signup` public sign-up
- `/dashboard` protected staff dashboard
- `/organizations` protected organization directory
- `/organizations/[id]` protected organization detail
- `/my-signups` protected signups page
- `/admin` protected admin page

## Next Steps

- Implement Supabase Auth actions for login/sign-up/logout.
- Add Prisma schema and migrations.
- Build organization data fetching and session sign-up flow.
