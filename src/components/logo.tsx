import Link from 'next/link';

/**
 * Marquee wordmark — rendered as live text in Fraunces so it scales, stays
 * crisp, and recolors from one token. The ember square on the left evokes a
 * theater marquee lightbulb without committing to a custom SVG.
 */
export default function Logo() {
  return (
    <Link
      href="/"
      aria-label="Marquee — home"
      className="group inline-flex items-center gap-2.5 text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-2 focus-visible:ring-offset-base rounded-sm"
    >
      <span
        aria-hidden
        className="block h-2.5 w-2.5 rounded-[2px] bg-ember transition-transform group-hover:scale-110"
      />
      <span className="font-display text-[22px] leading-none tracking-tight italic">
        Marquee
      </span>
    </Link>
  );
}
