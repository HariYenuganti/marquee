'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { EVENT_CATEGORIES } from '@/lib/validations';

export default function SearchForm() {
  const [searchText, setSearchText] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = searchText.trim();

    // If the query is an exact category name (e.g. "music"), route straight
    // to the category-filtered view so the corresponding pill lights up and
    // the URL reads naturally (`?category=MUSIC` vs `?q=music`). Anything
    // else becomes a free-text search as before.
    const upper = trimmed.toUpperCase();
    const categoryMatch = (EVENT_CATEGORIES as readonly string[]).includes(upper);

    if (!trimmed) {
      router.push('/events');
    } else if (categoryMatch) {
      router.push(`/events?category=${upper}`);
    } else {
      router.push(`/events?q=${encodeURIComponent(trimmed)}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full sm:w-[620px] flex gap-3"
      role="search"
    >
      <input
        className="flex-1 h-14 sm:h-16 rounded-xl bg-white/[0.04] border border-white/10 px-5 sm:px-6 text-ink placeholder:text-ink/40 outline-none transition focus:bg-white/[0.07] focus:border-ember/60 focus:ring-2 focus:ring-ember/30"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Search events, venues, artists…"
        aria-label="Search events"
        spellCheck={false}
      />
      <button
        type="submit"
        className="h-14 sm:h-16 px-6 sm:px-8 rounded-xl bg-ember text-base font-semibold text-[#0B0B0D] tracking-[0.08em] uppercase text-xs transition hover:brightness-110 active:brightness-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-2 focus-visible:ring-offset-base"
      >
        Search
      </button>
    </form>
  );
}
