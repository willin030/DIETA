import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { useRouter, useLocalSearchParams, Stack } from 'expo-router';
import { Edit } from 'lucide-react-native';
import Input from '@/components/Input';
import Button from '@/components/Button';
import Colors from '@/constants/colors';
import { useMealsStore } from '@/store/mealsStore';

export default function ConfirmMealScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const addMeal = useMealsStore((state) => state.addMeal);
  
  // Get params from route
  const photoUri = params.photoUri as string;
  
  const [name, setName] = useState(params.name as string);
  const [calories, setCalories] = useState(params.calories as string);
  const [protein, setProtein] = useState(params.protein as string);
  const [carbs, setCarbs] = useState(params.carbs as string);
  const [fats, setFats] = useState(params.fats as string);
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  const handleSave = () => {
    if (!name || !calories) {
      alert('Please enter at least a meal name and calories');
      return;
    }
    
    setLoading(true);
    
    // Add the meal to the store
    addMeal({
      name,
      calories: parseInt(calories) || 0,
      protein: parseInt(protein) || 0,
      carbs: parseInt(carbs) || 0,
      fats: parseInt(fats) || 0,
      location: location || 'Home',
      imageUrl: photoUri,
    });
    
    // Simulate a brief loading state
    setTimeout(() => {
      setLoading(false);
      router.replace('/(tabs)');
    }, 500);
  };
  
  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };
  
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Stack.Screen 
        options={{
          title: 'Confirm Meal',
          headerBackVisible: false,
        }}
      />
      
      <View style={styles.imageSection}>
        <Image
          source={{ uri: photoUri }}
          style={styles.mealImage}
          contentFit="cover"
        />
      </View>
      
      <View style={styles.detailsContainer}>
        <View style={styles.headerRow}>
          <Text style={styles.sectionTitle}>Meal Details</Text>
          <TouchableOpacity 
            style={styles.editButton}
            onPress={toggleEditing}
          >
            <Edit size={20} color={Colors.primary} />
            <Text style={styles.editButtonText}>
              {isEditing ? 'Done' : 'Edit'}
            </Text>
          </TouchableOpacity>
        </View>
        
        {isEditing ? (
          // Editable form
          <View style={styles.form}>
            <Input
              label="Meal Name"
              placeholder="What did you eat?"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
            />
            
            <View style={styles.nutritionRow}>
              <Input
                label="Calories"
                placeholder="kcal"
                value={calories}
                onChangeText={setCalories}
                keyboardType="numeric"
                style={styles.nutritionInput}
              />
              
              <Input
                label="Protein"
                placeholder="g"
                value={protein}
                onChangeText={setProtein}
                keyboardType="numeric"
                style={styles.nutritionInput}
              />
            </View>
            
            <View style={styles.nutritionRow}>
              <Input
                label="Carbs"
                placeholder="g"
                value={carbs}
                onChangeText={setCarbs}
                keyboardType="numeric"
                style={styles.nutritionInput}
              />
              
              <Input
                label="Fats"
                placeholder="g"
                value={fats}
                onChangeText={setFats}
                keyboardType="numeric"
                style={styles.nutritionInput}
              />
            </View>
            
            <Input
              label="Location (optional)"
              placeholder="Where did you eat?"
              value={location}
              onChangeText={setLocation}
            />
          </View>
        ) : (
          // Read-only view
          <View style={styles.detailsView}>
            <Text style={styles.mealName}>{name}</Text>
            
            <View style={styles.nutritionGrid}>
              <View style={styles.nutritionCard}>
                <Text style={styles.nutritionValue}>{calories}</Text>
                <Text style={styles.nutritionLabel}>Calories</Text>
              </View>
              
              <View style={styles.nutritionCard}>
                <Text style={styles.nutritionValue}>{protein}g</Text>
                <Text style={styles.nutritionLabel}>Protein</Text>
              </View>
              
              <View style={styles.nutritionCard}>
                <Text style={styles.nutritionValue}>{carbs}g</Text>
                <Text style={styles.nutritionLabel}>Carbs</Text>
              </View>
              
              <View style={styles.nutritionCard}>
                <Text style={styles.nutritionValue}>{fats}g</Text>
                <Text style={styles.nutritionLabel}>Fats</Text>
              </View>
            </View>
            
            <Input
              label="Location (optional)"
              placeholder="Where did you eat?"
              value={location}
              onChangeText={setLocation}
            />
          </View>
        )}
      </View>
      
      <Button
        title="Save Meal"
        onPress={handleSave}
        loading={loading}
        style={styles.saveButton}
      />
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
    paddingBottom: 40,
  },
  imageSection: {
    marginBottom: 24,
  },
  mealImage: {
    width: '100%',
    height: 200,
    borderRadius: 16,
  },
  detailsContainer: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.text,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  editButtonText: {
    marginLeft: 4,
    color: Colors.primary,
    fontWeight: '500',
  },
  form: {
    width: '100%',
  },
  nutritionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nutritionInput: {
    width: '48%',
  },
  detailsView: {
    width: '100%',
  },
  mealName: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 16,
  },
  nutritionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  nutritionCard: {
    width: '48%',
    backgroundColor: `${Colors.primary}10`,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  nutritionValue: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  nutritionLabel: {
    fontSize: 14,
    color: Colors.mediumGray,
  },
  saveButton: {
    marginTop: 8,
  },
});