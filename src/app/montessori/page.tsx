import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Montessori Counseling",
  description: "Build a rewarding career in child development with our Montessori Counseling programs.",
};

export default function MontessoriPage() {
  return (
    <div>
      {/* Hero */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="bg-gradient-to-br from-[#E8FAF0] to-[#D4F5E2] rounded-3xl p-10 md:p-14 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#34C759]/5 rounded-full -translate-y-1/2 translate-x-1/4 blur-2xl"></div>
            <div className="relative z-10 max-w-3xl">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-sm font-medium text-[#34C759] mb-6 border border-[#E5E5EA]">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                Early Education
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-[#1D1D1F] leading-tight">Montessori Counseling & Training</h1>
              <p className="text-lg md:text-xl text-[#6E6E73] mb-8 leading-relaxed max-w-2xl">
                Shape the future by nurturing young minds. Our comprehensive Montessori training and counseling programs prepare you for a fulfilling career in early childhood education.
              </p>
              <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#34C759] text-white font-bold text-base hover:bg-[#2DB84E] transition-colors shadow-lg shadow-[#34C759]/20 btn-press">
                Join the Program
                <svg className="w-5 h-5 cta-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
