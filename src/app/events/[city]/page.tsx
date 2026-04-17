import EventsList from '@/components/events-list';
import H1 from '@/components/h1';
import Link from 'next/link';
import { Suspense } from 'react';
import Loading from './loading';
import { capitalizeFirstLetter } from '@/lib/utils';
import { getDistinctCities } from '@/lib/server-utils';
import { z } from 'zod';

type MetadataProps = {
  params: Promise<{
    city: string;
  }>;
};

type EventsPageProps = MetadataProps & {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
};

export async function generateMetadata({ params }: MetadataProps) {
  const { city: cityParam } = await params;
  const city = cityParam.toLowerCase();
  return {
    title:
      city === 'all'
        ? 'All events'
        : `${capitalizeFirstLetter(city)} · The Index`,
  };
}

const pageNumberSchema = z.coerce.number().int().positive().optional();

export default async function EventsPage({
  params,
  searchParams,
}: EventsPageProps) {
  const { city: cityParam } = await params;
  const city = cityParam.toLowerCase();
  const sp = await searchParams;
  const parsedPage = pageNumberSchema.safeParse(sp.page);
  if (!parsedPage.success) {
    throw new Error('Invalid page number');
  }

  // Drive allowlist from seeded data so adding a city to the seed unlocks it
  // here automatically.
  const seededCities = await getDistinctCities();
  const allowed = new Set([
    'all',
    ...seededCities.map((c) => c.toLowerCase()),
  ]);

  if (!allowed.has(city)) {
    return (
      <main className="flex min-h-[80vh] flex-col items-center px-6 pb-24 pt-24 sm:px-12 sm:pt-28">
        <div className="flex w-full max-w-2xl flex-col items-center gap-6 text-center">
          <span className="text-[11px] uppercase tracking-[0.22em] text-ember">
            Not on the bill yet
          </span>
          <H1 className="max-w-[18ch] text-center">
            No listings in {capitalizeFirstLetter(city)}.
          </H1>
          <p className="text-ink/55">
            Marquee is slowly rolling out city by city. In the meantime, browse
            the cities we do keep.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-4">
            {seededCities.map((c) => (
              <Link
                key={c}
                href={`/events/${c.toLowerCase()}`}
                className="rounded-full border border-white/10 px-5 py-2 text-[12px] uppercase tracking-[0.16em] text-ink transition hover:border-ember/60 hover:text-ember"
              >
                {capitalizeFirstLetter(c.toLowerCase())}
              </Link>
            ))}
            <Link
              href="/events/all"
              className="rounded-full border border-ember/60 bg-ember/10 px-5 py-2 text-[12px] uppercase tracking-[0.16em] text-ember transition hover:bg-ember/20"
            >
              All events
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const title =
    city === 'all' ? 'Every city.' : `${capitalizeFirstLetter(city)}.`;

  return (
    <main className="flex min-h-[90vh] flex-col items-center gap-14 px-6 pb-24 pt-20 sm:px-12 sm:pt-28 lg:px-20">
      <header className="flex w-full max-w-6xl flex-col gap-5">
        <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-ember">
          <span className="h-px w-8 bg-ember/60" aria-hidden />
          {city === 'all' ? 'The full index' : 'Tonight in town'}
        </div>
        <H1 className="max-w-[18ch]">{title}</H1>
      </header>

      <Suspense key={city + parsedPage.data} fallback={<Loading />}>
        <EventsList city={city} page={parsedPage.data} />
      </Suspense>
    </main>
  );
}
