import { Meal } from '@/types';

export const mockMeals: Meal[] = [
  {
    id: '1',
    name: 'Avocado Toast',
    calories: 350,
    protein: 12,
    carbs: 30,
    fats: 22,
    date: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    location: 'Home',
    imageUrl: 'https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?q=80&w=2574&auto=format&fit=crop'
  },
  {
    id: '2',
    name: 'Greek Yogurt with Berries',
    calories: 220,
    protein: 18,
    carbs: 24,
    fats: 8,
    date: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(), // 6 hours ago
    location: 'Home',
    imageUrl: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=2487&auto=format&fit=crop'
  },
  {
    id: '3',
    name: 'Grilled Chicken Salad',
    calories: 420,
    protein: 35,
    carbs: 15,
    fats: 22,
    date: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    location: 'Green Leaf Cafe',
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2670&auto=format&fit=crop'
  },
  {
    id: '4',
    name: 'Quinoa Bowl',
    calories: 480,
    protein: 22,
    carbs: 65,
    fats: 15,
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
    location: 'Nourish Kitchen',
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2680&auto=format&fit=crop'
  },
  {
    id: '5',
    name: 'Salmon with Roasted Vegetables',
    calories: 550,
    protein: 40,
    carbs: 25,
    fats: 30,
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 days ago
    location: 'Home',
    imageUrl: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=2574&auto=format&fit=crop'
  }
];

export const mockRestaurants = [
  {
    id: '1',
    name: 'Green Leaf Cafe',
    latitude: 37.7749,
    longitude: -122.4194,
    rating: 4.8,
    description: 'Organic salads and grain bowls',
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2574&auto=format&fit=crop'
  },
  {
    id: '2',
    name: 'Nourish Kitchen',
    latitude: 37.7739,
    longitude: -122.4312,
    rating: 4.6,
    description: 'Plant-based meals and smoothies',
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2670&auto=format&fit=crop'
  },
  {
    id: '3',
    name: 'Fresh Bites',
    latitude: 37.7829,
    longitude: -122.4074,
    rating: 4.5,
    description: 'Healthy wraps and bowls',
    imageUrl: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?q=80&w=2622&auto=format&fit=crop'
  },
  {
    id: '4',
    name: 'Vitality Juice Bar',
    latitude: 37.7699,
    longitude: -122.4269,
    rating: 4.7,
    description: 'Cold-pressed juices and acai bowls',
    imageUrl: 'https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?q=80&w=2574&auto=format&fit=crop'
  }
];

export const mockUser = {
  id: '1',
  name: 'Alex Johnson',
  email: 'alex@example.com',
  dailyCalorieGoal: 2200,
  dailyProteinGoal: 140,
  dailyCarbsGoal: 220,
  dailyFatsGoal: 70,
  profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2574&auto=format&fit=crop'
};