<div align="center">

# Marquee

### A hand-kept index of nights worth leaving the house for — built on Next.js 16

<p>
  <a href="https://github.com/HariYenuganti/marquee"><img alt="Source" src="https://img.shields.io/badge/Source-GitHub-181717?style=for-the-badge&logo=github"></a>
  &nbsp;
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-16-000?style=for-the-badge&logo=nextdotjs&logoColor=%23EA8B4A">
</p>

<p>
  <a href="#highlights">Highlights</a> ·
  <a href="#architecture-decisions">Architecture</a> ·
  <a href="#tech-stack">Tech stack</a> ·
  <a href="#screenshots">Screenshots</a> ·
  <a href="#local-development">Getting started</a>
</p>

<br />

<img src="public/screenshots/events.png" alt="The Index — search, city, category, and date filters" width="900">

</div>

<br />

---

## Highlights

<table>
  <tr>
    <td width="33%" valign="top">
      <h4>Shareable filter URLs</h4>
      <p>Every search and filter writes to <code>searchParams</code>, so <code>/events?q=jazz&amp;city=austin&amp;category=MUSIC,COMEDY</code> is a link you can paste anywhere.</p>
      <sub><a href="src/components/events-filters.tsx">events-filters.tsx</a></sub>
    </td>
    <td width="33%" valign="top">
      <h4>Server Components + tag-keyed cache</h4>
      <p>Data fetching via <code>unstable_cache</code> with tag-based invalidation. No SWR, no React Query, no fetch on the client — the first paint is HTML.</p>
      <sub><a href="src/lib/server-utils.ts">server-utils.ts</a></sub>
    </td>
    <td width="33%" valign="top">
      <h4>Type-safe end-to-end</h4>
      <p>Prisma 6 → Zod-validated server actions → React 19. One <code>BookingInput</code> type flows from schema to form.</p>
      <sub><a href="src/lib/validations.ts">validations.ts</a></sub>
    </td>
  </tr>
  <tr>
    <td valign="top">
      <h4>Transactional email</h4>
      <p>Booking confirmations via Resend + React Email components, styled to the Marquee brand. Gracefully no-ops when <code>RESEND_API_KEY</code> is unset.</p>
      <sub><a href="src/app/event/%5Bslug%5D/actions.ts">actions.ts</a></sub>
    </td>
    <td valign="top">
      <h4>Abuse-resistant writes</h4>
      <p>Upstash Ratelimit enforces 5 bookings/min per IP on the server action. Falls back to a no-op in dev.</p>
      <sub><a href="src/lib/rate-limit.ts">rate-limit.ts</a></sub>
    </td>
    <td valign="top">
      <h4>E2E tested in CI</h4>
      <p>Playwright happy-path spec runs against a Postgres service container on every PR.</p>
      <sub><a href="tests/booking.spec.ts">booking.spec.ts</a> · <a href=".github/workflows/ci.yml">ci.yml</a></sub>
    </td>
  </tr>
</table>

---

## Architecture decisions

> **Why Server Components, not SWR / React Query**
>
> The events list and detail pages are read-mostly, cache-friendly, and SEO-relevant. Pushing fetching to the server keeps the client bundle small, lets `unstable_cache` + revalidation tags handle staleness, and renders the first paint from HTML. Client components stay scoped to interactive islands — the booking modal and filter controls.

> **Why a server action for booking, not an API route**
>
> The booking form is a single write that wants type safety from form → validator → DB. A server action passes a typed `BookingInput` straight to [`createBooking`](src/app/event/[slug]/actions.ts), Zod-validates on the server, and returns a discriminated union the modal renders directly. No fetch wrapper, no JSON serialization, no separate OpenAPI contract.

> **Why `prisma db push`, not migrations**
>
> One deployment, small seed. Migration history adds ceremony without yet buying anything — schema changes go through `db push --force-reset` in dev and CI, and the seed rebuilds from scratch. If the app ever gets real production data, switching to `migrate deploy` is a one-commit migration.

> **Why `NEXT_PUBLIC_SITE_URL`, not hardcoded**
>
> Deployment URLs are an env-var concern, not a source-of-truth-in-code concern. [`siteUrl()`](src/lib/utils.ts) reads `NEXT_PUBLIC_SITE_URL` with a localhost fallback and is referenced from `metadata`, `sitemap`, and `robots`. Rename the Vercel project once — no find/replace required.

---

## Tech stack

<p align="center">
  <img alt="Next.js 16" src="https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white">
  <img alt="React 19" src="https://img.shields.io/badge/React_19-149ECA?style=for-the-badge&logo=react&logoColor=white">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white">
  <img alt="Prisma 6" src="https://img.shields.io/badge/Prisma_6-2D3748?style=for-the-badge&logo=prisma&logoColor=white">
  <img alt="PostgreSQL" src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white">
  <img alt="Zod" src="https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white">
  <img alt="Resend" src="https://img.shields.io/badge/Resend-000000?style=for-the-badge&logo=resend&logoColor=white">
  <img alt="Upstash" src="https://img.shields.io/badge/Upstash-00E9A3?style=for-the-badge&logo=upstash&logoColor=white">
  <img alt="Playwright" src="https://img.shields.io/badge/Playwright-2EAD33?style=for-the-badge&logo=playwright&logoColor=white">
  <img alt="Framer Motion" src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white">
</p>

<br />

| Area | Tool |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) — App Router, Server Components, Server Actions, Turbopack |
| UI | [React 19](https://react.dev) |
| Language | [TypeScript](https://www.typescriptlang.org) |
| Styling | [Tailwind CSS](https://tailwindcss.com) + [Fraunces](https://fonts.google.com/specimen/Fraunces) & [Inter](https://fonts.google.com/specimen/Inter) via `next/font` |
| Motion | [Framer Motion](https://www.framer.com/motion/) for layout-tracking nav + scroll-triggered cards |
| Database | [PostgreSQL](https://www.postgresql.org) via [Prisma 6](https://www.prisma.io) |
| Validation | [Zod](https://zod.dev) |
| Email | [Resend](https://resend.com) + [React Email](https://react.email) |
| Rate limiting | [Upstash Ratelimit](https://upstash.com/docs/redis/sdks/ratelimit-ts/overview) on Redis |
| Testing | [Playwright](https://playwright.dev) in GitHub Actions against a Postgres service |

---

## Design system

The Marquee aesthetic is coded in two files so it's cheap to re-theme:

- [`tailwind.config.ts`](tailwind.config.ts) — `base`, `ink`, `ember` color tokens; `font-sans`/`font-display` families.
- [`src/app/globals.css`](src/app/globals.css) — CSS variables, scrollbar, react-day-picker overrides.

| Token | Value | Role |
|---|---|---|
| `base` | `#0B0B0D` | Warm charcoal — full-bleed background |
| `ink` | `#F6F1E8` | Warm off-white — primary text |
| `ember` | `#EA8B4A` | Single accent — CTAs, eyebrows, badges |
| `font-display` | Fraunces | Serif headlines, quotes, wordmarks |
| `font-sans` | Inter | Body, UI chrome |

---

## Screenshots

<table>
  <tr>
    <td align="center" width="33%"><strong>Tonight</strong></td>
    <td align="center" width="33%"><strong>The Index</strong></td>
    <td align="center" width="33%"><strong>Event</strong></td>
  </tr>
  <tr>
    <td><img src="public/screenshots/home.png" alt="Tonight — the landing page"></td>
    <td><img src="public/screenshots/events.png" alt="The Index — events discovery"></td>
    <td><img src="public/screenshots/event-detail.png" alt="Event detail with cinematic hero and booking sidebar"></td>
  </tr>
</table>

---

## Local development

<details>
<summary><strong>Setup, run, and test</strong></summary>

### Prerequisites

- Node.js 20+
- PostgreSQL (local or hosted)

### Install

```bash
git clone https://github.com/HariYenuganti/marquee.git
cd marquee
npm install
```

### Configure

Copy [.env.example](.env.example) to `.env` and set `DATABASE_URL`. The rest are optional — they degrade gracefully when unset.

```env
DATABASE_URL="postgresql://user:password@localhost:5432/marquee"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"

# Optional
RESEND_API_KEY=""
UPSTASH_REDIS_REST_URL=""
UPSTASH_REDIS_REST_TOKEN=""
```

### Initialize the database

```bash
npx prisma db push
npx prisma db seed
```

### Run

```bash
npm run dev         # http://localhost:3000
npm run test:e2e    # Playwright E2E
npm run lint
npm run build
```

### Project layout

```text
src/
├── app/              # App Router routes, layouts, server actions
├── components/       # UI (Server and Client Components)
├── lib/              # db client, validations, server utils, rate limiter, siteUrl()
└── emails/           # React Email templates
prisma/
├── schema.prisma     # Event, Booking, EventCategory
└── seed.ts           # 58 events across 4 cities (Austin, Seattle, NYC, Chicago)
tests/
└── booking.spec.ts   # Playwright E2E
.github/workflows/
└── ci.yml            # lint-and-build + test (Postgres service + Playwright)
```

</details>

<br />

<div align="center">
  <sub>Built by <a href="https://github.com/HariYenuganti">HariYenuganti</a></sub>
</div>
