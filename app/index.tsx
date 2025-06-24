import { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { useOnboardingStore } from '@/store/onboardingStore';
import Colors from '@/constants/colors';

export default function IndexPage() {
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();
  const hasCompletedOnboarding = useOnboardingStore((state) => state.hasCompletedOnboarding);

  useEffect(() => {
    // Wait for auth to initialize before routing
    const navigateToInitialScreen = async () => {
      try {
        // Add a small delay to ensure components are mounted
        await new Promise(resolve => setTimeout(resolve, 100));
        
        if (!hasCompletedOnboarding) {
          router.replace('/onboarding');
        } else if (isAuthenticated) {
          router.replace('/(tabs)');
        } else {
          router.replace('/welcome');
        }
      } catch (error) {
        console.error('Navigation error:', error);
      }
    };

    if (!loading) {
      navigateToInitialScreen();
    }
  }, [isAuthenticated, hasCompletedOnboarding, loading, router]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
});