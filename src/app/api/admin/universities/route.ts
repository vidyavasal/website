import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { universities } from "@/lib/db/schema";
import { verifyJWT, COOKIE_NAME } from "@/lib/auth";
import { asc } from "drizzle-orm";

async function auth(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyJWT(token);
}

export async function GET(req: NextRequest) {
  if (!(await auth(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const rows = await db.select().from(universities).orderBy(asc(universities.name));
  return NextResponse.json(rows);
}

export async function POST(req: NextRequest) {
  if (!(await auth(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const slug = body.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

  const [row] = await db.insert(universities).values({
    name: body.name,
    shortName: body.shortName,
    code: body.code,
    slug: body.slug || slug,
    website: body.website,
    universityType: body.universityType,
    state: body.state,
    city: body.city,
    country: "India",
    isActive: true,
  }).returning();

  return NextResponse.json(row, { status: 201 });
}
