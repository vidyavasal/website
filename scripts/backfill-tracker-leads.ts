/**
 * Backfill public-site leads into the tracker portal.
 *
 * Historically the fee-gate / campaign-funnel / admission / contact server
 * actions wrote ONLY to the site's `leads` table (analytics), never to
 * `tracker_leads` — so those leads showed on /admin/analytics but were
 * missing from panel → Leads. New submissions are now mirrored at capture
 * time (src/lib/tracker-lead.ts); this script copies the historical rows.
 *
 * One tracker lead per phone number (matched on the last 10 digits): the
 * newest site lead provides name/contact/course, every message is preserved
 * in notes (dated, oldest first), created_at keeps the first enquiry date.
 * Phones already present in tracker_leads are skipped, so the script is
 * idempotent and never duplicates or deletes anything.
 *
 * Usage:
 *   npx tsx scripts/backfill-tracker-leads.ts --dry-run   # staging, report only
 *   npx tsx scripts/backfill-tracker-leads.ts             # staging, apply
 *   npx tsx scripts/backfill-tracker-leads.ts --prod      # production, apply
 */
import { neon } from "@neondatabase/serverless";
import { resolveDatabaseUrl } from "./env";

// One aggregated row per phone: newest non-null value wins for identity
// fields, notes collects every message with its date, created_at keeps the
// earliest enquiry.
const MISSING_LEADS_SQL = `
  WITH site AS (
    SELECT
      right(regexp_replace(phone, '\\D', '', 'g'), 10) AS phone_key,
      (array_agg(name ORDER BY created_at DESC) FILTER (WHERE nullif(trim(name), '') IS NOT NULL))[1] AS name,
      (array_agg(phone ORDER BY created_at DESC))[1] AS phone,
      (array_agg(email ORDER BY created_at DESC) FILTER (WHERE nullif(trim(email), '') IS NOT NULL))[1] AS email,
      (array_agg(university_id ORDER BY created_at DESC) FILTER (WHERE university_id IS NOT NULL))[1] AS university_id,
      (array_agg(course_id ORDER BY created_at DESC) FILTER (WHERE course_id IS NOT NULL))[1] AS course_id,
      (array_agg(source ORDER BY created_at DESC) FILTER (WHERE nullif(trim(source), '') IS NOT NULL))[1] AS source,
      string_agg('[' || to_char(created_at, 'YYYY-MM-DD') || '] ' || message, E'\\n' ORDER BY created_at)
        FILTER (WHERE nullif(trim(message), '') IS NOT NULL) AS notes,
      min(created_at) AS created_at,
      count(*)::int AS submissions
    FROM leads
    WHERE phone IS NOT NULL
      AND length(regexp_replace(phone, '\\D', '', 'g')) >= 8
    GROUP BY 1
  )
  SELECT s.*
  FROM site s
  WHERE NOT EXISTS (
    SELECT 1 FROM tracker_leads t
    WHERE right(regexp_replace(t.phone, '\\D', '', 'g'), 10) = s.phone_key
  )
  ORDER BY s.created_at
`;

type Row = {
  phone_key: string;
  name: string | null;
  phone: string;
  email: string | null;
  university_id: string | null;
  course_id: string | null;
  source: string | null;
  notes: string | null;
  created_at: string | Date; // neon returns Date for timestamp columns
  submissions: number;
};

async function main() {
  const { url, target } = resolveDatabaseUrl(process.argv);
  const dryRun = process.argv.includes("--dry-run");
  const sql = neon(url);

  const rows = (await sql.query(MISSING_LEADS_SQL)) as Row[];
  console.log(
    `${target}: ${rows.length} site lead(s) missing from tracker_leads` +
      (dryRun ? " (dry-run, nothing written)" : "")
  );

  for (const r of rows) {
    console.log(
      `  ${new Date(r.created_at).toISOString().slice(0, 10)}  ${r.name ?? "Unknown"}  ${r.phone}` +
        `  [${r.source ?? "web_form"}]` +
        (r.submissions > 1 ? `  (${r.submissions} submissions)` : "")
    );
    if (dryRun) continue;
    await sql.query(
      `INSERT INTO tracker_leads
         (name, phone, email, university_id, course_id,
          status, sub_status, source, notes, created_at)
       VALUES ($1, $2, $3, $4, $5, 'new', 'Website enquiry', $6, $7, $8)`,
      [
        r.name ?? "Unknown",
        r.phone,
        r.email,
        r.university_id,
        r.course_id,
        r.source && r.source.length <= 60 ? r.source : "web_form",
        r.notes,
        r.created_at,
      ]
    );
  }

  console.log(
    dryRun
      ? `\nDry-run done (${target}). Re-run without --dry-run to apply.`
      : `\nDone (${target}): ${rows.length} lead(s) copied into tracker_leads.`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
