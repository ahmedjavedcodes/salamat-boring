# Mian Salamat Boring & Motor Pump

Bilingual (English / Urdu) single-page lead-generation site for a water boring, pump and
sanitary business in Lahore. Its one job is to turn a visitor into a WhatsApp
conversation or a phone call.

Read [CLAUDE.md](CLAUDE.md) before changing anything — it holds the design system, the
content rules and the decision log.

## Running it

```bash
npm install
cp .env.example .env.local   # then set NEXT_PUBLIC_SITE_URL
npm run dev
```

| Command             | What it does                                             |
| ------------------- | -------------------------------------------------------- |
| `npm run dev`       | Development server on http://localhost:3000              |
| `npm run build`     | Production build. Must pass before any PR                |
| `npm run start`     | Serve the production build                               |
| `npm run lint`      | ESLint, including the logical-property and raw-hex rules |
| `npm run typecheck` | `tsc --noEmit`                                           |
| `npm run format`    | Prettier with the Tailwind class sorter                  |

## Routes

| URL   | Content                                                                   |
| ----- | ------------------------------------------------------------------------- |
| `/`   | English (served from the internal `/en` route by a rewrite in `proxy.ts`) |
| `/ur` | Urdu, `dir="rtl"`                                                         |
| `/en` | 308 redirect to `/`                                                       |

A `NEXT_LOCALE=ur` cookie makes `/` redirect to `/ur`, so returning Urdu readers never
see a flash of English. `Accept-Language` is deliberately not used.

## Where things live

- `lib/content/business.ts` — every business fact, including phone, address, the Maps
  link and the social-proof figures. Nothing else may state one.
- `lib/content/en`, `lib/content/ur` — all copy. No user-facing string lives in a component.
- `lib/content/work.ts` — gallery items, built from `lib/images/`.
- `app/globals.css` — the design tokens, in `@theme`.

## Before launch

Open items are tracked at their source rather than in a checklist that drifts:

- `TODO(client)` in `lib/content/business.ts` — service areas, precise geo coordinates,
  year established, pump brands. Each is omitted from the page and the JSON-LD while
  unknown; none are placeholdered.
- `VERIFY` in the same file — the business name (matched against a Maps screenshot, not
  the live Business Profile), phone, WhatsApp number, email, address, postal code, the
  Maps link, the 24-hour opening claim, and the social-proof figures (100+ customers,
  95% satisfaction, 20 years, 500 projects — client-supplied, not yet backed by
  paperwork). These feed the NAP, which must match the Google Business Profile
  character for character.
- `TODO(client)` in `lib/content/en/about.ts` — the About story needs client approval.
- The Urdu copy needs a native speaker's review.
- `TODO(launch)` in `app/[lang]/opengraph-image.tsx` — the Urdu share card is currently
  Latin-branded.
- The Contact map block links a static screenshot (`lib/images/maps.png`) rather than an
  official Maps embed — see CLAUDE.md §8 for the tradeoff.
- `lib/images/4.jpg`–`7.jpg` are third-party diagrams, intentionally unused and
  untracked by git (one is credited to another source). They stay out of the gallery
  unless the client confirms rights to publish them.

Deploy to Vercel with `NEXT_PUBLIC_SITE_URL` set. The locale proxy rules out
`output: 'export'`.

### "No Output Directory named 'public' found"

If Vercel fails a deploy with this error, it has misdetected the project as a static
site instead of Next.js — usually because the project's **Framework Preset** in
Vercel's dashboard got set to something other than "Next.js" (e.g. "Other") when the
project was first created, which makes Vercel look for a prebuilt `public`/`dist`
folder instead of running the Next.js build. `vercel.json` here pins
`"framework": "nextjs"` to prevent that, but on an **existing** Vercel project the
dashboard setting can still need a manual nudge:

1. Project → Settings → General → Build & Development Settings → **Framework Preset** → set to **Next.js**.
2. In the same panel, make sure **Output Directory** has no manual override (leave it on the framework default — it should not say `public`).
3. Redeploy.
