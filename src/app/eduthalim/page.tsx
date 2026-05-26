import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Eduthalim Degree",
  description: "Complete your 10th, 12th, or Degree with Eduthalim programs at IODE.",
};

export default function EduthalimPage() {
  return (
    <div>
      {/* Hero */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="bg-gradient-to-br from-[#E8F2FF] to-[#DCEEFF] rounded-3xl p-10 md:p-14 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#007AFF]/5 rounded-full -translate-y-1/2 translate-x-1/4 blur-2xl"></div>
            <div className="relative z-10 max-w-3xl">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-sm font-medium text-[#007AFF] mb-6 border border-[#E5E5EA]">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                Academic Programs
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-[#1D1D1F] leading-tight">Eduthalim Degree & Schooling</h1>
              <p className="text-lg md:text-xl text-[#6E6E73] mb-8 leading-relaxed max-w-2xl">
                Bridging the gap in your education. Whether you need to complete your 10th, 12th, or pursue a Degree, Eduthalim offers comprehensive support to help you achieve your academic goals.
              </p>
              <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#007AFF] text-white font-bold text-base hover:bg-[#0066D6] transition-colors shadow-lg shadow-[#007AFF]/20 btn-press">
                Apply Now
                <svg className="w-5 h-5 cta-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
