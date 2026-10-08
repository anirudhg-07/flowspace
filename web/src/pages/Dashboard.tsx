import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import api from '../services/api';
import {
  Folder, CheckSquare, CheckCircle2, Clock, Activity,
  Plus, ArrowRight, AlertCircle, TrendingUp
} from 'lucide-react';

// ─── Types ───────────────────────────────────────────────────────────────────
interface DashboardData {
  stats: { totalProjects: number; totalTasks: number; completedTasks: number; pendingTasks: number; projectsInProgress: number; };
  projectProgress: { completed: number; inProgress: number; pending: number; percentage: number; };
  upcomingTasks: any[];
  recentProjects: any[];
  upcomingDeadlines: any[];
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
const formatDate = (d: string | null) => {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

const priorityBadge = (priority: string) => {
  const map: Record<string, string> = { HIGH: 'badge-danger', MEDIUM: 'badge-warning', LOW: 'badge-neutral' };
  return map[priority] ?? 'badge-neutral';
};

const statusBadge = (status: string) => {
  const map: Record<string, string> = {
    COMPLETED: 'badge-success', IN_PROGRESS: 'badge-warning',
    PENDING: 'badge-neutral', NOT_STARTED: 'badge-neutral',
  };
  return map[status] ?? 'badge-neutral';
};

const statusLabel = (status: string) =>
  status.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

// ─── Circular Progress ────────────────────────────────────────────────────────
const CircularProgress = ({ pct }: { pct: number }) => {
  const r = 52;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  return (
    <svg width="130" height="130" viewBox="0 0 130 130">
      <circle cx="65" cy="65" r={r} fill="none" stroke="var(--color-border-subtle)" strokeWidth="10" />
      <circle
        cx="65" cy="65" r={r} fill="none"
        stroke="var(--color-accent-primary)" strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray={`${dash} ${circ}`}
        transform="rotate(-90 65 65)"
        style={{ transition: 'stroke-dasharray 0.8s ease' }}
      />
      <text x="65" y="61" textAnchor="middle" fontSize="20" fontWeight="600" fill="var(--color-text-primary)" fontFamily="Inter,sans-serif">{pct}%</text>
      <text x="65" y="78" textAnchor="middle" fontSize="11" fill="var(--color-text-secondary)" fontFamily="Inter,sans-serif">complete</text>
    </svg>
  );
};

// ─── Skeleton ─────────────────────────────────────────────────────────────────
const Skeleton = ({ h = 20, w = '100%', style = {} }: { h?: number; w?: number | string; style?: any }) => (
  <div className="skeleton" style={{ height: h, width: w, ...style }} />
);

// ─── Empty State ──────────────────────────────────────────────────────────────
const EmptyState = ({ icon: Icon, title, desc, action, onAction }: any) => (
  <div className="empty-state">
    <div className="empty-state-icon"><Icon size={36} strokeWidth={1.25} /></div>
    <div className="empty-state-title">{title}</div>
    <div className="empty-state-desc">{desc}</div>
    {action && onAction && (
      <button onClick={onAction} className="btn btn-secondary btn-sm" style={{ marginTop: '4px' }}>
        <Plus size={13} style={{ marginRight: '5px' }} /> {action}
      </button>
    )}
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────
export const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchDashboard = async () => {
    setError(false);
    try {
      const res = await api.get('/dashboard');
      if (res.data.success) setData(res.data.data);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchDashboard(); }, []);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  const firstName = user?.fullName?.split(' ')[0] || user?.email?.split('@')[0] || 'there';

  // ── Metric Cards config ────────────────────────────────────────────────────
  const metrics = data ? [
    { label: 'Total Projects', value: data.stats.totalProjects, icon: Folder, color: 'var(--color-accent-primary)', bg: 'var(--color-accent-light)' },
    { label: 'Total Tasks', value: data.stats.totalTasks, icon: CheckSquare, color: 'var(--color-text-secondary)', bg: 'var(--color-info-bg)' },
    { label: 'Completed', value: data.stats.completedTasks, icon: CheckCircle2, color: 'var(--color-success)', bg: 'var(--color-success-bg)' },
    { label: 'Pending', value: data.stats.pendingTasks, icon: Clock, color: 'var(--color-warning)', bg: 'var(--color-warning-bg)' },
    { label: 'In Progress', value: data.stats.projectsInProgress, icon: Activity, color: 'var(--color-danger)', bg: 'var(--color-danger-bg)' },
  ] : [];

  return (
    <div>
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '28px' }}>
        <div>
          <h1 style={{ fontSize: '1.375rem', fontWeight: 600, marginBottom: '4px' }}>
            {greeting}, {firstName}
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>
            Here's what's happening with your projects today.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="btn btn-secondary" onClick={() => navigate('/tasks')}>
            <Plus size={15} style={{ marginRight: '6px' }} /> New Task
          </button>
          <button className="btn btn-primary" onClick={() => navigate('/projects')}>
            <Plus size={15} style={{ marginRight: '6px' }} /> New Project
          </button>
        </div>
      </div>

      {/* ── Error ──────────────────────────────────────────────────────────── */}
      {error && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '14px 16px', backgroundColor: 'var(--color-danger-bg)', border: '1px solid #e8c5c2', borderRadius: '10px', marginBottom: '24px' }}>
          <AlertCircle size={18} color="var(--color-danger)" />
          <span style={{ fontSize: '0.875rem', color: 'var(--color-danger)' }}>Couldn't load your dashboard.</span>
          <button onClick={fetchDashboard} style={{ marginLeft: 'auto', fontSize: '0.8125rem', color: 'var(--color-danger)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500 }}>
            Try again
          </button>
        </div>
      )}

      {/* ── 5 Metric Cards ─────────────────────────────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px', marginBottom: '20px' }}>
        {loading
          ? Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="card card-sm">
              <Skeleton h={16} w="60%" style={{ marginBottom: 10 }} />
              <Skeleton h={28} w="40%" />
            </div>
          ))
          : metrics.map(({ label, value, icon: Icon, color, bg }) => (
            <div key={label} className="card card-sm" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', fontWeight: 500 }}>{label}</span>
                <div style={{ width: 28, height: 28, borderRadius: '8px', backgroundColor: bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={14} color={color} />
                </div>
              </div>
              <div style={{ fontSize: '1.625rem', fontWeight: 700, color: 'var(--color-text-primary)', lineHeight: 1 }}>
                {value}
              </div>
            </div>
          ))
        }
      </div>

      {/* ── Progress + Upcoming Tasks ──────────────────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '16px', marginBottom: '20px' }}>
        {/* Project Progress */}
        <div className="card">
          <div className="section-header"><span className="section-title">Project Progress</span></div>
          {loading ? (
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
              <Skeleton h={130} w={130} style={{ borderRadius: '50%' }} />
              <div style={{ flex: 1 }}><Skeleton h={14} style={{ marginBottom: 10 }} /><Skeleton h={14} style={{ marginBottom: 10 }} /><Skeleton h={14} /></div>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              <CircularProgress pct={data?.projectProgress.percentage ?? 0} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
                {[
                  { label: 'Completed', value: data?.projectProgress.completed, dot: 'success' },
                  { label: 'In Progress', value: data?.projectProgress.inProgress, dot: 'warning' },
                  { label: 'Pending', value: data?.projectProgress.pending, dot: 'neutral' },
                ].map(({ label, value, dot }) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span className={`status-dot ${dot}`} />
                      <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>{label}</span>
                    </div>
                    <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>{value}</span>
                  </div>
                ))}
                <div className="divider" style={{ margin: '4px 0' }} />
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>Total Tasks</span>
                  <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>{data?.stats.totalTasks}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Upcoming Tasks */}
        <div className="card">
          <div className="section-header">
            <span className="section-title">Upcoming Tasks</span>
            <span className="section-link" onClick={() => navigate('/tasks')}>View all <ArrowRight size={12} style={{ display: 'inline', verticalAlign: 'middle' }} /></span>
          </div>
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid var(--color-border-subtle)' }}>
                <Skeleton h={13} w="55%" />
                <Skeleton h={20} w={60} />
              </div>
            ))
          ) : data?.upcomingTasks.length === 0 ? (
            <EmptyState icon={CheckCircle2} title="All caught up!" desc="You have no upcoming tasks right now." action="Add a task" onAction={() => navigate('/tasks')} />
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {data?.upcomingTasks.map((task, i) => (
                <div key={task.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '9px 0', borderBottom: i < (data?.upcomingTasks.length - 1) ? '1px solid var(--color-border-subtle)' : 'none' }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '0.875rem', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginBottom: '2px' }}>
                      {task.name}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-tertiary)' }}>{task.project?.name}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0, marginLeft: '12px' }}>
                    <span className={`badge ${priorityBadge(task.priority)}`}>{task.priority}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-tertiary)', minWidth: '48px', textAlign: 'right' }}>
                      {formatDate(task.due_date)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Recent Projects ────────────────────────────────────────────────── */}
      <div style={{ marginBottom: '20px' }}>
        <div className="section-header">
          <span className="section-title">Recent Projects</span>
          <span className="section-link" onClick={() => navigate('/projects')}>View all <ArrowRight size={12} style={{ display: 'inline', verticalAlign: 'middle' }} /></span>
        </div>
        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="card card-sm">
                <Skeleton h={14} w="70%" style={{ marginBottom: 8 }} />
                <Skeleton h={11} w="90%" style={{ marginBottom: 8 }} />
                <Skeleton h={6} w="100%" style={{ marginBottom: 8, borderRadius: '99px' }} />
                <Skeleton h={11} w="40%" />
              </div>
            ))}
          </div>
        ) : data?.recentProjects.length === 0 ? (
          <div className="card">
            <EmptyState icon={Folder} title="No projects yet" desc="Create your first project and start organizing your work." action="New Project" onAction={() => navigate('/projects')} />
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '12px' }}>
            {data?.recentProjects.map(p => (
              <div key={p.id} className="card card-sm card-hover" style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '8px' }} onClick={() => navigate('/projects')}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px' }}>
                  <div style={{ fontSize: '0.875rem', fontWeight: 600, lineHeight: 1.3 }}>{p.name}</div>
                  <span className={`badge ${statusBadge(p.status)}`}>{statusLabel(p.status)}</span>
                </div>
                {p.description && (
                  <p style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', lineHeight: 1.5, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                    {p.description}
                  </p>
                )}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                    <span style={{ fontSize: '0.6875rem', color: 'var(--color-text-tertiary)' }}>{p.taskCount} tasks</span>
                    <span style={{ fontSize: '0.6875rem', color: 'var(--color-text-tertiary)', fontWeight: 500 }}>{p.progress}%</span>
                  </div>
                  <div className="progress-bar-track">
                    <div className="progress-bar-fill" style={{ width: `${p.progress}%` }} />
                  </div>
                </div>
                {p.end_date && (
                  <div style={{ fontSize: '0.6875rem', color: 'var(--color-text-tertiary)', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                    <Clock size={11} /> Due {formatDate(p.end_date)}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Activity + Deadlines ───────────────────────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        {/* Recent Activity */}
        <div className="card">
          <div className="section-header"><span className="section-title">Recent Activity</span></div>
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} style={{ display: 'flex', gap: '10px', padding: '8px 0' }}>
                <Skeleton h={28} w={28} style={{ borderRadius: '50%', flexShrink: 0 }} />
                <div style={{ flex: 1 }}><Skeleton h={13} w="80%" style={{ marginBottom: 6 }} /><Skeleton h={11} w="50%" /></div>
              </div>
            ))
          ) : (
            <div className="empty-state">
              <div className="empty-state-icon"><TrendingUp size={32} strokeWidth={1.25} /></div>
              <div className="empty-state-title">No activity yet</div>
              <div className="empty-state-desc">Your project and task actions will appear here automatically as you work.</div>
              <button className="btn btn-secondary btn-sm" style={{ marginTop: '4px' }} onClick={() => navigate('/projects')}>
                <Plus size={13} style={{ marginRight: '5px' }} /> Create a project
              </button>
            </div>
          )}
        </div>

        {/* Upcoming Deadlines */}
        <div className="card">
          <div className="section-header"><span className="section-title">Upcoming Deadlines</span></div>
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} style={{ display: 'flex', gap: '12px', padding: '8px 0' }}>
                <Skeleton h={42} w={42} style={{ borderRadius: '8px', flexShrink: 0 }} />
                <div style={{ flex: 1 }}><Skeleton h={13} w="70%" style={{ marginBottom: 6 }} /><Skeleton h={11} w="40%" /></div>
              </div>
            ))
          ) : data?.upcomingDeadlines.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon"><CheckCircle2 size={32} strokeWidth={1.25} /></div>
              <div className="empty-state-title">You're clear!</div>
              <div className="empty-state-desc">No upcoming deadlines. Set due dates on tasks to see them here.</div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {data?.upcomingDeadlines.map((task, i) => {
                const due = task.due_date ? new Date(task.due_date) : null;
                return (
                  <div key={task.id} style={{ display: 'flex', gap: '12px', alignItems: 'center', padding: '8px 0', borderBottom: i < (data?.upcomingDeadlines.length - 1) ? '1px solid var(--color-border-subtle)' : 'none' }}>
                    <div style={{ width: 40, height: 40, borderRadius: '8px', backgroundColor: 'var(--color-surface-alt)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '1px solid var(--color-border-subtle)' }}>
                      {due && (
                        <>
                          <span style={{ fontSize: '0.625rem', fontWeight: 600, color: 'var(--color-text-tertiary)', textTransform: 'uppercase', lineHeight: 1 }}>
                            {due.toLocaleDateString('en-US', { month: 'short' })}
                          </span>
                          <span style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-text-primary)', lineHeight: 1.1 }}>
                            {due.getDate()}
                          </span>
                        </>
                      )}
                      {!due && <span style={{ fontSize: '0.625rem', color: 'var(--color-text-tertiary)' }}>—</span>}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '0.875rem', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{task.name}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '3px' }}>
                        <span style={{ fontSize: '0.75rem', color: 'var(--color-text-tertiary)' }}>{task.project?.name}</span>
                        <span className={`badge ${priorityBadge(task.priority)}`}>{task.priority}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
