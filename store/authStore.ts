import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthState, User } from '@/types';
import { mockUser } from '@/constants/mockData';

interface ExtendedAuthState extends AuthState {
  updateProfile: (userData: Partial<User>) => { success: boolean; message: string };
}

export const useAuthStore = create<ExtendedAuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      user: null,
      
      login: (email, password) => {
        // Simple login - accept any email that contains "aa"
        if (email.includes('aa')) {
          set({ 
            isAuthenticated: true,
            user: {
              ...mockUser,
              email
            }
          });
          return { success: true, message: "Login successful!" };
        } else {
          return { success: false, message: "Invalid username. Try 'aa'." };
        }
      },
      
      signup: (name, email, password) => {
        // Simple signup - always succeeds
        set({ 
          isAuthenticated: true,
          user: {
            ...mockUser,
            name,
            email
          }
        });
        return { success: true, message: "Account created successfully!" };
      },
      
      logout: async () => {
        set({ 
          isAuthenticated: false,
          user: null
        });
      },

      updateProfile: (userData) => {
        const currentUser = get().user;
        
        if (!currentUser) {
          return { success: false, message: "No user is logged in" };
        }
        
        // Create a new user object with the updated data
        const updatedUser = {
          ...currentUser,
          ...userData
        };
        
        // Update the state with the new user data
        set({
          user: updatedUser
        });
        
        return { success: true, message: "Profile updated successfully" };
      }
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);