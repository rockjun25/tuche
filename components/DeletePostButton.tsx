"use client";

import { useState, useTransition } from "react";
import { deletePost } from "@/lib/actions";

interface DeletePostButtonProps {
  postId: number;
}

export function DeletePostButton({ postId }: DeletePostButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleDelete = () => {
    const ok = window.confirm("이 글을 삭제할까요?");
    if (!ok) return;

    setError(null);
    startTransition(async () => {
      try {
        await deletePost(postId);
      } catch {
        setError("삭제에 실패했습니다");
      }
    });
  };

  return (
    <div className="flex flex-col items-end gap-1">
      <button
        type="button"
        onClick={handleDelete}
        disabled={isPending}
        className="text-xs font-bold border-2 border-black px-2 py-1 bg-white hover:bg-black hover:text-white transition-colors disabled:opacity-50"
      >
        {isPending ? "삭제 중" : "삭제"}
      </button>
      {error && <p className="text-[10px] text-red-600 font-bold">{error}</p>}
    </div>
  );
}
