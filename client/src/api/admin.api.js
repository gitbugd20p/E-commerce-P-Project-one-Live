import api from "./axios";

export const getAdminStatsApi = () => api.get("/admin-stats");

export const getAllUsersApi = () => api.get("/all-user");
