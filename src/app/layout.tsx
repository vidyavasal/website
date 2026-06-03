import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SiteShell from "@/components/SiteShell";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Vidyavasal - University Admissions & Distance Education",
    default: "Vidyavasal - University Admissions & Distance Education | Kerala's Leading Ed-Tech",
  },
  description: "Vidyavasal helps students get admitted to top universities across India. Expert guidance for distance education, +1, +2, UG, PG, MBA admissions and courses. Based in Kerala.",
  keywords: ["university admissions", "distance education", "MBA Kerala", "UG PG admissions", "+1 +2 Kerala", "IGNOU admission", "online degree India", "Vidyavasal"],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/logo.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: "/logo.svg",
  },
  openGraph: {
    type: "website",
    siteName: "Vidyavasal",
    title: "Vidyavasal - University Admissions & Distance Education | Kerala",
    description: "Expert guidance for university admissions, distance education, and courses across India. 5,000+ students enrolled.",
    locale: "en_IN",
    images: [{ url: "/logo.svg", width: 572, height: 152, alt: "Vidyavasal - Learn Anywhere. Grow Everywhere." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vidyavasal - University Admissions & Distance Education",
    description: "Expert guidance for university admissions and distance education across India.",
    images: ["/logo.svg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "Vidyavasal",
  "alternateName": "Vidyavasal",
  "url": "https://iodeedu.in",
  "logo": "https://iodeedu.in/logo.svg",
  "description": "Vidyavasal provides expert university admissions guidance, distance education programs, and courses across Kerala and India.",
  "address": {
    "@type": "PostalAddress",
    "addressRegion": "Kerala",
    "addressCountry": "IN"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+91-00000-00000",
    "contactType": "admissions",
    "areaServed": "IN",
    "availableLanguage": ["English", "Malayalam"]
  },
  "sameAs": [
    "https://www.facebook.com/iodeedu",
    "https://www.instagram.com/iodeedu",
    "https://www.linkedin.com/company/iodeedu"
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} h-full antialiased scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-white text-[#1D1D1F]">
        <SiteShell
          header={
            <div className="print:hidden">
              <Header />
            </div>
          }
          footer={
            <div className="print:hidden">
              <Footer />
            </div>
          }
        >
          {children}
        </SiteShell>
      </body>
    </html>
  );
}
