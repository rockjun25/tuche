"use client";

import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "/", label: "홈" },
  { href: "/classes/modern-ontology", label: "현대존재론" },
  { href: "/classes/criticism-practice", label: "비평 클래스" },
  { href: "/tuche", label: "아카이브" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-black border-b-4 border-black">
      <div className="max-w-[1200px] mx-auto h-16 px-4 sm:px-6 flex items-center justify-between gap-3">
        <Link href="/" className="text-xl sm:text-2xl font-black tracking-tight text-white" onClick={() => setOpen(false)}>
          TUCHÉ
        </Link>

        <button
          type="button"
          className="md:hidden text-xs font-black text-white border-2 border-white px-3 py-2"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-label="메뉴"
        >
          메뉴
        </button>

        <div className="hidden md:flex items-center gap-3">
          {links.map((link) => (
            <NavLink key={link.href} href={link.href} label={link.label} />
          ))}
          <Link
            href="/write"
            className="text-xs font-black bg-white text-black px-3 py-2 border-2 border-white hover:bg-black hover:text-white transition-colors"
          >
            글쓰기
          </Link>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t-2 border-white/30 px-4 pb-4 pt-3 space-y-2 bg-black">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block text-xs font-black text-white border-2 border-white px-3 py-2"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/write"
            onClick={() => setOpen(false)}
            className="block text-center text-xs font-black bg-white text-black px-3 py-2 border-2 border-white"
          >
            글쓰기
          </Link>
        </div>
      )}
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
