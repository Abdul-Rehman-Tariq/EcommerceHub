import 'dotenv/config';
import db from './config/db.js';

async function testConnection() {
  try {
    console.log('Testing database connection...');
    
    // Test basic connection
    await db.raw('SELECT 1 as test');
    console.log('✅ Database connection successful!');
    
    // Check if tables exist
    const tables = await db('information_schema.tables')
      .where('table_schema', 'public')
      .select('table_name');
    
    console.log('📋 Existing tables:', tables.map(t => t.table_name));
    
    if (tables.length === 0) {
      console.log('⚠️  No tables found. Run "npm run migrate" to create tables.');
    }
    
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    console.log('\n💡 Troubleshooting:');
    console.log('1. Make sure PostgreSQL is running');
    console.log('2. Verify your .env file settings');
    console.log('3. Create the database if it doesn\'t exist');
    console.log('4. Check your credentials');
  } finally {
    await db.destroy();
  }
}

testConnection();
