import { Link } from 'react-router-dom';

function SizeGuide() {
  return (
    <div className="support-page" id="sizeguide-page">
      <div className="container">
        <Link to="/" className="back-btn">← Back to Home</Link>
        <h1 className="section-title drift-left">
          Size <span className="gradient-text">Guide</span>
        </h1>
        <p className="section-subtitle drift-left" style={{ animationDelay: '0.15s' }}>
          Find your perfect fit with our brand-specific sizing charts
        </p>

        <div className="info-section drift-up">
          <h2>How to Measure Your Foot</h2>
          <div className="steps-container">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Stand on Paper</h3>
              <p>Place a piece of paper on a hard floor. Stand on it with your heel against a wall.</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Mark & Measure</h3>
              <p>Mark the longest point of your toe on the paper. Measure from the wall edge to the mark in centimeters.</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Find Your Size</h3>
              <p>Use the measurement to find your size in the charts below. If between sizes, we recommend going up.</p>
            </div>
          </div>
        </div>

        <div className="info-section drift-up" style={{ animationDelay: '0.15s' }}>
          <h2>Men's Size Chart</h2>
          <div className="info-table-wrap">
            <table className="info-table">
              <thead>
                <tr>
                  <th>India / UK</th>
                  <th>US</th>
                  <th>EU</th>
                  <th>Foot Length (cm)</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>6</td><td>7</td><td>39.5</td><td>24.5</td></tr>
                <tr><td>7</td><td>8</td><td>41</td><td>25.5</td></tr>
                <tr><td>8</td><td>9</td><td>42</td><td>26.5</td></tr>
                <tr><td>9</td><td>10</td><td>43</td><td>27.5</td></tr>
                <tr><td>10</td><td>11</td><td>44.5</td><td>28.5</td></tr>
                <tr><td>11</td><td>12</td><td>45.5</td><td>29.5</td></tr>
                <tr><td>12</td><td>13</td><td>47</td><td>30.5</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="info-section drift-up" style={{ animationDelay: '0.2s' }}>
          <h2>Women's Size Chart</h2>
          <div className="info-table-wrap">
            <table className="info-table">
              <thead>
                <tr>
                  <th>India / UK</th>
                  <th>US</th>
                  <th>EU</th>
                  <th>Foot Length (cm)</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>3</td><td>5</td><td>35.5</td><td>22</td></tr>
                <tr><td>4</td><td>6</td><td>36.5</td><td>23</td></tr>
                <tr><td>5</td><td>7</td><td>38</td><td>24</td></tr>
                <tr><td>6</td><td>8</td><td>39</td><td>25</td></tr>
                <tr><td>7</td><td>9</td><td>40.5</td><td>26</td></tr>
                <tr><td>8</td><td>10</td><td>41.5</td><td>27</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="info-section drift-up" style={{ animationDelay: '0.25s' }}>
          <h2>Brand-Specific Tips</h2>
          <div className="info-cards-grid" style={{ marginTop: 'var(--spacing-xl)' }}>
            <div className="info-card">
              <h3>Nike</h3>
              <p>Nike shoes tend to run slightly narrow. If you have wide feet, consider going up half a size. Air Max and Dunk models are true to size.</p>
            </div>
            <div className="info-card">
              <h3>Adidas</h3>
              <p>Adidas Ultraboost runs true to size. Samba and Gazelle models tend to run slightly small — go up half a size for a comfortable fit.</p>
            </div>
            <div className="info-card">
              <h3>New Balance</h3>
              <p>New Balance 990 and 574 are true to size. Available in multiple widths (D for standard, 2E for wide, 4E for extra wide).</p>
            </div>
            <div className="info-card">
              <h3>Converse & Vans</h3>
              <p>Both brands run about half a size large. We recommend going down half a size from your usual for the best fit.</p>
            </div>
          </div>
        </div>

        <div className="faq-cta drift-up">
          <h3>Still unsure about your size?</h3>
          <p>Our team can help you pick the right size. Free exchanges on all orders!</p>
          <Link to="/support/contact" className="btn btn-primary btn-lg drift-glow">Get Help →</Link>
        </div>
      </div>
    </div>
  );
}

export default SizeGuide;
