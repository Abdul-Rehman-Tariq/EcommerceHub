// Simple health check for Vercel
export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  res.status(200).json({
    success: true,
    message: 'EcommerceHub API is running!',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'production',
    database: process.env.DATABASE_URL ? 'Connected' : 'Not configured',
    vercel: true
  });
}
