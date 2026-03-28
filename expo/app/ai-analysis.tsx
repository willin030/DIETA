import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Image } from 'expo-image';
import { useRouter, useLocalSearchParams, Stack } from 'expo-router';
import Colors from '@/constants/colors';

// Mock nutritional data for different food types
const MOCK_FOOD_DATA = [
  {
    name: 'Avocado Toast',
    calories: 350,
    protein: 12,
    carbs: 30,
    fats: 22,
  },
  {
    name: 'Greek Yogurt with Berries',
    calories: 220,
    protein: 18,
    carbs: 24,
    fats: 8,
  },
  {
    name: 'Grilled Chicken Salad',
    calories: 420,
    protein: 35,
    carbs: 15,
    fats: 22,
  },
  {
    name: 'Quinoa Bowl',
    calories: 480,
    protein: 22,
    carbs: 65,
    fats: 15,
  },
  {
    name: 'Salmon with Vegetables',
    calories: 550,
    protein: 40,
    carbs: 25,
    fats: 30,
  },
];

export default function AIAnalysisScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const photoUri = params.photoUri as string;
  
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(true);
  const [progress, setProgress] = useState(0);
  const [foodData, setFoodData] = useState<typeof MOCK_FOOD_DATA[0] | null>(null);
  
  // Simulate AI analysis with progress updates
  useEffect(() => {
    let progressInterval: NodeJS.Timeout;
    
    // Start progress animation
    progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 5;
      });
    }, 150);
    
    // Simulate analysis completion
    const analysisTimer = setTimeout(() => {
      setAnalyzing(false);
      clearInterval(progressInterval);
      setProgress(100);
      
      // Get random food data
      const randomIndex = Math.floor(Math.random() * MOCK_FOOD_DATA.length);
      setFoodData(MOCK_FOOD_DATA[randomIndex]);
      
      // Simulate loading complete
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }, 3000);
    
    return () => {
      clearInterval(progressInterval);
      clearTimeout(analysisTimer);
    };
  }, []);
  
  // Navigate to confirm screen when analysis is complete
  useEffect(() => {
    if (!loading && foodData) {
      const timer = setTimeout(() => {
        router.replace({
          pathname: '/confirm-meal',
          params: {
            name: foodData.name,
            calories: foodData.calories.toString(),
            protein: foodData.protein.toString(),
            carbs: foodData.carbs.toString(),
            fats: foodData.fats.toString(),
            photoUri,
          }
        });
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [loading, foodData, photoUri, router]);
  
  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          title: analyzing ? 'Analyzing Food' : 'Analysis Complete',
          headerBackVisible: false,
        }}
      />
      
      <Image
        source={{ uri: photoUri }}
        style={styles.foodImage}
        contentFit="cover"
      />
      
      <View style={styles.analysisContainer}>
        {loading ? (
          <>
            <View style={styles.progressContainer}>
              <View style={[styles.progressBar, { width: `${progress}%` }]} />
            </View>
            
            <Text style={styles.statusText}>
              {analyzing ? 'Analyzing your food...' : 'Analysis complete!'}
            </Text>
            
            {analyzing && (
              <View style={styles.loadingSteps}>
                <Text style={[styles.stepText, progress > 20 && styles.completedStep]}>
                  Identifying food items...
                </Text>
                <Text style={[styles.stepText, progress > 40 && styles.completedStep]}>
                  Estimating portion sizes...
                </Text>
                <Text style={[styles.stepText, progress > 60 && styles.completedStep]}>
                  Calculating nutritional content...
                </Text>
                <Text style={[styles.stepText, progress > 80 && styles.completedStep]}>
                  Finalizing results...
                </Text>
              </View>
            )}
            
            <ActivityIndicator 
              size="large" 
              color={Colors.primary} 
              style={styles.spinner}
            />
          </>
        ) : (
          <View style={styles.resultsContainer}>
            <Text style={styles.resultTitle}>We identified your meal as:</Text>
            <Text style={styles.foodName}>{foodData?.name}</Text>
            
            <View style={styles.nutritionContainer}>
              <View style={styles.nutritionItem}>
                <Text style={styles.nutritionValue}>{foodData?.calories}</Text>
                <Text style={styles.nutritionLabel}>Calories</Text>
              </View>
              
              <View style={styles.nutritionItem}>
                <Text style={styles.nutritionValue}>{foodData?.protein}g</Text>
                <Text style={styles.nutritionLabel}>Protein</Text>
              </View>
              
              <View style={styles.nutritionItem}>
                <Text style={styles.nutritionValue}>{foodData?.carbs}g</Text>
                <Text style={styles.nutritionLabel}>Carbs</Text>
              </View>
              
              <View style={styles.nutritionItem}>
                <Text style={styles.nutritionValue}>{foodData?.fats}g</Text>
                <Text style={styles.nutritionLabel}>Fats</Text>
              </View>
            </View>
            
            <Text style={styles.redirectingText}>
              Taking you to confirmation...
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  foodImage: {
    width: '100%',
    height: '40%',
  },
  analysisContainer: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressContainer: {
    width: '100%',
    height: 8,
    backgroundColor: Colors.lightGray,
    borderRadius: 4,
    marginBottom: 24,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 24,
    textAlign: 'center',
  },
  loadingSteps: {
    width: '100%',
    marginBottom: 24,
  },
  stepText: {
    fontSize: 16,
    color: Colors.mediumGray,
    marginBottom: 12,
  },
  completedStep: {
    color: Colors.primary,
    fontWeight: '500',
  },
  spinner: {
    marginTop: 24,
  },
  resultsContainer: {
    width: '100%',
    alignItems: 'center',
  },
  resultTitle: {
    fontSize: 18,
    color: Colors.text,
    marginBottom: 8,
  },
  foodName: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.primary,
    marginBottom: 24,
    textAlign: 'center',
  },
  nutritionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 32,
  },
  nutritionItem: {
    alignItems: 'center',
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
  redirectingText: {
    fontSize: 16,
    color: Colors.mediumGray,
    fontStyle: 'italic',
  },
});