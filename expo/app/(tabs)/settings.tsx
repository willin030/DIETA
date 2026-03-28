import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { ChevronRight, Bell, Moon, Target, Lock, HelpCircle, LogOut } from 'lucide-react-native';
import Button from '@/components/Button';
import Colors from '@/constants/colors';
import { useAuth } from '@/context/AuthContext';

export default function SettingsScreen() {
  const router = useRouter();
  const { user, logout, loading } = useAuth();
  
  const [darkMode, setDarkMode] = React.useState(false);
  const [notifications, setNotifications] = React.useState(true);
  
  const handleLogout = () => {
    Alert.alert(
      "Sign Out",
      "Are you sure you want to sign out?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Sign Out",
          onPress: async () => {
            try {
              await logout();
              // Explicitly navigate to login screen after logout
              router.replace('/login');
            } catch (error) {
              console.error('Logout error:', error);
              Alert.alert('Error', 'Failed to sign out. Please try again.');
            }
          },
          style: "destructive"
        }
      ]
    );
  };
  
  const handleEditProfile = () => {
    router.push('/edit-profile');
  };
  
  const handleEditGoals = () => {
    router.push('/edit-goals');
  };
  
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.profileSection}>
        <Image
          source={{ uri: user?.profileImage }}
          style={styles.profileImage}
          contentFit="cover"
        />
        
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{user?.name}</Text>
          <Text style={styles.profileEmail}>{user?.email}</Text>
        </View>
        
        <TouchableOpacity 
          style={styles.editProfileButton}
          onPress={handleEditProfile}
        >
          <Text style={styles.editProfileText}>Edit</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        
        <View style={styles.settingItem}>
          <View style={styles.settingIconContainer}>
            <Bell size={20} color={Colors.text} />
          </View>
          <Text style={styles.settingText}>Notifications</Text>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{ false: Colors.lightGray, true: `${Colors.primary}80` }}
            thumbColor={notifications ? Colors.primary : Colors.white}
          />
        </View>
        
        <View style={styles.settingItem}>
          <View style={styles.settingIconContainer}>
            <Moon size={20} color={Colors.text} />
          </View>
          <Text style={styles.settingText}>Dark Mode</Text>
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            trackColor={{ false: Colors.lightGray, true: `${Colors.primary}80` }}
            thumbColor={darkMode ? Colors.primary : Colors.white}
          />
        </View>
        
        <TouchableOpacity style={styles.settingItem} onPress={handleEditGoals}>
          <View style={styles.settingIconContainer}>
            <Target size={20} color={Colors.text} />
          </View>
          <Text style={styles.settingText}>Nutrition Goals</Text>
          <ChevronRight size={20} color={Colors.mediumGray} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        
        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingIconContainer}>
            <Lock size={20} color={Colors.text} />
          </View>
          <Text style={styles.settingText}>Privacy</Text>
          <ChevronRight size={20} color={Colors.mediumGray} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingIconContainer}>
            <HelpCircle size={20} color={Colors.text} />
          </View>
          <Text style={styles.settingText}>Help & Support</Text>
          <ChevronRight size={20} color={Colors.mediumGray} />
        </TouchableOpacity>
      </View>
      
      <Button
        title="Sign Out"
        onPress={handleLogout}
        loading={loading}
        variant="outline"
        style={styles.signOutButton}
        icon={<LogOut size={20} color={Colors.primary} style={styles.signOutIcon} />}
      />
      
      <Text style={styles.versionText}>Dieta v1.0.0</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  contentContainer: {
    padding: 24,
    paddingBottom: 40,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: Colors.mediumGray,
  },
  editProfileButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  editProfileText: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '500',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  settingIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: `${Colors.primary}20`,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  settingText: {
    flex: 1,
    fontSize: 16,
    color: Colors.text,
  },
  signOutButton: {
    marginTop: 8,
    marginBottom: 24,
  },
  signOutIcon: {
    marginRight: 8,
  },
  versionText: {
    textAlign: 'center',
    fontSize: 14,
    color: Colors.mediumGray,
  },
});