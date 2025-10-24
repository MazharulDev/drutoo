import axios from "axios";
import { envConfig } from "../config/envConfig";
import { getFromAsyncStorage } from "../../utils/localStorage";
import { authKey } from "../../constants/storageKey";

const instance = axios.create();
instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.headers["Accept"] = "application/json";
instance.defaults.timeout = 60000;

// Add a request interceptor
instance.interceptors.request.use(
  async function (config) {
    // Get token from storage
    const accessToken = await getFromAsyncStorage(authKey);
    if (accessToken) {
      config.headers.Authorization = accessToken;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Transform the data property while keeping the full AxiosResponse structure
    const transformedData = {
      data: response?.data?.data || response?.data,
      meta: response?.data?.meta,
    };
    response.data = transformedData;
    return response;
  },
  function (error) {
    const responseObject = {
      statusCode: error?.response?.data?.statusCode || 500,
      message: error?.response?.data?.message || "Something went wrong",
      errorMessages: error?.response?.data?.message,
    };
    return Promise.reject(responseObject);
  }
);

export { instance };
