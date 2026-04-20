import SkeletonCard from '@/components/skeleton-card';

export default function Loading() {
  return (
    <div className="grid w-full max-w-6xl grid-cols-1 gap-8 px-5 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
}
