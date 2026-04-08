import { getPostById } from "@/lib/actions";
import { notFound } from "next/navigation";
import Link from "next/link";

interface ArticlePageProps {
  params: Promise<{ id: string }>;
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
    <div className="min-h-screen pt-28 pb-32 px-6 md:px-12">
      <div className="max-w-[65ch] mx-auto">
        {/* Back button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-ink/40 hover:text-ink transition-colors duration-300 mb-12 group"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform duration-300 group-hover:-translate-x-1"
            style={{
              transitionTimingFunction: "cubic-bezier(0.32,0.72,0,1)",
            }}
          >
            <path d="M10 4L6 8l4 4" />
          </svg>
          <span>목록으로</span>
        </Link>

        {/* Article Header */}
        <header className="mb-12">
          {post.artwork && (
            <span className="inline-block text-xs font-medium tracking-wide uppercase text-gold bg-gold/10 px-3 py-1 rounded-full mb-6">
              {post.artwork}
            </span>
          )}

          <h1 className="text-4xl md:text-5xl font-black text-ink leading-tight mb-6">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-sm text-ink/40">
            <span className="font-medium text-ink/60">{post.author}</span>
            <span className="w-1 h-1 rounded-full bg-ink/20" />
            <time>{formatDate(post.createdAt)}</time>
            {post.updatedAt > post.createdAt && (
              <>
                <span className="w-1 h-1 rounded-full bg-ink/20" />
                <span className="text-ink/30">
                  수정됨 {formatDate(post.updatedAt)}
                </span>
              </>
            )}
          </div>

          <div className="mt-8 w-16 h-0.5 bg-gold rounded-full" />
        </header>

        {/* Article Body */}
        <article
          className="prose-tuche text-ink/80 leading-[1.9] text-[1.0625rem]"
          dangerouslySetInnerHTML={{ __html: post.content }}
          style={{
            fontFamily: "var(--font-outfit)",
          }}
        />

        {/* Edit link */}
        <div className="mt-16 pt-8 border-t border-warm-gray/30">
          <Link
            href={`/edit/${post.id}`}
            className="inline-flex items-center gap-2 text-sm text-ink/40 hover:text-ink transition-colors duration-300"
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
            <span>이 글 수정하기</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
