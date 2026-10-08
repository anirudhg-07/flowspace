import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
import { colors, spacing, borderRadius } from '../theme/colors';
import api from '../api/client';

export default function ProjectsScreen({ navigation }: any) {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const fetchProjects = async () => {
    try {
      const res = await api.get('/projects');
      if (res.data.success) {
        setProjects(res.data.data.projects || []);
      }
    } catch (e) {
      console.log('Error fetching projects', e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchProjects();
  }, []);

  const filters = ['All', 'Not Started', 'In Progress', 'Completed'];

  const filteredProjects = (projects || []).filter(p => {
    if (filter !== 'All') {
      const pStatus = p.status === 'COMPLETED' ? 'Completed' : (p.status === 'IN_PROGRESS' ? 'In Progress' : 'Not Started');
      if (pStatus !== filter) return false;
    }
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Projects</Text>
        <Text style={styles.subtitle}>Manage and organize your work.</Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput 
          style={styles.searchInput} 
          placeholder="Search projects..." 
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
          {filteredProjects.length > 0 ? filteredProjects.map(project => {
            const completedTasks = (project.tasks || []).filter((t: any) => t.status === 'COMPLETED').length;
            const totalTasks = project._count?.tasks || project.tasks?.length || 0;
            const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
            const statusLabel = project.status.replace('_', ' ');

            return (
              <TouchableOpacity key={project.id} style={styles.projectCard}>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardTitle}>{project.name}</Text>
                  <Text style={[styles.statusBadge, project.status === 'COMPLETED' && { color: colors.success }, project.status === 'IN_PROGRESS' && { color: colors.primary }]}>
                    {statusLabel}
                  </Text>
                </View>
                <Text style={styles.cardDesc} numberOfLines={2}>{project.description || 'No description'}</Text>
                
                <View style={styles.progressContainer}>
                  <View style={styles.progressBar}>
                    <View style={[styles.progressFill, { width: `${progress}%` }]} />
                  </View>
                  <Text style={styles.progressText}>{Math.round(progress)}%</Text>
                </View>

                <View style={styles.cardFooter}>
                  <Text style={styles.cardFooterText}>{totalTasks} tasks</Text>
                  <Text style={styles.cardFooterText}>{project.dueDate ? `Due ${new Date(project.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}` : ''}</Text>
                </View>
              </TouchableOpacity>
            );
          }) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateTitle}>No projects found</Text>
              <Text style={styles.emptyStateDesc}>Try adjusting your search or filters.</Text>
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
  
  projectCard: { backgroundColor: colors.surface, padding: spacing.lg, borderRadius: borderRadius.md, borderWidth: 1, borderColor: colors.border, marginBottom: spacing.md },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.xs },
  cardTitle: { fontSize: 18, fontWeight: '600', color: colors.text, flex: 1, paddingRight: spacing.md },
  statusBadge: { fontSize: 11, fontWeight: '700', color: colors.textSecondary, textTransform: 'uppercase', letterSpacing: 0.5 },
  cardDesc: { fontSize: 14, color: colors.textSecondary, marginBottom: spacing.lg },
  
  progressContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.md },
  progressBar: { flex: 1, height: 6, backgroundColor: colors.surfaceAlt, borderRadius: 3, marginRight: spacing.sm, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: colors.primary, borderRadius: 3 },
  progressText: { fontSize: 13, fontWeight: '600', color: colors.textSecondary, width: 36, textAlign: 'right' },
  
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardFooterText: { fontSize: 13, color: colors.textSecondary },

  emptyState: { backgroundColor: 'transparent', padding: spacing.xl, alignItems: 'center', marginTop: spacing.xl },
  emptyStateTitle: { fontSize: 16, fontWeight: '600', color: colors.text, marginBottom: spacing.xs },
  emptyStateDesc: { fontSize: 14, color: colors.textSecondary, textAlign: 'center' },
});
