import { createContext, useState } from 'react';
import { apiClient } from '../clients/api';
import type { AuthContextType, AuthProviderProps, User } from '../types';

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({ children }: AuthProviderProps) {
  // Check if there is a token in localStorage and set them in state
  const [user, setUser] = useState<User | null>(() => {
    try {
      const value = localStorage.getItem('user');
      if (value) {
        return JSON.parse(value);
      } else return null;
    } catch (error) {
      console.error(error);
    }
  });

  const [token, setToken] = useState<string | null>(() => {
    try {
      const value = localStorage.getItem('token');
      if (value) {
        return JSON.parse(value);
      } else return null;
    } catch (error) {
      console.error(error);
    }
  });

  const logIn = async (email: string, password: string) => {
    try {
      const res = await apiClient.post('/api/users/login', {
        email,
        password,
      });

      const { token, user } = res.data;

      // Set the token and user in state
      setUser(user);
      setToken(token);
      console.log('Login successful:', res.data);

      // Set the token and user in localStorage
      localStorage.setItem('token', JSON.stringify(token));
      localStorage.setItem('user', JSON.stringify(user));

      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const register = async (
    username: string,
    email: string,
    password: string
  ) => {
    try {
      const res = await apiClient.post('/api/users/register', {
        username,
        email,
        password,
      });

      const { token, user } = res.data;

      setUser(user);
      setToken(token);

      console.log('Registration successful:', res.data);

      localStorage.setItem('token', JSON.stringify(res.data.token));
      localStorage.setItem('user', JSON.stringify(res.data.user));

      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setToken(null);

    delete apiClient.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, logIn, register, logOut, token, setToken }}
    >
      {children}
    </AuthContext.Provider>
  );
}
