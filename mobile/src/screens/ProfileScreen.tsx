import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { colors, spacing, borderRadius } from '../theme/colors';

export default function ProfileScreen() {
  const { user, logout } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{user?.fullName?.[0]?.toUpperCase() || user?.email[0]?.toUpperCase()}</Text>
        </View>
        <Text style={styles.name}>{user?.fullName || 'User'}</Text>
        <Text style={styles.email}>{user?.email}</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <TouchableOpacity style={styles.menuItem} onPress={logout}>
          <Text style={styles.menuTextLogout}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: spacing.lg },
  header: { alignItems: 'center', marginVertical: spacing.xl },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: colors.surfaceAlt, justifyContent: 'center', alignItems: 'center', marginBottom: spacing.md },
  avatarText: { fontSize: 32, color: colors.text, fontWeight: '600' },
  name: { fontSize: 24, fontWeight: '600', color: colors.text, marginBottom: 4 },
  email: { fontSize: 16, color: colors.textSecondary },
  section: { marginTop: spacing.lg },
  sectionTitle: { fontSize: 14, color: colors.textSecondary, textTransform: 'uppercase', letterSpacing: 1, marginBottom: spacing.md, paddingHorizontal: spacing.sm },
  menuItem: { backgroundColor: colors.surface, padding: spacing.md, borderRadius: borderRadius.md, borderWidth: 1, borderColor: colors.border },
  menuTextLogout: { color: colors.danger, fontSize: 16, fontWeight: '500', textAlign: 'center' },
});
