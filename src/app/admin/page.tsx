import Link from "next/link";
import { Building2, BookOpen, FolderTree, IndianRupee, ExternalLink } from "lucide-react";
import { db } from "@/lib/db";
import { universities, courses, courseCategories, courseFeeStructures } from "@/lib/db/schema";
import { sql } from "drizzle-orm";

async function getStats() {
  const [uniCount] = await db.select({ count: sql<number>`count(*)` }).from(universities);
  const [courseCount] = await db.select({ count: sql<number>`count(*)` }).from(courses);
  const [catCount] = await db.select({ count: sql<number>`count(*)` }).from(courseCategories);
  const [feeCount] = await db.select({ count: sql<number>`count(*)` }).from(courseFeeStructures);
  return {
    universities: Number(uniCount.count),
    courses: Number(courseCount.count),
    categories: Number(catCount.count),
    feeRecords: Number(feeCount.count),
  };
}

const statCards = [
  { label: "Universities", key: "universities" as const, Icon: Building2, href: "/admin/universities", color: "bg-blue-50 text-blue-700" },
  { label: "Courses", key: "courses" as const, Icon: BookOpen, href: "/admin/courses", color: "bg-purple-50 text-purple-700" },
  { label: "Categories", key: "categories" as const, Icon: FolderTree, href: "/admin/courses", color: "bg-green-50 text-green-700" },
  { label: "Fee Records", key: "feeRecords" as const, Icon: IndianRupee, href: "/admin/courses", color: "bg-orange-50 text-orange-700" },
];

export default async function AdminDashboard() {
  const stats = await getStats();

  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Welcome back. Here&apos;s what&apos;s in your database.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((card) => (
          <Link key={card.key} href={card.href} className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-sm transition-shadow">
            <div className={`inline-flex items-center justify-center w-9 h-9 rounded-lg mb-3 ${card.color}`}>
              <card.Icon className="w-5 h-5" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{stats[card.key]}</div>
            <div className="text-sm text-gray-500">{card.label}</div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <h2 className="text-sm font-semibold text-gray-700 mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link href="/admin/universities" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors">
            Manage Universities
          </Link>
          <Link href="/admin/courses" className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition-colors">
            Manage Courses
          </Link>
          <Link href="/universities" target="_blank" className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg transition-colors inline-flex items-center gap-1.5">
            <ExternalLink className="w-4 h-4" /> View Universities Page
          </Link>
          <Link href="/courses" target="_blank" className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg transition-colors inline-flex items-center gap-1.5">
            <ExternalLink className="w-4 h-4" /> View Courses Page
          </Link>
        </div>
      </div>
    </div>
  );
}
