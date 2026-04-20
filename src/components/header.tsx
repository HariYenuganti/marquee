'use client';
import Link from 'next/link';
import Logo from './logo';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const routes = [
  { name: 'Tonight', path: '/' },
  { name: 'Index', path: '/events/all' },
];

export default function Header() {
  const activePathname = usePathname();

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-white/10 bg-base/80 px-4 backdrop-blur-md sm:px-10">
      <Logo />
      <nav className="h-full" aria-label="Main navigation">
        <ul className="flex h-full items-center gap-x-8 text-[13px] uppercase tracking-[0.14em]">
          {routes.map((route) => {
            const isActive = activePathname === route.path;
            return (
              <li
                key={route.path}
                className={cn(
                  'relative flex h-full items-center transition-colors',
                  {
                    'text-ink': isActive,
                    'text-ink/55 hover:text-ink': !isActive,
                  }
                )}
              >
                <Link
                  href={route.path}
                  aria-current={isActive ? 'page' : undefined}
                  className="py-1"
                >
                  {route.name}
                </Link>

                {isActive && (
                  <motion.div
                    layoutId="header-active-link"
                    className="absolute -bottom-px left-0 right-0 h-[2px] bg-ember"
                    transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                  />
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
