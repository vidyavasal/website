# Vidyavasal — Production SEO + AI Discoverability + Analytics Plan

Goal: rank on Google **and** be a citable source for ChatGPT / Claude / Perplexity /
Google AI Overviews — so anyone asking about a **university, course, availability,
or fee structure** finds Vidyavasal and turns into a lead. Plus full visitor
tracking (how many, how often, who).

Scope: the **main public site** (`vidyavasal.com`), repo
`/Users/mymac/projects/web/iode`. Analytics surfaces in the **tracker panel**.

> This is Next.js 16 (App Router). Before coding each item, read the matching guide
> in `node_modules/next/dist/docs/` — metadata, sitemap, robots, manifest, and
> `@next/third-parties` conventions differ from older versions.

---

## Decisions locked
- **Analytics:** GA4 + Vercel Analytics **and** self-hosted in-panel tracking.
- **Visitor identity:** anonymous everyone + capture real identity on lead forms,
  then link prior page-views to the lead.
- **AI crawlers:** allow all (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, …).

## Current state (audited 2026-06-08)
- ✅ Strong root metadata + OpenGraph; `generateMetadata` on all dynamic pages.
- ✅ Basic JSON-LD incl. `Course` + `Offer` (price/currency) on course pages.
- ❌ No `sitemap`, `robots`, `manifest`, `llms.txt`.
- ❌ JSON-LD missing `availability`, fee breakdown, `CourseInstance`, FAQ, Breadcrumb,
  site-wide Organization/WebSite.
- ❌ No analytics of any kind; no visit logging; no lead capture.

---

## ⚠️ Staging must not be indexed
`staging.*` / preview deploys must return `noindex` and an empty/disallow robots,
or Google will index staging and split ranking. Drive this from
`NEXT_PUBLIC_SITE_URL`: if it is not the prod domain → emit
`<meta name="robots" content="noindex,nofollow">` + `robots.ts` returning
`disallow: /`. Only `vidyavasal.com` is indexable.

## Env vars (add to both staging + prod)
```
NEXT_PUBLIC_SITE_URL=https://vidyavasal.com         # staging: https://staging.vidyavasal.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
GOOGLE_SITE_VERIFICATION=...                          # Search Console
NEXT_PUBLIC_WHATSAPP_NUMBER=9198XXXXXXXX
NEXT_PUBLIC_ENABLE_INDEXING=true                     # false on staging
```

---

## Phase 1 — Technical SEO foundation
- [ ] **1.1** Add `metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL)` to root
  layout (fixes relative OG/canonical URLs).
- [ ] **1.2** `src/app/sitemap.ts` — dynamic `MetadataRoute.Sitemap`: static pages +
  every active university (`/universities/[slug]`), every course
  (`/universities/[slug]/[courseSlug]` and `/courses/[course-name]`), blog posts.
  `lastModified` from `updatedAt`; sensible `changeFrequency`/`priority`.
- [ ] **1.3** `src/app/robots.ts` — allow all + AI bots; `disallow` `/admin`, `/api`,
  `/invoice`, `/thank-you`; reference the sitemap. On non-prod → `disallow: /`.
- [ ] **1.4** `public/llms.txt` — concise site summary + curated links to the
  university/course/fees index (AI-readable). Optionally `llms-full.txt` with the
  full course+fee catalogue generated from the DB.
- [ ] **1.5** `src/app/manifest.ts` — PWA manifest (name, icons, theme colour).
- [ ] **1.6** Canonical URL on every page via `alternates.canonical`.
- [ ] **1.7** `GOOGLE_SITE_VERIFICATION` into metadata `verification.google`.

## Phase 2 — Structured data (the fee/AI-visibility layer)
Central helpers in `src/lib/seo/jsonld.ts`; inject via a `<JsonLd>` component.
- [ ] **2.1** Site-wide in root layout: `Organization`/`EducationalOrganization`
  (logo, `sameAs` socials, `contactPoint`, address) + `WebSite` with `SearchAction`.
- [ ] **2.2** University page: `CollegeOrUniversity` — address, approvals/accreditation
  (NAAC etc. from `highlights`), `hasOfferCatalog` listing its courses.
- [ ] **2.3** Course page: rich `Course`:
  - `provider` = university `EducationalOrganization`
  - `hasCourseInstance` → `CourseInstance` (`courseMode` online/distance, duration)
  - `offers` → `AggregateOffer` over the fee breakdown (registration, admission,
    course, exam, total) — each `price`, `priceCurrency: INR`, **`availability`**,
    `category`, `url`, `priceValidUntil`, `seller`.
  - `educationalCredentialAwarded`, `timeToComplete`, eligibility.
- [ ] **2.4** `FAQPage` on course/university pages — auto-generate Q&A from data:
  "What is the fee for {course} at {university}?", "Is {course} available online?",
  "What is the eligibility / duration?". This is what AI Overviews & Perplexity quote.
- [ ] **2.5** `BreadcrumbList` on all deep pages; `ItemList` on listing pages.
- [ ] **2.6** Validate every type in Google Rich Results Test + schema.org validator.

## Phase 3 — On-page content SEO
- [ ] **3.1** Render fee structure as a real HTML `<table>` (crawlable text, not an
  image) with clear labels and totals.
- [ ] **3.2** Visible **FAQ accordion** mirroring the FAQ schema.
- [ ] **3.3** Unique, templated `title`/`description` per page pulling university +
  course + fee + mode keywords from the DB.
- [ ] **3.4** Semantic headings (one `h1`, structured `h2/h3`), descriptive image
  `alt`, internal links (university ↔ courses ↔ related, breadcrumbs).
- [ ] **3.5** Programmatic landing pages for high-intent queries: `[course] fees`,
  `[course] in [mode]`, `[university] courses & fees` (from DB, indexable).

## Phase 4 — Third-party analytics
- [ ] **4.1** GA4 via `@next/third-parties/google` `<GoogleAnalytics gaId=...>` in
  root layout (prod only). Custom events: `view_university`, `view_course`,
  `view_fee`, `lead_submit`, `whatsapp_click`, `brochure_download`.
- [ ] **4.2** `@vercel/analytics` + `@vercel/speed-insights` components.
- [ ] **4.3** Google Search Console + Bing Webmaster: verify, submit sitemap.

## Phase 5 — Self-hosted tracking (owned by the MAIN site; tracker reads it)
New tables in the **main site's** drizzle schema + migration (staging→prod):
- [ ] **5.1** Tables:
  - `visitors` — anon id (httpOnly cookie), first/last seen, country, city, device,
    referrer, landing utm (source/medium/campaign), visit count.
  - `page_views` — visitorId, path, `entityType` (university|course|blog),
    `entityId`, referrer, utm, createdAt.
  - `leads` — name, phone, email, source, utm, `visitorId`, interested
    universityId/courseId, status, createdAt.  (links anonymous history → identity)
- [ ] **5.2** `POST /api/track` — lightweight beacon called on each page; sets the
  visitor cookie; derives geo from Vercel headers (`x-vercel-ip-country/-city`);
  never stores raw IP (country/city only).
- [ ] **5.3** Cookie-consent banner (India DPDP / GDPR friendly); gate non-essential
  analytics on consent.
- [ ] **5.4** Privacy policy update (data collected, retention).

## Phase 6 — Lead capture ("who visited")
- [ ] **6.1** Enquiry forms on course/university pages: "Get fee details",
  "Check eligibility", "Apply now" → create `leads`, link `visitorId`, fire
  `lead_submit` (GA) + record source/utm.
- [ ] **6.2** WhatsApp click-to-chat (prefilled course/university message) using
  `NEXT_PUBLIC_WHATSAPP_NUMBER`; track `whatsapp_click`.
- [ ] **6.3** Gated brochure / fee-structure PDF download (phone → lead).
- [ ] **6.4** UTM capture from URL persisted to visitor + lead.
- [ ] **6.5** Pipe new leads into the tracker's pipeline (they can become
  `tracker_students` on admission).

## Phase 7 — Analytics dashboard in the tracker panel
In `iode-tracker` (`panel.vidyavasal.com`), read the main-site tracking tables via
the `external.ts` mirror:
- [ ] **7.1** `/admin/analytics` — total & unique visitors, repeat-visit rate,
  top universities/courses viewed, **fee-page views**, geo & device breakdown,
  traffic sources/UTM, lead conversion funnel.
- [ ] **7.2** Per-university / per-course drill-down (views → leads → admissions).
- [ ] **7.3** "Who visited" view: lead profiles with their full page-view history
  (joined via `visitorId`).

## Phase 8 — Performance / Core Web Vitals
- [ ] **8.1** `next/image` everywhere (ImageKit) with correct `sizes`; preconnect CDN.
- [ ] **8.2** Static/ISR for university & course pages (cache, fast TTFB).
- [ ] **8.3** Lazy-load below-the-fold; trim client JS; keep fonts `display: swap`.
- [ ] **8.4** Monitor LCP/CLS/INP via Speed Insights; target all "Good".

## Phase 9 — Submit, verify, monitor
- [ ] **9.1** Submit sitemap to GSC + Bing; request indexing of key pages.
- [ ] **9.2** Confirm `Course`/`FAQ`/`Breadcrumb`/`Organization` pass Rich Results.
- [ ] **9.3** Test AI surfaces: ask ChatGPT/Perplexity about "{course} fees at
  {university}" after crawl; confirm Vidyavasal is cited.
- [ ] **9.4** Weekly GSC review (impressions, clicks, coverage, rich-result errors).

---

## Build order
`1 → 2 → 3` (discoverability + fee visibility, the core ask) →
`4 → 5 → 6` (measurement + leads) → `7` (panel) → `8 → 9` (polish + verify).

Phases 1–3 deliver the headline goal — Google **and** AI tools surfacing your
courses/fees as linked, citable sources. Phases 5–7 deliver "how many / how
often / who". Do Phase 1 first; everything else layers on top.
