import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn more about Institute of Distance Education (IODE) and our mission to empower students through quality distance education.",
};

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-[#F0F7FF] to-white pt-12 pb-16 md:pt-20 md:pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
          <span className="section-label mb-5 inline-flex">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            About IODE
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-[#1D1D1F] mt-3 mb-6 leading-tight">
            Empowering futures through<br className="hidden md:block" />
            <span className="gradient-text">quality education</span>
          </h1>
          <p className="text-lg text-[#6E6E73] max-w-2xl mx-auto leading-relaxed">
            Institute of Distance Education (IODE) is a premier educational institution dedicated to providing high-quality distance education to students and working professionals across Kerala and India.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="bg-[#F5F5F7] rounded-2xl p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-extrabold text-[#007AFF] tracking-tight">175+</div>
                <p className="text-[#6E6E73] text-sm mt-1">Instructors</p>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-extrabold text-[#007AFF] tracking-tight">5K+</div>
                <p className="text-[#6E6E73] text-sm mt-1">Students</p>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-extrabold text-[#007AFF] tracking-tight">280+</div>
                <p className="text-[#6E6E73] text-sm mt-1">Courses</p>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-extrabold text-[#007AFF] tracking-tight">8y+</div>
                <p className="text-[#6E6E73] text-sm mt-1">Experience</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-8 border border-[#E5E5EA] card-hover">
              <div className="w-12 h-12 bg-[#E8F2FF] text-[#007AFF] rounded-xl flex items-center justify-center mb-5">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              </div>
              <h2 className="text-2xl font-bold text-[#1D1D1F] mb-4">Our Mission</h2>
              <p className="text-[#6E6E73] leading-relaxed">
                To empower individuals by providing affordable, accessible, and high-quality education that fosters personal and professional growth. We believe that education should be accessible, flexible, and career-oriented.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-[#E5E5EA] card-hover">
              <div className="w-12 h-12 bg-[#FFF3E0] text-[#FF9500] rounded-xl flex items-center justify-center mb-5">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
              </div>
              <h2 className="text-2xl font-bold text-[#1D1D1F] mb-4">Our Vision</h2>
              <p className="text-[#6E6E73] leading-relaxed">
                To be the leading provider of distance education in India, recognized for academic excellence, innovation, and student success. Our programs bridge the gap between academic knowledge and industry requirements.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
