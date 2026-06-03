import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Thank You",
  description: "Thank you for contacting Vidyavasal.",
};

export default function ThankYouPage() {
  return (
    <div className="container mx-auto px-4 py-32 max-w-2xl text-center min-h-[70vh] flex flex-col items-center justify-center">
      <div className="w-20 h-20 bg-[#E8FAF0] text-[#34C759] rounded-full flex items-center justify-center mb-8 mx-auto">
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
      </div>
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#1D1D1F]">Thank You!</h1>
      <p className="text-xl text-[#6E6E73] mb-10 leading-relaxed">
        Your enquiry has been received successfully. One of our educational counselors will get in touch with you shortly.
      </p>
      <Link href="/" className="px-8 py-4 rounded-full bg-[#007AFF] text-white font-semibold text-base hover:bg-[#0066D6] transition-all shadow-md shadow-[#007AFF]/20 inline-flex items-center gap-2 btn-press">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
        Return to Home
      </Link>
    </div>
  );
}
