import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Modal } from '../components/Modal';
import { Plus, Search, FolderKanban, Trash2, Edit } from 'lucide-react';

export const Projects = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ id: '', name: '', description: '', status: 'NOT_STARTED' });

  const fetchProjects = async () => {
    try {
      const res = await api.get('/projects', { params: { search, status: statusFilter } });
      if (res.data.success) setProjects(res.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [search, statusFilter]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (formData.id) {
        await api.put(`/projects/${formData.id}`, formData);
      } else {
        await api.post('/projects', formData);
      }
      setIsModalOpen(false);
      setFormData({ id: '', name: '', description: '', status: 'NOT_STARTED' });
      fetchProjects();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      await api.delete(`/projects/${id}`);
      fetchProjects();
    }
  };

  const openEdit = (p: any) => {
    setFormData({ id: p.id, name: p.name, description: p.description || '', status: p.status });
    setIsModalOpen(true);
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <header className="flex justify-between items-center" style={{ marginBottom: 'var(--spacing-6)' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: 'var(--spacing-2)' }}>Projects</h1>
          <p style={{ color: 'var(--color-text-secondary)' }}>Manage all your active and past projects.</p>
        </div>
        <button className="btn btn-primary" onClick={() => {
          setFormData({ id: '', name: '', description: '', status: 'NOT_STARTED' });
          setIsModalOpen(true);
        }}>
          <Plus size={18} style={{ marginRight: '8px' }} /> New Project
        </button>
      </header>

      <div className="flex gap-4 items-center" style={{ marginBottom: 'var(--spacing-6)' }}>
        <div className="input-group" style={{ flex: 1, marginBottom: 0, position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-secondary)' }} />
          <input 
            type="text" className="input-field" placeholder="Search projects..." 
            style={{ paddingLeft: '40px' }}
            value={search} onChange={e => setSearch(e.target.value)}
          />
        </div>
        <select className="input-field" value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={{ width: '200px' }}>
          <option value="">All Statuses</option>
          <option value="NOT_STARTED">Not Started</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
        </select>
      </div>

      {loading ? (
        <div>Loading projects...</div>
      ) : projects.length === 0 ? (
        <div className="card flex-col items-center justify-center" style={{ padding: 'var(--spacing-10) 0', textAlign: 'center' }}>
          <FolderKanban size={48} style={{ color: 'var(--color-border)', marginBottom: 'var(--spacing-4)' }} />
          <h3>No projects found</h3>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-4)' }}>Get started by creating your first project.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 'var(--spacing-5)' }}>
          {projects.map(p => (
            <div key={p.id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
              <div className="flex justify-between items-center" style={{ marginBottom: 'var(--spacing-2)' }}>
                <h3 style={{ fontSize: '1.125rem' }}>{p.name}</h3>
                <span className={`badge ${p.status === 'COMPLETED' ? 'badge-success' : p.status === 'IN_PROGRESS' ? 'badge-warning' : 'badge-neutral'}`}>
                  {p.status.replace('_', ' ')}
                </span>
              </div>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', marginBottom: 'var(--spacing-4)', flex: 1 }}>
                {p.description || 'No description provided.'}
              </p>
              <div className="flex justify-between items-center" style={{ borderTop: '1px solid var(--color-border)', paddingTop: 'var(--spacing-3)' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>{p._count?.tasks || 0} tasks</span>
                <div className="flex gap-2">
                  <button onClick={() => openEdit(p)} className="btn btn-ghost" style={{ padding: '4px 8px' }}><Edit size={16} /></button>
                  <button onClick={() => handleDelete(p.id)} className="btn btn-ghost" style={{ padding: '4px 8px', color: 'var(--color-danger)' }}><Trash2 size={16} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={formData.id ? 'Edit Project' : 'New Project'}>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="input-label">Project Name</label>
            <input required type="text" className="input-field" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
          </div>
          <div className="input-group">
            <label className="input-label">Description</label>
            <textarea className="input-field" rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
          </div>
          <div className="input-group">
            <label className="input-label">Status</label>
            <select className="input-field" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
              <option value="NOT_STARTED">Not Started</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
            </select>
          </div>
          <div className="flex justify-end gap-2" style={{ marginTop: 'var(--spacing-6)' }}>
            <button type="button" className="btn btn-ghost" onClick={() => setIsModalOpen(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">{formData.id ? 'Save Changes' : 'Create Project'}</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
