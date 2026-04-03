import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const API_URL = '/api';

function Home({ addToCart }) {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/shoes/featured`)
      .then(res => res.json())
      .then(data => {
        setFeatured(data.shoes);
        setLoading(false);
        requestAnimationFrame(() => setLoaded(true));
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const brands = ['Nike', 'Adidas', 'Puma', 'New Balance', 'Hoka', 'Vans', 'Converse', 'Reebok'];

  return (
    <main>
      {/* Hero */}
      <section className="hero" id="hero">
        <div className="hero-bg"></div>
        <div className="hero-content">
          <div className="hero-text">
            <div className="hero-badge drift-hidden drift-left">🔥 New Collection 2026</div>
            <h1 className="hero-title drift-hidden drift-left">
              Step Into <br />
              <span className="gradient-text">Greatness</span>
            </h1>
            <p className="hero-desc drift-hidden drift-left">
              Discover the world's most premium sneakers and footwear. 
              From running tracks to city streets, find your perfect pair 
              crafted for performance and style.
            </p>
            <div className="hero-cta drift-hidden drift-up">
              <Link to="/shop" className="btn btn-primary btn-lg drift-glow" id="hero-shop-btn">
                Shop Now →
              </Link>
              <Link to="/shop?category=Running" className="btn btn-secondary btn-lg" id="hero-explore-btn">
                Explore Running
              </Link>
            </div>
            <div className="hero-stats drift-hidden drift-up">
              <div className="hero-stat">
                <h3 className="gradient-text">200+</h3>
                <p>Premium Styles</p>
              </div>
              <div className="hero-stat">
                <h3 className="gradient-text">50K+</h3>
                <p>Happy Customers</p>
              </div>
              <div className="hero-stat">
                <h3 className="gradient-text">12</h3>
                <p>Top Brands</p>
              </div>
            </div>
          </div>
          <div className="hero-image">
            <img
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800"
              alt="Featured Shoe"
              className="hero-shoe-img hero-shoe-drift"
            />
            <div className="hero-floating-card top">
              <div className="floating-card-label">Top Rated</div>
              <div className="floating-card-value">★ 4.9 Rating</div>
            </div>
            <div className="hero-floating-card bottom">
              <div className="floating-card-label">Free Shipping</div>
              <div className="floating-card-value">On orders ₹8,000+</div>
            </div>
          </div>
        </div>
      </section>

      {/* Brands */}
      <section className="brands-section" id="brands">
        <div className="container">
          <div className="brands-grid">
            {brands.map((brand, i) => (
              <Link
                to={`/shop?brand=${brand}`}
                className="brand-item drift-brand"
                style={{ animationDelay: `${i * 100}ms` }}
                key={brand}
              >
                {brand}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section" id="featured">
        <div className="container">
          <h2 className="section-title drift-left">
            Featured <span className="gradient-text">Picks</span>
          </h2>
          <p className="section-subtitle drift-left" style={{ animationDelay: '0.15s' }}>
            Hand-picked selections from our latest collection
          </p>
          {loading ? (
            <p style={{ color: 'var(--text-muted)', textAlign: 'center' }}>Loading amazing shoes...</p>
          ) : (
            <div className="product-grid">
              {featured.map((shoe, i) => (
                <div
                  key={shoe.id}
                  className={loaded ? 'drift-float' : ''}
                  style={{ animationDelay: `${i * 120}ms`, opacity: loaded ? undefined : 0 }}
                >
                  <ProductCard shoe={shoe} addToCart={addToCart} />
                </div>
              ))}
            </div>
          )}
          <div style={{ textAlign: 'center', marginTop: 'var(--spacing-2xl)' }}>
            <Link to="/shop" className="btn btn-secondary btn-lg" id="view-all-btn">
              View All Shoes →
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="section" id="newsletter-section">
        <div className="container">
          <div className="newsletter drift-zoom">
            <h2>Stay in the <span className="gradient-text">Loop</span></h2>
            <p>Get exclusive drops, special offers, and style inspiration delivered to your inbox.</p>
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()} id="newsletter-form">
              <input type="email" placeholder="Enter your email address" id="newsletter-email" />
              <button type="submit" className="btn btn-primary" id="newsletter-submit">Subscribe</button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
