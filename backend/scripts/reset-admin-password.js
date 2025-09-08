import db from '../config/db.js';
import bcrypt from 'bcrypt';

async function resetAdminPassword() {
  try {
    const newPassword = 'admin123';
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    
    // Update admin user password
    const result = await db('users')
      .where({ username: 'admin' })
      .update({ 
        password: hashedPassword,
        role: 'admin'
      });
    
    if (result > 0) {
      console.log('✅ Admin password reset successfully!');
      console.log('\n🔐 ADMIN LOGIN CREDENTIALS:');
      console.log('Username: admin');
      console.log('Email: admin@example.com');
      console.log('Password: admin123');
      console.log('Role: admin');
      console.log('\n⚠️  Remember to change this password after logging in!');
    } else {
      console.log('❌ No admin user found to update');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error resetting password:', error);
    process.exit(1);
  }
}

resetAdminPassword();
