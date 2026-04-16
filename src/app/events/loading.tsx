import SkeletonCard from '@/components/skeleton-card';

export default function Loading() {
  return (
    <div className="flex flex-wrap justify-center max-w-[1100px] w-full mx-auto px-5 gap-20">
      {Array.from({ length: 6 }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
}
