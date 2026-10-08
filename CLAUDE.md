# CLAUDE.md — Mian Salamat Boring & Sanitary House

Standing instructions and project knowledge for AI-assisted work on this repository. Read this file in full before making any change. If a request conflicts with this file, point out the conflict and ask before proceeding.

---

## 0. Working agreement

- **Make surgical changes.** Touch only the files the task needs. Do not refactor, rename, reformat or "tidy" unrelated code. If a wider change seems necessary, propose it first and wait.
- **Never invent business facts.** Phone numbers, addresses, service areas, years in business, project counts, prices, warranties, brand names stocked and "free site visit" style offers must come from `lib/content/business.ts`. If a value is missing, leave the `TODO(client)` marker in place and say so. Fabricated claims on a local business site are a legal and reputational risk.
- **Never hard-code user-facing text in components.** All copy lives in `lib/content`. Components receive text through props or the dictionary.
- **Ask before adding a dependency.** State what it is, its bundle cost, and why the platform cannot do the job.
- **Keep this file current.** When a decision changes, update the relevant section and add a line to the Decision log (§8).

### Commands

```bash
pnpm dev          # local dev server
pnpm build        # production build (must pass before any PR)
pnpm lint         # ESLint
pnpm typecheck    # tsc --noEmit
pnpm format       # Prettier (with prettier-plugin-tailwindcss)
```

---

## 1. Project overview & objectives

### 1.1 The client

**Mian Salamat Boring and Sanitary House** (Urdu: میاں سلامت بورنگ اینڈ سینیٹری ہاؤس) is a local trades business in Pakistan offering:

1. **Water boring** — new bores, deep boring, re-boring, and complete water boring plant setup.
2. **Sanitary installation** — bathroom and kitchen fittings, sanitary ware, water tanks, geysers.
3. **Plumbing services** — leak repair, new water lines, drainage, blockage clearing.
4. **Water pumps & motors** — retail sales plus installation of submersible, centrifugal ("donkey"), pressure and solar pumps.

Facebook (reference and photo source, with the client's permission): https://www.facebook.com/p/Mian-Salamat-boring-and-sanitary-house-100064841959870/

### 1.2 What the site is for

A bilingual (English / Urdu), single-page, lead-generation and portfolio site. Its one job is to **turn a visitor into a WhatsApp conversation or a phone call** within a few seconds of landing, with the Work gallery providing proof.

Primary conversion paths, in priority order:

1. Floating WhatsApp button (every scroll position).
2. Service-specific "Ask about this on WhatsApp" actions (prefilled message per service).
3. Tap-to-call in the header and Contact section.
4. Contact form, which composes a structured WhatsApp message (no backend in v1).

### 1.3 Audience

Homeowners building or renovating, small builders and contractors, shop and small commercial owners, and agricultural plot owners needing water. Most visitors arrive on **mid-range Android phones over mobile data**, often from Google Search, Google Maps or Facebook. Many prefer Urdu; many search in Roman Urdu.

### 1.4 Success criteria

- Lighthouse mobile: Performance ≥ 90, Accessibility ≥ 95, SEO = 100, Best Practices ≥ 95.
- LCP < 2.5 s and CLS < 0.05 on a throttled 4G mid-range Android profile.
- Both locales are indexable, with correct `hreflang`, metadata and LocalBusiness structured data.
- A first-time visitor can reach WhatsApp in one tap from any section.

### 1.5 Non-goals (v1)

No cart or online payments, no CMS, no user accounts, no blog, no dark mode, no chat widget other than the WhatsApp link. Do not scaffold any of these "for later".

### 1.6 Business facts — single source of truth

All of these live in `lib/content/business.ts`. Values marked `TODO(client)` must be confirmed by the client before launch. Values marked `VERIFY` come from the client's Facebook page and are usable now, but must be confirmed before launch because they feed the NAP (name, address, phone) that has to match Google Business Profile exactly.

| Field | Value |
|---|---|
| Legal / display name (EN) | Mian Salamat Boring and Sanitary House |
| Display name (UR) | میاں سلامت بورنگ اینڈ سینیٹری ہاؤس |
| Phone (display) | `0304 7741748` |
| Phone (E.164, used in `tel:` and JSON-LD) | `+923047741748` |
| WhatsApp number (E.164, no `+`) | `923047741748` — `VERIFY` that this same number is on WhatsApp |
| Email | `mzaid929@yahoo.com` — `VERIFY` it is monitored for leads |
| Street address (EN) | Al-Madinah Road, Barket Chowk, Township — `VERIFY` spelling ("Barket" as on Facebook vs "Barkat"); use whichever matches Google Business Profile |
| Street address (UR) | المدینہ روڈ، برکت چوک، ٹاؤن شپ — native speaker to review |
| City / district | Lahore (UR: لاہور), Punjab, Pakistan |
| Service areas (list) | `TODO(client)` — likely Township and nearby Lahore areas; do not list until confirmed |
| Geo coordinates | `TODO(client)` (copy from Google Business Profile pin) |
| Opening hours | Always open (24/7) per Facebook — `VERIFY`; Facebook's "Always open" is sometimes a default setting. If confirmed, use "Open 24 hours" in copy and `00:00–23:59` all days in JSON-LD |
| Year established | `TODO(client)` — omit the claim if unknown |
| Pump/motor brands stocked | `TODO(client)` — do not name brands until confirmed |
| Facebook URL | https://www.facebook.com/p/Mian-Salamat-boring-and-sanitary-house-100064841959870/ |
| Facebook category | Business service |
| Google Business Profile URL | `TODO(client)` |
| Reviews | None on Facebook (0 reviews). Do not show ratings or review counts on the site or in JSON-LD |

```ts
// lib/content/business.ts (contact excerpt)
export const business = {
  name: {
    en: 'Mian Salamat Boring and Sanitary House',
    ur: 'میاں سلامت بورنگ اینڈ سینیٹری ہاؤس',
  },
  phoneDisplay: '0304 7741748',
  phoneE164: '+923047741748',
  whatsapp: '923047741748', // VERIFY
  email: 'mzaid929@yahoo.com', // VERIFY
  address: {
    street: {
      en: 'Al-Madinah Road, Barket Chowk, Township', // VERIFY spelling against GBP
      ur: 'المدینہ روڈ، برکت چوک، ٹاؤن شپ',
    },
    city: { en: 'Lahore', ur: 'لاہور' },
    region: { en: 'Punjab', ur: 'پنجاب' },
    country: 'PK',
  },
  hours: { alwaysOpen: true }, // VERIFY
  facebookUrl: 'https://www.facebook.com/p/Mian-Salamat-boring-and-sanitary-house-100064841959870/',
  googleBusinessUrl: null, // TODO(client)
  serviceAreas: [], // TODO(client)
} as const;
```

Content files read `business.address.city` for the city name (e.g. `` `Water boring in ${business.address.city.en}` ``), so `{city}` in the keyword clusters (§6.3) resolves to Lahore / لاہور.

---

## 2. Tech stack & architecture

| Concern | Choice |
|---|---|
| Framework | Next.js (App Router), current stable, TypeScript strict |
| Rendering | Statically generated, one page per locale, behaving as a single-page app (in-page section navigation) |
| Styling | Tailwind CSS v4 (CSS-first config, tokens in `@theme`) |
| Fonts | `next/font/google` — Archivo (EN), Noto Nastaliq Urdu (UR) |
| Images | `next/image` with static imports (automatic blur placeholders) |
| Hosting | Vercel (needed for the locale proxy; do not switch to `output: 'export'`) |
| Package manager | pnpm |

### 2.1 Directory structure

```
app/
  [lang]/
    layout.tsx            # <html lang dir>, fonts, LanguageProvider, JSON-LD
    page.tsx              # composes all sections in order
    opengraph-image.tsx   # per-locale OG image
    not-found.tsx
    error.tsx
  sitemap.ts
  robots.ts
  globals.css             # Tailwind import + @theme tokens + base layer
proxy.ts                  # locale negotiation for "/" (named middleware.ts on Next.js ≤ 15)
components/
  layout/                 # SiteHeader, SiteFooter, MobileNav, SkipLink
  sections/               # HeroSection, ServicesSection, AboutSection, WorkSection, ContactSection
  ui/                     # Button, LinkButton, Field, Dialog, Chip, VisuallyHidden
  whatsapp/               # FloatingWhatsApp, WhatsAppLink
  i18n/                   # LanguageProvider, LanguagePrompt, LanguageToggle
  illustrations/          # BoreholeSection (hero SVG), icons
lib/
  content/                # ALL copy, SEO data and business facts (see §6)
  i18n/                   # config.ts, persistence.ts, paths.ts
  seo/                    # metadata.ts (builders), jsonld.ts
  utils/                  # cn.ts, whatsapp.ts (URL builder), format.ts
public/
  work/                   # only if images cannot be statically imported
```

---

## 3. UI/UX & design system — no AI slop

The client is paying for a site that looks made for **them**, not a template with their name swapped in. Every visual decision should trace back to their world: groundwater, soil strata, bore pipes, galvanized steel, brass fittings, and the practical, trustworthy feel of a good trades shop.

### 3.1 Concept: "Strata"

The signature element is a **borehole cross-section** in the hero: soil layers drawn as horizontal bands, a bore pipe descending through them, and a water-bearing layer at the bottom. It is the most characteristic image in this client's work and it explains what they do without words.

**Spend boldness in this one place.** Everything else — services, about, gallery, contact — stays quiet, disciplined and fast. The strata motif may reappear only as subtle horizontal rules between sections (thin bands in the illustration colors), never as decoration on every element.

### 3.2 Color tokens

Defined once in `app/globals.css` under `@theme`. Never use raw hex values or Tailwind's default palette (`blue-500`, `gray-100`, etc.) in components.

**Core palette**

| Token | Hex | Role |
|---|---|---|
| `aquifer` | `#0F3A40` | Primary dark: headings, primary buttons, header on scroll |
| `groundwater` | `#2E7A8C` | Focus rings, water in illustrations, hover states. Not for body text (contrast too low on limewash) |
| `galvanized` | `#8B979C` | Borders, dividers, pipe in illustrations, muted icons |
| `brass` | `#A87A2E` | Small accents only: process step numbers, active nav indicator, fitting details in illustrations. Never for body text |
| `limewash` | `#F2F4F1` | Page background (cool off-white, deliberately not cream) |
| `ink` | `#17262B` | Body text |

**Supporting**

| Token | Hex | Role |
|---|---|---|
| `mist` | `#DDE3E2` | Alternate section surface, input backgrounds |
| `silt` | `#7A6550` | Illustration only (soil band) |
| `sand` | `#C9B48F` | Illustration only (soil band) |
| `whatsapp` | `#25D366` | Floating WhatsApp button only |
| `whatsapp-ink` | `#073B2A` | Icon/text on the WhatsApp button |
| `alert` | `#B3261E` | Form errors only |

Contrast rules: body text is `ink` on `limewash` or `mist`. Light text is `limewash` on `aquifer` only. Any new pairing must meet WCAG AA (4.5:1 for body, 3:1 for large text and UI).

### 3.3 Typography

| Locale | Family | Use |
|---|---|---|
| English | **Archivo** (variable, `wght` + `wdth` axes) | One family for everything. Display headings use an expanded width (`wdth` 112–125) at weight 650–750 for an industrial, signage-like voice; body uses `wdth` 100, weight 400 |
| Urdu | **Noto Nastaliq Urdu** | Headings and body. Nastaliq is what Urdu readers expect; Naskh-style fallbacks feel foreign |

Type scale (major third, rem based):

| Step | English | Urdu (≈ +12%, Nastaliq reads small) |
|---|---|---|
| `text-sm` | 0.875 / 1.5 | 1.0 / 2.0 |
| `text-base` | 1.0625 / 1.65 | 1.1875 / 2.2 |
| `text-lg` | 1.3125 / 1.5 | 1.4375 / 2.1 |
| `text-xl` | 1.625 / 1.3 | 1.8125 / 1.9 |
| `text-2xl` | 2.125 / 1.15 | 2.375 / 1.75 |
| `text-display` | clamp(2.5rem, 6vw, 4.25rem) / 1.02 | clamp(2.625rem, 6.5vw, 4.5rem) / 1.6 |

Rules:

- Body line length ≤ 70ch (`max-w-[68ch]` via a `measure` token).
- Urdu: never apply `letter-spacing`, `uppercase`, or `italic`. Nastaliq descenders are deep, so Urdu headings need line-height ≥ 1.6 or they collide.
- Load fonts with `display: 'swap'`. Noto Nastaliq Urdu is heavy: declare it with `preload: false` and apply its CSS variable only when `lang === 'ur'`.
- Phone numbers, prices and measurements use Western digits in both locales and are wrapped in `<bdi dir="ltr">` inside Urdu text.

### 3.4 Layout

- Container: `max-w-6xl` with fluid side padding (`px-5 sm:px-8`). 12-column grid on `lg`, single column on mobile.
- Section spacing is generous and consistent: `py-24 md:py-32`. Whitespace is a feature; do not fill it.
- Alignment: content aligns to the **start** edge (left in English, right in Urdu). Centered text is reserved for the language prompt and short confirmations.
- Section headings are plain headings. No eyebrow labels above them.

Hero wireframe (LTR; mirrored in RTL):

```
+--------------------------------------------------------------------+
| Wordmark              Services  About  Work  Contact   EN/اردو  Call |
+--------------------------------------------------------------------+
|                                        |   topsoil     ----         |
|  Headline, two lines maximum           |   clay        ----         |
|  One plain sentence of support         |   sand        ----         |
|                                        |       ||  bore pipe        |
|  [Message us on WhatsApp]  [Call now]  |       ||                   |
|                                        |   ~~~ water-bearing layer  |
|  Areas served: A, B, C                 |                            |
+--------------------------------------------------------------------+
```

On mobile the illustration sits **below** the CTAs and is cropped to the lower half (pipe reaching water), so the call-to-action stays above the fold.

### 3.5 Surfaces, borders, radius, elevation

- **Radius follows hierarchy, not one value everywhere:** inputs and chips `2px`, images and media `6px`, the WhatsApp button fully rounded. Sections and lists have no radius.
- **Shadows only on things that float:** the WhatsApp button, the open mobile menu, dialogs. Nothing in the page flow gets a shadow.
- Prefer rules (1px `galvanized/40`) and spacing to separate content. Do not chop content into identical cards.

### 3.6 Motion

- **One orchestrated moment:** on first load, the bore pipe draws downward through the strata (≈ 900 ms, ease-out) and the water layer fades in at the end. Implemented with CSS on the SVG (`stroke-dashoffset`), no animation library.
- Motion that answers a user action is welcome: menu open, gallery lightbox open, filter change, form validation.
- **No** scroll-triggered fade-up on every section, no hover lift on every item, no parallax, no infinite pulse on the WhatsApp button.
- Everything respects `prefers-reduced-motion: reduce` (pipe renders fully drawn, transitions become instant).
- In-page navigation uses CSS `scroll-behavior: smooth` gated by `motion-safe:`. No scroll-jacking libraries.

### 3.7 Banned patterns

These are the tells of generated, templated sites. Do not use them unless this file is updated to allow it:

- Accenting a single word in a headline with color, italics or bold.
- All-caps, letter-spaced eyebrow labels above headings.
- Numbered markers (`01 / 02 / 03`) on content that is not a real sequence. (The boring process in About **is** a sequence and may be numbered.)
- Identical rounded cards in a grid with the same soft grey shadow.
- Gradient blobs, glassmorphism, glowing borders, decorative gradients.
- Meta strings joined with middle dots, `WORD — fragment` labels, `→` appended to buttons and links.
- Stock photos of smiling models in hard hats. Use the client's real work photos or the illustration.
- Generic icon-in-a-circle feature rows.
- Component-library defaults (shadcn, MUI, Chakra look). Build the small set of primitives in `components/ui` ourselves.

### 3.8 Imagery

- Real project photos from the client (Facebook and new shoots). Get written permission for every photo and strip EXIF location data before committing.
- Crop for subject: the bore rig, the pipe, the finished bathroom, the pump. Avoid wide, cluttered shots.
- Mild, consistent color correction across the gallery; no filters, no heavy vignettes.
- Illustrations are inline SVG using palette tokens via `currentColor` and CSS variables.

### 3.9 Accessibility floor (non-negotiable)

- Semantic landmarks: `header`, `nav`, `main`, `section` with `aria-labelledby`, `footer`.
- Skip link to `#main`.
- Visible focus: `outline-2 outline-offset-2 outline-groundwater` on every interactive element.
- Touch targets ≥ 44 × 44 px.
- All images have meaningful localized `alt` text from `lib/content`; decorative SVG gets `aria-hidden`.
- Dialogs (language prompt, lightbox, mobile menu) trap focus, close on `Esc`, and return focus to the trigger.
- Test both locales with a screen reader pass (TalkBack on Android at minimum).

### 3.10 Floating WhatsApp button

The site's most important control. Component: `components/whatsapp/FloatingWhatsApp.tsx` (a Server Component; it is just a link).

| Property | Spec |
|---|---|
| Position | `fixed`, bottom-right in **both** locales. This is a deliberate exception to logical properties: bottom-right is where right-handed thumbs reach and where Pakistani users expect WhatsApp. |
| Offset | `bottom: calc(1.25rem + env(safe-area-inset-bottom))`, `right: 1.25rem` |
| Size | 56 × 56 px icon button on mobile; on `md+` a pill with icon + label |
| Label | From dictionary, e.g. EN "Chat on WhatsApp", UR "واٹس ایپ پر بات کریں". Mobile uses the same text as `aria-label` |
| Colors | Background `whatsapp`, icon/text `whatsapp-ink`, elevation shadow, focus ring `aquifer` |
| Link | `https://wa.me/<number>?text=<encoded prefilled message>`, built only by `lib/utils/whatsapp.ts` |
| Prefilled message | Locale-specific, from `common.whatsapp.defaultMessage`; mentions the site so the client knows the lead source |
| Behavior | `target="_blank"`, `rel="noopener noreferrer"`. No hover animation beyond a color shift; no pulse, no bounce, no auto-opening chat bubble |
| Stacking | `z-40` (header `z-30`, dialogs `z-50`). Hidden while a dialog is open |
| Overlap | Contact section and footer get enough bottom padding that the button never covers a control or the address |
| Tracking (optional) | `data-track="whatsapp_click" data-source="floating"` for analytics if enabled |

All other WhatsApp entry points (hero CTA, service rows, contact form) use the same `WhatsAppLink` component with a different `source` and prefilled message.

```ts
// lib/utils/whatsapp.ts
import { business } from '@/lib/content/business';

export function whatsappUrl(message?: string): string {
  const base = `https://wa.me/${business.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
```

---

## 4. Internationalization (i18n) & state

### 4.1 Routing model

The site is one scrolling page **per locale**:

| URL | Content | Notes |
|---|---|---|
| `/` | English | Canonical English URL (served internally from `/en` by a rewrite) |
| `/ur` | Urdu | Canonical Urdu URL, `dir="rtl"` |
| `/en` | — | 308 redirect to `/` |

**Why not a client-only language toggle on one URL?** Because Google would only ever index the English version. Urdu content must exist at its own URL with `hreflang` links to rank for Urdu searches. The SPA experience (no reloads while browsing sections) is preserved within each locale.

The URL segment is the **source of truth** for which language is rendered. React Context and storage only remember the user's choice.

```ts
// lib/i18n/config.ts
export const locales = ['en', 'ur'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export const localeMeta = {
  en: { dir: 'ltr', hreflang: 'en-PK', ogLocale: 'en_PK', label: 'English' },
  ur: { dir: 'rtl', hreflang: 'ur-PK', ogLocale: 'ur_PK', label: 'اردو' },
} as const;

export const isLocale = (v: string): v is Locale =>
  (locales as readonly string[]).includes(v);

export const localePath = (l: Locale) => (l === 'en' ? '/' : '/ur');
```

### 4.2 Locale negotiation (`proxy.ts`)

Only `/` is negotiated. An explicit `/ur` URL always wins, so shared links and search results behave predictably.

```ts
// proxy.ts  (export `middleware` and name the file middleware.ts on Next.js ≤ 15)
import { NextResponse, type NextRequest } from 'next/server';

const COOKIE = 'NEXT_LOCALE';

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname === '/en' || pathname.startsWith('/en/')) {
    const target = pathname.replace(/^\/en/, '') || '/';
    return NextResponse.redirect(new URL(target, req.url), 308);
  }

  if (pathname === '/') {
    if (req.cookies.get(COOKIE)?.value === 'ur') {
      return NextResponse.redirect(new URL('/ur', req.url), 307);
    }
    return NextResponse.rewrite(new URL('/en', req.url));
  }
}

export const config = { matcher: ['/', '/en/:path*'] };
```

Do **not** negotiate on `Accept-Language`. Most Pakistani phones report English regardless of reading preference; the explicit prompt is more reliable.

### 4.3 Persistence

The choice is stored in two places, written together by `persistLocale`:

- `localStorage['msbs.locale']` — read on the client to decide whether to show the prompt.
- Cookie `NEXT_LOCALE` (1 year, `SameSite=Lax`, `Path=/`) — read by `proxy.ts` so returning Urdu users land on `/ur` without a flash of English.

```ts
// lib/i18n/persistence.ts
import type { Locale } from './config';
import { isLocale } from './config';

const STORAGE_KEY = 'msbs.locale';

export function readStoredLocale(): Locale | null {
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    return v && isLocale(v) ? v : null;
  } catch {
    return null; // private mode or storage disabled
  }
}

export function persistLocale(l: Locale): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, l);
  } catch {
    /* ignore — cookie still persists the choice */
  }
  document.cookie = `NEXT_LOCALE=${l}; Path=/; Max-Age=31536000; SameSite=Lax`;
}
```

### 4.4 `LanguageProvider` (React Context)

Client component mounted in `app/[lang]/layout.tsx`. It exposes the current locale (from the URL), whether the user has made a choice, and a setter.

```tsx
// components/i18n/LanguageProvider.tsx
'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { type Locale, localePath } from '@/lib/i18n/config';
import { persistLocale, readStoredLocale } from '@/lib/i18n/persistence';

type LanguageContextValue = {
  locale: Locale;
  /** null until hydrated, so the prompt never renders on the server */
  hasChosen: boolean | null;
  setLocale: (next: Locale) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const [hasChosen, setHasChosen] = useState<boolean | null>(null);

  useEffect(() => {
    setHasChosen(readStoredLocale() !== null);
  }, []);

  const setLocale = useCallback(
    (next: Locale) => {
      persistLocale(next);
      setHasChosen(true);
      if (next !== locale) {
        // Full navigation on purpose: <html lang/dir>, fonts and metadata all change.
        // Language switches are rare; correctness beats a client-side transition.
        window.location.assign(localePath(next) + window.location.hash);
      }
    },
    [locale],
  );

  return (
    <LanguageContext.Provider value={{ locale, hasChosen, setLocale }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used inside <LanguageProvider>');
  return ctx;
}
```

### 4.5 First-visit language prompt

Component: `components/i18n/LanguagePrompt.tsx`.

- Renders only when `hasChosen === false` (after hydration). Never server-rendered, so crawlers and no-JS visitors see full content.
- Uses a native `<dialog>` opened with `showModal()`: bottom sheet on mobile, compact centered panel on `md+`.
- Bilingual title, each line in its own script and font: "Choose your language" and "اپنی زبان منتخب کریں".
- Two large buttons: **English** (initial focus, the default) and **اردو**.
- `Esc`, backdrop tap or the close button = English, persisted, so the prompt never reappears.
- Choosing the language the page is already in just persists and closes; choosing the other navigates (see §4.4).
- No delay or timer. Keep it small so it does not become the LCP element or cause layout shift.
- The header `LanguageToggle` (EN / اردو) is always available afterwards and calls the same `setLocale`.

### 4.6 RTL rules

- `<html lang={lang} dir={dir}>` is set in `app/[lang]/layout.tsx`. Never set `dir` on inner wrappers to fake RTL.
- Use **logical** utilities everywhere: `ms-*`, `me-*`, `ps-*`, `pe-*`, `start-*`, `end-*`, `text-start`, `text-end`, `border-s`, `rounded-s-*`. Physical `left/right/ml/mr/pl/pr` are lint-flagged; the only allowed exception is the WhatsApp button (§3.10).
- Directional icons (chevrons, carets) flip with `rtl:-scale-x-100`. Brand icons (WhatsApp, Facebook) never flip.
- Grid and flex order mirror automatically under `dir="rtl"`; do not reverse them manually.
- Inline Latin content inside Urdu (phone numbers, measurements like `450 ft`, brand names) is wrapped in `<bdi dir="ltr">`.

### 4.7 Dictionary loading

- `getDictionary(lang)` runs on the server only (`import 'server-only'`).
- Server sections receive the full slice they need. Client components receive **only** the strings they use, as props; never pass the whole dictionary to a client component.
- Section IDs and anchors (`#services`, `#work`, …) are English in both locales so shared links work across languages.

```tsx
// app/[lang]/layout.tsx (outline)
export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}
export const dynamicParams = false;

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const { dir } = localeMeta[lang];

  return (
    <html lang={lang} dir={dir} className={cn(archivo.variable, lang === 'ur' && nastaliq.variable)}>
      <body className="bg-limewash text-ink font-body antialiased">
        <LanguageProvider locale={lang}>{children}</LanguageProvider>
        <LocalBusinessJsonLd lang={lang} />
      </body>
    </html>
  );
}
```

---

## 5. SPA section breakdown

### 5.1 Composition

```tsx
// app/[lang]/page.tsx
<>
  <SkipLink />
  <SiteHeader dict={dict.common} />
  <main id="main">
    <HeroSection     id="home"     dict={dict.hero} />
    <ServicesSection id="services" dict={dict.services} />
    <AboutSection    id="about"    dict={dict.about} />
    <WorkSection     id="work"     dict={dict.work} />
    <ContactSection  id="contact"  dict={dict.contact} />
  </main>
  <SiteFooter dict={dict.common.footer} />
  <FloatingWhatsApp dict={dict.common.whatsapp} />
  <LanguagePrompt dict={dict.common.languagePrompt} />
</>
```

Sections are **Server Components**. Interactive islands are the only client components: `LanguageProvider`, `LanguagePrompt`, `LanguageToggle`, `ActiveSectionNav`, `MobileNav`, `WorkGallery` (filter + lightbox), `ContactForm`.

### 5.2 Navigation behavior

- Sticky header, compact (64 px). Transparent over the hero, `aquifer` background with `limewash` text once scrolled past it.
- Nav links are plain `<a href="#services">` anchors: they work without JavaScript.
- Every section has `scroll-mt-20` so headings are not hidden behind the header.
- `ActiveSectionNav` uses a single `IntersectionObserver` to mark the current link (`aria-current="true"` + a `brass` underline) and updates the hash with `history.replaceState` (no extra history entries, no scroll jump).
- Mobile: a menu button opens a full-height sheet with the same links, the language toggle and a Call button. Selecting a link closes the sheet, then scrolls.
- Header always shows a **Call** button (`tel:` link) on mobile; WhatsApp is covered by the floating button.

### 5.3 Section specs

**Home / Hero (`#home`)**
- `h1`: what they do and where, in plain words (from `hero.title`). Two lines maximum on mobile.
- One supporting sentence; no paragraph.
- Primary CTA: "Message us on WhatsApp" (`WhatsAppLink`, source `hero`). Secondary: "Call now" (`tel:`).
- Areas served line from `business.serviceAreas`.
- `BoreholeSection` illustration with the single load animation (§3.6).

**Services (`#services`)**
- A ruled list, not a card grid. One row per service: name (`h3`), one-sentence plain description, 3–5 typical jobs, and "Ask about this on WhatsApp" with a service-specific prefilled message.
- Services, in order: Water boring, Pumps & motors (sales + installation), Sanitary installation, Plumbing repairs.
- Each row may carry one real photo from the Work set; no icons-in-circles.

**About (`#about`)**
- Short, specific story of the business (from `about.story`, client-approved).
- **The boring process** as a numbered sequence (this is a real sequence): site check, drilling, pipe & filter fitting, pump installation, water test & handover. Step numbers in `brass`.
- Trust facts only if confirmed in `business.ts` (years, projects, areas). If missing, omit the block rather than inventing numbers.

**Work (`#work`)**
- Filter chips: All, Boring, Pumps & motors, Sanitary, Plumbing. Filtering is client-side over static data.
- Grid with spans driven by image aspect ratio (no masonry library). First 6 items render; a "Show more work" button reveals the rest. No infinite scroll.
- Each item: image, localized caption with concrete facts (service, area, depth/size, year).
- Lightbox: native `<dialog>`, arrow-key and swipe navigation, caption visible, `Esc` closes, focus returns to the thumbnail.

**Contact (`#contact`)**
- Tap-to-call (`0304 7741748`) and WhatsApp buttons first; they are the fastest path.
- Email (`mailto:` link to `business.email`) as a secondary option, below call and WhatsApp.
- Address (localized), opening hours, "Open in Google Maps" link. Do not embed a Maps iframe on load; if a map is wanted, use a click-to-load facade.
- `ContactForm`: name, area/location, service (select), message. On submit it validates, composes a structured message and opens WhatsApp. No data is sent to or stored by our servers in v1.
- Form copy says exactly what happens: button "Send on WhatsApp", helper text "This opens WhatsApp with your message ready to send."

**Footer**
- Name, address, phone (NAP identical to Google Business Profile), email, Facebook link, language toggle, copyright.

---

## 6. SEO & content strategy (`lib/content`)

### 6.1 Structure

```
lib/content/
  index.ts            # getDictionary(lang) — server-only, dynamic imports per locale
  types.ts            # Dictionary interface — the contract both locales must satisfy
  business.ts         # locale-independent facts (§1.6) with EN/UR variants where needed
  keywords.ts         # keyword clusters (§6.3), used to brief copy, not stuffed into pages
  work.ts             # gallery items: static image imports + EN/UR captions + category
  en/
    index.ts          # assembles and exports the English Dictionary
    meta.ts           # title, description, OG fields
    common.ts         # nav, header, footer, WhatsApp, language prompt, form strings
    hero.ts
    services.ts
    about.ts
    work.ts           # section copy (headings, filter labels), not the items
    contact.ts
    faq.ts            # questions phrased the way customers ask them
  ur/                 # identical file set, written natively in Urdu
```

### 6.2 Type contract

`ur` must have exactly the same shape as `en`. Enforce it at compile time:

```ts
// lib/content/types.ts (excerpt)
export interface ServiceItem {
  id: 'boring' | 'pumps' | 'sanitary' | 'plumbing';
  name: string;
  summary: string;          // one sentence, plain language
  jobs: string[];           // 3–5 typical jobs
  whatsappMessage: string;  // prefilled, mentions the service
  imageAlt: string;
}

export interface PageMeta {
  title: string;            // ≤ 60 chars
  description: string;      // 140–160 chars
  ogTitle: string;
  ogDescription: string;
  ogImageAlt: string;
}

export interface Dictionary {
  meta: PageMeta;
  common: CommonCopy;
  hero: HeroCopy;
  services: { heading: string; intro: string; items: ServiceItem[] };
  about: AboutCopy;
  work: WorkCopy;
  contact: ContactCopy;
  faq: { heading: string; items: { q: string; a: string }[] };
}

// lib/content/ur/index.ts
const ur = { meta, common, hero, services, about, work, contact, faq } satisfies Dictionary;
export default ur;
```

Content files import facts from `business.ts` with template literals (e.g. `` `Water boring in ${business.address.city.en}` ``) so a fact is changed in one place only.

### 6.3 Keyword clusters

`keywords.ts` holds these clusters. Each cluster maps to one place on the page; use the primary term in that place's heading or first sentence, and the secondary terms naturally in body copy, captions and alt text. `{city}` and `{area}` resolve from `business.ts`.

**Water boring** → Services row "Water boring", About process, Work captions (Boring)
- EN primary: water boring service in {city}, boring contractor in {city}
- EN secondary: tubewell boring, deep water boring, borehole drilling, re-boring, boring plant installation, water boring cost per foot
- Roman Urdu (as typed in search): pani ki boring, boring wala, boring ka kaam, tubewell lagwana
- Urdu: پانی کی بورنگ، بورنگ کا کام، ٹیوب ویل، گہری بورنگ، بورنگ کا ریٹ

**Pumps & motors** → Services row "Pumps & motors", Work captions (Pumps)
- EN primary: water pump shop in {city}, submersible pump installation
- EN secondary: water motor price, donkey pump, pressure pump for home, solar water pump, monoblock pump, motor repair and fitting
- Roman Urdu: pani ki motor, donkey pump price, submersible motor, solar pump lagwana
- Urdu: پانی کی موٹر، واٹر پمپ، ڈونکی پمپ، سب مرسیبل پمپ، پریشر پمپ، سولر واٹر پمپ

**Sanitary installation** → Services row "Sanitary installation", Work captions (Sanitary)
- EN primary: sanitary fitting in {city}, bathroom fittings installation
- EN secondary: sanitary ware shop, washroom renovation, water tank installation, geyser fitting, kitchen sink fitting
- Roman Urdu: sanitary ka kaam, bathroom fitting, tanki fitting
- Urdu: سینیٹری فٹنگ، باتھ روم فٹنگ، سینیٹری کا سامان، پانی کی ٹینکی، گیزر فٹنگ

**Plumbing repairs** → Services row "Plumbing repairs", FAQ
- EN primary: plumber in {city}, plumbing repair near me
- EN secondary: pipe leakage repair, water line repair, drain blockage, PPR pipe fitting, low water pressure fix
- Roman Urdu: plumber chahiye, pipe leakage, nali band
- Urdu: پلمبر، پائپ لیکیج، پانی کی لائن، نالی بند، پلمبنگ کا کام

**Brand / local** → title, footer, JSON-LD
- Mian Salamat boring, Mian Salamat sanitary, boring and sanitary house {city}, plus each service area name

Rules:
- Write for people first. A keyword appears where a customer would naturally read it; no lists of keywords, no hidden text, no repeated city names in every sentence.
- Roman Urdu terms are used only where natural: FAQ questions phrased the way customers type them ("Pani ki boring kitne feet tak hoti hai?") and image alt text where it reads naturally.
- Work captions are an SEO asset: always include service + area + one concrete detail (depth, pump type, room).

### 6.4 Copywriting rules

- Plain, specific and short. Say what the business does, where, and how to reach them. No "world-class", "cutting-edge", "one-stop solution", "your trusted partner".
- Sentence case for all headings and buttons in English.
- A CTA names what happens: "Message us on WhatsApp", "Call now", "Send on WhatsApp". The same action keeps the same name everywhere.
- Errors say what went wrong and how to fix it: "Enter a phone number with 11 digits, like 03XX XXXXXXX."
- **Urdu is written natively, not machine-translated.** Use `آپ` (formal), everyday Urdu as spoken by customers, and common trade loanwords as Urdu speakers say them (بورنگ، موٹر، پمپ، فٹنگ) rather than obscure Persianized terms. Have a native speaker review before launch.
- Never include unconfirmed numbers, prices or guarantees (§0).

### 6.5 Metadata

Each locale's `meta.ts` drives `generateMetadata`. Example (English; values with `TODO` resolve from `business.ts`):

```ts
// lib/content/en/meta.ts
import { business } from '../business';

export const meta = {
  title: `Water Boring & Sanitary Services in ${business.address.city.en} | Mian Salamat`,
  description: `Water boring, submersible and solar pump installation, sanitary fitting and plumbing repairs in ${business.address.city.en}. Message Mian Salamat on WhatsApp for a quote.`,
  ogTitle: `Mian Salamat Boring & Sanitary House, ${business.address.city.en}`,
  ogDescription: `Boring, pumps and motors, sanitary installation and plumbing. See recent work and message us on WhatsApp.`,
  ogImageAlt: 'Borehole cross-section illustration with the Mian Salamat name',
} satisfies PageMeta;
```

```ts
// app/[lang]/page.tsx
export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const { meta } = await getDictionary(lang);
  const url = new URL(localePath(lang), siteUrl).toString();

  return {
    metadataBase: new URL(siteUrl),
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: url,
      languages: { 'en-PK': '/', 'ur-PK': '/ur', 'x-default': '/' },
    },
    openGraph: {
      type: 'website',
      url,
      siteName: business.name[lang],
      title: meta.ogTitle,
      description: meta.ogDescription,
      locale: localeMeta[lang].ogLocale,
      alternateLocale: [localeMeta[lang === 'en' ? 'ur' : 'en'].ogLocale],
    },
    twitter: { card: 'summary_large_image', title: meta.ogTitle, description: meta.ogDescription },
    formatDetection: { telephone: true },
  };
}
```

- `opengraph-image.tsx` renders a 1200 × 630 image per locale using the palette and the strata motif. The Urdu version must load the Nastaliq font file explicitly, or Urdu renders as boxes.
- `siteUrl` comes from `NEXT_PUBLIC_SITE_URL`; never hard-code a domain.

### 6.6 Structured data

`lib/seo/jsonld.ts` builds one LocalBusiness object per locale, rendered in the layout:

```ts
{
  '@context': 'https://schema.org',
  '@type': ['Plumber', 'Store'],
  '@id': `${siteUrl}/#business`,
  name: business.name[lang],
  alternateName: business.name[lang === 'en' ? 'ur' : 'en'],
  url: new URL(localePath(lang), siteUrl).toString(),
  telephone: business.phoneE164,
  email: business.email,
  image: `${siteUrl}/og-${lang}.png`,
  address: { '@type': 'PostalAddress', streetAddress, addressLocality, addressRegion, addressCountry: 'PK' },
  geo: { '@type': 'GeoCoordinates', latitude, longitude },
  areaServed: business.serviceAreas.map((a) => a[lang]),
  openingHoursSpecification: [/* if business.hours.alwaysOpen: one entry, all 7 days, opens '00:00', closes '23:59' */],
  sameAs: [business.facebookUrl, business.googleBusinessUrl].filter(Boolean),
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Services',
    itemListElement: services.map((s) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: s.name } })),
  },
}
```

Serialize with `JSON.stringify(data).replace(/</g, '\\u003c')` inside `<script type="application/ld+json">`. Omit any field whose value is still `TODO(client)` rather than shipping placeholders. FAQ content stays on the page for users; do not rely on FAQ rich results.

### 6.7 Sitemap, robots, hreflang

- `app/sitemap.ts` lists `/` and `/ur`, each with `alternates.languages` for both locales.
- `app/robots.ts` allows all and points to the sitemap.
- Every page emits reciprocal `hreflang` links (`en-PK`, `ur-PK`, `x-default` → `/`).

### 6.8 Off-site local SEO (launch checklist for the client)

The website supports, but does not replace, these:
- Claim and complete the **Google Business Profile**; the name, address and phone must match the site character for character.
- Add the website link to the Facebook page and Google Business Profile.
- Upload the same Work photos to the Google Business Profile.
- Ask satisfied customers for Google reviews.

---

## 7. Coding conventions & best practices

### 7.1 Components

- One component per file, named export, file name = component name.
- Server Components by default. Add `'use client'` only for state, effects, event handlers or browser APIs, and push it to the smallest leaf.
- Props are typed explicitly; no `any`. Copy enters as props from the dictionary.
- Section components take `id` and `dict` and nothing else unless needed.
- `components/ui` primitives are small and unstyled beyond tokens: `Button`, `LinkButton`, `Field`, `Chip`, `Dialog`, `VisuallyHidden`. Variants via a typed `variant` prop.
- Keep components under ~150 lines; extract subcomponents when they grow.

### 7.2 Tailwind

- Tokens in `@theme` (colors, fonts, type scale, radii, shadows). Use only tokens; arbitrary values (`[13px]`) are not allowed except in `globals.css`.
- Class order enforced by `prettier-plugin-tailwindcss`. Merge conditional classes with `cn()` (`clsx` + `tailwind-merge`) from `lib/utils/cn.ts`.
- Logical properties only (§4.6). `rtl:` variant for direction-specific tweaks; `motion-safe:` for any animation.
- If a class list exceeds roughly a line and a half or repeats in three places, make it a component or variant. Do not use `@apply` for component styles.
- Mobile-first: unprefixed classes are the mobile design; `md:` and `lg:` add.

### 7.3 TypeScript

- `strict: true`, `noUncheckedIndexedAccess: true`.
- Narrow route params with `isLocale` and call `notFound()` on failure.
- Content types live in `lib/content/types.ts`; never duplicate shapes in components.

### 7.4 Error handling

- `app/[lang]/error.tsx` and `not-found.tsx` are localized, explain what happened in one sentence, and offer WhatsApp and Call so a lead is never lost.
- Browser APIs (`localStorage`, `IntersectionObserver`, `<dialog>`) are wrapped or feature-checked; the page must remain fully usable without JavaScript (anchors, `tel:` and `wa.me` links all work as plain HTML).
- Contact form: inline validation on blur and submit, `aria-invalid` + `aria-describedby` linking to the message, focus moves to the first invalid field. Pakistani mobile numbers accept `03XXXXXXXXX` and `+923XXXXXXXXX`.
- Missing content (e.g. an empty gallery category) shows a direct message and a WhatsApp action, never a blank area.
- No `console.log` in committed code.

### 7.5 Performance

- Budgets: client JS ≤ 90 KB gzipped for the page; hero LCP image or SVG ≤ 60 KB.
- Hero illustration is inline SVG (no request). If a hero photo is used instead, it is the only image marked as high priority.
- Work gallery:
  - Static imports from `lib/content/work.ts` so Next generates dimensions and blur placeholders automatically.
  - `sizes` set per layout, e.g. `(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw`.
  - Source images ≤ 2400 px on the long edge; `next/image` serves AVIF/WebP.
  - Everything below the fold uses default lazy loading; the lightbox loads full-size images only when opened.
  - Explicit aspect ratios on every image container: zero layout shift.
- Fonts: `next/font` only (self-hosted, no layout shift). Nastaliq loaded only on `/ur` (§3.3).
- No third-party scripts on load. If analytics is approved, load it after interaction or with `strategy="lazyOnload"`.
- Maps, videos and any embeds use click-to-load facades.

### 7.6 Analytics (optional, ask before adding)

If approved, track only: `whatsapp_click` (with `source`: floating, hero, service id, contact_form), `call_click` (source), `language_select` (locale). No personal data in events.

### 7.7 Definition of done

- [ ] `pnpm lint`, `pnpm typecheck` and `pnpm build` pass.
- [ ] Both `/` and `/ur` checked at 360 px, 768 px and 1280 px widths.
- [ ] RTL layout verified: alignment, icons, form fields, gallery order, lightbox arrows.
- [ ] Keyboard-only pass: skip link, nav, prompt, lightbox, form.
- [ ] Reduced-motion pass.
- [ ] No hard-coded copy, no raw hex, no physical direction utilities (except the WhatsApp button).
- [ ] No `TODO(client)` value rendered on the page or in JSON-LD.
- [ ] Lighthouse mobile meets §1.4 on both locales.

---

## 8. Decision log

| Decision | Reason |
|---|---|
| One URL per locale (`/`, `/ur`) instead of a client-only toggle | Urdu content must be indexable with `hreflang` |
| URL is the source of truth; Context + localStorage + cookie remember the choice | Predictable shared links; no flash of the wrong language for returning users |
| Full page navigation on language switch | `<html lang/dir>`, fonts and metadata all change; switches are rare |
| No `Accept-Language` negotiation | Device language is an unreliable signal for this audience |
| WhatsApp button fixed bottom-right in both locales | Thumb reach and user expectation outweigh RTL mirroring here |
| Contact form opens WhatsApp instead of posting to a server | Matches how the client already works; no backend or stored personal data in v1 |
| Borehole cross-section as the single signature visual | Most characteristic image of the client's work; keeps everything else quiet and fast |
