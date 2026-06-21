# We Sustain Mobile

The mobile companion to the We Sustain web platform — an employee-first, gamified
corporate volunteering app. Built with **Expo (React Native)**, **Expo Router**, and
**TypeScript**.

This build runs entirely on realistic **in-app mock data**, so the whole app is clickable
and demoable with no backend or accounts required. The data layer is isolated so a real
backend (e.g. the Supabase setup used by the web app) can be wired in later.

## Screens

| Tab        | Screen          | What it shows |
|------------|-----------------|---------------|
| Home       | Dashboard       | Total hours, weekly streak, rank, progress to next milestone badge, upcoming sessions, recent badges |
| Explore    | Organizations   | Searchable directory with cause filters → org detail with live session sign-up |
| Leaders    | Leaderboard     | Individual podium + full ranking and team standings (reflects your live hours) |
| Donate     | Goods Drives    | First-class item drives (coats, food, clothing, books, toys) with pledge flow |
| Impact     | Profile         | Your activity (upcoming/completed), full badge collection, sign out |

Plus an auth stack (`login` / `signup`) gated by an in-memory session.

## Getting started

> Requires Node 18+ (tested on Node 22). Install the **Expo Go** app on your phone.

```bash
cd mobile
npm install        # already run by the scaffolder, safe to re-run
npm start          # starts the Metro dev server + QR code
```

Then:

- **Phone (easiest):** open Expo Go and scan the QR code in the terminal. Phone and
  computer must be on the same Wi‑Fi.
- **iOS Simulator (macOS only):** press `i` in the terminal.
- **Android Emulator:** press `a` in the terminal.

### Demo flow

1. Sign in (the form is pre-filled — just tap **Sign in**).
2. On **Explore**, open an organization and tap **Sign up** for a session.
3. The new commitment appears on the **Home** dashboard and under **Impact → My Activity**.
4. In **Impact**, tap **Mark as completed** — total hours go up and milestone badges/leaderboard
   rank update live.
5. On **Donate**, pledge items to a drive and watch the progress bar move.

## Project structure

```
mobile/
  app/
    _layout.tsx            Root stack + providers (theme, app store)
    index.tsx              Auth gate → redirects to tabs or login
    (auth)/                login + signup
    (tabs)/                Home, Organizations, Leaderboard, Donate, Profile
    organization/[id].tsx  Org detail + session sign-up
  components/ui.tsx        Reusable UI kit (Screen, Card, Button, Pill, ProgressBar, Avatar…)
  lib/
    theme.ts               Design tokens (cyan "brand" palette matching the web app)
    types.ts               Shared types
    mock.ts                Seed data (orgs, drives, leaderboard, badges)
    store.tsx              In-memory app state (auth, sign-ups, donations, derived hours/badges)
```

## Wiring a real backend later

All reads/writes go through `lib/store.tsx` and the seed data in `lib/mock.ts`. To go live:

1. Replace the seed arrays with fetches (the web app already has a Supabase client).
2. Swap the in-memory `signIn`/`signOut` for Supabase Auth.
3. Replace the `toggleSignup` / `contribute` mutations with API calls.

The UI components and screens won't need to change.
