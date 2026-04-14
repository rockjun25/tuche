"use client";

import { useState, useTransition } from "react";
import { createLectureNote } from "@/lib/actions";
import type { LectureNote } from "@/lib/schema";

interface LectureNotesPanelProps {
  classKey: string;
  lectureId: string;
  initialNotes: LectureNote[];
}

export function LectureNotesPanel({ classKey, lectureId, initialNotes }: LectureNotesPanelProps) {
  const [notes, setNotes] = useState(initialNotes);
  const [content, setContent] = useState("");
  const [isPending, startTransition] = useTransition();

  const charCount = content.length;
  const isOver = charCount > 280;

  const handleSubmit = () => {
    const trimmed = content.trim();
    if (!trimmed || isOver) return;

    startTransition(async () => {
      const result = await createLectureNote(classKey, lectureId, trimmed);
      if (result.ok) {
        setNotes((prev) => [
          { id: Date.now(), classKey, lectureId, content: trimmed, createdAt: new Date() },
          ...prev,
        ]);
        setContent("");
      }
    });
  };

  const formatTime = (date: Date) => {
    const d = new Date(date);
    const month = d.getMonth() + 1;
    const day = d.getDate();
    const hours = d.getHours().toString().padStart(2, "0");
    const minutes = d.getMinutes().toString().padStart(2, "0");
    return `${month}/${day} ${hours}:${minutes}`;
  };

  return (
    <div className="border-[5px] border-black bg-white shadow-[8px_8px_0_#000] flex flex-col h-full">
      <div className="border-b-4 border-black p-4">
        <h2 className="text-lg font-black uppercase">노트</h2>
      </div>

      <div className="p-4 border-b-4 border-black">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="강의를 들으며 메모를 남겨보세요..."
          rows={3}
          className="w-full border-2 border-black p-3 text-sm font-semibold resize-none focus:outline-none focus:border-[#FDC700] transition-colors"
        />
        <div className="flex items-center justify-between mt-2">
          <span
            className={`text-xs font-black ${
              isOver ? "text-red-600" : charCount > 240 ? "text-orange-500" : "text-neutral-400"
            }`}
          >
            {charCount}/280
          </span>
          <button
            onClick={handleSubmit}
            disabled={isPending || !content.trim() || isOver}
            className="border-2 border-black px-4 py-1.5 text-xs font-black uppercase hover:bg-black hover:text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isPending ? "저장 중..." : "게시"}
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-3">
        {notes.length === 0 ? (
          <p className="text-sm font-semibold text-neutral-400 text-center py-8">
            아직 노트가 없습니다.
          </p>
        ) : (
          notes.map((note) => (
            <div key={note.id} className="border-2 border-black p-3 hover:bg-[#f2f2f2] transition-colors">
              <p className="text-sm font-semibold whitespace-pre-wrap break-words">{note.content}</p>
              <p className="text-xs font-bold text-neutral-400 mt-2">{formatTime(note.createdAt)}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
