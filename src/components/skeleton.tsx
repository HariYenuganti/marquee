import { cn } from '@/lib/utils';

type SkeletonProps = {
  className?: string;
};

export default function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-white/[0.04] h-4 w-full',
        className
      )}
    />
  );
}
