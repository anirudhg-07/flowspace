import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Modal } from '../components/Modal';
import { Plus, Search, CheckSquare, Trash2, Edit } from 'lucide-react';

export const Tasks = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ id: '', projectId: '', name: '', description: '', priority: 'MEDIUM', status: 'PENDING' });

  const fetchData = async () => {
    try {
      const [tasksRes, projectsRes] = await Promise.all([
        api.get('/tasks', { params: { search, status: statusFilter, priority: priorityFilter } }),
        api.get('/projects')
      ]);
      if (tasksRes.data.success) setTasks(tasksRes.data.data);
      if (projectsRes.data.success) setProjects(projectsRes.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [search, statusFilter, priorityFilter]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (formData.id) {
        await api.put(`/tasks/${formData.id}`, formData);
      } else {
        await api.post('/tasks', formData);
      }
      setIsModalOpen(false);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      await api.delete(`/tasks/${id}`);
      fetchData();
    }
  };

  const openEdit = (t: any) => {
    setFormData({ id: t.id, projectId: t.project_id, name: t.name, description: t.description || '', priority: t.priority, status: t.status });
    setIsModalOpen(true);
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <header className="flex justify-between items-center" style={{ marginBottom: 'var(--spacing-6)' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: 'var(--spacing-2)' }}>Tasks</h1>
          <p style={{ color: 'var(--color-text-secondary)' }}>Organize your work and manage deadlines.</p>
        </div>
        <button className="btn btn-primary" onClick={() => {
          setFormData({ id: '', projectId: projects.length > 0 ? projects[0].id : '', name: '', description: '', priority: 'MEDIUM', status: 'PENDING' });
          setIsModalOpen(true);
        }}>
          <Plus size={18} style={{ marginRight: '8px' }} /> New Task
        </button>
      </header>

      <div className="flex gap-4 items-center" style={{ marginBottom: 'var(--spacing-6)' }}>
        <div className="input-group" style={{ flex: 1, marginBottom: 0, position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-secondary)' }} />
          <input 
            type="text" className="input-field" placeholder="Search tasks..." 
            style={{ paddingLeft: '40px' }}
            value={search} onChange={e => setSearch(e.target.value)}
          />
        </div>
        <select className="input-field" value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={{ width: '150px' }}>
          <option value="">All Statuses</option>
          <option value="PENDING">Pending</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
        </select>
        <select className="input-field" value={priorityFilter} onChange={e => setPriorityFilter(e.target.value)} style={{ width: '150px' }}>
          <option value="">All Priorities</option>
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
        </select>
      </div>

      {loading ? (
        <div>Loading tasks...</div>
      ) : tasks.length === 0 ? (
        <div className="card flex-col items-center justify-center" style={{ padding: 'var(--spacing-10) 0', textAlign: 'center' }}>
          <CheckSquare size={48} style={{ color: 'var(--color-border)', marginBottom: 'var(--spacing-4)' }} />
          <h3>No tasks found</h3>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-4)' }}>Get started by creating your first task.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--spacing-3)' }}>
          {tasks.map(t => (
            <div key={t.id} className="card flex justify-between items-center" style={{ padding: 'var(--spacing-4)' }}>
              <div>
                <div className="flex gap-2 items-center" style={{ marginBottom: 'var(--spacing-1)' }}>
                  <h3 style={{ fontSize: '1rem', textDecoration: t.status === 'COMPLETED' ? 'line-through' : 'none', color: t.status === 'COMPLETED' ? 'var(--color-text-secondary)' : 'inherit' }}>{t.name}</h3>
                  <span className={`badge ${t.priority === 'HIGH' ? 'badge-danger' : t.priority === 'MEDIUM' ? 'badge-warning' : 'badge-neutral'}`}>
                    {t.priority}
                  </span>
                </div>
                <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                  {t.project?.name} • {t.status.replace('_', ' ')}
                </div>
              </div>
              <div className="flex gap-2">
                  <button onClick={() => openEdit(t)} className="btn btn-ghost" style={{ padding: '4px 8px' }}><Edit size={16} /></button>
                  <button onClick={() => handleDelete(t.id)} className="btn btn-ghost" style={{ padding: '4px 8px', color: 'var(--color-danger)' }}><Trash2 size={16} /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={formData.id ? 'Edit Task' : 'New Task'}>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="input-label">Project</label>
            <select required className="input-field" value={formData.projectId} onChange={e => setFormData({...formData, projectId: e.target.value})}>
              <option value="" disabled>Select a project</option>
              {projects.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>
          <div className="input-group">
            <label className="input-label">Task Name</label>
            <input required type="text" className="input-field" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
          </div>
          <div className="flex gap-4">
            <div className="input-group" style={{ flex: 1 }}>
              <label className="input-label">Priority</label>
              <select className="input-field" value={formData.priority} onChange={e => setFormData({...formData, priority: e.target.value})}>
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
              </select>
            </div>
            <div className="input-group" style={{ flex: 1 }}>
              <label className="input-label">Status</label>
              <select className="input-field" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                <option value="PENDING">Pending</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-2" style={{ marginTop: 'var(--spacing-6)' }}>
            <button type="button" className="btn btn-ghost" onClick={() => setIsModalOpen(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">{formData.id ? 'Save Changes' : 'Create Task'}</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
