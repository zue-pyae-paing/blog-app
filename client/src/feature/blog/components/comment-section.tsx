import CommentInput from "./comment-input";
import { checkIsAuthorized } from "../../../utils/isAuthorize";
import useComment from "../hooks/useComment";
import { format } from "date-fns";
import { Edit2, Trash2, MoreVertical } from "lucide-react";
import useBlogCommentActions from "../hooks/useBlogCommentActions";
import { checkOwner } from "../../../utils/checkOwnder";

const CommentSection = () => {
  const isAuthorized = checkIsAuthorized();

  const { comments, loading, hasMore, sentryRef } = useComment();
  const { handleDeleteComment } = useBlogCommentActions();

  return (
    <section>
      <h2>Write a comment</h2>
      {isAuthorized && <CommentInput />}
      <div className=" space-y-3">
        {comments?.map((comment) => (
          <div
            key={comment?._id}
            className=" flex items-center gap-x-3 justify-between"
          >
            <div className=" flex-1 flex items-center gap-x-3 ">
              <div className=" w-10 h-10 overflow-hidden rounded-full bg-base-200 flex items-center justify-center">
                {comment?.author?.avatar ? (
                  <img
                    src={comment?.author?.avatar}
                    className=" w-full h-full object-cover"
                  />
                ) : (
                  <h2 className=" text-2xl font-bold text-primary">
                    {comment?.author?.username?.charAt(0).toUpperCase()}
                  </h2>
                )}
              </div>
              <div className=" flex-1">
                <div className=" flex gap-x-3">
                  <p className=" font-bold text-primary text-sm capitalize">
                    {comment?.author?.username}
                  </p>
                  <p className="text-xs">
                    {format(new Date(comment?.createdAt), "dd/MM/yyyy")}
                  </p>
                </div>
                <p>{comment?.content}</p>
              </div>
            </div>
            {isAuthorized && checkOwner(comment?.author?._id) && (
              <div className="dropdown ">
                <div
                  tabIndex={0}
                  role="button"
                  className="p-1 text-muted-foreground hover:text-foreground transition-colors hover:bg-base-300 rounded-full"
                >
                  <MoreVertical size={16} />
                </div>
                <ul
                  tabIndex={-1}
                  className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
                >
                  <li>
                    <a
                      className=" text-primary"
                      href={`/update/${comment?._id}`}
                    >
                      {" "}
                      <Edit2 size={16} tabIndex={-1} /> Edit
                    </a>
                  </li>
                  <li
                    onClick={() =>
                      handleDeleteComment(comment?._id, comment?.author?._id)
                    }
                  >
                    <a className=" text-error">
                      <Trash2 size={16} /> Delete
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        ))}
        {loading && <p className="text-gray-500">Loading more comments...</p>}
        {hasMore && <div ref={sentryRef} className="h-10" />}
      </div>
    </section>
  );
};

export default CommentSection;
