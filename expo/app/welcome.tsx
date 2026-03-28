import React from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import Button from '@/components/Button';
import Colors from '@/constants/colors';
import { useAuth } from '@/context/AuthContext';

export default function WelcomeScreen() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  
  // If already authenticated, redirect to home
  React.useEffect(() => {
    if (isAuthenticated) {
      router.replace('/(tabs)');
    }
  }, [isAuthenticated]);
  
  const handleLogin = () => {
    router.push('/login');
  };
  
  const handleSignup = () => {
    router.push('/signup');
  };
  
  return (
    <SafeAreaView style={styles.container}>
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
          <Text style={styles.title}>Track Your Meals</Text>
          <Text style={styles.subtitle}>
            Discover healthy food spots and keep track of your nutrition goals with Dieta
          </Text>
        </View>
        
        <View style={styles.buttonContainer}>
          <Button
            title="Sign In"
            onPress={handleLogin}
            style={styles.button}
          />
          <Button
            title="Create Account"
            onPress={handleSignup}
            variant="outline"
            style={styles.button}
          />
        </View>
      </View>
    </SafeAreaView>
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
  },
  button: {
    marginVertical: 8,
  },
});