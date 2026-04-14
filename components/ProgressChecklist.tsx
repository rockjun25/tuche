"use client";

import { useMemo, useState } from "react";

interface ProgressChecklistProps {
  storageKey: string;
  items: { id: string; label: string; href?: string }[];
}

export function ProgressChecklist({ storageKey, items }: ProgressChecklistProps) {
  const [checked, setChecked] = useState<Record<string, boolean>>(() => {
    if (typeof window === "undefined") return {};
    try {
      const raw = localStorage.getItem(storageKey);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });

  const doneCount = useMemo(
    () => items.filter((item) => checked[item.id]).length,
    [items, checked]
  );

  const percent = items.length === 0 ? 0 : Math.round((doneCount / items.length) * 100);

  const save = (next: Record<string, boolean>) => {
    setChecked(next);
    localStorage.setItem(storageKey, JSON.stringify(next));
  };

  const toggle = (id: string) => {
    const next = { ...checked, [id]: !checked[id] };
    save(next);
  };

  const markDone = (id: string) => {
    if (checked[id]) return;
    const next = { ...checked, [id]: true };
    save(next);
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
              <a
                href={item.href}
                target="_blank"
                rel="noreferrer"
                onClick={() => markDone(item.id)}
                className="text-sm font-semibold underline"
              >
                {item.label}
              </a>
            ) : (
              <span className="text-sm font-semibold">{item.label}</span>
            )}
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs font-semibold text-[#333]">링크 클릭 시 자동 체크됩니다.</p>
    </div>
  );
}
