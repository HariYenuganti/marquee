import EventCard from './event-card';
import { getEvents } from '@/lib/server-utils';
import PaginationControls from './pagination-controls';

type EventsListProps = {
  city: string;
  page?: number;
};

export default async function EventsList({ city, page = 1 }: EventsListProps) {
  const { events, totalCount } = await getEvents(city, page);

  const previousPath = page > 1 ? `/events/${city}?page=${page - 1}` : null;
  const nextPath =
    totalCount > page * 6 ? `/events/${city}?page=${page + 1}` : null;

  return (
    <section className="w-full max-w-6xl px-5">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
      <PaginationControls previousPath={previousPath} nextPath={nextPath} />
    </section>
  );
}
