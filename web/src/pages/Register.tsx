import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const Register = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register({ email, password, fullName });
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.error?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container flex flex-col items-center justify-center" style={{ minHeight: '100vh' }}>
      <h1 style={{ marginBottom: 'var(--spacing-2)', color: 'var(--color-accent-primary)' }}>Flowspace</h1>
      <h2 style={{ marginBottom: 'var(--spacing-2)' }}>Create an account</h2>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-8)' }}>Start organizing your projects today.</p>

      <div className="card" style={{ width: '100%', maxWidth: '400px' }}>
        {error && <div className="badge badge-danger" style={{ marginBottom: 'var(--spacing-4)', width: '100%', padding: '8px' }}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="input-label">Full Name</label>
            <input type="text" className="input-field" value={fullName} onChange={e => setFullName(e.target.value)} />
          </div>
          <div className="input-group">
            <label className="input-label">Email</label>
            <input type="email" required className="input-field" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="input-group">
            <label className="input-label">Password</label>
            <input type="password" required className="input-field" value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: 'var(--spacing-4)' }} disabled={loading}>
            {loading ? 'Creating account...' : 'Sign up'}
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: 'var(--spacing-5)', fontSize: '0.875rem' }}>
          Already have an account? <Link to="/login" style={{ fontWeight: '500' }}>Sign in</Link>
        </p>
      </div>
    </div>
  );
};
