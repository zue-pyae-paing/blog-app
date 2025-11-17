import type { Editor } from "@tiptap/react";
import { useEditorState } from "@tiptap/react";
import {
  Bold,
  Code2,
  HighlighterIcon,
  Italic,
  List,
  ListOrderedIcon,
  StrikethroughIcon,
} from "lucide-react";

const TipTapMenu = ({ editor }: { editor: Editor | null }) => {
  if (!editor) return null;

  const editorState = useEditorState({
    editor,
    selector: (ctx) => ({
      // bold
      isBold: ctx.editor.isActive("bold"),
      canBold: ctx.editor.can().chain().toggleBold().run(),

      // italic
      isItalic: ctx.editor.isActive("italic"),
      canItalic: ctx.editor.can().chain().toggleItalic().run(),

      // code
      isCode: ctx.editor.isActive("code"),
      canCode: ctx.editor.can().chain().toggleCode().run(),

      // strike
      isStrike: ctx.editor.isActive("strike"),
      canStrike: ctx.editor.can().chain().toggleStrike().run(),

      //hightlight
      isHightLight: ctx.editor.isActive("hightlight"),
      canHightLight: ctx.editor.can().chain().toggleHighlight().run(),

      // heading levels
      isH1: ctx.editor.isActive("heading", { level: 1 }),
      canH1: ctx.editor.can().chain().toggleHeading({ level: 1 }).run(),

      isH2: ctx.editor.isActive("heading", { level: 2 }),
      canH2: ctx.editor.can().chain().toggleHeading({ level: 2 }).run(),

      isH3: ctx.editor.isActive("heading", { level: 3 }),
      canH3: ctx.editor.can().chain().toggleHeading({ level: 3 }).run(),
    }),
  });

  const btn = `btn btn-sm btn-ghost btn-square`;
  const active = `bg-accent text-white`;

  return (
    <div className="sticky top-16 z-10 flex items-center gap-2 bg-base-100 border-b px-3 py-2 flex-wrap justify-start">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editorState.canBold}
        className={`${btn} ${editorState.isBold ? active : ""}`}
      >
        <Bold size={16} />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editorState.canItalic}
        className={`${btn} ${editorState.isItalic ? active : ""}`}
      >
        <Italic size={16} />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editorState.canStrike}
        className={`${btn} ${editorState.isStrike ? active : ""}`}
      >
        <StrikethroughIcon size={16} />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editorState.canCode}
        className={`${btn} ${editorState.isCode ? active : ""}`}
      >
        <Code2 size={16} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHighlight().run()}
        disabled={!editorState.canHightLight}
        className={`${btn} ${editorState.isHightLight ? active : ""}`}
      >
        <HighlighterIcon size={16} className="text-primary" />
      </button>

      <div className="md:ml-4 flex gap-1 md:border-l-2 bordrer-gray-200 ps-2">
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          disabled={!editorState.canH1}
          className={`${btn} ${editorState.isH1 ? active : ""}`}
        >
          H1
        </button>

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          disabled={!editorState.canH2}
          className={`${btn} ${editorState.isH2 ? active : ""}`}
        >
          H2
        </button>

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          disabled={!editorState.canH3}
          className={`${btn} ${editorState.isH3 ? active : ""}`}
        >
          H3
        </button>
      </div>
    </div>
  );
};

export default TipTapMenu;
