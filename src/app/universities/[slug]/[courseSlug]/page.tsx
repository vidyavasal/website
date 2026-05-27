import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getCourseBySlug, getUniversities } from "@/lib/db/queries";

export const revalidate = 3600;

export async function generateStaticParams() {
  const unis = await getUniversities();
  const params: { slug: string; courseSlug: string }[] = [];
  // We just return university slugs here; course slugs fetched per-request
  // For a full pre-render you'd fetch courses too, but this keeps it simple
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; courseSlug: string }> }): Promise<Metadata> {
  const { slug, courseSlug } = await params;
  const data = await getCourseBySlug(slug, courseSlug);
  if (!data) return {};
  return {
    title: `${data.name} — ${data.university.name} | Fees, Eligibility | IODE`,
    description: `${data.name} from ${data.university.name}: fee structure ₹${data.feeStructure?.totalFee ? Number(data.feeStructure.totalFee).toLocaleString("en-IN") : "—"}, eligibility, duration, and online admission through IODE.`,
    openGraph: {
      title: `${data.name} — ${data.university.name} | IODE`,
      description: data.description ?? `Get details about ${data.name} at ${data.university.name}.`,
      images: data.bannerImage ? [{ url: data.bannerImage }] : [],
    },
  };
}

export default async function CoursePage({ params }: { params: Promise<{ slug: string; courseSlug: string }> }) {
  const { slug, courseSlug } = await params;
  const data = await getCourseBySlug(slug, courseSlug);
  if (!data) notFound();

  const fee = data.feeStructure;
  const feeRows = [
    { label: "Registration Fee", value: fee?.registrationFee },
    { label: "Admission Fee", value: fee?.admissionFee },
    { label: "Course Fee", value: fee?.courseFee },
    { label: "Exam Fee", value: fee?.examFee },
    { label: "Yearly Fee", value: fee?.yearlyFee },
  ].filter((r) => r.value && Number(r.value) > 0);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: data.name,
    description: data.description ?? `${data.name} offered by ${data.university.name}`,
    provider: {
      "@type": "EducationalOrganization",
      name: data.university.name,
      url: `https://iode.in/universities/${slug}`,
    },
    timeRequired: data.durationYears ? `P${data.durationYears}Y` : undefined,
    educationalLevel: data.courseType === "PG" ? "Graduate" : "Undergraduate",
    offers: fee?.totalFee ? {
      "@type": "Offer",
      price: Number(fee.totalFee),
      priceCurrency: "INR",
    } : undefined,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-4 pt-6 pb-3">
        <nav className="text-sm text-gray-500 flex items-center gap-1.5 flex-wrap">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span>/</span>
          <Link href="/universities" className="hover:text-blue-600">Universities</Link>
          <span>/</span>
          <Link href={`/universities/${slug}`} className="hover:text-blue-600">{data.university.name}</Link>
          <span>/</span>
          <span className="text-gray-700 font-medium truncate">{data.name}</span>
        </nav>
      </div>

      {/* Course Banner */}
      {data.bannerImage && (
        <div className="max-w-6xl mx-auto px-4 mb-6">
          <div className="relative w-full rounded-2xl overflow-hidden" style={{ aspectRatio: "16/5" }}>
            <Image src={data.bannerImage} alt={data.name} fill className="object-cover" priority sizes="(max-width: 1200px) 100vw, 1200px" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title + badges */}
            <div>
              <div className="flex flex-wrap gap-2 mb-2">
                {data.courseType && (
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${data.courseType === "PG" ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"}`}>
                    {data.courseType}
                  </span>
                )}
                {data.deliveryMode && (
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                    {data.deliveryMode}
                  </span>
                )}
                {data.durationYears && (
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-700">
                    {data.durationYears} Years
                  </span>
                )}
                {data.totalSemesters && (
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-600">
                    {data.totalSemesters} Semesters
                  </span>
                )}
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{data.name}</h1>
              <p className="text-gray-500 text-sm mt-1">
                by{" "}
                <Link href={`/universities/${slug}`} className="text-blue-600 hover:underline font-medium">
                  {data.university.name}
                </Link>
              </p>
              {data.description && <p className="text-gray-600 mt-3">{data.description}</p>}
            </div>

            {/* Eligibility */}
            {data.eligibility && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <h3 className="text-sm font-semibold text-amber-800 mb-1">Eligibility Criteria</h3>
                <p className="text-sm text-amber-900">{data.eligibility}</p>
              </div>
            )}

            {/* Markdown content */}
            {data.content ? (
              <div className="prose prose-gray max-w-none prose-headings:font-bold prose-a:text-blue-600">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{data.content}</ReactMarkdown>
              </div>
            ) : (
              <div className="bg-gray-50 border border-dashed border-gray-300 rounded-xl p-6 text-center text-gray-400 text-sm">
                Detailed course content coming soon.
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Fee Card */}
            {fee && (
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                <div className="bg-blue-600 px-4 py-3">
                  <div className="text-xs text-blue-100 font-medium">Total Program Fee</div>
                  <div className="text-2xl font-bold text-white mt-0.5">
                    {fee.totalFee ? `₹${Number(fee.totalFee).toLocaleString("en-IN")}` : "Contact us"}
                  </div>
                  <div className="text-xs text-blue-200 mt-0.5">{fee.currency ?? "INR"} • {fee.emiAvailable ? "EMI Available" : "Full payment"}</div>
                </div>
                <div className="p-4 space-y-2">
                  {feeRows.map((row) => (
                    <div key={row.label} className="flex justify-between text-sm">
                      <span className="text-gray-500">{row.label}</span>
                      <span className="font-medium text-gray-800">₹{Number(row.value).toLocaleString("en-IN")}</span>
                    </div>
                  ))}
                  {feeRows.length > 0 && fee.totalFee && (
                    <div className="flex justify-between text-sm font-semibold border-t border-gray-100 pt-2 mt-2">
                      <span className="text-gray-700">Total</span>
                      <span className="text-blue-700">₹{Number(fee.totalFee).toLocaleString("en-IN")}</span>
                    </div>
                  )}
                </div>
                <div className="px-4 pb-4">
                  <Link href="/contact" className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm py-2.5 rounded-lg transition-colors">
                    Apply Now / Enquire
                  </Link>
                </div>
              </div>
            )}

            {/* University card */}
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Offered By</h4>
              <Link href={`/universities/${slug}`} className="flex items-center gap-3 hover:bg-gray-50 -mx-2 px-2 py-2 rounded-lg transition-colors">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-700 font-bold text-xs shrink-0">
                  {data.university.shortName?.slice(0, 2) ?? data.university.name.slice(0, 2)}
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">{data.university.name}</div>
                  {data.university.state && <div className="text-xs text-gray-400">{data.university.state}</div>}
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Other courses from this university */}
      {data.siblingCourses.length > 0 && (
        <div className="max-w-6xl mx-auto px-4 mb-16">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Other Courses from {data.university.shortName ?? data.university.name}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {data.siblingCourses.map((c) => (
              <Link
                key={c.id}
                href={`/universities/${slug}/${c.slug}`}
                className="group bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                <div className="text-sm font-medium text-gray-800 mb-1 group-hover:text-blue-700 transition-colors">{c.name}</div>
                {c.courseType && (
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${c.courseType === "PG" ? "bg-purple-50 text-purple-700" : "bg-blue-50 text-blue-700"}`}>
                    {c.courseType}
                  </span>
                )}
                {c.totalFee && (
                  <div className="text-xs text-green-700 font-semibold mt-2">
                    ₹{Number(c.totalFee).toLocaleString("en-IN")}
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
