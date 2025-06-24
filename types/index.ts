export interface User {
  id: string;
  name: string;
  email: string;
  dailyCalorieGoal: number;
  dailyProteinGoal: number;
  dailyCarbsGoal: number;
  dailyFatsGoal: number;
  profileImage?: string;
}

export interface Meal {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  date: string;
  location?: string;
  imageUrl?: string;
}

export interface Restaurant {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  rating: number;
  description: string;
  imageUrl?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => { success: boolean; message: string };
  signup: (name: string, email: string, password: string) => { success: boolean; message: string };
  logout: () => void;
}

export interface MealsState {
  meals: Meal[];
  addMeal: (meal: Omit<Meal, 'id' | 'date'>) => void;
  getTodaysMeals: () => Meal[];
  getTodaysNutrition: () => {
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
  };
}

export type DietaryGoal = 'lose' | 'maintain' | 'gain';
export type DietPreference = 'no_preference' | 'vegetarian' | 'vegan' | 'pescatarian' | 'keto' | 'paleo';
export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';

export interface OnboardingState {
  hasCompletedOnboarding: boolean;
  currentStep: number;
  name: string;
  dietaryGoal: DietaryGoal | null;
  dietPreference: DietPreference | null;
  activityLevel: ActivityLevel | null;
  height: number | null;
  weight: number | null;
  age: number | null;
  
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