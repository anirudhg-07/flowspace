import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useFocusEffect } from '@react-navigation/native';
import { colors, spacing, borderRadius } from '../theme/colors';
import api from '../api/client';
import { Plus, ChevronRight, Circle, CheckCircle2 } from 'lucide-react-native';

export default function DashboardScreen({ navigation }: any) {
  const { user } = useAuth();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchDashboard = async () => {
    try {
      const res = await api.get('/dashboard');
      if (res.data.success) {
        setData(res.data.data);
      }
    } catch (e) {
      console.log('Error fetching dashboard', e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchDashboard();
    }, [])
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchDashboard();
  }, []);

  if (loading && !refreshing) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />}
    >
      {/* 7. DASHBOARD HEADER */}
      <View style={styles.header}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.logo}>Flowspace <Circle size={10} color={colors.primary} fill={colors.primary} /></Text>
          <Text style={styles.greeting}>Good morning, {user?.fullName?.split(' ')[0] || user?.email.split('@')[0]}</Text>
          <Text style={styles.subtitle}>Here's what's happening with your projects today.</Text>
        </View>
        <TouchableOpacity style={styles.avatar} onPress={() => navigation.navigate('Profile')}>
          <Text style={styles.avatarText}>{user?.fullName?.[0]?.toUpperCase() || user?.email[0]?.toUpperCase()}</Text>
        </TouchableOpacity>
      </View>

      {/* 8. QUICK ACTIONS */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick actions</Text>
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.quickActionButton} onPress={() => navigation.navigate('ProjectForm')}>
            <Plus size={18} color={colors.text} />
            <Text style={styles.quickActionText}>Project</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.quickActionButton, styles.quickActionPrimary]} onPress={() => navigation.navigate('TaskForm')}>
            <Plus size={18} color="#fff" />
            <Text style={[styles.quickActionText, { color: '#fff' }]}>Task</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 9. WORKSPACE METRICS */}
      {data?.stats && (
        <View style={styles.section}>
          <View style={styles.metricsGrid}>
            <View style={styles.metricCard}>
              <Text style={styles.metricValue}>{data.stats.totalProjects}</Text>
              <Text style={styles.metricLabel}>Projects</Text>
            </View>
            <View style={styles.metricCard}>
              <Text style={styles.metricValue}>{data.stats.totalTasks}</Text>
              <Text style={styles.metricLabel}>Tasks</Text>
            </View>
            <View style={styles.metricCard}>
              <Text style={styles.metricValue}>{data.stats.completedTasks}</Text>
              <Text style={styles.metricLabel}>Completed</Text>
            </View>
            <View style={styles.metricCard}>
              <Text style={styles.metricValue}>{data.stats.pendingTasks}</Text>
              <Text style={styles.metricLabel}>Pending</Text>
            </View>
          </View>
          <View style={[styles.metricCard, { marginTop: spacing.sm, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
            <Text style={styles.metricValue}>{data.stats.projectsInProgress}</Text>
            <Text style={styles.metricLabel}>Projects In Progress</Text>
          </View>
        </View>
      )}

      {/* 10. PROJECT PROGRESS */}
      {data?.projectProgress && (
        <View style={styles.section}>
          <View style={styles.progressCard}>
            <Text style={styles.progressTitle}>Project Progress</Text>
            <View style={styles.progressLayout}>
              <View style={styles.progressCircleContainer}>
                <View style={styles.progressCirclePlaceholder}>
                  <Text style={styles.progressPercentage}>{data.projectProgress.percentage}%</Text>
                </View>
                <Text style={styles.progressSub}>Overall completion</Text>
              </View>
              <View style={styles.progressStats}>
                <View style={styles.progressStatRow}><Text style={styles.progressStatLabel}>Completed</Text><Text style={styles.progressStatValue}>{data.projectProgress.completed}</Text></View>
                <View style={styles.progressStatRow}><Text style={styles.progressStatLabel}>In Progress</Text><Text style={styles.progressStatValue}>{data.projectProgress.inProgress}</Text></View>
                <View style={styles.progressStatRow}><Text style={styles.progressStatLabel}>Pending</Text><Text style={styles.progressStatValue}>{data.projectProgress.pending}</Text></View>
              </View>
            </View>
          </View>
        </View>
      )}

      {/* 11. UPCOMING TASKS */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Upcoming Tasks</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Tasks')}><Text style={styles.viewAll}>View all</Text></TouchableOpacity>
        </View>
        {data?.upcomingTasks?.length > 0 ? data.upcomingTasks.slice(0, 4).map((task: any) => (
          <TouchableOpacity key={task.id} style={styles.taskRow} onPress={() => navigation.navigate('TaskForm', { taskId: task.id, projectId: task.project_id })}>
            {task.status === 'COMPLETED' ? <CheckCircle2 size={20} color={colors.success} style={styles.taskIcon} /> : <Circle size={20} color={colors.border} style={styles.taskIcon} />}
            <View style={styles.taskContent}>
              <Text style={[styles.taskTitle, task.status === 'COMPLETED' && styles.taskTitleCompleted]}>{task.name}</Text>
              <Text style={styles.taskProject}>{task.project?.name || 'No Project'}</Text>
            </View>
            <View style={styles.taskMeta}>
              <Text style={[styles.taskPriority, task.priority === 'HIGH' && { color: colors.danger }, task.priority === 'MEDIUM' && { color: colors.warning }]}>{task.priority}</Text>
              <Text style={styles.taskDate}>{task.due_date ? new Date(task.due_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : 'No due date'}</Text>
            </View>
          </TouchableOpacity>
        )) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateTitle}>No tasks yet</Text>
            <Text style={styles.emptyStateDesc}>Add a task to start moving your project forward.</Text>
            <TouchableOpacity style={styles.emptyStateBtn} onPress={() => navigation.navigate('TaskForm')}><Text style={styles.emptyStateBtnText}>+ Add Task</Text></TouchableOpacity>
          </View>
        )}
      </View>

      {/* 12. RECENT PROJECTS */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Projects</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Projects')}><Text style={styles.viewAll}>View all</Text></TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: spacing.md }}>
          {data?.recentProjects?.length > 0 ? data.recentProjects.map((project: any) => (
            <TouchableOpacity key={project.id} style={styles.projectCardHoriz} onPress={() => navigation.navigate('ProjectDetails', { projectId: project.id })}>
              <Text style={styles.projectCardTitle} numberOfLines={1}>{project.name}</Text>
              <Text style={styles.projectCardDesc} numberOfLines={2}>{project.description || 'No description'}</Text>
              <View style={styles.projectCardProgress}>
                <View style={styles.projectCardProgressBar}><View style={[styles.projectCardProgressFill, { width: `${project.progress || 0}%` }]} /></View>
                <Text style={styles.projectCardProgressText}>{project.progress || 0}%</Text>
              </View>
              <View style={styles.projectCardFooter}>
                <Text style={styles.projectCardFooterText}>{project.taskCount || 0} tasks</Text>
                <Text style={styles.projectCardFooterText}>{project.end_date ? new Date(project.end_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : ''}</Text>
              </View>
            </TouchableOpacity>
          )) : (
            <View style={[styles.emptyState, { width: 280 }]}>
              <Text style={styles.emptyStateTitle}>No projects yet</Text>
              <Text style={styles.emptyStateDesc}>Create your first project and start organizing your work.</Text>
            </View>
          )}
        </ScrollView>
      </View>

      {/* 13. UPCOMING DEADLINES */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Upcoming Deadlines</Text>
        {data?.upcomingDeadlines?.length > 0 ? data.upcomingDeadlines.map((task: any) => (
          <TouchableOpacity key={task.id} style={styles.deadlineRow} onPress={() => navigation.navigate('TaskForm', { taskId: task.id, projectId: task.project_id })}>
            <View style={styles.deadlineDateBox}>
              <Text style={styles.deadlineDateDay}>{task.due_date ? new Date(task.due_date).getDate() : '-'}</Text>
              <Text style={styles.deadlineDateMonth}>{task.due_date ? new Date(task.due_date).toLocaleDateString(undefined, { month: 'short' }).toUpperCase() : 'NO DATE'}</Text>
            </View>
            <View style={styles.deadlineContent}>
              <Text style={styles.taskTitle}>{task.name}</Text>
              <Text style={styles.taskProject}>{task.project?.name || 'No Project'}</Text>
              <Text style={[styles.taskPriority, task.priority === 'HIGH' && { color: colors.danger }, task.priority === 'MEDIUM' && { color: colors.warning }]}>{task.priority} PRIORITY</Text>
            </View>
          </TouchableOpacity>
        )) : (
          <View style={[styles.emptyState, { borderWidth: 0, backgroundColor: 'transparent' }]}>
            <Text style={styles.emptyStateTitle}>You're clear</Text>
            <Text style={styles.emptyStateDesc}>There are no upcoming deadlines.</Text>
          </View>
        )}
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, paddingHorizontal: spacing.lg },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginTop: spacing.xl, marginBottom: spacing.xl },
  headerTextContainer: { flex: 1, paddingRight: spacing.md },
  logo: { fontSize: 14, fontWeight: '700', color: colors.text, marginBottom: spacing.md, letterSpacing: 1, textTransform: 'uppercase' },
  greeting: { fontSize: 24, fontWeight: '600', color: colors.text, marginBottom: spacing.xs },
  subtitle: { fontSize: 15, color: colors.textSecondary, lineHeight: 22 },
  avatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: colors.surfaceAlt, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: colors.border },
  avatarText: { fontSize: 18, color: colors.text, fontWeight: '600' },
  
  section: { marginBottom: spacing.xl },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.md },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: colors.text, marginBottom: spacing.md },
  viewAll: { fontSize: 14, color: colors.textSecondary },
  
  quickActions: { flexDirection: 'row', gap: spacing.md },
  quickActionButton: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: spacing.md, backgroundColor: colors.surface, borderRadius: borderRadius.md, borderWidth: 1, borderColor: colors.border, gap: spacing.xs },
  quickActionPrimary: { backgroundColor: colors.primary, borderColor: colors.primary },
  quickActionText: { fontSize: 15, fontWeight: '500', color: colors.text },

  metricsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  metricCard: { flex: 1, minWidth: '45%', backgroundColor: colors.surface, padding: spacing.md, borderRadius: borderRadius.md, borderWidth: 1, borderColor: colors.border },
  metricValue: { fontSize: 24, fontWeight: '600', color: colors.text, marginBottom: spacing.xs },
  metricLabel: { fontSize: 13, color: colors.textSecondary },

  progressCard: { backgroundColor: colors.surface, padding: spacing.lg, borderRadius: borderRadius.md, borderWidth: 1, borderColor: colors.border },
  progressTitle: { fontSize: 16, fontWeight: '600', color: colors.text, marginBottom: spacing.lg },
  progressLayout: { flexDirection: 'row', alignItems: 'center' },
  progressCircleContainer: { flex: 1, alignItems: 'center' },
  progressCirclePlaceholder: { width: 90, height: 90, borderRadius: 45, borderWidth: 8, borderColor: colors.primaryLight, borderTopColor: colors.primary, justifyContent: 'center', alignItems: 'center', marginBottom: spacing.sm },
  progressPercentage: { fontSize: 20, fontWeight: '700', color: colors.text },
  progressSub: { fontSize: 12, color: colors.textSecondary, textAlign: 'center' },
  progressStats: { flex: 1, paddingLeft: spacing.md },
  progressStatRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.sm },
  progressStatLabel: { fontSize: 14, color: colors.textSecondary },
  progressStatValue: { fontSize: 14, fontWeight: '600', color: colors.text },

  taskRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.surfaceAlt },
  taskIcon: { marginRight: spacing.md },
  taskContent: { flex: 1 },
  taskTitle: { fontSize: 15, fontWeight: '500', color: colors.text, marginBottom: 2 },
  taskTitleCompleted: { color: colors.textSecondary, textDecorationLine: 'line-through' },
  taskProject: { fontSize: 13, color: colors.textSecondary },
  taskMeta: { alignItems: 'flex-end' },
  taskPriority: { fontSize: 11, fontWeight: '600', textTransform: 'uppercase', color: colors.textSecondary, marginBottom: 4 },
  taskDate: { fontSize: 13, color: colors.textSecondary },

  emptyState: { backgroundColor: colors.surface, padding: spacing.xl, borderRadius: borderRadius.md, alignItems: 'center', borderWidth: 1, borderColor: colors.border, borderStyle: 'dashed' },
  emptyStateTitle: { fontSize: 16, fontWeight: '600', color: colors.text, marginBottom: spacing.xs },
  emptyStateDesc: { fontSize: 14, color: colors.textSecondary, textAlign: 'center', marginBottom: spacing.lg },
  emptyStateBtn: { paddingVertical: spacing.sm, paddingHorizontal: spacing.lg, backgroundColor: colors.surfaceAlt, borderRadius: borderRadius.md },
  emptyStateBtnText: { color: colors.text, fontWeight: '500' },

  projectCardHoriz: { width: 260, backgroundColor: colors.surface, padding: spacing.md, borderRadius: borderRadius.md, borderWidth: 1, borderColor: colors.border },
  projectCardTitle: { fontSize: 16, fontWeight: '600', color: colors.text, marginBottom: 4 },
  projectCardDesc: { fontSize: 13, color: colors.textSecondary, marginBottom: spacing.md, minHeight: 36 },
  projectCardProgress: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm },
  projectCardProgressBar: { flex: 1, height: 6, backgroundColor: colors.surfaceAlt, borderRadius: 3, marginRight: spacing.sm, overflow: 'hidden' },
  projectCardProgressFill: { height: '100%', backgroundColor: colors.primary, borderRadius: 3 },
  projectCardProgressText: { fontSize: 12, fontWeight: '500', color: colors.textSecondary },
  projectCardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  projectCardFooterText: { fontSize: 12, color: colors.textSecondary },

  deadlineRow: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.md },
  deadlineDateBox: { width: 48, alignItems: 'center', justifyContent: 'center', marginRight: spacing.md },
  deadlineDateDay: { fontSize: 20, fontWeight: '700', color: colors.text },
  deadlineDateMonth: { fontSize: 11, fontWeight: '600', color: colors.textSecondary, textTransform: 'uppercase' },
  deadlineContent: { flex: 1 },
});
