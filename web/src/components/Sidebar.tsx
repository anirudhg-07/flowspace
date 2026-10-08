import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, FolderKanban, CheckSquare, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { to: '/projects', icon: FolderKanban, label: 'Projects', end: false },
  { to: '/tasks', icon: CheckSquare, label: 'Tasks', end: false },
];

export const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/login'); };

  const initials = user?.fullName
    ? user.fullName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : user?.email?.slice(0, 2).toUpperCase() ?? '??';

  return (
    <aside style={{
      width: '220px',
      flexShrink: 0,
      backgroundColor: 'var(--color-surface)',
      borderRight: '1px solid var(--color-border)',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      position: 'sticky',
      top: 0,
    }}>
      {/* Logo */}
      <div style={{ padding: '20px 20px 16px', borderBottom: '1px solid var(--color-border-subtle)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '28px', height: '28px',
            backgroundColor: 'var(--color-accent-primary)',
            borderRadius: '8px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <LayoutDashboard size={15} color="#fff" />
          </div>
          <span style={{ fontWeight: 'var(--font-weight-semibold)', fontSize: '0.9375rem', letterSpacing: '-0.01em' }}>
            Flowspace
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, padding: '12px 10px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
        <p style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--color-text-tertiary)', letterSpacing: '0.08em', textTransform: 'uppercase', padding: '8px 10px 4px' }}>
          Workspace
        </p>
        {navItems.map(({ to, icon: Icon, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '9px',
              padding: '8px 10px',
              borderRadius: '8px',
              fontSize: '0.875rem',
              fontWeight: isActive ? 500 : 400,
              color: isActive ? 'var(--color-accent-text)' : 'var(--color-text-secondary)',
              backgroundColor: isActive ? 'var(--color-accent-light)' : 'transparent',
              textDecoration: 'none',
              transition: 'all 150ms ease',
            })}
          >
            {({ isActive }) => (
              <>
                <Icon size={16} strokeWidth={isActive ? 2 : 1.75} />
                {label}
              </>
            )}
          </NavLink>
        ))}

        <div style={{ marginTop: '16px', borderTop: '1px solid var(--color-border-subtle)', paddingTop: '12px' }}>
          <p style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--color-text-tertiary)', letterSpacing: '0.08em', textTransform: 'uppercase', padding: '0 10px 4px' }}>
            Account
          </p>
          <NavLink
            to="/settings"
            style={({ isActive }) => ({
              display: 'flex', alignItems: 'center', gap: '9px',
              padding: '8px 10px', borderRadius: '8px',
              fontSize: '0.875rem',
              color: isActive ? 'var(--color-accent-text)' : 'var(--color-text-secondary)',
              backgroundColor: isActive ? 'var(--color-accent-light)' : 'transparent',
              textDecoration: 'none', transition: 'all 150ms ease',
            })}
          >
            <Settings size={16} strokeWidth={1.75} />
            Settings
          </NavLink>
        </div>
      </nav>

      {/* User Profile at bottom */}
      <div style={{ padding: '12px', borderTop: '1px solid var(--color-border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 10px', borderRadius: '8px' }}>
          <div style={{
            width: '30px', height: '30px', borderRadius: '50%',
            backgroundColor: 'var(--color-accent-light)',
            color: 'var(--color-accent-text)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.75rem', fontWeight: 600, flexShrink: 0,
          }}>
            {initials}
          </div>
          <div style={{ flex: 1, overflow: 'hidden' }}>
            <div style={{ fontSize: '0.8125rem', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {user?.fullName || user?.email}
            </div>
            <div style={{ fontSize: '0.6875rem', color: 'var(--color-text-tertiary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {user?.email}
            </div>
          </div>
          <button onClick={handleLogout} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-tertiary)', padding: '4px', borderRadius: '6px', display: 'flex', alignItems: 'center' }} title="Sign out">
            <LogOut size={15} />
          </button>
        </div>
      </div>
    </aside>
  );
};
