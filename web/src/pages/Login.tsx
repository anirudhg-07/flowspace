import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Eye, EyeOff } from 'lucide-react';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login({ email, password });
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.error?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container flex flex-col items-center justify-center" style={{ minHeight: '100vh' }}>
      <h1 style={{ marginBottom: 'var(--spacing-2)', color: 'var(--color-accent-primary)' }}>Flowspace</h1>
      <h2 style={{ marginBottom: 'var(--spacing-2)' }}>Welcome back</h2>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-8)' }}>Continue managing your work.</p>

      <div className="card" style={{ width: '100%', maxWidth: '400px' }}>
        {error && <div className="badge badge-danger" style={{ marginBottom: 'var(--spacing-4)', width: '100%', padding: '8px' }}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="input-label">Email</label>
            <input type="email" required className="input-field" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="input-group" style={{ position: 'relative' }}>
            <label className="input-label">Password</label>
            <div style={{ display: 'flex', position: 'relative' }}>
              <input 
                type={showPassword ? 'text' : 'password'} required 
                className="input-field" style={{ width: '100%', paddingRight: '40px' }}
                value={password} onChange={e => setPassword(e.target.value)} 
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-secondary)' }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: 'var(--spacing-4)' }} disabled={loading}>
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: 'var(--spacing-5)', fontSize: '0.875rem' }}>
          Don't have an account? <Link to="/register" style={{ fontWeight: '500' }}>Sign up</Link>
        </p>
      </div>
    </div>
  );
};
