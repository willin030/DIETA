import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, KeyboardAvoidingView } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { Camera, MapPin, ArrowLeft } from 'lucide-react-native';
import Input from '@/components/Input';
import Button from '@/components/Button';
import Colors from '@/constants/colors';
import { useMealsStore } from '@/store/mealsStore';

export default function ManualEntryScreen() {
  const router = useRouter();
  const addMeal = useMealsStore((state) => state.addMeal);
  
  const [name, setName] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fats, setFats] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });
    
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  
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
      imageUrl: image || undefined,
    });
    
    // Simulate a brief loading state
    setTimeout(() => {
      setLoading(false);
      router.replace('/(tabs)');
    }, 500);
  };
  
  const handleCancel = () => {
    router.replace('/(tabs)');
  };
  
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.keyboardAvoid}
    >
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Stack.Screen 
          options={{
            title: 'Manual Entry',
            headerLeft: () => (
              <TouchableOpacity onPress={handleCancel} style={styles.headerButton}>
                <ArrowLeft size={24} color={Colors.text} />
              </TouchableOpacity>
            ),
          }}
        />
        
        <View style={styles.imageSection}>
          {image ? (
            <Image
              source={{ uri: image }}
              style={styles.mealImage}
              contentFit="cover"
            />
          ) : (
            <TouchableOpacity style={styles.imagePlaceholder} onPress={handlePickImage}>
              <Camera size={32} color={Colors.mediumGray} />
              <Text style={styles.imagePlaceholderText}>Add Photo (Optional)</Text>
            </TouchableOpacity>
          )}
          
          <TouchableOpacity style={styles.changeImageButton} onPress={handlePickImage}>
            <Text style={styles.changeImageText}>
              {image ? 'Change Photo' : 'Select from Gallery'}
            </Text>
          </TouchableOpacity>
        </View>
        
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
          
          <View style={styles.locationContainer}>
            <MapPin size={20} color={Colors.mediumGray} style={styles.locationIcon} />
            <Input
              placeholder="Location (optional)"
              value={location}
              onChangeText={setLocation}
              style={styles.locationInput}
            />
          </View>
          
          <View style={styles.buttonRow}>
            <Button
              title="Cancel"
              onPress={handleCancel}
              variant="outline"
              style={styles.cancelButton}
            />
            
            <Button
              title="Save Meal"
              onPress={handleSave}
              loading={loading}
              style={styles.saveButton}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardAvoid: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  contentContainer: {
    padding: 24,
    paddingBottom: 40,
  },
  headerButton: {
    padding: 8,
  },
  imageSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  mealImage: {
    width: '100%',
    height: 200,
    borderRadius: 16,
    marginBottom: 12,
  },
  imagePlaceholder: {
    width: '100%',
    height: 200,
    borderRadius: 16,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    borderStyle: 'dashed',
  },
  imagePlaceholderText: {
    marginTop: 8,
    color: Colors.mediumGray,
    fontSize: 16,
  },
  changeImageButton: {
    padding: 8,
  },
  changeImageText: {
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
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  locationIcon: {
    marginRight: 8,
  },
  locationInput: {
    flex: 1,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  cancelButton: {
    flex: 1,
    marginRight: 8,
  },
  saveButton: {
    flex: 1,
    marginLeft: 8,
  },
});