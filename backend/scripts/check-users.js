import db from '../config/db.js';

async function checkUsers() {
  try {
    const users = await db('users').select('id', 'username', 'email', 'role');
    console.log('=== Current Users ===');
    users.forEach(user => {
      console.log(`ID: ${user.id}, Username: ${user.username}, Email: ${user.email}, Role: ${user.role || 'user'}`);
    });
    
    console.log('\n=== Creating Admin User ===');
    
    // Check if admin exists
    const existingAdmin = users.find(user => user.role === 'admin');
    
    if (!existingAdmin) {
      // Create admin user with known credentials
      const bcrypt = await import('bcrypt');
      const hashedPassword = await bcrypt.hash('admin123', 12);
      
      const [adminUser] = await db('users').insert({
        username: 'admin',
        email: 'admin@ecommerce.com',
        password: hashedPassword,
        role: 'admin'
      }).returning('*');
      
      console.log('✅ Admin user created:');
      console.log('Username: admin');
      console.log('Email: admin@ecommerce.com');
      console.log('Password: admin123');
      console.log('Role: admin');
    } else {
      console.log('ℹ️  Admin user already exists:');
      console.log(`Username: ${existingAdmin.username}`);
      console.log(`Email: ${existingAdmin.email}`);
      console.log('Password: [Check creation logs or reset]');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

checkUsers();
