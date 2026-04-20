import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

type PaginationControlsProps = {
  previousPath: string | null;
  nextPath: string | null;
};

const btnStyle =
  'inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-5 py-2.5 text-[12px] uppercase tracking-[0.14em] text-ink/75 transition hover:border-ember/60 hover:text-ember';

export default function PaginationControls({
  previousPath,
  nextPath,
}: PaginationControlsProps) {
  if (!previousPath && !nextPath) return null;

  return (
    <nav
      aria-label="Pagination"
      className="mt-16 flex w-full items-center justify-between border-t border-white/[0.06] pt-8"
    >
      {previousPath ? (
        <Link
          href={previousPath}
          className={btnStyle}
          aria-label="Go to previous page"
        >
          <ArrowLeftIcon className="h-3.5 w-3.5" />
          Previous
        </Link>
      ) : (
        <div />
      )}
      {nextPath && (
        <Link
          href={nextPath}
          className={btnStyle}
          aria-label="Go to next page"
        >
          Next
          <ArrowRightIcon className="h-3.5 w-3.5" />
        </Link>
      )}
    </nav>
  );
}
