"use client";

import { useState, useTransition } from "react";
import { permanentlyDeletePost, restorePost } from "@/lib/actions";

interface TrashPostActionsProps {
  postId: number;
}

export function TrashPostActions({ postId }: TrashPostActionsProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleRestore = () => {
    setError(null);
    startTransition(async () => {
      try {
        await restorePost(postId);
      } catch {
        setError("복구에 실패했습니다");
      }
    });
  };

  const handleDeleteForever = () => {
    const ok = window.confirm("영구 삭제하면 복구할 수 없습니다. 계속할까요?");
    if (!ok) return;

    setError(null);
    startTransition(async () => {
      try {
        await permanentlyDeletePost(postId);
      } catch {
        setError("영구 삭제에 실패했습니다");
      }
    });
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={handleRestore}
        disabled={isPending}
        className="text-xs font-bold border-2 border-black px-3 py-1 bg-white hover:bg-black hover:text-white transition-colors disabled:opacity-50"
      >
        복구
      </button>
      <button
        type="button"
        onClick={handleDeleteForever}
        disabled={isPending}
        className="text-xs font-bold border-2 border-black px-3 py-1 bg-white hover:bg-red-600 hover:text-white hover:border-red-600 transition-colors disabled:opacity-50"
      >
        영구 삭제
      </button>
      {error && <p className="text-[11px] text-red-600 font-bold">{error}</p>}
    </div>
  );
}
