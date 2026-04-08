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

export function PostCard({ post }: PostCardProps) {
  const excerpt = stripHtml(post.content).slice(0, 200);

  return (
    <Link href={`/article/${post.id}`} className="group block py-6 border-b border-gray-100">
      <div className="flex items-start justify-between gap-6">
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
          <div className="flex-shrink-0">
            <img
              src={post.coverImage}
              alt=""
              className="w-[120px] h-[80px] object-cover rounded-md"
            />
          </div>
        )}
      </div>
    </Link>
  );
}
