import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, ArrowRight, TrendingDown, ArrowUpDown, TrendingUp } from 'lucide-react-native';
import Button from '@/components/Button';
import ProgressBar from '@/components/ProgressBar';
import Colors from '@/constants/colors';
import { useOnboardingStore, DietaryGoal } from '@/store/onboardingStore';

export default function GoalScreen() {
  const router = useRouter();
  const { dietaryGoal, setDietaryGoal, nextStep, prevStep } = useOnboardingStore();
  
  const handleSelectGoal = (goal: DietaryGoal) => {
    setDietaryGoal(goal);
  };
  
  const handleNext = () => {
    if (!dietaryGoal) return;
    
    nextStep();
    router.push('/onboarding/diet');
  };
  
  const handleBack = () => {
    prevStep();
    router.back();
  };
  
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <TouchableOpacity onPress={handleBack} style={styles.backButton}>
        <ArrowLeft size={24} color={Colors.text} />
      </TouchableOpacity>
      
      <ProgressBar current={2} total={5} />
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>What's your goal?</Text>
          <Text style={styles.subtitle}>Select your primary nutrition goal</Text>
        </View>
        
        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={[
              styles.optionCard,
              dietaryGoal === 'lose' && styles.selectedOption
            ]}
            onPress={() => handleSelectGoal('lose')}
            activeOpacity={0.8}
          >
            <View style={[styles.iconContainer, styles.loseIcon]}>
              <TrendingDown size={28} color={Colors.white} />
            </View>
            <Text style={styles.optionTitle}>Lose Weight</Text>
            <Text style={styles.optionDescription}>
              Reduce calorie intake and focus on nutrient-dense foods
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.optionCard,
              dietaryGoal === 'maintain' && styles.selectedOption
            ]}
            onPress={() => handleSelectGoal('maintain')}
            activeOpacity={0.8}
          >
            <View style={[styles.iconContainer, styles.maintainIcon]}>
              <ArrowUpDown size={28} color={Colors.white} />
            </View>
            <Text style={styles.optionTitle}>Maintain Weight</Text>
            <Text style={styles.optionDescription}>
              Balance your calorie intake with your energy expenditure
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.optionCard,
              dietaryGoal === 'gain' && styles.selectedOption
            ]}
            onPress={() => handleSelectGoal('gain')}
            activeOpacity={0.8}
          >
            <View style={[styles.iconContainer, styles.gainIcon]}>
              <TrendingUp size={28} color={Colors.white} />
            </View>
            <Text style={styles.optionTitle}>Gain Weight</Text>
            <Text style={styles.optionDescription}>
              Increase calorie intake with healthy, nutrient-rich foods
            </Text>
          </TouchableOpacity>
        </View>
        
        <Button
          title="Continue"
          onPress={handleNext}
          disabled={!dietaryGoal}
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
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
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
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  loseIcon: {
    backgroundColor: '#E74C3C',
  },
  maintainIcon: {
    backgroundColor: Colors.secondary,
  },
  gainIcon: {
    backgroundColor: '#2ECC71',
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
  },
  optionDescription: {
    fontSize: 14,
    color: Colors.mediumGray,
    lineHeight: 20,
  },
  button: {
    marginTop: 'auto',
  },
  buttonIcon: {
    marginLeft: 8,
  },
});