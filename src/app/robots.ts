import type { MetadataRoute } from "next";
import { SITE_URL, IS_INDEXABLE } from "@/lib/seo/site";

/**
 * AI / LLM crawlers we explicitly welcome so our course & fee pages can be
 * cited as a source by ChatGPT, Claude, Perplexity, Google AI, etc.
 */
const AI_CRAWLERS = [
  "GPTBot", // OpenAI training
  "OAI-SearchBot", // ChatGPT search
  "ChatGPT-User", // ChatGPT browsing
  "ClaudeBot", // Anthropic
  "Claude-Web",
  "anthropic-ai",
  "PerplexityBot", // Perplexity index
  "Perplexity-User",
  "Google-Extended", // Google Gemini / AI Overviews
  "Applebot-Extended",
  "CCBot", // Common Crawl
  "Amazonbot",
  "cohere-ai",
];

const DISALLOWED_PATHS = ["/admin", "/api/", "/invoice", "/thank-you"];

export default function robots(): MetadataRoute.Robots {
  // Staging / preview: keep everything out of every index.
  if (!IS_INDEXABLE) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: DISALLOWED_PATHS },
      // Allow all AI crawlers full access to public content.
      ...AI_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: DISALLOWED_PATHS,
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
