import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, TextInput, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { colors } from '../theme/colors';

export default function AITwinScreen({ navigation }: any) {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([
    { id: '1', role: 'ai', text: 'Hello! I am your Digital Twin. Lets review your daily habits. Did you complete your 100-hours mastery practice today?' }
  ]);

  const sendMessage = () => {
    if (!message.trim()) return;
    setChat(prev => [...prev, { id: Date.now().toString(), role: 'user', text: message }]);
    setMessage('');
    
    // Fake AI Response logic to show UI mechanics
    setTimeout(() => {
      setChat(prev => [...prev, { 
        id: (Date.now() + 1).toString(), 
        role: 'ai', 
        text: 'Great job iterating! I noticed you are hitting your skill markers perfectly. Let\'s keep this exact consistency up tomorrow to reach your 100-hour goal.' 
      }]);
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Daily Iteration (AI)</Text>
        <View style={{ width: 60 }} />
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.chatContainer}>
          {chat.map(msg => (
            <View key={msg.id} style={[styles.bubble, msg.role === 'user' ? styles.userBubble : styles.aiBubble]}>
              <Text style={[styles.bubbleText, msg.role === 'ai' && { color: colors.textPrimary }]}>{msg.text}</Text>
            </View>
          ))}
        </ScrollView>
        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Reflect on yesterday..."
            placeholderTextColor={colors.textSecondary}
            value={message}
            onChangeText={setMessage}
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, backgroundColor: colors.background, zIndex: 10 },
  backButton: { padding: 8, backgroundColor: '#FFF', borderRadius: 12 },
  backButtonText: { color: colors.textPrimary, fontWeight: '600' },
  headerTitle: { fontSize: 18, fontWeight: '800', color: colors.textPrimary },
  chatContainer: { padding: 20, flexGrow: 1, justifyContent: 'flex-end' },
  bubble: { maxWidth: '80%', padding: 16, borderRadius: 20, marginBottom: 12 },
  userBubble: { alignSelf: 'flex-end', backgroundColor: colors.textPrimary, borderBottomRightRadius: 4 },
  aiBubble: { alignSelf: 'flex-start', backgroundColor: colors.lavender, borderBottomLeftRadius: 4 },
  bubbleText: { fontSize: 16, color: '#FFF', fontWeight: '500', lineHeight: 22 },
  inputContainer: { flexDirection: 'row', padding: 16, backgroundColor: '#FFF', borderTopWidth: 1, borderColor: '#F0F0F0', paddingBottom: Platform.OS === 'ios' ? 32 : 16 },
  textInput: { flex: 1, backgroundColor: colors.background, padding: 16, borderRadius: 20, fontSize: 16, color: colors.textPrimary },
  sendButton: { justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20, marginLeft: 8, backgroundColor: colors.mintGreen, borderRadius: 20 },
  sendButtonText: { color: colors.textPrimary, fontWeight: '700', fontSize: 16 }
});
