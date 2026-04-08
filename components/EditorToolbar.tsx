"use client";

import { useState } from "react";
import type { Editor } from "@tiptap/react";
import {
  TextB,
  TextItalic,
  TextHTwo,
  TextHThree,
  ListBullets,
  Quotes,
  Minus,
  Image as ImageIcon,
  Play,
} from "@phosphor-icons/react";
import { MediaEmbedDialog, ImageInsertDialog } from "./MediaEmbedDialog";

interface EditorToolbarProps {
  editor: Editor | null;
}

interface ToolbarButtonProps {
  onClick: () => void;
  isActive?: boolean;
  icon: React.ReactNode;
  label: string;
}

function ToolbarButton({ onClick, isActive, icon, label }: ToolbarButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      className={`flex items-center justify-center w-8 h-8 rounded-md transition-colors ${
        isActive
          ? "bg-[#1A1A1A] text-white"
          : "text-gray-500 hover:text-[#1A1A1A] hover:bg-gray-100"
      }`}
    >
      {icon}
    </button>
  );
}

export function EditorToolbar({ editor }: EditorToolbarProps) {
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [showEmbedDialog, setShowEmbedDialog] = useState(false);

  if (!editor) return null;

  const tools = [
    {
      icon: <TextB size={16} weight="bold" />,
      label: "Bold",
      onClick: () => editor.chain().focus().toggleBold().run(),
      isActive: editor.isActive("bold"),
    },
    {
      icon: <TextItalic size={16} weight="regular" />,
      label: "Italic",
      onClick: () => editor.chain().focus().toggleItalic().run(),
      isActive: editor.isActive("italic"),
    },
    null,
    {
      icon: <TextHTwo size={16} weight="regular" />,
      label: "Heading 2",
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: editor.isActive("heading", { level: 2 }),
    },
    {
      icon: <TextHThree size={16} weight="regular" />,
      label: "Heading 3",
      onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      isActive: editor.isActive("heading", { level: 3 }),
    },
    null,
    {
      icon: <Quotes size={16} weight="regular" />,
      label: "Quote",
      onClick: () => editor.chain().focus().toggleBlockquote().run(),
      isActive: editor.isActive("blockquote"),
    },
    {
      icon: <ListBullets size={16} weight="regular" />,
      label: "Bullet List",
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      isActive: editor.isActive("bulletList"),
    },
    {
      icon: <Minus size={16} weight="regular" />,
      label: "Divider",
      onClick: () => editor.chain().focus().setHorizontalRule().run(),
      isActive: false,
    },
    null,
    {
      icon: <ImageIcon size={16} weight="regular" />,
      label: "이미지 삽입",
      onClick: () => setShowImageDialog(true),
      isActive: false,
    },
    {
      icon: <Play size={16} weight="regular" />,
      label: "미디어 삽입",
      onClick: () => setShowEmbedDialog(true),
      isActive: false,
    },
  ];

  return (
    <>
      <div className="flex items-center gap-0.5 px-3 py-2 border-b border-gray-200 bg-gray-50/50">
        {tools.map((tool, i) =>
          tool === null ? (
            <div key={`sep-${i}`} className="w-px h-4 bg-gray-200 mx-1" />
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

      {showImageDialog && (
        <ImageInsertDialog
          onInsert={(url) => {
            editor.chain().focus().setImage({ src: url }).run();
            setShowImageDialog(false);
          }}
          onClose={() => setShowImageDialog(false)}
        />
      )}

      {showEmbedDialog && (
        <MediaEmbedDialog
          onInsert={(embedUrl, platform, height) => {
            editor.chain().focus().setEmbed({ src: embedUrl, platform, height }).run();
            setShowEmbedDialog(false);
          }}
          onClose={() => setShowEmbedDialog(false)}
        />
      )}
    </>
  );
}
