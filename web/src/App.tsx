import React from 'react';
import './App.css';

function App() {
  return (
    <div className="container" style={{ padding: 'var(--spacing-8) 0' }}>
      <header style={{ marginBottom: 'var(--spacing-8)' }}>
        <h1 style={{ marginBottom: 'var(--spacing-2)' }}>Flowspace Design System</h1>
        <p style={{ color: 'var(--color-text-secondary)' }}>A calm and minimal workspace to turn plans into progress.</p>
      </header>

      <section style={{ marginBottom: 'var(--spacing-8)' }}>
        <h2 style={{ marginBottom: 'var(--spacing-4)', fontSize: '1.25rem' }}>Typography & Colors</h2>
        <div className="card">
          <h1>Heading 1 (2.5rem)</h1>
          <h2>Heading 2 (2rem)</h2>
          <h3>Heading 3 (1.5rem)</h3>
          <p style={{ marginTop: 'var(--spacing-2)' }}>
            This is regular body text. It uses the primary text color on the surface background.
          </p>
          <p style={{ color: 'var(--color-text-secondary)', marginTop: 'var(--spacing-2)' }}>
            This is secondary body text for muted descriptions and metadata.
          </p>
        </div>
      </section>

      <section style={{ marginBottom: 'var(--spacing-8)' }}>
        <h2 style={{ marginBottom: 'var(--spacing-4)', fontSize: '1.25rem' }}>Buttons</h2>
        <div className="card flex gap-4 items-center">
          <button className="btn btn-primary">Primary Action</button>
          <button className="btn btn-secondary">Secondary Action</button>
          <button className="btn btn-ghost">Ghost Action</button>
        </div>
      </section>

      <section style={{ marginBottom: 'var(--spacing-8)' }}>
        <h2 style={{ marginBottom: 'var(--spacing-4)', fontSize: '1.25rem' }}>Inputs & Forms</h2>
        <div className="card" style={{ maxWidth: '400px' }}>
          <div className="input-group">
            <label className="input-label">Email Address</label>
            <input type="email" className="input-field" placeholder="alex@flowspace.com" />
          </div>
          <div className="input-group">
            <label className="input-label">Project Status</label>
            <select className="input-field">
              <option>Not Started</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
          </div>
        </div>
      </section>

      <section style={{ marginBottom: 'var(--spacing-8)' }}>
        <h2 style={{ marginBottom: 'var(--spacing-4)', fontSize: '1.25rem' }}>Badges & Status</h2>
        <div className="card flex gap-4 items-center">
          <span className="badge badge-success"><span className="status-dot success"></span>Completed</span>
          <span className="badge badge-warning"><span className="status-dot warning"></span>In Progress</span>
          <span className="badge badge-danger"><span className="status-dot danger"></span>Overdue</span>
          <span className="badge badge-neutral"><span className="status-dot neutral"></span>Not Started</span>
        </div>
      </section>
    </div>
  );
}

export default App;
