import api from "./axios";

export const getAllCategoriesApi = () => api.get("/category");

export const getProductsByCategoryApi = (categoryName) =>
  api.get(`/category/${categoryName}`);
