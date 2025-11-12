import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";
import TipTapMenu from "./tip-tap-menu";
import Placeholder from "@tiptap/extension-placeholder";

interface TipTapEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const Tiptap = ({ value, onChange }: TipTapEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder: "Start writing your blog post here..." }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, []);

  return (
    <div className="border rounded-lg p-3 min-h-[200px] prose max-w-none space-y-4">
      <TipTapMenu editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default Tiptap;
