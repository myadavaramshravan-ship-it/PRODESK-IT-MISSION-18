import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

export const getInventory = async (params = {}) => {
  const response = await api.get("/inventory", {
    params
  });

  return response.data;
};

export const getAnalytics = async () => {
  const response = await api.get("/analytics");

  return response.data;
};

export const createProduct = async (product) => {
  const response = await api.post("/inventory", product);

  return response.data;
};

export const updateProduct = async (id, product) => {
  const response = await api.put(
    `/inventory/${id}`,
    product
  );

  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await api.delete(
    `/inventory/${id}`
  );

  return response.data;
};

export default api;