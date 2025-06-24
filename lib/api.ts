import AsyncStorage from '@react-native-async-storage/async-storage';

// Base URL for the API
const API_BASE_URL = process.env.EXPO_PUBLIC_RORK_API_BASE_URL || '';

// Token storage key
export const AUTH_TOKEN_KEY = 'auth_token';

// Helper function to get the stored auth token
export const getAuthToken = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(AUTH_TOKEN_KEY);
  } catch (error) {
    console.error('Error getting auth token:', error);
    return null;
  }
};

// Helper function to store the auth token
export const setAuthToken = async (token: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(AUTH_TOKEN_KEY, token);
  } catch (error) {
    console.error('Error setting auth token:', error);
  }
};

// Helper function to remove the auth token
export const removeAuthToken = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
  } catch (error) {
    console.error('Error removing auth token:', error);
  }
};

// API client with authentication
export const api = {
  // Login user
  login: async (email: string, password: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }
      
      // Store the token
      if (data.token) {
        await setAuthToken(data.token);
      }
      
      return { success: true, user: data.user, message: 'Login successful' };
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        message: error instanceof Error ? error.message : 'An unexpected error occurred' 
      };
    }
  },
  
  // Sign up user
  signup: async (name: string, email: string, password: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Signup failed');
      }
      
      // Store the token
      if (data.token) {
        await setAuthToken(data.token);
      }
      
      return { success: true, user: data.user, message: 'Signup successful' };
    } catch (error) {
      console.error('Signup error:', error);
      return { 
        success: false, 
        message: error instanceof Error ? error.message : 'An unexpected error occurred' 
      };
    }
  },
  
  // Get current user
  getCurrentUser: async () => {
    try {
      const token = await getAuthToken();
      
      if (!token) {
        throw new Error('No authentication token found');
      }
      
      const response = await fetch(`${API_BASE_URL}/api/me`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to get user');
      }
      
      return { success: true, user: data.user };
    } catch (error) {
      console.error('Get current user error:', error);
      return { 
        success: false, 
        message: error instanceof Error ? error.message : 'An unexpected error occurred' 
      };
    }
  },
  
  // Logout user
  logout: async () => {
    try {
      await removeAuthToken();
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      return { 
        success: false, 
        message: error instanceof Error ? error.message : 'An unexpected error occurred' 
      };
    }
  },
};