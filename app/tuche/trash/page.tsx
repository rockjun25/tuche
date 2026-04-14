import Link from "next/link";
import { getTrashedPosts } from "@/lib/actions";
import { TrashPostActions } from "@/components/TrashPostActions";

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

export default async function TrashPage() {
  const posts = await getTrashedPosts();

  return (
    <div className="min-h-screen bg-white">
      <section className="max-w-[900px] mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-black">휴지통</h1>
          <Link
            href="/tuche"
            className="text-sm font-bold border-2 border-black px-3 py-1 bg-white hover:bg-black hover:text-white transition-colors"
          >
            아카이브로 돌아가기
          </Link>
        </div>

        <p className="text-sm font-semibold text-neutral-600 mb-5">삭제된 글은 여기서 복구하거나 영구 삭제할 수 있습니다.</p>

        {posts.length === 0 ? (
          <div className="border-4 border-black p-6 font-bold">휴지통이 비어 있습니다.</div>
        ) : (
          <div className="space-y-3">
            {posts.map((post) => (
              <article key={post.id} className="border-4 border-black p-4 bg-white">
                <h2 className="text-lg font-black mb-1">{post.title}</h2>
                <p className="text-xs text-neutral-500 font-semibold mb-3">
                  {post.author} · 삭제일 {post.deletedAt ? formatDate(post.deletedAt) : "알 수 없음"}
                </p>
                <TrashPostActions postId={post.id} />
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
