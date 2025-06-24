import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { Star, DollarSign } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { RestaurantMenuItem } from '@/types';

interface RecommendedMealCardProps {
  item: RestaurantMenuItem;
  restaurantName: string;
  onPress: () => void;
  matchScore?: number; // 0-100 score indicating how well it matches user's goals
}

export default function RecommendedMealCard({ 
  item, 
  restaurantName,
  onPress,
  matchScore = 85 // Default high match score
}: RecommendedMealCardProps) {
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <Image
        source={{ uri: item.imageUrl }}
        style={styles.image}
        contentFit="cover"
      />
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name}>{item.name}</Text>
          <View style={styles.priceContainer}>
            <DollarSign size={14} color={Colors.text} />
            <Text style={styles.price}>{item.price.toFixed(2)}</Text>
          </View>
        </View>
        
        <Text style={styles.restaurant}>{restaurantName}</Text>
        
        <Text numberOfLines={2} style={styles.description}>
          {item.description}
        </Text>
        
        <View style={styles.footer}>
          <View style={styles.nutritionInfo}>
            <Text style={styles.nutritionText}>{item.calories} cal</Text>
            <Text style={styles.nutritionText}>P: {item.protein}g</Text>
            <Text style={styles.nutritionText}>C: {item.carbs}g</Text>
            <Text style={styles.nutritionText}>F: {item.fats}g</Text>
          </View>
          
          <View style={styles.matchContainer}>
            <Text style={styles.matchText}>{matchScore}% Match</Text>
            <View style={styles.matchIndicator}>
              <View 
                style={[
                  styles.matchProgress, 
                  { width: `${matchScore}%` },
                  matchScore > 85 ? styles.highMatch : 
                  matchScore > 70 ? styles.mediumMatch : 
                  styles.lowMatch
                ]} 
              />
            </View>
          </View>
        </View>
        
        <View style={styles.tagsContainer}>
          {item.tags.slice(0, 3).map((tag, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 160,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    flex: 1,
    marginRight: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  restaurant: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '500',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: Colors.mediumGray,
    lineHeight: 20,
    marginBottom: 12,
  },
  footer: {
    marginBottom: 12,
  },
  nutritionInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  nutritionText: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: '500',
  },
  matchContainer: {
    marginTop: 4,
  },
  matchText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  matchIndicator: {
    height: 6,
    backgroundColor: Colors.lightGray,
    borderRadius: 3,
    overflow: 'hidden',
  },
  matchProgress: {
    height: '100%',
    borderRadius: 3,
  },
  highMatch: {
    backgroundColor: '#4CAF50', // Green for high match
  },
  mediumMatch: {
    backgroundColor: '#FFC107', // Amber for medium match
  },
  lowMatch: {
    backgroundColor: '#F44336', // Red for low match
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: `${Colors.secondary}20`,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 4,
  },
  tagText: {
    fontSize: 12,
    color: Colors.text,
  },
});