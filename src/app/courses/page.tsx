import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "All Courses",
  description: "Browse all distance education, degree, and diploma courses offered by IODE.",
};

export default function CoursesPage() {
  const courses = [
    { id: "ba-english", title: "BA English", category: "Degree", href: "/courses/ba-english" },
    { id: "bcom", title: "B.Com", category: "Degree", href: "/courses/bcom" },
    { id: "bba", title: "BBA", category: "Degree", href: "/courses/bba" },
    { id: "mba", title: "MBA", category: "Post Graduate", href: "/courses/mba" },
    { id: "montessori-ttc", title: "Montessori TTC", category: "Diploma", href: "/courses/montessori-ttc" },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-[#F0F7FF] to-white pt-12 pb-8 md:pt-20 md:pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl text-center">
          <span className="section-label mb-5 inline-flex">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
            Browse Programs
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-[#1D1D1F] mt-3 mb-4 leading-tight">All Programs & Courses</h1>
          <p className="text-lg text-[#6E6E73]">Explore our comprehensive range of educational programs.</p>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {courses.map((course) => (
              <Link href={course.href} key={course.id} className="block group">
                <div className="bg-white rounded-2xl p-7 border border-[#E5E5EA] card-hover h-full">
                  <span className="inline-block px-3 py-1 bg-[#E8F2FF] text-[#007AFF] text-xs font-semibold rounded-full mb-4 uppercase tracking-wide">
                    {course.category}
                  </span>
                  <h3 className="text-xl font-bold text-[#1D1D1F] mb-2 group-hover:text-[#007AFF] transition-colors">{course.title}</h3>
                  <p className="text-[#6E6E73] mb-5 text-sm leading-relaxed line-clamp-2">Click to learn more about syllabus, eligibility, and career prospects for this program.</p>
                  <div className="text-[#007AFF] font-semibold text-sm flex items-center gap-2">
                    View Details <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
