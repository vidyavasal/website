import type { MetadataRoute } from "next";
import { getUniversityBySlug, getUniversities } from "@/lib/db/queries";

const BASE_URL = "https://iode.in";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const universities = await getUniversities();

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), priority: 1.0, changeFrequency: "weekly" },
    { url: `${BASE_URL}/universities`, lastModified: new Date(), priority: 0.9, changeFrequency: "daily" },
    { url: `${BASE_URL}/courses`, lastModified: new Date(), priority: 0.9, changeFrequency: "daily" },
    { url: `${BASE_URL}/about`, lastModified: new Date(), priority: 0.7 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), priority: 0.7 },
    { url: `${BASE_URL}/admissions`, lastModified: new Date(), priority: 0.7 },
  ];

  const universityPages: MetadataRoute.Sitemap = universities
    .filter((u) => u.slug)
    .map((u) => ({
      url: `${BASE_URL}/universities/${u.slug}`,
      lastModified: u.updatedAt ?? new Date(),
      priority: 0.9,
      changeFrequency: "weekly" as const,
    }));

  // Course pages
  const coursePages: MetadataRoute.Sitemap = [];
  for (const uni of universities.filter((u) => u.slug)) {
    const uniData = await getUniversityBySlug(uni.slug!);
    if (!uniData) continue;
    for (const course of uniData.courses) {
      if (course.slug) {
        coursePages.push({
          url: `${BASE_URL}/universities/${uni.slug}/${course.slug}`,
          lastModified: new Date(),
          priority: 0.8,
          changeFrequency: "monthly",
        });
        
      }
    }
  }

  return [...staticPages, ...universityPages, ...coursePages];
}
