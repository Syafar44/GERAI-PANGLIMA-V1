import React, { useCallback } from "react";
import classNames from "classnames";
// => Tiptap packages
import { useEditor, EditorContent, Editor } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Link from "@tiptap/extension-link";
import Bold from "@tiptap/extension-bold";
import Underline from "@tiptap/extension-underline";
import Italic from "@tiptap/extension-italic";
import Strike from "@tiptap/extension-strike";
import Code from "@tiptap/extension-code";
import History from "@tiptap/extension-history";
// Custom
import * as Icons from "./Icon";

type TextEditorProps = {
  onChange?: (html: string) => void;
};

export function TextEditor({ onChange }: TextEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      Document,
      History,
      Paragraph,
      Text,
      Link.configure({
        openOnClick: false,
      }),
      Bold,
      Underline,
      Italic,
      Strike,
      Code,
    ],
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      if (onChange) onChange(html);
    },
  }) as Editor;

  const toggleBold = useCallback(() => {
    editor.chain().focus().toggleBold().run();
  }, [editor]);

  const toggleUnderline = useCallback(() => {
    editor.chain().focus().toggleUnderline().run();
  }, [editor]);

  const toggleItalic = useCallback(() => {
    editor.chain().focus().toggleItalic().run();
  }, [editor]);

  const toggleStrike = useCallback(() => {
    editor.chain().focus().toggleStrike().run();
  }, [editor]);

  const toggleCode = useCallback(() => {
    editor.chain().focus().toggleCode().run();
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="relative w-full">
      {/* Menu toolbar */}
      <div className="absolute top-[2px] left-[2px] z-10 flex items-center gap-2 w-[calc(100%-4px)] h-10 px-2 rounded-t border-b border-gray-200 bg-white text-gray-600">
        <button
          className="flex items-center justify-center w-8 h-8 rounded hover:bg-gray-100 disabled:text-gray-300"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
        >
          <Icons.RotateLeft />
        </button>
        <button
          className="flex items-center justify-center w-8 h-8 rounded hover:bg-gray-100 disabled:text-gray-300"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
        >
          <Icons.RotateRight />
        </button>
        <button
          className={classNames(
            "flex items-center justify-center w-8 h-8 rounded hover:bg-gray-100",
            { "bg-gray-100 text-black": editor.isActive("bold") }
          )}
          onClick={toggleBold}
        >
          <Icons.Bold />
        </button>
        <button
          className={classNames(
            "flex items-center justify-center w-8 h-8 rounded hover:bg-gray-100",
            { "bg-gray-100 text-black": editor.isActive("underline") }
          )}
          onClick={toggleUnderline}
        >
          <Icons.Underline />
        </button>
        <button
          className={classNames(
            "flex items-center justify-center w-8 h-8 rounded hover:bg-gray-100",
            { "bg-gray-100 text-black": editor.isActive("italic") }
          )}
          onClick={toggleItalic}
        >
          <Icons.Italic />
        </button>
        <button
          className={classNames(
            "flex items-center justify-center w-8 h-8 rounded hover:bg-gray-100",
            { "bg-gray-100 text-black": editor.isActive("strike") }
          )}
          onClick={toggleStrike}
        >
          <Icons.Strikethrough />
        </button>
        <button
          className={classNames(
            "flex items-center justify-center w-8 h-8 rounded hover:bg-gray-100",
            { "bg-gray-100 text-black": editor.isActive("code") }
          )}
          onClick={toggleCode}
        >
          <Icons.Code />
        </button>
      </div>

      {/* Editor area */}
      <EditorContent
        editor={editor}
        className="mt-1 pt-12 px-2 pb-2 border-2 border-gray-300 rounded 
          focus:outline-none focus:border-black prose min-w-[600px] max-w-[600px]
          min-h-[200px] cursor-text"
      />
      <style jsx global>{`
        .ProseMirror {
          min-height: 200px;   /* biar area teks luas */
          height: 100%;        /* isi penuh */
          padding: 8px;        /* beri jarak biar nyaman */
          outline: none;       /* hilangkan border default */
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
