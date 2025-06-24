import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Camera, Edit } from 'lucide-react-native';
import Colors from '@/constants/colors';

export default function LogMealOptionsScreen() {
  const router = useRouter();
  
  const handleTakePhoto = () => {
    router.push('/take-photo');
  };
  
  const handleManualEntry = () => {
    router.push('/manual-entry');
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>How would you like to log your meal?</Text>
      
      <TouchableOpacity 
        style={styles.optionCard}
        onPress={handleTakePhoto}
        activeOpacity={0.8}
      >
        <View style={styles.iconContainer}>
          <Camera size={32} color={Colors.white} />
        </View>
        <View style={styles.optionContent}>
          <Text style={styles.optionTitle}>Take a Photo</Text>
          <Text style={styles.optionDescription}>
            Snap a picture of your food and let AI analyze the nutritional content
          </Text>
        </View>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.optionCard}
        onPress={handleManualEntry}
        activeOpacity={0.8}
      >
        <View style={[styles.iconContainer, styles.secondaryIconContainer]}>
          <Edit size={32} color={Colors.white} />
        </View>
        <View style={styles.optionContent}>
          <Text style={styles.optionTitle}>Enter Manually</Text>
          <Text style={styles.optionDescription}>
            Input the meal details and nutritional information yourself
          </Text>
        </View>
      </TouchableOpacity>
      
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=2670&auto=format&fit=crop' }}
        style={styles.backgroundImage}
        contentFit="cover"
        contentPosition="center"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: Colors.background,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 32,
    textAlign: 'center',
  },
  optionCard: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  secondaryIconContainer: {
    backgroundColor: Colors.accent,
  },
  optionContent: {
    flex: 1,
    justifyContent: 'center',
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
  backgroundImage: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '40%',
    opacity: 0.1,
    zIndex: -1,
  },
});