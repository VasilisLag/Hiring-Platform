"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="w-full bg-white shadow">
      <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo or App Name */}
        <Link href="/" className="text-xl font-bold text-black-600">
          Hiring Platform
        </Link>

        {/* Links */}
        <div className="space-x-4 text-sm sm:text-base">
          <Link
            href="/jobs"
            className={`hover:text-blue-600 ${
              isActive("/jobs") ? "text-blue-600 font-semibold" : ""
            }`}
          >
            Αγγελίες
          </Link>

          <Link
            href="/auth"
            className={`hover:text-blue-600 ${
              isActive("/auth") ? "text-blue-600 font-semibold" : ""
            }`}
          >
            Σύνδεση / Εγγραφή
          </Link>
        </div>
      </div>
    </nav>
  );
}
