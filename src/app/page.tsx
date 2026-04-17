import Link from 'next/link';
import SearchForm from '@/components/searchForm';
import H1 from '@/components/h1';
import { getDistinctCities } from '@/lib/server-utils';
import { capitalizeFirstLetter } from '@/lib/utils';

export default async function Home() {
  const cities = await getDistinctCities().catch(() => [] as string[]);

  return (
    <main className="relative flex min-h-[calc(100vh-3.5rem)] flex-col items-start gap-12 px-6 pb-24 pt-28 sm:px-12 sm:pt-36 lg:px-20">
      {/* Eyebrow */}
      <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-ember">
        <span className="h-px w-8 bg-ember/60" aria-hidden />
        Tonight, in your city
      </div>

      {/* Headline */}
      <H1 className="max-w-[18ch]">
        Tonight&rsquo;s{' '}
        <span className="italic text-ember">lineup.</span>
        <br />
        Tonight&rsquo;s town.
      </H1>

      {/* Lead */}
      <p className="max-w-xl text-lg leading-relaxed text-ink/65 sm:text-xl">
        A curated index of shows, sets, readings, and late-night pop-ups —
        updated as the day unfolds. Search by mood, not just category.
      </p>

      {/* Search */}
      <SearchForm />

      {/* Secondary actions + cities */}
      <div className="flex w-full flex-wrap items-baseline justify-between gap-6">
        <Link
          href="/events"
          className="group inline-flex items-center gap-2 text-sm font-medium text-ink transition hover:text-ember"
        >
          Browse the full index
          <span
            aria-hidden
            className="transition-transform group-hover:translate-x-0.5"
          >
            →
          </span>
        </Link>

        {cities.length > 0 && (
          <nav
            aria-label="Popular cities"
            className="flex items-center gap-4 text-sm text-ink/55"
          >
            <span className="uppercase tracking-[0.16em] text-[11px] text-ink/45">
              Cities
            </span>
            {cities.slice(0, 4).map((city, i) => (
              <span key={city} className="flex items-center gap-4">
                {i > 0 && (
                  <span className="text-ink/25" aria-hidden>
                    ·
                  </span>
                )}
                <Link
                  href={`/events/${city.toLowerCase()}`}
                  className="transition hover:text-ink"
                >
                  {capitalizeFirstLetter(city.toLowerCase())}
                </Link>
              </span>
            ))}
          </nav>
        )}
      </div>
    </main>
  );
}
