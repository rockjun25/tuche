"use client";

import { useState, useEffect, useCallback } from "react";

declare global {
  interface Window {
    Kakao?: {
      init: (key: string) => void;
      isInitialized: () => boolean;
      Share: {
        sendDefault: (options: Record<string, unknown>) => void;
      };
    };
  }
}

interface ShareButtonProps {
  postId: number;
  title: string;
  subtitle: string;
}

export default function ShareButton({ postId, title, subtitle }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = useCallback((message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 2000);
  }, []);

  // Load Kakao SDK
  useEffect(() => {
    const appKey = process.env.NEXT_PUBLIC_KAKAO_APP_KEY;
    if (!appKey || window.Kakao) return;

    const script = document.createElement("script");
    script.src = "https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js";
    script.onload = () => {
      if (window.Kakao && !window.Kakao.isInitialized()) {
        window.Kakao.init(appKey);
      }
    };
    document.head.appendChild(script);
  }, []);

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    showToast("링크가 복사됐어요!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTwitter = () => {
    const text = encodeURIComponent(`${title} — Tuché`);
    const url = encodeURIComponent(window.location.href);
    window.open(
      `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      "_blank"
    );
  };

  const handleKakao = () => {
    if (!window.Kakao || !window.Kakao.isInitialized()) {
      alert("카카오톡 공유는 준비 중이에요 :)");
      return;
    }
    window.Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title,
        description: subtitle || "",
        imageUrl: `${window.location.origin}/api/og?id=${postId}`,
        link: {
          mobileWebUrl: window.location.href,
          webUrl: window.location.href,
        },
      },
    });
  };

  const handleInstagram = () => {
    const storyImageUrl = `/api/og/story?id=${postId}`;
    const link = document.createElement("a");
    link.href = storyImageUrl;
    link.download = `tuche-${postId}.png`;
    link.click();
    showToast("이미지를 저장했어요! 인스타그램 스토리에 공유해보세요 📸");
  };

  return (
    <div className="mt-16 mb-8 flex flex-col items-center gap-4">
      <span className="text-xs text-gray-400 tracking-wide">공유하기</span>
      <div className="flex items-center gap-5">
        {/* Copy Link */}
        <button
          onClick={handleCopyLink}
          className="group flex flex-col items-center gap-1.5"
        >
          <span
            className={`w-11 h-11 flex items-center justify-center rounded-full border transition-all duration-200 ${
              copied
                ? "bg-green-50 border-green-300 text-green-600"
                : "bg-white border-[#e5e5e5] text-[#666] hover:scale-105 hover:border-gray-400"
            }`}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
              <path d="M10.172 13.828a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          </span>
          <span className="text-[11px] text-gray-400">링크복사</span>
        </button>

        {/* Twitter/X */}
        <button
          onClick={handleTwitter}
          className="group flex flex-col items-center gap-1.5"
        >
          <span className="w-11 h-11 flex items-center justify-center rounded-full border border-[#e5e5e5] bg-white text-[#666] transition-all duration-200 hover:scale-105 hover:border-gray-400 hover:bg-black hover:text-white hover:border-black">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </span>
          <span className="text-[11px] text-gray-400">Twitter</span>
        </button>

        {/* KakaoTalk */}
        <button
          onClick={handleKakao}
          className="group flex flex-col items-center gap-1.5"
        >
          <span className="w-11 h-11 flex items-center justify-center rounded-full border border-[#e5e5e5] bg-white text-[#666] transition-all duration-200 hover:scale-105 hover:border-[#FEE500] hover:bg-[#FEE500] hover:text-black">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3C6.477 3 2 6.477 2 10.5c0 2.628 1.506 4.938 3.785 6.326L4.5 21l4.572-2.534C10.135 18.814 11.054 19 12 19c5.523 0 10-3.477 10-7.5S17.523 3 12 3z" />
            </svg>
          </span>
          <span className="text-[11px] text-gray-400">카카오톡</span>
        </button>

        {/* Instagram */}
        <button
          onClick={handleInstagram}
          className="group flex flex-col items-center gap-1.5"
        >
          <span className="w-11 h-11 flex items-center justify-center rounded-full border border-[#e5e5e5] bg-white text-[#666] transition-all duration-200 hover:scale-105 hover:border-gray-400 group-hover:[background:linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)] group-hover:text-white group-hover:border-transparent">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <circle cx="12" cy="12" r="5" />
              <circle
                cx="17.5"
                cy="6.5"
                r="1"
                fill="currentColor"
                stroke="none"
              />
            </svg>
          </span>
          <span className="text-[11px] text-gray-400">Instagram</span>
        </button>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-[#1A1A1A] text-white text-sm px-5 py-3 rounded-full shadow-lg animate-fade-in">
          {toast}
        </div>
      )}
    </div>
  );
}
