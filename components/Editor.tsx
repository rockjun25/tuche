"use client";

import { useEffect } from "react";
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

const MAX_INLINE_IMAGE_BYTES = 2 * 1024 * 1024;
const MAX_IMAGE_WIDTH = 1600;

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== "string") {
        reject(new Error("이미지 변환 실패"));
        return;
      }
      resolve(reader.result);
    };
    reader.onerror = () => reject(new Error("이미지 읽기 실패"));
    reader.readAsDataURL(file);
  });
}

function estimateBase64Bytes(dataUrl: string) {
  const base64 = dataUrl.split(",")[1] ?? "";
  return Math.floor((base64.length * 3) / 4);
}

function loadImage(dataUrl: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("이미지 로드 실패"));
    img.src = dataUrl;
  });
}

async function compressImageDataUrl(dataUrl: string) {
  const image = await loadImage(dataUrl);
  const ratio = image.width > MAX_IMAGE_WIDTH ? MAX_IMAGE_WIDTH / image.width : 1;
  const width = Math.max(1, Math.round(image.width * ratio));
  const height = Math.max(1, Math.round(image.height * ratio));

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  if (!ctx) return dataUrl;

  ctx.drawImage(image, 0, 0, width, height);

  const webp = canvas.toDataURL("image/webp", 0.82);
  if (estimateBase64Bytes(webp) <= estimateBase64Bytes(dataUrl)) return webp;

  return canvas.toDataURL("image/jpeg", 0.8);
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

        event.preventDefault();
        const insertPos = view.state.selection.from;

        void (async () => {
          try {
            let src = await readFileAsDataUrl(file);
            if (estimateBase64Bytes(src) > MAX_INLINE_IMAGE_BYTES) {
              src = await compressImageDataUrl(src);
            }

            if (estimateBase64Bytes(src) > MAX_INLINE_IMAGE_BYTES) {
              window.alert("이미지 용량이 너무 커서 붙여넣을 수 없습니다. 이미지 크기를 줄이거나 URL 삽입을 사용해주세요.");
              return;
            }

            const imageType = view.state.schema.nodes.image;
            if (!imageType) return;

            const imageNode = imageType.create({ src });
            const tr = view.state.tr.insert(insertPos, imageNode);
            view.dispatch(tr.scrollIntoView());
          } catch {
            window.alert("이미지 붙여넣기에 실패했습니다.");
          }
        })();

        return true;
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (!editor) return;

    const currentHtml = editor.getHTML();
    if (content !== currentHtml) {
      editor.commands.setContent(content || "", { emitUpdate: false });
    }
  }, [editor, content]);

  return (
    <div className="rounded-lg overflow-hidden border border-gray-200 bg-white">
      <EditorToolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
