import CategorySection from "../components/category/category-section";
import { Plus } from "lucide-react";
import Container from "../../../components/container";
import useAdminCategoryActions from "../hooks/useAdminCategoryActions";

const CategoryManagePage = () => {
  const { register, handleSubmit, errors, isSubmitting, onSubmit,showModal,closeModal } =
    useAdminCategoryActions();
 
  return (
    <Container className=" space-y-4">
      <div className=" flex items-center justify-between">
        <div>
          <h1 className=" font-bold text-3xl ">Category Management</h1>
          <p>Manage and organize your blog categories</p>
        </div>

        <button className="btn btn-primary " onClick={showModal}>
          <Plus className=" mr-2" /> Add Category
        </button>
        <dialog id="my_modal_1" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg text-primary">Create Category</h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 mt-4">
              <label className="form-control ">
                <span className="label-text block mb-2 ">Category Name</span>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  {...register("name")}
                  placeholder="Enter category name..."
                />
                {errors.name && (
                  <p className="text-error text-xs mt-1">{errors.name.message}</p>
                )}
              </label>

              <div className="modal-action">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary"
                >
                  {isSubmitting ? "Creating..." : "Create"}
                </button>

                <button
                  type="button"
                  className="btn"
                  onClick={
                    isSubmitting ? () => {} : () => closeModal()
                  }
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </dialog>
      </div>
      <CategorySection />
    </Container>
  );
};

export default CategoryManagePage;
