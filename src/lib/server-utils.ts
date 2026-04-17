import 'server-only';
import { unstable_cache } from 'next/cache';
import { notFound } from 'next/navigation';
import { EventCategory } from '@prisma/client';
import prisma from './db';
import { capitalizeFirstLetter } from './utils';

export const PAGE_SIZE = 6;

export const getEvents = unstable_cache(
  async (city: string, page: number) => {
    const where = {
      city: city === 'all' ? undefined : capitalizeFirstLetter(city),
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
    const where = {
      ...(q ? { name: { contains: q, mode: 'insensitive' as const } } : {}),
      ...(city ? { city: capitalizeFirstLetter(city) } : {}),
      ...(category.length > 0 ? { category: { in: category } } : {}),
      ...(from || to
        ? {
            date: {
              ...(from ? { gte: from } : {}),
              ...(to ? { lte: to } : {}),
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
