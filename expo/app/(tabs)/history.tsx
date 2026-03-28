import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, SectionList, TouchableOpacity, ScrollView } from 'react-native';
import { ChevronDown, ChevronUp, Filter } from 'lucide-react-native';
import MealCard from '@/components/MealCard';
import CalendarDay from '@/components/CalendarDay';
import Colors from '@/constants/colors';
import { useMealsStore } from '@/store/mealsStore';
import { useAuthStore } from '@/store/authStore';
import { formatDate, isToday } from '@/utils/dateUtils';
import { Meal } from '@/types';

export default function HistoryScreen() {
  const { meals } = useMealsStore();
  const { user } = useAuthStore();
  const [showFilters, setShowFilters] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const calendarScrollRef = useRef<ScrollView>(null);
  
  // Generate last 14 days for the calendar
  const calendarDays = Array.from({ length: 14 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return date;
  }).reverse();
  
  // Scroll to today when component mounts
  React.useEffect(() => {
    // Find the index of today in the calendar days
    const todayIndex = calendarDays.findIndex(date => isToday(date));
    
    // Scroll to today with a slight delay to ensure the component is rendered
    if (todayIndex !== -1) {
      setTimeout(() => {
        calendarScrollRef.current?.scrollTo({
          x: todayIndex * 52, // Approximate width of each day item
          animated: true
        });
      }, 100);
    }
  }, []);
  
  // Filter meals based on selected date
  const filteredMeals = meals.filter(meal => {
    const mealDate = new Date(meal.date);
    return (
      mealDate.getDate() === selectedDate.getDate() &&
      mealDate.getMonth() === selectedDate.getMonth() &&
      mealDate.getFullYear() === selectedDate.getFullYear()
    );
  });
  
  // Group meals by date for the section list
  const groupedMeals = filteredMeals.reduce((acc, meal) => {
    const date = new Date(meal.date).toDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(meal);
    return acc;
  }, {} as Record<string, Meal[]>);
  
  // Convert to format needed for SectionList
  const sections = Object.keys(groupedMeals)
    .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
    .map((date) => ({
      title: date,
      data: groupedMeals[date],
    }));
  
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  
  // Calculate mock progress for each day
  const getProgressForDate = (date: Date) => {
    // Get meals for this date
    const dayMeals = meals.filter(meal => {
      const mealDate = new Date(meal.date);
      return (
        mealDate.getDate() === date.getDate() &&
        mealDate.getMonth() === date.getMonth() &&
        mealDate.getFullYear() === date.getFullYear()
      );
    });
    
    // Calculate total calories for the day
    const totalCalories = dayMeals.reduce((sum, meal) => sum + meal.calories, 0);
    
    // Calculate progress percentage based on daily calorie goal
    const calorieGoal = user?.dailyCalorieGoal || 2200;
    return Math.round((totalCalories / calorieGoal) * 100);
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Meal History</Text>
        
        <TouchableOpacity style={styles.filterButton} onPress={toggleFilters}>
          <Filter size={20} color={Colors.text} />
          <Text style={styles.filterText}>Filter</Text>
          {showFilters ? (
            <ChevronUp size={16} color={Colors.text} />
          ) : (
            <ChevronDown size={16} color={Colors.text} />
          )}
        </TouchableOpacity>
      </View>
      
      {showFilters && (
        <View style={styles.filtersContainer}>
          <TouchableOpacity style={[styles.filterChip, styles.activeFilterChip]}>
            <Text style={styles.activeFilterText}>All Meals</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.filterChip}>
            <Text style={styles.filterChipText}>This Week</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.filterChip}>
            <Text style={styles.filterChipText}>This Month</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.filterChip}>
            <Text style={styles.filterChipText}>Custom</Text>
          </TouchableOpacity>
        </View>
      )}
      
      {/* Calendar section */}
      <View style={styles.calendarContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.calendarContent}
          ref={calendarScrollRef}
        >
          {calendarDays.map((date) => (
            <CalendarDay
              key={date.toISOString()}
              date={date}
              isSelected={
                date.getDate() === selectedDate.getDate() &&
                date.getMonth() === selectedDate.getMonth() &&
                date.getFullYear() === selectedDate.getFullYear()
              }
              onSelect={setSelectedDate}
              progress={getProgressForDate(date)}
            />
          ))}
        </ScrollView>
      </View>
      
      {/* Selected date header */}
      <View style={styles.selectedDateHeader}>
        <Text style={styles.selectedDateText}>
          {formatDate(selectedDate)}
        </Text>
        
        {/* Show calorie summary for selected date */}
        <View style={styles.caloriesSummary}>
          <Text style={styles.caloriesText}>
            {filteredMeals.reduce((sum, meal) => sum + meal.calories, 0)} calories
          </Text>
          <Text style={styles.goalText}>
            Goal: {user?.dailyCalorieGoal || 2200}
          </Text>
        </View>
      </View>
      
      {/* Meals list */}
      {filteredMeals.length > 0 ? (
        <SectionList
          sections={sections}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <MealCard meal={item} />}
          renderSectionHeader={() => null} // Remove the section header to avoid duplicate date display
          contentContainerStyle={styles.listContent}
          stickySectionHeadersEnabled={false}
        />
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>No meals logged for this date</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text,
    marginHorizontal: 6,
  },
  filtersContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingBottom: 16,
    flexWrap: 'wrap',
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.white,
    marginRight: 8,
    marginBottom: 8,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  activeFilterChip: {
    backgroundColor: Colors.primary,
  },
  filterChipText: {
    fontSize: 14,
    color: Colors.text,
  },
  activeFilterText: {
    fontSize: 14,
    color: Colors.white,
    fontWeight: '500',
  },
  // Calendar styles
  calendarContainer: {
    backgroundColor: Colors.white,
    paddingVertical: 12,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    zIndex: 10,
  },
  calendarContent: {
    paddingHorizontal: 16,
  },
  selectedDateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  selectedDateText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
  },
  caloriesSummary: {
    alignItems: 'flex-end',
  },
  caloriesText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primary,
  },
  goalText: {
    fontSize: 12,
    color: Colors.mediumGray,
  },
  listContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  sectionHeader: {
    backgroundColor: Colors.background,
    paddingVertical: 12,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 16,
    color: Colors.mediumGray,
    textAlign: 'center',
  },
});