import React, { createContext, useContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import api from '../api/client';

type User = {
  id: string;
  email: string;
  fullName: string | null;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (data: any) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const token = await SecureStore.getItemAsync('accessToken');
        if (token) {
          const res = await api.get('/auth/me');
          if (res.data.success) {
            setUser(res.data.data.user);
          }
        }
      } catch (e) {
        await SecureStore.deleteItemAsync('accessToken');
        await SecureStore.deleteItemAsync('refreshToken');
      } finally {
        setLoading(false);
      }
    };

    bootstrapAsync();
  }, []);

  const login = async (data: any) => {
    const res = await api.post('/auth/login', data);
    if (res.data.success) {
      await SecureStore.setItemAsync('accessToken', res.data.data.accessToken);
      await SecureStore.setItemAsync('refreshToken', res.data.data.refreshToken);
      setUser(res.data.data.user);
    }
  };

  const register = async (data: any) => {
    const res = await api.post('/auth/register', data);
    if (res.data.success) {
      await SecureStore.setItemAsync('accessToken', res.data.data.accessToken);
      await SecureStore.setItemAsync('refreshToken', res.data.data.refreshToken);
      setUser(res.data.data.user);
    }
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } catch (e) {}
    await SecureStore.deleteItemAsync('accessToken');
    await SecureStore.deleteItemAsync('refreshToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
