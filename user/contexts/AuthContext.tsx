import React, { createContext, useContext, useState, useEffect } from "react";
import { authService, LoginPayload } from "@/services/api.service";
import {
  storeToken,
  getToken,
  removeToken,
  decodeToken,
  DecodedToken,
} from "@/utils/storage";
import { router } from "expo-router";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: DecodedToken | null;
  login: (credentials: LoginPayload) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<DecodedToken | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = await getToken();
      if (token) {
        const decoded = decodeToken(token);
        if (decoded && decoded.exp * 1000 > Date.now()) {
          setUser(decoded);
          setIsAuthenticated(true);
        } else {
          await removeToken();
        }
      }
    } catch (error) {
      console.error("Error checking auth:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (credentials: LoginPayload) => {
    try {
      const response = await authService.login(credentials);
      if (response.success && response.data.accessToken) {
        await storeToken(response.data.accessToken);
        const decoded = decodeToken(response.data.accessToken);
        setUser(decoded);
        setIsAuthenticated(true);
        router.replace("/(tabs)");
      } else {
        throw new Error(response.message || "Login failed");
      }
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || error.message || "Login failed"
      );
    }
  };

  const logout = async () => {
    try {
      await removeToken();
      setUser(null);
      setIsAuthenticated(false);
      router.replace("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isLoading, user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
