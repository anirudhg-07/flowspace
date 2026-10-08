import React from 'react';
import { useAuth } from '../hooks/useAuth';

export const Dashboard = () => {
  const { user, logout } = useAuth();
  
  return (
    <div className="container" style={{ padding: 'var(--spacing-8) 0' }}>
      <div className="flex items-center justify-between" style={{ marginBottom: 'var(--spacing-8)' }}>
        <h2>Good morning, {user?.fullName || user?.email}</h2>
        <button className="btn btn-ghost" onClick={logout}>Logout</button>
      </div>
      <div className="card">
        <p>Dashboard coming soon in Phase 9...</p>
      </div>
    </div>
  );
};
