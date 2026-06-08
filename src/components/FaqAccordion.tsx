"use client";

import { useState } from "react";

/**
 * Visible FAQ accordion that mirrors the FAQPage JSON-LD on the same page.
 * Keeping the on-page text identical to the structured data is what lets
 * Google rich results and AI tools quote it reliably.
 */
export default function FaqAccordion({
  items,
}: {
  items: { question: string; answer: string }[];
}) {
  const [open, setOpen] = useState<number | null>(0);
  if (!items.length) return null;

  return (
    <section className="mt-8" aria-labelledby="faq-heading">
      <h2 id="faq-heading" className="text-lg font-bold text-gray-900 mb-4">
        Frequently Asked Questions
      </h2>
      <div className="divide-y divide-gray-100 border border-gray-200 rounded-xl overflow-hidden">
        {items.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={i}>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="w-full flex items-center justify-between gap-3 text-left px-4 py-3.5 hover:bg-gray-50 transition-colors"
              >
                <span className="text-sm font-medium text-gray-900">
                  {item.question}
                </span>
                <svg
                  className={`w-4 h-4 shrink-0 text-gray-400 transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {isOpen && (
                <div className="px-4 pb-4 -mt-1 text-sm text-gray-600 leading-relaxed">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
