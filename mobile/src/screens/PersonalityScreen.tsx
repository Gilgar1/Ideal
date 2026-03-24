import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  ScrollView, SafeAreaView, Dimensions
} from 'react-native';
import { colors } from '../theme/colors';

const { width } = Dimensions.get('window');
const BAR_WIDTH = width - 96;

const LEVELS = [
  { label: 'Openness', value: 82, color: colors.lavender },
  { label: 'Conscientiousness', value: 74, color: colors.mintGreen },
  { label: 'Extraversion', value: 55, color: colors.skyBlue },
  { label: 'Agreeableness', value: 90, color: colors.peach },
  { label: 'Neuroticism', value: 30, color: colors.rose },
];

const QUESTIONS = [
  { q: 'I enjoy meeting new people.', key: 'Extraversion' },
  { q: 'I plan tasks carefully before acting.', key: 'Conscientiousness' },
  { q: 'I often feel anxious about things.', key: 'Neuroticism' },
];

export default function PersonalityScreen({ navigation }: any) {
  const [phase, setPhase] = useState<'quiz'|'results'>('quiz');
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [qIndex, setQIndex] = useState(0);

  const answer = (score: number) => {
    setAnswers(prev => ({ ...prev, [qIndex]: score }));
    if (qIndex < QUESTIONS.length - 1) {
      setQIndex(i => i + 1);
    } else {
      setPhase('results');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Self-Discovery</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {phase === 'quiz' ? (
          <>
            <Text style={styles.subtitle}>Answer honestly. Know yourself better.</Text>
            <View style={styles.progressRow}>
              {QUESTIONS.map((_, i) => (
                <View key={i} style={[styles.dot, i <= qIndex && styles.dotActive]} />
              ))}
            </View>
            <View style={[styles.questionCard, { backgroundColor: colors.lavender }]}>
              <Text style={styles.qCount}>Question {qIndex + 1} of {QUESTIONS.length}</Text>
              <Text style={styles.qText}>{QUESTIONS[qIndex].q}</Text>
            </View>
            <View style={styles.answerGrid}>
              {['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'].map((label, i) => (
                <TouchableOpacity key={i} style={styles.answerBtn} onPress={() => answer(i + 1)}>
                  <Text style={styles.answerText}>{label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        ) : (
          <>
            <Text style={styles.subtitle}>Your personality profile is ready 🎉</Text>
            <View style={styles.sectionCard}>
              <Text style={styles.sectionTitle}>Big 5 Traits</Text>
              {LEVELS.map(item => (
                <View key={item.label} style={styles.barRow}>
                  <View style={styles.barLabelRow}>
                    <Text style={styles.barLabel}>{item.label}</Text>
                    <Text style={styles.barPct}>{item.value}%</Text>
                  </View>
                  <View style={styles.barBg}>
                    <View style={[styles.barFill, { width: (BAR_WIDTH * item.value) / 100, backgroundColor: item.color }]} />
                  </View>
                </View>
              ))}
            </View>
            <View style={[styles.tagRow]}>
              {['Creative', 'Empathetic', 'Driven', 'Organised'].map(tag => (
                <View key={tag} style={[styles.tag, { backgroundColor: colors.mintGreen }]}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>
            <TouchableOpacity style={styles.retakeBtn} onPress={() => { setPhase('quiz'); setQIndex(0); setAnswers({}); }}>
              <Text style={styles.retakeText}>Retake Quiz</Text>
            </TouchableOpacity>
          </>
        )}
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
  subtitle: { fontSize: 14, color: colors.textSecondary, marginBottom: 20, textAlign: 'center' },
  progressRow: { flexDirection: 'row', justifyContent: 'center', marginBottom: 24, gap: 8 },
  dot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#E2E8F0' },
  dotActive: { backgroundColor: colors.textPrimary },
  questionCard: { padding: 28, borderRadius: 24, marginBottom: 24 },
  qCount: { fontSize: 12, fontWeight: '700', color: colors.textSecondary, marginBottom: 12, textTransform: 'uppercase' },
  qText: { fontSize: 22, fontWeight: '800', color: colors.textPrimary, lineHeight: 32 },
  answerGrid: { gap: 12 },
  answerBtn: { backgroundColor: '#FFF', padding: 18, borderRadius: 18, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.04, shadowRadius: 6, elevation: 2 },
  answerText: { fontSize: 16, fontWeight: '600', color: colors.textPrimary, textAlign: 'center' },
  sectionCard: { backgroundColor: '#FFF', borderRadius: 24, padding: 24, marginBottom: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 3 },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: colors.textPrimary, marginBottom: 20 },
  barRow: { marginBottom: 18 },
  barLabelRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  barLabel: { fontSize: 14, fontWeight: '600', color: colors.textPrimary },
  barPct: { fontSize: 14, fontWeight: '700', color: colors.textSecondary },
  barBg: { height: 10, backgroundColor: '#EDF2F7', borderRadius: 5, overflow: 'hidden' },
  barFill: { height: 10, borderRadius: 5 },
  tagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 24 },
  tag: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 },
  tagText: { fontSize: 14, fontWeight: '700', color: colors.textPrimary },
  retakeBtn: { backgroundColor: colors.textPrimary, padding: 20, borderRadius: 20, alignItems: 'center' },
  retakeText: { color: '#FFF', fontSize: 18, fontWeight: '800' },
});
