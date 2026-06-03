'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// ── Types ─────────────────────────────────────────────────────────────────────
export interface CourseSummary {
  id: string;
  name: string;
  shortName: string | null;
  slug: string | null;
  courseType: string | null;
  deliveryMode: string | null;
  durationYears: string | null;
  bannerImage: string | null;
  description: string | null;
  isOnline: boolean | null;
  isDistance: boolean | null;
  universityId: string | null;
  universityName: string | null;
  universitySlug: string | null;
  categoryName: string | null;
  totalFee: string | null;
}

// ── Helpers ───────────────────────────────────────────────────────────────────
const CATEGORY_COLORS: Record<string, string> = {
  UG: 'bg-[#E8F2FF] text-[#007AFF]',
  PG: 'bg-[#F0EBFF] text-[#7B61FF]',
  Diploma: 'bg-[#E8FAF0] text-[#34C759]',
  Certificate: 'bg-[#FFF3E0] text-[#FF9500]',
};

const MODE_COLORS: Record<string, string> = {
  Online: 'bg-[#FFF3E0] text-[#FF9500]',
  ODL: 'bg-[#F5F5F7] text-[#6E6E73]',
  Distance: 'bg-[#F5F5F7] text-[#6E6E73]',
};

const UNI_GRADIENT = [
  'from-[#7B61FF] to-[#007AFF]',
  'from-[#007AFF] to-[#5AC8FA]',
  'from-[#FF9500] to-[#FF6B00]',
  'from-[#34C759] to-[#00A844]',
  'from-[#FF3B30] to-[#FF6B00]',
  'from-[#5AC8FA] to-[#007AFF]',
  'from-[#AF52DE] to-[#7B61FF]',
  'from-[#FF2D55] to-[#FF6B00]',
];

function uniGradient(name: string | null): string {
  if (!name) return UNI_GRADIENT[0];
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) & 0xffffffff;
  return UNI_GRADIENT[Math.abs(h) % UNI_GRADIENT.length];
}

function formatFee(fee: string | null): string {
  if (!fee) return '—';
  const n = parseFloat(fee);
  if (isNaN(n)) return '—';
  return `₹${n.toLocaleString('en-IN')}`;
}

function feeNum(fee: string | null): number {
  if (!fee) return 0;
  return parseFloat(fee) || 0;
}

function formatDuration(years: string | null): string {
  if (!years) return '—';
  const n = parseFloat(years);
  if (isNaN(n)) return years;
  return n === 1 ? '1 Year' : `${n} Years`;
}

// ── Component ─────────────────────────────────────────────────────────────────
interface Props {
  courses: CourseSummary[];
  initialQuery?: string;
}

export function CoursesDashboard({ courses, initialQuery = '' }: Props) {
  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedMode, setSelectedMode] = useState('All');
  const [sortBy, setSortBy] = useState('default');

  // Derive available filter options from data
  const categories = useMemo(() => {
    const seen = new Set<string>();
    courses.forEach((c) => { if (c.courseType) seen.add(c.courseType); });
    const order = ['UG', 'PG', 'Diploma', 'Certificate'];
    const sorted = order.filter((x) => seen.has(x));
    // Add any unlisted ones
    seen.forEach((x) => { if (!order.includes(x)) sorted.push(x); });
    return ['All', ...sorted];
  }, [courses]);

  const modes = useMemo(() => {
    const seen = new Set<string>();
    courses.forEach((c) => { if (c.deliveryMode) seen.add(c.deliveryMode); });
    return ['All', ...Array.from(seen).sort()];
  }, [courses]);

  const filtered = useMemo(() => {
    let list = courses.filter((c) => {
      const q = query.toLowerCase();
      const matchesQuery =
        !query ||
        c.name.toLowerCase().includes(q) ||
        (c.universityName ?? '').toLowerCase().includes(q) ||
        (c.categoryName ?? '').toLowerCase().includes(q) ||
        (c.description ?? '').toLowerCase().includes(q);
      const matchesCategory = selectedCategory === 'All' || c.courseType === selectedCategory;
      const matchesMode = selectedMode === 'All' || c.deliveryMode === selectedMode;
      return matchesQuery && matchesCategory && matchesMode;
    });

    if (sortBy === 'fee-asc') {
      list = [...list].sort((a, b) => feeNum(a.totalFee) - feeNum(b.totalFee));
    } else if (sortBy === 'fee-desc') {
      list = [...list].sort((a, b) => feeNum(b.totalFee) - feeNum(a.totalFee));
    } else if (sortBy === 'name-asc') {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    }

    return list;
  }, [query, selectedCategory, selectedMode, sortBy, courses]);

  return (
    <div>
      {/* ── Search + Filters ── */}
      <div className="bg-white border-b border-[#E5E5EA] py-5 sticky top-[72px] z-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
            {/* Search */}
            <div className="relative flex-1 min-w-[200px]">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#AEAEB2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search course, university, or program..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E5E5EA] bg-white text-[#1D1D1F] text-sm placeholder:text-[#AEAEB2] focus:outline-none focus:ring-2 focus:ring-[#7B61FF]/30 focus:border-[#7B61FF]"
              />
            </div>

            {/* Category Filter */}
            <div className="flex gap-1.5 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    selectedCategory === cat
                      ? 'btn-gradient text-white shadow-sm'
                      : 'bg-[#F5F5F7] text-[#6E6E73] hover:bg-[#E8F2FF] hover:text-[#007AFF]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Mode Filter */}
            <div className="flex gap-1.5 flex-wrap">
              {modes.map((mode) => (
                <button
                  key={mode}
                  onClick={() => setSelectedMode(mode)}
                  className={`px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    selectedMode === mode
                      ? 'bg-[#1D1D1F] text-white'
                      : 'bg-[#F5F5F7] text-[#6E6E73] hover:bg-[#E8F2FF] hover:text-[#007AFF]'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2.5 rounded-xl border border-[#E5E5EA] text-sm text-[#6E6E73] bg-white focus:outline-none focus:ring-2 focus:ring-[#7B61FF]/30"
            >
              <option value="default">Sort: Default</option>
              <option value="name-asc">Name: A → Z</option>
              <option value="fee-asc">Fee: Low to High</option>
              <option value="fee-desc">Fee: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* ── Results ── */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-8">
        <div className="flex items-center justify-between mb-6">
          <p className="text-[#6E6E73] text-sm">
            Showing <span className="font-semibold text-[#1D1D1F]">{filtered.length}</span> of{' '}
            <span className="font-semibold text-[#1D1D1F]">{courses.length}</span> programs
          </p>
          {(query || selectedCategory !== 'All' || selectedMode !== 'All') && (
            <button
              onClick={() => { setQuery(''); setSelectedCategory('All'); setSelectedMode('All'); }}
              className="text-[#007AFF] text-sm font-medium hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-2xl bg-[#F5F5F7] flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-[#AEAEB2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-[#1D1D1F] font-semibold text-lg mb-2">No programs found</p>
            <p className="text-[#6E6E73]">Try different keywords or clear the filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((course) => {
              const href =
                course.universitySlug && course.slug
                  ? `/universities/${course.universitySlug}/${course.slug}`
                  : '#';

              return (
                <Link href={href} key={course.id} className="block group">
                  <div className="bg-white rounded-2xl border border-[#E5E5EA] card-hover h-full flex flex-col relative overflow-hidden">
                    {/* Top gradient line on hover */}
                    <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#7B61FF] to-[#007AFF] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 z-10" />

                    {/* Image / Placeholder */}
                    <div className="relative w-full h-40 overflow-hidden rounded-t-2xl bg-[#F5F5F7] shrink-0">
                      {course.bannerImage ? (
                        <Image
                          src={course.bannerImage}
                          alt={course.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      ) : (
                        <div className={`w-full h-full bg-gradient-to-br ${uniGradient(course.universityName)} flex items-center justify-center`}>
                          <span className="text-white font-bold text-3xl opacity-80">
                            {course.universityName?.split(' ').map((w) => w[0]).slice(0, 2).join('') ?? '??'}
                          </span>
                        </div>
                      )}
                      {/* Delivery mode badge */}
                      {course.deliveryMode && (
                        <span className={`absolute top-3 right-3 inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${MODE_COLORS[course.deliveryMode] ?? 'bg-white/80 text-[#6E6E73]'}`}>
                          {course.deliveryMode}
                        </span>
                      )}
                    </div>

                    {/* Body */}
                    <div className="p-5 flex flex-col flex-1">
                      {/* Category badge */}
                      <div className="flex items-center justify-between mb-3">
                        {course.courseType && (
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${CATEGORY_COLORS[course.courseType] ?? 'bg-[#F5F5F7] text-[#6E6E73]'}`}>
                            {course.courseType}
                          </span>
                        )}
                        {course.categoryName && (
                          <span className="text-xs text-[#AEAEB2] font-medium">{course.categoryName}</span>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="text-base font-bold text-[#1D1D1F] mb-1 group-hover:text-[#7B61FF] transition-colors leading-tight line-clamp-2">
                        {course.name}
                      </h3>
                      <p className="text-[#6E6E73] text-sm mb-3">{course.universityName ?? '—'}</p>

                      {/* Description */}
                      {course.description && (
                        <p className="text-xs text-[#AEAEB2] mb-3 line-clamp-2">{course.description}</p>
                      )}

                      {/* Duration */}
                      <div className="flex flex-wrap gap-2 mb-4 mt-auto">
                        {course.durationYears && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#F5F5F7] rounded-lg text-xs text-[#6E6E73]">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {formatDuration(course.durationYears)}
                          </span>
                        )}
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-4 border-t border-[#F5F5F7]">
                        <div>
                          <span className="text-xs text-[#AEAEB2]">Total Fee</span>
                          <p className="text-base font-bold text-[#1D1D1F]">{formatFee(course.totalFee)}</p>
                        </div>
                        <span className="text-[#7B61FF] font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                          View Details
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
