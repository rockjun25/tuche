import { getPostById } from "@/lib/actions";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import ShareButton from "@/components/ShareButton";

interface ArticlePageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { id } = await params;
  const post = await getPostById(Number(id));

  if (!post) return {};

  const ogImageUrl = `/api/og?id=${id}`;

  return {
    title: `${post.title} — Tuché`,
    description: post.subtitle || post.title,
    openGraph: {
      title: post.title,
      description: post.subtitle || "",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      type: "article",
      siteName: "Tuché",
      url: undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.subtitle || "",
      images: [ogImageUrl],
    },
  };
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { id } = await params;
  const post = await getPostById(Number(id));

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Cover Image */}
      {post.coverImage && (
        <div className="w-full max-h-[480px] overflow-hidden">
          <img
            src={post.coverImage}
            alt=""
            className="w-full h-[260px] sm:h-[480px] object-cover"
          />
        </div>
      )}

      <div className="max-w-[728px] mx-auto px-4 sm:px-6 pt-8 sm:pt-10 pb-20 relative">
        {/* Edit button */}
        <Link
          href={`/edit/${post.id}`}
          className="sm:absolute sm:top-10 sm:right-6 ml-auto mb-4 sm:mb-0 w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 text-gray-400 hover:text-[#1A1A1A] hover:border-gray-300 transition-colors"
          title="수정"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10 2l2 2L5 11H3V9L10 2z" />
          </svg>
        </Link>

        {/* Article Header */}
        <header className="mb-10">
          <h1 className="text-[32px] md:text-[40px] font-bold text-[#1A1A1A] leading-tight mb-3">
            {post.title}
          </h1>

          {post.subtitle && (
            <p className="text-lg sm:text-xl text-gray-500 mb-4">{post.subtitle}</p>
          )}

          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-sm text-gray-400">
            <span className="font-medium text-gray-600">{post.author}</span>
            <span>·</span>
            <time>{formatDate(post.createdAt)}</time>
            {post.updatedAt > post.createdAt && (
              <>
                <span>·</span>
                <span className="text-gray-300">수정됨 {formatDate(post.updatedAt)}</span>
              </>
            )}
          </div>

          <div className="mt-6 border-b border-gray-100" />
        </header>

        {/* Article Body */}
        <article
          className="prose-tuche text-[#1A1A1A]/80 leading-[1.9] text-[1.0625rem]"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Share */}
        <ShareButton
          postId={post.id}
          title={post.title}
          subtitle={post.subtitle || ""}
        />
      </div>
    </div>
  );
}
