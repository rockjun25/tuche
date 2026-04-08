import { getPosts } from "@/lib/actions";
import { PostCard } from "@/components/PostCard";
import Link from "next/link";

export default async function FeedPage() {
  const posts = await getPosts();

  return (
    <div className="min-h-screen">
      {/* Hero Section — LEFT ALIGNED, editorial */}
      <section className="pt-32 pb-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-6xl">
          <div className="flex items-start gap-4 mb-6">
            <span className="inline-block text-xs font-medium tracking-widest uppercase text-ink/40 bg-ink/5 px-4 py-1.5 rounded-full">
              Archive
            </span>
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-ink tracking-tight leading-[0.9] mb-6">
            Tuche
          </h1>

          <p className="text-xl md:text-2xl text-ink/40 font-light max-w-md leading-relaxed">
            글의 기록
          </p>

          <div className="mt-10 w-24 h-0.5 bg-gold rounded-full" />
        </div>
      </section>

      {/* Posts Grid or Empty State */}
      <section className="px-6 md:px-12 lg:px-20 pb-32">
        <div className="max-w-6xl">
          {posts.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {posts.map((post, i) => {
                const pattern = i % 5;
                let colSpan: string;

                switch (pattern) {
                  case 0:
                    colSpan = "md:col-span-7";
                    break;
                  case 1:
                    colSpan = "md:col-span-5";
                    break;
                  case 2:
                    colSpan = "md:col-span-5";
                    break;
                  case 3:
                    colSpan = "md:col-span-7";
                    break;
                  case 4:
                    colSpan = "md:col-span-12";
                    break;
                  default:
                    colSpan = "md:col-span-6";
                }

                return (
                  <div key={post.id} className={colSpan}>
                    <PostCard post={post} index={i} />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-start py-20">
      <div
        className="rounded-[2rem] p-1.5 w-full max-w-lg"
        style={{
          background: "rgba(232, 227, 219, 0.5)",
          border: "1px solid rgba(200, 193, 183, 0.35)",
        }}
      >
        <div
          className="rounded-[1.625rem] bg-white/90 px-10 py-14"
          style={{
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.8)",
          }}
        >
          <div className="w-16 h-16 rounded-2xl bg-gold/10 flex items-center justify-center mb-6">
            <span className="text-3xl font-black text-gold">T</span>
          </div>

          <h3 className="text-2xl font-bold text-ink mb-3">
            아직 게시된 글이 없습니다
          </h3>

          <p className="text-ink/40 leading-relaxed mb-8">
            첫 번째 글을 작성하고 기록을 시작해보세요.
          </p>

          <Link href="/write">
            <span
              className="group inline-flex items-center gap-2 bg-ink text-cream px-6 py-3 rounded-full text-sm font-semibold transition-all duration-500 hover:bg-ink/90 active:scale-[0.98] cursor-pointer"
              style={{
                transitionTimingFunction: "cubic-bezier(0.32,0.72,0,1)",
              }}
            >
              <span>첫 글 쓰기</span>
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white/15 group-hover:bg-gold group-hover:text-ink transition-all duration-500">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2 6h8M7 3l3 3-3 3" />
                </svg>
              </span>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
