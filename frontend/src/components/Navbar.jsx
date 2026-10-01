import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function Navbar({ cartCount, searchQuery, setSearchQuery, user, onLogout, wishlistCount = 0 }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setAccountOpen(false);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setAccountOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${searchQuery}`);
    }
  };

  const handleLogout = () => {
    setAccountOpen(false);
    onLogout();
    navigate('/login');
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} id="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-logo" id="navbar-logo">
          <span>👟</span>
          <span className="gradient-text">ShoesCart</span>
        </Link>

        <div className={`navbar-links ${mobileOpen ? 'mobile-open' : ''}`}>
          <Link to="/" className={location.pathname === '/' ? 'active' : ''} id="nav-home">Home</Link>
          <Link to="/shop" className={location.pathname === '/shop' ? 'active' : ''} id="nav-shop">Shop</Link>
          <Link to="/shop?category=Running" id="nav-running">Running</Link>
          <Link to="/shop?category=Lifestyle" id="nav-lifestyle">Lifestyle</Link>
        </div>

        <div className="navbar-actions">
          <form className="navbar-search" onSubmit={handleSearch} id="navbar-search">
            <span>🔍</span>
            <input
              type="text"
              placeholder="Search shoes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              id="search-input"
            />
          </form>

          <Link to="/wishlist" className="wishlist-nav-btn" id="wishlist-nav-btn" title="Wishlist">
            <span>♡</span>
            {wishlistCount > 0 && <span className="wishlist-nav-badge">{wishlistCount}</span>}
          </Link>

          <Link to="/cart" className="cart-btn" id="cart-btn">
            <span>🛒</span>
            <span>Cart</span>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>

          {/* Account Dropdown */}
          <div className="account-dropdown" ref={dropdownRef}>
            <button
              className="account-btn"
              onClick={() => setAccountOpen(!accountOpen)}
              id="account-btn"
            >
              <span className="account-btn-avatar">
                {user?.name ? user.name.charAt(0).toUpperCase() : '👤'}
              </span>
            </button>
            {accountOpen && (
              <div className="account-dropdown-menu" id="account-menu">
                <div className="account-dropdown-header">
                  <strong>{user?.name || 'Guest'}</strong>
                  <small>{user?.email || ''}</small>
                </div>
                <div className="account-dropdown-divider"></div>
                <Link to="/account" className="account-dropdown-item" id="menu-account">
                  👤 My Account
                </Link>
                <Link to="/wishlist" className="account-dropdown-item" id="menu-wishlist">
                  ♡ Wishlist
                </Link>
                <Link to="/cart" className="account-dropdown-item" id="menu-orders">
                  📦 My Orders
                </Link>
                <Link to="/support/contact" className="account-dropdown-item" id="menu-support">
                  💬 Support
                </Link>
                <div className="account-dropdown-divider"></div>
                <button className="account-dropdown-item logout" onClick={handleLogout} id="menu-logout">
                  🚪 Log Out
                </button>
              </div>
            )}
          </div>

          <button className="mobile-menu-btn" onClick={() => setMobileOpen(!mobileOpen)} id="mobile-menu-btn">
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
