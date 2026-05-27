import Link from "next/link";
import { db } from "@/lib/db";
import { courses, universities, courseFeeStructures } from "@/lib/db/schema";
import { eq, asc, sql } from "drizzle-orm";

async function getCourses() {
  return db
    .select({
      id: courses.id,
      name: courses.name,
      slug: courses.slug,
      courseType: courses.courseType,
      deliveryMode: courses.deliveryMode,
      universityId: courses.universityId,
      universityName: universities.name,
      universitySlug: universities.slug,
      updatedAt: courses.updatedAt,
      totalFee: sql<string>`(SELECT total_fee FROM ${courseFeeStructures} WHERE course_id = ${courses.id} LIMIT 1)`,
    })
    .from(courses)
    .leftJoin(universities, eq(courses.universityId, universities.id))
    .orderBy(asc(universities.name), asc(courses.name));
}

export default async function AdminCoursesPage() {
  const rows = await getCourses();

  // Group by university for display
  const grouped = rows.reduce<Record<string, typeof rows>>((acc, c) => {
    const key = c.universityName ?? "Unknown";
    if (!acc[key]) acc[key] = [];
    acc[key].push(c);
    return acc;
  }, {});

  return (
    <div className="max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Courses</h1>
          <p className="text-sm text-gray-500 mt-1">{rows.length} courses across {Object.keys(grouped).length} universities</p>
        </div>
      </div>

      <div className="space-y-4">
        {Object.entries(grouped).map(([uniName, uniCourses]) => (
          <div key={uniName} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-gray-800">{uniName}</h2>
              <span className="text-xs text-gray-400">{uniCourses.length} courses</span>
            </div>
            <table className="w-full text-sm">
              <tbody>
                {uniCourses.map((c) => (
                  <tr key={c.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-2.5 font-medium text-gray-800">{c.name}</td>
                    <td className="px-4 py-2.5 hidden sm:table-cell">
                      {c.courseType && (
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${c.courseType === "UG" ? "bg-blue-50 text-blue-700" : "bg-purple-50 text-purple-700"}`}>
                          {c.courseType}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-2.5 text-gray-500 hidden md:table-cell text-xs">{c.deliveryMode ?? "—"}</td>
                    <td className="px-4 py-2.5 text-gray-700 text-xs text-right">
                      {c.totalFee ? `₹${Number(c.totalFee).toLocaleString("en-IN")}` : "—"}
                    </td>
                    <td className="px-4 py-2.5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/admin/courses/${c.id}`} className="text-xs text-blue-600 hover:underline">Edit</Link>
                        {c.universitySlug && c.slug && (
                          <Link href={`/universities/${c.universitySlug}/${c.slug}`} target="_blank" className="text-xs text-gray-400 hover:text-gray-600">View ↗</Link>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
}
