import { Link } from 'react-router-dom';

function ProductCard({ shoe, addToCart }) {
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

  return (
    <Link to={`/product/${shoe.id}`} className="product-card" id={`product-card-${shoe.id}`}>
      <div className="product-card-image">
        <img src={shoe.image} alt={shoe.name} loading="lazy" />
        {shoe.tag && <span className="product-card-tag">{shoe.tag}</span>}
        <button className="product-card-wishlist" onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>♡</button>
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
