# Deploying We Sustain

This guide covers deploying the **web app** (Next.js) to get a public, shareable link
that anyone can open on phone or desktop — no install required.

> Live link: **https://we-sustian.vercel.app/**
> Repo: **https://github.com/austinomogiate/WeSustian**

---

## What gets deployed

- The **Next.js web app** at the repo root (`app/`, `components/`, `lib/`) is what gets
  hosted and shared. It is fully responsive and an installable PWA.
- The **Expo mobile app** in `mobile/` is a separate native app for phones via Expo Go.
  It is **not** part of the web deploy and is ignored by the hosting build.
- The web app runs on **mock data** (no backend/keys needed), so the deployed link is
  instantly usable by anyone.

---

## First-time deploy (Vercel)

Vercel is the easiest host for Next.js — free, and it auto-deploys on every push to GitHub.

1. Go to <https://vercel.com/signup> and choose **Continue with GitHub** (log in / authorize).
2. Click **Add New… → Project**.
3. Find **`WeSustian`** in the repo list and click **Import**.
   - If it's missing, click **Adjust GitHub App Permissions** and grant access to the repo.
4. Vercel auto-detects **Next.js** — leave all settings at their defaults:
   - Framework Preset: `Next.js`
   - Root Directory: `./`
   - Build Command / Output: default (do not override)
   - Environment Variables: **none required**
5. Click **Deploy** and wait ~1–2 minutes.
6. You get a public URL like `https://<project>.vercel.app` — that's your shareable link.

---

## Updating the live site

Auto-deploy is enabled. To publish changes:

```bash
git add -A
git commit -m "your message"
git push
```

Vercel rebuilds and updates the same link automatically within a minute or two.

---

## Verify a deploy is healthy

All of these should return HTTP `200`:

```
/                      (landing)
/auth/login            /auth/signup
/dashboard             /organizations
/leaderboard           /donate            /impact
/manifest.webmanifest  /icon.svg          (PWA assets)
```

Quick check (PowerShell):

```powershell
$base = "https://we-sustian.vercel.app"
@("/","/auth/login","/dashboard","/manifest.webmanifest","/icon.svg") | ForEach-Object {
  try { "$_ -> " + (Invoke-WebRequest "$base$_" -UseBasicParsing -TimeoutSec 30).StatusCode }
  catch { "$_ -> ERROR" }
}
```

---

## Installing as an app (PWA)

On a phone browser, open the link → browser menu → **Add to Home Screen**. It launches
full-screen with the We Sustain leaf icon, like a native app. This works because of
`public/manifest.webmanifest` and `app/icon.svg`.

---

## Sharing notes

- Each visitor gets their own independent demo state (stored in their browser via
  `localStorage`), so multiple people can click around without affecting each other.
- This is ideal for demos/pitches. To make data **shared and persistent** across users,
  wire a real backend (Supabase) — see "Going to real data" below.

---

## Local development

Web app (from repo root):

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (run before deploying / to catch errors)
```

Mobile app (Expo Go on your phone):

```bash
cd mobile
npm install
npx expo start -c  # scan the QR code with Expo Go (Android) or Camera (iOS)
```

---

## Going to real data (optional, later)

The web app reads/writes through `lib/data.ts` (seed data) and `lib/store.tsx`
(client state). To go live with shared, persistent data:

1. Create a Supabase project and add keys to Vercel env vars
   (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`).
2. Replace the seed arrays in `lib/data.ts` with Supabase queries.
3. Swap the in-memory auth/mutations in `lib/store.tsx` for Supabase Auth + table writes.

The UI/pages won't need to change.

---

## Custom domain (optional)

In the Vercel project: **Settings → Domains → Add**, then point your domain's DNS at
Vercel (it shows the exact records). The `.vercel.app` URL keeps working too.
