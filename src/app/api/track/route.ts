import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { visitors, pageViews } from "@/lib/db/schema";
import { eq, sql } from "drizzle-orm";

export const runtime = "nodejs";

const VISITOR_COOKIE = "vv_vid";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

function detectDevice(ua: string): string {
  if (/mobile|iphone|android.*mobile/i.test(ua)) return "mobile";
  if (/ipad|tablet|android(?!.*mobile)/i.test(ua)) return "tablet";
  return "desktop";
}

function detectBrowser(ua: string): string {
  if (/edg/i.test(ua)) return "Edge";
  if (/chrome|crios/i.test(ua)) return "Chrome";
  if (/firefox|fxios/i.test(ua)) return "Firefox";
  if (/safari/i.test(ua)) return "Safari";
  return "Other";
}

function detectOS(ua: string): string {
  if (/windows/i.test(ua)) return "Windows";
  if (/android/i.test(ua)) return "Android";
  if (/iphone|ipad|ios/i.test(ua)) return "iOS";
  if (/mac os/i.test(ua)) return "macOS";
  if (/linux/i.test(ua)) return "Linux";
  return "Other";
}

type Body = {
  event?: string;
  path?: string;
  entityType?: string;
  entityId?: string;
  referrer?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
};

export async function POST(req: NextRequest) {
  let body: Body = {};
  try {
    body = await req.json();
  } catch {
    /* sendBeacon may send text; tolerate empty */
  }

  const ua = req.headers.get("user-agent") ?? "";
  // Coarse geo from the edge — never the raw IP.
  const country = req.headers.get("x-vercel-ip-country") ?? null;
  const city = req.headers.get("x-vercel-ip-city")
    ? decodeURIComponent(req.headers.get("x-vercel-ip-city")!)
    : null;
  const region = req.headers.get("x-vercel-ip-country-region") ?? null;

  const existingId = req.cookies.get(VISITOR_COOKIE)?.value;
  let visitorId = existingId;

  try {
    if (existingId) {
      // Returning visitor — bump counters.
      const updated = await db
        .update(visitors)
        .set({ lastSeen: new Date(), visitCount: sql`${visitors.visitCount} + 1` })
        .where(eq(visitors.id, existingId))
        .returning({ id: visitors.id });
      if (!updated.length) visitorId = undefined; // cookie pointed at a purged row
    }

    if (!visitorId) {
      const [created] = await db
        .insert(visitors)
        .values({
          country,
          city,
          region,
          device: detectDevice(ua),
          browser: detectBrowser(ua),
          os: detectOS(ua),
          referrer: body.referrer ?? req.headers.get("referer") ?? null,
          landingPath: body.path ?? null,
          utmSource: body.utm_source ?? null,
          utmMedium: body.utm_medium ?? null,
          utmCampaign: body.utm_campaign ?? null,
        })
        .returning({ id: visitors.id });
      visitorId = created.id;
    }

    await db.insert(pageViews).values({
      visitorId,
      event: body.event ?? "page_view",
      path: body.path ?? null,
      entityType: body.entityType ?? null,
      entityId: body.entityId ?? null,
      referrer: body.referrer ?? null,
    });
  } catch {
    // Tracking must never break the page; swallow and ack.
    return NextResponse.json({ ok: false }, { status: 200 });
  }

  const res = NextResponse.json({ ok: true });
  if (visitorId && visitorId !== existingId) {
    res.cookies.set(VISITOR_COOKIE, visitorId, {
      httpOnly: true,
      sameSite: "lax",
      secure: true,
      maxAge: COOKIE_MAX_AGE,
      path: "/",
    });
  }
  return res;
}
