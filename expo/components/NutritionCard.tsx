import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '@/constants/colors';

interface NutritionCardProps {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  calorieGoal?: number;
  compact?: boolean;
  showCaloriesWithMacros?: boolean;
}

export default function NutritionCard({ 
  calories, 
  protein, 
  carbs, 
  fats, 
  calorieGoal,
  compact = false,
  showCaloriesWithMacros = false
}: NutritionCardProps) {
  const caloriePercentage = calorieGoal ? Math.min(100, (calories / calorieGoal) * 100) : 0;
  
  return (
    <View style={[styles.container, compact && styles.compactContainer]}>
      {calorieGoal && !showCaloriesWithMacros && (
        <View style={styles.calorieSection}>
          <View style={styles.calorieHeader}>
            <Text style={styles.calorieTitle}>Daily Calories</Text>
            <Text style={styles.calorieValue}>
              {calories} <Text style={styles.calorieGoal}>/ {calorieGoal}</Text>
            </Text>
          </View>
          
          <View style={styles.progressContainer}>
            <View 
              style={[
                styles.progressBar, 
                { width: `${caloriePercentage}%` },
                caloriePercentage > 100 && styles.exceededProgress
              ]} 
            />
          </View>
        </View>
      )}
      
      <View style={styles.macrosContainer}>
        {showCaloriesWithMacros && (
          <View style={styles.macroItem}>
            <View style={[styles.macroIndicator, styles.caloriesIndicator]} />
            <Text style={styles.macroLabel}>Calories</Text>
            <Text style={styles.macroValue}>{calories}</Text>
          </View>
        )}
        
        <View style={styles.macroItem}>
          <View style={[styles.macroIndicator, styles.proteinIndicator]} />
          <Text style={styles.macroLabel}>Protein</Text>
          <Text style={styles.macroValue}>{protein}g</Text>
        </View>
        
        <View style={styles.macroItem}>
          <View style={[styles.macroIndicator, styles.carbsIndicator]} />
          <Text style={styles.macroLabel}>Carbs</Text>
          <Text style={styles.macroValue}>{carbs}g</Text>
        </View>
        
        <View style={styles.macroItem}>
          <View style={[styles.macroIndicator, styles.fatsIndicator]} />
          <Text style={styles.macroLabel}>Fats</Text>
          <Text style={styles.macroValue}>{fats}g</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginVertical: 8,
    width: '100%',
  },
  compactContainer: {
    padding: 12,
  },
  calorieSection: {
    marginBottom: 16,
  },
  calorieHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  calorieTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  calorieValue: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.primary,
  },
  calorieGoal: {
    fontSize: 16,
    fontWeight: '400',
    color: Colors.mediumGray,
  },
  progressContainer: {
    height: 8,
    backgroundColor: Colors.lightGray,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 4,
  },
  exceededProgress: {
    backgroundColor: Colors.accent,
  },
  macrosContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  macroItem: {
    alignItems: 'center',
    flex: 1,
  },
  macroIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginBottom: 4,
  },
  caloriesIndicator: {
    backgroundColor: Colors.accent,
  },
  proteinIndicator: {
    backgroundColor: Colors.accent,
  },
  carbsIndicator: {
    backgroundColor: Colors.secondary,
  },
  fatsIndicator: {
    backgroundColor: Colors.primary,
  },
  macroLabel: {
    fontSize: 14,
    color: Colors.mediumGray,
    marginBottom: 2,
  },
  macroValue: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
});