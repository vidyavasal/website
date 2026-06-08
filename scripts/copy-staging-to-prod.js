/**
 * Copies ALL data from staging DB → production DB.
 * Strategy: TRUNCATE production tables (CASCADE), then insert all staging rows.
 * Run: node scripts/copy-staging-to-prod.js
 */

const { neon } = require('@neondatabase/serverless');
const fs = require('fs');

// Read env from .env.local if not set
const envFile = fs.existsSync('.env.local') ? fs.readFileSync('.env.local', 'utf8') : '';
function getEnv(key) {
  if (process.env[key]) return process.env[key];
  const m = envFile.match(new RegExp(`^${key}="?([^"\\n]+)"?`, 'm'));
  return m ? m[1].trim() : null;
}

const STAGING_URL = getEnv('DATABASE_URL');
const PROD_URL    = getEnv('DATABASE_URL_PRODUCTION');

if (!STAGING_URL || !PROD_URL) {
  console.error('Missing DATABASE_URL or DATABASE_URL_PRODUCTION in .env.local');
  process.exit(1);
}

const staging = neon(STAGING_URL);
const prod    = neon(PROD_URL);

// Insert order respects FK dependencies
const TABLES = [
  'admin_users',
  'universities',
  'course_categories',
  'courses',
  'course_fee_structures',
  'course_fee_breakdowns',
];

function cols(row) {
  return Object.keys(row);
}

function placeholders(row, offset = 0) {
  return Object.keys(row).map((_, i) => `$${i + 1 + offset}`).join(', ');
}

async function copyTable(name) {
  const rows = await staging`SELECT * FROM ${staging.unsafe(name)}`;
  if (rows.length === 0) {
    console.log(`  ${name}: 0 rows — skipped`);
    return;
  }

  const columns = cols(rows[0]);
  const colList = columns.map(c => `"${c}"`).join(', ');

  // Batch insert in chunks of 100
  const CHUNK = 100;
  let inserted = 0;
  for (let i = 0; i < rows.length; i += CHUNK) {
    const chunk = rows.slice(i, i + CHUNK);
    // Build multi-row VALUES
    const values = [];
    const params = [];
    chunk.forEach((row, ri) => {
      const ph = columns.map((_, ci) => `$${ri * columns.length + ci + 1}`).join(', ');
      values.push(`(${ph})`);
      columns.forEach(c => params.push(row[c] ?? null));
    });
    const sql = `INSERT INTO "${name}" (${colList}) VALUES ${values.join(', ')}`;
    await prod.unsafe(sql, params);
    inserted += chunk.length;
  }
  console.log(`  ${name}: ${inserted} rows copied`);
}

async function main() {
  console.log('\n=== Staging → Production data copy ===\n');

  // Step 1: Truncate all production tables (CASCADE handles FK order)
  console.log('Truncating production tables...');
  const truncateList = [...TABLES].reverse().map(t => `"${t}"`).join(', ');
  await prod.unsafe(`TRUNCATE TABLE ${truncateList} RESTART IDENTITY CASCADE`);
  console.log('  Done.\n');

  // Step 2: Copy each table from staging → production
  console.log('Copying data...');
  for (const table of TABLES) {
    await copyTable(table);
  }

  console.log('\n✅ All tables copied successfully.\n');
}

main().catch(e => {
  console.error('\n❌ Error:', e.message);
  process.exit(1);
});
