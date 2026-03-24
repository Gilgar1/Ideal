import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  ScrollView, SafeAreaView, Dimensions
} from 'react-native';
import { colors } from '../theme/colors';
import { useAuthStore } from '../store/authStore';

const { width } = Dimensions.get('window');
const cardWidth = (width - 48 - 16) / 2;

const RIDDLES = [
  { q: "The more you take, the more you leave behind. What am I?", a: "Footsteps" },
  { q: "I have cities, but no houses live there. I have mountains, but no trees grow. What am I?", a: "A Map" },
  { q: "I speak without a mouth and hear without ears. What am I?", a: "An Echo" },
];

export default function GamificationScreen({ navigation }: any) {
  const { points, addPoints } = useAuthStore();
  const [revealedRiddle, setRevealedRiddle] = useState<number | null>(null);
  const today = new Date().getDay();
  const todayRiddle = RIDDLES[today % RIDDLES.length];

  const LEADERBOARD = [
    { name: 'Alex M.', pts: 3840, medal: '🥇' },
    { name: 'Priya K.', pts: 2910, medal: '🥈' },
    { name: 'You', pts: points, medal: '🌟' },
    { name: 'Jordan R.', pts: 1450, medal: '' },
    { name: 'Casey L.', pts: 990, medal: '' },
  ].sort((a, b) => b.pts - a.pts);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Rewards</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {/* Points Banner */}
        <View style={[styles.pointsBanner, { backgroundColor: colors.softYellow }]}>
          <Text style={styles.pointsLabel}>Your Total Points</Text>
          <Text style={styles.pointsValue}>{points} pts</Text>
          <TouchableOpacity style={styles.earnBtn} onPress={() => addPoints(10)}>
            <Text style={styles.earnBtnText}>+ 10 pts (Test Earn)</Text>
          </TouchableOpacity>
        </View>

        {/* Daily Riddle */}
        <View style={[styles.riddleCard, { backgroundColor: colors.skyBlue }]}>
          <Text style={styles.riddleTitle}>🧩 Daily Riddle</Text>
          <Text style={styles.riddleQ}>{todayRiddle.q}</Text>
          {revealedRiddle === today ? (
            <Text style={styles.riddleA}>Answer: {todayRiddle.a}</Text>
          ) : (
            <TouchableOpacity style={styles.revealBtn} onPress={() => { setRevealedRiddle(today); addPoints(5); }}>
              <Text style={styles.revealBtnText}>Reveal Answer (+5 pts)</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Leaderboard */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>🏆 Leaderboard</Text>
          {LEADERBOARD.map((entry, i) => (
            <View key={i} style={[styles.leaderRow, entry.name === 'You' && styles.leaderRowHighlight]}>
              <Text style={styles.leaderRank}>#{i + 1} {entry.medal}</Text>
              <Text style={styles.leaderName}>{entry.name}</Text>
              <Text style={styles.leaderPts}>{entry.pts} pts</Text>
            </View>
          ))}
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
  pointsBanner: { padding: 28, borderRadius: 24, alignItems: 'center', marginBottom: 20 },
  pointsLabel: { fontSize: 12, fontWeight: '700', textTransform: 'uppercase', color: colors.textSecondary, marginBottom: 8 },
  pointsValue: { fontSize: 52, fontWeight: '800', color: colors.textPrimary, marginBottom: 16 },
  earnBtn: { backgroundColor: colors.textPrimary, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 16 },
  earnBtnText: { color: '#FFF', fontWeight: '700' },
  riddleCard: { padding: 24, borderRadius: 24, marginBottom: 20 },
  riddleTitle: { fontSize: 16, fontWeight: '700', color: colors.textPrimary, marginBottom: 12 },
  riddleQ: { fontSize: 18, fontWeight: '600', color: colors.textPrimary, lineHeight: 26, marginBottom: 20 },
  riddleA: { fontSize: 18, fontWeight: '800', color: colors.textPrimary },
  revealBtn: { backgroundColor: 'rgba(255,255,255,0.6)', padding: 14, borderRadius: 16, alignItems: 'center' },
  revealBtnText: { fontWeight: '700', color: colors.textPrimary, fontSize: 15 },
  sectionCard: { backgroundColor: '#FFF', borderRadius: 24, padding: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 3 },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: colors.textPrimary, marginBottom: 16 },
  leaderRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderColor: '#F0F4F8' },
  leaderRowHighlight: { backgroundColor: colors.lavender, borderRadius: 12, paddingHorizontal: 8 },
  leaderRank: { fontSize: 14, fontWeight: '700', color: colors.textSecondary, width: 60 },
  leaderName: { flex: 1, fontSize: 16, fontWeight: '600', color: colors.textPrimary },
  leaderPts: { fontSize: 14, fontWeight: '700', color: colors.textPrimary },
});
