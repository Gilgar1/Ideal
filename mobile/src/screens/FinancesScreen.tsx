import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { colors } from '../theme/colors';

export default function FinancesScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Financial Overview</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.subtitle}>Track your assets, liabilities, and grow your net worth.</Text>

        {/* Net Worth Summary */}
        <View style={styles.netWorthCard}>
          <Text style={styles.netWorthLabel}>Total Net Worth</Text>
          <Text style={styles.netWorthAmount}>$14,250.00</Text>
          <Text style={styles.netWorthGrowth}>+ $450 this month 📈</Text>
        </View>

        <View style={styles.row}>
          <View style={[styles.halfCard, { backgroundColor: colors.mintGreen }]}>
            <Text style={styles.halfCardLabel}>Assets</Text>
            <Text style={styles.halfCardAmount}>$28,500</Text>
          </View>
          <View style={[styles.halfCard, { backgroundColor: colors.rose }]}>
            <Text style={styles.halfCardLabel}>Liabilities</Text>
            <Text style={styles.halfCardAmount}>-$14,250</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.exportButton}>
          <Text style={styles.exportButtonText}>Export Report to PDF</Text>
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
  netWorthCard: {
    backgroundColor: '#FFF', padding: 32, borderRadius: 28, alignItems: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.05, shadowRadius: 16, elevation: 4, marginBottom: 16
  },
  netWorthLabel: { fontSize: 16, color: colors.textSecondary, fontWeight: '700', marginBottom: 8, textTransform: 'uppercase' },
  netWorthAmount: { fontSize: 48, fontWeight: '800', color: colors.textPrimary, marginVertical: 4 },
  netWorthGrowth: { fontSize: 16, color: '#48BB78', fontWeight: '700', marginTop: 8 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 32 },
  halfCard: { width: '48%', padding: 20, borderRadius: 24 },
  halfCardLabel: { fontSize: 14, color: colors.textSecondary, fontWeight: '700', marginBottom: 8 },
  halfCardAmount: { fontSize: 24, fontWeight: '800', color: colors.textPrimary },
  exportButton: { width: '100%', padding: 20, backgroundColor: colors.peach, borderRadius: 20, alignItems: 'center' },
  exportButtonText: { fontSize: 18, fontWeight: '800', color: colors.textPrimary }
});
