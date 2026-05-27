/**
 * Seed first admin user.
 * Usage: node scripts/seed-admin.js <email> <password>
 * Example: node scripts/seed-admin.js admin@iode.in MySecurePass123
 */

const { neon } = require('@neondatabase/serverless');
const bcrypt = require('bcryptjs');
const { randomUUID } = require('crypto');

const DB_URL = process.env.DATABASE_URL;
if (!DB_URL) {
  const envFile = require('fs').existsSync('.env.local')
    ? require('fs').readFileSync('.env.local', 'utf8')
    : '';
  const match = envFile.match(/^DATABASE_URL="?([^"\n]+)"?/m);
  if (match) process.env.DATABASE_URL = match[1].trim();
}

const email = process.argv[2];
const password = process.argv[3];

if (!email || !password) {
  console.error('Usage: node scripts/seed-admin.js <email> <password>');
  process.exit(1);
}

async function main() {
  const sql = neon(process.env.DATABASE_URL);
  const hash = await bcrypt.hash(password, 12);
  const id = randomUUID();

  await sql`
    INSERT INTO admin_users (id, email, password_hash, name, role)
    VALUES (${id}, ${email.toLowerCase()}, ${hash}, 'Admin', 'admin')
    ON CONFLICT (email) DO UPDATE SET password_hash = EXCLUDED.password_hash, updated_at = now()
  `;

  console.log(`✅ Admin user created/updated: ${email}`);
  console.log(`   ID: ${id}`);
  process.exit(0);
}

main().catch(e => { console.error(e.message); process.exit(1); });
