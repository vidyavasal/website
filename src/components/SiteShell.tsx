"use client";

import { usePathname } from "next/navigation";

/**
 * Renders the public site chrome (header + footer) around page content,
 * but skips it entirely for the admin panel, which has its own layout.
 * Header/Footer are passed in as props so they remain server-rendered.
 */
export default function SiteShell({
  header,
  footer,
  children,
}: {
  header: React.ReactNode;
  footer: React.ReactNode;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      {header}
      <main className="flex-grow pt-[80px] print:pt-0">{children}</main>
      {footer}
    </>
  );
}
