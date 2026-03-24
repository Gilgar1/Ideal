import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { colors } from '../theme/colors';

export default function SkillTrackingScreen({ navigation }: any) {
  const [isTracking, setIsTracking] = useState(false);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval: any;
    if (isTracking) {
      interval = setInterval(() => setSeconds(s => s + 1), 1000);
    } else if (!isTracking && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTracking, seconds]);

  const formatTime = (totalSeconds: number) => {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Skill Tracking</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.subtitle}>100 Hours to Mastery. Start tracking your practice.</Text>
        
        <View style={styles.timerCard}>
          <Text style={styles.timerSkillName}>Current Focus: React Native</Text>
          <Text style={styles.timerDisplay}>{formatTime(seconds)}</Text>
          <Text style={styles.timerTotal}>Total Logged: 12h 45m / 100h</Text>
          
          <TouchableOpacity 
            style={[styles.trackingButton, isTracking && styles.trackingButtonActive]}
            onPress={() => setIsTracking(!isTracking)}
          >
            <Text style={[styles.trackingButtonText, isTracking && { color: '#FFF' }]}>
              {isTracking ? 'Stop Tracking' : 'Start Session'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.mapCard}>
          <Text style={styles.mapTitle}>Practice Locations (Google Maps)</Text>
          <View style={styles.mapPlaceholder}>
            <Text style={styles.mapText}>Map Integration Active 📍</Text>
            <Text style={styles.mapSubText}>Fetching Background Geolocation...</Text>
          </View>
        </View>
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
  subtitle: { fontSize: 14, color: colors.textSecondary, marginBottom: 24, textAlign: 'center' },
  timerCard: {
    backgroundColor: '#FFF', padding: 32, borderRadius: 28, alignItems: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.05, shadowRadius: 16, elevation: 4, marginBottom: 24
  },
  timerSkillName: { fontSize: 16, color: colors.textSecondary, fontWeight: '700', marginBottom: 16, textTransform: 'uppercase' },
  timerDisplay: { fontSize: 64, fontWeight: '800', color: colors.textPrimary, marginVertical: 8, fontVariant: ['tabular-nums'] },
  timerTotal: { fontSize: 14, color: colors.textSecondary, fontWeight: '500', marginBottom: 32 },
  trackingButton: { width: '100%', padding: 20, backgroundColor: colors.mintGreen, borderRadius: 20, alignItems: 'center' },
  trackingButtonActive: { backgroundColor: colors.textPrimary },
  trackingButtonText: { fontSize: 18, fontWeight: '800', color: colors.textPrimary },
  mapCard: { backgroundColor: '#FFF', padding: 20, borderRadius: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 },
  mapTitle: { fontSize: 16, fontWeight: '700', color: colors.textPrimary, marginBottom: 16 },
  mapPlaceholder: { width: '100%', height: 160, backgroundColor: colors.background, borderRadius: 16, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: colors.mintGreen, borderStyle: 'dashed' },
  mapText: { fontSize: 16, fontWeight: '600', color: colors.textPrimary },
  mapSubText: { fontSize: 12, color: colors.textSecondary, marginTop: 4 }
});
