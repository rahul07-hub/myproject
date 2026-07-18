import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/employees',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Centralized error handling interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.status, error.message);
    return Promise.reject(error);
  }
);

export default api;
