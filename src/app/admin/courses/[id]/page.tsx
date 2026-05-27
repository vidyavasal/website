import { notFound } from "next/navigation";
import { getCourseById } from "@/lib/db/queries";
import CourseEditForm from "./CourseEditForm";

export default async function EditCoursePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const course = await getCourseById(id);
  if (!course) notFound();
  return <CourseEditForm course={course} />;
}
