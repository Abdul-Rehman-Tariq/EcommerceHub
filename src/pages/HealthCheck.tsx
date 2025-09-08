import React from 'react';

const HealthCheck: React.FC = () => {
  const [apiStatus, setApiStatus] = React.useState<string>('Checking...');

  React.useEffect(() => {
    // Test if API is accessible
    const testAPI = async () => {
      try {
        const response = await fetch('/api/health');
        if (response.ok) {
          const data = await response.text();
          setApiStatus(`✅ API Working: ${data}`);
        } else {
          setApiStatus(`❌ API Error: ${response.status} ${response.statusText}`);
        }
      } catch (error) {
        setApiStatus(`❌ API Connection Failed: ${error}`);
      }
    };

    testAPI();
  }, []);

  return (
    <div style={{
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      maxWidth: '600px',
      margin: '0 auto'
    }}>
      <h1>🛍️ EcommerceHub - Health Check</h1>
      
      <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f5f5f5', borderRadius: '5px' }}>
        <h3>Frontend Status: ✅ Working</h3>
        <p>If you can see this page, React is working correctly.</p>
      </div>

      <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f5f5f5', borderRadius: '5px' }}>
        <h3>API Status:</h3>
        <p>{apiStatus}</p>
      </div>

      <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f5f5f5', borderRadius: '5px' }}>
        <h3>Environment Info:</h3>
        <ul style={{ textAlign: 'left' }}>
          <li><strong>Mode:</strong> {import.meta.env.MODE}</li>
          <li><strong>Base URL:</strong> {import.meta.env.BASE_URL}</li>
          <li><strong>API URL:</strong> {import.meta.env.VITE_API_URL || 'Not set'}</li>
          <li><strong>Timestamp:</strong> {new Date().toISOString()}</li>
        </ul>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>Next Steps:</h3>
        <ol style={{ textAlign: 'left' }}>
          <li>If API is working, check browser console for React errors</li>
          <li>If API is failing, check Vercel function logs</li>
          <li>Verify environment variables are set in Vercel dashboard</li>
          <li>Check database connection if API endpoints fail</li>
        </ol>
      </div>

      <button 
        onClick={() => window.location.href = '/'}
        style={{
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Try Main App
      </button>
    </div>
  );
};

export default HealthCheck;
