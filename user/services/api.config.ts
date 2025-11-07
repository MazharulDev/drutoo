import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Update this with your server URL
export const API_BASE_URL = "https://qqmdmc91-5000.inc1.devtunnels.ms/api/v1";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid - clear storage and redirect to login
      await AsyncStorage.removeItem("accessToken");
      await AsyncStorage.removeItem("userData");
    }
    return Promise.reject(error);
  }
);

export default apiClient;
