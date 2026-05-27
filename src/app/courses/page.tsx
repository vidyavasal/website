import { Metadata } from "next";
import { CoursesDashboard } from "@/components/CoursesDashboard";
import { getCourses, getAdminStats } from "@/lib/db/queries";
import Link from "next/link";

export const revalidate = 3600; // ISR: rebuild every hour

export const metadata: Metadata = {
  title: "Browse Courses & Universities | IODE",
  description:
    "Search 100+ courses across UGC-recognized universities. Filter by degree type, delivery mode, and fee range to find your perfect online or distance program.",
  openGraph: {
    title: "Browse Courses & Universities | IODE",
    description:
      "Find the right online or distance course from India's top universities — filter by type, mode, and fee.",
    type: "website",
  },
};

export default async function CoursesPage() {
  const [courses, stats] = await Promise.all([getCourses(), getAdminStats()]);

  const coursesJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "University Courses at IODE",
    description:
      "Browse distance and online courses from top Indian universities",
    numberOfItems: courses.length,
    itemListElement: courses.slice(0, 20).map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: `${c.name}${c.universityName ? ` - ${c.universityName}` : ""}`,
      url:
        c.universitySlug && c.slug
          ? `https://iode.in/universities/${c.universitySlug}/${c.slug}`
          : undefined,
    })),
  };

  return (
    <div>
      {/* ── Header ── */}
      <section className="hero-mesh-bg pt-10 pb-8 md:pt-16 md:pb-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <span className="section-label-purple mb-4 inline-flex">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                Course Explorer
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1D1D1F] mt-2 leading-tight">
                Find Your{" "}
                <span className="gradient-text-purple">Perfect Course</span>
              </h1>
              <p className="text-[#6E6E73] mt-3 text-base max-w-xl">
                {stats.courses}+ programs from {stats.universities}+
                UGC-recognized universities. Filter by type, mode, and fee to
                find what fits you.
              </p>
            </div>
            <div className="flex gap-4 shrink-0">
              <div className="text-center px-5 py-3 bg-white rounded-2xl border border-[#E5E5EA] shadow-sm">
                <p className="text-2xl font-extrabold text-[#7B61FF]">
                  {stats.courses}+
                </p>
                <p className="text-xs text-[#6E6E73] mt-0.5">Courses</p>
              </div>
              <div className="text-center px-5 py-3 bg-white rounded-2xl border border-[#E5E5EA] shadow-sm">
                <p className="text-2xl font-extrabold text-[#007AFF]">
                  {stats.universities}+
                </p>
                <p className="text-xs text-[#6E6E73] mt-0.5">Universities</p>
              </div>
              <div className="text-center px-5 py-3 bg-white rounded-2xl border border-[#E5E5EA] shadow-sm">
                <p className="text-2xl font-extrabold text-[#34C759]">UGC</p>
                <p className="text-xs text-[#6E6E73] mt-0.5">Approved</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Dashboard ── */}
      <CoursesDashboard courses={courses} />

      {/* ── CTA ── */}
      <section className="py-12 md:py-16 bg-white border-t border-[#E5E5EA]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-[#1D1D1F] mb-3">
            Can&apos;t find what you&apos;re looking for?
          </h2>
          <p className="text-[#6E6E73] mb-6">
            Talk to our counselors — we&apos;ll match you with the perfect
            program from our full catalog.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/contact"
              className="px-7 py-3.5 rounded-full btn-gradient text-white font-semibold btn-press flex items-center justify-center gap-2"
            >
              Get Personalized Advice
              <svg
                className="w-4 h-4 cta-arrow"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
            <a
              href="https://wa.me/910000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5 rounded-full bg-[#F5F5F7] text-[#1D1D1F] font-semibold hover:bg-[#E8F2FF] hover:text-[#007AFF] transition-colors flex items-center justify-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(coursesJsonLd) }}
      />
    </div>
  );
}
