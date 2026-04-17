import BookTicketsModal from '@/components/book-tickets-modal';
import { getEvent } from '@/lib/server-utils';
import { capitalizeFirstLetter } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type EventPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: EventPageProps) {
  const { slug } = await params;

  const event = await getEvent(slug);

  return {
    title: event.name,
    description: event.description.slice(0, 160),
    openGraph: {
      title: event.name,
      description: event.description.slice(0, 160),
      images: [event.imageUrl],
    },
  };
}

export default async function EventPage({ params }: EventPageProps) {
  const { slug } = await params;

  const event = await getEvent(slug);
  const date = new Date(event.date);

  const longDate = date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
  const day = date.getDate().toString().padStart(2, '0');
  const month = date.toLocaleString('en-US', { month: 'short' });

  return (
    <main>
      {/* Cinematic hero — a single image, gradient-shelved so the type reads
          over it (the one move lifted from Nocturne). */}
      <section className="relative overflow-hidden">
        <div className="relative h-[58vh] min-h-[420px] w-full sm:h-[70vh]">
          <Image
            src={event.imageUrl}
            alt=""
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover"
          />
          {/* Fade shelves */}
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-base via-base/60 to-base/10"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-r from-base/70 via-transparent to-transparent"
          />

          {/* Breadcrumb */}
          <div className="absolute left-0 right-0 top-0 z-10 flex justify-between px-6 pt-6 sm:px-10 sm:pt-8">
            <Link
              href="/events"
              className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.18em] text-ink/70 transition hover:text-ember"
            >
              ← The Index
            </Link>
            <span className="text-[12px] uppercase tracking-[0.18em] text-ink/60">
              {capitalizeFirstLetter(event.category.toLowerCase())}
            </span>
          </div>

          {/* Title block */}
          <div className="absolute bottom-0 left-0 right-0 z-10 px-6 pb-10 sm:px-10 sm:pb-14 lg:px-20 lg:pb-20">
            <div className="flex max-w-[62ch] flex-col gap-4">
              <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-ember">
                <span className="flex items-center gap-2">
                  <span className="h-[6px] w-[6px] rounded-[1px] bg-ember" />
                  {longDate}
                </span>
                <span className="text-ink/30">·</span>
                <span>{event.city}</span>
              </div>

              <h1 className="font-display text-[clamp(2.5rem,6vw,5.5rem)] font-normal leading-[0.98] tracking-tight text-ink">
                {event.name}
              </h1>

              <p className="text-lg text-ink/70">
                presented by{' '}
                <span className="italic text-ink">{event.organizerName}</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content block */}
      <section className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 py-16 sm:px-10 lg:grid-cols-[1fr_auto] lg:gap-20 lg:px-20 lg:py-24">
        <div className="flex flex-col gap-14">
          <Block label="About this event">
            <p className="whitespace-pre-line text-lg leading-[1.75] text-ink/75">
              {event.description}
            </p>
          </Block>

          <Block label="Location">
            <p className="text-lg text-ink/80">{event.location}</p>
            <p className="mt-1 text-sm text-ink/45">{event.city}</p>
          </Block>
        </div>

        {/* Sidebar — sticky on desktop */}
        <aside className="w-full lg:sticky lg:top-24 lg:w-[340px] lg:self-start">
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6">
            <div className="flex items-start gap-5">
              <div className="flex min-w-[72px] flex-col items-center rounded-xl bg-base px-4 py-3 text-center ring-1 ring-white/10">
                <span className="font-display text-[34px] leading-none text-ink">
                  {day}
                </span>
                <span className="mt-1 text-[10px] uppercase tracking-[0.2em] text-ember">
                  {month}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] uppercase tracking-[0.18em] text-ink/45">
                  One night only
                </span>
                <span className="mt-1 font-display text-xl italic text-ink">
                  Reserve a seat
                </span>
              </div>
            </div>

            <div className="mt-6">
              <BookTicketsModal eventId={event.id} eventName={event.name} />
            </div>

            <p className="mt-4 text-[12px] text-ink/45">
              You&rsquo;ll receive an email confirmation with your booking reference.
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
}

function Block({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="mb-5 flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-ember">
        <span className="h-px w-8 bg-ember/60" aria-hidden />
        {label}
      </div>
      {children}
    </section>
  );
}
