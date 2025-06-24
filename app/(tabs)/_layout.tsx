import React from 'react';
import { Tabs } from 'expo-router';
import { Home, ClipboardList, Settings, MapPin } from 'lucide-react-native';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Platform } from 'react-native';
import Colors from '@/constants/colors';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Camera, Edit, Scan } from 'lucide-react-native';

export default function TabLayout() {
  const router = useRouter();
  const [logOptionsVisible, setLogOptionsVisible] = useState(false);

  const handleLogPress = () => {
    setLogOptionsVisible(true);
  };

  const handleOptionSelect = (option: string) => {
    setLogOptionsVisible(false);
    
    switch (option) {
      case 'camera':
        router.push('/take-photo');
        break;
      case 'manual':
        router.push('/manual-entry');
        break;
      case 'barcode':
        // In a real app, this would navigate to a barcode scanner
        alert("Barcode scanning feature is not implemented in this demo");
        break;
    }
  };

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors.primary,
          tabBarInactiveTintColor: Colors.mediumGray,
          tabBarStyle: {
            backgroundColor: Colors.white,
            borderTopWidth: 0,
            elevation: 8,
            shadowColor: Colors.shadow,
            shadowOffset: { width: 0, height: -4 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            height: 60,
            paddingBottom: 8,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '500',
          },
          headerStyle: {
            backgroundColor: Colors.background,
            shadowColor: 'transparent',
            elevation: 0,
            borderBottomWidth: 0, // Remove the bottom border line
          },
          headerTitleStyle: {
            fontWeight: '600',
            fontSize: 18,
          },
          headerTintColor: Colors.text,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="map"
          options={{
            title: 'Map',
            tabBarIcon: ({ color, size }) => <MapPin size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="camera"
          options={{
            title: 'Log',
            tabBarIcon: ({ color }) => (
              <View style={styles.logButtonContainer}>
                <View style={styles.logButton}>
                  <Text style={styles.plusIcon}>+</Text>
                </View>
              </View>
            ),
          }}
          listeners={() => ({
            tabPress: (e) => {
              // Prevent default navigation
              e.preventDefault();
              // Show options modal
              handleLogPress();
            },
          })}
        />
        <Tabs.Screen
          name="history"
          options={{
            title: 'History',
            tabBarIcon: ({ color, size }) => <ClipboardList size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: 'Settings',
            tabBarIcon: ({ color, size }) => <Settings size={size} color={color} />,
          }}
        />
      </Tabs>

      {/* Log Options Modal */}
      <Modal
        visible={logOptionsVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setLogOptionsVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setLogOptionsVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Log a Meal</Text>
              
              <TouchableOpacity 
                style={styles.optionButton}
                onPress={() => handleOptionSelect('camera')}
              >
                <Camera size={24} color={Colors.primary} style={styles.optionIcon} />
                <Text style={styles.optionText}>Take a Photo</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.optionButton}
                onPress={() => handleOptionSelect('manual')}
              >
                <Edit size={24} color={Colors.primary} style={styles.optionIcon} />
                <Text style={styles.optionText}>Manual Entry</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.optionButton}
                onPress={() => handleOptionSelect('barcode')}
              >
                <Scan size={24} color={Colors.primary} style={styles.optionIcon} />
                <Text style={styles.optionText}>Scan Barcode</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.cancelButton}
                onPress={() => setLogOptionsVisible(false)}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  logButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
    // Move the button up to avoid overlapping with text
    marginTop: -15,
  },
  logButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusIcon: {
    color: Colors.white,
    fontSize: 24,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    width: '100%',
    paddingHorizontal: 16,
    paddingBottom: Platform.OS === 'ios' ? 40 : 24,
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 16,
    textAlign: 'center',
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  optionIcon: {
    marginRight: 16,
  },
  optionText: {
    fontSize: 16,
    color: Colors.text,
  },
  cancelButton: {
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  cancelText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.error,
  },
});