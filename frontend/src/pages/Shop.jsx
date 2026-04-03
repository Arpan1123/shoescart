import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const API_URL = '/api';

function Shop({ addToCart, searchQuery }) {
  const [shoes, setShoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || '');
  const [activeBrand, setActiveBrand] = useState(searchParams.get('brand') || '');
  const [sort, setSort] = useState('');
  const [categories] = useState(['All', 'Running', 'Lifestyle', 'Basketball', 'Skateboarding', 'Training']);

  useEffect(() => {
    setActiveCategory(searchParams.get('category') || '');
    setActiveBrand(searchParams.get('brand') || '');
  }, [searchParams]);

  useEffect(() => {
    setLoading(true);
    setLoaded(false);
    const params = new URLSearchParams();
    if (activeCategory && activeCategory !== 'All') params.append('category', activeCategory);
    if (activeBrand) params.append('brand', activeBrand);
    if (sort) params.append('sort', sort);
    if (searchQuery) params.append('search', searchQuery);
    const searchStr = searchParams.get('search');
    if (searchStr && !searchQuery) params.append('search', searchStr);

    fetch(`${API_URL}/shoes?${params}`)
      .then(res => res.json())
      .then(data => {
        setShoes(data.shoes);
        setLoading(false);
        requestAnimationFrame(() => setLoaded(true));
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [activeCategory, activeBrand, sort, searchQuery, searchParams]);

  const handleCategoryClick = (cat) => {
    const val = cat === 'All' ? '' : cat;
    setActiveCategory(val);
    const newParams = new URLSearchParams(searchParams);
    if (val) {
      newParams.set('category', val);
    } else {
      newParams.delete('category');
    }
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setActiveCategory('');
    setActiveBrand('');
    setSort('');
    setSearchParams({});
  };

  return (
    <div className="shop-page" id="shop-page">
      <div className="container">
        <div className="shop-header">
          <h1 className="section-title drift-left">
            {activeBrand || 'All'} <span className="gradient-text">Shoes</span>
          </h1>
          <p className="section-subtitle drift-left" style={{ animationDelay: '0.15s' }}>
            {activeCategory ? `${activeCategory} collection` : 'Browse our entire collection of premium footwear'}
          </p>
        </div>

        <div className="shop-filters" id="shop-filters">
          {categories.map((cat, i) => (
            <button
              key={cat}
              className={`filter-chip drift-chip ${(cat === 'All' && !activeCategory) || activeCategory === cat ? 'active' : ''}`}
              onClick={() => handleCategoryClick(cat)}
              id={`filter-${cat.toLowerCase()}`}
              style={{ animationDelay: `${i * 60}ms` }}
            >
              {cat}
            </button>
          ))}

          {(activeCategory || activeBrand) && (
            <button className="filter-chip" onClick={clearFilters} id="clear-filters" style={{ color: 'var(--accent)' }}>
              ✕ Clear Filters
            </button>
          )}

          <div className="shop-sort">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              id="sort-select"
            >
              <option value="">Sort by</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
              <option value="newest">Newest</option>
            </select>
          </div>
        </div>

        <p className="shop-count">{shoes.length} shoes found</p>

        {loading ? (
          <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '4rem 0' }}>Loading shoes...</p>
        ) : shoes.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 0' }}>
            <p style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</p>
            <h3 style={{ marginBottom: '0.5rem' }}>No shoes found</h3>
            <p style={{ color: 'var(--text-muted)' }}>Try adjusting your filters or search terms</p>
          </div>
        ) : (
          <div className="product-grid" id="product-grid">
            {shoes.map((shoe, i) => (
              <div
                key={shoe.id}
                className={loaded ? 'drift-float' : ''}
                style={{ animationDelay: `${i * 100}ms`, opacity: loaded ? undefined : 0 }}
              >
                <ProductCard shoe={shoe} addToCart={addToCart} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Shop;
