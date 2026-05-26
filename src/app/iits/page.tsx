import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "IITS Distance Education",
  description: "Flexible distance education programs for career advancement with IODE.",
};

export default function IITSPage() {
  return (
    <div>
      {/* Hero */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="bg-gradient-to-br from-[#007AFF] to-[#0055CC] rounded-3xl p-10 md:p-14 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4 blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/3 -translate-x-1/4 blur-2xl"></div>
            <div className="relative z-10 max-w-3xl">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-sm font-medium text-blue-100 mb-6 backdrop-blur-sm border border-white/10">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                Distance Education
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">IITS Distance Education</h1>
              <p className="text-lg md:text-xl text-blue-100 mb-8 leading-relaxed max-w-2xl">
                Advance your career without putting your life on hold. Our UGC-recognized distance learning programs offer the flexibility you need to balance work, life, and education.
              </p>
              <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-[#007AFF] font-bold text-base hover:bg-blue-50 transition-colors shadow-lg btn-press">
                Apply for IITS Programs
                <svg className="w-5 h-5 cta-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <span className="section-label mb-4 inline-flex">Why Choose IITS</span>
              <h2 className="text-3xl font-bold text-[#1D1D1F] mb-8 mt-3">Benefits of learning with us</h2>
              <ul className="space-y-5">
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#E8FAF0] text-[#34C759] flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <span className="text-[#1D1D1F] text-base">UGC and DEB Approved Universities</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#E8FAF0] text-[#34C759] flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <span className="text-[#1D1D1F] text-base">Flexible Study Materials & Online Classes</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#E8FAF0] text-[#34C759] flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <span className="text-[#1D1D1F] text-base">Dedicated Student Support & Placement Assistance</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
