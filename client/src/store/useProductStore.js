import { create } from "zustand";
import { getProductsApi, getSingleProductApi } from "../api/product.api";

const useProductStore = create((set, get) => ({
  products: [],
  product: null,
  loading: false,
  page: 1,
  hasMore: true,
  filters: {
    title: "",
    category: "",
    brand: "",
    minPrice: "",
    maxPrice: "",
  },

  setFilter: (updatedFilters) => {
    set((state) => ({
      filters: { ...state.filters, ...updatedFilters },
      page: 1,
      products: [],
    }));

    get().fetchProducts(false);
  },

  resetFilters: () => {
    set({
      filters: {
        title: "",
        category: "",
        brand: "",
        minPrice: "",
        maxPrice: "",
      },
    });

    get().fetchProducts(false);
  },

  fetchProducts: async (isLoadMore = false) => {
    if (get().loading) return
    set({ loading: true });
    try {
      const { filters, page, products } = useProductStore.getState();

      const currentPage = isLoadMore ? page : 1;

      const res = await getProductsApi({
        ...filters,
        page: currentPage,
        limit: 20,
      });

      set({
        products: isLoadMore ? [...products, ...res.data.data] : res.data.data,
        hasMore: res.data.hasMore,
        page: currentPage + 1,
        loading: false,
      });
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
