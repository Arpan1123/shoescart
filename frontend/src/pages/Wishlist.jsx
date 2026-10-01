import { Link } from 'react-router-dom';

function Wishlist({ wishlist, toggleWishlist, addToCart }) {
  return (
    <div className="wishlist-page" id="wishlist-page">
      <div className="container">
        <h1 className="section-title drift-left">
          My <span className="gradient-text">Wishlist</span>
          <span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 400, marginLeft: '12px' }}>
            ({wishlist.length} {wishlist.length === 1 ? 'item' : 'items'})
          </span>
        </h1>

        {wishlist.length === 0 ? (
          <div className="cart-empty drift-zoom" style={{ animationDelay: '0.2s' }}>
            <div className="cart-empty-icon">💫</div>
            <h2>Your wishlist is empty</h2>
            <p>Save items you love by tapping the heart icon on any product.</p>
            <Link to="/shop" className="btn btn-primary btn-lg" id="wishlist-shop">
              Explore Shoes →
            </Link>
          </div>
        ) : (
          <div className="wishlist-grid" id="wishlist-grid">
            {wishlist.map((shoe, i) => {
              const discount = shoe.originalPrice > shoe.price
                ? Math.round((1 - shoe.price / shoe.originalPrice) * 100)
                : 0;
              return (
                <div
                  className="wishlist-card drift-float"
                  key={shoe.id}
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <Link to={`/product/${shoe.id}`} className="wishlist-card-image">
                    <img src={shoe.image} alt={shoe.name} loading="lazy" />
                    {shoe.tag && <span className="product-card-tag">{shoe.tag}</span>}
                  </Link>
                  <div className="wishlist-card-body">
                    <div className="product-card-brand">{shoe.brand}</div>
                    <Link to={`/product/${shoe.id}`} className="wishlist-card-name">{shoe.name}</Link>
                    <div className="wishlist-card-price-row">
                      <div className="product-card-price">
                        <span className="price-current">₹{shoe.price}</span>
                        {shoe.originalPrice > shoe.price && (
                          <span className="price-original">₹{shoe.originalPrice}</span>
                        )}
                      </div>
                      {discount > 0 && (
                        <span className="price-discount">-{discount}%</span>
                      )}
                    </div>
                    <div className="wishlist-card-actions">
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => addToCart({
                          id: shoe.id,
                          name: shoe.name,
                          brand: shoe.brand,
                          price: shoe.price,
                          image: shoe.image,
                          size: shoe.sizes[0],
                          color: shoe.colors[0],
                          quantity: 1,
                        })}
                        id={`wishlist-add-${shoe.id}`}
                      >
                        🛒 Add to Cart
                      </button>
                      <button
                        className="btn btn-ghost wishlist-remove-btn"
                        onClick={() => toggleWishlist(shoe)}
                        id={`wishlist-remove-${shoe.id}`}
                      >
                        ❌ Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Wishlist;
