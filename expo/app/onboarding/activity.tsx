import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, ArrowRight } from 'lucide-react-native';
import Button from '@/components/Button';
import ProgressBar from '@/components/ProgressBar';
import Colors from '@/constants/colors';
import { useOnboardingStore, ActivityLevel } from '@/store/onboardingStore';

export default function ActivityScreen() {
  const router = useRouter();
  const { activityLevel, setActivityLevel, nextStep, prevStep } = useOnboardingStore();
  
  const handleSelectActivity = (level: ActivityLevel) => {
    setActivityLevel(level);
  };
  
  const handleNext = () => {
    if (!activityLevel) return;
    
    nextStep();
    router.push('/onboarding/metrics');
  };
  
  const handleBack = () => {
    prevStep();
    router.back();
  };
  
  const activityOptions: { value: ActivityLevel; label: string; description: string }[] = [
    { 
      value: 'sedentary', 
      label: 'Sedentary', 
      description: 'Little or no exercise, desk job' 
    },
    { 
      value: 'light', 
      label: 'Lightly Active', 
      description: 'Light exercise 1-3 days per week' 
    },
    { 
      value: 'moderate', 
      label: 'Moderately Active', 
      description: 'Moderate exercise 3-5 days per week' 
    },
    { 
      value: 'active', 
      label: 'Very Active', 
      description: 'Hard exercise 6-7 days per week' 
    },
    { 
      value: 'very_active', 
      label: 'Extremely Active', 
      description: 'Hard daily exercise and physical job or training twice a day' 
    },
  ];
  
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <TouchableOpacity onPress={handleBack} style={styles.backButton}>
        <ArrowLeft size={24} color={Colors.text} />
      </TouchableOpacity>
      
      <ProgressBar current={4} total={5} />
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Activity Level</Text>
          <Text style={styles.subtitle}>How active are you on a typical day?</Text>
        </View>
        
        <View style={styles.optionsContainer}>
          {activityOptions.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.optionCard,
                activityLevel === option.value && styles.selectedOption
              ]}
              onPress={() => handleSelectActivity(option.value)}
              activeOpacity={0.8}
            >
              <View style={styles.optionContent}>
                <Text style={styles.optionTitle}>{option.label}</Text>
                <Text style={styles.optionDescription}>{option.description}</Text>
              </View>
              
              <View style={[
                styles.radioButton,
                activityLevel === option.value && styles.radioButtonSelected
              ]}>
                {activityLevel === option.value && <View style={styles.radioButtonInner} />}
              </View>
            </TouchableOpacity>
          ))}
        </View>
        
        <Button
          title="Continue"
          onPress={handleNext}
          disabled={!activityLevel}
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