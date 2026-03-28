import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { PlusCircle, MapPin } from 'lucide-react-native';
import NutritionCard from '@/components/NutritionCard';
import MealCard from '@/components/MealCard';
import Button from '@/components/Button';
import Colors from '@/constants/colors';
import { useMealsStore } from '@/store/mealsStore';
import { useAuthStore } from '@/store/authStore';
import { formatDate } from '@/utils/dateUtils';

export default function HomeScreen() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { meals, getTodaysNutrition } = useMealsStore();
  
  const todaysNutrition = getTodaysNutrition();
  const recommendedMeals = meals.slice(0, 3); // Get 3 meals to recommend
  
  const handleLogMeal = () => {
    router.push('/log-meal');
  };
  
  const handleViewMap = () => {
    router.push('/map');
  };
  
  // Calculate remaining calories
  const caloriesConsumed = todaysNutrition.calories;
  const calorieGoal = user?.dailyCalorieGoal || 2200;
  const caloriesRemaining = calorieGoal - caloriesConsumed;
  
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.appName}>DIETA</Text>
        <Text style={styles.tagline}>Delicious meets Discipline</Text>
      </View>
      
      <View style={styles.calorieCard}>
        <View style={styles.calorieHeader}>
          <Text style={styles.calorieTitle}>Daily Calories</Text>
          <Text style={styles.calorieCounter}>
            <Text style={styles.caloriesConsumed}>{caloriesConsumed}</Text>
            <Text style={styles.calorieSlash}> / </Text>
            <Text style={styles.calorieGoal}>{calorieGoal}</Text>
          </Text>
        </View>
        
        <View style={styles.progressContainer}>
          <View 
            style={[
              styles.progressBar, 
              { width: `${Math.min(100, (caloriesConsumed / calorieGoal) * 100)}%` }
            ]} 
          />
        </View>
        
        <Text style={styles.caloriesRemaining}>
          {caloriesRemaining} calories remaining
        </Text>
      </View>
      
      <NutritionCard
        calories={todaysNutrition.calories}
        protein={todaysNutrition.protein}
        carbs={todaysNutrition.carbs}
        fats={todaysNutrition.fats}
        showCaloriesWithMacros={true}
      />
      
      <View style={styles.actionsContainer}>
        <Button
          title="Log a Meal"
          onPress={handleLogMeal}
          icon={<PlusCircle size={20} color={Colors.white} style={styles.buttonIcon} />}
          style={styles.actionButton}
          size="small"
        />
        
        <Button
          title="View Food Map"
          onPress={handleViewMap}
          variant="outline"
          icon={<MapPin size={20} color={Colors.primary} style={styles.buttonIcon} />}
          style={styles.actionButton}
          size="small"
        />
      </View>
      
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Recommended Meals</Text>
        <TouchableOpacity onPress={() => router.push('/history')}>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>
      
      <Text style={styles.recommendationText}>
        Based on your nutrition goals and preferences
      </Text>
      
      {recommendedMeals.length > 0 ? (
        recommendedMeals.map((meal) => (
          <MealCard key={meal.id} meal={meal} />
        ))
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>No recommendations available yet</Text>
          <Button
            title="Log Your First Meal"
            onPress={handleLogMeal}
            variant="secondary"
            size="small"
            style={styles.emptyStateButton}
          />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  contentContainer: {
    padding: 24,
    paddingBottom: 40, // Extra padding for bottom navigation
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.primary,
    letterSpacing: 2,
    marginBottom: 4,
  },
  tagline: {
    fontSize: 16,
    color: Colors.mediumGray,
    marginBottom: 8,
  },
  calorieCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  calorieHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  calorieTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  calorieCounter: {
    fontSize: 18,
  },
  caloriesConsumed: {
    fontWeight: '700',
    color: Colors.primary,
  },
  calorieSlash: {
    color: Colors.mediumGray,
  },
  calorieGoal: {
    color: Colors.mediumGray,
  },
  progressContainer: {
    height: 8,
    backgroundColor: Colors.lightGray,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressBar: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 4,
  },
  caloriesRemaining: {
    fontSize: 14,
    color: Colors.mediumGray,
    textAlign: 'right',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 6,
    paddingVertical: 6, // Thinner buttons
    height: 40, // Fixed height for thinner buttons
  },
  buttonIcon: {
    marginRight: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.text,
  },
  seeAllText: {
    fontSize: 16,
    color: Colors.primary,
    fontWeight: '500',
  },
  recommendationText: {
    fontSize: 14,
    color: Colors.mediumGray,
    marginBottom: 16,
    fontStyle: 'italic',
  },
  emptyState: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginVertical: 8,
  },
  emptyStateText: {
    fontSize: 16,
    color: Colors.mediumGray,
    marginBottom: 16,
  },
  emptyStateButton: {
    minWidth: 180,
  },
});