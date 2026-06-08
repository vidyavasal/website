"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const CONSENT_KEY = "vv_cookie_consent";

/**
 * Lightweight cookie-consent banner (India DPDP / GDPR friendly).
 *
 * Essential, anonymous first-party analytics run on a legitimate-interest basis.
 * This banner records the visitor's choice and, on "accept", enables Google
 * Analytics via Consent Mode (gtag 'consent' 'update').
 */
export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Defer the state update out of the effect body to avoid cascading renders
    // and any hydration mismatch (server + first client render both hidden).
    const id = requestAnimationFrame(() => {
      if (!localStorage.getItem(CONSENT_KEY)) setShow(true);
    });
    return () => cancelAnimationFrame(id);
  }, []);

  const decide = (granted: boolean) => {
    localStorage.setItem(CONSENT_KEY, granted ? "granted" : "denied");
    try {
      window.gtag?.("consent", "update", {
        analytics_storage: granted ? "granted" : "denied",
        ad_storage: "denied",
      });
    } catch {
      /* gtag may not be present */
    }
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 print:hidden">
      <div className="mx-auto max-w-4xl m-3 rounded-2xl border border-gray-200 bg-white shadow-lg p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <p className="text-sm text-gray-600 flex-1">
          We use cookies to understand how visitors use Vidyavasal and to improve
          your experience. See our{" "}
          <Link href="/privacy-policy" className="text-blue-600 hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={() => decide(false)}
            className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 rounded-lg transition-colors"
          >
            Decline
          </button>
          <button
            onClick={() => decide(true)}
            className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
