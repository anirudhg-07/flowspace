
import { useAuth } from '../hooks/useAuth';
import { LogOut } from 'lucide-react';

export const Topbar = () => {
  const { user, logout } = useAuth();
  
  return (
    <header style={{ height: '64px', backgroundColor: 'var(--color-surface)', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '0 var(--spacing-5)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
        <span style={{ fontSize: '0.875rem', fontWeight: 'var(--font-weight-medium)' }}>
          {user?.fullName || user?.email}
        </span>
        <button onClick={logout} className="btn btn-ghost" style={{ padding: 'var(--spacing-2)', borderRadius: 'var(--radius-full)' }} title="Logout">
          <LogOut size={18} />
        </button>
      </div>
    </header>
  );
};
