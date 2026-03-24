import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../store/authStore';

// Auth
import AuthScreen from '../screens/AuthScreen';

// Main Modules
import DashboardScreen from '../screens/DashboardScreen';
import LifeClarityScreen from '../screens/LifeClarityScreen';
import SkillTrackingScreen from '../screens/SkillTrackingScreen';
import HabitsScreen from '../screens/HabitsScreen';
import FinancesScreen from '../screens/FinancesScreen';
import HealthScreen from '../screens/HealthScreen';
import JournalScreen from '../screens/JournalScreen';
import AITwinScreen from '../screens/AITwinScreen';
import MotivationScreen from '../screens/MotivationScreen';
import SocialScreen from '../screens/SocialScreen';
import GamificationScreen from '../screens/GamificationScreen';
import PersonalityScreen from '../screens/PersonalityScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { session, setSession } = useAuthStore();

  useEffect(() => {
    // Hydrate session from Supabase on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listen for auth state changes (login, logout, token refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, [setSession]);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        contentStyle: { backgroundColor: '#F9FAFB' },
      }}
    >
      {session && session.user ? (
        // ✅ Authenticated — all app screens available
        <Stack.Group>
          <Stack.Screen name="Dashboard"    component={DashboardScreen} />
          <Stack.Screen name="LifeClarity"  component={LifeClarityScreen} />
          <Stack.Screen name="SkillTracking" component={SkillTrackingScreen} />
          <Stack.Screen name="Habits"        component={HabitsScreen} />
          <Stack.Screen name="Finances"      component={FinancesScreen} />
          <Stack.Screen name="Health"        component={HealthScreen} />
          <Stack.Screen name="Journal"       component={JournalScreen} />
          <Stack.Screen name="AITwin"        component={AITwinScreen} />
          <Stack.Screen name="Motivation"    component={MotivationScreen} />
          <Stack.Screen name="Social"        component={SocialScreen} />
          <Stack.Screen name="Gamification"  component={GamificationScreen} />
          <Stack.Screen name="Personality"   component={PersonalityScreen} />
          <Stack.Screen name="Profile"       component={ProfileScreen} />
        </Stack.Group>
      ) : (
        // 🔒 Unauthenticated — Auth gate, entire app hidden
        <Stack.Screen name="Auth" component={AuthScreen} />
      )}
    </Stack.Navigator>
  );
}
