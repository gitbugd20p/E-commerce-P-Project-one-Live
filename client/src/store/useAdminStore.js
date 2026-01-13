import { create } from "zustand";
import { getAdminStatsApi, getAllUsersApi } from "../api/admin.api";
import { toast } from "react-toastify";

const useAdminStore = create((set, get) => ({
  adminStats: [],
  loading: false,
  error: null,

  fetchAdminStats: async () => {
    set({ loading: true, error: null });
    try {
      const res = await getAdminStatsApi();
      set({ loading: false, adminStats: res.data.data });
    } catch (error) {
      set({
        loading: false,
        error:
          error?.response?.data?.message || "Failed to get admin-stats data!",
      });
      toast.error("There is a error in getting admin stats, try again!");
    }
  },

  users: [],
  userLoading: false,
  loadUsers: async () => {
    if (get().users.length === 0) {
      set({ userLoading: true });
    }
    try {
      const res = await getAllUsersApi();
      set({ users: res.data.data, userLoading: false });
    } catch (error) {
      console.log("Getting all user error: ", error);
      set({ userLoading: false });
    }
  },
}));

export default useAdminStore;
