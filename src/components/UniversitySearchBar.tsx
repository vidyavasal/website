'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function UniversitySearchBar() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    router.push(`/courses?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSearch} className="flex gap-2">
      <div className="relative flex-1">
        <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#AEAEB2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by course, university, or program..."
          className="w-full pl-12 pr-4 py-4 rounded-2xl border border-[#E5E5EA] bg-white text-[#1D1D1F] text-base placeholder:text-[#AEAEB2] shadow-sm focus:border-[#7B61FF] transition-all"
        />
      </div>
      <button
        type="submit"
        className="px-6 py-4 rounded-2xl btn-gradient text-white font-semibold text-sm btn-press whitespace-nowrap shrink-0"
      >
        Search
      </button>
    </form>
  );
}
