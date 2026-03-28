import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import Input from '@/components/Input';
import Button from '@/components/Button';
import Colors from '@/constants/colors';
import { useAuth } from '@/context/AuthContext';

export default function EditGoalsScreen() {
  const router = useRouter();
  const { user, updateProfile, loading } = useAuth();
  
  const [calorieGoal, setCalorieGoal] = useState(user?.dailyCalorieGoal?.toString() || '');
  const [proteinGoal, setProteinGoal] = useState(user?.dailyProteinGoal?.toString() || '');
  const [carbsGoal, setCarbsGoal] = useState(user?.dailyCarbsGoal?.toString() || '');
  const [fatsGoal, setFatsGoal] = useState(user?.dailyFatsGoal?.toString() || '');
  const [error, setError] = useState('');
  
  const handleSave = async () => {
    if (!calorieGoal.trim()) {
      setError('Calorie goal is required');
      return;
    }
    
    // Validate that all inputs are numbers
    if (isNaN(Number(calorieGoal)) || 
        isNaN(Number(proteinGoal)) || 
        isNaN(Number(carbsGoal)) || 
        isNaN(Number(fatsGoal))) {
      setError('All goals must be valid numbers');
      return;
    }
    
    setError('');
    
    try {
      const result = await updateProfile({
        dailyCalorieGoal: Number(calorieGoal),
        dailyProteinGoal: Number(proteinGoal),
        dailyCarbsGoal: Number(carbsGoal),
        dailyFatsGoal: Number(fatsGoal),
      });
      
      if (result.success) {
        Alert.alert(
          'Success', 
          'Nutrition goals updated successfully', 
          [{ 
            text: 'OK', 
            onPress: () => router.replace('/(tabs)/settings')
          }]
        );
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error(err);
    }
  };
  
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardAvoid}
    >
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Stack.Screen 
          options={{
            title: 'Edit Nutrition Goals',
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.back()} style={styles.headerButton}>
                <ArrowLeft size={24} color={Colors.text} />
              </TouchableOpacity>
            ),
          }}
        />
        
        <View style={styles.header}>
          <Text style={styles.title}>Set Your Daily Goals</Text>
          <Text style={styles.subtitle}>Customize your nutrition targets to match your health objectives</Text>
        </View>
        
        <View style={styles.form}>
          <Input
            label="Daily Calorie Goal"
            placeholder="Enter calories"
            value={calorieGoal}
            onChangeText={setCalorieGoal}
            keyboardType="numeric"
          />
          
          <View style={styles.macrosContainer}>
            <Input
              label="Protein Goal (g)"
              placeholder="Enter grams"
              value={proteinGoal}
              onChangeText={setProteinGoal}
              keyboardType="numeric"
              style={styles.macroInput}
            />
            
            <Input
              label="Carbs Goal (g)"
              placeholder="Enter grams"
              value={carbsGoal}
              onChangeText={setCarbsGoal}
              keyboardType="numeric"
              style={styles.macroInput}
            />
          </View>
          
          <Input
            label="Fats Goal (g)"
            placeholder="Enter grams"
            value={fatsGoal}
            onChangeText={setFatsGoal}
            keyboardType="numeric"
          />
          
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          
          <Text style={styles.infoText}>
            These goals will be used to track your daily nutrition progress. Recommended macronutrient distribution: 10-35% protein, 45-65% carbs, and 20-35% fats.
          </Text>
          
          <Button
            title="Save Goals"
            onPress={handleSave}
            loading={loading}
            style={styles.saveButton}
          />
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
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.mediumGray,
    lineHeight: 22,
  },
  form: {
    width: '100%',
  },
  macrosContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  macroInput: {
    width: '48%',
  },
  errorText: {
    color: Colors.error,
    marginVertical: 16,
  },
  infoText: {
    fontSize: 14,
    color: Colors.mediumGray,
    marginTop: 16,
    lineHeight: 20,
    fontStyle: 'italic',
  },
  saveButton: {
    marginTop: 24,
  },
});