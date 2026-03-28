import { Meal, Restaurant, RestaurantMenuItem } from '@/types';

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

// Menu items for each restaurant
export const mockMenuItems: RestaurantMenuItem[] = [
  // Green Leaf Cafe
  {
    id: '101',
    restaurantId: '1',
    name: 'Kale Caesar Salad',
    description: 'Fresh kale, grilled chicken, parmesan, and our house-made caesar dressing',
    price: 12.99,
    calories: 380,
    protein: 32,
    carbs: 18,
    fats: 20,
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2670&auto=format&fit=crop',
    tags: ['high-protein', 'low-carb', 'gluten-free']
  },
  {
    id: '102',
    restaurantId: '1',
    name: 'Harvest Bowl',
    description: 'Quinoa, roasted sweet potatoes, avocado, black beans, and cilantro lime dressing',
    price: 14.99,
    calories: 520,
    protein: 18,
    carbs: 72,
    fats: 22,
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2680&auto=format&fit=crop',
    tags: ['vegan', 'high-fiber', 'gluten-free']
  },
  {
    id: '103',
    restaurantId: '1',
    name: 'Protein Power Plate',
    description: 'Grilled chicken, steamed broccoli, brown rice, and almonds',
    price: 15.99,
    calories: 450,
    protein: 40,
    carbs: 35,
    fats: 15,
    imageUrl: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?q=80&w=2670&auto=format&fit=crop',
    tags: ['high-protein', 'balanced', 'gluten-free']
  },
  
  // Nourish Kitchen
  {
    id: '201',
    restaurantId: '2',
    name: 'Buddha Bowl',
    description: 'Brown rice, roasted vegetables, tofu, and tahini dressing',
    price: 13.99,
    calories: 480,
    protein: 22,
    carbs: 65,
    fats: 18,
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2670&auto=format&fit=crop',
    tags: ['vegan', 'plant-based', 'high-fiber']
  },
  {
    id: '202',
    restaurantId: '2',
    name: 'Green Goddess Smoothie Bowl',
    description: 'Spinach, banana, mango, avocado, topped with granola and chia seeds',
    price: 11.99,
    calories: 390,
    protein: 12,
    carbs: 60,
    fats: 14,
    imageUrl: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?q=80&w=2787&auto=format&fit=crop',
    tags: ['vegetarian', 'breakfast', 'high-fiber']
  },
  {
    id: '203',
    restaurantId: '2',
    name: 'Lentil Soup & Salad Combo',
    description: 'Hearty lentil soup with a side salad of mixed greens and balsamic vinaigrette',
    price: 12.99,
    calories: 320,
    protein: 18,
    carbs: 42,
    fats: 8,
    imageUrl: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=2671&auto=format&fit=crop',
    tags: ['vegan', 'low-fat', 'high-fiber']
  },
  
  // Fresh Bites
  {
    id: '301',
    restaurantId: '3',
    name: 'Mediterranean Wrap',
    description: 'Falafel, hummus, cucumber, tomato, and tzatziki in a whole wheat wrap',
    price: 10.99,
    calories: 450,
    protein: 16,
    carbs: 58,
    fats: 18,
    imageUrl: 'https://images.unsplash.com/photo-1540914124281-342587941389?q=80&w=2574&auto=format&fit=crop',
    tags: ['vegetarian', 'mediterranean', 'balanced']
  },
  {
    id: '302',
    restaurantId: '3',
    name: 'Teriyaki Chicken Bowl',
    description: 'Grilled teriyaki chicken, steamed vegetables, and brown rice',
    price: 13.99,
    calories: 520,
    protein: 35,
    carbs: 60,
    fats: 12,
    imageUrl: 'https://images.unsplash.com/photo-1546069901-d5bfd2cbfb1f?q=80&w=2680&auto=format&fit=crop',
    tags: ['high-protein', 'balanced', 'gluten-free']
  },
  {
    id: '303',
    restaurantId: '3',
    name: 'Avocado & Egg Toast',
    description: 'Multigrain toast topped with avocado, poached eggs, and microgreens',
    price: 9.99,
    calories: 380,
    protein: 18,
    carbs: 30,
    fats: 22,
    imageUrl: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=2680&auto=format&fit=crop',
    tags: ['vegetarian', 'breakfast', 'high-fat']
  },
  
  // Vitality Juice Bar
  {
    id: '401',
    restaurantId: '4',
    name: 'Acai Power Bowl',
    description: 'Acai blend topped with granola, banana, berries, and honey',
    price: 12.99,
    calories: 420,
    protein: 10,
    carbs: 75,
    fats: 12,
    imageUrl: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?q=80&w=2574&auto=format&fit=crop',
    tags: ['vegetarian', 'breakfast', 'antioxidants']
  },
  {
    id: '402',
    restaurantId: '4',
    name: 'Green Machine Smoothie',
    description: 'Spinach, kale, banana, pineapple, and almond milk',
    price: 8.99,
    calories: 240,
    protein: 8,
    carbs: 45,
    fats: 5,
    imageUrl: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?q=80&w=2574&auto=format&fit=crop',
    tags: ['vegan', 'low-calorie', 'detox']
  },
  {
    id: '403',
    restaurantId: '4',
    name: 'Protein Powerhouse',
    description: 'Almond milk, banana, peanut butter, protein powder, and cacao nibs',
    price: 9.99,
    calories: 380,
    protein: 25,
    carbs: 40,
    fats: 15,
    imageUrl: 'https://images.unsplash.com/photo-1579722821273-0f6c1b5d0b51?q=80&w=2670&auto=format&fit=crop',
    tags: ['high-protein', 'post-workout', 'vegetarian']
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