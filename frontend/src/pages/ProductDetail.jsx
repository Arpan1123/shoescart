import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const API_URL = '/api';

function ProductDetail({ addToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [shoe, setShoe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [mainImage, setMainImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

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
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return (
    <div className="product-detail" style={{ textAlign: 'center', paddingTop: '200px' }}>
      <p style={{ color: 'var(--text-muted)' }}>Loading shoe details...</p>
    </div>
  );

  if (!shoe) return (
    <div className="product-detail" style={{ textAlign: 'center', paddingTop: '200px' }}>
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

  return (
    <div className="product-detail" id="product-detail">
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
            <div className="product-gallery-main">
              <img src={shoe.images?.[mainImage] || shoe.image} alt={shoe.name} />
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

            {/* Actions */}
            <div className="product-actions">
              <button className="btn btn-primary btn-lg drift-glow" onClick={handleAddToCart} id="add-to-cart-detail">
                🛒 Add to Cart — ₹{(shoe.price * quantity).toFixed(2)}
              </button>
              <button className="btn btn-secondary btn-lg" id="wishlist-detail">♡</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
