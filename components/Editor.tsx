"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorToolbar } from "./EditorToolbar";

interface EditorProps {
  content?: string;
  onChange: (html: string) => void;
}

export function Editor({ content = "", onChange }: EditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
      }),
      Placeholder.configure({
        placeholder: "비평을 작성해주세요...",
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class: "tiptap px-6 py-5 focus:outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  return (
    <div
      className="rounded-2xl overflow-hidden border border-warm-gray/30 bg-white/80 transition-all duration-500 focus-within:border-gold/60 focus-within:shadow-[0_0_0_3px_rgba(253,199,0,0.12)]"
      style={{ transitionTimingFunction: "cubic-bezier(0.32,0.72,0,1)" }}
    >
      <EditorToolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
