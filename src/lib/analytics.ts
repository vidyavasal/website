/**
 * Client-side event tracking.
 *
 * Fires to BOTH:
 *  - GA4 (window.gtag) for the standard funnel reports, and
 *  - our self-hosted /api/track beacon so the tracker panel has owned data.
 *
 * Safe to call from anywhere on the client; no-ops on the server.
 */

export type TrackEvent =
  | "view_university"
  | "view_course"
  | "view_fee"
  | "lead_submit"
  | "whatsapp_click"
  | "brochure_download"
  | "call_click";

type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function track(event: TrackEvent, params: Params = {}): void {
  if (typeof window === "undefined") return;

  // 1) GA4
  try {
    window.gtag?.("event", event, params);
  } catch {
    /* ignore */
  }

  // 2) Self-hosted beacon (best-effort, non-blocking)
  try {
    const body = JSON.stringify({ event, ...params });
    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/track", body);
    } else {
      void fetch("/api/track", {
        method: "POST",
        body,
        headers: { "Content-Type": "application/json" },
        keepalive: true,
      });
    }
  } catch {
    /* ignore */
  }
}
