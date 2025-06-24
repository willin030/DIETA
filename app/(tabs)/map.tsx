import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, ScrollView, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { PlusCircle, X, Search, Navigation, Sliders, MapPin, User, ChevronDown } from 'lucide-react-native';
import Button from '@/components/Button';
import Colors from '@/constants/colors';
import { mockRestaurants } from '@/constants/mockData';
import { Restaurant } from '@/types';
import { Stack } from 'expo-router';
import * as Location from 'expo-location';

// Standard map style image URL that looks like Google Maps
const MAP_IMAGE_URL = 'https://images.unsplash.com/photo-1569336415962-a4bd9f69c07b?q=80&w=2831&auto=format&fit=crop';

// Food categories for filtering
const FOOD_CATEGORIES = [
  { id: 'all', name: 'All' },
  { id: 'vegan', name: 'Vegan' },
  { id: 'vegetarian', name: 'Vegetarian' },
  { id: 'gluten-free', name: 'Gluten-Free' },
  { id: 'organic', name: 'Organic' },
  { id: 'keto', name: 'Keto' },
  { id: 'paleo', name: 'Paleo' },
];

export default function MapScreen() {
  const router = useRouter();
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      try {
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      } catch (error) {
        setErrorMsg('Could not get your location');
      }
    })();
  }, []);
  
  const handleSelectRestaurant = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
  };
  
  const handleCloseRestaurantDetails = () => {
    setSelectedRestaurant(null);
  };
  
  const handleAddMealFromRestaurant = () => {
    router.push({
      pathname: '/log-meal',
      params: { location: selectedRestaurant?.name }
    });
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handleFindNearby = () => {
    alert('Finding restaurants near you...');
  };
  
  const handleCurrentLocation = () => {
    alert('Getting your current location...');
  };
  
  // Set up the header options
  React.useEffect(() => {
    router.setParams({
      header: 'custom'
    });
  }, []);
  
  return (
    <View style={styles.container}>
      {/* Map background with standard map style */}
      <Image
        source={{ uri: MAP_IMAGE_URL }}
        style={styles.mapImage}
        contentFit="cover"
      />
      
      <Stack.Screen 
        options={{
          headerShown: false
        }}
      />
      
      {/* Top header with three icons in a row */}
      <View style={styles.topHeader}>
        <TouchableOpacity style={styles.headerButton}>
          <User size={20} color={Colors.text} />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.headerButton}
          onPress={handleCurrentLocation}
        >
          <MapPin size={20} color={Colors.primary} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.headerButton}>
          <Sliders size={20} color={Colors.text} />
        </TouchableOpacity>
      </View>
      
      {/* Weather indicator */}
      <View style={styles.weatherContainer}>
        <Text style={styles.weatherText}>28 °C</Text>
      </View>
      
      {/* Restaurant markers with heat maps */}
      <View style={styles.markersContainer}>
        {mockRestaurants.map((restaurant) => {
          const randomLeft = 20 + Math.random() * 60;
          const randomTop = 20 + Math.random() * 50;
          
          return (
            <View
              key={restaurant.id}
              style={[
                styles.markerPosition,
                { left: `${randomLeft}%`, top: `${randomTop}%` },
              ]}
            >
              {/* Heat map indicator */}
              <View style={[
                styles.heatMap, 
                { backgroundColor: restaurant.rating > 4.6 ? '#FF5722AA' : '#4CAF50AA' }
              ]} />
              
              <TouchableOpacity
                style={styles.restaurantMarker}
                onPress={() => handleSelectRestaurant(restaurant)}
              >
                <Image
                  source={{ uri: restaurant.imageUrl }}
                  style={styles.markerImage}
                  contentFit="cover"
                />
                {selectedRestaurant?.id === restaurant.id && (
                  <View style={styles.markerNameContainer}>
                    <Text style={styles.markerName}>{restaurant.name}</Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
      
      {/* Current location indicator */}
      <View style={styles.myLocationContainer}>
        <View style={styles.myLocationBackground}>
          <Text style={styles.myLocationText}>Me</Text>
        </View>
        <View style={styles.myLocationFigure}>
          <User size={24} color={Colors.white} />
        </View>
        <Text style={styles.nowText}>now</Text>
      </View>

      {/* Compass control */}
      <TouchableOpacity style={styles.compassButton}>
        <Navigation size={24} color={Colors.text} />
      </TouchableOpacity>
      
      {/* Bottom container with filters and search */}
      <View style={styles.bottomContainer}>
        {/* Filter chips above search bar */}
        <ScrollView 
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersScrollContent}
        >
          {FOOD_CATEGORIES.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.filterChip,
                selectedCategory === category.id && styles.selectedFilterChip
              ]}
              onPress={() => handleCategorySelect(category.id)}
            >
              <Text 
                style={[
                  styles.filterText,
                  selectedCategory === category.id && styles.selectedFilterText
                ]}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        
        {/* Search bar below filter chips */}
        <TouchableOpacity style={styles.searchButton}>
          <Search size={20} color={Colors.text} />
          <Text style={styles.searchText}>Search for healthy spots</Text>
        </TouchableOpacity>
      </View>
      
      {/* Restaurant details card */}
      {selectedRestaurant && (
        <View style={styles.restaurantDetailsCard}>
          <TouchableOpacity 
            style={styles.closeButton}
            onPress={handleCloseRestaurantDetails}
          >
            <X size={20} color={Colors.text} />
          </TouchableOpacity>
          
          <Image
            source={{ uri: selectedRestaurant.imageUrl }}
            style={styles.restaurantImage}
            contentFit="cover"
          />
          
          <View style={styles.restaurantInfo}>
            <Text style={styles.restaurantName}>{selectedRestaurant.name}</Text>
            <Text style={styles.restaurantDescription}>{selectedRestaurant.description}</Text>
            
            <View style={styles.restaurantDetails}>
              <View style={styles.ratingContainer}>
                <Text style={styles.ratingText}>★ {selectedRestaurant.rating.toFixed(1)}</Text>
              </View>
              
              <View style={styles.distanceContainer}>
                <MapPin size={14} color={Colors.mediumGray} style={styles.distanceIcon} />
                <Text style={styles.distanceText}>0.8 miles away</Text>
              </View>
            </View>
            
            <View style={styles.tagsContainer}>
              <View style={styles.tagChip}>
                <Text style={styles.tagText}>Organic</Text>
              </View>
              <View style={styles.tagChip}>
                <Text style={styles.tagText}>Vegan Options</Text>
              </View>
            </View>
            
            <Button
              title="Add Meal from Here"
              onPress={handleAddMealFromRestaurant}
              icon={<PlusCircle size={18} color={Colors.white} style={styles.buttonIcon} />}
              style={styles.addMealButton}
            />
          </View>
        </View>
      )}
    </View>
  );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  mapImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  // Top header with three icons in a row
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 30,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    zIndex: 10,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  weatherContainer: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 100 : 80,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    zIndex: 5,
  },
  weatherText: {
    color: Colors.white,
    fontWeight: '600',
    fontSize: 16,
  },
  markersContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  markerPosition: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  heatMap: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    opacity: 0.6,
    zIndex: 1,
  },
  restaurantMarker: {
    alignItems: 'center',
    zIndex: 2,
  },
  markerImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 3,
    borderColor: Colors.white,
  },
  markerNameContainer: {
    backgroundColor: Colors.white,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 4,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  markerName: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.text,
  },
  myLocationContainer: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    marginLeft: -30,
    marginTop: -60,
    alignItems: 'center',
    zIndex: 3,
  },
  myLocationBackground: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 4,
  },
  myLocationText: {
    color: Colors.white,
    fontWeight: '600',
    fontSize: 14,
  },
  myLocationFigure: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.white,
  },
  nowText: {
    color: Colors.text,
    backgroundColor: Colors.white,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    fontSize: 12,
    fontWeight: '500',
    marginTop: 4,
  },
  compassButton: {
    position: 'absolute',
    right: 16,
    bottom: 120,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    zIndex: 4,
  },
  // Bottom container for filters and search
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingTop: 16,
    paddingBottom: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    zIndex: 20,
  },
  filtersScrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.white,
    marginRight: 8,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  selectedFilterChip: {
    backgroundColor: Colors.primary,
  },
  filterText: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: '500',
  },
  selectedFilterText: {
    color: Colors.white,
  },
  searchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  searchText: {
    fontSize: 16,
    color: Colors.mediumGray,
    marginLeft: 12,
  },
  restaurantDetailsCard: {
    position: 'absolute',
    bottom: 160,
    left: 16,
    right: 16,
    backgroundColor: Colors.white,
    borderRadius: 16,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
    overflow: 'hidden',
    zIndex: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  restaurantImage: {
    width: '100%',
    height: 160,
  },
  restaurantInfo: {
    padding: 16,
  },
  restaurantName: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  restaurantDescription: {
    fontSize: 16,
    color: Colors.mediumGray,
    marginBottom: 12,
  },
  restaurantDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.accent,
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  distanceIcon: {
    marginRight: 4,
  },
  distanceText: {
    fontSize: 14,
    color: Colors.mediumGray,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  tagChip: {
    backgroundColor: `${Colors.secondary}30`,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 12,
    color: Colors.text,
    fontWeight: '500',
  },
  addMealButton: {
    marginTop: 8,
  },
  buttonIcon: {
    marginRight: 8,
  },
});