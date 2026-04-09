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
      handlePaste: (view, event) => {
        const clipboard = event.clipboardData;
        if (!clipboard) return false;

        const items = Array.from(clipboard.items || []);
        const imageItem = items.find((item) => item.type.startsWith("image/"));
        if (!imageItem) return false;

        const file = imageItem.getAsFile();
        if (!file) return false;

        const insertPos = view.state.selection.from;
        const reader = new FileReader();

        reader.onload = () => {
          const src = reader.result;
          if (typeof src !== "string") return;

          const imageType = view.state.schema.nodes.image;
          if (!imageType) return;

          const imageNode = imageType.create({ src });
          const tr = view.state.tr.insert(insertPos, imageNode);
          view.dispatch(tr.scrollIntoView());
        };

        reader.readAsDataURL(file);
        return true;
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
