import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiService } from '../services/api';
import { ENABLE_MOCK_MODE, mockUser, mockDelay } from '../constants/mockData';

interface User {
  userId: number;
  fullName: string;
  email: string;
  roleName: string;
  avatarUrl?: string;
  phone?: string;
  roleId?: number;
  bio?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (fullName: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUserData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is authenticated on app start
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      setIsLoading(true);
      
      // 🎨 MOCK MODE: Auto login với mock user
      if (ENABLE_MOCK_MODE) {
        await mockDelay(300); // Simulate network delay
        setUser(mockUser);
        setIsAuthenticated(true);
        setIsLoading(false);
        return;
      }
      
      const authenticated = await apiService.isAuthenticated();
      
      if (authenticated) {
        // Try to get user data
        try {
          const userData = await apiService.getMe();
          setUser(userData);
          setIsAuthenticated(true);
        } catch {
          // Token might be expired, try to refresh
          const refreshResult = await apiService.refreshToken();
          if (refreshResult) {
            const userData = await apiService.getMe();
            setUser(userData);
            setIsAuthenticated(true);
          } else {
            setUser(null);
            setIsAuthenticated(false);
          }
        }
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Auth check error:', error);
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      // 🎨 MOCK MODE: Always success với mock user
      if (ENABLE_MOCK_MODE) {
        await mockDelay(500);
        setUser(mockUser);
        setIsAuthenticated(true);
        return;
      }
      
      const result = await apiService.login({ email, password });
      
      if (result.accessToken) {
        // Get user data after successful login
        const userData = await apiService.getMe();
        setUser(userData);
        setIsAuthenticated(true);
      }
    } catch (error) {
      throw error;
    }
  };

  const register = async (fullName: string, email: string, password: string) => {
    try {
      // 🎨 MOCK MODE: Always success với mock user
      if (ENABLE_MOCK_MODE) {
        await mockDelay(500);
        setUser({ ...mockUser, fullName, email });
        setIsAuthenticated(true);
        return;
      }
      
      const result = await apiService.register({ fullName, email, password });
      
      if (result.accessToken) {
        // Get user data after successful registration
        const userData = await apiService.getMe();
        setUser(userData);
        setIsAuthenticated(true);
      }
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      // 🎨 MOCK MODE: Just clear state
      if (ENABLE_MOCK_MODE) {
        await mockDelay(200);
        setUser(null);
        setIsAuthenticated(false);
        return;
      }
      
      await apiService.logout();
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const refreshUserData = async () => {
    try {
      // 🎨 MOCK MODE: Return mock user
      if (ENABLE_MOCK_MODE) {
        await mockDelay(200);
        setUser(mockUser);
        return;
      }
      
      if (isAuthenticated) {
        const userData = await apiService.getMe();
        setUser(userData);
      }
    } catch (error) {
      console.error('Refresh user data error:', error);
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
    refreshUserData,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;