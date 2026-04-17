import Link from 'next/link';

/**
 * Marquee monogram — "M." in Fraunces italic with an ember period.
 *
 * The visible mark is minimal; the accessible name is still the full
 * "Marquee" so screen readers and browser history behave correctly.
 */
export default function Logo() {
  return (
    <Link
      href="/"
      aria-label="Marquee — home"
      className="group inline-flex items-baseline rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-2 focus-visible:ring-offset-base"
    >
      <span
        aria-hidden
        className="font-display italic text-[26px] leading-none tracking-tight text-ink transition-colors group-hover:text-ember"
      >
        M
      </span>
      <span
        aria-hidden
        className="font-display italic text-[26px] leading-none tracking-tight text-ember"
      >
        .
      </span>
    </Link>
  );
}
