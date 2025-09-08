// Debug script to check Vercel deployment
console.log('Environment check:');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('VITE_API_URL:', import.meta.env.VITE_API_URL);
console.log('MODE:', import.meta.env.MODE);
console.log('BASE_URL:', import.meta.env.BASE_URL);

// Check if DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded successfully');
  const rootElement = document.getElementById('root');
  if (rootElement) {
    console.log('Root element found');
  } else {
    console.error('Root element not found!');
  }
});

// Check if React is loading
window.addEventListener('load', () => {
  console.log('Window loaded');
  setTimeout(() => {
    const reactRoot = document.querySelector('#root > *');
    if (reactRoot) {
      console.log('React app rendered successfully');
    } else {
      console.error('React app failed to render');
    }
  }, 1000);
});
