// Quick deployment readiness check
console.log('🔍 Checking deployment readiness...\n');

const fs = require('fs');
const path = require('path');

let allGood = true;

// Check required files
const requiredFiles = [
  'vercel.json',
  'package.json', 
  'api/index.js',
  '.gitignore'
];

console.log('📁 Checking required files:');
requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`  ✅ ${file}`);
  } else {
    console.log(`  ❌ ${file} - MISSING`);
    allGood = false;
  }
});

// Check package.json has required scripts
console.log('\n📋 Checking package.json scripts:');
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const requiredScripts = ['build', 'dev'];

requiredScripts.forEach(script => {
  if (pkg.scripts && pkg.scripts[script]) {
    console.log(`  ✅ ${script}: ${pkg.scripts[script]}`);
  } else {
    console.log(`  ❌ ${script} script - MISSING`);
    allGood = false;
  }
});

// Check dependencies
console.log('\n📦 Checking key dependencies:');
const requiredDeps = ['react', 'express', 'pg', 'knex'];

requiredDeps.forEach(dep => {
  if (pkg.dependencies && pkg.dependencies[dep]) {
    console.log(`  ✅ ${dep}: ${pkg.dependencies[dep]}`);
  } else {
    console.log(`  ❌ ${dep} - MISSING`);
    allGood = false;
  }
});

console.log('\n' + '='.repeat(50));

if (allGood) {
  console.log('🎉 READY FOR DEPLOYMENT!');
  console.log('📝 Next steps:');
  console.log('   1. Push to GitHub repository');
  console.log('   2. Connect repository to Vercel');
  console.log('   3. Add environment variables');
  console.log('   4. Deploy!');
} else {
  console.log('❌ NOT READY - Please fix the issues above');
}

console.log('\nFor detailed instructions, see GITHUB-DEPLOY.md');
