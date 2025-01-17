import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:9091/v1/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 403) {
      console.error('Token expired or invalid:', error.response.data);
      window.location.href = '/login'; 
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;