"use client";

import type { Editor } from "@tiptap/react";
import {
  TextB,
  TextItalic,
  TextHTwo,
  TextHThree,
  Paragraph,
  ListBullets,
  Quotes,
} from "@phosphor-icons/react";

interface EditorToolbarProps {
  editor: Editor | null;
}

interface ToolbarButtonProps {
  onClick: () => void;
  isActive: boolean;
  icon: React.ReactNode;
  label: string;
}

function ToolbarButton({ onClick, isActive, icon, label }: ToolbarButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      className={`flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-300 active:scale-[0.92] ${
        isActive
          ? "bg-ink text-cream shadow-sm"
          : "text-ink/50 hover:text-ink hover:bg-ink/5"
      }`}
      style={{ transitionTimingFunction: "cubic-bezier(0.32,0.72,0,1)" }}
    >
      {icon}
    </button>
  );
}

export function EditorToolbar({ editor }: EditorToolbarProps) {
  if (!editor) return null;

  const tools = [
    {
      icon: <TextB size={18} weight="bold" />,
      label: "Bold",
      onClick: () => editor.chain().focus().toggleBold().run(),
      isActive: editor.isActive("bold"),
    },
    {
      icon: <TextItalic size={18} weight="regular" />,
      label: "Italic",
      onClick: () => editor.chain().focus().toggleItalic().run(),
      isActive: editor.isActive("italic"),
    },
    null,
    {
      icon: <TextHTwo size={18} weight="regular" />,
      label: "Heading 2",
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: editor.isActive("heading", { level: 2 }),
    },
    {
      icon: <TextHThree size={18} weight="regular" />,
      label: "Heading 3",
      onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      isActive: editor.isActive("heading", { level: 3 }),
    },
    {
      icon: <Paragraph size={18} weight="regular" />,
      label: "Paragraph",
      onClick: () => editor.chain().focus().setParagraph().run(),
      isActive: editor.isActive("paragraph") && !editor.isActive("heading"),
    },
    null,
    {
      icon: <ListBullets size={18} weight="regular" />,
      label: "Bullet List",
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      isActive: editor.isActive("bulletList"),
    },
    {
      icon: <Quotes size={18} weight="regular" />,
      label: "Quote",
      onClick: () => editor.chain().focus().toggleBlockquote().run(),
      isActive: editor.isActive("blockquote"),
    },
  ];

  return (
    <div className="flex items-center gap-1 px-3 py-2.5 border-b border-warm-gray/30 bg-cream/50">
      {tools.map((tool, i) =>
        tool === null ? (
          <div key={`sep-${i}`} className="w-px h-5 bg-warm-gray/30 mx-1" />
        ) : (
          <ToolbarButton
            key={tool.label}
            onClick={tool.onClick}
            isActive={tool.isActive}
            icon={tool.icon}
            label={tool.label}
          />
        )
      )}
    </div>
  );
}
