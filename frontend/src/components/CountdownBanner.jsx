import { useState, useEffect } from 'react';

function CountdownBanner() {
  // Set deal end to 2 days from now (resets on page load for demo)
  const [endTime] = useState(() => {
    const saved = localStorage.getItem('shoescart_deal_end');
    if (saved && Number(saved) > Date.now()) return Number(saved);
    const end = Date.now() + 2 * 24 * 60 * 60 * 1000;
    localStorage.setItem('shoescart_deal_end', String(end));
    return end;
  });

  const calcTimeLeft = () => {
    const diff = Math.max(0, endTime - Date.now());
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calcTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calcTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, [endTime]);

  const pad = (n) => String(n).padStart(2, '0');

  return (
    <section className="countdown-banner" id="countdown-banner">
      <div className="countdown-banner-inner">
        <div className="countdown-badge">🔥 FLASH SALE</div>
        <h3 className="countdown-title">
          Up to <span className="gradient-text">40% OFF</span> — Ends Soon!
        </h3>
        <div className="countdown-timer">
          <div className="countdown-unit">
            <span className="countdown-number">{pad(timeLeft.days)}</span>
            <span className="countdown-label">Days</span>
          </div>
          <span className="countdown-sep">:</span>
          <div className="countdown-unit">
            <span className="countdown-number">{pad(timeLeft.hours)}</span>
            <span className="countdown-label">Hours</span>
          </div>
          <span className="countdown-sep">:</span>
          <div className="countdown-unit">
            <span className="countdown-number">{pad(timeLeft.minutes)}</span>
            <span className="countdown-label">Mins</span>
          </div>
          <span className="countdown-sep">:</span>
          <div className="countdown-unit">
            <span className="countdown-number">{pad(timeLeft.seconds)}</span>
            <span className="countdown-label">Secs</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CountdownBanner;
