import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing } from '../theme/colors';

export default function ProjectsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Projects</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: spacing.xl, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: '600', color: colors.text },
});
