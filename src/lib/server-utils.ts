import 'server-only';
import { unstable_cache } from 'next/cache';
import { notFound } from 'next/navigation';
import { EventCategory, Prisma } from '@prisma/client';
import prisma from './db';
import { EVENT_CATEGORIES } from './validations';
import { cityFromSlug } from './utils';

export const PAGE_SIZE = 12;

/**
 * Build the OR clause that powers the free-text search box.
 *
 * Matches across every text-ish field a visitor might plausibly type into the
 * search box — name, description, organizer, location — and *additionally*
 * matches the category enum when the query is a known category (e.g. typing
 * "music" surfaces all MUSIC-category events, even though no event name
 * contains that word).
 */
function buildQueryFilter(q: string): Prisma.EventWhereInput {
  const lower = q.toLowerCase();
  const categoryMatch = EVENT_CATEGORIES.find((c) => c.toLowerCase() === lower);

  return {
    OR: [
      { name: { contains: q, mode: 'insensitive' } },
      { description: { contains: q, mode: 'insensitive' } },
      { organizerName: { contains: q, mode: 'insensitive' } },
      { location: { contains: q, mode: 'insensitive' } },
      { city: { contains: q, mode: 'insensitive' } },
      ...(categoryMatch ? [{ category: categoryMatch }] : []),
    ],
  };
}

/**
 * Inclusive end-of-day for the `to` filter. The user's expectation for "Until
 * May 31" is "include May 31", not "cut off at midnight UTC May 31".
 */
function endOfDayUTC(date: Date): Date {
  const d = new Date(date);
  d.setUTCHours(23, 59, 59, 999);
  return d;
}

export const getEvents = unstable_cache(
  async (city: string, page: number) => {
    const where = {
      city: city === 'all' ? undefined : cityFromSlug(city),
    };

    const [events, totalCount] = await prisma.$transaction([
      prisma.event.findMany({
        where,
        orderBy: { date: 'asc' },
        take: PAGE_SIZE,
        skip: (page - 1) * PAGE_SIZE,
      }),
      prisma.event.count({ where }),
    ]);

    return { events, totalCount };
  },
  ['events-list'],
  { revalidate: 300, tags: ['events'] }
);

export const getEvent = unstable_cache(
  async (slug: string) => {
    const event = await prisma.event.findUnique({
      where: { slug },
    });
    if (!event) {
      return notFound();
    }

    return event;
  },
  ['event-detail'],
  { revalidate: 300, tags: ['events'] }
);

export type SearchEventsArgs = {
  q?: string;
  city?: string;
  category: EventCategory[];
  from?: Date;
  to?: Date;
  page: number;
};

export const searchEvents = unstable_cache(
  async ({ q, city, category, from, to, page }: SearchEventsArgs) => {
    const where: Prisma.EventWhereInput = {
      ...(q ? buildQueryFilter(q) : {}),
      ...(city ? { city: cityFromSlug(city) } : {}),
      ...(category.length > 0 ? { category: { in: category } } : {}),
      ...(from || to
        ? {
            date: {
              ...(from ? { gte: from } : {}),
              ...(to ? { lte: endOfDayUTC(to) } : {}),
            },
          }
        : {}),
    };

    const [events, totalCount] = await prisma.$transaction([
      prisma.event.findMany({
        where,
        orderBy: { date: 'asc' },
        take: PAGE_SIZE,
        skip: (page - 1) * PAGE_SIZE,
      }),
      prisma.event.count({ where }),
    ]);

    return { events, totalCount };
  },
  ['events-search'],
  { revalidate: 300, tags: ['events'] }
);

export const getDistinctCities = unstable_cache(
  async () => {
    const rows = await prisma.event.findMany({
      distinct: ['city'],
      select: { city: true },
      orderBy: { city: 'asc' },
    });
    return rows.map((r) => r.city);
  },
  ['events-distinct-cities'],
  { revalidate: 3600, tags: ['events'] }
);
