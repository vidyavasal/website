"use client";

import { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const TRACKED_PREFIXES = ["/admin", "/invoice"];

function Tracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Don't track admin/internal routes.
    if (TRACKED_PREFIXES.some((p) => pathname.startsWith(p))) return;

    const payload = {
      event: "page_view",
      path: pathname,
      referrer: document.referrer || undefined,
      utm_source: searchParams.get("utm_source") || undefined,
      utm_medium: searchParams.get("utm_medium") || undefined,
      utm_campaign: searchParams.get("utm_campaign") || undefined,
    };

    const body = JSON.stringify(payload);
    try {
      // fetch (not sendBeacon) so the Set-Cookie response is honoured.
      void fetch("/api/track", {
        method: "POST",
        body,
        headers: { "Content-Type": "application/json" },
        keepalive: true,
      });
    } catch {
      /* ignore */
    }
  }, [pathname, searchParams]);

  return null;
}

/** Fires an anonymous page-view beacon on every client navigation. */
export default function PageTracker() {
  return (
    <Suspense fallback={null}>
      <Tracker />
    </Suspense>
  );
}
