import { createContext, useState } from 'react';
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

  // useEffect(() => {
  //   try {

  //   } catch (error) {
  //     console.error(error);
  //   }
  // }, []);

  const logIn = async (username: string, password: string) => {};

  const register = async (
    username: string,
    email: string,
    password: string
  ) => {};

  const logOut = () => {};

  return (
    <AuthContext.Provider
      value={{ user, setUser, logIn, register, logOut, token, setToken }}
    >
      {children}
    </AuthContext.Provider>
  );
}
