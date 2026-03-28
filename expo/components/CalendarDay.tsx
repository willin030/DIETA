import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import Colors from '@/constants/colors';

interface CalendarDayProps {
  date: Date;
  isSelected: boolean;
  onSelect: (date: Date) => void;
  progress: number; // 0-100 percentage of goal completion
}

export default function CalendarDay({ 
  date, 
  isSelected, 
  onSelect,
  progress 
}: CalendarDayProps) {
  const dayName = date.toLocaleDateString('en-US', { weekday: 'short' }).substring(0, 1);
  const dayNumber = date.getDate();
  
  // Determine color based on progress
  const getProgressColor = () => {
    if (progress < 80) return Colors.error; // Below goal (red)
    if (progress > 110) return '#F9A825'; // Over goal (yellow)
    return Colors.success; // On target (green)
  };
  
  return (
    <TouchableOpacity
      style={[
        styles.container,
        isSelected && styles.selectedContainer
      ]}
      onPress={() => onSelect(date)}
      activeOpacity={0.7}
    >
      <Text style={[styles.dayName, isSelected && styles.selectedText]}>
        {dayName}
      </Text>
      
      <View style={[
        styles.dateCircle,
        isSelected && styles.selectedDateCircle,
        { borderColor: getProgressColor() }
      ]}>
        <Text style={[styles.dateNumber, isSelected && styles.selectedText]}>
          {dayNumber}
        </Text>
      </View>
      
      {/* Progress indicator dot */}
      <View style={[styles.progressDot, { backgroundColor: getProgressColor() }]} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 10,
    marginHorizontal: 4,
    borderRadius: 16,
  },
  selectedContainer: {
    backgroundColor: `${Colors.primary}20`,
  },
  dayName: {
    fontSize: 14,
    color: Colors.text,
    marginBottom: 4,
    fontWeight: '500',
  },
  dateCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  selectedDateCircle: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  dateNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  selectedText: {
    color: Colors.white,
  },
  progressDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
});