"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { getProgressMap, setProgress } from "@/lib/actions";

interface ProgressChecklistProps {
  storageKey: string;
  classKey: string;
  items: { id: string; label: string; href?: string }[];
}

export function ProgressChecklist({ storageKey, classKey, items }: ProgressChecklistProps) {
  const [checked, setChecked] = useState<Record<string, boolean>>(() => {
    if (typeof window === "undefined") return {};
    try {
      const raw = localStorage.getItem(storageKey);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const remote = await getProgressMap(classKey);
        if (!mounted) return;

        setChecked((prev) => {
          const merged = { ...prev, ...remote };
          localStorage.setItem(storageKey, JSON.stringify(merged));
          return merged;
        });
      } catch {
        // 네트워크 오류 시 로컬 상태 유지
      }
    })();

    return () => {
      mounted = false;
    };
  }, [classKey, storageKey]);

  const doneCount = useMemo(
    () => items.filter((item) => checked[item.id]).length,
    [items, checked]
  );

  const percent = items.length === 0 ? 0 : Math.round((doneCount / items.length) * 100);

  const saveLocal = (next: Record<string, boolean>) => {
    setChecked(next);
    localStorage.setItem(storageKey, JSON.stringify(next));
  };

  const updateProgress = async (itemId: string, completed: boolean) => {
    try {
      await setProgress(classKey, itemId, completed);
    } catch {
      // 서버 저장 실패 시 로컬은 유지
    }
  };

  const toggle = (id: string) => {
    const nextValue = !checked[id];
    const next = { ...checked, [id]: nextValue };
    saveLocal(next);
    void updateProgress(id, nextValue);
  };

  const markDone = (id: string) => {
    if (checked[id]) return;
    const next = { ...checked, [id]: true };
    saveLocal(next);
    void updateProgress(id, true);
  };

  return (
    <div className="border-[5px] border-black bg-white p-5 shadow-[8px_8px_0_#000]">
      <div className="mb-4 flex items-center justify-between border-b-4 border-black pb-3">
        <p className="text-sm font-black uppercase">진도</p>
        <p className="text-sm font-black">{doneCount}/{items.length} {percent}%</p>
      </div>
      <div className="space-y-2 max-h-[420px] overflow-auto pr-1">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-3 border-2 border-black p-2 bg-white hover:bg-[#f2f2f2]">
            <input
              type="checkbox"
              checked={!!checked[item.id]}
              onChange={() => toggle(item.id)}
              className="h-4 w-4 accent-black"
            />
            {item.href ? (
              item.href.startsWith("/") ? (
                <Link
                  href={item.href}
                  onClick={() => markDone(item.id)}
                  className="text-sm font-semibold underline"
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => markDone(item.id)}
                  className="text-sm font-semibold underline"
                >
                  {item.label}
                </a>
              )
            ) : (
              <span className="text-sm font-semibold">{item.label}</span>
            )}
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs font-semibold text-[#333]">링크 클릭 시 자동 체크됩니다. 체크 상태는 Neon에 저장됩니다.</p>
    </div>
  );
}
