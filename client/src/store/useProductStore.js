import { create } from "zustand";
import { getProductsApi, getSingleProductApi } from "../api/product.api";

const useProductStore = create((set) => ({
  products: [],
  product: null,
  loading: false,
  filters: {
    search: "",
    category: "",
    brand: "",
    minPrice: "",
    maxPrice: "",
  },

  setFilter: (name, value) =>
    set((state) => ({
      filters: { ...state.filters, [name]: value },
    })),

  resetFilters: () => {
    set({
      filters: {
        search: "",
        category: "",
        brand: "",
        minPrice: "",
        maxPrice: "",
      },
    });
    const { fetchProducts } = useProductStore.getState();
    fetchProducts();
  },

  fetchProducts: async () => {
    set({ loading: true });
    try {
      const { filters } = useProductStore.getState();
      const res = await getProductsApi(filters);

      set({ products: res.data.data, loading: false });
    } catch (error) {
      set({ loading: false });
      console.log("Fetching all products error: ", error);
    }
  },

  fetchSingleProduct: async (id) => {
    set({ loading: true });
    try {
      const res = await getSingleProductApi(id);

      set({ product: res.data.data, loading: false });
    } catch (error) {
      set({ loading: false });
      console.log("Fetching single product error: ", error);
    }
  },
}));

export default useProductStore;
