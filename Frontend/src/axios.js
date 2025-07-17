import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000", // đúng với server Express backend
});

// Add request interceptor to include authorization header
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle auth errors
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("username");
      window.location.href = "/admin/login";
    }
    return Promise.reject(error);
  }
);

export default instance;
