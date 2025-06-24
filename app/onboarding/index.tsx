import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowRight } from 'lucide-react-native';
import Button from '@/components/Button';
import Colors from '@/constants/colors';
import { useOnboardingStore } from '@/store/onboardingStore';

export default function OnboardingWelcomeScreen() {
  const router = useRouter();
  const nextStep = useOnboardingStore((state) => state.nextStep);
  
  const handleGetStarted = () => {
    nextStep();
    router.push('/onboarding/name');
  };
  
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(157, 191, 158, 0.2)', 'rgba(157, 191, 158, 0)']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=2670&auto=format&fit=crop' }}
            style={styles.backgroundImage}
          />
          <View style={styles.overlay} />
          <Text style={styles.logoText}>Dieta</Text>
        </View>
        
        <View style={styles.textContainer}>
          <Text style={styles.title}>Welcome to Dieta</Text>
          <Text style={styles.subtitle}>
            Let's personalize your experience to help you reach your nutrition goals
          </Text>
        </View>
        
        <View style={styles.buttonContainer}>
          <Button
            title="Get Started"
            onPress={handleGetStarted}
            icon={<ArrowRight size={20} color={Colors.white} style={styles.buttonIcon} />}
            style={styles.button}
          />
          
          <TouchableOpacity 
            onPress={() => {
              useOnboardingStore.getState().completeOnboarding();
              router.replace('/welcome');
            }}
            style={styles.skipButton}
          >
            <Text style={styles.skipText}>Skip for now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 60,
    height: 200,
    width: '100%',
    borderRadius: 24,
    overflow: 'hidden',
    position: 'relative',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  logoText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: Colors.white,
    position: 'absolute',
    top: '50%',
    marginTop: -30,
  },
  textContainer: {
    marginVertical: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.text,
    textAlign: 'center',
    lineHeight: 24,
  },
  buttonContainer: {
    marginBottom: 40,
    alignItems: 'center',
  },
  button: {
    marginVertical: 8,
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