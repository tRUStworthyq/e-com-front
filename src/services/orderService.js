import api from './api';

export const getOrders = async (page = 0, size = 10) => {
  const response = await api.get('/api/order/orders', {
    params: { page, size }
  });
  return response.data;
};

export const getOrder = async (id) => {
  const response = await api.get(`/api/order/${id}`);
  return response.data;
}

export const createOrder = async (items) => {
  const response = await api.post('/api/order/create', items);
  return response.data;
};

export const cancelOrder = async (orderId) => {
  await api.delete(`/api/order/${orderId}`);
};