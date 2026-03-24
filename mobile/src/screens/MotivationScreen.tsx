import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  ScrollView, SafeAreaView, Switch, Alert
} from 'react-native';
import { colors } from '../theme/colors';

const QUOTES = [
  '"The only person you are destined to be is the person you decide to be." – Ralph Waldo Emerson',
  '"Success is the sum of small efforts, repeated day in and day out." – Robert Collier',
  '"Do not wait; the time will never be just right." – Napoleon Hill',
  '"You have brains in your head. You have feet in your shoes." – Dr. Seuss',
  '"What you do today can improve all your tomorrows." – Ralph Marston',
];

export default function MotivationScreen({ navigation }: any) {
  const today = new Date().getDay();
  const quote = QUOTES[today % QUOTES.length];
  const [notificationsOn, setNotificationsOn] = useState(true);
  const [habits, setHabits] = useState(true);
  const [iteration, setIteration] = useState(true);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Motivation</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {/* Daily Quote */}
        <View style={[styles.quoteCard, { backgroundColor: colors.lavender }]}>
          <Text style={styles.quoteEmoji}>💡</Text>
          <Text style={styles.quoteLabel}>Today's Insight</Text>
          <Text style={styles.quoteText}>{quote}</Text>
        </View>

        {/* Notification Settings */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Smart Notifications</Text>

          <View style={styles.toggleRow}>
            <View>
              <Text style={styles.toggleLabel}>All Notifications</Text>
              <Text style={styles.toggleSub}>Master on/off switch</Text>
            </View>
            <Switch
              value={notificationsOn}
              onValueChange={setNotificationsOn}
              trackColor={{ false: '#E2E8F0', true: colors.mintGreen }}
              thumbColor={notificationsOn ? colors.textPrimary : '#CBD5E0'}
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.toggleRow}>
            <View>
              <Text style={styles.toggleLabel}>Habit Reminders</Text>
              <Text style={styles.toggleSub}>Daily check-in prompts</Text>
            </View>
            <Switch
              value={habits && notificationsOn}
              onValueChange={setHabits}
              disabled={!notificationsOn}
              trackColor={{ false: '#E2E8F0', true: colors.skyBlue }}
              thumbColor={habits ? colors.textPrimary : '#CBD5E0'}
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.toggleRow}>
            <View>
              <Text style={styles.toggleLabel}>Iteration Review</Text>
              <Text style={styles.toggleSub}>End-of-day AI review prompt</Text>
            </View>
            <Switch
              value={iteration && notificationsOn}
              onValueChange={setIteration}
              disabled={!notificationsOn}
              trackColor={{ false: '#E2E8F0', true: colors.peach }}
              thumbColor={iteration ? colors.textPrimary : '#CBD5E0'}
            />
          </View>
        </View>

        <TouchableOpacity
          style={styles.encourageButton}
          onPress={() => Alert.alert('🔥 You got this!', 'Remember: every great life is built one habit at a time. Keep going!')}
        >
          <Text style={styles.encourageText}>Send Me Encouragement</Text>
        </TouchableOpacity>
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
  container: { padding: 24, paddingBottom: 60 },
  quoteCard: { padding: 28, borderRadius: 24, marginBottom: 24, alignItems: 'center' },
  quoteEmoji: { fontSize: 36, marginBottom: 12 },
  quoteLabel: { fontSize: 12, fontWeight: '700', color: colors.textSecondary, textTransform: 'uppercase', marginBottom: 12 },
  quoteText: { fontSize: 17, fontWeight: '600', color: colors.textPrimary, textAlign: 'center', lineHeight: 26 },
  sectionCard: { backgroundColor: '#FFF', borderRadius: 24, padding: 24, marginBottom: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 3 },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: colors.textPrimary, marginBottom: 20 },
  toggleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 4 },
  toggleLabel: { fontSize: 16, fontWeight: '600', color: colors.textPrimary, marginBottom: 2 },
  toggleSub: { fontSize: 12, color: colors.textSecondary },
  divider: { height: 1, backgroundColor: '#F0F4F8', marginVertical: 16 },
  encourageButton: { backgroundColor: colors.textPrimary, padding: 20, borderRadius: 20, alignItems: 'center' },
  encourageText: { color: '#FFF', fontSize: 18, fontWeight: '800' },
});
