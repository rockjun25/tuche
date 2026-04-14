import { getPosts } from "@/lib/actions";
import { PostCard } from "@/components/PostCard";
import Link from "next/link";

export default async function TucheFeedPage() {
  const posts = await getPosts();

  return (
    <div className="min-h-screen bg-white">
      <section className="max-w-[728px] mx-auto px-6 pt-12 pb-8 border-b border-gray-100">
        <h1 className="text-3xl font-bold text-[#1A1A1A] mb-2">Tuché</h1>
        <p className="text-base text-gray-500">글의 기록</p>
        <div className="flex items-center gap-4 mt-4 text-sm text-gray-400">
          <span>아카이브</span>
          <Link href="/tuche/trash" className="underline text-gray-500 hover:text-black">
            휴지통
          </Link>
        </div>
      </section>

      <section className="max-w-[728px] mx-auto px-6 pb-20">
        {posts.length === 0 ? (
          <EmptyState />
        ) : (
          <div>
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="py-20 text-center">
      <h3 className="text-xl font-semibold text-[#1A1A1A] mb-2">아직 게시된 글이 없습니다</h3>
      <p className="text-gray-400 mb-6">첫 번째 글을 작성하고 기록을 시작해보세요.</p>
      <Link
        href="/write"
        className="inline-flex items-center gap-2 bg-[#FDC700] text-[#1A1A1A] px-6 py-3 rounded-full text-sm font-semibold hover:bg-[#FDC700]/90 transition-colors"
      >
        첫 글 쓰기
      </Link>
    </div>
  );
}
