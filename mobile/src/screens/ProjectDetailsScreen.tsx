import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
import { colors, spacing, borderRadius } from '../theme/colors';
import { useFocusEffect } from '@react-navigation/native';
import api from '../api/client';
import { ArrowLeft, MoreHorizontal, Circle, CheckCircle2 } from 'lucide-react-native';

export default function ProjectDetailsScreen({ route, navigation }: any) {
  const { projectId } = route.params;
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('Tasks');

  const fetchProject = async () => {
    try {
      const res = await api.get(`/projects/${projectId}`);
      if (res.data.success) {
        setProject(res.data.data.project);
      }
    } catch (e) {
      console.log('Error fetching project', e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchProject();
    }, [projectId])
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchProject();
  }, []);

  const toggleTaskStatus = async (task: any) => {
    const newStatus = task.status === 'COMPLETED' ? 'PENDING' : 'COMPLETED';
    
    // Optimistic update
    setProject((prev: any) => ({
      ...prev,
      tasks: prev.tasks.map((t: any) => t.id === task.id ? { ...t, status: newStatus } : t)
    }));
    
    try {
      await api.patch(`/tasks/${task.id}`, { status: newStatus });
    } catch (e) {
      // Revert on failure
      setProject((prev: any) => ({
        ...prev,
        tasks: prev.tasks.map((t: any) => t.id === task.id ? { ...t, status: task.status } : t)
      }));
    }
  };

  if (loading && !refreshing) {
    return <View style={styles.center}><ActivityIndicator color={colors.primary} /></View>;
  }

  if (!project) {
    return <View style={styles.center}><Text style={{color: colors.text}}>Project not found</Text></View>;
  }

  const completedTasks = (project.tasks || []).filter((t: any) => t.status === 'COMPLETED').length;
  const totalTasks = project.tasks?.length || 0;
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  const statusLabel = project.status.replace('_', ' ');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
          <ArrowLeft color={colors.text} size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>{project.name}</Text>
        <TouchableOpacity style={styles.iconBtn}>
          <MoreHorizontal color={colors.text} size={24} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        contentContainerStyle={{ paddingBottom: 40 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />}
      >
        <View style={styles.heroSection}>
          <Text style={styles.projectName}>{project.name}</Text>
          <Text style={styles.projectDesc}>{project.description || 'No description provided.'}</Text>
          <View style={styles.badgeRow}>
            <Text style={[styles.statusBadge, project.status === 'COMPLETED' && { color: colors.success }, project.status === 'IN_PROGRESS' && { color: colors.primary }]}>
              {statusLabel}
            </Text>
          </View>
          
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${progress}%` }]} />
            </View>
            <Text style={styles.progressText}>{Math.round(progress)}%</Text>
          </View>
          
          {project.dueDate && (
            <Text style={styles.dateText}>Due {new Date(project.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</Text>
          )}
        </View>

        <View style={styles.tabsContainer}>
          <TouchableOpacity style={[styles.tab, activeTab === 'Overview' && styles.tabActive]} onPress={() => setActiveTab('Overview')}>
            <Text style={[styles.tabText, activeTab === 'Overview' && styles.tabTextActive]}>Overview</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.tab, activeTab === 'Tasks' && styles.tabActive]} onPress={() => setActiveTab('Tasks')}>
            <Text style={[styles.tabText, activeTab === 'Tasks' && styles.tabTextActive]}>Tasks</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.tabContent}>
          {activeTab === 'Tasks' ? (
            <View style={styles.taskList}>
              {project.tasks?.length > 0 ? project.tasks.map((task: any) => (
                <View key={task.id} style={styles.taskCard}>
                  <TouchableOpacity onPress={() => toggleTaskStatus(task)} style={styles.checkboxArea}>
                    {task.status === 'COMPLETED' ? <CheckCircle2 size={24} color={colors.success} /> : <Circle size={24} color={colors.border} />}
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.taskContent} onPress={() => navigation.navigate('TaskForm', { taskId: task.id })}>
                    <Text style={[styles.taskTitle, task.status === 'COMPLETED' && styles.taskTitleCompleted]}>{task.title}</Text>
                    <View style={styles.taskMeta}>
                      <Text style={[styles.taskPriority, task.priority === 'HIGH' && { color: colors.danger }, task.priority === 'MEDIUM' && { color: colors.warning }]}>{task.priority} · {task.status.replace('_', ' ')}</Text>
                      <Text style={styles.taskDate}>{task.dueDate ? `Due ${new Date(task.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}` : ''}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )) : (
                <View style={styles.emptyState}>
                  <Text style={styles.emptyStateTitle}>No tasks yet</Text>
                  <Text style={styles.emptyStateDesc}>Add a task to start moving your project forward.</Text>
                  <TouchableOpacity style={styles.emptyStateBtn} onPress={() => navigation.navigate('TaskForm', { projectId: project.id })}>
                    <Text style={styles.emptyStateBtnText}>+ Add Task</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          ) : (
            <View style={styles.overviewSection}>
              <Text style={styles.overviewText}>This project has {totalTasks} tasks in total.</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: spacing.md, paddingTop: spacing.xl + spacing.md, paddingBottom: spacing.sm, borderBottomWidth: 1, borderBottomColor: colors.border },
  iconBtn: { padding: spacing.sm },
  headerTitle: { flex: 1, textAlign: 'center', fontSize: 16, fontWeight: '600', color: colors.text },
  
  heroSection: { padding: spacing.lg, backgroundColor: colors.surface, borderBottomWidth: 1, borderBottomColor: colors.border },
  projectName: { fontSize: 24, fontWeight: '700', color: colors.text, marginBottom: spacing.xs },
  projectDesc: { fontSize: 15, color: colors.textSecondary, marginBottom: spacing.lg, lineHeight: 22 },
  badgeRow: { flexDirection: 'row', marginBottom: spacing.md },
  statusBadge: { fontSize: 12, fontWeight: '700', color: colors.textSecondary, textTransform: 'uppercase', letterSpacing: 0.5 },
  
  progressContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.md },
  progressBar: { flex: 1, height: 6, backgroundColor: colors.surfaceAlt, borderRadius: 3, marginRight: spacing.sm, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: colors.primary, borderRadius: 3 },
  progressText: { fontSize: 14, fontWeight: '600', color: colors.textSecondary, width: 40, textAlign: 'right' },
  dateText: { fontSize: 14, color: colors.textSecondary },

  tabsContainer: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: colors.border, backgroundColor: colors.surface },
  tab: { flex: 1, paddingVertical: spacing.md, alignItems: 'center', borderBottomWidth: 2, borderBottomColor: 'transparent' },
  tabActive: { borderBottomColor: colors.text },
  tabText: { fontSize: 15, fontWeight: '500', color: colors.textSecondary },
  tabTextActive: { color: colors.text, fontWeight: '600' },

  tabContent: { padding: spacing.lg },
  
  taskList: { gap: spacing.sm },
  taskCard: { flexDirection: 'row', backgroundColor: colors.surface, padding: spacing.md, borderRadius: borderRadius.md, borderWidth: 1, borderColor: colors.border },
  checkboxArea: { paddingRight: spacing.md, paddingTop: 2 },
  taskContent: { flex: 1, justifyContent: 'center' },
  taskTitle: { fontSize: 16, fontWeight: '500', color: colors.text, marginBottom: 4 },
  taskTitleCompleted: { color: colors.textSecondary, textDecorationLine: 'line-through' },
  taskMeta: { flexDirection: 'row', justifyContent: 'space-between' },
  taskPriority: { fontSize: 12, fontWeight: '600', color: colors.textSecondary, textTransform: 'uppercase' },
  taskDate: { fontSize: 13, color: colors.textSecondary },

  overviewSection: { padding: spacing.lg },
  overviewText: { fontSize: 15, color: colors.textSecondary },

  emptyState: { backgroundColor: 'transparent', padding: spacing.xl, alignItems: 'center', marginTop: spacing.md, borderWidth: 1, borderColor: colors.border, borderStyle: 'dashed', borderRadius: borderRadius.md },
  emptyStateTitle: { fontSize: 16, fontWeight: '600', color: colors.text, marginBottom: spacing.xs },
  emptyStateDesc: { fontSize: 14, color: colors.textSecondary, textAlign: 'center', marginBottom: spacing.lg },
  emptyStateBtn: { paddingVertical: spacing.sm, paddingHorizontal: spacing.lg, backgroundColor: colors.surfaceAlt, borderRadius: borderRadius.md },
  emptyStateBtnText: { color: colors.text, fontWeight: '500' }
});
