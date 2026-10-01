import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || '/api';

function ProductDetail({ addToCart, wishlist = [], toggleWishlist }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [shoe, setShoe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [mainImage, setMainImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [imageZoom, setImageZoom] = useState(false);

  useEffect(() => {
    setLoaded(false);
    fetch(`${API_URL}/shoes/${id}`)
      .then(res => res.json())
      .then(data => {
        setShoe(data);
        setSelectedSize(data.sizes?.[0]);
        setSelectedColor(data.colors?.[0]);
        setLoading(false);
        requestAnimationFrame(() => setLoaded(true));

        // Track recently viewed
        try {
          const saved = JSON.parse(localStorage.getItem('shoescart_recently_viewed') || '[]');
          const filtered = saved.filter(s => s.id !== data.id);
          const updated = [
            { id: data.id, name: data.name, brand: data.brand, price: data.price, image: data.image },
            ...filtered,
          ].slice(0, 6);
          localStorage.setItem('shoescart_recently_viewed', JSON.stringify(updated));
        } catch { /* ignore */ }
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return (
    <div className="product-detail page-transition" style={{ textAlign: 'center', paddingTop: '200px' }}>
      <div className="skeleton-detail-loader">
        <div className="skeleton-shimmer" style={{ width: '100%', height: '400px', borderRadius: '16px' }}></div>
      </div>
    </div>
  );

  if (!shoe) return (
    <div className="product-detail page-transition" style={{ textAlign: 'center', paddingTop: '200px' }}>
      <h2>Shoe not found</h2>
      <button className="btn btn-primary" onClick={() => navigate('/shop')} style={{ marginTop: '1rem' }}>Back to Shop</button>
    </div>
  );

  const discount = shoe.originalPrice > shoe.price
    ? Math.round((1 - shoe.price / shoe.originalPrice) * 100)
    : 0;

  const renderStars = (rating) => {
    let stars = '';
    for (let i = 0; i < 5; i++) stars += i < Math.floor(rating) ? '★' : '☆';
    return stars;
  };

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) return;
    addToCart({
      id: shoe.id,
      name: shoe.name,
      brand: shoe.brand,
      price: shoe.price,
      image: shoe.image,
      size: selectedSize,
      color: selectedColor,
      quantity,
    });
  };

  const isWished = wishlist.some(w => w.id === shoe.id);

  return (
    <div className="product-detail page-transition" id="product-detail">
      <div className="container">
        <button className="back-btn" onClick={() => navigate(-1)} id="back-btn">
          ← Back
        </button>

        <div className="product-detail-grid">
          {/* Gallery */}
          <div
            className={`product-gallery ${loaded ? 'drift-left' : ''}`}
            id="product-gallery"
            style={{ opacity: loaded ? undefined : 0 }}
          >
            <div
              className={`product-gallery-main ${imageZoom ? 'zoomed' : ''}`}
              onClick={() => setImageZoom(!imageZoom)}
              title={imageZoom ? 'Click to zoom out' : 'Click to zoom in'}
            >
              <img src={shoe.images?.[mainImage] || shoe.image} alt={shoe.name} />
              <div className="zoom-hint">{imageZoom ? '🔍 Click to zoom out' : '🔍 Click to zoom in'}</div>
            </div>
            {shoe.images && shoe.images.length > 1 && (
              <div className="product-gallery-thumbs">
                {shoe.images.map((img, idx) => (
                  <button
                    key={idx}
                    className={`gallery-thumb ${mainImage === idx ? 'active' : ''}`}
                    onClick={() => setMainImage(idx)}
                  >
                    <img src={img} alt={`${shoe.name} view ${idx + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div
            className={`product-info ${loaded ? 'drift-right' : ''}`}
            id="product-info"
            style={{ opacity: loaded ? undefined : 0 }}
          >
            <div className="product-info-brand">{shoe.brand}</div>
            <h1 className="product-info-name">{shoe.name}</h1>

            <div className="product-info-rating">
              <span className="stars">{renderStars(shoe.rating)}</span>
              <span>{shoe.rating} ({shoe.reviews} reviews)</span>
            </div>

            <div className="product-info-price">
              <span className="price-current">₹{shoe.price}</span>
              {shoe.originalPrice > shoe.price && (
                <>
                  <span className="price-original">₹{shoe.originalPrice}</span>
                  <span className="price-discount">-{discount}% OFF</span>
                </>
              )}
            </div>

            <p className="product-info-desc">{shoe.description}</p>

            {/* Size Selection */}
            <div className="product-option-label">Size</div>
            <div className="product-sizes">
              {shoe.sizes?.map(size => (
                <button
                  key={size}
                  className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>

            {/* Color Selection */}
            <div className="product-option-label">Color</div>
            <div className="product-colors">
              {shoe.colors?.map(color => (
                <button
                  key={color}
                  className={`color-btn ${selectedColor === color ? 'active' : ''}`}
                  onClick={() => setSelectedColor(color)}
                >
                  {color}
                </button>
              ))}
            </div>

            {/* Quantity */}
            <div className="product-option-label">Quantity</div>
            <div className="product-qty-selector">
              <button className="qty-btn" onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
              <span className="qty-value">{quantity}</span>
              <button className="qty-btn" onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>

            {/* Actions */}
            <div className="product-actions">
              <button className="btn btn-primary btn-lg drift-glow" onClick={handleAddToCart} id="add-to-cart-detail">
                🛒 Add to Cart — ₹{(shoe.price * quantity).toFixed(2)}
              </button>
              <button
                className={`btn btn-secondary btn-lg detail-wish-btn ${isWished ? 'wished' : ''}`}
                onClick={() => toggleWishlist(shoe)}
                id="wishlist-detail"
              >
                {isWished ? '❤️' : '♡'}
              </button>
            </div>

            {/* Trust badges */}
            <div className="trust-badges">
              <div className="trust-badge">
                <span>🚚</span>
                <span>Free Shipping</span>
              </div>
              <div className="trust-badge">
                <span>🔄</span>
                <span>30-Day Returns</span>
              </div>
              <div className="trust-badge">
                <span>✅</span>
                <span>100% Authentic</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
