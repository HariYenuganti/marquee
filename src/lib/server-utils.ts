import 'server-only';
import { unstable_cache } from 'next/cache';
import { notFound } from 'next/navigation';
import prisma from './db';
import { capitalizeFirstLetter } from './utils';

export const getEvents = unstable_cache(
  async (city: string, page: number) => {
    const where = {
      city: city === 'all' ? undefined : capitalizeFirstLetter(city),
    };

    const [events, totalCount] = await prisma.$transaction([
      prisma.eventoEvent.findMany({
        where,
        orderBy: { date: 'asc' },
        take: 6,
        skip: (page - 1) * 6,
      }),
      prisma.eventoEvent.count({ where }),
    ]);

    return { events, totalCount };
  },
  ['events-list'],
  { revalidate: 300, tags: ['events'] }
);

export const getEvent = unstable_cache(
  async (slug: string) => {
    const event = await prisma.eventoEvent.findUnique({
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
