"use client";
import "./styles.scss";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import { Card } from "@/components/ui/card"; // Import the Card component

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-1">
      <Button
        variant={
          editor.isActive("heading", { level: 1 }) ? "secondary" : "outline"
        }
        size="sm"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
      >
        H1
      </Button>
      <Button
        variant={
          editor.isActive("heading", { level: 2 }) ? "secondary" : "outline"
        }
        size="sm"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        H2
      </Button>
      <Button
        variant={
          editor.isActive("heading", { level: 3 }) ? "secondary" : "outline"
        }
        size="sm"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
      >
        H3
      </Button>
      <Button
        variant={editor.isActive("paragraph") ? "secondary" : "outline"}
        size="sm"
        onClick={() => editor.chain().focus().setParagraph().run()}
      >
        Paragraph
      </Button>
      <Button
        variant={editor.isActive("bold") ? "secondary" : "outline"}
        size="sm"
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        Bold
      </Button>
      <Button
        variant={editor.isActive("italic") ? "secondary" : "outline"}
        size="sm"
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        Italic
      </Button>
      <Button
        variant={editor.isActive("strike") ? "secondary" : "outline"}
        size="sm"
        onClick={() => editor.chain().focus().toggleStrike().run()}
      >
        Strike
      </Button>
      <Button
        variant={editor.isActive("highlight") ? "secondary" : "outline"}
        size="sm"
        onClick={() => editor.chain().focus().toggleHighlight().run()}
      >
        Highlight
      </Button>
      <Button
        variant={
          editor.isActive({ textAlign: "left" }) ? "secondary" : "outline"
        }
        size="sm"
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
      >
        Left
      </Button>
      <Button
        variant={
          editor.isActive({ textAlign: "center" }) ? "secondary" : "outline"
        }
        size="sm"
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
      >
        Center
      </Button>
      <Button
        variant={
          editor.isActive({ textAlign: "right" }) ? "secondary" : "outline"
        }
        size="sm"
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
      >
        Right
      </Button>
      <Button
        variant={
          editor.isActive({ textAlign: "justify" }) ? "secondary" : "outline"
        }
        size="sm"
        onClick={() => editor.chain().focus().setTextAlign("justify").run()}
      >
        Justify
      </Button>
    </div>
  );
};

export default ({ content }: { content: any }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight,
    ],
    content: content,
  });

  useEffect(() => {
    if (editor) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  return (
    <>
      <MenuBar editor={editor} />
      <Card className="h-auto border border-gray-300 text-center">
        <EditorContent editor={editor} />
      </Card>
    </>
  );
};
