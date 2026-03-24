import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors } from '../theme/colors';
import { useAuthStore } from '../store/authStore';

type RootStackParamList = {
  Dashboard: undefined;
  LifeClarity: undefined;
  SkillTracking: undefined;
  Habits: undefined;
  Finances: undefined;
  Health: undefined;
  Journal: undefined;
  AITwin: undefined;
  Motivation: undefined;
  Social: undefined;
  Gamification: undefined;
  Personality: undefined;
  Profile: undefined;
};

type DashNav = NativeStackNavigationProp<RootStackParamList, 'Dashboard'>;

const { width } = Dimensions.get('window');
const cardWidth = (width - 48 - 16) / 2;

const CARDS = [
  { title: 'Life Clarity', subtitle: 'Mindmap & Vision', color: colors.lavender, emoji: '🗺️', route: 'LifeClarity' },
  { title: 'Skills', subtitle: '100 Hours Mastery', color: colors.mintGreen, emoji: '🎯', route: 'SkillTracking' },
  { title: 'Habits', subtitle: 'Daily Streaks', color: colors.skyBlue, emoji: '✅', route: 'Habits' },
  { title: 'Finances', subtitle: 'Net Worth', color: colors.peach, emoji: '💰', route: 'Finances' },
  { title: 'Health', subtitle: 'Vitals & Mood', color: colors.softYellow, emoji: '💚', route: 'Health' },
  { title: 'Journal', subtitle: 'Life Timeline', color: colors.rose, emoji: '📓', route: 'Journal' },
  { title: 'Personality', subtitle: 'Self-Discovery', color: colors.lavender, emoji: '🧠', route: 'Personality' },
  { title: 'Social', subtitle: 'Community', color: colors.mintGreen, emoji: '🤝', route: 'Social' },
  { title: 'Rewards', subtitle: 'Points & Riddles', color: colors.softYellow, emoji: '🏆', route: 'Gamification' },
  { title: 'Motivation', subtitle: 'Quotes & Alerts', color: colors.skyBlue, emoji: '💡', route: 'Motivation' },
];

export default function DashboardScreen({ navigation }: { navigation: DashNav }) {
  const { points } = useAuthStore();
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good Morning' : hour < 18 ? 'Good Afternoon' : 'Good Evening';

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>{greeting} ✨</Text>
            <Text style={styles.subtitle}>Let's build your ideal self today.</Text>
          </View>
          <TouchableOpacity style={styles.avatarBtn} onPress={() => navigation.navigate('Profile')}>
            <Text style={styles.avatarEmoji}>👤</Text>
            <Text style={styles.pointsBadge}>{points}pts</Text>
          </TouchableOpacity>
        </View>

        {/* Modules Grid */}
        <View style={styles.grid}>
          {CARDS.map(card => (
            <TouchableOpacity
              key={card.route}
              style={[styles.card, { backgroundColor: card.color }]}
              activeOpacity={0.75}
              onPress={() => navigation.navigate(card.route as any)}
            >
              <Text style={styles.cardEmoji}>{card.emoji}</Text>
              <Text style={styles.cardTitle}>{card.title}</Text>
              <Text style={styles.cardSubtitle}>{card.subtitle}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* AI Twin Full-Width CTA */}
        <TouchableOpacity
          style={styles.fullCard}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('AITwin')}
        >
          <Text style={styles.fullCardEmoji}>🤖</Text>
          <View>
            <Text style={styles.fullCardTitle}>Daily Iteration & AI Twin</Text>
            <Text style={styles.fullCardSub}>Review yesterday · Talk to your Digital Twin</Text>
          </View>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  container: { padding: 24, paddingTop: 32, paddingBottom: 60 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 },
  greeting: { fontSize: 24, fontWeight: '800', color: colors.textPrimary, marginBottom: 4 },
  subtitle: { fontSize: 14, color: colors.textSecondary, fontWeight: '500' },
  avatarBtn: { alignItems: 'center', backgroundColor: '#FFF', borderRadius: 20, padding: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 6, elevation: 2 },
  avatarEmoji: { fontSize: 24 },
  pointsBadge: { fontSize: 11, fontWeight: '700', color: colors.textSecondary, marginTop: 2 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 16, marginBottom: 20 },
  card: { width: cardWidth, padding: 20, borderRadius: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 3 },
  cardEmoji: { fontSize: 28, marginBottom: 10 },
  cardTitle: { fontSize: 15, fontWeight: '800', color: colors.textPrimary, marginBottom: 2 },
  cardSubtitle: { fontSize: 11, fontWeight: '500', color: colors.textSecondary },
  fullCard: { flexDirection: 'row', alignItems: 'center', gap: 16, width: '100%', padding: 24, borderRadius: 24, backgroundColor: '#FFF', shadowColor: '#000', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.06, shadowRadius: 12, elevation: 4, borderWidth: 1, borderColor: 'rgba(0,0,0,0.03)' },
  fullCardEmoji: { fontSize: 36 },
  fullCardTitle: { fontSize: 17, fontWeight: '800', color: colors.textPrimary, marginBottom: 4 },
  fullCardSub: { fontSize: 13, color: colors.textSecondary },
});
