import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Eduthalim Degree",
  description: "Complete your 10th, 12th, or Degree with Eduthalim programs at IODE. Affordable, flexible, and UGC-recognized programs for students across Kerala.",
};

const programs = [
  {
    title: 'Secondary Education (10th)',
    subtitle: 'SSLC / Equivalent',
    desc: 'Complete your 10th grade through the National Institute of Open Schooling (NIOS) with flexible exam schedules and language options.',
    features: ['NIOS Affiliated', 'Language options (Mal/Eng)', 'Flexible exams', 'Valid across India'],
    color: '#007AFF',
    grad: 'from-[#007AFF] to-[#5AC8FA]',
    bg: 'service-card-blue',
  },
  {
    title: 'Higher Secondary (+1/+2)',
    subtitle: 'Class 11 & 12',
    desc: 'Pursue Science, Commerce, or Arts streams for Class 11 and 12 with study support and guidance at every step.',
    features: ['All streams available', 'Science / Commerce / Arts', 'Study materials provided', 'Expert tutors'],
    color: '#FF9500',
    grad: 'from-[#FF9500] to-[#FF6B00]',
    bg: 'service-card-orange',
  },
  {
    title: 'Degree Programs',
    subtitle: 'UG / Bachelor\'s',
    desc: 'Earn your BA, B.Com, BBA, or BCA through distance mode from UGC-recognized universities with full IODE support.',
    features: ['BA, B.Com, BBA, BCA', 'UGC Recognized', 'Distance / Online modes', 'Placement support'],
    color: '#7B61FF',
    grad: 'from-[#7B61FF] to-[#007AFF]',
    bg: 'service-card-purple',
  },
];

const benefits = [
  { title: 'Study at Your Pace', desc: 'No fixed class hours. Study anytime, anywhere around your work and family schedule.', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>, color: '#007AFF' },
  { title: 'Nationally Valid', desc: 'All programs are recognized by the Government of India and accepted by employers nationwide.', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>, color: '#34C759' },
  { title: 'Affordable Fees', desc: 'Low-cost programs with EMI options. Quality education without financial stress.', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>, color: '#FF9500' },
  { title: 'Expert Guidance', desc: 'Dedicated counselors guide you from enrollment to exam completion and beyond.', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>, color: '#7B61FF' },
];

export default function EduthalimPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden hero-mesh-bg pt-12 pb-16 md:pt-20 md:pb-24">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-20 blob-1"
          style={{background: 'radial-gradient(circle, #FF9500, transparent)', transform: 'translate(30%, -40%)'}}></div>
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFF3E0] text-[#FF9500] text-sm font-semibold mb-6 border border-[#FFE0B2]">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
            Academic Programs
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-[#1D1D1F] leading-tight">
            Eduthalim Degree <br className="hidden md:block" />&amp; Schooling Programs
          </h1>
          <p className="text-lg md:text-xl text-[#6E6E73] mb-8 leading-relaxed max-w-2xl mx-auto">
            Bridging the gap in your education. Whether you need 10th, 12th, or a full Degree, we provide comprehensive support at every stage.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact" className="px-8 py-4 rounded-full bg-gradient-to-r from-[#FF9500] to-[#FF6B00] text-white font-bold text-base shadow-lg shadow-[#FF9500]/20 btn-press flex items-center justify-center gap-2">
              Apply Now
              <svg className="w-5 h-5 cta-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
            </Link>
            <a href="https://wa.me/910000000000" target="_blank" rel="noopener noreferrer" className="px-8 py-4 rounded-full bg-white border border-[#E5E5EA] text-[#1D1D1F] font-bold text-base hover:bg-[#FFF3E0] transition-all flex items-center justify-center gap-2">
              <svg className="w-5 h-5 text-[#34C759]" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              WhatsApp for Details
            </a>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFF3E0] text-[#FF9500] text-sm font-semibold mb-4">Our Programs</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1D1D1F] mt-3">Choose your level</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {programs.map((p) => (
              <div key={p.title} className={`rounded-3xl p-8 border border-[#E5E5EA] card-hover relative overflow-hidden ${p.bg}`}>
                <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-20"
                  style={{background: `radial-gradient(circle, ${p.color}, transparent)`}}></div>
                <div className="relative z-10">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${p.grad} flex items-center justify-center mb-4 shadow-lg`}>
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                    </svg>
                  </div>
                  <span className="text-xs font-semibold" style={{color: p.color}}>{p.subtitle}</span>
                  <h3 className="text-xl font-bold text-[#1D1D1F] mt-1 mb-3">{p.title}</h3>
                  <p className="text-[#6E6E73] text-sm mb-5 leading-relaxed">{p.desc}</p>
                  <ul className="space-y-2 mb-6">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-[#1D1D1F]">
                        <svg className="w-4 h-4 shrink-0" style={{color: p.color}} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact" className="font-semibold text-sm flex items-center gap-1.5" style={{color: p.color}}>
                    Enquire Now <svg className="w-4 h-4 cta-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 md:py-24 section-mesh-bg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="text-center mb-12">
            <span className="section-label mb-4 inline-flex">Why Eduthalim</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1D1D1F] mt-3">Benefits of learning with us</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {benefits.map((b) => (
              <div key={b.title} className="bg-white rounded-2xl p-7 border border-[#E5E5EA] card-hover flex gap-5">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{background: `${b.color}15`}}>
                  <svg className="w-6 h-6" style={{color: b.color}} fill="none" stroke="currentColor" viewBox="0 0 24 24">{b.icon}</svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#1D1D1F] mb-1">{b.title}</h3>
                  <p className="text-[#6E6E73] text-sm leading-relaxed">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <div className="rounded-3xl p-8 border border-[#E5E5EA] bg-[#FAFAFA]">
            <h2 className="text-2xl font-bold text-[#1D1D1F] mb-6">Eligibility Criteria</h2>
            <div className="space-y-4">
              {[
                { prog: '10th (SSLC)', elig: 'Students who did not complete 10th grade, or who need to appear for improvement exams.' },
                { prog: '+1 / +2 (Higher Secondary)', elig: 'Students who completed 10th grade and want to pursue Science, Commerce, or Arts stream.' },
                { prog: 'UG Degree (BA/B.Com/BBA/BCA)', elig: 'Students who completed +2 or equivalent. Some programs accept 10th with relevant work experience.' },
              ].map((r) => (
                <div key={r.prog} className="flex gap-4 p-4 bg-white rounded-xl border border-[#E5E5EA]">
                  <div className="w-2 h-2 rounded-full bg-[#FF9500] mt-2 shrink-0"></div>
                  <div>
                    <p className="font-semibold text-[#1D1D1F] text-sm">{r.prog}</p>
                    <p className="text-[#6E6E73] text-sm mt-0.5">{r.elig}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center">
          <div className="rounded-3xl p-10 relative overflow-hidden" style={{background: 'linear-gradient(135deg, #FF9500 0%, #FF6B00 100%)'}}>
            <div className="absolute inset-0 dot-pattern opacity-20"></div>
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to continue your education?</h2>
              <p className="text-white/80 mb-8">Free consultation — we&apos;ll find the right program for your situation and budget.</p>
              <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-[#FF6B00] font-bold hover:bg-orange-50 transition-colors btn-press">
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
