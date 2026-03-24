import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, TextInput } from 'react-native';
import { colors } from '../theme/colors';

export default function LifeClarityScreen({ navigation }: any) {
  const [vision, setVision] = useState('Build my ideal life system');
  const [isEditing, setIsEditing] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Life Clarity</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.subtitle}>Define your ultimate vision, purpose, and goals here.</Text>

        {/* Vision Node */}
        <View style={[styles.nodeCard, { backgroundColor: colors.lavender }]}>
          <Text style={styles.nodeLabel}>1. Core Vision</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={vision}
              onChangeText={setVision}
              onBlur={() => setIsEditing(false)}
              autoFocus
            />
          ) : (
            <TouchableOpacity onPress={() => setIsEditing(true)}>
              <Text style={styles.nodeContent}>{vision}</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.connector} />

        {/* Goals Node */}
        <View style={[styles.nodeCard, { backgroundColor: colors.skyBlue }]}>
          <Text style={styles.nodeLabel}>2. Main Goals</Text>
          <Text style={styles.nodeItem}>• Complete React Native Course</Text>
          <Text style={styles.nodeItem}>• Meditate 20m Daily</Text>
          <Text style={styles.nodeItem}>• Save $5,000</Text>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>+ Add Goal</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.connector} />

        {/* Habits Node */}
        <View style={[styles.nodeCard, { backgroundColor: colors.mintGreen }]}>
          <Text style={styles.nodeLabel}>3. Core Habits</Text>
          <Text style={styles.nodeItem}>• Wake up at 6 AM</Text>
          <Text style={styles.nodeItem}>• Code for 2 hours</Text>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>+ Add Habit</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  backButton: { padding: 8, backgroundColor: '#FFF', borderRadius: 12 },
  backButtonText: { color: colors.textPrimary, fontWeight: '600' },
  headerTitle: { fontSize: 20, fontWeight: '800', color: colors.textPrimary },
  container: { padding: 24, paddingBottom: 60, alignItems: 'center' },
  subtitle: { fontSize: 14, color: colors.textSecondary, marginBottom: 32, textAlign: 'center' },
  nodeCard: {
    width: '100%',
    padding: 24,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  connector: {
    width: 2,
    height: 32,
    backgroundColor: '#CBD5E0',
    marginVertical: 4,
  },
  nodeLabel: { fontSize: 12, fontWeight: '700', color: colors.textSecondary, marginBottom: 12, textTransform: 'uppercase' },
  nodeContent: { fontSize: 18, fontWeight: '700', color: colors.textPrimary },
  input: { fontSize: 18, fontWeight: '700', color: colors.textPrimary, borderBottomWidth: 1, borderBottomColor: colors.textPrimary, paddingBottom: 4 },
  nodeItem: { fontSize: 15, fontWeight: '500', color: colors.textPrimary, marginBottom: 8 },
  addButton: { marginTop: 12, paddingVertical: 8, alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.5)', borderRadius: 12 },
  addButtonText: { color: colors.textPrimary, fontWeight: '600', fontSize: 14 }
});
