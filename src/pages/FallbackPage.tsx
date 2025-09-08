import React from 'react';

const FallbackPage: React.FC = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif',
      padding: '20px',
      textAlign: 'center'
    }}>
      <h1 style={{ color: '#333', marginBottom: '20px' }}>
        🛍️ EcommerceHub
      </h1>
      <p style={{ color: '#666', marginBottom: '20px' }}>
        Application is loading...
      </p>
      <div style={{ 
        padding: '10px', 
        backgroundColor: '#f5f5f5', 
        borderRadius: '5px',
        marginBottom: '20px' 
      }}>
        <strong>Debug Info:</strong>
        <br />
        Environment: {import.meta.env.MODE}
        <br />
        Base URL: {import.meta.env.BASE_URL}
        <br />
        Timestamp: {new Date().toISOString()}
      </div>
      <p style={{ color: '#999', fontSize: '14px' }}>
        If you see this page, React is working correctly.
        <br />
        The blank page issue might be related to routing or API calls.
      </p>
    </div>
  );
};

export default FallbackPage;
