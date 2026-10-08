import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Eye, EyeOff } from 'lucide-react';

const FlowspaceLogo = ({ size = 40 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Darker right leaf */}
    <path d="M20 34C20 34 35 24 35 12C35 6.5 30.5 2 25 2C19.5 2 17 8 17 12C17 19 20 34 20 34Z" fill="#6B7A60"/>
    {/* Lighter left leaf */}
    <path d="M20 34C20 34 7 27 7 18C7 13.5 10.5 10 15 10C18.5 10 20 14 20 18V34Z" fill="#B4C0A6"/>
  </svg>
);

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

    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!password) {
      setError('Password is required.');
      return;
    }

    setLoading(true);
    try {
      await login({ email, password });
      navigate('/');
    } catch (err: any) {
      setError('Unable to sign in. Please check your email and password and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        body {
          margin: 0;
          background-color: #FAFAF8;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        }
        
        .login-layout {
          display: flex;
          min-height: 100vh;
          width: 100%;
        }

        /* Left Panel */
        .login-left {
          display: none;
          flex-direction: column;
          justify-content: space-between;
          width: 45%;
          background-color: #E8EDE3;
          padding: 64px;
          position: relative;
          overflow: hidden;
        }

        @media (min-width: 900px) {
          .login-left {
            display: flex;
          }
        }

        .left-content {
          position: relative;
          z-index: 10;
        }

        .brand-header {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .brand-name {
          font-size: 24px;
          font-weight: 500;
          color: #2F3330;
          letter-spacing: -0.02em;
        }

        .hero-text {
          margin-top: 12vh;
        }

        .hero-title {
          font-size: 48px;
          line-height: 1.1;
          font-weight: 400;
          color: #2F3330;
          letter-spacing: -0.03em;
          margin: 0 0 24px 0;
        }

        .hero-subtitle {
          font-size: 20px;
          line-height: 1.4;
          color: #5D635F;
          font-weight: 400;
          max-width: 380px;
          margin: 0;
        }

        /* Subtle Abstract Visual */
        .abstract-visual {
          position: absolute;
          top: 20%;
          right: -10%;
          width: 600px;
          height: 600px;
          opacity: 0.4;
          pointer-events: none;
          z-index: 1;
        }

        .abstract-visual path {
          fill: none;
          stroke: #B4C0A6;
          stroke-width: 1.5;
        }

        /* Product Micro-preview */
        .micro-preview {
          position: relative;
          z-index: 10;
          background: #FAFAF8;
          padding: 24px;
          border-radius: 16px;
          width: 280px;
          box-shadow: 0 12px 32px rgba(47, 51, 48, 0.06);
          border: 1px solid rgba(221, 217, 207, 0.5);
          margin-top: auto;
        }

        .micro-preview-title {
          font-size: 13px;
          font-weight: 600;
          color: #2F3330;
          margin: 0 0 16px 0;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .micro-preview-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .micro-preview-label {
          font-size: 14px;
          color: #2F3330;
          font-weight: 500;
        }

        .micro-preview-value {
          font-size: 14px;
          color: #7A8B6F;
          font-weight: 500;
        }

        .micro-preview-track {
          height: 6px;
          background: #E8EDE3;
          border-radius: 3px;
          overflow: hidden;
          margin-bottom: 12px;
        }

        .micro-preview-fill {
          height: 100%;
          width: 72%;
          background: #7A8B6F;
          border-radius: 3px;
        }

        .micro-preview-meta {
          font-size: 13px;
          color: #767A75;
        }

        /* Right Panel */
        .login-right {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background-color: #FAFAF8;
          padding: 48px 24px;
        }

        .login-form-container {
          width: 100%;
          max-width: 400px;
        }

        .mobile-brand {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 48px;
        }

        @media (min-width: 900px) {
          .mobile-brand {
            display: none;
          }
        }

        .form-header {
          margin-bottom: 40px;
        }

        .form-title {
          font-size: 32px;
          font-weight: 500;
          color: #2F3330;
          margin: 0 0 12px 0;
          letter-spacing: -0.02em;
        }

        .form-subtitle {
          font-size: 16px;
          color: #767A75;
          margin: 0;
        }

        .error-message {
          background-color: transparent;
          color: #BA6A5D;
          font-size: 14px;
          padding: 12px 0;
          margin-bottom: 16px;
          font-weight: 500;
        }

        .input-group {
          margin-bottom: 24px;
        }

        .input-label {
          display: block;
          font-size: 14px;
          font-weight: 500;
          color: #2F3330;
          margin-bottom: 8px;
        }

        .input-field {
          width: 100%;
          padding: 14px 16px;
          font-size: 16px;
          color: #2F3330;
          background-color: #FAFAF8;
          border: 1px solid #DDD9CF;
          border-radius: 10px;
          transition: border-color 0.2s, box-shadow 0.2s;
          box-sizing: border-box;
        }

        .input-field:focus {
          outline: none;
          border-color: #7A8B6F;
          box-shadow: 0 0 0 3px rgba(122, 139, 111, 0.15);
        }

        /* Prevent browser autofill blue background */
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        input:-webkit-autofill:active {
          -webkit-box-shadow: 0 0 0 30px #FAFAF8 inset !important;
          -webkit-text-fill-color: #2F3330 !important;
          transition: background-color 5000s ease-in-out 0s;
        }

        .password-wrapper {
          position: relative;
          display: flex;
        }

        .password-toggle {
          position: absolute;
          right: 16px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          padding: 4px;
          cursor: pointer;
          color: #767A75;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .password-toggle:focus {
          outline: none;
          color: #7A8B6F;
        }

        .btn-primary {
          width: 100%;
          padding: 16px;
          background-color: #7A8B6F;
          color: #FFFFFF;
          font-size: 16px;
          font-weight: 500;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          transition: background-color 0.2s;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 32px;
        }

        .btn-primary:hover:not(:disabled) {
          background-color: #66755D;
        }

        .btn-primary:focus {
          outline: none;
          box-shadow: 0 0 0 3px rgba(122, 139, 111, 0.3);
        }

        .btn-primary:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .register-link {
          text-align: left;
          margin-top: 24px;
          font-size: 15px;
          color: #767A75;
        }

        .register-link a {
          color: #7A8B6F;
          text-decoration: none;
          font-weight: 500;
        }

        .register-link a:hover {
          text-decoration: underline;
        }

        .footer-brand {
          margin-top: 64px;
          font-size: 12px;
          color: #A3A6A3;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }
      `}</style>

      <div className="login-layout">
        
        {/* LEFT PANEL */}
        <div className="login-left">
          <div className="left-content">
            <div className="brand-header">
              <FlowspaceLogo size={32} />
              <span className="brand-name">Flowspace</span>
            </div>

            <div className="hero-text">
              <h1 className="hero-title">Your work,<br/>in flow.</h1>
              <p className="hero-subtitle">A calm workspace for projects,<br/>tasks and everything moving forward.</p>
            </div>
          </div>

          <svg className="abstract-visual" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M10,90 Q30,10 60,50 T90,10" />
            <path d="M-10,60 Q40,-20 80,40 T110,80" />
            <path d="M20,110 Q50,30 90,70" />
          </svg>

          <div className="micro-preview">
            <h3 className="micro-preview-title">Project Progress</h3>
            <div className="micro-preview-row">
              <span className="micro-preview-label">Mobile App</span>
              <span className="micro-preview-value">72%</span>
            </div>
            <div className="micro-preview-track">
              <div className="micro-preview-fill"></div>
            </div>
            <div className="micro-preview-meta">12 tasks · 8 completed</div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="login-right">
          <div className="login-form-container">
            
            <div className="mobile-brand">
              <FlowspaceLogo size={40} />
            </div>

            <div className="form-header">
              <h2 className="form-title">Welcome back</h2>
              <p className="form-subtitle">Continue managing your projects and tasks.</p>
            </div>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit} noValidate>
              <div className="input-group">
                <label className="input-label" htmlFor="email">Email</label>
                <input 
                  id="email"
                  type="email" 
                  className="input-field" 
                  value={email} 
                  onChange={e => setEmail(e.target.value)}
                  placeholder="anirudh@example.com"
                  autoComplete="email"
                />
              </div>

              <div className="input-group">
                <label className="input-label" htmlFor="password">Password</label>
                <div className="password-wrapper">
                  <input 
                    id="password"
                    type={showPassword ? 'text' : 'password'} 
                    className="input-field" 
                    style={{ paddingRight: '48px' }}
                    value={password} 
                    onChange={e => setPassword(e.target.value)} 
                    autoComplete="current-password"
                  />
                  <button 
                    type="button" 
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </form>

            <div className="register-link">
              Don't have an account? <Link to="/register">Create an account</Link>
            </div>

            <div className="footer-brand">
              FLOWSPACE <br/> Projects · Tasks · Progress
            </div>
          </div>
        </div>

      </div>
    </>
  );
};
