import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand drift-up">
            <h2>👟 <span className="gradient-text">ShoesCart</span></h2>
            <p>Your destination for premium footwear. We curate the finest sneakers and shoes from the world's top brands, delivering style and comfort right to your door.</p>
          </div>

          <div className="footer-col drift-up" style={{ animationDelay: '0.1s' }}>
            <h3>Shop</h3>
            <Link to="/shop?category=Running">Running</Link>
            <Link to="/shop?category=Lifestyle">Lifestyle</Link>
            <Link to="/shop?category=Basketball">Basketball</Link>
            <Link to="/shop?category=Skateboarding">Skateboarding</Link>
            <Link to="/shop">All Shoes</Link>
          </div>

          <div className="footer-col drift-up" style={{ animationDelay: '0.2s' }}>
            <h3>Brands</h3>
            <Link to="/shop?brand=Nike">Nike</Link>
            <Link to="/shop?brand=Adidas">Adidas</Link>
            <Link to="/shop?brand=Puma">Puma</Link>
            <Link to="/shop?brand=New Balance">New Balance</Link>
            <Link to="/shop?brand=Hoka">Hoka</Link>
          </div>

          <div className="footer-col drift-up" style={{ animationDelay: '0.3s' }}>
            <h3>Support</h3>
            <Link to="/support/contact">Contact Us</Link>
            <Link to="/support/faq">FAQs</Link>
            <Link to="/support/shipping">Shipping Info</Link>
            <Link to="/support/returns">Returns & Exchanges</Link>
            <Link to="/support/size-guide">Size Guide</Link>
          </div>

          <div className="footer-col drift-up" style={{ animationDelay: '0.4s' }}>
            <h3>Account</h3>
            <Link to="/account">My Account</Link>
            <Link to="/cart">My Cart</Link>
            <Link to="/login">Login / Sign Up</Link>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 ShoesCart. All rights reserved.</p>
          <div className="footer-socials">
            <a href="#" aria-label="Instagram">📷</a>
            <a href="#" aria-label="Twitter">🐦</a>
            <a href="#" aria-label="Facebook">📘</a>
            <a href="#" aria-label="YouTube">🎬</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
