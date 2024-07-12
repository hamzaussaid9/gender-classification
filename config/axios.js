import axios from 'axios';
import { getItem } from './storage';


const axiosInstance = axios.create({
  baseURL: 'http://192.168.10.5:1000',
  timeout: 30000,
  timeoutErrorMessage: 'Request waiting time exceeded, request cancelled',
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await getItem('auth');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (config.data instanceof FormData) {
      config.headers['Content-Type'] = 'multipart/form-data';
    } else {
      config.headers['Content-Type'] = 'application/json';
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response.data
)

export default axiosInstance;
