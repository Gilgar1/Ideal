import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, TextInput } from 'react-native';
import { colors } from '../theme/colors';

export default function JournalScreen({ navigation }: any) {
  const [entry, setEntry] = useState('');

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Life Logging</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.subtitle}>Document moments of your life.</Text>

        <View style={styles.card}>
          <Text style={styles.dateText}>{new Date().toDateString()}</Text>
          <TextInput
            style={styles.textInput}
            placeholder="What's strictly on your mind today?"
            placeholderTextColor={colors.textSecondary}
            multiline
            numberOfLines={8}
            value={entry}
            onChangeText={setEntry}
            textAlignVertical="top"
          />
        </View>

        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Add to Timeline</Text>
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
  card: { backgroundColor: colors.rose, padding: 24, borderRadius: 24, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 },
  dateText: { fontSize: 16, fontWeight: '700', color: colors.textPrimary, marginBottom: 16 },
  textInput: { fontSize: 16, color: colors.textPrimary, minHeight: 150, backgroundColor: 'rgba(255,255,255,0.6)', padding: 16, borderRadius: 16 },
  saveButton: { width: '100%', padding: 20, backgroundColor: colors.textPrimary, borderRadius: 20, alignItems: 'center', marginTop: 8 },
  saveButtonText: { fontSize: 18, fontWeight: '800', color: '#FFF' }
});
