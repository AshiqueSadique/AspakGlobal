# Aspak Global Co., Ltd. — Corporate Website

Bilingual (Thai/English) corporate website for **Aspak Global Co., Ltd. (บริษัท แอสแพค โกลบอล จำกัด)**, a Bangkok-based trading and services company.

**Tech stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS · GSAP 3 · Lenis smooth scroll · next-intl

---

## Quick Start

```bash
cd aspak-global
npm install
npm run dev       # http://localhost:3000 → redirects to /en
npm run build     # production build
npm run start     # serve production build
```

---

## Project Structure

```
aspak-global/
├── app/
│   ├── [locale]/            # All locale-prefixed routes (/en, /th)
│   │   ├── layout.tsx       # Locale layout (html lang, fonts, JSON-LD schema)
│   │   ├── page.tsx         # Home page
│   │   ├── about/
│   │   ├── services/
│   │   │   ├── it-solutions/
│   │   │   ├── import-export/
│   │   │   ├── packaging-paper/
│   │   │   ├── office-supply/
│   │   │   └── cleaning/
│   │   ├── contact/
│   │   └── not-found.tsx    # 404 page (per locale)
│   ├── globals.css          # Design tokens + global styles
│   ├── page.tsx             # Root: redirects to /en
│   ├── sitemap.ts           # Sitemap with hreflang
│   └── robots.ts
├── components/
│   ├── animations/          # LenisProvider, ParticleHero, SplitTextReveal
│   ├── home/                # Hero, IntroSection, ServiceCards, StatsBand, etc.
│   ├── about/               # AboutHero, Timeline, Leadership, etc.
│   ├── services/            # ServicesHub, ServicePageLayout, sub-brand extras
│   ├── contact/             # ContactHero, ContactContent (form + info + map)
│   └── layout/              # Header (sticky, lang toggle, mega nav), Footer
├── i18n/
│   ├── routing.ts           # Locale config: ["en","th"], default: "en"
│   └── request.ts           # next-intl server request config
├── messages/
│   ├── en.json              # All English strings
│   └── th.json              # All Thai strings
└── proxy.ts                 # next-intl routing proxy (locale detection + cookie)
```

---

## How to Edit Content

### Changing Text and Translations

All visible text lives in **`messages/en.json`** and **`messages/th.json`**. The two files share identical key structures. Change the same key in both files to update copy in both languages. No code changes needed for text edits.

**Namespace reference:**

| Namespace | Page / Section |
|---|---|
| `meta` | Site name and global tagline |
| `nav` | Navigation labels and services dropdown |
| `home.hero` | Homepage hero headline, subheadline, CTAs |
| `home.intro` | Company introduction section |
| `home.services` | Service cards on homepage |
| `home.stats` | Statistics band (count-up numbers) |
| `home.why` | "Why Choose Us" section |
| `home.cta` | Bottom CTA band |
| `about.*` | About page — hero, mission/vision, values, leadership, timeline |
| `services.*` | Services hub page |
| `itSolutions.*` | IT Solutions page |
| `importExport.*` | Import & Export page |
| `packaging.*` | Packaging & Paper page |
| `officeSupply.*` | Office Supply page |
| `cleaning.*` | Cleaning Services / Dee Cleaning page |
| `contact.*` | Contact page — form labels, info, validation messages |
| `footer.*` | Footer links, address, copyright |
| `notFound.*` | 404 page |

**Example — update the Home hero headline:**
```json
// messages/en.json
"home": { "hero": { "headline": "New Line One\nNew Line Two" } }

// messages/th.json
"home": { "hero": { "headline": "บรรทัดแรก\nบรรทัดที่สอง" } }
```

### Changing Contact Info

Edit `contact.info` in both message files — phone, email, LINE, address, and hours are all there.

### Changing the Dee Cleaning Company External URL

Edit `app/[locale]/services/cleaning/page.tsx`:
```ts
const deeUrl = locale === "th"
  ? "https://dee-cleaning-co.vercel.app/th/"  // ← change Thai URL here
  : "https://dee-cleaning-co.vercel.app/en/"; // ← change English URL here
```

### Changing the Director

Edit `about.leadership.director` in both message files.

---

## Design Tokens

All design tokens are CSS custom properties in `app/globals.css`:

```css
:root {
  --navy-950: #091E3A;   /* darkest navy background */
  --navy-800: #123A6B;   /* primary navy */
  --gold-600: #C9A227;   /* primary gold accent */
  --gold-400: #E8C766;   /* light gold */
  /* ... full palette documented in globals.css */
}
```

Change a token and it propagates everywhere.

---

## Adding a New Page

1. Create `app/[locale]/your-page/page.tsx`
2. Add translation keys to both `messages/en.json` and `messages/th.json`
3. Add nav links to `components/layout/Header.tsx`
4. Add footer links to `components/layout/Footer.tsx`
5. Add the URL to `app/sitemap.ts`

---

## Animations Reference

| Component | Effect |
|---|---|
| `ParticleHero` | Canvas particle burst → AG monogram assembly on first load |
| `LenisProvider` | Smooth scroll synced to GSAP ScrollTrigger |
| `SplitTextReveal` | Line-mask text reveals (Thai-safe: word/line, not character) |
| `StatsBand` | GSAP count-up on scroll entry |
| `TimelineSection` | DrawSVG animated spine + staggered entry |
| `ImportExportExtra` | MotionPath trade-route dots on SVG map |
| `ServiceCards` | Staggered scroll-in + gold sheen hover |

All animations respect `prefers-reduced-motion` and degrade gracefully.

---

## Deployment (Vercel)

```bash
git init
git add .
git commit -m "Initial commit"
# Push to GitHub, then connect to Vercel
```

No environment variables required for basic deployment. If you add a contact form API:
- `RESEND_API_KEY` or similar mailer credential

Set your production domain in `app/[locale]/layout.tsx` (`metadataBase`) and `app/sitemap.ts` (`BASE_URL`).
