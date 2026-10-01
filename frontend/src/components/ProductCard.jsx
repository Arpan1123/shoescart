import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

function ProductCard({ shoe, addToCart, wishlist = [], toggleWishlist, onQuickView }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const renderStars = (rating) => {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    let stars = '';
    for (let i = 0; i < full; i++) stars += '★';
    if (half) stars += '★';
    const remaining = 5 - full - (half ? 1 : 0);
    for (let i = 0; i < remaining; i++) stars += '☆';
    return stars;
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: shoe.id,
      name: shoe.name,
      brand: shoe.brand,
      price: shoe.price,
      image: shoe.image,
      size: shoe.sizes[0],
      color: shoe.colors[0],
      quantity: 1,
    });
  };

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickView) onQuickView(shoe);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (toggleWishlist) toggleWishlist(shoe);
  };

  const isWished = wishlist.some(w => w.id === shoe.id);
  const discount = shoe.originalPrice > shoe.price
    ? Math.round((1 - shoe.price / shoe.originalPrice) * 100)
    : 0;

  return (
    <Link
      to={`/product/${shoe.id}`}
      className="product-card product-card-3d"
      id={`product-card-${shoe.id}`}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
      }}
    >
      <div className="product-card-glow"></div>
      <div className="product-card-image">
        <img src={shoe.image} alt={shoe.name} loading="lazy" />
        {shoe.tag && <span className="product-card-tag">{shoe.tag}</span>}
        {discount > 0 && <span className="product-card-discount">-{discount}%</span>}
        <button
          className={`product-card-wishlist ${isWished ? 'wished' : ''}`}
          onClick={handleWishlist}
        >
          {isWished ? '❤️' : '♡'}
        </button>
        <div className="product-card-overlay">
          <button className="product-card-quickview" onClick={handleQuickView}>
            👁 Quick View
          </button>
        </div>
      </div>
      <div className="product-card-body">
        <div className="product-card-brand">{shoe.brand}</div>
        <div className="product-card-name">{shoe.name}</div>
        <div className="product-card-rating">
          <span className="stars">{renderStars(shoe.rating)}</span>
          <span className="rating-count">({shoe.reviews})</span>
        </div>
        <div className="product-card-footer">
          <div className="product-card-price">
            <span className="price-current">₹{shoe.price}</span>
            {shoe.originalPrice > shoe.price && (
              <span className="price-original">₹{shoe.originalPrice}</span>
            )}
          </div>
          <button className="product-card-add" onClick={handleAddToCart} id={`add-to-cart-${shoe.id}`}>
            +
          </button>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
