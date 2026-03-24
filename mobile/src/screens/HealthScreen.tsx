import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, TextInput } from 'react-native';
import { colors } from '../theme/colors';

export default function HealthScreen({ navigation }: any) {
  const [weight, setWeight] = useState('72.5');
  const [mood, setMood] = useState('Great');

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Health Metrics</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.subtitle}>Track your body and mind wellness.</Text>

        <View style={[styles.card, { backgroundColor: colors.softYellow }]}>
          <Text style={styles.cardLabel}>Current Weight (kg)</Text>
          <TextInput 
            style={styles.inputLarge} 
            value={weight} 
            onChangeText={setWeight} 
            keyboardType="decimal-pad"
          />
        </View>

        <View style={[styles.card, { backgroundColor: colors.mintGreen }]}>
          <Text style={styles.cardLabel}>How are you feeling?</Text>
          <View style={styles.moodRow}>
            {['Awful', 'Okay', 'Great'].map(m => (
              <TouchableOpacity 
                key={m} 
                style={[styles.moodItem, mood === m && styles.moodItemActive]}
                onPress={() => setMood(m)}
              >
                <Text style={[styles.moodText, mood === m && styles.moodTextActive]}>{m}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Log Health Data</Text>
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
  subtitle: { fontSize: 14, color: colors.textSecondary, marginBottom: 24, textAlign: 'center' },
  card: { padding: 24, borderRadius: 24, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 },
  cardLabel: { fontSize: 14, fontWeight: '700', color: colors.textSecondary, marginBottom: 12, textTransform: 'uppercase' },
  inputLarge: { fontSize: 48, fontWeight: '800', color: colors.textPrimary, textAlign: 'center' },
  moodRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  moodItem: { paddingVertical: 12, paddingHorizontal: 20, backgroundColor: 'rgba(255,255,255,0.6)', borderRadius: 16 },
  moodItemActive: { backgroundColor: colors.textPrimary },
  moodText: { fontSize: 16, fontWeight: '600', color: colors.textPrimary },
  moodTextActive: { color: '#FFF' },
  saveButton: { width: '100%', padding: 20, backgroundColor: colors.textPrimary, borderRadius: 20, alignItems: 'center', marginTop: 16 },
  saveButtonText: { fontSize: 18, fontWeight: '800', color: '#FFF' }
});
