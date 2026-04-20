'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { DayPicker, type DateRange } from 'react-day-picker';
import 'react-day-picker/style.css';
import { EventCategory } from '@prisma/client';
import { EVENT_CATEGORIES } from '@/lib/validations';
import { citySlug, cn } from '@/lib/utils';

type EventsFiltersProps = {
  cities: string[];
  initial: {
    q?: string;
    city?: string;
    category: EventCategory[];
    from?: Date;
    to?: Date;
  };
};

const CATEGORY_LABELS: Record<EventCategory, string> = {
  MUSIC: 'Music',
  FOOD: 'Food',
  TECH: 'Tech',
  ART: 'Art',
  WELLNESS: 'Wellness',
  COMEDY: 'Comedy',
  FASHION: 'Fashion',
  FILM: 'Film',
  WORKSHOP: 'Workshop',
};

function formatDateLabel(from?: Date, to?: Date) {
  if (!from && !to) return 'Any dates';
  const fmt = (d: Date) =>
    d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  if (from && to) return `${fmt(from)} – ${fmt(to)}`;
  if (from) return `From ${fmt(from)}`;
  if (to) return `Until ${fmt(to)}`;
  return 'Any dates';
}

// Shared input styling — reused by search, select, and date-picker trigger.
const FIELD =
  'h-12 rounded-xl bg-white/[0.04] border border-white/10 px-4 text-ink placeholder:text-ink/40 outline-none transition focus:border-ember/60 focus:ring-2 focus:ring-ember/25 focus:bg-white/[0.07]';

export default function EventsFilters({ cities, initial }: EventsFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [q, setQ] = useState(initial.q ?? '');
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const datePickerRef = useRef<HTMLDivElement>(null);

  const pushParams = useCallback(
    (patch: Record<string, string | null>) => {
      const next = new URLSearchParams(searchParams.toString());
      for (const [key, value] of Object.entries(patch)) {
        if (value === null || value === '') next.delete(key);
        else next.set(key, value);
      }
      next.delete('page');
      const qs = next.toString();
      router.replace(qs ? `/events?${qs}` : '/events', { scroll: false });
    },
    [router, searchParams]
  );

  // Keep the local search input in sync with the URL's `q` param. Covers the
  // back/forward button and any external navigation (e.g. clicking a popular
  // city on the home page) — without this, the input and URL can drift apart.
  useEffect(() => {
    setQ(initial.q ?? '');
  }, [initial.q]);

  // Debounce the search box
  useEffect(() => {
    const current = searchParams.get('q') ?? '';
    if (q === current) return;
    const id = setTimeout(() => {
      pushParams({ q: q.trim() || null });
    }, 250);
    return () => clearTimeout(id);
  }, [q, pushParams, searchParams]);

  // Click outside date picker
  useEffect(() => {
    if (!datePickerOpen) return;
    const handler = (e: MouseEvent) => {
      if (!datePickerRef.current?.contains(e.target as Node)) {
        setDatePickerOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [datePickerOpen]);

  const toggleCategory = (cat: EventCategory) => {
    const next = new Set(initial.category);
    if (next.has(cat)) next.delete(cat);
    else next.add(cat);
    const arr = EVENT_CATEGORIES.filter((c) => next.has(c));
    pushParams({ category: arr.length > 0 ? arr.join(',') : null });
  };

  const handleCityChange = (value: string) => {
    pushParams({ city: value || null });
  };

  const handleRangeSelect = (range: DateRange | undefined) => {
    pushParams({
      from: range?.from ? range.from.toISOString().slice(0, 10) : null,
      to: range?.to ? range.to.toISOString().slice(0, 10) : null,
    });
  };

  const hasActiveFilters =
    !!initial.q ||
    !!initial.city ||
    initial.category.length > 0 ||
    !!initial.from ||
    !!initial.to;

  const clearAll = () => {
    setQ('');
    router.replace('/events', { scroll: false });
  };

  const selectedRange: DateRange | undefined =
    initial.from || initial.to
      ? { from: initial.from, to: initial.to }
      : undefined;

  const dateActive = !!(initial.from || initial.to);

  return (
    <section
      aria-label="Event filters"
      className="flex w-full max-w-6xl flex-col gap-5 px-5"
    >
      {/* Row 1: text / city / date */}
      <div className="flex w-full flex-col gap-3 sm:flex-row">
        <input
          type="text"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search events, venues, artists…"
          aria-label="Search events"
          spellCheck={false}
          className={cn(FIELD, 'flex-1')}
        />
        <select
          value={initial.city ?? ''}
          onChange={(e) => handleCityChange(e.target.value)}
          aria-label="Filter by city"
          className={cn(FIELD, 'sm:w-52', 'cursor-pointer')}
        >
          <option value="" className="bg-[#0B0B0D]">
            All cities
          </option>
          {cities.map((c) => (
            <option key={c} value={citySlug(c)} className="bg-[#0B0B0D]">
              {c}
            </option>
          ))}
        </select>
        <div className="relative" ref={datePickerRef}>
          <button
            type="button"
            onClick={() => setDatePickerOpen((v) => !v)}
            aria-expanded={datePickerOpen}
            aria-label="Filter by date range"
            className={cn(
              FIELD,
              'w-full cursor-pointer text-left sm:w-60',
              dateActive && 'text-ember border-ember/40 bg-ember/[0.06]'
            )}
          >
            {formatDateLabel(initial.from, initial.to)}
          </button>
          {datePickerOpen && (
            <div className="absolute right-0 z-30 mt-2 rounded-2xl border border-white/10 bg-[#0F0F12] p-3 shadow-2xl shadow-black/50">
              <DayPicker
                mode="range"
                selected={selectedRange}
                onSelect={handleRangeSelect}
                numberOfMonths={1}
                className="rdp-dark"
              />
              {(initial.from || initial.to) && (
                <button
                  type="button"
                  onClick={() => handleRangeSelect(undefined)}
                  className="mt-2 w-full rounded-md py-2 text-sm text-ink/60 transition hover:bg-white/[0.04] hover:text-ink"
                >
                  Clear dates
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Row 2: category pills */}
      <div className="flex flex-wrap gap-2">
        {EVENT_CATEGORIES.map((cat) => {
          const active = initial.category.includes(cat);
          return (
            <button
              key={cat}
              type="button"
              onClick={() => toggleCategory(cat)}
              aria-pressed={active}
              className={cn(
                'rounded-full px-3.5 py-1.5 text-[12px] uppercase tracking-[0.14em] transition',
                active
                  ? 'bg-ember text-[#0B0B0D] font-semibold shadow-[0_8px_30px_-12px_rgba(234,139,74,0.6)]'
                  : 'border border-white/10 bg-white/[0.02] text-ink/70 hover:border-ember/40 hover:text-ink'
              )}
            >
              {CATEGORY_LABELS[cat]}
            </button>
          );
        })}
      </div>

      {hasActiveFilters && (
        <button
          type="button"
          onClick={clearAll}
          className="self-start text-[12px] uppercase tracking-[0.16em] text-ink/55 transition hover:text-ember"
        >
          Clear all filters
        </button>
      )}
    </section>
  );
}
