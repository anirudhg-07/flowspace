import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

// Use the production Vercel URL
const BASE_URL = 'https://flowspace-six-omega.vercel.app/api';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 10 second timeout
});

api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync('accessToken');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
