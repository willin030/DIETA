import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, ArrowRight } from 'lucide-react-native';
import Input from '@/components/Input';
import Button from '@/components/Button';
import ProgressBar from '@/components/ProgressBar';
import Colors from '@/constants/colors';
import { useOnboardingStore } from '@/store/onboardingStore';

export default function MetricsScreen() {
  const router = useRouter();
  const { height, weight, age, setHeight, setWeight, setAge, nextStep, prevStep, completeOnboarding } = useOnboardingStore();
  
  const [heightInput, setHeightInput] = useState(height ? height.toString() : '');
  const [weightInput, setWeightInput] = useState(weight ? weight.toString() : '');
  const [ageInput, setAgeInput] = useState(age ? age.toString() : '');
  
  const handleNext = () => {
    // Save the metrics (convert to numbers or null if empty)
    setHeight(heightInput ? parseFloat(heightInput) : null);
    setWeight(weightInput ? parseFloat(weightInput) : null);
    setAge(ageInput ? parseInt(ageInput) : null);
    
    // Complete onboarding and navigate to signup
    nextStep();
    completeOnboarding();
    router.push('/signup');
  };
  
  const handleBack = () => {
    prevStep();
    router.back();
  };
  
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardAvoid}
    >
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <ArrowLeft size={24} color={Colors.text} />
        </TouchableOpacity>
        
        <ProgressBar current={5} total={5} />
        
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>Body Metrics</Text>
            <Text style={styles.subtitle}>Optional: Add your metrics for more accurate recommendations</Text>
          </View>
          
          <View style={styles.form}>
            <View style={styles.metricsRow}>
              <Input
                label="Height (cm)"
                placeholder="Enter height"
                value={heightInput}
                onChangeText={setHeightInput}
                keyboardType="numeric"
                style={styles.metricInput}
              />
              
              <Input
                label="Weight (kg)"
                placeholder="Enter weight"
                value={weightInput}
                onChangeText={setWeightInput}
                keyboardType="numeric"
                style={styles.metricInput}
              />
            </View>
            
            <Input
              label="Age"
              placeholder="Enter age"
              value={ageInput}
              onChangeText={setAgeInput}
              keyboardType="numeric"
            />
            
            <Text style={styles.optionalText}>
              These metrics are optional but help us provide more accurate nutrition recommendations
            </Text>
          </View>
          
          <View style={styles.buttonContainer}>
            <Button
              title="Continue to Sign Up"
              onPress={handleNext}
              icon={<ArrowRight size={20} color={Colors.white} style={styles.buttonIcon} />}
              style={styles.button}
            />
            
            <TouchableOpacity 
              onPress={() => {
                completeOnboarding();
                router.push('/signup');
              }}
              style={styles.skipButton}
            >
              <Text style={styles.skipText}>Skip this step</Text>
            </TouchableOpacity>
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
  scrollContent: {
    flexGrow: 1,
    padding: 24,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.mediumGray,
  },
  form: {
    width: '100%',
    marginBottom: 40,
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metricInput: {
    width: '48%',
  },
  optionalText: {
    fontSize: 14,
    color: Colors.mediumGray,
    marginTop: 16,
    fontStyle: 'italic',
  },
  buttonContainer: {
    alignItems: 'center',
  },
  button: {
    marginTop: 'auto',
    width: '100%',
  },
  buttonIcon: {
    marginLeft: 8,
  },
  skipButton: {
    marginTop: 16,
    padding: 8,
  },
  skipText: {
    color: Colors.mediumGray,
    fontSize: 16,
  },
});