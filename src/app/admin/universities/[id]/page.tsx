import { notFound } from "next/navigation";
import { getUniversityById } from "@/lib/db/queries";
import { db } from "@/lib/db";
import { courses, courseFeeStructures } from "@/lib/db/schema";
import { eq, asc, sql } from "drizzle-orm";
import UniversityEditForm from "./UniversityEditForm";

export default async function EditUniversityPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const uni = await getUniversityById(id);
  if (!uni) notFound();

  const uniCourses = await db
    .select({
      id: courses.id,
      name: courses.name,
      slug: courses.slug,
      courseType: courses.courseType,
      deliveryMode: courses.deliveryMode,
      totalFee: sql<string>`(SELECT total_fee FROM ${courseFeeStructures} WHERE course_id = ${courses.id} LIMIT 1)`,
    })
    .from(courses)
    .where(eq(courses.universityId, id))
    .orderBy(asc(courses.name));

  return <UniversityEditForm university={uni} courses={uniCourses} />;
}
