import db from '../config/db.js';

async function showAdminCredentials() {
  try {
    const users = await db('users').select('*');
    
    console.log('=== All Users ===');
    users.forEach(user => {
      console.log(`\n👤 Username: ${user.username}`);
      console.log(`📧 Email: ${user.email}`);
      console.log(`🔑 Role: ${user.role || 'user'}`);
      console.log(`🆔 ID: ${user.id}`);
    });
    
    // Update the first admin user to be admin role
    const adminUser = users.find(u => u.username === 'admin');
    
    if (adminUser) {
      await db('users').where({ id: adminUser.id }).update({ role: 'admin' });
      console.log('\n✅ Updated admin user role to "admin"');
      
      console.log('\n🔐 ADMIN LOGIN CREDENTIALS:');
      console.log('Username: admin');
      console.log('Email: admin@example.com');
      console.log('Password: [Original password when this user was created]');
      console.log('Role: admin');
      console.log('\nℹ️  If you forgot the password, you can reset it by creating a new admin user or checking your registration logs.');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

showAdminCredentials();
