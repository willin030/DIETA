import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, ArrowRight } from 'lucide-react-native';
import Button from '@/components/Button';
import ProgressBar from '@/components/ProgressBar';
import Colors from '@/constants/colors';
import { useOnboardingStore, DietPreference } from '@/store/onboardingStore';

export default function DietScreen() {
  const router = useRouter();
  const { dietPreference, setDietPreference, nextStep, prevStep } = useOnboardingStore();
  
  const handleSelectDiet = (diet: DietPreference) => {
    setDietPreference(diet);
  };
  
  const handleNext = () => {
    if (!dietPreference) return;
    
    nextStep();
    router.push('/onboarding/activity');
  };
  
  const handleBack = () => {
    prevStep();
    router.back();
  };
  
  const dietOptions: { value: DietPreference; label: string; description: string }[] = [
    { 
      value: 'no_preference', 
      label: 'No Preference', 
      description: 'I eat everything and have no specific dietary restrictions' 
    },
    { 
      value: 'vegetarian', 
      label: 'Vegetarian', 
      description: 'No meat, but may include dairy and eggs' 
    },
    { 
      value: 'vegan', 
      label: 'Vegan', 
      description: 'No animal products of any kind' 
    },
    { 
      value: 'pescatarian', 
      label: 'Pescatarian', 
      description: 'Vegetarian diet that includes fish and seafood' 
    },
    { 
      value: 'keto', 
      label: 'Keto', 
      description: 'High-fat, low-carb diet to achieve ketosis' 
    },
    { 
      value: 'paleo', 
      label: 'Paleo', 
      description: 'Based on foods presumed to be available to paleolithic humans' 
    },
  ];
  
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <TouchableOpacity onPress={handleBack} style={styles.backButton}>
        <ArrowLeft size={24} color={Colors.text} />
      </TouchableOpacity>
      
      <ProgressBar current={3} total={5} />
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Dietary Preference</Text>
          <Text style={styles.subtitle}>Select your preferred diet type</Text>
        </View>
        
        <View style={styles.optionsContainer}>
          {dietOptions.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.optionCard,
                dietPreference === option.value && styles.selectedOption
              ]}
              onPress={() => handleSelectDiet(option.value)}
              activeOpacity={0.8}
            >
              <View style={styles.optionContent}>
                <Text style={styles.optionTitle}>{option.label}</Text>
                <Text style={styles.optionDescription}>{option.description}</Text>
              </View>
              
              <View style={[
                styles.radioButton,
                dietPreference === option.value && styles.radioButtonSelected
              ]}>
                {dietPreference === option.value && <View style={styles.radioButtonInner} />}
              </View>
            </TouchableOpacity>
          ))}
        </View>
        
        <Button
          title="Continue"
          onPress={handleNext}
          disabled={!dietPreference}
          icon={<ArrowRight size={20} color={Colors.white} style={styles.buttonIcon} />}
          style={styles.button}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
  optionsContainer: {
    marginBottom: 40,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedOption: {
    borderColor: Colors.primary,
    backgroundColor: `${Colors.primary}10`,
  },
  optionContent: {
    flex: 1,
    marginRight: 12,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 14,
    color: Colors.mediumGray,
    lineHeight: 20,
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonSelected: {
    borderColor: Colors.primary,
  },
  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.primary,
  },
  button: {
    marginTop: 'auto',
  },
  buttonIcon: {
    marginLeft: 8,
  },
});