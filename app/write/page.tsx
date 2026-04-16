"use client";

import { useState } from "react";
import { Editor } from "@/components/Editor";
import { createPost } from "@/lib/actions";
import Link from "next/link";

export default function WritePage() {
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [showCoverInput, setShowCoverInput] = useState(false);
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit() {
    if (!title.trim() || !author.trim() || !content.trim()) return;

    setIsSubmitting(true);
    try {
      await createPost({
        title: title.trim(),
        subtitle: subtitle.trim() || undefined,
        author: author.trim(),
        coverImage: coverImage.trim() || undefined,
        content,
      });
    } catch {
      setIsSubmitting(false);
    }
  }

  const isValid = title.trim() && author.trim() && content.trim();

  return (
    <div className="min-h-screen bg-white">
      {/* Top bar */}
      <div className="sticky top-16 z-40 bg-white border-b border-gray-100">
        <div className="max-w-[728px] mx-auto px-4 sm:px-6 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <Link href="/tuche" className="text-sm text-gray-500 hover:text-[#1A1A1A] transition-colors">
            ← 돌아가기
          </Link>
          <div className="flex items-center gap-2 sm:gap-3">
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="작성자"
              className="w-24 sm:w-28 px-3 py-1.5 text-sm border border-gray-200 rounded-lg outline-none focus:border-[#FDC700] transition-colors"
            />
            <button
              onClick={handleSubmit}
              disabled={!isValid || isSubmitting}
              className="text-sm font-medium bg-[#FDC700] text-[#1A1A1A] px-4 sm:px-5 py-2 rounded-full hover:bg-[#FDC700]/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? "게시 중..." : "게시하기"}
            </button>
          </div>
        </div>
      </div>

      {/* Editor area */}
      <div className="max-w-[728px] mx-auto px-4 sm:px-6 pt-8 sm:pt-10 pb-24 sm:pb-32">
        {/* Cover image */}
        {coverImage ? (
          <div className="relative mb-8 group">
            <img
              src={coverImage}
              alt="Cover"
              className="w-full h-[320px] object-cover rounded-lg"
            />
            <button
              onClick={() => {
                setCoverImage("");
                setShowCoverInput(false);
              }}
              className="absolute top-3 right-3 bg-black/50 text-white text-xs px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              삭제
            </button>
          </div>
        ) : showCoverInput ? (
          <div className="mb-8 flex gap-2">
            <input
              type="url"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              placeholder="이미지 URL을 입력하세요"
              autoFocus
              className="flex-1 px-4 py-2.5 text-sm border border-gray-200 rounded-lg outline-none focus:border-[#FDC700] transition-colors"
              onKeyDown={(e) => {
                if (e.key === "Escape") setShowCoverInput(false);
              }}
            />
            <button
              onClick={() => setShowCoverInput(false)}
              className="text-sm text-gray-400 hover:text-gray-600 px-3"
            >
              취소
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowCoverInput(true)}
            className="mb-8 text-sm text-gray-400 hover:text-gray-600 transition-colors"
          >
            + 대표 이미지 추가
          </button>
        )}

        {/* Title */}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목"
          className="w-full text-[30px] sm:text-[36px] font-bold text-[#1A1A1A] placeholder:text-gray-300 outline-none border-none mb-2 leading-tight"
        />

        {/* Subtitle */}
        <input
          type="text"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          placeholder="소제목 (선택사항)"
          className="w-full text-[18px] sm:text-[20px] text-gray-500 placeholder:text-gray-300 outline-none border-none mb-8"
        />

        {/* Editor */}
        <Editor content={content} onChange={setContent} />
      </div>
    </div>
  );
}
