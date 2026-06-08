import type { MetadataRoute } from "next";
import { getUniversities, getCourses } from "@/lib/db/queries";
import { SITE_URL, IS_INDEXABLE, BLOG_POSTS } from "@/lib/seo/site";

// Re-generate the sitemap periodically rather than per-request.
export const revalidate = 3600; // 1 hour

const url = (path: string) => `${SITE_URL}${path}`;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Never advertise URLs from a non-production (staging) deployment.
  if (!IS_INDEXABLE) return [];

  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: url("/"), lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: url("/universities"), lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: url("/courses"), lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: url("/admissions"), lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: url("/montessori"), lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: url("/about"), lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: url("/contact"), lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: url("/blog"), lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: url("/privacy-policy"), lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  const [universities, courses] = await Promise.all([
    getUniversities(),
    getCourses(),
  ]);

  const universityRoutes: MetadataRoute.Sitemap = universities
    .filter((u) => u.slug)
    .map((u) => ({
      url: url(`/universities/${u.slug}`),
      lastModified: u.updatedAt ?? now,
      changeFrequency: "weekly",
      priority: 0.8,
    }));

  // Canonical course URLs live under the university (the page with full content
  // + fee structure + JSON-LD), not the thin /courses/[course-name] route.
  const courseRoutes: MetadataRoute.Sitemap = courses
    .filter((c) => c.slug && c.universitySlug)
    .map((c) => ({
      url: url(`/universities/${c.universitySlug}/${c.slug}`),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    }));

  const blogRoutes: MetadataRoute.Sitemap = BLOG_POSTS.map((p) => ({
    url: url(`/blog/${p.slug}`),
    lastModified: new Date(p.updatedAt),
    changeFrequency: "monthly",
    priority: 0.4,
  }));

  return [...staticRoutes, ...universityRoutes, ...courseRoutes, ...blogRoutes];
}
