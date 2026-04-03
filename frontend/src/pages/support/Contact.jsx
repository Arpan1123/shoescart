import { useState } from 'react';
import { Link } from 'react-router-dom';

function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="support-page" id="contact-page">
      <div className="container">
        <Link to="/" className="back-btn">← Back to Home</Link>
        <h1 className="section-title drift-left">
          Contact <span className="gradient-text">Us</span>
        </h1>
        <p className="section-subtitle drift-left" style={{ animationDelay: '0.15s' }}>
          We're here to help. Reach out to us anytime.
        </p>

        <div className="support-grid">
          {/* Contact Info Cards */}
          <div className="support-sidebar">
            <div className="support-info-card drift-up">
              <span className="support-info-icon">📞</span>
              <h3>Call Us</h3>
              <p>+91 89104 80474</p>
              <small>Mon–Sat, 10am–7pm IST</small>
            </div>
            <div className="support-info-card drift-up" style={{ animationDelay: '0.1s' }}>
              <span className="support-info-icon">✉️</span>
              <h3>Email Us</h3>
              <p>support@shoescart.in</p>
              <small>We reply within 24 hours</small>
            </div>
            <div className="support-info-card drift-up" style={{ animationDelay: '0.2s' }}>
              <span className="support-info-icon">📍</span>
              <h3>Visit Us</h3>
              <p>Kolkata, West Bengal</p>
              <small>India — 700001</small>
            </div>
            <div className="support-info-card drift-up" style={{ animationDelay: '0.3s' }}>
              <span className="support-info-icon">💬</span>
              <h3>Live Chat</h3>
              <p>Available on website</p>
              <small>Click the chat icon below</small>
            </div>
          </div>

          {/* Contact Form */}
          <div className="support-content drift-up" style={{ animationDelay: '0.15s' }}>
            {submitted ? (
              <div className="support-success">
                <span style={{ fontSize: '3rem' }}>✅</span>
                <h2>Message Sent!</h2>
                <p>Thank you for reaching out. Our team will get back to you within 24 hours.</p>
                <button className="btn btn-primary" onClick={() => setSubmitted(false)}>Send Another Message</button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit} id="contact-form">
                <h2 style={{ marginBottom: 'var(--spacing-xl)' }}>Send us a Message</h2>
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input type="text" placeholder="John Doe" required id="contact-name" />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input type="email" placeholder="john@example.com" required id="contact-email" />
                  </div>
                </div>
                <div className="form-group">
                  <label>Subject</label>
                  <select id="contact-subject" required>
                    <option value="">Select a topic...</option>
                    <option value="order">Order Issue</option>
                    <option value="return">Returns & Exchanges</option>
                    <option value="shipping">Shipping Question</option>
                    <option value="product">Product Inquiry</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Message</label>
                  <textarea rows="5" placeholder="Tell us how we can help..." required id="contact-message"></textarea>
                </div>
                <button type="submit" className="btn btn-primary btn-lg drift-glow" id="contact-submit">
                  Send Message →
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
