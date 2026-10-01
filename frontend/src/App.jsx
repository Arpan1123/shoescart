import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import QuickView from './components/QuickView';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Account from './pages/Account';
import Wishlist from './pages/Wishlist';
import Contact from './pages/support/Contact';
import FAQ from './pages/support/FAQ';
import Shipping from './pages/support/Shipping';
import Returns from './pages/support/Returns';
import SizeGuide from './pages/support/SizeGuide';

const API_URL = '/api';

function App() {
  const [cart, setCart] = useState({ items: [], total: 0, count: 0 });
  const [toast, setToast] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [quickViewShoe, setQuickViewShoe] = useState(null);
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('shoescart_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Wishlist state
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('shoescart_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem('shoescart_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (shoe) => {
    setWishlist(prev => {
      const exists = prev.some(w => w.id === shoe.id);
      if (exists) {
        showToast(`${shoe.name} removed from wishlist`);
        return prev.filter(w => w.id !== shoe.id);
      } else {
        showToast(`${shoe.name} added to wishlist ♡`);
        return [...prev, shoe];
      }
    });
  };

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('shoescart_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('shoescart_user');
  };

  const fetchCart = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/cart`);
      const data = await res.json();
      setCart(data);
    } catch (err) {
      console.error('Failed to fetch cart:', err);
    }
  }, []);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addToCart = async (item) => {
    try {
      const res = await fetch(`${API_URL}/cart/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      });
      const data = await res.json();
      setCart(data);
      showToast(`${item.name} added to cart!`);
    } catch (err) {
      console.error('Failed to add to cart:', err);
    }
  };

  const updateCartItem = async (id, size, color, quantity) => {
    try {
      const res = await fetch(`${API_URL}/cart/update/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ size, color, quantity }),
      });
      const data = await res.json();
      setCart(data);
    } catch (err) {
      console.error('Failed to update cart:', err);
    }
  };

  const removeFromCart = async (id, size, color) => {
    try {
      const res = await fetch(`${API_URL}/cart/remove/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ size, color }),
      });
      const data = await res.json();
      setCart(data);
      showToast('Item removed from cart');
    } catch (err) {
      console.error('Failed to remove from cart:', err);
    }
  };

  const clearCart = async () => {
    try {
      const res = await fetch(`${API_URL}/cart/clear`, { method: 'DELETE' });
      const data = await res.json();
      setCart(data);
    } catch (err) {
      console.error('Failed to clear cart:', err);
    }
  };

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const Protected = ({ children }) => {
    if (!user) return <Navigate to="/login" replace />;
    return children;
  };

  return (
    <Router>
      <div className="app">
        {user && (
          <Navbar
            cartCount={cart.count}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            user={user}
            onLogout={handleLogout}
            wishlistCount={wishlist.length}
          />
        )}
        <Routes>
          <Route path="/login" element={
            user ? <Navigate to="/" replace /> : <Login onLogin={handleLogin} />
          } />
          <Route path="/" element={
            <Protected>
              <Home
                addToCart={addToCart}
                wishlist={wishlist}
                toggleWishlist={toggleWishlist}
                onQuickView={setQuickViewShoe}
              />
            </Protected>
          } />
          <Route path="/shop" element={
            <Protected>
              <Shop
                addToCart={addToCart}
                searchQuery={searchQuery}
                wishlist={wishlist}
                toggleWishlist={toggleWishlist}
                onQuickView={setQuickViewShoe}
              />
            </Protected>
          } />
          <Route path="/product/:id" element={
            <Protected>
              <ProductDetail
                addToCart={addToCart}
                wishlist={wishlist}
                toggleWishlist={toggleWishlist}
              />
            </Protected>
          } />
          <Route path="/cart" element={
            <Protected>
              <Cart cart={cart} updateCartItem={updateCartItem} removeFromCart={removeFromCart} clearCart={clearCart} />
            </Protected>
          } />
          <Route path="/wishlist" element={
            <Protected>
              <Wishlist
                wishlist={wishlist}
                toggleWishlist={toggleWishlist}
                addToCart={addToCart}
              />
            </Protected>
          } />
          <Route path="/account" element={<Protected><Account user={user} onLogout={handleLogout} /></Protected>} />
          <Route path="/support/contact" element={<Protected><Contact /></Protected>} />
          <Route path="/support/faq" element={<Protected><FAQ /></Protected>} />
          <Route path="/support/shipping" element={<Protected><Shipping /></Protected>} />
          <Route path="/support/returns" element={<Protected><Returns /></Protected>} />
          <Route path="/support/size-guide" element={<Protected><SizeGuide /></Protected>} />
        </Routes>
        {user && <Footer />}
        {user && <BackToTop />}

        {/* Quick View Modal */}
        {quickViewShoe && (
          <QuickView
            shoe={quickViewShoe}
            onClose={() => setQuickViewShoe(null)}
            addToCart={addToCart}
            wishlist={wishlist}
            toggleWishlist={toggleWishlist}
          />
        )}

        {/* Toast */}
        {toast && (
          <div className="toast toast-success">
            <span>✓</span>
            <span>{toast}</span>
            <div className="toast-progress"></div>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
