import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
import { colors, spacing, borderRadius } from '../theme/colors';
import { useFocusEffect } from '@react-navigation/native';

import api from '../api/client';
import { Circle, CheckCircle2 } from 'lucide-react-native';

export default function TasksScreen({ navigation }: any) {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const fetchTasks = async () => {
    try {
      const res = await api.get('/tasks');
      if (res.data.success) {
        setTasks(res.data.data.tasks);
      }
    } catch (e) {
      console.log('Error fetching tasks', e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchTasks();
    }, [])
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchTasks();
  }, []);

  const toggleTaskStatus = async (task: any) => {
    // Optimistic update
    const newStatus = task.status === 'COMPLETED' ? 'PENDING' : 'COMPLETED';
    setTasks(current => current.map(t => t.id === task.id ? { ...t, status: newStatus } : t));

    try {
      await api.patch(`/tasks/${task.id}`, { status: newStatus });
    } catch (e) {
      // Revert on failure
      setTasks(current => current.map(t => t.id === task.id ? { ...t, status: task.status } : t));
    }
  };

  const filters = ['All', 'Pending', 'In Progress', 'Completed'];

  const filteredTasks = (tasks || []).filter(t => {
    if (filter !== 'All') {
      const tStatus = t.status === 'COMPLETED' ? 'Completed' : (t.status === 'IN_PROGRESS' ? 'In Progress' : 'Pending');
      if (tStatus !== filter) return false;
    }
    if (search && !t.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Tasks</Text>
        <Text style={styles.subtitle}>Everything that needs your attention.</Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search tasks..."
          placeholderTextColor={colors.textSecondary}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
          {filters.map(f => (
            <TouchableOpacity
              key={f}
              style={[styles.filterChip, filter === f && styles.filterChipActive]}
              onPress={() => setFilter(f)}
            >
              <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>{f}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {loading && !refreshing ? (
        <View style={styles.center}><ActivityIndicator color={colors.primary} /></View>
      ) : (
        <ScrollView
          style={styles.list}
          contentContainerStyle={{ paddingBottom: 40 }}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />}
        >
          {filteredTasks.length > 0 ? filteredTasks.map(task => (
            <View key={task.id} style={styles.taskCard}>
              <View style={styles.taskCardTop}>
                <TouchableOpacity onPress={() => toggleTaskStatus(task)} style={styles.checkboxArea}>
                  {task.status === 'COMPLETED' ? <CheckCircle2 size={24} color={colors.success} /> : <Circle size={24} color={colors.border} />}
                </TouchableOpacity>
                <View style={styles.taskContent}>
                  <Text style={[styles.taskTitle, task.status === 'COMPLETED' && styles.taskTitleCompleted]}>{task.title}</Text>
                  <Text style={styles.taskProject}>{task.project?.name || 'No Project'}</Text>
                </View>
              </View>

              <View style={styles.taskCardBottom}>
                <View style={styles.taskBadges}>
                  <Text style={[styles.badge, task.priority === 'HIGH' && { color: colors.danger, backgroundColor: colors.dangerLight }, task.priority === 'MEDIUM' && { color: colors.warning }]}>
                    {task.priority}
                  </Text>
                  <Text style={[styles.badge, { backgroundColor: colors.surfaceAlt }]}>
                    {task.status.replace('_', ' ')}
                  </Text>
                </View>
                <Text style={styles.taskDate}>{task.dueDate ? `Due ${new Date(task.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}` : ''}</Text>
              </View>
            </View>
          )) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateTitle}>No tasks found</Text>
              <Text style={styles.emptyStateDesc}>Try another search or clear your filters.</Text>
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { padding: spacing.lg, paddingTop: spacing.xl + spacing.md },
  title: { fontSize: 28, fontWeight: '700', color: colors.text, marginBottom: 4 },
  subtitle: { fontSize: 15, color: colors.textSecondary },

  searchContainer: { paddingHorizontal: spacing.lg, marginBottom: spacing.md },
  searchInput: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: borderRadius.md, padding: spacing.md, fontSize: 16, color: colors.text },

  filterContainer: { marginBottom: spacing.md },
  filterScroll: { paddingHorizontal: spacing.lg, gap: spacing.sm },
  filterChip: { paddingHorizontal: spacing.md, paddingVertical: 8, borderRadius: borderRadius.full, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
  filterChipActive: { backgroundColor: colors.text, borderColor: colors.text },
  filterText: { fontSize: 14, color: colors.textSecondary, fontWeight: '500' },
  filterTextActive: { color: colors.surface },

  list: { paddingHorizontal: spacing.lg },

  taskCard: { backgroundColor: colors.surface, padding: spacing.lg, borderRadius: borderRadius.md, borderWidth: 1, borderColor: colors.border, marginBottom: spacing.sm },
  taskCardTop: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: spacing.md },
  checkboxArea: { paddingRight: spacing.md, paddingTop: 2 },
  taskContent: { flex: 1 },
  taskTitle: { fontSize: 16, fontWeight: '500', color: colors.text, marginBottom: 4 },
  taskTitleCompleted: { color: colors.textSecondary, textDecorationLine: 'line-through' },
  taskProject: { fontSize: 14, color: colors.textSecondary },

  taskCardBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingLeft: 24 + spacing.md },
  taskBadges: { flexDirection: 'row', gap: spacing.sm },
  badge: { fontSize: 11, fontWeight: '600', color: colors.textSecondary, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4, overflow: 'hidden' },
  taskDate: { fontSize: 13, color: colors.textSecondary },

  emptyState: { backgroundColor: 'transparent', padding: spacing.xl, alignItems: 'center', marginTop: spacing.xl },
  emptyStateTitle: { fontSize: 16, fontWeight: '600', color: colors.text, marginBottom: spacing.xs },
  emptyStateDesc: { fontSize: 14, color: colors.textSecondary, textAlign: 'center' },
});
