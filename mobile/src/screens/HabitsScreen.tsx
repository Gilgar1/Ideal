import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { colors } from '../theme/colors';

const initialHabits = [
  { id: '1', title: 'Wake up at 6:00 AM', streak: 12, completedToday: true },
  { id: '2', title: 'Read 20 pages', streak: 4, completedToday: false },
  { id: '3', title: 'Workout', streak: 0, completedToday: false }
];

export default function HabitsScreen({ navigation }: any) {
  const [habits, setHabits] = useState(initialHabits);

  const toggleHabit = (id: string) => {
    setHabits(habits.map(h => {
      if (h.id === id) {
        const isCompleted = !h.completedToday;
        return { ...h, completedToday: isCompleted, streak: isCompleted ? h.streak + 1 : Math.max(0, h.streak - 1) };
      }
      return h;
    }));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Daily Habits</Text>
        <TouchableOpacity style={styles.addButton}><Text style={styles.addButtonText}>+</Text></TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.subtitle}>Build consistency. Earn points.</Text>
        
        {habits.map(habit => (
          <TouchableOpacity 
            key={habit.id} 
            style={[styles.habitCard, habit.completedToday && styles.habitCardCompleted]}
            activeOpacity={0.8}
            onPress={() => toggleHabit(habit.id)}
          >
            <View>
              <Text style={[styles.habitTitle, habit.completedToday && { color: '#FFF' }]}>{habit.title}</Text>
              <Text style={[styles.habitStreak, habit.completedToday && { color: 'rgba(255,255,255,0.8)' }]}>
                🔥 {habit.streak} day streak
              </Text>
            </View>
            <View style={[styles.checkbox, habit.completedToday && styles.checkboxCompleted]}>
              {habit.completedToday && <Text style={{ color: colors.skyBlue, fontWeight: 'bold' }}>✓</Text>}
            </View>
          </TouchableOpacity>
        ))}
        
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 },
  backButton: { padding: 8, backgroundColor: '#FFF', borderRadius: 12 },
  backButtonText: { color: colors.textPrimary, fontWeight: '600' },
  headerTitle: { fontSize: 20, fontWeight: '800', color: colors.textPrimary },
  addButton: { padding: 12, backgroundColor: colors.skyBlue, borderRadius: 16 },
  addButtonText: { color: colors.textPrimary, fontWeight: '800', fontSize: 18, lineHeight: 18 },
  container: { padding: 24, paddingBottom: 60 },
  subtitle: { fontSize: 14, color: colors.textSecondary, marginBottom: 24, textAlign: 'center' },
  habitCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#FFF',
    borderRadius: 24,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  habitCardCompleted: {
    backgroundColor: colors.skyBlue,
  },
  habitTitle: { fontSize: 18, fontWeight: '700', color: colors.textPrimary, marginBottom: 8 },
  habitStreak: { fontSize: 14, fontWeight: '600', color: colors.textSecondary },
  checkbox: {
    width: 32, height: 32, borderRadius: 16, borderWidth: 2, borderColor: colors.skyBlue,
    justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF'
  },
  checkboxCompleted: {
    backgroundColor: '#FFF',
    borderColor: '#FFF'
  }
});
