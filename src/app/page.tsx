import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white pt-12 md:pt-20 lg:pt-28 pb-16 md:pb-24">
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#007AFF]/5 rounded-full -translate-y-1/2 translate-x-1/4 blur-3xl animate-pulse-soft"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#5AC8FA]/5 rounded-full translate-y-1/3 -translate-x-1/4 blur-3xl animate-pulse-soft delay-200"></div>

        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            {/* Rating Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F5F5F7] border border-[#E5E5EA] mb-8 animate-fade-in-up">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-[#FF9500]" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                ))}
              </div>
              <span className="text-sm font-semibold text-[#1D1D1F]">4.9</span>
              <span className="text-sm text-[#6E6E73]">(2K+ reviews)</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-[4.25rem] font-extrabold tracking-tight mb-6 text-[#1D1D1F] leading-[1.1] animate-fade-in-up delay-100">
              Gain the skills to unlock{" "}
              <br className="hidden md:block" />
              <span className="gradient-text">your true potential</span>
            </h1>
            <p className="mt-4 text-lg md:text-xl text-[#6E6E73] max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up delay-200">
              Empowering students and professionals in Kerala and across India with quality IITS Distance Education, Eduthalim Degrees, and Montessori Counseling.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center animate-fade-in-up delay-300">
              <Link href="/courses" className="px-8 py-4 rounded-full bg-[#007AFF] text-white font-semibold text-base hover:bg-[#0066D6] transition-all shadow-lg shadow-[#007AFF]/20 hover:shadow-xl hover:shadow-[#007AFF]/30 w-full sm:w-auto flex items-center justify-center gap-2 btn-press">
                Explore All Courses
                <svg className="w-5 h-5 cta-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
              </Link>
              <Link href="/contact" className="px-8 py-4 rounded-full bg-white text-[#1D1D1F] font-semibold text-base border border-[#E5E5EA] hover:bg-[#F5F5F7] hover:border-[#D1D1D6] transition-all shadow-sm w-full sm:w-auto flex items-center justify-center gap-2">
                Talk to an Expert
              </Link>
            </div>

            {/* Trust badges */}
            <div className="mt-14 pt-8 border-t border-[#E5E5EA] flex flex-wrap justify-center gap-6 md:gap-12 text-[#6E6E73] font-medium text-sm">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#34C759]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <span>UGC Recognized</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#34C759]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                <span>Expert Faculty</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#34C759]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                <span>Career Counseling</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-6 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#F5F5F7] rounded-2xl p-8 md:p-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
              <div className="text-center">
                <div className="stat-number text-[#007AFF]">120+</div>
                <p className="text-[#6E6E73] text-sm font-medium mt-2">Courses Available</p>
              </div>
              <div className="text-center">
                <div className="stat-number text-[#007AFF]">5K+</div>
                <p className="text-[#6E6E73] text-sm font-medium mt-2">Happy Students</p>
              </div>
              <div className="text-center">
                <div className="stat-number text-[#007AFF]">50+</div>
                <p className="text-[#6E6E73] text-sm font-medium mt-2">Expert Tutors</p>
              </div>
              <div className="text-center">
                <div className="stat-number text-[#007AFF]">99%</div>
                <p className="text-[#6E6E73] text-sm font-medium mt-2">Student Success</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14 gap-4">
            <div>
              <span className="section-label mb-4 inline-flex">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                Benefits & Programs
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1D1D1F] mt-3 leading-tight">Our Core Programs</h2>
              <p className="text-[#6E6E73] max-w-lg text-base mt-3">Choose from our diverse range of distance education programs designed for your success.</p>
            </div>
            <Link href="/courses" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#007AFF] text-white font-semibold text-sm hover:bg-[#0066D6] transition-all shadow-md shadow-[#007AFF]/20 btn-press shrink-0 self-start md:self-auto">
              More About Us
              <svg className="w-4 h-4 cta-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Service 1 */}
            <div className="bg-white rounded-2xl p-7 border border-[#E5E5EA] group card-hover relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#007AFF] to-[#5AC8FA] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              <div className="w-12 h-12 bg-[#E8F2FF] text-[#007AFF] rounded-xl flex items-center justify-center mb-5">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-[#1D1D1F] mb-2">IITS Distance Education</h3>
              <p className="text-[#6E6E73] mb-5 leading-relaxed text-sm">Flexible degree and diploma programs tailored for working professionals and students seeking career advancement.</p>
              <Link href="/iits" className="text-[#007AFF] font-semibold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                Learn More <svg className="w-4 h-4 cta-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
              </Link>
            </div>

            {/* Service 2 */}
            <div className="bg-white rounded-2xl p-7 border border-[#E5E5EA] group card-hover relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#007AFF] to-[#34C759] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              <div className="w-12 h-12 bg-[#FFF3E0] text-[#FF9500] rounded-xl flex items-center justify-center mb-5">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-[#1D1D1F] mb-2">Eduthalim Degree</h3>
              <p className="text-[#6E6E73] mb-5 leading-relaxed text-sm">Comprehensive 10th, 12th, and Degree programs to bridge educational gaps and unlock new opportunities.</p>
              <Link href="/eduthalim" className="text-[#007AFF] font-semibold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                Learn More <svg className="w-4 h-4 cta-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
              </Link>
            </div>

            {/* Service 3 */}
            <div className="bg-white rounded-2xl p-7 border border-[#E5E5EA] group card-hover relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#34C759] to-[#5AC8FA] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              <div className="w-12 h-12 bg-[#E8FAF0] text-[#34C759] rounded-xl flex items-center justify-center mb-5">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-[#1D1D1F] mb-2">Montessori Counseling</h3>
              <p className="text-[#6E6E73] mb-5 leading-relaxed text-sm">Expert guidance and training for aspiring Montessori educators to build a rewarding career in child development.</p>
              <Link href="/montessori" className="text-[#007AFF] font-semibold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                Learn More <svg className="w-4 h-4 cta-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Steps Section */}
      <section className="py-20 md:py-28 bg-[#F5F5F7]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-14 gap-6">
            <div>
              <span className="section-label mb-4 inline-flex">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                Your Learning Path
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1D1D1F] mt-3 leading-tight">Simple steps to learn</h2>
            </div>
            <p className="text-[#6E6E73] max-w-md text-base md:mt-10">
              Our platform offers a wide range of courses and resources designed to help you acquire new competency.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Step 1 */}
            <div className="bg-white rounded-2xl p-7 border border-[#E5E5EA] card-hover">
              <div className="flex items-center justify-between mb-6">
                <div className="w-11 h-11 bg-[#E8F2FF] text-[#007AFF] rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                </div>
                <span className="step-badge">Step 01</span>
              </div>
              <h3 className="text-lg font-bold text-[#007AFF] mb-2">Create Account</h3>
              <p className="text-[#6E6E73] text-sm leading-relaxed">Sign up quickly to access all learning features.</p>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-2xl p-7 border border-[#E5E5EA] card-hover">
              <div className="flex items-center justify-between mb-6">
                <div className="w-11 h-11 bg-[#E8F2FF] text-[#007AFF] rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                </div>
                <span className="step-badge">Step 02</span>
              </div>
              <h3 className="text-lg font-bold text-[#007AFF] mb-2">Select Course</h3>
              <p className="text-[#6E6E73] text-sm leading-relaxed">Browse categories and select a course that fits your interest.</p>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-2xl p-7 border border-[#E5E5EA] card-hover">
              <div className="flex items-center justify-between mb-6">
                <div className="w-11 h-11 bg-[#E8F2FF] text-[#007AFF] rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
                </div>
                <span className="step-badge">Step 03</span>
              </div>
              <h3 className="text-lg font-bold text-[#007AFF] mb-2">Learn Easily</h3>
              <p className="text-[#6E6E73] text-sm leading-relaxed">Watch videos, join lessons, and track your progress.</p>
            </div>

            {/* Step 4 */}
            <div className="bg-white rounded-2xl p-7 border border-[#E5E5EA] card-hover">
              <div className="flex items-center justify-between mb-6">
                <div className="w-11 h-11 bg-[#E8F2FF] text-[#007AFF] rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path></svg>
                </div>
                <span className="step-badge">Step 04</span>
              </div>
              <h3 className="text-lg font-bold text-[#007AFF] mb-2">Earn Certificate</h3>
              <p className="text-[#6E6E73] text-sm leading-relaxed">Finish the course and download your certificate.</p>
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link href="/courses" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#007AFF] text-white font-semibold text-base hover:bg-[#0066D6] transition-all shadow-lg shadow-[#007AFF]/20 hover:shadow-xl btn-press">
              Get Started Today
              <svg className="w-5 h-5 cta-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="section-label mb-4 inline-flex">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>
              Why Choose Us
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1D1D1F] mt-3">
              Explore a wide range of<br className="hidden md:block" /> courses all in one place.
            </h2>
            <p className="text-[#6E6E73] max-w-2xl mx-auto text-base mt-4">
              Embrace a realm of possibilities and take charge of your destiny by honing new skills that help you fulfill your ambitions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-[#F5F5F7] rounded-2xl p-7 card-hover">
              <div className="w-12 h-12 bg-[#E8F2FF] text-[#007AFF] rounded-xl flex items-center justify-center mb-5">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <h3 className="text-lg font-bold text-[#1D1D1F] mb-2">Your Flexible Path</h3>
              <p className="text-[#6E6E73] text-sm leading-relaxed">Learn when it works for you — anytime, anywhere, at your own pace.</p>
            </div>

            <div className="bg-[#F5F5F7] rounded-2xl p-7 card-hover">
              <div className="w-12 h-12 bg-[#FFF3E0] text-[#FF9500] rounded-xl flex items-center justify-center mb-5">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <h3 className="text-lg font-bold text-[#1D1D1F] mb-2">Affordable Courses</h3>
              <p className="text-[#6E6E73] text-sm leading-relaxed">Quality education made accessible for everyone without breaking your budget.</p>
            </div>

            <div className="bg-[#F5F5F7] rounded-2xl p-7 card-hover">
              <div className="w-12 h-12 bg-[#E8FAF0] text-[#34C759] rounded-xl flex items-center justify-center mb-5">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
              </div>
              <h3 className="text-lg font-bold text-[#1D1D1F] mb-2">Expert Instructors</h3>
              <p className="text-[#6E6E73] text-sm leading-relaxed">Real-world mentors with deep, practical experience in their industries.</p>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="mt-10 bg-white rounded-2xl border border-[#E5E5EA] p-6 md:p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center md:border-r md:border-[#E5E5EA] last:border-none">
                <div className="text-3xl md:text-4xl font-extrabold text-[#1D1D1F] tracking-tight">175+</div>
                <p className="text-[#6E6E73] text-sm mt-1">Instructors</p>
              </div>
              <div className="text-center md:border-r md:border-[#E5E5EA]">
                <div className="text-3xl md:text-4xl font-extrabold text-[#1D1D1F] tracking-tight">5K+</div>
                <p className="text-[#6E6E73] text-sm mt-1">Students</p>
              </div>
              <div className="text-center md:border-r md:border-[#E5E5EA]">
                <div className="text-3xl md:text-4xl font-extrabold text-[#1D1D1F] tracking-tight">280+</div>
                <p className="text-[#6E6E73] text-sm mt-1">Courses</p>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-extrabold text-[#1D1D1F] tracking-tight">8y+</div>
                <p className="text-[#6E6E73] text-sm mt-1">Experience</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#007AFF] to-[#0055CC] rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4 blur-xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/3 -translate-x-1/4 blur-xl"></div>

            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-5 leading-tight">Ready to Start Your Journey?</h2>
              <p className="text-blue-100 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">Join thousands of successful students who have transformed their careers through our distance education programs.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact" className="px-8 py-4 rounded-full bg-white text-[#007AFF] font-bold text-base hover:bg-blue-50 transition-colors shadow-lg btn-press flex items-center justify-center gap-2">
                  Apply Now
                  <svg className="w-5 h-5 cta-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                </Link>
                <a href="https://wa.me/910000000000" target="_blank" rel="noopener noreferrer" className="px-8 py-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold text-base hover:bg-white/20 transition-colors flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                  WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
