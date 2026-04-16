"use client";

import Link from "next/link";
import type { Post } from "@/lib/schema";

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
}

/**
 * 정사각형 커버 이미지 컴포넌트.
 * - 이미지가 정사각형이면 꽉 채워서 표시 (object-cover)
 * - 세로로 긴 포스터/앨범이면 블러 배경 위에 object-contain으로 표시
 *   → 좌우 여백이 이미지에서 추출한 색감으로 자연스럽게 채워짐
 */
function CoverImage({ src }: { src: string }) {
  return (
    <div
      className="relative flex-shrink-0 overflow-hidden rounded-md w-[88px] h-[88px] sm:w-[112px] sm:h-[112px]"
    >
      {/* 블러 배경 — 이미지 색감을 그대로 퍼트려서 letterbox 여백 채움 */}
      <img
        src={src}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover scale-110"
        style={{ filter: "blur(18px) brightness(0.85) saturate(1.3)" }}
      />
      {/* 실제 이미지 — 정사각형 박스 안에 비율 유지하며 contain */}
      <img
        src={src}
        alt=""
        className="relative z-10 w-full h-full object-contain"
        style={{ imageRendering: "auto" }}
      />
    </div>
  );
}

export function PostCard({ post }: PostCardProps) {
  const excerpt = stripHtml(post.content).slice(0, 200);

  return (
    <Link href={`/article/${post.id}`} className="group block py-6 border-b border-gray-100">
      <div className="flex items-start justify-between gap-3 sm:gap-5">
        <div className="flex-1 min-w-0">
          <h2 className="text-[18px] font-bold text-[#1A1A1A] leading-snug mb-1 group-hover:text-[#1A1A1A]/70 transition-colors">
            {post.title}
          </h2>

          {post.subtitle && (
            <p className="text-[15px] text-gray-500 mb-2">{post.subtitle}</p>
          )}

          <p className="text-[14px] text-gray-400 leading-relaxed mb-3 line-clamp-2">
            {excerpt}
            {post.content.length > 200 && "..."}
          </p>

          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span className="font-medium text-gray-500">{post.author}</span>
            <span>·</span>
            <time>{formatDate(post.createdAt)}</time>
          </div>
        </div>

        {post.coverImage && (
          <CoverImage src={post.coverImage} />
        )}
      </div>
    </Link>
  );
}
