import React, { createContext, useState, useEffect } from "react";
import { getToken, setToken as saveToken, removeToken } from "../utils/token";

interface AuthContextType {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  token: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(getToken());

  const login = (newToken: string) => {
    saveToken(newToken);
    setToken(newToken);
  };

  const logout = () => {
    removeToken();
    setToken(null);
  };

  useEffect(() => {
    const storedToken = getToken();
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
