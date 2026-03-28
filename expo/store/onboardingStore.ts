import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type DietaryGoal = 'lose' | 'maintain' | 'gain';
export type DietPreference = 'no_preference' | 'vegetarian' | 'vegan' | 'pescatarian' | 'keto' | 'paleo';
export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';

export interface OnboardingState {
  // Onboarding completion status
  hasCompletedOnboarding: boolean;
  currentStep: number;
  
  // User information
  name: string;
  dietaryGoal: DietaryGoal | null;
  dietPreference: DietPreference | null;
  activityLevel: ActivityLevel | null;
  
  // Optional information
  height: number | null; // in cm
  weight: number | null; // in kg
  age: number | null;
  
  // Actions
  setName: (name: string) => void;
  setDietaryGoal: (goal: DietaryGoal) => void;
  setDietPreference: (preference: DietPreference) => void;
  setActivityLevel: (level: ActivityLevel) => void;
  setHeight: (height: number | null) => void;
  setWeight: (weight: number | null) => void;
  setAge: (age: number | null) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  completeOnboarding: () => void;
  resetOnboarding: () => void;
}

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      // Initial state
      hasCompletedOnboarding: false,
      currentStep: 0,
      name: '',
      dietaryGoal: null,
      dietPreference: null,
      activityLevel: null,
      height: null,
      weight: null,
      age: null,
      
      // Actions
      setName: (name) => set({ name }),
      setDietaryGoal: (dietaryGoal) => set({ dietaryGoal }),
      setDietPreference: (dietPreference) => set({ dietPreference }),
      setActivityLevel: (activityLevel) => set({ activityLevel }),
      setHeight: (height) => set({ height }),
      setWeight: (weight) => set({ weight }),
      setAge: (age) => set({ age }),
      
      nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
      prevStep: () => set((state) => ({ currentStep: Math.max(0, state.currentStep - 1) })),
      goToStep: (step) => set({ currentStep: step }),
      
      completeOnboarding: () => set({ hasCompletedOnboarding: true }),
      resetOnboarding: () => set({
        hasCompletedOnboarding: false,
        currentStep: 0,
        name: '',
        dietaryGoal: null,
        dietPreference: null,
        activityLevel: null,
        height: null,
        weight: null,
        age: null,
      }),
    }),
    {
      name: 'onboarding-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);