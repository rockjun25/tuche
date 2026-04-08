"use client";

import { useState } from "react";
import { parseMediaUrl } from "./EmbedExtension";

interface MediaEmbedDialogProps {
  onInsert: (embedUrl: string, platform: string, height: number) => void;
  onClose: () => void;
}

export function MediaEmbedDialog({ onInsert, onClose }: MediaEmbedDialogProps) {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  function handleInsert() {
    const result = parseMediaUrl(url.trim());
    if (!result) {
      setError("지원하지 않는 URL입니다. YouTube, Spotify, Apple Music, SoundCloud URL을 입력해주세요.");
      return;
    }
    onInsert(result.embedUrl, result.platform, result.height);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30" onClick={onClose}>
      <div
        className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-semibold text-[#1A1A1A] mb-1">미디어 삽입</h3>
        <p className="text-sm text-gray-500 mb-4">
          YouTube, Spotify, Apple Music, SoundCloud URL을 붙여넣으세요
        </p>
        <input
          type="url"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
            setError("");
          }}
          placeholder="https://..."
          autoFocus
          className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#FDC700] focus:ring-2 focus:ring-[#FDC700]/20 transition-colors"
          onKeyDown={(e) => {
            if (e.key === "Enter") handleInsert();
            if (e.key === "Escape") onClose();
          }}
        />
        {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            취소
          </button>
          <button
            onClick={handleInsert}
            disabled={!url.trim()}
            className="px-4 py-2 text-sm font-medium bg-[#1A1A1A] text-white rounded-lg hover:bg-[#333] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            삽입
          </button>
        </div>
      </div>
    </div>
  );
}

interface ImageInsertDialogProps {
  onInsert: (url: string) => void;
  onClose: () => void;
}

export function ImageInsertDialog({ onInsert, onClose }: ImageInsertDialogProps) {
  const [url, setUrl] = useState("");

  function handleInsert() {
    if (url.trim()) onInsert(url.trim());
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30" onClick={onClose}>
      <div
        className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-semibold text-[#1A1A1A] mb-1">이미지 삽입</h3>
        <p className="text-sm text-gray-500 mb-4">이미지 URL을 입력하세요</p>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com/image.jpg"
          autoFocus
          className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#FDC700] focus:ring-2 focus:ring-[#FDC700]/20 transition-colors"
          onKeyDown={(e) => {
            if (e.key === "Enter") handleInsert();
            if (e.key === "Escape") onClose();
          }}
        />
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            취소
          </button>
          <button
            onClick={handleInsert}
            disabled={!url.trim()}
            className="px-4 py-2 text-sm font-medium bg-[#1A1A1A] text-white rounded-lg hover:bg-[#333] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            삽입
          </button>
        </div>
      </div>
    </div>
  );
}
