import CategorySection from "../components/category/category-section";
import { Plus } from "lucide-react";
import Container from "../../../components/container";
import useAdminCategoryActions from "../hooks/useAdminCategoryActions";
import CreateCategoryModal from "../components/category/create-category-modal";


const CategoryManagePage = () => {
  const  actions = useAdminCategoryActions();

  return (
    <Container className=" space-y-4">
      <div className=" flex items-center justify-between">
        <div className=" space-y-2">
          <h1 className=" font-bold text-3xl ">Category Management</h1>
          <p>Manage and organize your blog categories</p>
        </div>

        <button className="btn btn-primary " onClick={()=>actions.showModal(true)}>
          <Plus className=" mr-2" /> Add Category
        </button>
        <CreateCategoryModal  actions={actions} editCategory= {actions.editCategory}/>
      </div>
      <CategorySection showModal={actions.showModal} />
    </Container>
  );
};

export default CategoryManagePage;
