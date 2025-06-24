import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MealsState, Meal } from '@/types';
import { mockMeals } from '@/constants/mockData';

export const useMealsStore = create<MealsState>()(
  persist(
    (set, get) => ({
      meals: mockMeals,
      addMeal: (meal) => {
        const newMeal: Meal = {
          ...meal,
          id: Date.now().toString(),
          date: new Date().toISOString(),
        };
        set((state) => ({
          meals: [newMeal, ...state.meals],
        }));
      },
      getTodaysMeals: () => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        return get().meals.filter((meal) => {
          const mealDate = new Date(meal.date);
          return mealDate >= today;
        });
      },
      getTodaysNutrition: () => {
        const todaysMeals = get().getTodaysMeals();
        
        return todaysMeals.reduce(
          (acc, meal) => {
            acc.calories += meal.calories;
            acc.protein += meal.protein;
            acc.carbs += meal.carbs;
            acc.fats += meal.fats;
            return acc;
          },
          { calories: 0, protein: 0, carbs: 0, fats: 0 }
        );
      },
    }),
    {
      name: 'meals-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);