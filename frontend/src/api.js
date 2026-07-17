import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api'   
});

//attach JWT token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
},
(error) =>  Promise.reject(error)
);

// Handle API errors
API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response || error.message);
    return Promise.reject(error);
  }
);

//Authentication
export const register = (data) => API.post('/auth/register', data);
export const login = (data) => API.post('/auth/login', data);

// Escrow Management
export const createEscrow = (data) => API.post('/escrow', data);
export const getAllEscrows = (params) => API.get('/escrow', { params });
export const getEscrow = (id) => API.get(`/escrow/${id}`);
export const markDelivered = (id) => API.put(`/escrow/${id}/deliver`);
export const submitSignature = (id, signature) => API.put(`/escrow/${id}/sign`, { signature });

export default API;