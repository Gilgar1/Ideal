import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  ScrollView, SafeAreaView, TextInput, Alert
} from 'react-native';
import { colors } from '../theme/colors';

const INITIAL_POSTS = [
  { id: '1', author: 'Alex M.', avatar: '🧑‍💻', content: 'Just hit 50 hours coding this month! The IDEAL tracker keeps me honest 🚀', likes: 14, liked: false, time: '2h ago' },
  { id: '2', author: 'Priya K.', avatar: '🌸', content: 'Day 21 meditation streak! Who else is building their calm habits?', likes: 31, liked: true, time: '5h ago' },
  { id: '3', author: 'BuddyUser123', avatar: '🦁', content: 'Anyone else notice how tracking finances makes you spend less? Magic.', likes: 8, liked: false, time: '1d ago' },
];

export default function SocialScreen({ navigation }: any) {
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [newPost, setNewPost] = useState('');

  const toggleLike = (id: string) => {
    setPosts(prev => prev.map(p => p.id === id ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p));
  };

  const submitPost = () => {
    if (!newPost.trim()) return;
    setPosts(prev => [{ id: Date.now().toString(), author: 'You', avatar: '✨', content: newPost, likes: 0, liked: false, time: 'Just now' }, ...prev]);
    setNewPost('');
  };

  const report = (author: string) => Alert.alert('Report', `Post by "${author}" has been reported for review.`);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Community</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {/* Compose */}
        <View style={styles.composeCard}>
          <TextInput
            style={styles.composeInput}
            placeholder="Share a win, insight, or goal..."
            placeholderTextColor={colors.textSecondary}
            value={newPost}
            onChangeText={setNewPost}
            multiline
          />
          <TouchableOpacity style={styles.postBtn} onPress={submitPost}>
            <Text style={styles.postBtnText}>Post</Text>
          </TouchableOpacity>
        </View>

        {/* Feed */}
        {posts.map(post => (
          <View key={post.id} style={styles.postCard}>
            <View style={styles.postHeader}>
              <Text style={styles.avatar}>{post.avatar}</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.postAuthor}>{post.author}</Text>
                <Text style={styles.postTime}>{post.time}</Text>
              </View>
              <TouchableOpacity onPress={() => report(post.author)}>
                <Text style={styles.reportBtn}>⋯</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.postContent}>{post.content}</Text>
            <View style={styles.postActions}>
              <TouchableOpacity style={styles.likeBtn} onPress={() => toggleLike(post.id)}>
                <Text style={[styles.likeIcon, post.liked && styles.likedIcon]}>♥</Text>
                <Text style={styles.likeCount}>{post.likes}</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
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
  container: { padding: 20, paddingBottom: 60 },
  composeCard: { backgroundColor: '#FFF', borderRadius: 20, padding: 16, marginBottom: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 3 },
  composeInput: { fontSize: 16, color: colors.textPrimary, minHeight: 60, marginBottom: 12 },
  postBtn: { backgroundColor: colors.textPrimary, padding: 14, borderRadius: 16, alignItems: 'center' },
  postBtnText: { color: '#FFF', fontWeight: '700', fontSize: 16 },
  postCard: { backgroundColor: '#FFF', borderRadius: 20, padding: 20, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.04, shadowRadius: 6, elevation: 2 },
  postHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  avatar: { fontSize: 28, marginRight: 12 },
  postAuthor: { fontSize: 16, fontWeight: '700', color: colors.textPrimary },
  postTime: { fontSize: 12, color: colors.textSecondary, marginTop: 2 },
  reportBtn: { fontSize: 20, color: colors.textSecondary, paddingHorizontal: 4 },
  postContent: { fontSize: 16, color: colors.textPrimary, lineHeight: 24, marginBottom: 16 },
  postActions: { flexDirection: 'row' },
  likeBtn: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  likeIcon: { fontSize: 20, color: '#CBD5E0' },
  likedIcon: { color: '#FC8181' },
  likeCount: { fontSize: 14, fontWeight: '600', color: colors.textSecondary },
});
