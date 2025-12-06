import { create } from "zustand";
import type { AdminCategory, AdminPaginationMeta, Category } from "../types/blog";


interface AdminCategoryStore {
  categories: AdminCategory[];
  category:Category| null;
  totalCategories: number;
  loading: boolean;
  meta: AdminPaginationMeta;

  setTotalCategories: (v: number) => void;
  setCategories: (data: AdminCategory[]) => void;
  addCategory: (data: Category) => void;
  setLoading: (v: boolean) => void;
  setMeta: (meta: AdminPaginationMeta) => void;
  deleteCategory: (id: string | undefined) => void;
}

export const useAdminCategoryStore = create<AdminCategoryStore>((set) => ({
  categories: [],
  category: null,
  totalCategories: 0,
  loading: false,
  meta: {
    totalPages: 0,
    currentPage: 1,
    hasNextPage: false,
    hasPrevPage: false,
    limit: 5,
  },
  addCategory:(category) => set({category}),
  setTotalCategories: (v) => set({ totalCategories: v }),
  setCategories: (data) => set({ categories: data }),
  setLoading: (v) => set({ loading: v }),
  setMeta: (meta) => set({ meta }),
  deleteCategory: (slug) =>
    set((state) => ({
      categories: state.categories.filter((category) => category.slug !== slug),
    })),
}));
export default useAdminCategoryStore;
