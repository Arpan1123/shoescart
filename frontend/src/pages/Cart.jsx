import { Link } from 'react-router-dom';

function Cart({ cart, updateCartItem, removeFromCart, clearCart }) {
  if (!cart.items || cart.items.length === 0) {
    return (
      <div className="cart-page" id="cart-page">
        <div className="container">
          <h1 className="section-title drift-left">Shopping <span className="gradient-text">Cart</span></h1>
          <div className="cart-empty drift-zoom" style={{ animationDelay: '0.2s' }}>
            <div className="cart-empty-icon">🛒</div>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added anything to your cart yet.</p>
            <Link to="/shop" className="btn btn-primary btn-lg" id="continue-shopping">
              Continue Shopping →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const shipping = cart.total >= 8000 ? 0 : 500;
  const tax = Math.round(cart.total * 0.08 * 100) / 100;
  const grandTotal = Math.round((cart.total + shipping + tax) * 100) / 100;

  return (
    <div className="cart-page" id="cart-page">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-2xl)' }}>
          <h1 className="section-title drift-left" style={{ marginBottom: 0 }}>
            Shopping <span className="gradient-text">Cart</span>
            <span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 400, marginLeft: '12px' }}>
              ({cart.count} {cart.count === 1 ? 'item' : 'items'})
            </span>
          </h1>
          <button className="btn btn-ghost" onClick={clearCart} id="clear-cart" style={{ color: 'var(--danger)' }}>
            🗑 Clear Cart
          </button>
        </div>

        <div className="cart-layout">
          {/* Cart Items */}
          <div className="cart-items" id="cart-items">
            {cart.items.map((item, index) => (
              <div
                className="cart-item drift-cart"
                key={`${item.id}-${item.size}-${item.color}-${index}`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="cart-item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="cart-item-info">
                  <div className="cart-item-brand">{item.brand}</div>
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-variant">
                    Size: {item.size} &nbsp;|&nbsp; Color: {item.color}
                  </div>
                  <div className="cart-item-bottom">
                    <div className="cart-item-qty">
                      <button
                        className="qty-btn"
                        onClick={() => updateCartItem(item.id, item.size, item.color, item.quantity - 1)}
                      >
                        −
                      </button>
                      <span className="qty-value">{item.quantity}</span>
                      <button
                        className="qty-btn"
                        onClick={() => updateCartItem(item.id, item.size, item.color, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    <div className="cart-item-price">₹{(item.price * item.quantity).toFixed(2)}</div>
                  </div>
                  <button
                    className="cart-item-remove"
                    onClick={() => removeFromCart(item.id, item.size, item.color)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="cart-summary drift-summary" id="cart-summary">
            <h2>Order Summary</h2>
            <div className="cart-summary-row">
              <span>Subtotal</span>
              <span>₹{cart.total.toFixed(2)}</span>
            </div>
            <div className="cart-summary-row">
              <span>Shipping</span>
              <span>{shipping === 0 ? <span style={{ color: 'var(--success)' }}>FREE</span> : `₹${shipping.toFixed(2)}`}</span>
            </div>
            <div className="cart-summary-row">
              <span>Tax</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>
            {shipping !== 0 && (
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 'var(--spacing-md)' }}>
                Free shipping on orders over ₹8,000
              </p>
            )}
            <div className="cart-summary-total">
              <span>Total</span>
              <span className="gradient-text">₹{grandTotal.toFixed(2)}</span>
            </div>
            <button className="btn btn-primary btn-lg drift-glow" id="checkout-btn">
              Checkout →
            </button>
            <div className="cart-promo">
              <input type="text" placeholder="Promo code" id="promo-input" />
              <button className="btn btn-secondary btn-sm" id="promo-apply">Apply</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
