import api from "./axios";

// login
export const loginApi = (data) => api.post("/login", data);
export const registerApi = (data) => api.post("/register", data);
export const logoutApi = () => api.get("/logout");

// profile
export const profileApi = () => api.get("/user-profile");
export const profileUpdateApi = (data) => api.get("/update-profile", data);
