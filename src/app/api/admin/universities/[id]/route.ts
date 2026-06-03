import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { universities } from "@/lib/db/schema";
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
  const [row] = await db.select().from(universities).where(eq(universities.id, id)).limit(1);
  if (!row) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(row);
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await auth(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const body = await req.json();

  const [row] = await db
    .update(universities)
    .set({
      name: body.name,
      shortName: body.shortName,
      code: body.code,
      slug: body.slug,
      website: body.website,
      universityType: body.universityType,
      state: body.state,
      city: body.city,
      logoUrl: body.logoUrl,
      bannerImage: body.bannerImage,
      galleryImages: body.galleryImages,
      highlights: body.highlights,
      content: body.content,
      isActive: body.isActive,
      updatedAt: new Date(),
    })
    .where(eq(universities.id, id))
    .returning();

  if (!row) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(row);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await auth(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  await db.delete(universities).where(eq(universities.id, id));
  return NextResponse.json({ ok: true });
}
