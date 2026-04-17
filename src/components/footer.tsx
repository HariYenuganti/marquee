import Link from 'next/link';

const routes = [
  { path: '/terms-conditions', name: 'Terms' },
  { path: '/privacy-policy', name: 'Privacy' },
];

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-white/10 px-4 sm:px-10">
      <div className="flex flex-col items-start justify-between gap-4 py-8 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3 text-[12px] text-ink/45">
          <span className="h-1.5 w-1.5 rounded-[1px] bg-ember/80" aria-hidden />
          <span className="font-display italic text-ink/70">Marquee</span>
          <span className="text-ink/25">·</span>
          <span>A hand-kept index. Updated weekly.</span>
        </div>
        <nav aria-label="Footer navigation">
          <ul className="flex gap-6 text-[12px] uppercase tracking-[0.14em] text-ink/45">
            {routes.map((route) => (
              <li key={route.path}>
                <Link
                  href={route.path}
                  className="transition hover:text-ink"
                >
                  {route.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
