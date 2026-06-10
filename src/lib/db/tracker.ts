import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  integer,
  date,
} from "drizzle-orm/pg-core";

// ─────────────────────────────────────────────────────────────────────────────
// Mirror of the TRACKER app's `tracker_leads` table (same shared Neon DB).
//
// The tracker (iode-tracker repo) OWNS this table and its migrations — this
// file is a runtime-only mirror so the public site can write leads straight
// into the tracker's lead portal. It is intentionally NOT referenced from
// schema.ts, so this site's drizzle-kit never tries to create/alter it.
// If the tracker changes the table, update this mirror by hand
// (source of truth: iode-tracker/src/lib/db/schema.ts).
// ─────────────────────────────────────────────────────────────────────────────

export const trackerLeads = pgTable("tracker_leads", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 30 }).notNull(),
  email: varchar("email", { length: 255 }),
  age: integer("age"),
  sex: varchar("sex", { length: 10 }), // male | female | other
  programLevel: varchar("program_level", { length: 30 }), // plus_one | plus_two | degree | pg | diploma | other
  universityId: uuid("university_id"),
  courseId: uuid("course_id"),
  status: varchar("status", { length: 40 }).default("new"),
  subStatus: varchar("sub_status", { length: 80 }),
  source: varchar("source", { length: 60 }).default("web_form"),
  assignedToId: uuid("assigned_to_id"),
  followUpDate: date("follow_up_date"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
