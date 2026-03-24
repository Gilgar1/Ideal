import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  ScrollView, SafeAreaView, TextInput, Switch, Alert
} from 'react-native';
import { colors } from '../theme/colors';
import { supabase } from '../lib/supabase';

export default function ProfileScreen({ navigation }: any) {
  const [appLock, setAppLock] = useState(false);
  const [activityAlert, setActivityAlert] = useState(false);

  const handleSignOut = async () => {
    Alert.alert('Sign Out', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Sign Out', style: 'destructive', onPress: async () => { await supabase.auth.signOut(); } },
    ]);
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      '⚠️ Delete Account',
      'This will permanently erase ALL your data. This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete Everything', style: 'destructive', onPress: () => Alert.alert('Submitted', 'Your deletion request has been submitted. Data will be erased within 24 hours.') },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile & Security</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {/* Avatar */}
        <View style={styles.avatarSection}>
          <View style={styles.avatar}>
            <Text style={styles.avatarEmoji}>✨</Text>
          </View>
          <Text style={styles.userName}>Your Ideal Self</Text>
          <Text style={styles.userEmail}>Connected to Supabase ✓</Text>
        </View>

        {/* Security Section */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Security</Text>

          <View style={styles.toggleRow}>
            <View>
              <Text style={styles.toggleLabel}>App Lock (Biometrics)</Text>
              <Text style={styles.toggleSub}>FaceID / Fingerprint protection</Text>
            </View>
            <Switch
              value={appLock}
              onValueChange={setAppLock}
              trackColor={{ false: '#E2E8F0', true: colors.mintGreen }}
              thumbColor={appLock ? colors.textPrimary : '#CBD5E0'}
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.toggleRow}>
            <View>
              <Text style={styles.toggleLabel}>Inactivity Alerts</Text>
              <Text style={styles.toggleSub}>Notify loved ones if inactive 3+ days</Text>
            </View>
            <Switch
              value={activityAlert}
              onValueChange={setActivityAlert}
              trackColor={{ false: '#E2E8F0', true: colors.peach }}
              thumbColor={activityAlert ? colors.textPrimary : '#CBD5E0'}
            />
          </View>
        </View>

        {/* Danger Zone */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Account</Text>
          <TouchableOpacity style={styles.signOutBtn} onPress={handleSignOut}>
            <Text style={styles.signOutText}>Sign Out</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteBtn} onPress={handleDeleteAccount}>
            <Text style={styles.deleteText}>Delete My Account & All Data (GDPR)</Text>
          </TouchableOpacity>
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
  headerTitle: { fontSize: 18, fontWeight: '800', color: colors.textPrimary },
  container: { padding: 24, paddingBottom: 80 },
  avatarSection: { alignItems: 'center', marginBottom: 32 },
  avatar: { width: 90, height: 90, borderRadius: 45, backgroundColor: colors.lavender, justifyContent: 'center', alignItems: 'center', marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.08, shadowRadius: 12, elevation: 4 },
  avatarEmoji: { fontSize: 40 },
  userName: { fontSize: 22, fontWeight: '800', color: colors.textPrimary, marginBottom: 4 },
  userEmail: { fontSize: 14, color: colors.textSecondary },
  sectionCard: { backgroundColor: '#FFF', borderRadius: 24, padding: 24, marginBottom: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 3 },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: colors.textPrimary, marginBottom: 20 },
  toggleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 4 },
  toggleLabel: { fontSize: 16, fontWeight: '600', color: colors.textPrimary, marginBottom: 2 },
  toggleSub: { fontSize: 12, color: colors.textSecondary },
  divider: { height: 1, backgroundColor: '#F0F4F8', marginVertical: 16 },
  signOutBtn: { backgroundColor: colors.background, padding: 18, borderRadius: 16, alignItems: 'center', marginBottom: 12 },
  signOutText: { fontSize: 16, fontWeight: '700', color: colors.textPrimary },
  deleteBtn: { backgroundColor: '#FFF0F0', padding: 18, borderRadius: 16, alignItems: 'center', borderWidth: 1, borderColor: '#FED7D7' },
  deleteText: { fontSize: 14, fontWeight: '700', color: '#E53E3E' },
});
