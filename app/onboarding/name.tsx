import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, ArrowRight } from 'lucide-react-native';
import Input from '@/components/Input';
import Button from '@/components/Button';
import ProgressBar from '@/components/ProgressBar';
import Colors from '@/constants/colors';
import { useOnboardingStore } from '@/store/onboardingStore';

export default function NameScreen() {
  const router = useRouter();
  const { name, setName, nextStep, prevStep } = useOnboardingStore();
  const [error, setError] = useState('');
  
  const handleNext = () => {
    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }
    
    setError('');
    nextStep();
    router.push('/onboarding/goal');
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
        
        <ProgressBar current={1} total={5} />
        
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>What's your name?</Text>
            <Text style={styles.subtitle}>We'll use this to personalize your experience</Text>
          </View>
          
          <View style={styles.form}>
            <Input
              label="Your Name"
              placeholder="Enter your name"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
              error={error}
            />
          </View>
          
          <Button
            title="Continue"
            onPress={handleNext}
            icon={<ArrowRight size={20} color={Colors.white} style={styles.buttonIcon} />}
            style={styles.button}
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
    paddingVertical: 40,
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
  button: {
    marginTop: 'auto',
  },
  buttonIcon: {
    marginLeft: 8,
  },
});