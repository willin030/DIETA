import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '@/constants/colors';

// This is a placeholder file that won't actually be shown
// The tab press will redirect to the take-photo screen
export default function CameraTab() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Redirecting to camera...</Text>
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
  text: {
    fontSize: 16,
    color: Colors.text,
  },
});