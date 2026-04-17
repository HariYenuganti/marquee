'use client';

import { Event } from '@prisma/client';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { capitalizeFirstLetter } from '@/lib/utils';

type EventCardProps = {
  event: Event;
};

export default function EventCard({ event }: EventCardProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['0 1', '1.5 1'],
  });

  // Gentler entrance than the original — smaller scale delta, higher starting
  // opacity so the grid reads as a settled list rather than a pop-in animation.
  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.94, 1]);
  const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.4, 1]);

  const date = new Date(event.date);
  const day = date.getDate().toString().padStart(2, '0');
  const month = date.toLocaleString('en-US', { month: 'short' });
  const weekday = date.toLocaleString('en-US', { weekday: 'short' });

  return (
    <motion.div
      ref={ref}
      className="group flex-1 basis-80 max-w-[460px]"
      style={{
        scale: scaleProgress,
        opacity: opacityProgress,
      }}
      initial={{ opacity: 0.4 }}
    >
      <Link
        href={`/event/${event.slug}`}
        className="block h-full rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-4 focus-visible:ring-offset-base"
      >
        <article className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.03] transition-all duration-300 group-hover:border-white/[0.12] group-hover:bg-white/[0.05]">
          {/* Media */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={event.imageUrl}
              alt=""
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 420px"
              className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.04]"
            />

            {/* Date badge */}
            <div className="absolute left-4 top-4 flex min-w-[56px] flex-col items-center rounded-[10px] bg-base/85 px-3 py-2 text-center backdrop-blur-sm ring-1 ring-white/10">
              <span className="font-display text-2xl leading-none text-ink">
                {day}
              </span>
              <span className="mt-1 text-[10px] uppercase tracking-[0.18em] text-ember">
                {month}
              </span>
            </div>

            {/* Category eyebrow, bottom-right */}
            <div className="absolute bottom-3 right-3 rounded-md bg-base/70 px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-ink/80 ring-1 ring-white/10 backdrop-blur-sm">
              {capitalizeFirstLetter(event.category.toLowerCase())}
            </div>
          </div>

          {/* Body */}
          <div className="flex flex-1 flex-col gap-1 px-5 py-5 sm:px-6 sm:py-6">
            <div className="text-[11px] uppercase tracking-[0.16em] text-ink/45">
              {weekday} · {event.city}
            </div>
            <h3 className="font-display text-[22px] leading-[1.15] tracking-tight text-ink">
              {event.name}
            </h3>
            <p className="mt-1 text-[13px] italic text-ink/55">
              presented by {event.organizerName}
            </p>
            <div className="mt-auto pt-4 text-[12px] text-ink/45">
              {event.location}
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}
