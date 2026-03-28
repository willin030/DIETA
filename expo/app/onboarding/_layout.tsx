import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Stack } from 'expo-router';
import { useRouter } from 'expo-router';
import { useOnboardingStore } from '@/store/onboardingStore';
import Colors from '@/constants/colors';

export default function OnboardingLayout() {
  const router = useRouter();
  const hasCompletedOnboarding = useOnboardingStore((state) => state.hasCompletedOnboarding);
  
  // If onboarding is already completed, redirect to welcome screen
  useEffect(() => {
    if (hasCompletedOnboarding) {
      router.replace('/welcome');
    }
  }, [hasCompletedOnboarding]);
  
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: Colors.background,
        },
        animation: 'slide_from_right',
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});