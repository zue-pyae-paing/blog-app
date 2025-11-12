import type { Editor } from "@tiptap/react";
import { useEditorState } from "@tiptap/react";

const TipTapMenu = ({ editor }: { editor: Editor }) => {
  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        isBold: ctx.editor.isActive("bold") ?? false,
        canBold: ctx.editor.can().chain().toggleBold().run() ?? false,
        isItalic: ctx.editor.isActive("italic") ?? false,
        canItalic: ctx.editor.can().chain().toggleItalic().run() ?? false,
        isCode: ctx.editor.isActive("code") ?? false,
        canCode: ctx.editor.can().chain().toggleCode().run() ?? false,
        isStrike: ctx.editor.isActive("strike") ?? false,
        canStrike: ctx.editor.can().chain().toggleStrike().run() ?? false,
      };
    },
  });

  return (
    <div className=" space-x-3">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editorState.canBold}
        className={`${editorState.isBold ? "bg-accent" : ""} btn btn-square `}
      >
        Bold
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`${editorState.isItalic ? "bg-accent" : ""} btn btn-square `}
      >
        Italic
      </button>
      <button
        type="button"
        className={`${editorState.isCode ? "bg-accent" : ""} btn btn-square `}
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editorState.canCode}
      >
        Code
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setParagraph().run()}
        className="btn "
      >
        Paragraph
      </button>
      <button
        type="button"
        className={`${editorState.isStrike ? "bg-accent" : ""} btn btn-square `}
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editorState.canStrike}
      >
        Strike
      </button>
    </div>
  );
};

export default TipTapMenu;
