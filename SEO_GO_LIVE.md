# SEO Go-Live Checklist (Vidyavasal)

Phases 1–8 of `SEO_PLAN.md` are **built and building clean**. The steps below are
the deploy-time + external actions that must be done by a human with access to
the database, Vercel, and Google/Bing accounts.

## 1. Database migration (REQUIRED before deploy)
The analytics tables (`visitors`, `page_views`, `leads`) need migration `0002`.
Apply staging first, then production:
```bash
# from /Users/mymac/projects/web/iode
npm run db:migrate            # staging (DATABASE_URL)
# verify the 3 tables exist, then:
npm run db:migrate:prod       # production (DATABASE_URL_PRODUCTION)
```

## 2. Environment variables (set in BOTH Vercel environments)
| Var | Production | Staging/Preview |
|-----|-----------|-----------------|
| `NEXT_PUBLIC_SITE_URL` | `https://vidyavasal.com` | `https://staging.vidyavasal.com` |
| `NEXT_PUBLIC_ENABLE_INDEXING` | `true` (or unset) | `false` |
| `NEXT_PUBLIC_GA_ID` | `G-XXXXXXXXXX` | (leave empty) |
| `GOOGLE_SITE_VERIFICATION` | token from Search Console | — |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | real number, digits only | same |

> Staging stays out of Google automatically because `IS_INDEXABLE` is false
> there (robots → `disallow: /`, sitemap empty, `<meta noindex>`).

## 3. Replace placeholders in `src/lib/seo/site.ts`
- `ORG.phone` — real admissions number
- `ORG.email` — real email
- `ORG.sameAs` — real social URLs
- `BLOG_POSTS` — keep in sync until the blog moves to the DB

## 4. Google Search Console + Bing (Phase 9)
- [ ] Add & verify `vidyavasal.com` (use `GOOGLE_SITE_VERIFICATION`).
- [ ] Submit `https://vidyavasal.com/sitemap.xml`.
- [ ] Request indexing for the homepage, /universities, /courses, top course pages.
- [ ] Repeat verification + sitemap on Bing Webmaster Tools.

## 5. Validate rich results (Phase 9)
- [ ] Google Rich Results Test on a course URL → expect `Course`, `FAQPage`,
      `BreadcrumbList` valid.
- [ ] schema.org validator on a university URL → `CollegeOrUniversity` valid.
- [ ] Confirm `Organization` + `WebSite` on the homepage.

## 6. AI surface check (after crawl, ~days)
- [ ] Confirm `https://vidyavasal.com/llms.txt` resolves and lists universities.
- [ ] Confirm `https://vidyavasal.com/robots.txt` allows GPTBot/ClaudeBot/PerplexityBot.
- [ ] Ask ChatGPT / Perplexity "fees for <course> at <university>" and check that
      Vidyavasal is cited.

## 7. Verify tracking end-to-end
- [ ] Visit a course page in production → a `visitors` row + `page_views` rows
      appear (incl. `view_course` / `view_fee`).
- [ ] Submit the enquiry form → a `leads` row appears, linked to the visitor.
- [ ] Open the tracker panel `/admin/analytics` → KPIs, top courses, fee views,
      lead funnel and the visitor "Journey" drill-down populate.

## 8. Ongoing (weekly)
- [ ] Review GSC: impressions, clicks, coverage, rich-result errors.
- [ ] Review `/admin/analytics` for top courses / fee interest / conversion.
