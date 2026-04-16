import prisma from '@/lib/db';
import { MetadataRoute } from 'next';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const events = await prisma.eventoEvent.findMany({
    select: { slug: true, updatedAt: true },
  });

  const eventUrls = events.map((event) => ({
    url: `https://even-to.vercel.app/event/${event.slug}`,
    lastModified: event.updatedAt,
  }));

  return [
    { url: 'https://even-to.vercel.app', lastModified: new Date() },
    { url: 'https://even-to.vercel.app/events/all', lastModified: new Date() },
    ...eventUrls,
  ];
}
