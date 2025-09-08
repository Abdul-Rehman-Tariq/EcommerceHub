import db from '../config/db.js';

async function updateUserRole() {
  try {
    const result = await db('users')
      .where({ username: 'AbdulRehman' })
      .update({ role: 'user' });
    
    console.log(`✅ Updated ${result} user(s) with role 'user'`);
    
    // Verify the update
    const user = await db('users').where({ username: 'AbdulRehman' }).first();
    console.log('👤 User data:', user);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error updating user role:', error);
    process.exit(1);
  }
}

updateUserRole();
