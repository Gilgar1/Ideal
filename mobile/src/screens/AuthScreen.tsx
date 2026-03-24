import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, SafeAreaView } from 'react-native';
import { supabase } from '../lib/supabase';
import { colors } from '../theme/colors';

export default function AuthScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const signUpWithEmail = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) Alert.alert('Sign Up Error', error.message);
    else Alert.alert('Success', 'Account created! Please verify your email.');
    setLoading(false);
  };

  const signInWithEmail = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) Alert.alert('Sign In Error', error.message);
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Welcome to IDEAL ✨</Text>
        <Text style={styles.subtitle}>Log in or create an account to begin your journey.</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Email address"
          placeholderTextColor={colors.textSecondary}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={colors.textSecondary}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        
        <TouchableOpacity style={styles.primaryButton} onPress={signInWithEmail} disabled={loading}>
          <Text style={styles.primaryButtonText}>{loading ? 'Loading...' : 'Sign In'}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.secondaryButton} onPress={signUpWithEmail} disabled={loading}>
          <Text style={styles.secondaryButtonText}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lavender, // Soft pastel background
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 28,
    padding: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 32,
    textAlign: 'center',
  },
  input: {
    backgroundColor: colors.background,
    borderRadius: 16,
    padding: 16,
    fontSize: 16,
    marginBottom: 16,
    color: colors.textPrimary,
  },
  primaryButton: {
    backgroundColor: colors.textPrimary,
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.mintGreen,
  },
  secondaryButtonText: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
  }
});
