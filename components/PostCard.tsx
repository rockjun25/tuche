"use client";

import Link from "next/link";
import type { Post } from "@/lib/schema";
import { ArrowUpRight } from "@phosphor-icons/react";
import { useEffect, useRef } from "react";

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ");
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

interface PostCardProps {
  post: Post;
  index: number;
}

export function PostCard({ post, index }: PostCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const excerpt = stripHtml(post.content).slice(0, 150);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="scroll-reveal"
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <Link href={`/article/${post.id}`} className="group block">
        {/* Double-bezel card */}
        <div
          className="rounded-[2rem] p-1.5 transition-all duration-500 hover:-translate-y-1"
          style={{
            background: "rgba(232, 227, 219, 0.5)",
            border: "1px solid rgba(200, 193, 183, 0.35)",
            transitionTimingFunction: "cubic-bezier(0.32,0.72,0,1)",
          }}
        >
          <div
            className="rounded-[1.625rem] bg-white/90 px-7 py-6 transition-shadow duration-500"
            style={{
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.8), 0 2px 16px rgba(26,26,26,0.03)",
              transitionTimingFunction: "cubic-bezier(0.32,0.72,0,1)",
            }}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                {post.artwork && (
                  <span className="inline-block text-xs font-medium tracking-wide uppercase text-gold bg-gold/10 px-3 py-1 rounded-full mb-4">
                    {post.artwork}
                  </span>
                )}

                <h2 className="text-xl font-bold text-ink leading-tight mb-2 group-hover:text-ink/80 transition-colors duration-300">
                  {post.title}
                </h2>

                <p className="text-sm text-ink/50 leading-relaxed mb-4 line-clamp-3">
                  {excerpt}
                  {post.content.length > 150 && "..."}
                </p>

                <div className="flex items-center gap-3 text-xs text-ink/40">
                  <span className="font-medium text-ink/60">{post.author}</span>
                  <span className="w-1 h-1 rounded-full bg-ink/20" />
                  <time>{formatDate(post.createdAt)}</time>
                </div>
              </div>

              <div
                className="flex-shrink-0 mt-1 w-10 h-10 rounded-full bg-cream flex items-center justify-center text-ink/30 group-hover:bg-gold group-hover:text-ink transition-all duration-500 group-active:scale-[0.92]"
                style={{
                  transitionTimingFunction: "cubic-bezier(0.32,0.72,0,1)",
                }}
              >
                <ArrowUpRight size={18} weight="bold" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
