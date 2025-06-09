import api from "./api";

export const getOrCreateCart = async () => {
  const response = await api.get('/api/cart/');
  return response.data;
};

export const addItemToCart = async (item) => {
  const response = await api.post('/api/cart/add', item);
  return response.data;
};

export const updateItemQuantity = async (productId, quantity) => {
  const response = await api.patch('/api/cart/', {
    productId, 
    quantity 
  });
  return response.data;
};

export const removeItemFromCart = async (productId) => {
  const response = await api.delete(`/api/cart/${productId}`);
  return response.data;
};

export const clearCart = async () => {
  await api.delete('/api/cart/');
};