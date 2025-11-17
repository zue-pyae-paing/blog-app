 import useStoreComment from "../hooks/useStoreComment";

const CommentInput = () => {
  const {
    handleChangeComment,
    clearComment,
    handleSendComment,
    loading,
    comment,
  } = useStoreComment();
  return (
    <div className="sticky top-20 flex items-center flex-col gap-y-3  ">
      <h2 className=" text-xl font-bold text-primary self-start p-2">Write a comment</h2>
      <textarea
        onChange={handleChangeComment}
        className="textarea textarea-secondary-content w-full bg-base-200"
        placeholder="Share your thoughts on this article..."
        value={comment}
      ></textarea>

      <div className="space-x-3 self-end  ">
        <button
          className=" btn btn-secondary btn-dash md:btn-md btn-sm"
          onClick={clearComment}
        >
          Clear
        </button>
        <button
          disabled={loading}
          type="button"
          className=" btn btn-primary  md:btn-md btn-sm"
          onClick={handleSendComment}
        >
          {loading ? "Loading..." : "Post Comment"}
        </button>
      </div>
    </div>
  );
};

export default CommentInput;
