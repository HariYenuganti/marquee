import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center gap-6 px-6 text-center">
      <span className="text-[11px] uppercase tracking-[0.22em] text-ember">
        Not on the bill
      </span>
      <h1 className="font-display text-[clamp(3rem,6vw,5rem)] leading-[1] tracking-tight">
        Nothing here.
      </h1>
      <p className="max-w-md text-ink/55">
        The page you&rsquo;re looking for has moved or never existed. Try the
        index.
      </p>
      <Link
        href="/events"
        className="mt-2 inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-2.5 text-[12px] uppercase tracking-[0.16em] text-ink transition hover:border-ember/60 hover:text-ember"
      >
        Browse the index →
      </Link>
    </main>
  );
}
