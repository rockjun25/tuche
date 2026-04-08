"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PencilSimple, BookOpen } from "@phosphor-icons/react";

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-5 px-4 pointer-events-none">
      <div
        className="pointer-events-auto flex items-center gap-1 rounded-full px-2 py-1.5"
        style={{
          background: "rgba(240, 235, 227, 0.72)",
          backdropFilter: "blur(20px) saturate(1.8)",
          WebkitBackdropFilter: "blur(20px) saturate(1.8)",
          border: "1px solid rgba(200, 193, 183, 0.45)",
          boxShadow:
            "0 4px 24px rgba(26, 26, 26, 0.06), inset 0 1px 0 rgba(255,255,255,0.5)",
        }}
      >
        <Link
          href="/"
          className="flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-500"
          style={{ transitionTimingFunction: "cubic-bezier(0.32,0.72,0,1)" }}
        >
          <span className="text-lg font-bold tracking-tight text-ink">
            Tuche
          </span>
        </Link>

        <div className="w-px h-5 bg-warm-gray/40" />

        <Link
          href="/"
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-500 ${
            pathname === "/"
              ? "bg-ink text-cream"
              : "text-ink/70 hover:text-ink hover:bg-ink/5"
          }`}
          style={{ transitionTimingFunction: "cubic-bezier(0.32,0.72,0,1)" }}
        >
          <BookOpen size={16} weight="regular" />
          <span>읽기</span>
        </Link>

        <Link
          href="/write"
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-500 ${
            pathname === "/write"
              ? "bg-ink text-cream"
              : "text-ink/70 hover:text-ink hover:bg-ink/5"
          }`}
          style={{ transitionTimingFunction: "cubic-bezier(0.32,0.72,0,1)" }}
        >
          <PencilSimple size={16} weight="regular" />
          <span>쓰기</span>
        </Link>
      </div>
    </nav>
  );
}
