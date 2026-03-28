import { User, RestaurantMenuItem, DietPreference } from '@/types';

/**
 * Calculate how well a menu item matches a user's nutritional goals
 * Returns a score from 0-100
 */
export function calculateMatchScore(menuItem: RestaurantMenuItem, user: User | null): number {
  if (!user) return 50; // Default medium score if no user
  
  // Get user's goals
  const { dailyCalorieGoal, dailyProteinGoal, dailyCarbsGoal, dailyFatsGoal } = user;
  
  // Calculate ideal macros for a single meal (assuming 3-4 meals per day)
  const mealCalorieTarget = dailyCalorieGoal / 3.5;
  const mealProteinTarget = dailyProteinGoal / 3.5;
  const mealCarbsTarget = dailyCarbsGoal / 3.5;
  const mealFatsTarget = dailyFatsGoal / 3.5;
  
  // Calculate how close the menu item is to the targets
  const calorieScore = calculateProximityScore(menuItem.calories, mealCalorieTarget, 0.3);
  const proteinScore = calculateProximityScore(menuItem.protein, mealProteinTarget, 0.3);
  const carbsScore = calculateProximityScore(menuItem.carbs, mealCarbsTarget, 0.2);
  const fatsScore = calculateProximityScore(menuItem.fats, mealFatsTarget, 0.2);
  
  // Weighted average of all scores
  const totalScore = calorieScore * 0.3 + proteinScore * 0.3 + carbsScore * 0.2 + fatsScore * 0.2;
  
  // Return score from 0-100
  return Math.round(totalScore * 100);
}

/**
 * Calculate how close a value is to a target
 * Returns a score from 0-1
 */
function calculateProximityScore(actual: number, target: number, tolerance: number): number {
  // Calculate the difference as a percentage of the target
  const difference = Math.abs(actual - target) / target;
  
  // If the difference is within the tolerance, it's a perfect score
  if (difference <= tolerance) {
    return 1;
  }
  
  // Otherwise, calculate a score based on how far it is from the tolerance
  const score = Math.max(0, 1 - (difference - tolerance) / (1 - tolerance));
  return score;
}

/**
 * Filter menu items based on dietary preferences
 */
export function filterByDietaryPreference(
  menuItems: RestaurantMenuItem[], 
  preference: DietPreference | null
): RestaurantMenuItem[] {
  if (!preference || preference === 'no_preference') {
    return menuItems;
  }
  
  return menuItems.filter(item => {
    const tags = item.tags.map(tag => tag.toLowerCase());
    
    switch (preference) {
      case 'vegetarian':
        return tags.includes('vegetarian') || tags.includes('vegan');
      case 'vegan':
        return tags.includes('vegan');
      case 'pescatarian':
        return tags.includes('vegetarian') || tags.includes('vegan') || 
               tags.includes('pescatarian') || tags.includes('seafood');
      case 'keto':
        return tags.includes('keto') || tags.includes('low-carb');
      case 'paleo':
        return tags.includes('paleo');
      default:
        return true;
    }
  });
}

/**
 * Get recommended menu items for a user
 */
export function getRecommendedMenuItems(
  menuItems: RestaurantMenuItem[],
  user: User | null,
  restaurantId?: string,
  limit: number = 5
): { item: RestaurantMenuItem; score: number }[] {
  // Filter by restaurant if specified
  let filteredItems = menuItems;
  if (restaurantId) {
    filteredItems = menuItems.filter(item => item.restaurantId === restaurantId);
  }
  
  // Filter by dietary preference if user has one
  if (user?.dietPreference) {
    filteredItems = filterByDietaryPreference(filteredItems, user.dietPreference);
  }
  
  // Calculate match scores for each item
  const scoredItems = filteredItems.map(item => ({
    item,
    score: calculateMatchScore(item, user)
  }));
  
  // Sort by score (highest first) and limit results
  return scoredItems
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}