import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';

export const Layout = () => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--color-background)' }}>
      <Sidebar />
      <main style={{ flex: 1, overflow: 'auto', minWidth: 0 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 36px' }}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};
