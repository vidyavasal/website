import { desc, eq, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { trackerLeads } from "@/lib/db/tracker";

// ─────────────────────────────────────────────────────────────────────────────
// Every public lead capture point (fee gate, admission CTA, campaign funnel,
// contact form, enquiry widget) must ALSO land in the tracker portal's
// `tracker_leads` table (shared Neon DB) or the sales team never sees it at
// panel → Leads. This is the single mirror used by src/lib/actions/leads.ts
// and /api/leads.
// ─────────────────────────────────────────────────────────────────────────────

export type TrackerLeadMirror = {
  name?: string | null;
  phone: string;
  email?: string | null;
  universityId?: string | null;
  courseId?: string | null;
  /** e.g. fee_request | admission_request | campaign_suggest | contact_form */
  source?: string | null;
  /** The lead's message — stored on tracker notes so staff see the context. */
  notes?: string | null;
};

const last10 = (phone: string) => phone.replace(/\D/g, "").slice(-10);

/**
 * Mirror a public-site lead into `tracker_leads`.
 *
 * Never throws — the site's own `leads` row is already stored and analytics
 * counts it; a mirror hiccup must not fail the visitor's submission.
 *
 * Dedupe: repeat submissions from the same phone while the tracker lead is
 * still unworked (status "new") append to that lead's notes instead of
 * stacking duplicate rows in the panel. Once staff move the lead past "new"
 * (or it is converted/lost), a fresh enquiry opens a fresh lead.
 */
export async function mirrorLeadToTracker(
  input: TrackerLeadMirror
): Promise<void> {
  try {
    const phoneKey = last10(input.phone);
    const note = input.notes?.trim() || null;
    const stampedNote = note
      ? `[${new Date().toISOString().slice(0, 10)}] ${note}`
      : null;

    const [existing] = await db
      .select({
        id: trackerLeads.id,
        status: trackerLeads.status,
        notes: trackerLeads.notes,
        email: trackerLeads.email,
        universityId: trackerLeads.universityId,
        courseId: trackerLeads.courseId,
      })
      .from(trackerLeads)
      .where(
        sql`right(regexp_replace(${trackerLeads.phone}, '\\D', '', 'g'), 10) = ${phoneKey}`
      )
      .orderBy(desc(trackerLeads.createdAt))
      .limit(1);

    if (existing && existing.status === "new") {
      await db
        .update(trackerLeads)
        .set({
          notes:
            [existing.notes, stampedNote].filter(Boolean).join("\n") || null,
          email: existing.email ?? input.email?.trim() ?? null,
          universityId: existing.universityId ?? input.universityId ?? null,
          courseId: existing.courseId ?? input.courseId ?? null,
          updatedAt: new Date(),
        })
        .where(eq(trackerLeads.id, existing.id));
      return;
    }

    await db.insert(trackerLeads).values({
      name: input.name?.trim() || "Unknown",
      phone: input.phone,
      email: input.email?.trim() || null,
      universityId: input.universityId || null,
      courseId: input.courseId || null,
      status: "new",
      subStatus: "Website enquiry",
      source:
        input.source && input.source.length <= 60 ? input.source : "web_form",
      notes: stampedNote,
    });
  } catch (err) {
    // Log loudly but swallow — see contract above.
    console.error("[tracker-mirror] failed to mirror lead into tracker:", err);
  }
}
