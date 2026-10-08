import { useEffect, useState } from 'react';
import api from '../services/api';
import { Modal } from '../components/Modal';
import { Plus, Search, FolderKanban, Trash2, Edit2, Clock, CheckSquare, MoreHorizontal } from 'lucide-react';

const statusBadge = (s: string) => {
  const m: any = { COMPLETED: 'badge-success', IN_PROGRESS: 'badge-warning', NOT_STARTED: 'badge-neutral' };
  return m[s] ?? 'badge-neutral';
};

const statusLabel = (s: string) => s.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

const formatDate = (d: string | null) => {
  if (!d) return null;
  return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

const Skeleton = ({ h = 16, w = '100%', style = {} }: any) => (
  <div className="skeleton" style={{ height: h, width: w, borderRadius: 8, ...style }} />
);

export const Projects = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const [formData, setFormData] = useState({ id: '', name: '', description: '', status: 'NOT_STARTED', startDate: '', endDate: '' });
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState('');

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await api.get('/projects', { params: { search: search || undefined, status: statusFilter || undefined } });
      if (res.data.success) setProjects(res.data.data);
    } catch { }
    setLoading(false);
  };

  useEffect(() => { fetchProjects(); }, [search, statusFilter]);

  const openCreate = () => {
    setFormData({ id: '', name: '', description: '', status: 'NOT_STARTED', startDate: '', endDate: '' });
    setFormError('');
    setIsModalOpen(true);
  };

  const openEdit = (p: any) => {
    setFormData({
      id: p.id, name: p.name, description: p.description || '', status: p.status,
      startDate: p.start_date ? p.start_date.split('T')[0] : '',
      endDate: p.end_date ? p.end_date.split('T')[0] : '',
    });
    setFormError('');
    setIsModalOpen(true);
    setMenuOpen(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setFormError('');
    try {
      if (formData.id) {
        await api.put(`/projects/${formData.id}`, formData);
      } else {
        await api.post('/projects', formData);
      }
      setIsModalOpen(false);
      fetchProjects();
    } catch (err: any) {
      setFormError(err.response?.data?.error?.message || 'Something went wrong.');
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this project and all its tasks? This cannot be undone.')) return;
    setMenuOpen(null);
    await api.delete(`/projects/${id}`);
    fetchProjects();
  };

  return (
    <div onClick={() => setMenuOpen(null)}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '1.375rem', fontWeight: 600, marginBottom: '4px' }}>Projects</h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>Manage and organize your work.</p>
        </div>
        <button className="btn btn-primary" onClick={openCreate}>
          <Plus size={15} style={{ marginRight: '6px' }} /> New Project
        </button>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <div className="input-search" style={{ flex: 1 }}>
          <span className="input-search-icon"><Search size={14} /></span>
          <input type="text" className="input-field" placeholder="Search projects…" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <select className="input-field" value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={{ width: '170px', cursor: 'pointer' }}>
          <option value="">All Statuses</option>
          <option value="NOT_STARTED">Not Started</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
        </select>
      </div>

      {/* Content */}
      {loading ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '12px' }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="card">
              <Skeleton h={16} w="65%" style={{ marginBottom: 10 }} />
              <Skeleton h={12} w="90%" style={{ marginBottom: 6 }} />
              <Skeleton h={12} w="70%" style={{ marginBottom: 16 }} />
              <Skeleton h={6} w="100%" style={{ marginBottom: 10, borderRadius: 99 }} />
              <Skeleton h={12} w="40%" />
            </div>
          ))}
        </div>
      ) : projects.length === 0 ? (
        <div className="card">
          <div className="empty-state">
            <div className="empty-state-icon"><FolderKanban size={40} strokeWidth={1.25} /></div>
            <div className="empty-state-title">{search || statusFilter ? 'No projects match your filters' : 'No projects yet'}</div>
            <div className="empty-state-desc">
              {search || statusFilter ? 'Try adjusting your search or filters.' : 'Create your first project and start organizing your work.'}
            </div>
            {!search && !statusFilter && (
              <button className="btn btn-primary btn-sm" onClick={openCreate} style={{ marginTop: '4px' }}>
                <Plus size={13} style={{ marginRight: '5px' }} /> Create Project
              </button>
            )}
          </div>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '12px' }}>
          {projects.map(p => {
            const total = p._count?.tasks ?? 0;
            const completedCount = p.tasks?.filter((t: any) => t.status === 'COMPLETED').length ?? 0;
            const progress = total > 0 ? Math.round((completedCount / total) * 100) : 0;
            return (
              <div key={p.id} className="card card-hover" style={{ display: 'flex', flexDirection: 'column', gap: '10px', position: 'relative' }}>
                {/* Card Header */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px' }}>
                  <h3 style={{ fontSize: '0.9375rem', fontWeight: 600, lineHeight: 1.3, flex: 1 }}>{p.name}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
                    <span className={`badge ${statusBadge(p.status)}`}>{statusLabel(p.status)}</span>
                    <div style={{ position: 'relative' }}>
                      <button
                        className="btn btn-ghost btn-sm"
                        style={{ padding: '4px 6px' }}
                        onClick={e => { e.stopPropagation(); setMenuOpen(menuOpen === p.id ? null : p.id); }}
                      >
                        <MoreHorizontal size={15} />
                      </button>
                      {menuOpen === p.id && (
                        <div onClick={e => e.stopPropagation()} style={{ position: 'absolute', top: '100%', right: 0, backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '10px', padding: '6px', boxShadow: 'var(--shadow-md)', zIndex: 20, minWidth: '130px', marginTop: '4px' }}>
                          <button onClick={() => openEdit(p)} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '7px 10px', width: '100%', background: 'none', border: 'none', cursor: 'pointer', borderRadius: '7px', fontSize: '0.8125rem', color: 'var(--color-text-primary)' }}
                            onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--color-surface-alt)')}
                            onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}>
                            <Edit2 size={13} /> Edit
                          </button>
                          <button onClick={() => handleDelete(p.id)} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '7px 10px', width: '100%', background: 'none', border: 'none', cursor: 'pointer', borderRadius: '7px', fontSize: '0.8125rem', color: 'var(--color-danger)' }}
                            onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--color-danger-bg)')}
                            onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}>
                            <Trash2 size={13} /> Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Description */}
                {p.description && (
                  <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', lineHeight: 1.55, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                    {p.description}
                  </p>
                )}

                {/* Progress */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-tertiary)' }}>Progress</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-tertiary)', fontWeight: 500 }}>{progress}%</span>
                  </div>
                  <div className="progress-bar-track">
                    <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
                  </div>
                </div>

                {/* Meta */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingTop: '6px', borderTop: '1px solid var(--color-border-subtle)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: 'var(--color-text-tertiary)' }}>
                    <CheckSquare size={12} /> {total} tasks
                  </span>
                  {p.end_date && (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: 'var(--color-text-tertiary)' }}>
                      <Clock size={12} /> {formatDate(p.end_date)}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={formData.id ? 'Edit Project' : 'New Project'}>
        <form onSubmit={handleSubmit}>
          {formError && (
            <div style={{ backgroundColor: 'var(--color-danger-bg)', color: 'var(--color-danger)', padding: '10px 12px', borderRadius: '8px', fontSize: '0.8125rem', marginBottom: '16px' }}>
              {formError}
            </div>
          )}
          <div className="input-group">
            <label className="input-label">Project Name *</label>
            <input required type="text" className="input-field" placeholder="e.g. Mobile App Redesign" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
          </div>
          <div className="input-group">
            <label className="input-label">Description</label>
            <textarea className="input-field" rows={3} placeholder="Brief description of the project…" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
          </div>
          <div className="input-group">
            <label className="input-label">Status</label>
            <select className="input-field" value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })} style={{ cursor: 'pointer' }}>
              <option value="NOT_STARTED">Not Started</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
            </select>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="input-group" style={{ marginBottom: 0 }}>
              <label className="input-label">Start Date</label>
              <input type="date" className="input-field" value={formData.startDate} onChange={e => setFormData({ ...formData, startDate: e.target.value })} />
            </div>
            <div className="input-group" style={{ marginBottom: 0 }}>
              <label className="input-label">End Date</label>
              <input type="date" className="input-field" value={formData.endDate} onChange={e => setFormData({ ...formData, endDate: e.target.value })} />
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '24px' }}>
            <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? 'Saving…' : formData.id ? 'Save Changes' : 'Create Project'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
