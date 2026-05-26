import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for IODE.",
};

export default function PrivacyPolicyPage() {
  return (
    <div>
      <section className="bg-gradient-to-b from-[#F0F7FF] to-white pt-12 pb-4 md:pt-20 md:pb-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <h1 className="text-4xl font-bold text-[#1D1D1F]">Privacy Policy</h1>
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="prose prose-lg max-w-none text-[#6E6E73]">
            <p>Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>

            <h2 className="text-2xl font-bold mt-10 mb-4 text-[#1D1D1F]">1. Introduction</h2>
            <p>Welcome to the Institute of Distance Education (IODE). We respect your privacy and are committed to protecting your personal data.</p>

            <h2 className="text-2xl font-bold mt-10 mb-4 text-[#1D1D1F]">2. Information We Collect</h2>
            <p>We collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and Services.</p>

            <h2 className="text-2xl font-bold mt-10 mb-4 text-[#1D1D1F]">3. How We Use Your Information</h2>
            <p>We use personal information collected via our Website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
