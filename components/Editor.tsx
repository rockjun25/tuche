"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Image from "@tiptap/extension-image";
import { EmbedExtension } from "./EmbedExtension";
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
        placeholder: "글을 작성해주세요...",
      }),
      Image.configure({
        inline: false,
        HTMLAttributes: {
          class: "editor-image",
        },
      }),
      EmbedExtension,
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
    <div className="rounded-lg overflow-hidden border border-gray-200 bg-white">
      <EditorToolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
