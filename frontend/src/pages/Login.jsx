import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ onLogin }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    if (isSignUp && !name) {
      setError('Please enter your name');
      return;
    }

    setLoading(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1200));

    onLogin({ name: name || email.split('@')[0], email });
    setLoading(false);
    navigate('/');
  };

  return (
    <div className="login-page" id="login-page">
      {/* Animated background blobs */}
      <div className="login-bg">
        <div className="login-blob blob-1"></div>
        <div className="login-blob blob-2"></div>
        <div className="login-blob blob-3"></div>
      </div>

      <div className="login-container">
        {/* Left: Branding */}
        <div className="login-hero" id="login-hero">
          <div className="login-hero-content">
            <div className="login-logo">👟</div>
            <h1>
              Shoes<span className="gradient-text">Cart</span>
            </h1>
            <p>Step into greatness. Browse 200+ premium styles from the world's top brands.</p>
            <div className="login-features">
              <div className="login-feature">
                <span className="login-feature-icon">🚚</span>
                <span>Free shipping on ₹8,000+</span>
              </div>
              <div className="login-feature">
                <span className="login-feature-icon">🔄</span>
                <span>30-day free returns</span>
              </div>
              <div className="login-feature">
                <span className="login-feature-icon">🏆</span>
                <span>100% authentic brands</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Form */}
        <div className="login-form-wrapper" id="login-form-wrapper">
          <div className="login-form-card">
            <div className="login-form-header">
              <h2>{isSignUp ? 'Create Account' : 'Welcome Back'}</h2>
              <p>
                {isSignUp
                  ? 'Sign up to start your sneaker journey'
                  : 'Log in to continue shopping'}
              </p>
            </div>

            {error && <div className="login-error">{error}</div>}

            <form onSubmit={handleSubmit} className="login-form" id="login-form">
              {isSignUp && (
                <div className="login-field">
                  <label htmlFor="login-name">Full Name</label>
                  <div className="login-input-wrap">
                    <span className="login-input-icon">👤</span>
                    <input
                      type="text"
                      id="login-name"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
              )}

              <div className="login-field">
                <label htmlFor="login-email">Email Address</label>
                <div className="login-input-wrap">
                  <span className="login-input-icon">✉️</span>
                  <input
                    type="email"
                    id="login-email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="login-field">
                <label htmlFor="login-password">Password</label>
                <div className="login-input-wrap">
                  <span className="login-input-icon">🔒</span>
                  <input
                    type="password"
                    id="login-password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              {!isSignUp && (
                <div className="login-extras">
                  <label className="login-remember">
                    <input type="checkbox" id="remember-me" /> Remember me
                  </label>
                  <a href="#" className="login-forgot" id="forgot-password">
                    Forgot password?
                  </a>
                </div>
              )}

              <button
                type="submit"
                className={`btn btn-primary btn-lg login-submit drift-glow ${loading ? 'login-loading' : ''}`}
                disabled={loading}
                id="login-submit"
              >
                {loading ? (
                  <span className="login-spinner"></span>
                ) : isSignUp ? (
                  'Create Account'
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            <div className="login-divider">
              <span>or continue with</span>
            </div>

            <div className="login-social">
              <button className="login-social-btn" id="login-google" type="button">
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Google
              </button>
              <button className="login-social-btn" id="login-apple" type="button">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                Apple
              </button>
            </div>

            <div className="login-toggle">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button
                type="button"
                className="login-toggle-btn"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setError('');
                }}
                id="toggle-auth"
              >
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
