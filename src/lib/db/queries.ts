import { db } from ".";
import {
  universities,
  courses,
  courseCategories,
  courseFeeStructures,
  adminUsers,
} from "./schema";
import { eq, sql, ilike, or, asc, desc } from "drizzle-orm";

// ─── Admin Stats ────────────────────────────────────────────────────────────

export async function getAdminStats() {
  const [uniCount] = await db.select({ count: sql<number>`count(*)` }).from(universities);
  const [courseCount] = await db.select({ count: sql<number>`count(*)` }).from(courses);
  const [catCount] = await db.select({ count: sql<number>`count(*)` }).from(courseCategories);
  const [feeCount] = await db.select({ count: sql<number>`count(*)` }).from(courseFeeStructures);
  return {
    universities: Number(uniCount.count),
    courses: Number(courseCount.count),
    categories: Number(catCount.count),
    feeRecords: Number(feeCount.count),
  };
}

// ─── Universities ────────────────────────────────────────────────────────────

export async function getUniversities() {
  const rows = await db
    .select({
      id: universities.id,
      name: universities.name,
      shortName: universities.shortName,
      slug: universities.slug,
      code: universities.code,
      bannerImage: universities.bannerImage,
      logoUrl: universities.logoUrl,
      universityType: universities.universityType,
      state: universities.state,
      city: universities.city,
      website: universities.website,
      isActive: universities.isActive,
      highlights: universities.highlights,
      updatedAt: universities.updatedAt,
      courseCount: sql<number>`(
        SELECT count(*) FROM courses WHERE courses.university_id = universities.id
      )`,
    })
    .from(universities)
    .where(eq(universities.isActive, true))
    .orderBy(asc(universities.name));

  return rows;
}

export async function getUniversityById(id: string) {
  const [uni] = await db.select().from(universities).where(eq(universities.id, id)).limit(1);
  return uni ?? null;
}

export async function getUniversityBySlug(slug: string) {
  const [uni] = await db
    .select()
    .from(universities)
    .where(eq(universities.slug, slug))
    .limit(1);

  if (!uni) return null;

  const uniCourses = await db
    .select({
      id: courses.id,
      name: courses.name,
      shortName: courses.shortName,
      slug: courses.slug,
      courseType: courses.courseType,
      deliveryMode: courses.deliveryMode,
      durationYears: courses.durationYears,
      totalSemesters: courses.totalSemesters,
      bannerImage: courses.bannerImage,
      description: courses.description,
      isOnline: courses.isOnline,
      isDistance: courses.isDistance,
      tags: courses.tags,
      totalFee: sql<string>`(
        SELECT total_fee FROM course_fee_structures WHERE course_id = courses.id LIMIT 1
      )`,
    })
    .from(courses)
    .where(eq(courses.universityId, uni.id))
    .orderBy(asc(courses.name));

  return { ...uni, courses: uniCourses };
}

// ─── Courses ──────────────────────────────────────────────────────────────────

export type CourseFilter = {
  search?: string;
  courseType?: string;
  deliveryMode?: string;
  universityId?: string;
  sortBy?: "fee_asc" | "fee_desc" | "name_asc";
};

export async function getCourses(filter: CourseFilter = {}) {
  const conditions = [];
  if (filter.courseType) conditions.push(eq(courses.courseType, filter.courseType));
  if (filter.deliveryMode) conditions.push(eq(courses.deliveryMode, filter.deliveryMode));
  if (filter.universityId) conditions.push(eq(courses.universityId, filter.universityId));
  if (filter.search) {
    conditions.push(
      or(
        ilike(courses.name, `%${filter.search}%`),
        ilike(universities.name, `%${filter.search}%`)
      )
    );
  }

  const orderCol =
    filter.sortBy === "fee_asc"
      ? asc(sql`total_fee_sub`)
      : filter.sortBy === "fee_desc"
      ? desc(sql`total_fee_sub`)
      : asc(courses.name);

  const rows = await db
    .select({
      id: courses.id,
      name: courses.name,
      shortName: courses.shortName,
      slug: courses.slug,
      courseType: courses.courseType,
      deliveryMode: courses.deliveryMode,
      durationYears: courses.durationYears,
      bannerImage: courses.bannerImage,
      description: courses.description,
      isOnline: courses.isOnline,
      isDistance: courses.isDistance,
      universityId: courses.universityId,
      universityName: universities.name,
      universitySlug: universities.slug,
      categoryName: courseCategories.name,
      totalFee: sql<string | null>`(
        SELECT total_fee FROM course_fee_structures WHERE course_id = courses.id LIMIT 1
      )`.as("total_fee_sub"),
    })
    .from(courses)
    .leftJoin(universities, eq(courses.universityId, universities.id))
    .leftJoin(courseCategories, eq(courses.categoryId, courseCategories.id))
    .where(conditions.length > 0 ? sql`${conditions.reduce((a, b) => sql`${a} AND ${b}`)}` : undefined)
    .orderBy(orderCol);

  return rows;
}

export async function getCourseById(id: string) {
  const [course] = await db
    .select({
      id: courses.id,
      name: courses.name,
      shortName: courses.shortName,
      slug: courses.slug,
      courseType: courses.courseType,
      deliveryMode: courses.deliveryMode,
      durationYears: courses.durationYears,
      totalSemesters: courses.totalSemesters,
      eligibility: courses.eligibility,
      description: courses.description,
      content: courses.content,
      bannerImage: courses.bannerImage,
      isOnline: courses.isOnline,
      isDistance: courses.isDistance,
      tags: courses.tags,
      universityId: courses.universityId,
      categoryId: courses.categoryId,
      createdAt: courses.createdAt,
      updatedAt: courses.updatedAt,
      universityName: universities.name,
      universitySlug: universities.slug,
      categoryName: courseCategories.name,
    })
    .from(courses)
    .leftJoin(universities, eq(courses.universityId, universities.id))
    .leftJoin(courseCategories, eq(courses.categoryId, courseCategories.id))
    .where(eq(courses.id, id))
    .limit(1);

  if (!course) return null;

  const [fee] = await db
    .select()
    .from(courseFeeStructures)
    .where(eq(courseFeeStructures.courseId, id))
    .limit(1);

  return { ...course, feeStructure: fee ?? null };
}

export async function getCourseBySlug(uniSlug: string, courseSlug: string) {
  const uni = await getUniversityBySlug(uniSlug);
  if (!uni) return null;

  const [course] = await db
    .select()
    .from(courses)
    .where(eq(courses.slug, courseSlug))
    .limit(1);

  if (!course || course.universityId !== uni.id) return null;

  const [fee] = await db
    .select()
    .from(courseFeeStructures)
    .where(eq(courseFeeStructures.courseId, course.id))
    .limit(1);

  // Other courses from same university
  const sibling = await db
    .select({ id: courses.id, name: courses.name, slug: courses.slug, courseType: courses.courseType, bannerImage: courses.bannerImage, totalFee: sql<string>`(SELECT total_fee FROM course_fee_structures WHERE course_id = courses.id LIMIT 1)` })
    .from(courses)
    .where(eq(courses.universityId, uni.id))
    .limit(5);

  return {
    ...course,
    feeStructure: fee ?? null,
    university: uni,
    siblingCourses: sibling.filter((c) => c.id !== course.id).slice(0, 4),
  };
}

// ─── Admin users ──────────────────────────────────────────────────────────────

export async function getAdminUserByEmail(email: string) {
  const [user] = await db
    .select()
    .from(adminUsers)
    .where(eq(adminUsers.email, email.toLowerCase().trim()))
    .limit(1);
  return user ?? null;
}
