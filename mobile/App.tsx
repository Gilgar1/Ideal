import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';

// Pastel Wellness Protocol: Color Palette
const colors = {
  background: '#F9FAFB', // Soft off-white
  surface: '#FFFFFF',
  textPrimary: '#2D3748',
  textSecondary: '#718096',
  
  // Pastel Categories
  lavender: '#E9E4F0',
  mintGreen: '#D7F5E4',
  skyBlue: '#E2F0FC',
  peach: '#FEEBC8',
  softYellow: '#FEF0CD',
  rose: '#FCE7F3',
};

const { width } = Dimensions.get('window');
const cardMargin = 8;
const cardWidth = (width - 48 - (cardMargin * 2)) / 2; // 2-column grid calculation

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        
        {/* Header Section */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good Morning, User ✨</Text>
            <Text style={styles.subtitle}>Let's build your ideal self today.</Text>
          </View>
          {/* Avatar Placeholder */}
          <View style={styles.avatar} />
        </View>

        {/* 2-Column Grid System */}
        <View style={styles.grid}>
          
          <DashboardCard title="Life Clarity" subtitle="Mindmap & Vision" color={colors.lavender} />
          <DashboardCard title="Skill Tracking" subtitle="Log Practice" color={colors.mintGreen} />
          
          <DashboardCard title="Habits" subtitle="Daily Streaks" color={colors.skyBlue} />
          <DashboardCard title="Finances" subtitle="Net Worth" color={colors.peach} />
          
          <DashboardCard title="Health" subtitle="Vitals & Mood" color={colors.softYellow} />
          <DashboardCard title="Journal" subtitle="Life Timeline" color={colors.rose} />
          
        </View>

        {/* Full-width Single Item */}
        <TouchableOpacity style={styles.fullCard} activeOpacity={0.8}>
          <Text style={styles.cardTitle}>Daily Iteration System</Text>
          <Text style={styles.cardSubtitle}>Review yesterday & talk to your AI Twin.</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

// Reusable Pastel Card Component
const DashboardCard = ({ title, subtitle, color }: { title: string; subtitle: string; color: string }) => (
  <TouchableOpacity style={[styles.card, { backgroundColor: color }]} activeOpacity={0.7}>
    <View style={styles.iconPlaceholder} />
    <Text style={styles.cardTitle}>{title}</Text>
    <Text style={styles.cardSubtitle}>{subtitle}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    padding: 24,
    paddingTop: 40,
    paddingBottom: 60,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.lavender,
    borderWidth: 2,
    borderColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: cardWidth,
    padding: 20,
    borderRadius: 24, // High border radius as requested
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  iconPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.6)',
    marginBottom: 16,
  },
  fullCard: {
    width: '100%',
    padding: 24,
    borderRadius: 24,
    backgroundColor: '#FFF',
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.02)',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.textSecondary,
    opacity: 0.7,
  },
});
