import Link from 'next/link';
import { PAGE_SIZE, searchEvents, type SearchEventsArgs } from '@/lib/server-utils';
import EventCard from './event-card';
import PaginationControls from './pagination-controls';

type EventsResultsProps = SearchEventsArgs;

function buildQueryString(
  args: SearchEventsArgs,
  page: number
): string {
  const params = new URLSearchParams();
  if (args.q) params.set('q', args.q);
  if (args.city) params.set('city', args.city);
  if (args.category.length > 0) params.set('category', args.category.join(','));
  if (args.from) params.set('from', args.from.toISOString().slice(0, 10));
  if (args.to) params.set('to', args.to.toISOString().slice(0, 10));
  if (page > 1) params.set('page', String(page));
  const qs = params.toString();
  return qs ? `?${qs}` : '';
}

export default async function EventsResults(props: EventsResultsProps) {
  const { events, totalCount } = await searchEvents(props);

  if (totalCount === 0) {
    return (
      <section className="max-w-[1100px] w-full flex flex-col items-center py-24 gap-4 px-5 text-center">
        <p className="text-xl text-white/75">
          No events match your filters.
        </p>
        <Link
          href="/events"
          className="text-sm text-accent hover:underline transition"
        >
          Clear filters
        </Link>
      </section>
    );
  }

  const previousPath =
    props.page > 1
      ? `/events${buildQueryString(props, props.page - 1)}`
      : null;
  const nextPath =
    totalCount > props.page * PAGE_SIZE
      ? `/events${buildQueryString(props, props.page + 1)}`
      : null;

  return (
    <section className="max-w-[1100px] flex flex-wrap gap-10 justify-center px-5 w-full">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
      <PaginationControls previousPath={previousPath} nextPath={nextPath} />
    </section>
  );
}
