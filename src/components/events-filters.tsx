'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { DayPicker, type DateRange } from 'react-day-picker';
import 'react-day-picker/style.css';
import { EventCategory } from '@prisma/client';
import { EVENT_CATEGORIES } from '@/lib/validations';
import { capitalizeFirstLetter, cn } from '@/lib/utils';

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

  return (
    <section
      aria-label="Event filters"
      className="w-full max-w-[1100px] flex flex-col gap-4 px-5"
    >
      <div className="flex flex-col sm:flex-row gap-3 w-full">
        <input
          type="text"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search events…"
          aria-label="Search events by name"
          className="flex-1 h-12 rounded-md bg-white/[7%] px-4 outline-none ring-accent/50 transition focus:ring-2 focus:bg-white/10"
        />
        <select
          value={initial.city ?? ''}
          onChange={(e) => handleCityChange(e.target.value)}
          aria-label="Filter by city"
          className="h-12 rounded-md bg-white/[7%] px-3 outline-none ring-accent/50 transition focus:ring-2 focus:bg-white/10 text-white sm:w-48"
        >
          <option value="" className="bg-gray-900">
            All cities
          </option>
          {cities.map((c) => (
            <option key={c} value={c.toLowerCase()} className="bg-gray-900">
              {capitalizeFirstLetter(c)}
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
              'h-12 rounded-md bg-white/[7%] px-4 outline-none ring-accent/50 transition hover:bg-white/10 focus:ring-2 text-sm sm:w-56 w-full text-left',
              (initial.from || initial.to) && 'text-accent'
            )}
          >
            {formatDateLabel(initial.from, initial.to)}
          </button>
          {datePickerOpen && (
            <div className="absolute z-30 mt-2 right-0 rounded-lg border border-white/10 bg-gray-900 p-3 shadow-2xl">
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
                  className="mt-2 w-full text-sm text-white/60 hover:text-white transition"
                >
                  Clear dates
                </button>
              )}
            </div>
          )}
        </div>
      </div>

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
                'px-3 py-1.5 rounded-full text-sm font-medium transition',
                active
                  ? 'bg-accent text-gray-900'
                  : 'bg-white/10 text-white hover:bg-white/20'
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
          className="self-start text-sm text-white/60 hover:text-white transition"
        >
          Clear all filters
        </button>
      )}
    </section>
  );
}
