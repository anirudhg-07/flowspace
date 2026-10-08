import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { colors, spacing, borderRadius } from '../theme/colors';
import { ArrowLeft, Calendar as CalendarIcon } from 'lucide-react-native';
import api from '../api/client';

export default function ProjectFormScreen({ route, navigation }: any) {
  const { projectId } = route.params || {};
  const isEditing = !!projectId;

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('NOT_STARTED');
  
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isEditing) {
      const fetchProject = async () => {
        try {
          const res = await api.get(`/projects/${projectId}`);
          if (res.data.success) {
            const p = res.data.data;
            setName(p.name);
            setDescription(p.description || '');
            setStatus(p.status);
          }
        } catch (e) {
          Alert.alert('Error', 'Failed to load project details');
          navigation.goBack();
        } finally {
          setLoading(false);
        }
      };
      fetchProject();
    }
  }, [projectId]);

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert('Validation Error', 'Project name is required');
      return;
    }

    setSaving(true);
    try {
      const payload = {
        name,
        description,
        status,
      };

      if (isEditing) {
        await api.patch(`/projects/${projectId}`, payload);
      } else {
        await api.post('/projects', payload);
      }
      
      navigation.goBack();
    } catch (e) {
      Alert.alert('Error', 'Failed to save project. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    Alert.alert('Delete Project', 'Are you sure you want to delete this project?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: async () => {
        setSaving(true);
        try {
          await api.delete(`/projects/${projectId}`);
          navigation.navigate('App'); // Go back to Home
        } catch (e) {
          Alert.alert('Error', 'Failed to delete project');
          setSaving(false);
        }
      }}
    ]);
  };

  if (loading) {
    return <View style={styles.center}><ActivityIndicator color={colors.primary} /></View>;
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
          <ArrowLeft color={colors.text} size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{isEditing ? 'Edit Project' : 'New Project'}</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.form} contentContainerStyle={{ paddingBottom: 40 }}>
        <Text style={styles.label}>Project Name</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. Website Redesign"
          placeholderTextColor={colors.textSecondary}
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="What is this project about?"
          placeholderTextColor={colors.textSecondary}
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />

        <Text style={styles.label}>Status</Text>
        <View style={styles.statusGroup}>
          {['NOT_STARTED', 'IN_PROGRESS', 'COMPLETED'].map((s) => (
            <TouchableOpacity 
              key={s} 
              style={[styles.statusOption, status === s && styles.statusOptionActive]}
              onPress={() => setStatus(s)}
            >
              <Text style={[styles.statusText, status === s && styles.statusTextActive]}>{s.replace('_', ' ')}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity 
          style={[styles.saveBtn, saving && { opacity: 0.7 }]} 
          onPress={handleSave}
          disabled={saving}
        >
          {saving ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.saveBtnText}>{isEditing ? 'Save Changes' : 'Create Project'}</Text>
          )}
        </TouchableOpacity>

        {isEditing && (
          <TouchableOpacity style={styles.deleteBtn} onPress={handleDelete}>
            <Text style={styles.deleteBtnText}>Delete Project</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: spacing.md, paddingTop: spacing.xl + spacing.md, paddingBottom: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border },
  iconBtn: { padding: spacing.sm },
  headerTitle: { fontSize: 16, fontWeight: '600', color: colors.text },
  
  form: { padding: spacing.lg },
  label: { fontSize: 14, fontWeight: '500', color: colors.text, marginBottom: spacing.sm },
  input: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: borderRadius.md, padding: spacing.md, fontSize: 16, color: colors.text, marginBottom: spacing.lg },
  textArea: { minHeight: 120 },
  
  statusGroup: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginBottom: spacing.xl },
  statusOption: { paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderRadius: borderRadius.full, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface },
  statusOptionActive: { backgroundColor: colors.text, borderColor: colors.text },
  statusText: { fontSize: 13, fontWeight: '500', color: colors.textSecondary },
  statusTextActive: { color: colors.surface },

  saveBtn: { backgroundColor: colors.primary, paddingVertical: spacing.md, borderRadius: borderRadius.md, alignItems: 'center', marginBottom: spacing.md },
  saveBtnText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  
  deleteBtn: { backgroundColor: colors.dangerLight, paddingVertical: spacing.md, borderRadius: borderRadius.md, alignItems: 'center' },
  deleteBtnText: { color: colors.danger, fontSize: 16, fontWeight: '600' }
});
