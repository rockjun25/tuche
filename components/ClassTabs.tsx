"use client";

import { useState } from "react";

const TAB_LABELS = ["강의계획서", "주차학습", "과제", "자료실"] as const;
export type TabLabel = (typeof TAB_LABELS)[number];

interface ClassTabsProps {
  children: Record<TabLabel, React.ReactNode>;
}

export function ClassTabs({ children }: ClassTabsProps) {
  const [active, setActive] = useState<TabLabel>("강의계획서");

  return (
    <div>
      <div className="flex border-[4px] border-black bg-white mb-6 overflow-x-auto">
        {TAB_LABELS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={`flex-none md:flex-1 min-w-[110px] md:min-w-0 px-4 py-3 text-sm font-black uppercase transition-colors whitespace-nowrap ${
              active === tab
                ? "bg-black text-white"
                : "bg-white text-black hover:bg-neutral-100"
            } ${tab !== TAB_LABELS[0] ? "border-l-[3px] border-black" : ""}`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div>{children[active]}</div>
    </div>
  );
}
