import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { colors, spacing, borderRadius } from '../theme/colors';
import api from '../api/client';
import { ArrowLeft } from 'lucide-react-native';

export default function TaskFormScreen({ route, navigation }: any) {
  const { taskId, projectId } = route.params || {};
  const isEditing = !!taskId;

  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('MEDIUM');
  const [status, setStatus] = useState('PENDING');
  const [dueDate, setDueDate] = useState(''); // Simple string for now

  useEffect(() => {
    if (isEditing) {
      const fetchTask = async () => {
        try {
          const res = await api.get(`/tasks/${taskId}`);
          if (res.data.success) {
            const t = res.data.data;
            setTitle(t.title);
            setDescription(t.description || '');
            setPriority(t.priority);
            setStatus(t.status);
            setDueDate(t.dueDate ? new Date(t.dueDate).toISOString().split('T')[0] : '');
          }
        } catch (e) {
          console.log('Error fetching task', e);
          Alert.alert('Error', 'Could not load task');
          navigation.goBack();
        } finally {
          setLoading(false);
        }
      };
      fetchTask();
    }
  }, [taskId]);

  const handleSave = async () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Task name is required');
      return;
    }
    
    setSaving(true);
    try {
      const payload: any = { title, description, priority, status };
      if (dueDate) payload.dueDate = new Date(dueDate).toISOString();
      if (projectId) payload.projectId = projectId;

      if (isEditing) {
        await api.patch(`/tasks/${taskId}`, payload);
      } else {
        await api.post('/tasks', payload);
      }
      navigation.goBack();
    } catch (e) {
      console.log('Error saving task', e);
      Alert.alert('Error', 'Failed to save task');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = () => {
    Alert.alert('Delete Task', 'Are you sure you want to delete this task?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: async () => {
        setSaving(true);
        try {
          await api.delete(`/tasks/${taskId}`);
          navigation.goBack();
        } catch (e) {
          Alert.alert('Error', 'Failed to delete task');
          setSaving(false);
        }
      }}
    ]);
  };

  if (loading) return <View style={styles.center}><ActivityIndicator color={colors.primary} /></View>;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
          <ArrowLeft color={colors.text} size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{isEditing ? 'Edit Task' : 'Add Task'}</Text>
        <View style={styles.iconBtn} />
      </View>

      <ScrollView style={styles.form} contentContainerStyle={{ paddingBottom: 60 }}>
        <Text style={styles.label}>Task name</Text>
        <TextInput 
          style={styles.input} 
          placeholder="What needs to be done?"
          placeholderTextColor={colors.textSecondary}
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.label}>Description</Text>
        <TextInput 
          style={[styles.input, styles.textArea]} 
          placeholder="Add details..."
          placeholderTextColor={colors.textSecondary}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
          value={description}
          onChangeText={setDescription}
        />

        <Text style={styles.label}>Priority</Text>
        <View style={styles.segmentedControl}>
          {['LOW', 'MEDIUM', 'HIGH'].map(p => (
            <TouchableOpacity key={p} style={[styles.segment, priority === p && styles.segmentActive]} onPress={() => setPriority(p)}>
              <Text style={[styles.segmentText, priority === p && styles.segmentTextActive]}>{p}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Status</Text>
        <View style={styles.segmentedControl}>
          {['PENDING', 'IN_PROGRESS', 'COMPLETED'].map(s => (
            <TouchableOpacity key={s} style={[styles.segment, status === s && styles.segmentActive]} onPress={() => setStatus(s)}>
              <Text style={[styles.segmentText, status === s && styles.segmentTextActive]}>{s.replace('_', ' ')}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Due date (YYYY-MM-DD)</Text>
        <TextInput 
          style={styles.input} 
          placeholder="e.g. 2026-12-20"
          placeholderTextColor={colors.textSecondary}
          value={dueDate}
          onChangeText={setDueDate}
        />

        <TouchableOpacity style={styles.primaryBtn} onPress={handleSave} disabled={saving}>
          {saving ? <ActivityIndicator color="#fff" /> : <Text style={styles.primaryBtnText}>{isEditing ? 'Save Changes' : 'Create Task'}</Text>}
        </TouchableOpacity>

        {isEditing && (
          <TouchableOpacity style={styles.secondaryBtn} onPress={handleDelete} disabled={saving}>
            <Text style={styles.secondaryBtnText}>Delete Task</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: spacing.md, paddingTop: spacing.xl + spacing.md, paddingBottom: spacing.sm, borderBottomWidth: 1, borderBottomColor: colors.border },
  iconBtn: { padding: spacing.sm, width: 44, alignItems: 'center' },
  headerTitle: { flex: 1, textAlign: 'center', fontSize: 16, fontWeight: '600', color: colors.text },
  
  form: { padding: spacing.lg },
  label: { fontSize: 14, fontWeight: '500', color: colors.text, marginBottom: spacing.xs },
  input: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: borderRadius.md, padding: spacing.md, fontSize: 16, color: colors.text, marginBottom: spacing.lg },
  textArea: { minHeight: 100 },
  
  segmentedControl: { flexDirection: 'row', backgroundColor: colors.surfaceAlt, borderRadius: borderRadius.md, padding: 4, marginBottom: spacing.lg },
  segment: { flex: 1, paddingVertical: spacing.sm, alignItems: 'center', borderRadius: borderRadius.sm },
  segmentActive: { backgroundColor: colors.surface, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 1, elevation: 1 },
  segmentText: { fontSize: 13, fontWeight: '500', color: colors.textSecondary },
  segmentTextActive: { color: colors.text, fontWeight: '600' },

  primaryBtn: { backgroundColor: colors.primary, padding: spacing.md, borderRadius: borderRadius.md, alignItems: 'center', marginTop: spacing.md },
  primaryBtnText: { color: '#fff', fontSize: 16, fontWeight: '600' },

  secondaryBtn: { padding: spacing.md, alignItems: 'center', marginTop: spacing.sm },
  secondaryBtnText: { color: colors.danger, fontSize: 15, fontWeight: '500' }
});
