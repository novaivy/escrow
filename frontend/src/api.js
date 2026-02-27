import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api'   // Make sure this matches your backend URL
});

// Optional: interceptors for error handling
API.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error.response || error.message);
    return Promise.reject(error);
  }
);

export const createEscrow = (data) => API.post('/escrow', data);
export const getAllEscrows = (params) => API.get('/escrow', { params });
export const getEscrow = (id) => API.get(`/escrow/${id}`);
export const markDelivered = (id) => API.put(`/escrow/${id}/deliver`);
export const submitSignature = (id, signature) => API.put(`/escrow/${id}/sign`, { signature });

export default API;