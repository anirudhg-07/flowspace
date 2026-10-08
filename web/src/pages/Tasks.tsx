import { useEffect, useState } from 'react';
import api from '../services/api';
import { Modal } from '../components/Modal';
import { Plus, Search, CheckSquare, Trash2, Edit2, CheckCircle, Circle, Clock } from 'lucide-react';

const priorityBadge = (p: string) => {
  const m: any = { HIGH: 'badge-danger', MEDIUM: 'badge-warning', LOW: 'badge-neutral' };
  return m[p] ?? 'badge-neutral';
};

const statusBadge = (s: string) => {
  const m: any = { COMPLETED: 'badge-success', IN_PROGRESS: 'badge-warning', PENDING: 'badge-neutral' };
  return m[s] ?? 'badge-neutral';
};

const formatDate = (d: string | null) => {
  if (!d) return null;
  const date = new Date(d);
  const today = new Date();
  const diffDays = Math.ceil((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays < 0) return { label: `${Math.abs(diffDays)}d overdue`, overdue: true };
  if (diffDays === 0) return { label: 'Due today', overdue: false };
  if (diffDays === 1) return { label: 'Due tomorrow', overdue: false };
  return { label: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }), overdue: false };
};

const Skeleton = ({ h = 16, w = '100%', style = {} }: any) => (
  <div className="skeleton" style={{ height: h, width: w, borderRadius: 8, ...style }} />
);

export const Tasks = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [projectFilter, setProjectFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ id: '', projectId: '', name: '', description: '', priority: 'MEDIUM', status: 'PENDING', dueDate: '' });
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState('');

  const fetchData = async () => {
    setLoading(true);
    try {
      const [tasksRes, projectsRes] = await Promise.all([
        api.get('/tasks', { params: { search: search || undefined, status: statusFilter || undefined, priority: priorityFilter || undefined, projectId: projectFilter || undefined } }),
        api.get('/projects'),
      ]);
      if (tasksRes.data.success) setTasks(tasksRes.data.data);
      if (projectsRes.data.success) setProjects(projectsRes.data.data);
    } catch { }
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, [search, statusFilter, priorityFilter, projectFilter]);

  const openCreate = () => {
    setFormData({ id: '', projectId: projects.length > 0 ? projects[0].id : '', name: '', description: '', priority: 'MEDIUM', status: 'PENDING', dueDate: '' });
    setFormError('');
    setIsModalOpen(true);
  };

  const openEdit = (t: any) => {
    setFormData({ id: t.id, projectId: t.project_id, name: t.name, description: t.description || '', priority: t.priority, status: t.status, dueDate: t.due_date ? t.due_date.split('T')[0] : '' });
    setFormError('');
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.projectId) { setFormError('Please select a project.'); return; }
    setSaving(true);
    setFormError('');
    try {
      if (formData.id) {
        await api.put(`/tasks/${formData.id}`, formData);
      } else {
        await api.post('/tasks', formData);
      }
      setIsModalOpen(false);
      fetchData();
    } catch (err: any) {
      setFormError(err.response?.data?.error?.message || 'Something went wrong.');
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this task? This cannot be undone.')) return;
    await api.delete(`/tasks/${id}`);
    fetchData();
  };

  const toggleComplete = async (task: any) => {
    const newStatus = task.status === 'COMPLETED' ? 'PENDING' : 'COMPLETED';
    await api.put(`/tasks/${task.id}`, { ...task, status: newStatus });
    fetchData();
  };

  const grouped = tasks.reduce<Record<string, any[]>>((acc, t) => {
    const key = t.priority;
    if (!acc[key]) acc[key] = [];
    acc[key].push(t);
    return acc;
  }, {});
  const priorityOrder = ['HIGH', 'MEDIUM', 'LOW'];

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '1.375rem', fontWeight: 600, marginBottom: '4px' }}>Tasks</h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>Everything that needs your attention.</p>
        </div>
        <button className="btn btn-primary" onClick={openCreate} disabled={projects.length === 0}>
          <Plus size={15} style={{ marginRight: '6px' }} /> New Task
        </button>
      </div>

      {projects.length === 0 && !loading && (
        <div style={{ backgroundColor: 'var(--color-warning-bg)', border: '1px solid #e8d5b5', borderRadius: '10px', padding: '12px 16px', marginBottom: '20px', fontSize: '0.875rem', color: 'var(--color-warning)' }}>
          You need at least one project before adding tasks.
        </div>
      )}

      {/* Filters */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <div className="input-search" style={{ flex: '1 1 200px' }}>
          <span className="input-search-icon"><Search size={14} /></span>
          <input type="text" className="input-field" placeholder="Search tasks…" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <select className="input-field" value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={{ width: '150px', cursor: 'pointer' }}>
          <option value="">All Statuses</option>
          <option value="PENDING">Pending</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
        </select>
        <select className="input-field" value={priorityFilter} onChange={e => setPriorityFilter(e.target.value)} style={{ width: '150px', cursor: 'pointer' }}>
          <option value="">All Priorities</option>
          <option value="HIGH">High</option>
          <option value="MEDIUM">Medium</option>
          <option value="LOW">Low</option>
        </select>
        {projects.length > 0 && (
          <select className="input-field" value={projectFilter} onChange={e => setProjectFilter(e.target.value)} style={{ width: '180px', cursor: 'pointer' }}>
            <option value="">All Projects</option>
            {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
        )}
      </div>

      {/* Content */}
      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="card card-sm" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Skeleton h={20} w={20} style={{ borderRadius: '50%', flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <Skeleton h={14} w="55%" style={{ marginBottom: 6 }} />
                <Skeleton h={11} w="35%" />
              </div>
              <Skeleton h={22} w={60} />
            </div>
          ))}
        </div>
      ) : tasks.length === 0 ? (
        <div className="card">
          <div className="empty-state">
            <div className="empty-state-icon"><CheckSquare size={40} strokeWidth={1.25} /></div>
            <div className="empty-state-title">{search || statusFilter || priorityFilter || projectFilter ? 'No tasks match your filters' : 'No tasks yet'}</div>
            <div className="empty-state-desc">
              {search || statusFilter || priorityFilter || projectFilter
                ? 'Try adjusting your filters.'
                : 'Add a task to start moving your projects forward.'}
            </div>
            {!search && !statusFilter && !priorityFilter && !projectFilter && projects.length > 0 && (
              <button className="btn btn-primary btn-sm" onClick={openCreate} style={{ marginTop: '4px' }}>
                <Plus size={13} style={{ marginRight: '5px' }} /> Add Task
              </button>
            )}
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {priorityOrder.filter(p => grouped[p]?.length > 0).map(priority => (
            <div key={priority}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                <span className={`badge ${priorityBadge(priority)}`}>{priority}</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-tertiary)' }}>{grouped[priority].length} task{grouped[priority].length !== 1 ? 's' : ''}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {grouped[priority].map(task => {
                  const dateInfo = task.due_date ? formatDate(task.due_date) : null;
                  const isCompleted = task.status === 'COMPLETED';
                  return (
                    <div key={task.id} className="card card-sm" style={{ display: 'flex', alignItems: 'center', gap: '12px', opacity: isCompleted ? 0.65 : 1, transition: 'opacity 150ms ease' }}>
                      <button onClick={() => toggleComplete(task)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: isCompleted ? 'var(--color-success)' : 'var(--color-border)', display: 'flex', flexShrink: 0, padding: 0, transition: 'color 150ms ease' }}>
                        {isCompleted ? <CheckCircle size={20} /> : <Circle size={20} />}
                      </button>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: '0.875rem', fontWeight: 500, textDecoration: isCompleted ? 'line-through' : 'none', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginBottom: '2px' }}>
                          {task.name}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontSize: '0.75rem', color: 'var(--color-text-tertiary)' }}>{task.project?.name}</span>
                          {dateInfo && (
                            <span style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '0.75rem', color: (dateInfo as any).overdue ? 'var(--color-danger)' : 'var(--color-text-tertiary)', fontWeight: (dateInfo as any).overdue ? 500 : 400 }}>
                              <Clock size={11} /> {(dateInfo as any).label}
                            </span>
                          )}
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                        <span className={`badge ${statusBadge(task.status)}`}>{task.status.replace(/_/g, ' ')}</span>
                        <button onClick={() => openEdit(task)} className="btn btn-ghost btn-sm" style={{ padding: '4px 6px' }}><Edit2 size={13} /></button>
                        <button onClick={() => handleDelete(task.id)} className="btn btn-ghost btn-sm" style={{ padding: '4px 6px', color: 'var(--color-danger)' }}><Trash2 size={13} /></button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={formData.id ? 'Edit Task' : 'New Task'}>
        <form onSubmit={handleSubmit}>
          {formError && (
            <div style={{ backgroundColor: 'var(--color-danger-bg)', color: 'var(--color-danger)', padding: '10px 12px', borderRadius: '8px', fontSize: '0.8125rem', marginBottom: '16px' }}>
              {formError}
            </div>
          )}
          <div className="input-group">
            <label className="input-label">Project *</label>
            <select required className="input-field" value={formData.projectId} onChange={e => setFormData({ ...formData, projectId: e.target.value })} style={{ cursor: 'pointer' }}>
              <option value="" disabled>Select a project</option>
              {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </div>
          <div className="input-group">
            <label className="input-label">Task Name *</label>
            <input required type="text" className="input-field" placeholder="e.g. Design the login screen" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="input-group" style={{ marginBottom: 0 }}>
              <label className="input-label">Priority</label>
              <select className="input-field" value={formData.priority} onChange={e => setFormData({ ...formData, priority: e.target.value })} style={{ cursor: 'pointer' }}>
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
              </select>
            </div>
            <div className="input-group" style={{ marginBottom: 0 }}>
              <label className="input-label">Status</label>
              <select className="input-field" value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })} style={{ cursor: 'pointer' }}>
                <option value="PENDING">Pending</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </div>
          </div>
          <div className="input-group" style={{ marginTop: '16px' }}>
            <label className="input-label">Due Date</label>
            <input type="date" className="input-field" value={formData.dueDate} onChange={e => setFormData({ ...formData, dueDate: e.target.value })} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '24px' }}>
            <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? 'Saving…' : formData.id ? 'Save Changes' : 'Add Task'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
