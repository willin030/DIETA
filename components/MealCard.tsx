import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { formatDistanceToNow } from '@/utils/dateUtils';
import Colors from '@/constants/colors';
import { Meal } from '@/types';

interface MealCardProps {
  meal: Meal;
  onPress?: () => void;
}

export default function MealCard({ meal, onPress }: MealCardProps) {
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <View style={styles.content}>
        <View style={styles.textContent}>
          <Text style={styles.name}>{meal.name}</Text>
          
          <View style={styles.details}>
            <Text style={styles.calories}>{meal.calories} calories</Text>
            <Text style={styles.time}>{formatDistanceToNow(new Date(meal.date))}</Text>
          </View>
          
          {meal.location && (
            <Text style={styles.location}>{meal.location}</Text>
          )}
          
          <View style={styles.macros}>
            <Text style={styles.macroItem}>P: {meal.protein}g</Text>
            <Text style={styles.macroItem}>C: {meal.carbs}g</Text>
            <Text style={styles.macroItem}>F: {meal.fats}g</Text>
          </View>
        </View>
        
        {meal.imageUrl && (
          <Image
            source={{ uri: meal.imageUrl }}
            style={styles.image}
            contentFit="cover"
            transition={200}
          />
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    marginVertical: 8,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
  },
  content: {
    flexDirection: 'row',
    padding: 16,
  },
  textContent: {
    flex: 1,
    marginRight: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  calories: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.primary,
  },
  time: {
    fontSize: 14,
    color: Colors.mediumGray,
  },
  location: {
    fontSize: 14,
    color: Colors.secondary,
    marginBottom: 8,
  },
  macros: {
    flexDirection: 'row',
    marginTop: 4,
  },
  macroItem: {
    fontSize: 14,
    color: Colors.text,
    marginRight: 12,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
});