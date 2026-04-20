import Skeleton from './skeleton';

/**
 * Placeholder that mirrors EventCard's composition so the grid doesn't reflow
 * when real data arrives.
 */
export default function SkeletonCard() {
  return (
    <div className="flex-1 basis-80 max-w-[460px]">
      <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.03]">
        {/* Image area */}
        <Skeleton className="aspect-[4/3] w-full rounded-none" />
        {/* Body */}
        <div className="flex flex-col gap-3 px-5 py-5 sm:px-6 sm:py-6">
          <Skeleton className="h-3 w-24 rounded-sm" />
          <Skeleton className="h-6 w-3/4 rounded-sm" />
          <Skeleton className="h-3 w-1/2 rounded-sm" />
          <div className="mt-auto pt-4">
            <Skeleton className="h-3 w-2/5 rounded-sm" />
          </div>
        </div>
      </div>
    </div>
  );
}
