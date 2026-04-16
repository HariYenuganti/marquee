import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

type PaginationControlsProps = {
  previousPath: string | null;
  nextPath: string | null;
};

const btnStyle =
  'text-white flex items-center gap-x-2 px-5 py-3 bg-white/5 rounded-md opacity-70 hover:opacity-100 transition text-sm';

export default function PaginationControls({
  previousPath,
  nextPath,
}: PaginationControlsProps) {
  return (
    <section className="flex justify-between w-full">
      {previousPath ? (
        <Link href={previousPath} className={btnStyle} aria-label="Go to previous page">
          <ArrowLeftIcon />
          Previous
        </Link>
      ) : (
        <div />
      )}
      {nextPath && (
        <Link href={nextPath} className={btnStyle} aria-label="Go to next page">
          Next
          <ArrowRightIcon />
        </Link>
      )}
    </section>
  );
}
