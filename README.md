<div align="center">

<h1>Evento</h1>

<p><strong>A modern event-discovery app built with Next.js 14 App Router.</strong></p>

<p>
  <a href="https://even-to.vercel.app"><img alt="Live Demo" src="https://img.shields.io/badge/Live_Demo-View-a4f839?style=for-the-badge"></a>
  <a href="https://github.com/HariYenuganti/evenTo"><img alt="Source" src="https://img.shields.io/badge/Source-GitHub-181717?style=for-the-badge&logo=github"></a>
</p>

<img src="public/screenshots/events.png" alt="Discover events page with search, city, category, and date filters" width="900">

</div>

## Highlights

- **URL-driven filter state** — every search/filter writes to `searchParams`, so `/events?q=jazz&city=austin&category=MUSIC,COMEDY&from=2026-04-20` is a shareable link. See [src/components/events-filters.tsx](src/components/events-filters.tsx).
- **Server Components + `unstable_cache`** for data fetching with tag-based invalidation — no client-side data libraries. See [src/lib/server-utils.ts](src/lib/server-utils.ts).
- **Type-safe end-to-end**: Prisma → Zod-validated server actions → React. See [src/lib/validations.ts](src/lib/validations.ts) and [src/app/event/[slug]/actions.ts](src/app/event/[slug]/actions.ts).
- **Transactional emails** via Resend + React Email components. Graceful degradation when `RESEND_API_KEY` is unset.
- **Abuse-resistant bookings** — Upstash Ratelimit enforces 5 bookings/min per IP, with graceful no-op in dev. See [src/lib/rate-limit.ts](src/lib/rate-limit.ts).
- **Tested**: one Playwright happy-path E2E covering the booking flow, running in CI against a Postgres service container. See [tests/booking.spec.ts](tests/booking.spec.ts) and [.github/workflows/ci.yml](.github/workflows/ci.yml).

## Architecture decisions

**Why Server Components instead of SWR/React Query.**  The events list and detail pages are read-mostly, cache-friendly, and SEO-relevant. Pushing fetching to the server keeps the client bundle small, lets `unstable_cache` + revalidation tags handle staleness, and renders the first paint from HTML. Client Components stay scoped to interactive islands (the booking modal, the filter controls).

**Why a server action for booking, not an API route.**  The booking form is a single write that wants type safety from form → validator → DB. A server action passes a typed `BookingInput` straight to [`createBooking`](src/app/event/[slug]/actions.ts), Zod-validates on the server, and returns a discriminated union the modal renders directly. No fetch wrapper, no JSON serialization boilerplate, no separate OpenAPI contract to maintain.

**Why `prisma db push` instead of migrations.**  The project has one deployment and a small seed. Migration history adds ceremony without yet buying anything — schema changes go through `db push --force-reset` in dev and CI, and the seed rebuilds from scratch. If the app ever gets real production data, switching to `migrate deploy` is a one-commit migration.

## Tech stack

- **Framework**: [Next.js 14](https://nextjs.org) (App Router, Server Components, Server Actions)
- **Language**: [TypeScript](https://www.typescriptlang.org)
- **Styling**: [Tailwind CSS](https://tailwindcss.com), [Framer Motion](https://www.framer.com/motion/)
- **Database**: PostgreSQL + [Prisma](https://www.prisma.io)
- **Validation**: [Zod](https://zod.dev)
- **Email**: [Resend](https://resend.com) + [React Email](https://react.email)
- **Rate limiting**: [Upstash Ratelimit](https://upstash.com/docs/redis/sdks/ratelimit-ts/overview) on Redis
- **Date picker**: [react-day-picker](https://daypicker.dev)
- **Testing**: [Playwright](https://playwright.dev) running in GitHub Actions against a Postgres service container

## Screenshots

| Home | Discover | Event detail |
|------|----------|--------------|
| <img src="public/screenshots/home.png" alt="Home page" width="280"> | <img src="public/screenshots/events.png" alt="Events discovery page" width="280"> | <img src="public/screenshots/event-detail.png" alt="Event detail with booking" width="280"> |

<details>
<summary>Local development</summary>

### Prerequisites

- Node.js 18+
- PostgreSQL

### Setup

```bash
git clone https://github.com/HariYenuganti/evenTo.git
cd evenTo
npm install
```

Create a `.env` file (see [.env.example](.env.example)):

```env
DATABASE_URL="postgresql://user:password@localhost:5432/evento"
# Optional — all services below degrade gracefully when unset
RESEND_API_KEY=""
UPSTASH_REDIS_REST_URL=""
UPSTASH_REDIS_REST_TOKEN=""
```

Push the schema and seed:

```bash
npx prisma db push
npx prisma db seed
```

Run the dev server:

```bash
npm run dev
```

### Tests

```bash
npm run test:e2e
```

### Project layout

```
src/
├── app/              # App Router routes, layouts, server actions
├── components/       # UI (Server and Client Components)
├── lib/              # db client, validations, server utils, rate limiter
└── emails/           # React Email templates
prisma/
├── schema.prisma     # EventoEvent, Booking, EventCategory
└── seed.ts           # Seed data
tests/
└── booking.spec.ts   # Playwright E2E
```

</details>
