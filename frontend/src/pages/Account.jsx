import { Link, useNavigate } from 'react-router-dom';

function Account({ user, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <div className="support-page" id="account-page">
      <div className="container">
        <h1 className="section-title drift-left">
          My <span className="gradient-text">Account</span>
        </h1>

        <div className="account-grid">
          {/* Profile Card */}
          <div className="account-card profile-card drift-up">
            <div className="account-avatar">
              {user?.name ? user.name.charAt(0).toUpperCase() : '?'}
            </div>
            <h2>{user?.name || 'Guest'}</h2>
            <p className="account-email">{user?.email || 'Not logged in'}</p>
            <span className="account-badge">Premium Member</span>
          </div>

          {/* Quick Actions */}
          <div className="account-card drift-up" style={{ animationDelay: '0.1s' }}>
            <h3>📦 My Orders</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: 'var(--spacing-lg)' }}>
              Track your orders, view past purchases, and manage returns.
            </p>
            <div className="account-empty-state">
              <span style={{ fontSize: '2rem' }}>🛍️</span>
              <p>No orders yet</p>
              <Link to="/shop" className="btn btn-primary btn-sm">Start Shopping</Link>
            </div>
          </div>

          <div className="account-card drift-up" style={{ animationDelay: '0.15s' }}>
            <h3>❤️ Wishlist</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: 'var(--spacing-lg)' }}>
              Your saved items are waiting for you.
            </p>
            <div className="account-empty-state">
              <span style={{ fontSize: '2rem' }}>💫</span>
              <p>No items saved yet</p>
              <Link to="/shop" className="btn btn-secondary btn-sm">Browse Shoes</Link>
            </div>
          </div>

          <div className="account-card drift-up" style={{ animationDelay: '0.2s' }}>
            <h3>📍 Addresses</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: 'var(--spacing-lg)' }}>
              Manage your shipping and billing addresses.
            </p>
            <div className="account-empty-state">
              <span style={{ fontSize: '2rem' }}>🏠</span>
              <p>No addresses saved</p>
              <button className="btn btn-secondary btn-sm">Add Address</button>
            </div>
          </div>

          <div className="account-card drift-up" style={{ animationDelay: '0.25s' }}>
            <h3>⚙️ Settings</h3>
            <div className="account-settings-list">
              <div className="account-setting-item">
                <div>
                  <strong>Email Notifications</strong>
                  <p>Receive order updates & promotions</p>
                </div>
                <label className="toggle-switch">
                  <input type="checkbox" defaultChecked />
                  <span className="toggle-slider"></span>
                </label>
              </div>
              <div className="account-setting-item">
                <div>
                  <strong>Dark Mode</strong>
                  <p>Currently active</p>
                </div>
                <label className="toggle-switch">
                  <input type="checkbox" defaultChecked />
                  <span className="toggle-slider"></span>
                </label>
              </div>
              <div className="account-setting-item">
                <div>
                  <strong>Currency</strong>
                  <p>Indian Rupee (₹)</p>
                </div>
                <span style={{ color: 'var(--text-muted)' }}>🇮🇳</span>
              </div>
            </div>
          </div>

          <div className="account-card drift-up" style={{ animationDelay: '0.3s' }}>
            <h3>🔐 Account Actions</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)', marginTop: 'var(--spacing-lg)' }}>
              <Link to="/support/contact" className="btn btn-secondary">📞 Contact Support</Link>
              <Link to="/support/faq" className="btn btn-secondary">❓ View FAQs</Link>
              <button className="btn btn-primary" onClick={handleLogout} id="logout-btn" style={{ background: 'var(--danger)' }}>
                🚪 Log Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
