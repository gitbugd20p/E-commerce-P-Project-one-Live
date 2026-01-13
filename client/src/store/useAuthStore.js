import { create } from "zustand";
import { loginApi, logoutApi, registerApi } from "../api/auth.api";
import { toast } from "react-toastify";

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,
  isAuth: !!localStorage.getItem("user"),
  loading: false,
  error: null,

  login: async (data) => {
    set({ loading: true, error: null });
    try {
      const res = await loginApi(data);
      const user = res.data.data;

      localStorage.setItem("user", JSON.stringify(user));
      toast.success("Logged in successfully!");
      set({
        user,
        isAuth: true,
        loading: false,
      });

      return true;
    } catch (error) {
      set({
        loading: false,
        error: error?.response?.data?.message || "Login failed!",
      });
      toast.error("There is a error in log-in!");
      // console.log("Login Error (FE): ", error);
      throw error;
    }
  },

  register: async (data) => {
    set({ loading: true, error: null });
    try {
      await registerApi(data);
      set({ loading: false });
      toast.success("Register successfully!");
      return true;
    } catch (error) {
      set({
        loading: false,
        error: error?.response?.data?.message || "Register failed!",
      });
      // console.log("Register Error (FE): ", error);
      toast.error("Registration Failed, try again!");
      throw error;
    }
  },

  logout: async () => {
    localStorage.removeItem("user");
    await logoutApi();
    set({ user: null, isAuth: false });
    toast.success("Log-out successfully");
  },
}));

export default useAuthStore;
