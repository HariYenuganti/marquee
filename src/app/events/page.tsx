import { Suspense } from 'react';
import H1 from '@/components/h1';
import EventsFilters from '@/components/events-filters';
import EventsResults from '@/components/events-results';
import Loading from './loading';
import { searchEventsParamsSchema } from '@/lib/validations';
import { getDistinctCities } from '@/lib/server-utils';

export const metadata = {
  title: 'Discover events',
};

type EventsPageProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

function firstString(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) return value[0];
  return value;
}

export default async function EventsPage({ searchParams }: EventsPageProps) {
  const parsed = searchEventsParamsSchema.parse({
    q: firstString(searchParams.q),
    city: firstString(searchParams.city),
    category: firstString(searchParams.category),
    from: firstString(searchParams.from),
    to: firstString(searchParams.to),
    page: firstString(searchParams.page),
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
    <main className="flex flex-col items-center py-24 px-5 min-h-[110vh] gap-10">
      <H1>Discover events</H1>

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

      <Suspense key={resultsKey} fallback={<Loading />}>
        <EventsResults {...parsed} />
      </Suspense>
    </main>
  );
}
