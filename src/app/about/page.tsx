import { Metadata } from "next";
import Link from "next/link";
import { StatCounter } from "@/components/StatCounter";
import { ScrollReveal } from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "About IODE — Kerala's Leading Education Consultancy",
  description:
    "Learn about Institute of Distance Education (IODE) — our mission to connect 5,000+ students with top UGC-recognized universities across India since 2016.",
};

const milestones = [
  {
    year: "2016",
    title: "Founded in Kerala",
    desc: "IODE was established to bridge the gap in accessible, quality education for students and professionals.",
    emoji: "🌱",
    color: "#4F46E5",
  },
  {
    year: "2018",
    title: "First 500 Students",
    desc: "Crossed our first milestone of 500 enrolled students across distance and degree programs.",
    emoji: "🎉",
    color: "#0EA5E9",
  },
  {
    year: "2020",
    title: "University Partnerships",
    desc: "Established partnerships with 10+ UGC-recognized universities across India.",
    emoji: "🤝",
    color: "#10B981",
  },
  {
    year: "2022",
    title: "Montessori Division",
    desc: "Launched specialized Montessori counseling and teacher training programs.",
    emoji: "🏫",
    color: "#F59E0B",
  },
  {
    year: "2024",
    title: "5,000+ Students",
    desc: "Celebrated a community of over 5,000 students successfully placed in top universities.",
    emoji: "🎓",
    color: "#7C3AED",
  },
  {
    year: "2026",
    title: "25+ Universities",
    desc: "Expanded our network to 25+ partner universities with 120+ courses across India.",
    emoji: "🚀",
    color: "#EC4899",
  },
];

const values = [
  {
    title: "Student-First",
    icon: "👨‍🎓",
    desc: "Every decision we make is guided by what is best for the student — from the first consultation to final enrollment.",
    color: "#4F46E5",
    bg: "from-[#EEF2FF] to-[#E0E7FF]",
  },
  {
    title: "Transparency",
    icon: "👁️",
    desc: "We clearly explain fees, processes, and timelines so there are no surprises — ever.",
    color: "#0EA5E9",
    bg: "from-[#E0F7FF] to-[#BAE6FD]",
  },
  {
    title: "Excellence",
    icon: "🏅",
    desc: "We partner only with UGC-approved, DEB-recognized universities to ensure your degree has national value.",
    color: "#F59E0B",
    bg: "from-[#FFFBEB] to-[#FEF3C7]",
  },
  {
    title: "Lifelong Support",
    icon: "💛",
    desc: "Our relationship doesn't end at enrollment — we offer placement support, mentoring, and career guidance.",
    color: "#10B981",
    bg: "from-[#ECFDF5] to-[#D1FAE5]",
  },
];

const team = [
  {
    name: "Admissions Team",
    role: "University Relations",
    initials: "AT",
    grad: "from-[#4F46E5] to-[#7C3AED]",
    count: "12+ Counselors",
  },
  {
    name: "Student Success",
    role: "Enrollment Support",
    initials: "SS",
    grad: "from-[#0EA5E9] to-[#06B6D4]",
    count: "8+ Advisors",
  },
  {
    name: "Montessori Dept.",
    role: "Training & Certification",
    initials: "MD",
    grad: "from-[#10B981] to-[#059669]",
    count: "6+ Trainers",
  },
  {
    name: "Eduthalim Wing",
    role: "Bridge Education",
    initials: "EW",
    grad: "from-[#F59E0B] to-[#D97706]",
    count: "5+ Mentors",
  },
];

export default function AboutPage() {
  return (
    <div>
      {/* ══════════════════════ HERO ══════════════════════ */}
      <section className="relative overflow-hidden hero-vivid-bg pt-20 pb-20 md:pt-28 md:pb-28">
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-20 blob-1 pointer-events-none"
          style={{
            background: "radial-gradient(circle, #4F46E5, transparent)",
            transform: "translate(30%, -40%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-15 blob-2 pointer-events-none"
          style={{
            background: "radial-gradient(circle, #0EA5E9, transparent)",
            transform: "translate(-25%, 30%)",
          }}
        />

        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl text-center">
          <ScrollReveal>
            <span className="section-label-purple mb-5 inline-flex">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              About IODE
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1D1D1F] mt-3 mb-6 leading-tight">
              Empowering futures through
              <br className="hidden md:block" />
              <span className="gradient-text-vivid">quality education</span>
            </h1>
            <p className="text-lg text-[#6E6E73] max-w-2xl mx-auto leading-relaxed">
              Institute of Distance Education (IODE) is Kerala&apos;s leading admission and
              education consultancy, connecting students with the best universities and
              programs across India since 2016.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-10">
              <Link
                href="/contact"
                className="px-8 py-4 rounded-full btn-gradient-vivid text-white font-semibold btn-press flex items-center justify-center gap-2"
              >
                Talk to a Counselor
                <svg className="w-5 h-5 cta-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/courses"
                className="px-8 py-4 rounded-full bg-white border border-[#E5E5EA] text-[#1D1D1F] font-semibold hover:border-[#7C3AED] hover:text-[#7C3AED] hover:bg-[#F5F3FF] transition-all flex items-center justify-center gap-2"
              >
                Browse Courses
              </Link>
            </div>
          </ScrollReveal>

          {/* Decorative stat strip */}
          <ScrollReveal delay={200} className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { value: "2016", label: "Founded", color: "#4F46E5" },
              { value: "5K+", label: "Students", color: "#0EA5E9" },
              { value: "25+", label: "Universities", color: "#10B981" },
              { value: "8+", label: "Years", color: "#F59E0B" },
            ].map((s) => (
              <div
                key={s.label}
                className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/90 shadow-sm p-4 text-center"
              >
                <p
                  className="text-2xl font-extrabold leading-none"
                  style={{ color: s.color }}
                >
                  {s.value}
                </p>
                <p className="text-xs text-[#6E6E73] mt-1 font-medium">{s.label}</p>
              </div>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════════════════ STATS ══════════════════════ */}
      <section className="py-14 dark-vivid-bg relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-10 pointer-events-none" />
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-4xl mx-auto">
            <StatCounter target={5000} suffix="+" label="Students Enrolled" />
            <StatCounter target={3500} suffix="+" label="Admissions Done" />
            <StatCounter target={25} suffix="+" label="Partner Universities" />
            <StatCounter target={120} suffix="+" label="Courses Available" />
            <StatCounter target={8} suffix="+" label="Years of Excellence" className="col-span-2 md:col-span-1" />
          </div>
        </div>
      </section>

      {/* ══════════════════════ MISSION & VISION ══════════════════════ */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <ScrollReveal className="text-center mb-12">
            <span className="section-label mb-4 inline-flex">Our Foundation</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1D1D1F] mt-3">
              Mission &amp; Vision
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ScrollReveal direction="left">
              <div
                className="rounded-3xl p-8 border border-[#E5E5EA] card-hover relative overflow-hidden h-full"
                style={{ background: "linear-gradient(135deg, #F0EBFF 0%, #E5D9FF 100%)" }}
              >
                <div
                  className="absolute -top-8 -right-8 w-36 h-36 rounded-full opacity-25 blur-2xl"
                  style={{ background: "radial-gradient(circle, #4F46E5, transparent)" }}
                />
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] flex items-center justify-center mb-5 shadow-xl shadow-[#4F46E5]/25 glow-purple">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <span className="text-xs font-bold text-[#4F46E5] tracking-widest uppercase mb-2 block">Our Mission</span>
                  <h3 className="text-2xl font-bold text-[#1D1D1F] mb-4">
                    Making Quality Education Accessible
                  </h3>
                  <p className="text-[#6E6E73] leading-relaxed">
                    To empower every student and professional with accessible, affordable, and
                    high-quality university education. We believe that the right guidance at
                    the right time can transform a life — and we&apos;re here to provide exactly that.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {["Accessible", "Affordable", "Quality", "Trusted"].map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-[#4F46E5]/10 text-[#4F46E5] rounded-full text-xs font-semibold">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div
                className="rounded-3xl p-8 border border-[#E5E5EA] card-hover relative overflow-hidden h-full"
                style={{ background: "linear-gradient(135deg, #E0F7FF 0%, #BAE6FD 100%)" }}
              >
                <div
                  className="absolute -top-8 -right-8 w-36 h-36 rounded-full opacity-25 blur-2xl"
                  style={{ background: "radial-gradient(circle, #0EA5E9, transparent)" }}
                />
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0EA5E9] to-[#06B6D4] flex items-center justify-center mb-5 shadow-xl shadow-[#0EA5E9]/25 glow-blue">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <span className="text-xs font-bold text-[#0EA5E9] tracking-widest uppercase mb-2 block">Our Vision</span>
                  <h3 className="text-2xl font-bold text-[#1D1D1F] mb-4">
                    India's Most Trusted Education Consultancy
                  </h3>
                  <p className="text-[#6E6E73] leading-relaxed">
                    To be India&apos;s most trusted education consultancy, known for connecting students
                    with the perfect university programs that match their aspirations, budget, and career
                    goals. We bridge the gap between ambition and achievement.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {["Nationwide", "Trusted", "India #1", "Student-First"].map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-[#0EA5E9]/10 text-[#0EA5E9] rounded-full text-xs font-semibold">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════ CORE VALUES ══════════════════════ */}
      <section className="py-20 md:py-28 section-mesh-bg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <ScrollReveal className="text-center mb-12">
            <span className="section-label-purple mb-4 inline-flex">Core Values</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1D1D1F] mt-3">
              What drives us every day
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {values.map((v, i) => (
              <ScrollReveal key={v.title} delay={i * 100}>
                <div
                  className={`rounded-3xl p-7 border border-[#E5E5EA] card-hover bg-gradient-to-br ${v.bg} flex gap-5 items-start`}
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shrink-0 shadow-sm bg-white/70"
                  >
                    {v.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1.5" style={{ color: v.color }}>
                      {v.title}
                    </h3>
                    <p className="text-[#6E6E73] text-sm leading-relaxed">{v.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════ TIMELINE ══════════════════════ */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <ScrollReveal className="text-center mb-12">
            <span className="section-label mb-4 inline-flex">Our Journey</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1D1D1F] mt-3">
              Milestones &amp; Growth
            </h2>
            <p className="text-[#6E6E73] mt-3 text-sm max-w-md mx-auto">
              From a small team in Kerala to a nationwide trusted education partner.
            </p>
          </ScrollReveal>

          <div className="relative">
            {/* Gradient line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#4F46E5] via-[#0EA5E9] via-[#10B981] via-[#F59E0B] via-[#7C3AED] to-[#EC4899]" />

            <div className="space-y-6">
              {milestones.map((m, i) => (
                <ScrollReveal key={m.year} delay={i * 100} direction="left">
                  <div className="flex gap-6 items-start">
                    <div className="relative shrink-0 z-10">
                      <div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg text-2xl"
                        style={{
                          background: `linear-gradient(135deg, ${m.color}ee, ${m.color}99)`,
                        }}
                      >
                        {m.emoji}
                      </div>
                    </div>
                    <div className="bg-white rounded-2xl p-5 border border-[#E5E5EA] flex-1 card-hover">
                      <div className="flex items-center gap-3 mb-1">
                        <span
                          className="text-xs font-bold tracking-widest uppercase px-2.5 py-1 rounded-full"
                          style={{
                            color: m.color,
                            background: `${m.color}15`,
                          }}
                        >
                          {m.year}
                        </span>
                        <h3 className="font-bold text-[#1D1D1F]">{m.title}</h3>
                      </div>
                      <p className="text-[#6E6E73] text-sm leading-relaxed">{m.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════ TEAM ══════════════════════ */}
      <section className="py-20 md:py-28 hero-mesh-bg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <ScrollReveal className="text-center mb-12">
            <span className="section-label-purple mb-4 inline-flex">Our Teams</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1D1D1F] mt-3">
              Experts who care about your success
            </h2>
            <p className="text-[#6E6E73] mt-3 text-sm max-w-md mx-auto">
              Experienced counselors and mentors dedicated to your educational journey.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {team.map((t, i) => (
              <ScrollReveal key={t.name} delay={i * 80}>
                <div className="bg-white rounded-2xl p-6 border border-[#E5E5EA] card-hover text-center">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${t.grad} flex items-center justify-center text-white font-bold text-xl mx-auto mb-4 shadow-lg`}
                  >
                    {t.initials}
                  </div>
                  <h3 className="font-bold text-[#1D1D1F] text-sm mb-0.5">{t.name}</h3>
                  <p className="text-[#6E6E73] text-xs mb-2">{t.role}</p>
                  <span className="inline-block px-2.5 py-1 bg-[#F5F5F7] rounded-full text-xs text-[#6E6E73] font-medium">
                    {t.count}
                  </span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════ CTA ══════════════════════ */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <ScrollReveal>
            <div
              className="rounded-3xl p-10 md:p-14 relative overflow-hidden text-center noise-overlay"
              style={{
                background: "linear-gradient(135deg, #1a0a3e 0%, #0f0c29 50%, #060d1e 100%)",
              }}
            >
              <div className="absolute inset-0 dot-pattern opacity-10 pointer-events-none" />
              <div
                className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none"
                style={{ background: "radial-gradient(circle, #4F46E5, transparent)" }}
              />
              <div className="relative z-10">
                <p className="text-4xl mb-4">🎓</p>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Join the IODE Family
                </h2>
                <p className="text-white/60 mb-8 max-w-lg mx-auto">
                  Be one of 5,000+ students who found their perfect university with us. Free consultation — no obligation.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-[#1a1040] font-bold hover:bg-gray-100 transition-colors btn-press"
                  >
                    Get Free Consultation
                    <svg className="w-5 h-5 cta-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                  <Link
                    href="/universities"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold hover:bg-white/20 transition-colors"
                  >
                    Browse Universities
                  </Link>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
