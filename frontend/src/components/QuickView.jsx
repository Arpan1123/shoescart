import { useState } from 'react';
import { Link } from 'react-router-dom';

function QuickView({ shoe, onClose, addToCart, wishlist, toggleWishlist }) {
  const [selectedSize, setSelectedSize] = useState(shoe.sizes?.[0]);
  const [selectedColor, setSelectedColor] = useState(shoe.colors?.[0]);
  const [mainImage, setMainImage] = useState(0);

  if (!shoe) return null;

  const discount = shoe.originalPrice > shoe.price
    ? Math.round((1 - shoe.price / shoe.originalPrice) * 100)
    : 0;

  const renderStars = (rating) => {
    let stars = '';
    for (let i = 0; i < 5; i++) stars += i < Math.floor(rating) ? '★' : '☆';
    return stars;
  };

  const handleAddToCart = () => {
    addToCart({
      id: shoe.id,
      name: shoe.name,
      brand: shoe.brand,
      price: shoe.price,
      image: shoe.image,
      size: selectedSize,
      color: selectedColor,
      quantity: 1,
    });
    onClose();
  };

  const isWished = wishlist.some(w => w.id === shoe.id);

  return (
    <div className="quickview-overlay" onClick={onClose} id="quickview-overlay">
      <div className="quickview-modal" onClick={(e) => e.stopPropagation()} id="quickview-modal">
        <button className="quickview-close" onClick={onClose} id="quickview-close">✕</button>

        <div className="quickview-grid">
          {/* Image */}
          <div className="quickview-gallery">
            <div className="quickview-main-image">
              <img src={shoe.images?.[mainImage] || shoe.image} alt={shoe.name} />
              {shoe.tag && <span className="product-card-tag">{shoe.tag}</span>}
            </div>
            {shoe.images && shoe.images.length > 1 && (
              <div className="quickview-thumbs">
                {shoe.images.slice(0, 4).map((img, idx) => (
                  <button
                    key={idx}
                    className={`quickview-thumb ${mainImage === idx ? 'active' : ''}`}
                    onClick={() => setMainImage(idx)}
                  >
                    <img src={img} alt={`View ${idx + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="quickview-info">
            <div className="product-info-brand">{shoe.brand}</div>
            <h2 className="quickview-name">{shoe.name}</h2>

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

            <p className="quickview-desc">{shoe.description}</p>

            {/* Size */}
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

            {/* Color */}
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
            <div className="quickview-actions">
              <button className="btn btn-primary btn-lg drift-glow" onClick={handleAddToCart} id="quickview-add-cart">
                🛒 Add to Cart — ₹{shoe.price}
              </button>
              <button
                className={`btn btn-secondary btn-lg quickview-wish-btn ${isWished ? 'wished' : ''}`}
                onClick={() => toggleWishlist(shoe)}
                id="quickview-wishlist"
              >
                {isWished ? '❤️' : '♡'}
              </button>
            </div>

            <Link to={`/product/${shoe.id}`} className="quickview-full-link" onClick={onClose}>
              View Full Details →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuickView;
