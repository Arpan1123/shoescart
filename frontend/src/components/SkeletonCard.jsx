function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-image skeleton-shimmer"></div>
      <div className="skeleton-body">
        <div className="skeleton-line skeleton-shimmer" style={{ width: '40%', height: '12px' }}></div>
        <div className="skeleton-line skeleton-shimmer" style={{ width: '75%', height: '16px' }}></div>
        <div className="skeleton-line skeleton-shimmer" style={{ width: '50%', height: '12px' }}></div>
        <div className="skeleton-footer">
          <div className="skeleton-line skeleton-shimmer" style={{ width: '35%', height: '20px' }}></div>
          <div className="skeleton-circle skeleton-shimmer"></div>
        </div>
      </div>
    </div>
  );
}

export default SkeletonCard;
