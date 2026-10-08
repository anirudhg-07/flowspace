import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, FolderKanban, CheckSquare, Settings } from 'lucide-react';

export const Sidebar = () => {
  return (
    <aside style={{ width: '250px', backgroundColor: 'var(--color-surface)', borderRight: '1px solid var(--color-border)', height: '100vh', display: 'flex', flexDirection: 'column', padding: 'var(--spacing-5)' }}>
      <div style={{ marginBottom: 'var(--spacing-8)' }}>
        <h1 style={{ fontSize: '1.25rem', color: 'var(--color-accent-primary)' }}>Flowspace</h1>
      </div>
      
      <nav style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)', flex: 1 }}>
        <NavLink to="/" end className={({ isActive }) => `btn ${isActive ? 'btn-secondary' : 'btn-ghost'}`} style={{ justifyContent: 'flex-start', padding: 'var(--spacing-3)' }}>
          <Home size={18} style={{ marginRight: 'var(--spacing-3)' }} /> Dashboard
        </NavLink>
        <NavLink to="/projects" className={({ isActive }) => `btn ${isActive ? 'btn-secondary' : 'btn-ghost'}`} style={{ justifyContent: 'flex-start', padding: 'var(--spacing-3)' }}>
          <FolderKanban size={18} style={{ marginRight: 'var(--spacing-3)' }} /> Projects
        </NavLink>
        <NavLink to="/tasks" className={({ isActive }) => `btn ${isActive ? 'btn-secondary' : 'btn-ghost'}`} style={{ justifyContent: 'flex-start', padding: 'var(--spacing-3)' }}>
          <CheckSquare size={18} style={{ marginRight: 'var(--spacing-3)' }} /> Tasks
        </NavLink>
      </nav>

      <div>
        <NavLink to="/settings" className={({ isActive }) => `btn ${isActive ? 'btn-secondary' : 'btn-ghost'}`} style={{ justifyContent: 'flex-start', width: '100%', padding: 'var(--spacing-3)' }}>
          <Settings size={18} style={{ marginRight: 'var(--spacing-3)' }} /> Settings
        </NavLink>
      </div>
    </aside>
  );
};
