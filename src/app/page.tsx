import Link from 'next/link';
import SearchForm from '@/components/searchForm';
import H1 from '@/components/h1';

export default function Home() {
  return (
    <main className="flex flex-col items-center px-3 pt-36 ">
      <H1>find events around you</H1>
      <p className="mb-12 mt-7 text-2xl lg:text-3xl opacity-75">
        Browse{' '}
        <span className="font-bold text-accent italic underline">
          curated events{' '}
        </span>
        in your city
      </p>
      <SearchForm />
      <Link
        href="/events"
        className="mt-6 text-sm font-semibold text-accent hover:underline transition"
      >
        Browse all events →
      </Link>
      <section className="mt-4 flex gap-x-4 text-sm text-white/50">
        <p>Popular:</p>
        <div className="space-x-2 font-semibold">
          <Link href="/events/austin">Austin</Link>
          <Link href="/events/seattle">Seattle</Link>
        </div>
      </section>
    </main>
  );
}
