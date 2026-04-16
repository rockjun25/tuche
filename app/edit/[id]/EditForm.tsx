"use client";

import { useCallback, useEffect, useMemo, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Editor } from "@/components/Editor";
import { autosavePost, deletePost, updatePost } from "@/lib/actions";
import Link from "next/link";
import type { Post } from "@/lib/schema";

interface EditFormProps {
  post: Post;
}

const AUTOSAVE_INTERVAL_MS = 5 * 60 * 1000;

type AutoSaveState = "idle" | "saving" | "saved" | "error";

export function EditForm({ post }: EditFormProps) {
  const [author, setAuthor] = useState(post.author);
  const [title, setTitle] = useState(post.title);
  const [subtitle, setSubtitle] = useState(post.subtitle ?? "");
  const [coverImage, setCoverImage] = useState(post.coverImage ?? "");
  const [showCoverInput, setShowCoverInput] = useState(!!post.coverImage);
  const [content, setContent] = useState(post.content);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeletePending, startDeleteTransition] = useTransition();
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [autoSaveState, setAutoSaveState] = useState<AutoSaveState>("idle");
  const [lastAutoSavedAt, setLastAutoSavedAt] = useState<Date | null>(null);
  const [restoredDraft, setRestoredDraft] = useState(false);

  const draftKey = `tuche:edit-draft:${post.id}`;
  const router = useRouter();

  const snapshot = useMemo(
    () =>
      JSON.stringify({
        title,
        subtitle,
        author,
        coverImage,
        content,
      }),
    [title, subtitle, author, coverImage, content]
  );

  const lastSavedSnapshotRef = useRef(
    JSON.stringify({
      title: post.title,
      subtitle: post.subtitle ?? "",
      author: post.author,
      coverImage: post.coverImage ?? "",
      content: post.content,
    })
  );

  const isValid = title.trim() && author.trim() && content.trim();
  const hasUnsavedChanges = snapshot !== lastSavedSnapshotRef.current;

  const buildPayload = useCallback(
    () => ({
      title: title.trim(),
      subtitle: subtitle.trim() || undefined,
      author: author.trim(),
      coverImage: coverImage.trim() || undefined,
      content,
    }),
    [title, subtitle, author, coverImage, content]
  );

  const runAutoSave = useCallback(async () => {
    if (!isValid || !hasUnsavedChanges || isSubmitting) return;

    setAutoSaveState("saving");
    try {
      await autosavePost(post.id, buildPayload());
      lastSavedSnapshotRef.current = snapshot;
      setLastAutoSavedAt(new Date());
      setAutoSaveState("saved");
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(draftKey);
      }
    } catch {
      setAutoSaveState("error");
    }
  }, [isValid, hasUnsavedChanges, isSubmitting, post.id, buildPayload, snapshot, draftKey]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const raw = window.localStorage.getItem(draftKey);
    if (!raw) return;

    try {
      const draft = JSON.parse(raw) as {
        title?: string;
        subtitle?: string;
        author?: string;
        coverImage?: string;
        content?: string;
        updatedAt?: number;
      };

      const draftUpdatedAt =
        typeof draft.updatedAt === "number" && Number.isFinite(draft.updatedAt)
          ? draft.updatedAt
          : 0;

      if (!draftUpdatedAt || draftUpdatedAt <= post.updatedAt.getTime()) {
        window.localStorage.removeItem(draftKey);
        return;
      }

      if (typeof draft.title === "string") setTitle(draft.title);
      if (typeof draft.subtitle === "string") setSubtitle(draft.subtitle);
      if (typeof draft.author === "string") setAuthor(draft.author);
      if (typeof draft.coverImage === "string") setCoverImage(draft.coverImage);
      if (typeof draft.content === "string") setContent(draft.content);
      setRestoredDraft(true);
    } catch {
      window.localStorage.removeItem(draftKey);
    }
  }, [draftKey]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    window.localStorage.setItem(
      draftKey,
      JSON.stringify({
        title,
        subtitle,
        author,
        coverImage,
        content,
        updatedAt: Date.now(),
      })
    );
  }, [draftKey, title, subtitle, author, coverImage, content]);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      void runAutoSave();
    }, AUTOSAVE_INTERVAL_MS);

    return () => window.clearInterval(intervalId);
  }, [runAutoSave]);

  useEffect(() => {
    function onVisibilityChange() {
      if (document.visibilityState === "hidden") {
        void runAutoSave();
      }
    }

    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, [runAutoSave]);

  async function handleSubmit() {
    if (!title.trim() || !author.trim() || !content.trim()) return;

    setIsSubmitting(true);
    try {
      await updatePost(post.id, buildPayload());
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(draftKey);
      }
    } catch {
      setIsSubmitting(false);
    }
  }

  function handleDelete() {
    const ok = window.confirm("이 글을 삭제할까요?");
    if (!ok) return;

    setDeleteError(null);
    startDeleteTransition(async () => {
      try {
        await deletePost(post.id);
        if (typeof window !== "undefined") {
          window.localStorage.removeItem(draftKey);
        }
        router.push("/tuche");
        router.refresh();
      } catch {
        setDeleteError("삭제에 실패했습니다");
      }
    });
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="sticky top-[60px] z-40 bg-white border-b border-gray-100">
        <div className="max-w-[728px] mx-auto px-6 h-14 flex items-center justify-between">
          <Link href={`/article/${post.id}`} className="text-sm text-gray-500 hover:text-[#1A1A1A] transition-colors">
            ← 돌아가기
          </Link>
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="작성자"
              className="w-28 px-3 py-1.5 text-sm border border-gray-200 rounded-lg outline-none focus:border-[#FDC700] transition-colors"
            />
            <button
              onClick={handleSubmit}
              disabled={!isValid || isSubmitting}
              className="text-sm font-medium bg-[#FDC700] text-[#1A1A1A] px-5 py-2 rounded-full hover:bg-[#FDC700]/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? "수정 중..." : "수정하기"}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[728px] mx-auto px-6 pt-10 pb-32">
        <p className="mb-5 text-xs text-gray-500">
          {autoSaveState === "saving" && "자동저장 중..."}
          {autoSaveState === "saved" && lastAutoSavedAt && `자동저장 완료 ${lastAutoSavedAt.toLocaleTimeString("ko-KR")}`}
          {autoSaveState === "error" && "자동저장 실패, 네트워크 확인 후 수정하기 버튼을 눌러주세요"}
          {autoSaveState === "idle" && hasUnsavedChanges && "미저장 변경사항이 있습니다"}
          {autoSaveState === "idle" && !hasUnsavedChanges && "변경사항이 저장된 상태입니다"}
          {restoredDraft && " / 로컬 임시저장을 복구했습니다"}
        </p>

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

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목"
          className="w-full text-[36px] font-bold text-[#1A1A1A] placeholder:text-gray-300 outline-none border-none mb-2 leading-tight"
        />

        <input
          type="text"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          placeholder="소제목 (선택사항)"
          className="w-full text-[20px] text-gray-500 placeholder:text-gray-300 outline-none border-none mb-8"
        />

        <Editor content={content} onChange={setContent} />

        <div className="mt-10 pt-8 border-t border-gray-200">
          <button
            type="button"
            onClick={handleDelete}
            disabled={isDeletePending}
            className="text-sm font-bold border-2 border-black px-4 py-2 bg-white hover:bg-black hover:text-white transition-colors disabled:opacity-50"
          >
            {isDeletePending ? "삭제 중..." : "이 글 삭제"}
          </button>
          {deleteError && <p className="mt-2 text-xs text-red-600 font-bold">{deleteError}</p>}
        </div>
      </div>
    </div>
  );
}
