import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { courses, courseFeeStructures } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { verifyJWT, COOKIE_NAME } from "@/lib/auth";

async function auth(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyJWT(token);
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await auth(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;

  const [course] = await db.select().from(courses).where(eq(courses.id, id)).limit(1);
  if (!course) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const [fee] = await db.select().from(courseFeeStructures).where(eq(courseFeeStructures.courseId, id)).limit(1);
  return NextResponse.json({ ...course, feeStructure: fee ?? null });
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await auth(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const body = await req.json();

  // Update course
  const [course] = await db
    .update(courses)
    .set({
      name: body.name,
      shortName: body.shortName,
      slug: body.slug,
      courseType: body.courseType,
      deliveryMode: body.deliveryMode,
      durationYears: body.durationYears,
      totalSemesters: body.totalSemesters,
      eligibility: body.eligibility,
      description: body.description,
      content: body.content,
      bannerImage: body.bannerImage,
      isOnline: body.isOnline,
      isDistance: body.isDistance,
      tags: body.tags,
      updatedAt: new Date(),
    })
    .where(eq(courses.id, id))
    .returning();

  // Update fee structure
  if (body.feeStructure && course) {
    const existingFee = await db.select().from(courseFeeStructures).where(eq(courseFeeStructures.courseId, id)).limit(1);
    if (existingFee.length > 0) {
      await db.update(courseFeeStructures).set({
        registrationFee: body.feeStructure.registrationFee?.toString(),
        admissionFee: body.feeStructure.admissionFee?.toString(),
        courseFee: body.feeStructure.courseFee?.toString(),
        examFee: body.feeStructure.examFee?.toString(),
        yearlyFee: body.feeStructure.yearlyFee?.toString(),
        totalFee: body.feeStructure.totalFee?.toString(),
        emiAvailable: body.feeStructure.emiAvailable,
      }).where(eq(courseFeeStructures.courseId, id));
    }
  }

  return NextResponse.json(course);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await auth(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  await db.delete(courses).where(eq(courses.id, id));
  return NextResponse.json({ ok: true });
}
