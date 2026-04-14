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

  const toggle = (id: string) => {
    const next = { ...checked, [id]: !checked[id] };
    setChecked(next);
    localStorage.setItem(storageKey, JSON.stringify(next));
  };

  return (
    <div className="border-4 border-black bg-white p-5">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm font-bold">진도</p>
        <p className="text-sm font-bold">{doneCount}/{items.length} ({percent}%)</p>
      </div>
      <div className="space-y-2 max-h-[420px] overflow-auto pr-1">
        {items.map((item) => (
          <label
            key={item.id}
            className="flex items-center gap-3 border-2 border-black p-2 cursor-pointer hover:bg-yellow-100"
          >
            <input
              type="checkbox"
              checked={!!checked[item.id]}
              onChange={() => toggle(item.id)}
              className="h-4 w-4 accent-black"
            />
            {item.href ? (
              <a href={item.href} target="_blank" rel="noreferrer" className="text-sm underline">
                {item.label}
              </a>
            ) : (
              <span className="text-sm">{item.label}</span>
            )}
          </label>
        ))}
      </div>
    </div>
  );
}
