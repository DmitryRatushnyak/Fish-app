# Viskaart

A family fishing app for the canals, polder ditches and rivers around Alblasserdam. Built for a dad and his six-year-old son, and set up so it can grow to other families later.

## What it does (phase 1)

- **Who's fishing?** Profiles for each angler (child or grown-up). Child profiles get bigger text, fewer technical details and read-aloud buttons.
- **What bites now?** The fish worth trying this month, best first. Fish in their closed season are marked.
- **Fish cards** for 16 local species: drawn picture, fun fact, tip, best months and times, where to find them, bait, rig and rules.
- **Fish book.** Tap "Gevangen!" to unlock a fish in your own book. Each profile has its own collection.
- **Gear.** Packing checklist and step-by-step rigs (float, feeder, lure, drop shot, hand net).
- **Rules.** Closed seasons for the current year, VISpas basics and links to the sources.
- Dutch and English. Works offline and installs on Android as an app (PWA).

## Run it

```sh
npm install
npm run dev      # local dev server
npm test         # unit tests
npm run build    # production build in dist/
```

## Hosting

Pushing to `main` builds and deploys to GitHub Pages (`.github/workflows/deploy.yml`). In the repository settings, set **Pages → Source** to **GitHub Actions** once. The app is then at `https://<user>.github.io/Fish-app/`. On Android, open it in Chrome and choose **Add to home screen**.

Set `BASE=/` when building for a host that serves from the root.

## Structure

- `src/data/` species, gear and rules. Fish facts are hand-written; rules follow the 2026 national closed seasons.
- `src/lib/storage.js` storage adapter. All data goes through `load`/`save`, so local storage can later be replaced by a synced backend with accounts.
- `src/lib/model.js` households, profiles and catches as plain functions.
- `src/components/FishArt.svelte` draws each fish from a few parameters, so no photo licences are needed.

## Rules disclaimer

Closed seasons and limits come from public summaries of the Visserijwet and the VISpas conditions. Local waters can be stricter. Always check the Visplanner app from Sportvisserij Nederland.

## Roadmap

1. Fish guide and profiles (this version)
2. Catch diary with photo, length and place; badges
3. Bite score from location, weather and water temperature; map
4. Photo fish ID
5. Quiz, knots, sea fishing
