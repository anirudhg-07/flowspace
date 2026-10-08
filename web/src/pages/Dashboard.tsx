import { useEffect, useState } from 'react';
import api from '../services/api';
import { CheckCircle2, Clock, Folder } from 'lucide-react';

interface DashboardStats {
  totalProjects: number;
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  projectsInProgress: number;
}

export const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/dashboard');
        if (res.data.success) {
          setStats(res.data.data);
        }
      } catch (error) {
        console.error('Failed to fetch dashboard stats', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <div>Loading dashboard...</div>;

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <header style={{ marginBottom: 'var(--spacing-6)' }}>
        <h1 style={{ fontSize: '1.75rem', marginBottom: 'var(--spacing-2)' }}>Overview</h1>
        <p style={{ color: 'var(--color-text-secondary)' }}>Track your progress and stay on top of your work.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--spacing-5)', marginBottom: 'var(--spacing-8)' }}>
        <div className="card flex-col gap-2">
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)', color: 'var(--color-text-secondary)' }}>
            <Folder size={18} /> <span style={{ fontSize: '0.875rem' }}>Active Projects</span>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 'var(--font-weight-semibold)' }}>{stats?.projectsInProgress || 0}</div>
        </div>

        <div className="card flex-col gap-2">
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)', color: 'var(--color-text-secondary)' }}>
            <Clock size={18} /> <span style={{ fontSize: '0.875rem' }}>Pending Tasks</span>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 'var(--font-weight-semibold)' }}>{stats?.pendingTasks || 0}</div>
        </div>

        <div className="card flex-col gap-2">
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)', color: 'var(--color-text-secondary)' }}>
            <CheckCircle2 size={18} /> <span style={{ fontSize: '0.875rem' }}>Tasks Completed</span>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 'var(--font-weight-semibold)' }}>{stats?.completedTasks || 0}</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--spacing-5)' }}>
        <div className="card">
          <h3 style={{ marginBottom: 'var(--spacing-4)', fontSize: '1.125rem' }}>Recent Activity</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>No recent activity to show yet. Create a project to get started.</p>
          </div>
        </div>
        
        <div className="card">
          <h3 style={{ marginBottom: 'var(--spacing-4)', fontSize: '1.125rem' }}>Upcoming Deadlines</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
             <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>No upcoming deadlines.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
