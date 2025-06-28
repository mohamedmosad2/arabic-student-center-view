
import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p style={{ marginTop: '20px', color: '#666', textAlign: 'center' }}>
        جاري تحميل البيانات...
      </p>
    </div>
  );
};

export default LoadingSpinner;
