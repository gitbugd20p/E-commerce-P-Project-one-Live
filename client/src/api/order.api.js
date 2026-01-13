import api from "./axios";

export const createOrderApi = (payload) => api.post("/orders", payload);

export const getMyOrdersApi = () => api.get("/orders/my");

export const getAllOrdersApi = () => api.get("/orders");

export const updateOrderStatusApi = (id, status) =>
  api.put(`/orders/${id}/status`, { status });
