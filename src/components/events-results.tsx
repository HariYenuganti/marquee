import Link from 'next/link';
import {
  PAGE_SIZE,
  searchEvents,
  type SearchEventsArgs,
} from '@/lib/server-utils';
import EventCard from './event-card';
import PaginationControls from './pagination-controls';

type EventsResultsProps = SearchEventsArgs;

function buildQueryString(args: SearchEventsArgs, page: number): string {
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
      <section className="flex w-full max-w-3xl flex-col items-center gap-4 px-5 py-24 text-center">
        <span className="text-[11px] uppercase tracking-[0.22em] text-ember">
          No match
        </span>
        <p className="font-display text-3xl text-ink">Nothing on the bill.</p>
        <p className="max-w-md text-ink/55">
          Try a different search or widen the dates. New events drop throughout
          the week.
        </p>
        <Link
          href="/events"
          className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-2.5 text-[12px] uppercase tracking-[0.16em] text-ink transition hover:border-ember/60 hover:text-ember"
        >
          Clear all filters
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
    <section className="w-full max-w-6xl px-5">
      {/* Count row */}
      <div className="mb-8 flex items-baseline justify-between border-b border-white/[0.06] pb-4">
        <span className="text-[11px] uppercase tracking-[0.2em] text-ink/45">
          {totalCount} event{totalCount === 1 ? '' : 's'}
        </span>
        <span className="text-[11px] uppercase tracking-[0.2em] text-ink/35">
          Page {props.page}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      <PaginationControls previousPath={previousPath} nextPath={nextPath} />
    </section>
  );
}
