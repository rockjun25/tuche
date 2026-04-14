"use client";

import Link from "next/link";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-black border-b-4 border-black">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between h-[64px] px-6">
        <Link href="/" className="text-2xl font-black tracking-tight text-white">
          TUCHÉ
        </Link>

        <div className="flex items-center gap-3">
          <NavLink href="/" label="홈" />
          <NavLink href="/classes/modern-ontology" label="현대존재론" />
          <NavLink href="/classes/criticism-practice" label="비평 클래스" />
          <NavLink href="/tuche" label="아카이브" />
          <Link
            href="/write"
            className="text-xs font-black bg-white text-black px-3 py-2 border-2 border-white hover:bg-black hover:text-white transition-colors"
          >
            글쓰기
          </Link>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="text-xs font-black text-white border-2 border-white px-3 py-2 hover:bg-white hover:text-black transition-colors"
    >
      {label}
    </Link>
  );
}
