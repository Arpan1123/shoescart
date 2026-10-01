import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import SkeletonCard from '../components/SkeletonCard';
import CountdownBanner from '../components/CountdownBanner';

const API_URL = '/api';

function AnimatedCounter({ target, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 2000;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  const formatNumber = (n) => {
    if (n >= 1000) return (n / 1000).toFixed(0) + 'K';
    return n;
  };

  return (
    <span ref={ref}>{target >= 1000 ? formatNumber(count) : count}{suffix}</span>
  );
}

function Home({ addToCart, wishlist, toggleWishlist, onQuickView }) {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const heroRef = useRef(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  // ─── Cinematic Shoe Showcase State ───
  const [rotY, setRotY] = useState(0);
  const [rotX, setRotX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [velocity, setVelocity] = useState(0);
  const [floatY, setFloatY] = useState(0);

  const rotYRef = useRef(0);
  const rotXRef = useRef(0);
  const velocityRef = useRef(0.3); // auto-sway speed
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0, rotY: 0, rotX: 0, time: 0 });
  const lastDragRef = useRef({ x: 0, time: 0 });
  const timeRef = useRef(0);

  // Main animation loop — cinematic sway + levitation
  useEffect(() => {
    let animId;
    const loop = () => {
      timeRef.current += 0.012;

      if (!isDraggingRef.current) {
        // Gentle cinematic sway: oscillate ±20° instead of full 360°
        rotYRef.current += velocityRef.current;

        // If velocity is near auto-sway speed, use smooth sine wave sway
        if (Math.abs(velocityRef.current) <= 0.35) {
          rotYRef.current = Math.sin(timeRef.current * 0.8) * 20;
          velocityRef.current = 0.3;
        } else {
          // Decelerate momentum from drag fling
          velocityRef.current *= 0.96;
          // Once momentum is low, snap back to sway
          if (Math.abs(velocityRef.current) < 0.35) {
            // Sync timeRef so sway continues smoothly from current angle
            timeRef.current = Math.asin(Math.max(-1, Math.min(1, rotYRef.current / 20))) / 0.8;
          }
        }

        // Gentle auto-tilt (subtle nod)
        rotXRef.current = Math.sin(timeRef.current * 0.5) * 5;

        setRotY(rotYRef.current);
        setRotX(rotXRef.current);
      }

      // Smooth levitation bounce
      setFloatY(Math.sin(timeRef.current * 1.2) * 14);

      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Drag start
  const handleShoeMouseDown = useCallback((e) => {
    e.preventDefault();
    isDraggingRef.current = true;
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      rotY: rotYRef.current,
      rotX: rotXRef.current,
      time: Date.now(),
    };
    lastDragRef.current = { x: e.clientX, time: Date.now() };
  }, []);

  // Drag move + drag end (window-level)
  useEffect(() => {
    const onMove = (e) => {
      if (!isDraggingRef.current) return;
      const dx = e.clientX - dragStartRef.current.x;
      const dy = e.clientY - dragStartRef.current.y;
      // Limit drag rotation to ±40° so shoe stays visible
      rotYRef.current = Math.max(-40, Math.min(40, dragStartRef.current.rotY + dx * 0.4));
      rotXRef.current = Math.max(-20, Math.min(20, dragStartRef.current.rotX + dy * -0.2));
      setRotY(rotYRef.current);
      setRotX(rotXRef.current);
      lastDragRef.current = { x: e.clientX, time: Date.now() };
    };

    const onUp = (e) => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;
      setIsDragging(false);

      // Calculate fling/momentum velocity (clamped)
      const dt = Date.now() - lastDragRef.current.time;
      if (dt < 150) {
        const dx = e.clientX - lastDragRef.current.x;
        velocityRef.current = Math.max(-3, Math.min(3, dx * 0.1));
      } else {
        velocityRef.current = 0.3; // back to auto-sway
      }
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, []);

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

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('shoescart_recently_viewed') || '[]');
      setRecentlyViewed(saved);
    } catch { /* ignore */ }
  }, []);

  const handleHeroMouseMove = (e) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMouse({ x, y });
  };

  const handleHeroMouseLeave = () => {
    setMouse({ x: 0, y: 0 });
  };

  // Compute glow position based on rotation
  const glowAngle = ((rotY % 360) + 360) % 360;
  const glowX = Math.sin((glowAngle * Math.PI) / 180) * 80;
  const glowY = -30 + Math.cos((glowAngle * Math.PI) / 180) * 15;
  const scaleEffect = 1.0;

  const brands = ['Nike', 'Adidas', 'Puma', 'New Balance', 'Hoka', 'Vans', 'Converse', 'Reebok'];

  return (
    <main className="page-transition">
      {/* 3D Hero */}
      <section
        className="hero hero-3d"
        id="hero"
        ref={heroRef}
        onMouseMove={handleHeroMouseMove}
        onMouseLeave={handleHeroMouseLeave}
      >
        <div className="hero-bg">
          <div className="hero-particles">
            {[...Array(30)].map((_, i) => (
              <div
                key={i}
                className="hero-particle"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${4 + Math.random() * 6}s`,
                  width: `${2 + Math.random() * 4}px`,
                  height: `${2 + Math.random() * 4}px`,
                }}
              />
            ))}
          </div>
          <div className="hero-3d-ring ring-1" style={{ transform: `rotateX(${70 + mouse.y * 8}deg) rotateZ(${mouse.x * 15}deg)` }}></div>
          <div className="hero-3d-ring ring-2" style={{ transform: `rotateX(${65 - mouse.y * 5}deg) rotateZ(${-30 + mouse.x * 10}deg)` }}></div>
          <div className="hero-3d-ring ring-3" style={{ transform: `rotateX(${75 + mouse.y * 10}deg) rotateZ(${60 - mouse.x * 12}deg)` }}></div>
          <div
            className="hero-glow-orb"
            style={{
              transform: `translate(${mouse.x * 80}px, ${mouse.y * 80}px)`,
            }}
          ></div>
        </div>

        <div className="hero-content hero-3d-scene" style={{ perspective: '1200px' }}>
          {/* Text layer */}
          <div
            className="hero-text hero-3d-layer"
            style={{
              transform: `translate3d(${mouse.x * -15}px, ${mouse.y * -10}px, 40px)`,
            }}
          >
            <div className="hero-badge drift-hidden drift-left">🔥 New Collection 2026</div>
            <h1 className="hero-title drift-hidden drift-left">
              Step Into <br />
              <span className="gradient-text gradient-shimmer">Greatness</span>
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
                <h3 className="gradient-text"><AnimatedCounter target={200} suffix="+" /></h3>
                <p>Premium Styles</p>
              </div>
              <div className="hero-stat">
                <h3 className="gradient-text"><AnimatedCounter target={50000} suffix="+" /></h3>
                <p>Happy Customers</p>
              </div>
              <div className="hero-stat">
                <h3 className="gradient-text"><AnimatedCounter target={12} /></h3>
                <p>Top Brands</p>
              </div>
            </div>
          </div>

          {/* ═══════ Cinematic 3D Shoe Showcase ═══════ */}
          <div
            className="hero-image hero-3d-showcase"
            style={{
              transform: `translate3d(${mouse.x * 15}px, ${mouse.y * 10}px, 80px)`,
            }}
          >
            {/* Orbit ring */}
            <div
              className="shoe-orbit-ring"
              style={{
                transform: `rotateX(75deg) rotateZ(${rotY * 0.5}deg)`,
              }}
            ></div>

            {/* Dynamic glow that follows rotation */}
            <div
              className="shoe-dynamic-glow"
              style={{
                transform: `translate(${glowX}px, ${glowY}px)`,
                opacity: 0.6 + Math.abs(Math.sin((glowAngle * Math.PI) / 180)) * 0.4,
              }}
            ></div>

            {/* Shadow under shoe — reacts to rotation */}
            <div
              className="hero-shoe-shadow"
              style={{
                transform: `translate(${Math.sin((glowAngle * Math.PI) / 180) * 15}px, 20px) scale(${0.8 + Math.abs(Math.cos((glowAngle * Math.PI) / 180)) * 0.2})`,
                opacity: 0.35,
              }}
            ></div>

            {/* The cinematic floating shoe */}
            <div
              className={`hero-shoe-turntable${isDragging ? ' dragging' : ''}`}
              onMouseDown={handleShoeMouseDown}
              style={{
                transform: `perspective(1200px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(${floatY}px) scale(${scaleEffect})`,
                cursor: isDragging ? 'grabbing' : 'grab',
              }}
            >
              <img
                src="https://pngimg.com/d/running_shoes_PNG5816.png"
                alt="Featured Shoe - Cinematic View"
                className="hero-shoe-img hero-shoe-3d hero-shoe-fullsize"
                draggable="false"
                style={{
                  filter: `
                    drop-shadow(${Math.sin((glowAngle * Math.PI) / 180) * -15}px 
                    ${18 + Math.cos((glowAngle * Math.PI) / 180) * 8}px 
                    50px rgba(0, 0, 0, 0.55))
                    drop-shadow(0 0 25px rgba(255, 77, 77, 0.08))
                  `,
                }}
              />
            </div>

            {/* 360° badge with progress ring */}
            <div className={`hero-360-badge${isDragging ? ' active' : ''}`}>
              <div className="hero-360-progress-ring">
                <svg viewBox="0 0 40 40">
                  <circle className="ring-bg" cx="20" cy="20" r="17" />
                  <circle
                    className="ring-fill"
                    cx="20" cy="20" r="17"
                    style={{
                      strokeDashoffset: 106.8 - (((rotY % 360 + 360) % 360) / 360) * 106.8,
                    }}
                  />
                </svg>
              </div>
              <span className="hero-360-badge-text">360°</span>
              <span className="hero-360-badge-sub">
                {isDragging ? '⟵ Dragging ⟶' : '✦ Cinematic'}
              </span>
            </div>

            {/* Floating info cards */}
            <div
              className="hero-floating-card top"
              style={{
                transform: `translate3d(${mouse.x * -20}px, ${mouse.y * -15}px, 30px)`,
              }}
            >
              <div className="floating-card-label">Top Rated</div>
              <div className="floating-card-value">★ 4.9 Rating</div>
            </div>
            <div
              className="hero-floating-card bottom"
              style={{
                transform: `translate3d(${mouse.x * 25}px, ${mouse.y * 18}px, 50px)`,
              }}
            >
              <div className="floating-card-label">Free Shipping</div>
              <div className="floating-card-value">On orders ₹8,000+</div>
            </div>
            <div
              className="hero-floating-card price-tag"
              style={{
                transform: `translate3d(${mouse.x * -30}px, ${mouse.y * 12}px, 60px)`,
              }}
            >
              <div className="floating-card-label">Starting At</div>
              <div className="floating-card-value gradient-text">₹4,999</div>
            </div>
          </div>
        </div>
      </section>

      <CountdownBanner />

      <section className="brands-section" id="brands">
        <div className="brands-marquee-wrapper">
          <div className="brands-marquee">
            {[...brands, ...brands].map((brand, i) => (
              <Link to={`/shop?brand=${brand}`} className="brand-marquee-item" key={`${brand}-${i}`}>
                {brand}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="featured">
        <div className="container">
          <h2 className="section-title drift-left">
            Featured <span className="gradient-text">Picks</span>
          </h2>
          <p className="section-subtitle drift-left" style={{ animationDelay: '0.15s' }}>
            Hand-picked selections from our latest collection
          </p>
          {loading ? (
            <div className="product-grid">
              {[...Array(8)].map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : (
            <div className="product-grid">
              {featured.map((shoe, i) => (
                <div key={shoe.id} className={loaded ? 'drift-float' : ''}
                  style={{ animationDelay: `${i * 120}ms`, opacity: loaded ? undefined : 0 }}>
                  <ProductCard shoe={shoe} addToCart={addToCart} wishlist={wishlist}
                    toggleWishlist={toggleWishlist} onQuickView={onQuickView} />
                </div>
              ))}
            </div>
          )}
          <div style={{ textAlign: 'center', marginTop: 'var(--spacing-2xl)' }}>
            <Link to="/shop" className="btn btn-secondary btn-lg" id="view-all-btn">View All Shoes →</Link>
          </div>
        </div>
      </section>

      {recentlyViewed.length > 0 && (
        <section className="section" id="recently-viewed">
          <div className="container">
            <h2 className="section-title drift-left">Recently <span className="gradient-text">Viewed</span></h2>
            <p className="section-subtitle drift-left" style={{ animationDelay: '0.15s' }}>Continue where you left off</p>
            <div className="recently-viewed-scroll">
              {recentlyViewed.map((shoe, i) => (
                <Link to={`/product/${shoe.id}`} className="recently-viewed-card drift-float" key={shoe.id}
                  style={{ animationDelay: `${i * 100}ms` }}>
                  <div className="recently-viewed-img"><img src={shoe.image} alt={shoe.name} loading="lazy" /></div>
                  <div className="recently-viewed-info">
                    <span className="recently-viewed-brand">{shoe.brand}</span>
                    <span className="recently-viewed-name">{shoe.name}</span>
                    <span className="recently-viewed-price">₹{shoe.price}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

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
