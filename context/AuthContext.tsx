import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/types';
import { useAuthStore } from '@/store/authStore';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  signup: (name: string, email: string, password: string) => Promise<{ success: boolean; message: string }>;
  logout: () => Promise<void>;
  updateProfile: (userData: Partial<User>) => Promise<{ success: boolean; message: string }>;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const authStore = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Login function
  const login = async (email: string, password: string): Promise<{ success: boolean; message: string }> => {
    setLoading(true);
    setError(null);
    
    try {
      // Use the store's login function directly
      const result = authStore.login(email, password);
      setLoading(false);
      return result;
    } catch (err) {
      setLoading(false);
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    }
  };

  // Signup function
  const signup = async (name: string, email: string, password: string): Promise<{ success: boolean; message: string }> => {
    setLoading(true);
    setError(null);
    
    try {
      // Use the store's signup function directly
      const result = authStore.signup(name, email, password);
      setLoading(false);
      return result;
    } catch (err) {
      setLoading(false);
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    }
  };

  // Logout function
  const logout = async (): Promise<void> => {
    setLoading(true);
    
    try {
      await authStore.logout();
    } catch (err) {
      console.error('Logout error:', err);
      setError('Failed to log out');
    } finally {
      setLoading(false);
    }
  };

  // Update profile function
  const updateProfile = async (userData: Partial<User>): Promise<{ success: boolean; message: string }> => {
    setLoading(true);
    setError(null);
    
    try {
      const result = authStore.updateProfile(userData);
      setLoading(false);
      return result;
    } catch (err) {
      setLoading(false);
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    }
  };

  // Context value
  const value: AuthContextType = {
    isAuthenticated: authStore.isAuthenticated,
    user: authStore.user,
    loading,
    error,
    login,
    signup,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};