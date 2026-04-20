import { cn } from '@/lib/utils';

type H1Props = {
  children: React.ReactNode;
  className?: string;
};

/**
 * The Marquee display headline. Fraunces serif, tight tracking, near-1.0
 * line-height so two-line headlines stack like a printed program.
 */
export default function H1({ children, className }: H1Props) {
  return (
    <h1
      className={cn(
        'font-display font-normal tracking-tight',
        'text-[clamp(3rem,7vw,6.5rem)] leading-[0.98]',
        className
      )}
    >
      {children}
    </h1>
  );
}
