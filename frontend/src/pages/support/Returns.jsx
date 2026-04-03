import { Link } from 'react-router-dom';

function Returns() {
  return (
    <div className="support-page" id="returns-page">
      <div className="container">
        <Link to="/" className="back-btn">← Back to Home</Link>
        <h1 className="section-title drift-left">
          Returns & <span className="gradient-text">Exchanges</span>
        </h1>
        <p className="section-subtitle drift-left" style={{ animationDelay: '0.15s' }}>
          Hassle-free returns within 30 days
        </p>

        <div className="info-cards-grid">
          <div className="info-card drift-up">
            <span className="info-card-icon">🔄</span>
            <h3>30-Day Returns</h3>
            <div className="info-card-detail">
              <p>Not happy with your purchase? Return any unworn item in its original packaging within 30 days of delivery for a full refund.</p>
            </div>
          </div>

          <div className="info-card drift-up" style={{ animationDelay: '0.1s' }}>
            <span className="info-card-icon">📐</span>
            <h3>Free Size Exchanges</h3>
            <div className="info-card-detail">
              <p>Wrong size? Exchange for free! We'll pick up the original pair and deliver the correct size at no extra cost.</p>
            </div>
          </div>

          <div className="info-card drift-up" style={{ animationDelay: '0.2s' }}>
            <span className="info-card-icon">💸</span>
            <h3>Quick Refunds</h3>
            <div className="info-card-detail">
              <p>Refunds are processed within 5–7 business days of receiving the returned item. Amount credited to your original payment method.</p>
            </div>
          </div>

          <div className="info-card drift-up" style={{ animationDelay: '0.3s' }}>
            <span className="info-card-icon">🏡</span>
            <h3>Doorstep Pickup</h3>
            <div className="info-card-detail">
              <p>No need to visit a courier office. Our delivery partner will pick up the return from your doorstep at a time convenient for you.</p>
            </div>
          </div>
        </div>

        <div className="info-section drift-up" style={{ animationDelay: '0.2s' }}>
          <h2>How to Return or Exchange</h2>
          <div className="steps-container">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Initiate Request</h3>
              <p>Go to My Account → My Orders → Select the order → Click "Return" or "Exchange".</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Select Reason</h3>
              <p>Choose your reason (wrong size, defective, changed mind, etc.) and upload photos if applicable.</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Schedule Pickup</h3>
              <p>Pick a date and time slot for our courier partner to come collect the item from your address.</p>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <h3>Receive Refund/Exchange</h3>
              <p>Once we receive and inspect the item, your refund or replacement will be processed within 5–7 days.</p>
            </div>
          </div>
        </div>

        <div className="info-section drift-up" style={{ animationDelay: '0.25s' }}>
          <h2>Return Policy Details</h2>
          <ul className="info-list">
            <li>✅ Items must be unworn, undamaged, and in original brand packaging with all tags attached.</li>
            <li>✅ Free returns on all orders — we cover the return shipping cost.</li>
            <li>✅ Exchanges can be made for a different size or color of the same product.</li>
            <li>⚠️ Items purchased during Flash Sales / Clearance may be final sale and non-returnable.</li>
            <li>⚠️ Custom or personalized orders cannot be returned.</li>
            <li>💡 If you receive a defective or damaged product, contact us within 48 hours for an immediate replacement.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Returns;
