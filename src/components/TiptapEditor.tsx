"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import Heading from "@tiptap/extension-heading";
import Color from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import History from "@tiptap/extension-history";
import TextStyle from "@tiptap/extension-text-style"; // ✅ Bắt buộc để dùng Color
import { useState } from "react";

const TiptapEditor = ({ content, setContent }: any) => {
  const [imageUrl, setImageUrl] = useState("");

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ history: false }), // ⛔ Tắt history trong StarterKit
      History, // ✅ Thêm lại History riêng lẻ
      TextStyle, // ✅ Cần thiết để dùng Color
      Color, // ✅ Đổi màu chữ
      Bold,
      Italic,
      Link,
      Image,
      Heading.configure({ levels: [1, 2, 3, 4, 5, 6] }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      BulletList,
      OrderedList,
      ListItem,
    ],
    content: content || "<p>Nhập nội dung...</p>",
    onUpdate: ({ editor }) => setContent(editor.getHTML()),
  });

  if (!editor) return <p>Loading editor...</p>;

  return (
    <div className="border border-gray-300 rounded p-2 bg-white">
      {/* Thanh công cụ */}
      <div className="mb-2 flex flex-wrap gap-2 border-b pb-2">
        <button onClick={() => editor.chain().focus().toggleBold().run()} className="p-1 border rounded">
          <strong>B</strong>
        </button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()} className="p-1 border rounded">
          <em>I</em>
        </button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className="p-1 border rounded">
          H1
        </button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className="p-1 border rounded">
          H2
        </button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className="p-1 border rounded">
          H3
        </button>
        <button onClick={() => editor.chain().focus().setTextAlign("left").run()} className="p-1 border rounded">
          ⬅️
        </button>
        <button onClick={() => editor.chain().focus().setTextAlign("center").run()} className="p-1 border rounded">
          ⏺
        </button>
        <button onClick={() => editor.chain().focus().setTextAlign("right").run()} className="p-1 border rounded">
          ➡️
        </button>
        <button onClick={() => editor.chain().focus().toggleBulletList().run()} className="p-1 border rounded">
          •••
        </button>
        <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className="p-1 border rounded">
          1️⃣ 2️⃣ 3️⃣
        </button>
        <button onClick={() => editor.chain().focus().undo().run()} className="p-1 border rounded">
          ↩️ Undo
        </button>
        <button onClick={() => editor.chain().focus().redo().run()} className="p-1 border rounded">
          ↪️ Redo
        </button>

        {/* Nút chọn màu chữ */}
        <input
          type="color"
          onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
          className="border p-1 rounded"
        />

        {/* Input chèn hình ảnh */}
        <input
          type="text"
          placeholder="Dán URL hình ảnh"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="border p-1 rounded w-40"
        />
        <button
          onClick={() => {
            if (imageUrl) {
              editor.chain().focus().setImage({ src: imageUrl }).run();
              setImageUrl(""); // Xóa input sau khi thêm ảnh
            }
          }}
          className="p-1 border rounded bg-blue-500 text-white"
        >
          🖼️ Thêm ảnh
        </button>
      </div>

      {/* Nội dung trình soạn thảo */}
      <EditorContent editor={editor} />
    </div>
  );
};

export default TiptapEditor;
