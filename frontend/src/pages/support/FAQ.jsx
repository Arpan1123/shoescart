import { useState } from 'react';
import { Link } from 'react-router-dom';

const faqs = [
  {
    category: "Orders",
    items: [
      { q: "How do I place an order?", a: "Simply browse our collection, select your preferred size and colour, add the item to your cart, and proceed to checkout. You can pay via UPI, credit/debit card, net banking, or cash on delivery." },
      { q: "Can I modify my order after placing it?", a: "You can modify or cancel your order within 1 hour of placing it. After that, the order enters processing and cannot be changed. Contact our support team immediately if you need help." },
      { q: "How do I track my order?", a: "Once your order ships, you'll receive an email and SMS with a tracking link. You can also track it from the 'My Orders' section in your account." },
      { q: "What payment methods do you accept?", a: "We accept UPI (GPay, PhonePe, Paytm), Visa, Mastercard, RuPay, net banking, and Cash on Delivery (COD) on orders up to ₹15,000." },
    ]
  },
  {
    category: "Shipping",
    items: [
      { q: "How long does delivery take?", a: "Standard delivery takes 5–7 business days. Express delivery takes 2–3 business days. Metro cities usually receive orders faster." },
      { q: "Do you offer free shipping?", a: "Yes! We offer free standard shipping on all orders above ₹8,000. For orders below that, a flat shipping fee of ₹500 applies." },
      { q: "Do you ship internationally?", a: "Currently, we ship across India only. International shipping is coming soon—stay tuned!" },
    ]
  },
  {
    category: "Returns & Exchanges",
    items: [
      { q: "What is your return policy?", a: "We offer a 30-day return policy on all unworn items in original packaging. Simply initiate a return from your account or contact us." },
      { q: "How do exchanges work?", a: "If you received the wrong size, you can request an exchange for free within 30 days. We'll pick up the old pair and deliver the new one." },
      { q: "How long does a refund take?", a: "Refunds are processed within 5–7 business days after we receive the returned item. The amount is credited to your original payment method." },
    ]
  },
  {
    category: "Products",
    items: [
      { q: "Are all products authentic?", a: "Absolutely. We source all our products directly from official brand partners and authorised distributors. Every pair comes with a certificate of authenticity." },
      { q: "How do I find my size?", a: "Check our detailed Size Guide page for brand-specific sizing charts. We recommend measuring your foot at the end of the day for the most accurate fit." },
      { q: "Can I buy shoes as a gift?", a: "Yes! During checkout you can add a gift message and select gift wrapping for ₹199. The price tag will be removed from the box." },
    ]
  }
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  let globalIdx = 0;

  return (
    <div className="support-page" id="faq-page">
      <div className="container">
        <Link to="/" className="back-btn">← Back to Home</Link>
        <h1 className="section-title drift-left">
          Frequently Asked <span className="gradient-text">Questions</span>
        </h1>
        <p className="section-subtitle drift-left" style={{ animationDelay: '0.15s' }}>
          Everything you need to know about ShoesCart
        </p>

        <div className="faq-container">
          {faqs.map((section) => (
            <div key={section.category} className="faq-section drift-up">
              <h2 className="faq-category">{section.category}</h2>
              {section.items.map((faq) => {
                const idx = globalIdx++;
                return (
                  <div key={idx} className={`faq-item ${openIndex === idx ? 'open' : ''}`}>
                    <button className="faq-question" onClick={() => toggle(idx)} id={`faq-${idx}`}>
                      <span>{faq.q}</span>
                      <span className="faq-toggle">{openIndex === idx ? '−' : '+'}</span>
                    </button>
                    <div className="faq-answer">
                      <p>{faq.a}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        <div className="faq-cta drift-up">
          <h3>Still have questions?</h3>
          <p>Our support team is just a click away.</p>
          <Link to="/support/contact" className="btn btn-primary btn-lg drift-glow">Contact Support →</Link>
        </div>
      </div>
    </div>
  );
}

export default FAQ;
