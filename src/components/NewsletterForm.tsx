'use client';

export default function NewsletterForm() {
  return (
    <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
      <div className="relative flex-1">
        <svg className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-[#AEAEB2]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-[#E5E5EA] bg-white text-[#1D1D1F] text-sm placeholder:text-[#AEAEB2] focus:ring-2 focus:ring-[#007AFF]/15 focus:border-[#007AFF] outline-none transition-all"
        />
      </div>
      <button type="submit" className="px-6 py-3.5 rounded-xl bg-[#007AFF] text-white font-semibold text-sm hover:bg-[#0066D6] transition-colors shadow-md shadow-[#007AFF]/20 btn-press shrink-0">
        Submit
      </button>
    </form>
  );
}
