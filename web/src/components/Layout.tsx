import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

export const Layout = () => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--color-background)' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Topbar />
        <main style={{ flex: 1, padding: 'var(--spacing-6)', overflowY: 'auto' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};
