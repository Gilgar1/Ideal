import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL
  ?? 'https://dtmvnftcthitugcregnr.supabase.co';

const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY
  ?? 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR0bXZuZnRjdGhpdHVnY3JlZ25yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQyMjkxMDYsImV4cCI6MjA4OTgwNTEwNn0.qU-Zr-pVWGEbL9P1UgOv21M8P8Y-RZaHzxjHjd7qMKI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
