"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  BookOpen,
  ExternalLink,
  LogOut,
} from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", Icon: LayoutDashboard, exact: true },
  { href: "/admin/universities", label: "Universities", Icon: Building2 },
  { href: "/admin/courses", label: "Courses", Icon: BookOpen },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside className="w-60 bg-white border-r border-gray-200 flex flex-col shrink-0 sticky top-0 h-screen">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-gray-100">
        <Link href="/admin" className="flex items-center gap-2.5">
          <Image
            src="/logo.svg"
            alt="Vidyavasal"
            width={28}
            height={28}
            className="h-7 w-auto object-contain"
          />
          <span className="font-poppins font-semibold text-gray-900 text-base tracking-tight">
            vidyavasal
          </span>
          <span className="ml-auto text-[0.6rem] font-semibold uppercase tracking-wider text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">
            Admin
          </span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        <p className="px-3 mb-1 text-[0.65rem] font-semibold uppercase tracking-wider text-gray-400">
          Manage
        </p>
        {navItems.map((item) => {
          const isActive = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-[#EEF2FF] text-[#4F46E5]"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <item.Icon className="w-[18px] h-[18px]" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 pb-4 space-y-1 border-t border-gray-100 pt-3">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
        >
          <ExternalLink className="w-[18px] h-[18px]" /> View Site
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors"
        >
          <LogOut className="w-[18px] h-[18px]" /> Logout
        </button>
      </div>
    </aside>
  );
}
