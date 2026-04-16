'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SearchForm() {
  const [searchText, setSearchText] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = searchText.trim();
    router.push(trimmed ? `/events?q=${encodeURIComponent(trimmed)}` : '/events');
  };

  const handleSearchTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full sm:w-[580px]" role="search">
      <input
        className="w-full h-16 rounded-lg bg-white/[7%] px-6 outline-none ring-accent/50 transition focus:ring-2 focus:bg-white/10"
        value={searchText}
        onChange={handleSearchTextChange}
        placeholder="Search events…"
        aria-label="Search events by name"
        spellCheck={false}
      />
    </form>
  );
}
