import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { MapPin } from "lucide-react";
import { getUniversityBySlug, getUniversities } from "@/lib/db/queries";
import type { UniversityHighlights } from "@/components/admin/HighlightsEditor";
import JsonLd from "@/components/JsonLd";
import { universityLd, breadcrumbLd } from "@/lib/seo/jsonld";
import { absoluteUrl } from "@/lib/seo/site";
import EnquiryForm from "@/components/EnquiryForm";
import WhatsAppButton from "@/components/WhatsAppButton";
import EntityView from "@/components/EntityView";

const PLACEHOLDER = "https://placehold.co/1200x400/e8f0fe/1a56db?text=University";

export const revalidate = 3600;

export async function generateStaticParams() {
  const unis = await getUniversities();
  return unis.filter((u) => u.slug).map((u) => ({ slug: u.slug as string }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const uni = await getUniversityBySlug(slug);
  if (!uni) return {};
  const canonical = `/universities/${slug}`;
  return {
    title: `${uni.name} — Online Courses, Fees & Admission`,
    description: `Explore ${uni.name} online and distance education programs. Get course details, fee structure, eligibility and apply through Vidyavasal.`,
    alternates: { canonical },
    openGraph: {
      title: `${uni.name} — Online Education | Vidyavasal`,
      description: `Explore courses and fees at ${uni.name}.`,
      url: absoluteUrl(canonical),
      images: uni.bannerImage ? [{ url: uni.bannerImage }] : [],
    },
  };
}

export default async function UniversityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const uni = await getUniversityBySlug(slug);
  if (!uni) notFound();

  const highlights = (uni.highlights as UniversityHighlights) ?? {};
  const highlightItems = [
    { label: "NAAC Grade", value: highlights.naac },
    { label: "Established", value: highlights.established },
    { label: "Approvals", value: highlights.approvals },
    { label: "Students", value: highlights.students },
    { label: "Accreditation", value: highlights.accreditation },
  ].filter((h) => h.value);

  return (
    <>
      <JsonLd
        data={[
          universityLd({
            name: uni.name,
            slug: uni.slug,
            description: uni.content,
            logoUrl: uni.logoUrl,
            website: uni.website,
            city: uni.city,
            state: uni.state,
            universityType: uni.universityType,
            highlights: uni.highlights,
            courses: uni.courses.map((c) => ({ name: c.name, slug: c.slug })),
          }),
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Universities", path: "/universities" },
            { name: uni.name, path: `/universities/${slug}` },
          ]),
        ]}
      />
      <EntityView event="view_university" entityType="university" entityId={uni.id} />

      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-4 pt-6 pb-2">
        <nav className="text-sm text-gray-500 flex items-center gap-1.5">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span>/</span>
          <Link href="/universities" className="hover:text-blue-600">Universities</Link>
          <span>/</span>
          <span className="text-gray-700 font-medium">{uni.name}</span>
        </nav>
      </div>

      {/* Banner */}
      <div className="max-w-6xl mx-auto px-4 mb-6">
        <div className="relative w-full rounded-2xl overflow-hidden" style={{ aspectRatio: "16/5" }}>
          <Image
            src={uni.bannerImage || PLACEHOLDER}
            alt={uni.name}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1200px) 100vw, 1200px"
            unoptimized={!uni.bannerImage}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 p-6">
            <h1 className="text-white text-2xl sm:text-3xl font-bold">{uni.name}</h1>
            {(uni.city || uni.state) && (
              <p className="text-white/80 text-sm mt-1 flex items-center gap-1"><MapPin className="w-3.5 h-3.5 shrink-0" />{[uni.city, uni.state].filter(Boolean).join(", ")}</p>
            )}
          </div>
        </div>
      </div>

      {/* Highlights bar */}
      {highlightItems.length > 0 && (
        <div className="max-w-6xl mx-auto px-4 mb-8">
          <div className="bg-blue-50 border border-blue-100 rounded-xl px-6 py-4 flex flex-wrap gap-6">
            {highlightItems.map((h) => (
              <div key={h.label}>
                <div className="text-xs text-blue-600 font-medium uppercase tracking-wide">{h.label}</div>
                <div className="text-gray-900 font-semibold text-sm mt-0.5">{h.value}</div>
              </div>
            ))}
            {uni.universityType && (
              <div>
                <div className="text-xs text-blue-600 font-medium uppercase tracking-wide">Type</div>
                <div className="text-gray-900 font-semibold text-sm mt-0.5">{uni.universityType}</div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Main content + sidebar */}
      <div className="max-w-6xl mx-auto px-4 mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Markdown content */}
          <div className="lg:col-span-2">
            {uni.content ? (
              <div className="prose prose-gray max-w-none prose-headings:font-bold prose-a:text-blue-600">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{uni.content}</ReactMarkdown>
              </div>
            ) : (
              <div className="bg-gray-50 border border-dashed border-gray-300 rounded-xl p-8 text-center text-gray-400">
                <p className="text-sm">No brochure content yet.</p>
                <Link href={`/admin/universities`} className="text-blue-500 text-xs hover:underline mt-1 block">Add content in admin →</Link>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Enquire CTA — lead capture */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <h3 className="font-bold text-base text-gray-900 mb-1">Get Free Counselling</h3>
              <p className="text-gray-500 text-sm mb-4">Talk to our experts about {uni.shortName ?? uni.name} admissions.</p>
              <EnquiryForm
                source="university_enquiry"
                universityId={uni.id}
                context={uni.name}
                compact
              />
              <div className="mt-2">
                <WhatsAppButton context={`admissions at ${uni.name}`} />
              </div>
            </div>

            {/* Quick info */}
            {uni.website && (
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">University Info</h4>
                <div className="space-y-2 text-sm">
                  {uni.website && (
                    <div className="flex gap-2">
                      <span className="text-gray-400 w-16 shrink-0">Website</span>
                      <a href={uni.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline truncate">{uni.website.replace(/^https?:\/\//, "")}</a>
                    </div>
                  )}
                  {uni.state && (
                    <div className="flex gap-2">
                      <span className="text-gray-400 w-16 shrink-0">State</span>
                      <span className="text-gray-700">{uni.state}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Gallery */}
      {uni.galleryImages && uni.galleryImages.length > 0 && (
        <div className="max-w-6xl mx-auto px-4 mb-12">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Photo Gallery</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {uni.galleryImages.map((url, i) => (
              <div key={i} className="relative aspect-video rounded-xl overflow-hidden bg-gray-100">
                <Image src={url} alt={`${uni.name} gallery ${i + 1}`} fill className="object-cover hover:scale-105 transition-transform" sizes="(max-width: 640px) 50vw, 25vw" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All Courses */}
      {uni.courses.length > 0 && (
        <div className="max-w-6xl mx-auto px-4 mb-16">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Courses Offered by {uni.shortName ?? uni.name}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {uni.courses.map((course) => (
              <Link
                key={course.id}
                href={`/universities/${uni.slug}/${course.slug}`}
                className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              >
                {course.bannerImage && (
                  <div className="relative aspect-video bg-gray-100">
                    <Image src={course.bannerImage} alt={course.name} fill className="object-cover group-hover:scale-105 transition-transform" sizes="(max-width: 1024px) 50vw, 33vw" />
                  </div>
                )}
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-semibold text-gray-900 text-sm leading-snug group-hover:text-blue-700 transition-colors">{course.name}</h3>
                    <div className="flex gap-1 shrink-0">
                      {course.courseType && (
                        <span className={`px-1.5 py-0.5 text-xs font-medium rounded ${course.courseType === "UG" ? "bg-blue-50 text-blue-700" : "bg-purple-50 text-purple-700"}`}>
                          {course.courseType}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    {course.totalFee ? (
                      <span className="text-green-700 font-bold text-sm">
                        ₹{Number(course.totalFee).toLocaleString("en-IN")}
                      </span>
                    ) : <span />}
                    <span className="text-xs text-blue-600 font-medium group-hover:underline">View Course →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
