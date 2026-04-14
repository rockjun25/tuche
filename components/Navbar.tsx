"use client";

import Link from "next/link";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-[#e5e5e5]">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between h-[60px] px-6">
        <Link href="/" className="text-xl font-bold tracking-tight text-[#1A1A1A]">
          Tuché
        </Link>

        <div className="flex items-center gap-5">
          <Link href="/" className="text-sm font-medium text-[#1A1A1A]/70 hover:text-[#1A1A1A] transition-colors">
            홈
          </Link>
          <Link
            href="/classes/modern-ontology"
            className="text-sm font-medium text-[#1A1A1A]/70 hover:text-[#1A1A1A] transition-colors"
          >
            현대존재론
          </Link>
          <Link
            href="/classes/criticism-practice"
            className="text-sm font-medium text-[#1A1A1A]/70 hover:text-[#1A1A1A] transition-colors"
          >
            비평 클래스
          </Link>
          <Link
            href="/tuche"
            className="text-sm font-medium text-[#1A1A1A]/70 hover:text-[#1A1A1A] transition-colors"
          >
            Tuché
          </Link>
          <Link
            href="/write"
            className="text-sm font-medium bg-[#FDC700] text-[#1A1A1A] px-4 py-2 rounded-full hover:bg-[#FDC700]/90 transition-colors"
          >
            글쓰기
          </Link>
        </div>
      </div>
    </nav>
  );
}
