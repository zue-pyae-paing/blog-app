const CreateCategoryModal = ({ actions }:any) => {
  const {
    modalRef,
    register,
    handleSubmit,
    errors,
    isSubmitting,
    onSubmit,
    closeModal,
    isCreateModal,
    editCategory
  } = actions;

 

  return (
    <dialog ref={modalRef} id="my_modal_1" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg text-primary">
          {isCreateModal ? "Create Category" : "Update Category"}
        </h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 mt-2">
          <label className="form-control">
            <span className="label-text block mb-4 font-semibold">Category Name</span>
            <input
              type="text"
              className="input input-bordered w-full"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-error text-xs mt-1">{errors.name.message}</p>
            )}
          </label>

          <div className="modal-action">
            <button type="submit" disabled={isSubmitting} className="btn btn-primary">
              {isSubmitting
                ? "Loading..."
                : isCreateModal
                ? "Create"
                : "Update"}
            </button>

            <button type="button" className="btn" onClick={closeModal}>
              Close
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default CreateCategoryModal;