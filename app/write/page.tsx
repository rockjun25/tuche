"use client";

import { useState } from "react";
import { Editor } from "@/components/Editor";
import { createPost } from "@/lib/actions";
import { ArrowRight } from "@phosphor-icons/react";

export default function WritePage() {
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [artwork, setArtwork] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit() {
    if (!title.trim() || !author.trim() || !content.trim()) return;

    setIsSubmitting(true);
    try {
      await createPost({
        title: title.trim(),
        author: author.trim(),
        artwork: artwork.trim() || undefined,
        content,
      });
    } catch {
      setIsSubmitting(false);
    }
  }

  const isValid = title.trim() && author.trim() && content.trim();

  return (
    <div className="min-h-screen pt-28 pb-32 px-6 md:px-12">
      <div className="max-w-2xl mx-auto">
        <div className="mb-12">
          <span className="inline-block text-xs font-medium tracking-widest uppercase text-ink/40 bg-ink/5 px-4 py-1.5 rounded-full mb-4">
            새 글
          </span>
          <h1 className="text-3xl font-bold text-ink">쓰기</h1>
        </div>

        <div className="space-y-6">
          {/* Author */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-ink/60">
              작성자
            </label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="이름을 입력하세요"
              className="w-full px-5 py-3.5 rounded-xl bg-white/80 border border-warm-gray/30 text-ink placeholder:text-warm-gray outline-none transition-all duration-500 focus:border-gold/60 focus:shadow-[0_0_0_3px_rgba(253,199,0,0.12)]"
              style={{
                transitionTimingFunction: "cubic-bezier(0.32,0.72,0,1)",
              }}
            />
          </div>

          {/* Title */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-ink/60">
              제목
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="글의 제목"
              className="w-full px-5 py-4 rounded-xl bg-white/80 border border-warm-gray/30 text-ink text-2xl font-bold placeholder:text-warm-gray placeholder:font-normal outline-none transition-all duration-500 focus:border-gold/60 focus:shadow-[0_0_0_3px_rgba(253,199,0,0.12)]"
              style={{
                transitionTimingFunction: "cubic-bezier(0.32,0.72,0,1)",
              }}
            />
          </div>

          {/* Artwork Reference */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-ink/60">
              작품명 <span className="text-ink/30">(선택)</span>
            </label>
            <input
              type="text"
              value={artwork}
              onChange={(e) => setArtwork(e.target.value)}
              placeholder="참조하는 작품의 제목"
              className="w-full px-5 py-3.5 rounded-xl bg-white/80 border border-warm-gray/30 text-ink placeholder:text-warm-gray outline-none transition-all duration-500 focus:border-gold/60 focus:shadow-[0_0_0_3px_rgba(253,199,0,0.12)]"
              style={{
                transitionTimingFunction: "cubic-bezier(0.32,0.72,0,1)",
              }}
            />
          </div>

          {/* Editor */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-ink/60">
              본문
            </label>
            <Editor content="" onChange={setContent} />
          </div>

          {/* Submit */}
          <div className="pt-4">
            <button
              onClick={handleSubmit}
              disabled={!isValid || isSubmitting}
              className="group inline-flex items-center gap-3 bg-ink text-cream px-8 py-4 rounded-full text-base font-semibold transition-all duration-500 hover:bg-ink/90 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
              style={{
                transitionTimingFunction: "cubic-bezier(0.32,0.72,0,1)",
              }}
            >
              <span>{isSubmitting ? "게시 중..." : "게시하기"}</span>
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/15 group-hover:bg-gold group-hover:text-ink transition-all duration-500 group-disabled:group-hover:bg-white/15 group-disabled:group-hover:text-cream">
                <ArrowRight size={14} weight="bold" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
