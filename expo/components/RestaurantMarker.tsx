import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import Colors from '@/constants/colors';
import { Restaurant } from '@/types';

interface RestaurantMarkerProps {
  restaurant: Restaurant;
  onPress: (restaurant: Restaurant) => void;
  selected?: boolean;
}

export default function RestaurantMarker({ 
  restaurant, 
  onPress,
  selected = false
}: RestaurantMarkerProps) {
  return (
    <TouchableOpacity
      style={[styles.container, selected && styles.selectedContainer]}
      onPress={() => onPress(restaurant)}
      activeOpacity={0.9}
    >
      <View style={styles.markerPin}>
        <View style={styles.markerDot} />
      </View>
      
      {selected && (
        <View style={styles.infoCard}>
          <Image
            source={{ uri: restaurant.imageUrl }}
            style={styles.image}
            contentFit="cover"
          />
          
          <View style={styles.infoContent}>
            <Text style={styles.name}>{restaurant.name}</Text>
            <Text style={styles.description}>{restaurant.description}</Text>
            
            <View style={styles.ratingContainer}>
              <Text style={styles.rating}>★ {restaurant.rating.toFixed(1)}</Text>
            </View>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: 32,
    height: 48,
  },
  selectedContainer: {
    zIndex: 10,
  },
  markerPin: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.white,
    borderWidth: 2,
    borderColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  markerDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.primary,
  },
  infoCard: {
    position: 'absolute',
    bottom: 32,
    width: 240,
    backgroundColor: Colors.white,
    borderRadius: 12,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 120,
  },
  infoContent: {
    padding: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: Colors.mediumGray,
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.accent,
  },
});