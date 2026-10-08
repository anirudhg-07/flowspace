import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

// Use the public tunnel URL to bypass your router's device isolation
const BASE_URL = 'https://03a1178e831612.lhr.life/api';

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
