import { Suspense } from 'react';
import H1 from '@/components/h1';
import EventsFilters from '@/components/events-filters';
import EventsResults from '@/components/events-results';
import Loading from './loading';
import { searchEventsParamsSchema } from '@/lib/validations';
import { getDistinctCities } from '@/lib/server-utils';

export const metadata = {
  title: 'The Index',
  description: 'The full Marquee index — search, filter, find a night out.',
};

type EventsPageProps = {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
};

function firstString(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) return value[0];
  return value;
}

export default async function EventsPage({ searchParams }: EventsPageProps) {
  const sp = await searchParams;
  const parsed = searchEventsParamsSchema.parse({
    q: firstString(sp.q),
    city: firstString(sp.city),
    category: firstString(sp.category),
    from: firstString(sp.from),
    to: firstString(sp.to),
    page: firstString(sp.page),
  });

  const cities = await getDistinctCities();

  const resultsKey = JSON.stringify({
    q: parsed.q,
    city: parsed.city,
    category: parsed.category,
    from: parsed.from?.toISOString(),
    to: parsed.to?.toISOString(),
    page: parsed.page,
  });

  return (
    <main className="flex min-h-[90vh] flex-col items-center gap-14 px-6 pb-24 pt-20 sm:px-12 sm:pt-28 lg:px-20">
      {/* Title block */}
      <header className="flex w-full max-w-6xl flex-col gap-5">
        <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-ember">
          <span className="h-px w-8 bg-ember/60" aria-hidden />
          The Index
        </div>
        <H1 className="max-w-[16ch]">
          Every night,
          <br />
          hand-kept.
        </H1>
        <p className="max-w-xl text-lg leading-relaxed text-ink/55">
          Search, filter by city, narrow by date. No algorithm, just a list
          kept by hand.
        </p>
      </header>

      {/* Filters */}
      <EventsFilters
        cities={cities}
        initial={{
          q: parsed.q,
          city: parsed.city,
          category: parsed.category,
          from: parsed.from,
          to: parsed.to,
        }}
      />

      {/* Results */}
      <Suspense key={resultsKey} fallback={<Loading />}>
        <EventsResults {...parsed} />
      </Suspense>
    </main>
  );
}
