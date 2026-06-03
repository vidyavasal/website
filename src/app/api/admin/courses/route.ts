import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { courses, universities, courseCategories, courseFeeStructures } from "@/lib/db/schema";
import { eq, asc, sql } from "drizzle-orm";
import { verifyJWT, COOKIE_NAME } from "@/lib/auth";

async function auth(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyJWT(token);
}

export async function GET(req: NextRequest) {
  if (!(await auth(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const universityId = searchParams.get("universityId");

  let query = db
    .select({
      id: courses.id,
      name: courses.name,
      slug: courses.slug,
      courseType: courses.courseType,
      deliveryMode: courses.deliveryMode,
      universityId: courses.universityId,
      universityName: universities.name,
      updatedAt: courses.updatedAt,
      totalFee: sql<string>`(SELECT total_fee FROM ${courseFeeStructures} WHERE course_id = ${courses.id} LIMIT 1)`,
    })
    .from(courses)
    .leftJoin(universities, eq(courses.universityId, universities.id))
    .leftJoin(courseCategories, eq(courses.categoryId, courseCategories.id))
    .orderBy(asc(universities.name), asc(courses.name));

  if (universityId) {
    // @ts-expect-error drizzle where chaining
    query = query.where(eq(courses.universityId, universityId));
  }

  const rows = await query;
  return NextResponse.json(rows);
}
