import prisma from '@/lib/db';
import { siteUrl } from '@/lib/utils';
import { MetadataRoute } from 'next';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const events = await prisma.event.findMany({
    select: { slug: true, updatedAt: true },
  });

  const eventUrls = events.map((event) => ({
    url: siteUrl(`/event/${event.slug}`),
    lastModified: event.updatedAt,
  }));

  return [
    { url: siteUrl(), lastModified: new Date() },
    { url: siteUrl('/events'), lastModified: new Date() },
    { url: siteUrl('/events/all'), lastModified: new Date() },
    ...eventUrls,
  ];
}
