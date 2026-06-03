import {
  pgTable,
  uuid,
  varchar,
  text,
  boolean,
  timestamp,
  numeric,
  integer,
  jsonb,
  index,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// ============================================
// Admin Users
// ============================================
export const adminUsers = pgTable("admin_users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: varchar("email", { length: 255 }).unique().notNull(),
  passwordHash: text("password_hash").notNull(),
  name: varchar("name", { length: 255 }),
  role: varchar("role", { length: 50 }).default("admin"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ============================================
// Universities
// ============================================
export const universities = pgTable(
  "universities",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    code: varchar("code", { length: 50 }).unique(),
    name: varchar("name", { length: 255 }).notNull(),
    shortName: varchar("short_name", { length: 100 }),
    slug: varchar("slug", { length: 255 }).unique(),
    logoUrl: text("logo_url"),
    bannerImage: text("banner_image"),
    galleryImages: text("gallery_images").array(),
    highlights: jsonb("highlights"), // { naac, established, approvals, students, accreditation }
    content: text("content"),        // markdown brochure body
    website: text("website"),
    universityType: varchar("university_type", { length: 100 }),
    country: varchar("country", { length: 100 }).default("India"),
    state: varchar("state", { length: 100 }),
    city: varchar("city", { length: 100 }),
    isActive: boolean("is_active").default(true),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (table) => [
    index("idx_universities_slug").on(table.slug),
  ]
);

export const universitiesRelations = relations(universities, ({ many }) => ({
  courses: many(courses),
}));

// ============================================
// Course Categories
// ============================================
export const courseCategories = pgTable("course_categories", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 100 }).unique().notNull(),
  slug: varchar("slug", { length: 100 }).unique(),
});

export const courseCategoriesRelations = relations(
  courseCategories,
  ({ many }) => ({
    courses: many(courses),
  })
);

// ============================================
// Courses
// ============================================
export const courses = pgTable(
  "courses",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    universityId: uuid("university_id").references(() => universities.id, {
      onDelete: "cascade",
    }),
    categoryId: uuid("category_id").references(() => courseCategories.id),
    name: varchar("name", { length: 255 }).notNull(),
    shortName: varchar("short_name", { length: 100 }),
    slug: varchar("slug", { length: 255 }),
    courseType: varchar("course_type", { length: 100 }),
    deliveryMode: varchar("delivery_mode", { length: 100 }),
    durationYears: numeric("duration_years", { precision: 4, scale: 2 }),
    totalSemesters: integer("total_semesters"),
    eligibility: text("eligibility"),
    description: text("description"),
    content: text("content"),         // markdown brochure body
    bannerImage: text("banner_image"),
    isOnline: boolean("is_online").default(true),
    isDistance: boolean("is_distance").default(false),
    tags: text("tags").array(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (table) => [
    index("idx_courses_university").on(table.universityId),
    index("idx_courses_category").on(table.categoryId),
    index("idx_courses_type").on(table.courseType),
    index("idx_courses_duration").on(table.durationYears),
  ]
);

export const coursesRelations = relations(courses, ({ one, many }) => ({
  university: one(universities, {
    fields: [courses.universityId],
    references: [universities.id],
  }),
  category: one(courseCategories, {
    fields: [courses.categoryId],
    references: [courseCategories.id],
  }),
  feeStructure: many(courseFeeStructures),
}));

// ============================================
// Course Fee Structures
// ============================================
export const courseFeeStructures = pgTable(
  "course_fee_structures",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    courseId: uuid("course_id").references(() => courses.id, {
      onDelete: "cascade",
    }),
    registrationFee: numeric("registration_fee", {
      precision: 10,
      scale: 2,
    }).default("0"),
    admissionFee: numeric("admission_fee", {
      precision: 10,
      scale: 2,
    }).default("0"),
    courseFee: numeric("course_fee", { precision: 10, scale: 2 }).default("0"),
    examFee: numeric("exam_fee", { precision: 10, scale: 2 }).default("0"),
    yearlyFee: numeric("yearly_fee", { precision: 10, scale: 2 }),
    totalFee: numeric("total_fee", { precision: 10, scale: 2 }),
    currency: varchar("currency", { length: 10 }).default("INR"),
    emiAvailable: boolean("emi_available").default(false),
    metadata: jsonb("metadata"),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => [
    index("idx_course_fee_total").on(table.totalFee),
  ]
);

export const courseFeeStructuresRelations = relations(
  courseFeeStructures,
  ({ one, many }) => ({
    course: one(courses, {
      fields: [courseFeeStructures.courseId],
      references: [courses.id],
    }),
    breakdowns: many(courseFeeBreakdowns),
  })
);

// ============================================
// Course Fee Breakdowns
// ============================================
export const courseFeeBreakdowns = pgTable("course_fee_breakdowns", {
  id: uuid("id").primaryKey().defaultRandom(),
  feeStructureId: uuid("fee_structure_id").references(
    () => courseFeeStructures.id,
    { onDelete: "cascade" }
  ),
  label: varchar("label", { length: 100 }),
  amount: numeric("amount", { precision: 10, scale: 2 }),
  sortOrder: integer("sort_order"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const courseFeeBreakdownsRelations = relations(
  courseFeeBreakdowns,
  ({ one }) => ({
    feeStructure: one(courseFeeStructures, {
      fields: [courseFeeBreakdowns.feeStructureId],
      references: [courseFeeStructures.id],
    }),
  })
);

// ============================================
// Type Exports
// ============================================
export type AdminUser = typeof adminUsers.$inferSelect;
export type NewAdminUser = typeof adminUsers.$inferInsert;
export type University = typeof universities.$inferSelect;
export type NewUniversity = typeof universities.$inferInsert;
export type CourseCategory = typeof courseCategories.$inferSelect;
export type NewCourseCategory = typeof courseCategories.$inferInsert;
export type Course = typeof courses.$inferSelect;
export type NewCourse = typeof courses.$inferInsert;
export type CourseFeeStructure = typeof courseFeeStructures.$inferSelect;
export type NewCourseFeeStructure = typeof courseFeeStructures.$inferInsert;
export type CourseFeeBreakdown = typeof courseFeeBreakdowns.$inferSelect;
export type NewCourseFeeBreakdown = typeof courseFeeBreakdowns.$inferInsert;
