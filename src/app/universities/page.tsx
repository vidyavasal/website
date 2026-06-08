import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { getUniversities } from "@/lib/db/queries";
import JsonLd from "@/components/JsonLd";
import { itemListLd, breadcrumbLd } from "@/lib/seo/jsonld";

export const metadata: Metadata = {
  title: "Universities — Online & Distance Education | Vidyavasal",
  description: "Explore top universities offering online, distance and ODL degree programs in India. Compare fees, courses and apply through Vidyavasal.",
  openGraph: {
    title: "Universities — Online & Distance Education | Vidyavasal",
    description: "Explore top universities offering online and distance education programs in India.",
    type: "website",
  },
};

const PLACEHOLDER = "https://placehold.co/800x450/e8f0fe/1a56db?text=University";

export default async function UniversitiesPage() {
  const universities = await getUniversities();

  return (
    <>
      <JsonLd
        data={[
          itemListLd(
            "Universities Offering Online & Distance Education",
            universities
              .filter((u) => u.slug)
              .map((u) => ({ name: u.name, path: `/universities/${u.slug}` }))
          ),
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Universities", path: "/universities" },
          ]),
        ]}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-50 py-14 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Top Universities for Online & Distance Education
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            UGC-approved programs from India&apos;s leading universities. Compare courses, fees, and apply through Vidyavasal.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-500">{universities.length} universities</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {universities.map((uni) => (
            <Link
              key={uni.id}
              href={`/universities/${uni.slug}`}
              className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
            >
              {/* Banner */}
              <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-blue-100 to-indigo-100">
                <Image
                  src={uni.bannerImage || PLACEHOLDER}
                  alt={uni.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  unoptimized={!uni.bannerImage}
                />
                {/* Type badge */}
                {uni.universityType && (
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-medium text-gray-700 rounded-full">
                      {uni.universityType}
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                <h2 className="font-bold text-gray-900 text-base leading-snug mb-1 group-hover:text-blue-700 transition-colors">
                  {uni.name}
                </h2>
                {(uni.city || uni.state) && (
                  <p className="text-sm text-gray-500 mb-3 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    {[uni.city, uni.state].filter(Boolean).join(", ")}
                  </p>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-blue-700 bg-blue-50 px-2 py-1 rounded-full">
                    {uni.courseCount} Courses
                  </span>
                  <span className="text-xs text-blue-600 font-medium group-hover:underline">
                    View Details →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
