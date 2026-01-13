import { create } from "zustand";
import {
  getAllCategoriesApi,
  getProductsByCategoryApi,
} from "../api/category.api";

const useCategoryStore = create((set) => ({
  categories: [],
  categoryProducts: [],
  currentCategory: null,
  loading: false,
  error: null,

  fetchAllCategory: async () => {
    set({ loading: true, error: null });
    try {
      const res = await getAllCategoriesApi();
      set({ categories: res.data.data, loading: false });
    } catch (error) {
      set({ loading: false, error: "Failed to fetch categories" });
      console.log("Fetching all categories error: ", error);
    }
  },

  fetchProductByCategory: async (categoryName) => {
    set({ loading: true, error: null });
    try {
      const res = await getProductsByCategoryApi(categoryName);
      set({
        categoryProducts: res.data.data,
        currentCategory: categoryName,
        loading: false,
      });
    } catch (error) {
      set({
        loading: false,
        error: `Failed to fetch category: ${categoryName}`,
      });
      console.log("Fetching products by category error: ", error);
    }
  },
}));

export default useCategoryStore;
