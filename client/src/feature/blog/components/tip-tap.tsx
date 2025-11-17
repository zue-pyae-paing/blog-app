import { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";
import Placeholder from "@tiptap/extension-placeholder";
import TipTapMenu from "./tip-tap-menu";
import HightLight from "@tiptap/extension-highlight";


interface TipTapEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const Tiptap = ({ value, onChange }: TipTapEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Heading.configure({ levels: [1, 2, 3] }),
      HightLight,
      Placeholder.configure({
        placeholder: "Start writing your blog post here...",
      }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class:
          "min-h-[200px] p-4 focus:outline-none prose prose-sm sm:prose lg:prose-lg max-w-none",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value]);

  return (
    <div className="border rounded-lg bg-base-100 shadow-sm">
      <TipTapMenu editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default Tiptap;
