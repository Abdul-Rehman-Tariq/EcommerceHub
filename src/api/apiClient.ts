import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Debug: Log the API URL being used
console.log('🔍 API_BASE_URL:', API_BASE_URL);
console.log('🔍 VITE_API_URL env var:', import.meta.env.VITE_API_URL);

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add JWT token
apiClient.interceptors.request.use(
  (config) => {
    console.log('🚀 Making API request to:', config.url, 'with base URL:', config.baseURL);
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('❌ Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
apiClient.interceptors.response.use(
  (response) => {
    console.log('✅ API response received:', response.config.url, response.status);
    return response;
  },
  (error) => {
    console.error('❌ API error:', error.message);
    console.error('❌ Error details:', error.response?.data || error);
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;