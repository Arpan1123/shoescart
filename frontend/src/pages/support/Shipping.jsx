import { Link } from 'react-router-dom';

function Shipping() {
  return (
    <div className="support-page" id="shipping-page">
      <div className="container">
        <Link to="/" className="back-btn">← Back to Home</Link>
        <h1 className="section-title drift-left">
          Shipping <span className="gradient-text">Information</span>
        </h1>
        <p className="section-subtitle drift-left" style={{ animationDelay: '0.15s' }}>
          Fast and reliable delivery across India
        </p>

        <div className="info-cards-grid">
          <div className="info-card drift-up">
            <span className="info-card-icon">🚚</span>
            <h3>Standard Delivery</h3>
            <div className="info-card-detail">
              <strong>5–7 Business Days</strong>
              <p>Available across India. Free on orders above ₹8,000. Flat ₹500 shipping fee for orders below ₹8,000.</p>
            </div>
          </div>

          <div className="info-card drift-up" style={{ animationDelay: '0.1s' }}>
            <span className="info-card-icon">⚡</span>
            <h3>Express Delivery</h3>
            <div className="info-card-detail">
              <strong>2–3 Business Days</strong>
              <p>Available in metro cities (Delhi, Mumbai, Bangalore, Kolkata, Chennai, Hyderabad). ₹299 extra charge.</p>
            </div>
          </div>

          <div className="info-card drift-up" style={{ animationDelay: '0.2s' }}>
            <span className="info-card-icon">📍</span>
            <h3>Order Tracking</h3>
            <div className="info-card-detail">
              <strong>Real-time Updates</strong>
              <p>Track your parcel from dispatch to doorstep via SMS, email, and your account dashboard. Powered by Delhivery & BlueDart.</p>
            </div>
          </div>

          <div className="info-card drift-up" style={{ animationDelay: '0.3s' }}>
            <span className="info-card-icon">📦</span>
            <h3>Packaging</h3>
            <div className="info-card-detail">
              <strong>Premium & Secure</strong>
              <p>Every order is packed in a double-walled corrugated box to protect your shoes during transit. Original brand box included.</p>
            </div>
          </div>
        </div>

        <div className="info-section drift-up" style={{ animationDelay: '0.2s' }}>
          <h2>Shipping Zones & Delivery Times</h2>
          <div className="info-table-wrap">
            <table className="info-table">
              <thead>
                <tr>
                  <th>Zone</th>
                  <th>Cities/Region</th>
                  <th>Standard</th>
                  <th>Express</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Metro</strong></td>
                  <td>Delhi, Mumbai, Bangalore, Kolkata, Chennai, Hyderabad</td>
                  <td>3–5 days</td>
                  <td>1–2 days</td>
                </tr>
                <tr>
                  <td><strong>Tier 1</strong></td>
                  <td>Pune, Ahmedabad, Jaipur, Lucknow, Chandigarh, Kochi</td>
                  <td>4–6 days</td>
                  <td>2–3 days</td>
                </tr>
                <tr>
                  <td><strong>Tier 2</strong></td>
                  <td>All other cities & towns with PIN code coverage</td>
                  <td>5–7 days</td>
                  <td>3–4 days</td>
                </tr>
                <tr>
                  <td><strong>Remote</strong></td>
                  <td>Northeast, J&K, Ladakh, Andaman & Nicobar, Lakshadweep</td>
                  <td>7–10 days</td>
                  <td>Not available</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="info-section drift-up" style={{ animationDelay: '0.25s' }}>
          <h2>Important Notes</h2>
          <ul className="info-list">
            <li>🕐 Orders placed before 2 PM IST on business days are dispatched the same day.</li>
            <li>📅 Business days are Monday to Saturday (excluding public holidays).</li>
            <li>🔔 You will receive SMS & email notifications at every stage: confirmation, dispatch, out-for-delivery, delivered.</li>
            <li>🏠 Ensure someone is available to receive the delivery. We attempt delivery twice before returning the package.</li>
            <li>💰 Cash on Delivery (COD) is available on orders up to ₹15,000. A ₹50 COD convenience fee applies.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Shipping;
