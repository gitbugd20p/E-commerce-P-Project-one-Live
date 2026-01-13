import { create } from "zustand";
import { createOrderApi, getAllOrdersApi } from "../api/order.api";
import useCartStore from "./useCartStore";
import { getMyOrdersApi } from "../api/order.api";
import { toast } from "react-toastify";

const useOrderStore = create((set) => ({
  loading: false,
  success: false,
  error: null,

  placeOrder: async (orderData) => {
    set({ loading: true, error: null });

    try {
      await createOrderApi(orderData);
      useCartStore.getState().clearCart();
      set({ loading: false, success: true });
      toast.success("Order placed successfully!");
    } catch (error) {
      set({
        loading: false,
        error: error?.response?.data?.message || "Order failed!",
      });
      toast.error("There is a error in order placed, try again!");
    }
  },

  resetOrder: () => set({ success: false, error: null }),

  // my orders
  orders: [],
  myOrderLoading: false,
  myOrderError: null,

  fetchMyOrders: async () => {
    set({ myOrderLoading: true, myOrderError: null });
    try {
      const res = await getMyOrdersApi();
      set({ orders: res.data.data, myOrderLoading: false });
    } catch (error) {
      set({
        myOrderLoading: false,
        myOrderError: "Failed to load orders!",
        error,
      });
    }
  },

  allOrders: [],
  setAllOrders: (updateOrder) => set({ allOrders: updateOrder }),
  allOrdersLoading: false,
  allOrdersError: null,

  fetchAllOrders: async () => {
    try {
      set({ allOrdersLoading: true, allOrdersError: null });

      const res = await getAllOrdersApi();
      set({ allOrders: res.data.data, allOrdersLoading: false });
    } catch (error) {
      set({ allOrdersLoading: false, allOrdersError: error });
      console.log("Fetching all Orders error: ", error);
    }
  },
}));

export default useOrderStore;
