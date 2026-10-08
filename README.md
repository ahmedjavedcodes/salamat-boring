# Mian Salamat Boring and Sanitary House

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

- `lib/content/business.ts` — every business fact. Nothing else may state one.
- `lib/content/en`, `lib/content/ur` — all copy. No user-facing string lives in a component.
- `lib/content/work.ts` — gallery items. Empty until the client supplies photos.
- `app/globals.css` — the design tokens, in `@theme`.

## Before launch

Open items are tracked at their source rather than in a checklist that drifts:

- `TODO(client)` in `lib/content/business.ts` — service areas, map coordinates, year
  established, pump brands, Google Business Profile URL. Each is omitted from the page
  and the JSON-LD while unknown; none are placeholdered.
- `VERIFY` in the same file — phone, WhatsApp number, email, address spelling and the
  24-hour opening claim. These feed the NAP, which must match the Google Business
  Profile character for character.
- `TODO(client)` in `lib/content/en/about.ts` — the About story needs client approval.
- The Urdu copy needs a native speaker's review.
- `TODO(launch)` in `app/[lang]/opengraph-image.tsx` — the Urdu share card is currently
  Latin-branded.

Deploy to Vercel with `NEXT_PUBLIC_SITE_URL` set. The locale proxy rules out
`output: 'export'`.
