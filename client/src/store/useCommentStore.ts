import { create } from "zustand";
import type { Comment } from "../types/comment";

interface CommentState {
  comments: Comment[];
  setComments: (comments: Comment[]) => void;
  addComment: (comment: Comment) => void;
  updatedCommet: (cmtId: string, comment: Comment) => void;
  deleteComment: (cmtId: string) => void;
}
const useCommentStore = create<CommentState>((set) => ({
  comments: [],
  setComments: (comments) => set({ comments }),
  addComment: (comment) =>
    set((state) => ({ comments: [comment, ...state.comments] })),
  updatedCommet: (cmtId, updateComment) =>
    set((state) => ({
      comments: state.comments.map((comment) =>
        comment._id === cmtId ? updateComment : comment
      ),
    })),
  deleteComment: (cmtId) =>
    set((state) => ({
      comments: state.comments.filter((comment) => comment._id !== cmtId),
    })),
}));

export default useCommentStore;
