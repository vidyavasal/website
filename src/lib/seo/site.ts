/**
 * Central site / SEO configuration.
 *
 * Everything that needs the canonical domain, org identity, or indexing policy
 * reads from here so there is a single source of truth across metadata,
 * sitemap, robots, manifest and JSON-LD.
 *
 * Indexing is env-driven so STAGING never gets indexed:
 *   - Production (vidyavasal.com): NEXT_PUBLIC_SITE_URL=https://vidyavasal.com
 *   - Staging:                     NEXT_PUBLIC_SITE_URL=https://staging.vidyavasal.com
 *                                  NEXT_PUBLIC_ENABLE_INDEXING=false
 */

const PROD_URL = "https://vidyavasal.com";

function normalizeUrl(url: string): string {
  return url.replace(/\/+$/, "");
}

/** Canonical site origin, e.g. https://vidyavasal.com (no trailing slash). */
export const SITE_URL = normalizeUrl(
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || PROD_URL
);

/**
 * Whether this deployment may be indexed by search engines / AI crawlers.
 * Only the real production domain is indexable, and an explicit
 * NEXT_PUBLIC_ENABLE_INDEXING=false always wins (kill switch for staging).
 */
export const IS_INDEXABLE =
  process.env.NEXT_PUBLIC_ENABLE_INDEXING !== "false" && SITE_URL === PROD_URL;

/** Build an absolute URL from a site-relative path. */
export function absoluteUrl(path = "/"): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/** WhatsApp number in international format without symbols, e.g. 9198XXXXXXXX. */
export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "") || "917034760995";

/** Organization identity — reused by metadata and JSON-LD. */
export const ORG = {
  name: "Vidyavasal",
  legalName: "Vidyavasal Edu",
  tagline: "Learn Anywhere. Grow Everywhere.",
  description:
    "Vidyavasal provides expert university admissions guidance, distance & online education programs, and course/fee information across Kerala and India.",
  logo: absoluteUrl("/logo.svg"),
  email: "info@vidyavasal.com",
  phone: "+91-70347-60995",
  address: {
    region: "Kerala",
    country: "IN",
  },
  languages: ["English", "Malayalam"],
  sameAs: [
    "https://www.facebook.com/vidyavasal",
    "https://www.instagram.com/vidya.vasal",
  ],
} as const;

/**
 * Blog posts currently rendered by /blog (hardcoded until the blog moves to the
 * DB). Kept here so the sitemap and the blog page can share one list.
 */
export const BLOG_POSTS: { slug: string; updatedAt: string }[] = [
  { slug: "benefits-of-distance-education", updatedAt: "2026-05-20" },
  { slug: "montessori-career", updatedAt: "2026-05-15" },
  { slug: "time-management-tips", updatedAt: "2026-05-10" },
];
