/**
 * IODE Fee Data Import Script
 * Parses 10 university CSV files and seeds staging DB.
 * Run: node scripts/import-fees.js
 */

const { neon } = require('@neondatabase/serverless');
const { randomUUID } = require('crypto');
const fs = require('fs');

const DB_URL =
  'postgresql://neondb_owner:npg_xBHCleUYk93S@ep-purple-rain-a7bomwb8-pooler.ap-southeast-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require';
const sql = neon(DB_URL);

const CSV_DIR = '/Users/mymac/Downloads/IODE';

// ─── HELPERS ───────────────────────────────────────────────────────────────

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function parseFee(val) {
  if (val == null) return null;
  const v = String(val).trim();
  if (!v || v === '-' || v.toUpperCase() === 'COURSE COMPLETED' || v.toUpperCase() === 'NA') return null;
  const cleaned = v.replace(/[₹,\s]/g, '');
  const num = parseFloat(cleaned);
  return isNaN(num) ? null : num;
}

/** Full CSV parser — handles quoted fields containing commas and newlines. */
function parseCSV(filepath) {
  const content = fs.readFileSync(filepath, 'utf8');
  const rows = [];
  let cell = '';
  let inQuotes = false;
  let currentRow = [];

  for (let i = 0; i < content.length; i++) {
    const ch = content[i];
    const next = content[i + 1];

    if (ch === '"') {
      if (inQuotes && next === '"') { cell += '"'; i++; }
      else inQuotes = !inQuotes;
    } else if (ch === ',' && !inQuotes) {
      currentRow.push(cell.trim());
      cell = '';
    } else if ((ch === '\n' || ch === '\r') && !inQuotes) {
      if (ch === '\r' && next === '\n') i++;
      currentRow.push(cell.trim());
      // only keep rows that have at least one non-empty cell
      if (currentRow.some(c => c !== '')) rows.push(currentRow);
      currentRow = [];
      cell = '';
    } else {
      cell += ch;
    }
  }
  if (cell.trim() || currentRow.length) {
    currentRow.push(cell.trim());
    if (currentRow.some(c => c !== '')) rows.push(currentRow);
  }
  return rows;
}

// Strip leading empty column(s) from a row
function strip(row, count = 1) {
  return row.slice(count);
}

/** Determine course level, duration, delivery from name. */
function getCourseInfo(name) {
  const n = name.toUpperCase().trim();

  const oneyear_pg = /^(MASTER OF LIBRARY|MLIS|M\.LIS)/.test(n);
  const oneyear_ug = /^(BACHELOR OF LIBRARY|BLIS|B\.LIS)/.test(n);
  const isPG =
    /^(MBA|MCA|MCOM|M COM|M\.COM|MA |MA\(|MSC|M\.SC|MSW|MASTER)/.test(n) || oneyear_pg;

  if (oneyear_pg) return { courseType: 'PG', durationYears: 1, totalSemesters: 2 };
  if (oneyear_ug) return { courseType: 'UG', durationYears: 1, totalSemesters: 2 };
  if (isPG) return { courseType: 'PG', durationYears: 2, totalSemesters: 4 };
  return { courseType: 'UG', durationYears: 3, totalSemesters: 6 };
}

function getCategory(name) {
  const n = name.toUpperCase().trim();
  if (/^(MBA|BBA|BACHELOR OF BUSINESS|MASTER OF BUSINESS)/.test(n)) return 'Business Administration';
  if (/^(MCA|BCA|BACHELOR OF COMPUTER|MASTER OF COMPUTER)/.test(n)) return 'Computer Applications';
  if (/^(MCOM|M COM|M\.COM|BCOM|B COM|B\.COM|BACHELOR OF COMMERCE|MASTER OF COMMERCE)/.test(n)) return 'Commerce';
  if (/^(MSW|MASTER OF SOCIAL WORK)/.test(n)) return 'Social Work';
  if (/^(MSC|M\.SC|BSC|B\.SC|MASTER OF SCIENCE|BACHELOR OF SCIENCE)/.test(n)) return 'Science';
  if (/(LIBRARY|BLIS|MLIS)/.test(n)) return 'Library Science';
  if (/^(MA |MA\(|MASTER OF ARTS|BA |BA\(|BACHELOR OF ARTS|BACHELOR OF LIBRARY)/.test(n)) return 'Arts & Humanities';
  return 'General';
}

// ─── UNIVERSITY DEFINITIONS ────────────────────────────────────────────────

const UNIVERSITIES = [
  { key: 'amrita',       name: 'Amrita University',              shortName: 'Amrita', code: 'AMRITA',     type: 'Deemed',  state: 'Tamil Nadu',     city: 'Coimbatore', delivery: 'Online'        },
  { key: 'andhra',       name: 'Andhra University',              shortName: 'AU',     code: 'AUDDE',      type: 'State',   state: 'Andhra Pradesh', city: 'Visakhapatnam', delivery: 'ODL'        },
  { key: 'gla',          name: 'GLA University',                 shortName: 'GLA',    code: 'GLA',        type: 'Deemed',  state: 'Uttar Pradesh',  city: 'Mathura',    delivery: 'Online'        },
  { key: 'manipal-jaipur', name: 'Manipal University Jaipur',   shortName: 'MUJ',    code: 'MUJ',        type: 'Deemed',  state: 'Rajasthan',      city: 'Jaipur',     delivery: 'Online'        },
  { key: 'mzu',          name: 'Mizoram University',             shortName: 'MZU',    code: 'MZU',        type: 'Central', state: 'Mizoram',        city: 'Aizawl',     delivery: 'Online'        },
  { key: 'mangalayatan', name: 'Mangalayatan University',        shortName: 'MU',     code: 'MANGALA',    type: 'Private', state: 'Uttar Pradesh',  city: 'Aligarh',    delivery: 'Online'        },
  { key: 'jain',         name: 'JAIN University',                shortName: 'JAIN',   code: 'JAIN-ODL',   type: 'Deemed',  state: 'Karnataka',      city: 'Bangalore',  delivery: 'ODL'           },
  { key: 'sgvu',         name: 'Suresh Gyan Vihar University',   shortName: 'SGVU',   code: 'SGVU',       type: 'Private', state: 'Rajasthan',      city: 'Jaipur',     delivery: 'Online'        },
  { key: 'smu',          name: 'Sikkim Manipal University',      shortName: 'SMU',    code: 'SMU',        type: 'Deemed',  state: 'Sikkim',         city: 'Gangtok',    delivery: 'Center-based'  },
  { key: 'svsu',         name: 'Subharti University',            shortName: 'SVSU',   code: 'SVSU',       type: 'Deemed',  state: 'Uttar Pradesh',  city: 'Meerut',     delivery: 'ODL'           },
];

// ─── CSV PARSERS ───────────────────────────────────────────────────────────

function parseAmrita() {
  const rows = parseCSV(`${CSV_DIR}/AMRITA.xlsx - Fees Structure.csv`);
  const courses = [];
  let regFee = 700;
  let examFeePerSem = 2750;
  let inData = false;

  for (const row of rows) {
    if (row[0] === 'Registration Fee') { regFee = parseFee(row[1]) ?? 700; continue; }
    if (row[0].startsWith('Examination Fee')) { examFeePerSem = parseFee(row[1]) ?? 2750; continue; }
    if (row[0] === 'S. No.') { inData = true; continue; }
    if (!inData) continue;
    if (!row[0] || isNaN(parseInt(row[0]))) continue;

    const name = row[1]?.trim();
    if (!name) continue;
    // Skip continuation rows like "MCA - AI (2,3,4 Sems)"
    if (/\(2[,\-]/.test(name)) continue;

    const info = getCourseInfo(name);
    const semFeeIndian = parseFee(row[2]);
    const totalExamFee = examFeePerSem * info.totalSemesters;
    const courseTotalExclExam = parseFee(row[3]);
    const grandTotal = courseTotalExclExam != null ? courseTotalExclExam + totalExamFee + regFee : null;

    courses.push({
      name,
      registrationFee: regFee,
      admissionFee: 0,
      courseFee: semFeeIndian,
      examFee: totalExamFee,
      yearlyFee: semFeeIndian != null ? semFeeIndian * 2 : null,
      totalFee: grandTotal,
      metadata: {
        semesterFeeIndian: semFeeIndian,
        totalCourseFeeExclExam: courseTotalExclExam,
        examFeePerSemester: examFeePerSem,
        semesterFeeInternational: parseFee(row[4]),
        totalFeeInternational: parseFee(row[5]),
      },
      ...info,
      deliveryMode: 'Online', isOnline: true, isDistance: false,
    });
  }
  return courses;
}

function parseAndhra() {
  const rows = parseCSV(`${CSV_DIR}/ANDHRA STUDENT  FEE.xlsx - Sheet1.csv`);
  const courses = [];
  let inData = false;

  for (const row of rows) {
    const c = row[0] === '' ? strip(row) : row;
    if (c[0] === 'SL NO') { inData = true; continue; }
    if (!inData || !c[0] || isNaN(parseInt(c[0]))) continue;

    const name = c[1]?.trim();
    if (!name) continue;

    const info = getCourseInfo(name);
    courses.push({
      name,
      registrationFee: parseFee(c[2]),
      admissionFee: parseFee(c[5]),   // processing fee
      courseFee: parseFee(c[4]),      // program fee
      examFee: parseFee(c[3]),
      yearlyFee: parseFee(c[6]),      // 1st year fee
      totalFee: parseFee(c[9]),
      metadata: { yr1: parseFee(c[6]), yr2: parseFee(c[7]), yr3: parseFee(c[8]), processingFee: parseFee(c[5]) },
      ...info, deliveryMode: 'ODL', isOnline: false, isDistance: true,
    });
  }
  return courses;
}

function parseGLA() {
  const rows = parseCSV(`${CSV_DIR}/GLA.xlsx - Fee July 2026 Proposed.csv`);
  const courses = [];
  let inFullFee = false;

  for (const row of rows) {
    // detect section
    const joined = row.join(' ');
    if (joined.includes('Full Fee')) { inFullFee = true; continue; }
    if (joined.includes('Semester Mode') || joined.includes('Year Mode')) { inFullFee = false; continue; }
    if (!inFullFee) continue;

    const c = row[0] === '' ? strip(row) : row;
    if (!c[0] || isNaN(parseInt(c[0]))) continue;

    const name = c[1]?.trim();
    if (!name) continue;

    const info = getCourseInfo(name);
    const tuitionFee = parseFee(c[3]);
    const examFee = parseFee(c[4]);
    const alumniFee = parseFee(c[5]);
    const totalFee = parseFee(c[9]); // Total fee including reg+alumni

    courses.push({
      name,
      registrationFee: parseFee(c[2]),
      admissionFee: alumniFee,
      courseFee: tuitionFee,
      examFee: examFee,
      yearlyFee: tuitionFee != null ? tuitionFee / info.durationYears : null,
      totalFee,
      metadata: { alumniFee, totalBeforeDiscount: parseFee(c[6]), discount: parseFee(c[7]), feeAfterDiscount: parseFee(c[8]) },
      ...info, deliveryMode: 'Online', isOnline: true, isDistance: false,
    });
  }
  return courses;
}

function parseManipulJaipur() {
  const rows = parseCSV(`${CSV_DIR}/MANIPAL JAIPUR.xlsx - Sheet1.csv`);
  const courses = [];
  let inData = false;

  for (const row of rows) {
    if (row[0] === 'SL NO') { inData = true; continue; }
    if (!inData) continue;
    if (!row[0] || isNaN(parseInt(row[0]))) continue;

    const name = row[1]?.trim().replace(/\n/g, ' ').replace(/\s+/g, ' ');
    if (!name) continue;

    const info = getCourseInfo(name);
    courses.push({
      name,
      registrationFee: 500,   // application fee
      admissionFee: 0,
      courseFee: parseFee(row[5]),  // total fee (no breakdown)
      examFee: 0,
      yearlyFee: parseFee(row[2]),  // 1st year fee
      totalFee: parseFee(row[5]) != null ? (parseFee(row[5]) + 500) : null,
      metadata: { yr1: parseFee(row[2]), yr2: parseFee(row[3]), yr3: parseFee(row[4]), applicationFee: 500 },
      ...info, deliveryMode: 'Online', isOnline: true, isDistance: false,
    });
  }
  return courses;
}

function parseMZU() {
  const rows = parseCSV(`${CSV_DIR}/MZU STUDENTS FEE.xlsx - Sheet1.csv`);
  const courses = [];
  let inData = false;

  for (const row of rows) {
    if (row[0] === 'SL NO') { inData = true; continue; }
    if (!inData || !row[0] || isNaN(parseInt(row[0]))) continue;

    const name = row[1]?.trim();
    if (!name) continue;

    const info = getCourseInfo(name);
    courses.push({
      name,
      registrationFee: parseFee(row[2]),
      admissionFee: parseFee(row[5]),    // processing fee
      courseFee: parseFee(row[4]),        // program fee
      examFee: parseFee(row[3]),
      yearlyFee: parseFee(row[6]),        // 1st year fee
      totalFee: parseFee(row[9]),
      metadata: { yr1: parseFee(row[6]), yr2: parseFee(row[7]), yr3: parseFee(row[8]) },
      ...info, deliveryMode: 'Online', isOnline: true, isDistance: false,
    });
  }
  return courses;
}

function parseMangalayatan() {
  const rows = parseCSV(`${CSV_DIR}/Mangalayatan Student Fee  - Sheet1.csv`);
  const courses = [];
  let inData = false;

  for (const row of rows) {
    const c = row[0] === '' ? strip(row) : row;
    if (c[0] === 'SL NO') { inData = true; continue; }
    if (!inData || !c[0] || isNaN(parseInt(c[0]))) continue;

    const name = c[1]?.trim();
    if (!name) continue;

    const info = getCourseInfo(name);
    courses.push({
      name,
      registrationFee: parseFee(c[2]),
      admissionFee: 0,
      courseFee: parseFee(c[4]),    // program fee
      examFee: parseFee(c[3]),
      yearlyFee: parseFee(c[5]),    // 1st year fee
      totalFee: parseFee(c[8]),
      metadata: { yr1: parseFee(c[5]), yr2: parseFee(c[6]), yr3: parseFee(c[7]) },
      ...info, deliveryMode: 'Online', isOnline: true, isDistance: false,
    });
  }
  return courses;
}

function parseJAIN() {
  const rows = parseCSV(`${CSV_DIR}/ODL JAIN Student Fee .xlsx - Sheet1.csv`);
  const courses = [];
  let inData = false;

  for (const row of rows) {
    if (row[0] === 'SL NO') { inData = true; continue; }
    if (!inData || !row[0] || isNaN(parseInt(row[0]))) continue;

    const name = row[1]?.trim();
    if (!name) continue;

    const info = getCourseInfo(name);
    courses.push({
      name,
      registrationFee: parseFee(row[2]),
      admissionFee: parseFee(row[5]),      // admission processing fee
      courseFee: parseFee(row[4]),          // course fee
      examFee: parseFee(row[3]),
      yearlyFee: parseFee(row[7]),          // 1st year
      totalFee: parseFee(row[10]),
      metadata: { yr1: parseFee(row[7]), yr2: parseFee(row[8]), yr3: parseFee(row[9]), apprenticeshipFee: parseFee(row[6]) },
      ...info, deliveryMode: 'ODL', isOnline: false, isDistance: true,
    });
  }
  return courses;
}

function parseSGVU() {
  const rows = parseCSV(`${CSV_DIR}/SGVU STUDENT FEE.xlsx - UPDATED.csv`);
  const courses = [];
  let inData = false;

  for (const row of rows) {
    if (row[0] === 'SL NO') { inData = true; continue; }
    if (!inData || !row[0] || isNaN(parseInt(row[0]))) continue;

    const name = row[1]?.trim();
    if (!name) continue;

    const info = getCourseInfo(name);
    const semFees = [row[5], row[6], row[7], row[8], row[9], row[10]].map(parseFee).filter(v => v != null);
    courses.push({
      name,
      registrationFee: 0,
      admissionFee: 0,
      courseFee: parseFee(row[2]),    // program fee (annual course fee)
      examFee: parseFee(row[3]),      // annual exam fee
      yearlyFee: parseFee(row[4]),    // yearly fee = course + exam
      totalFee: parseFee(row[11]),
      metadata: { semFees, annualCourseFee: parseFee(row[2]), annualExamFee: parseFee(row[3]) },
      ...info, deliveryMode: 'Online', isOnline: true, isDistance: false,
    });
  }
  return courses;
}

function parseSMU() {
  const rows = parseCSV(`${CSV_DIR}/SIKKIM MANIPAL CENTER FEE.xlsx - Sheet1.csv`);
  const courses = [];
  let inData = false;

  for (const row of rows) {
    // Strip 2 leading empty columns
    const c = strip(row, 2);
    if (c[0] === 'SL NO') { inData = true; continue; }
    if (!inData || !c[0] || isNaN(parseInt(c[0]))) continue;

    const name = c[1]?.trim();
    if (!name) continue;

    const info = getCourseInfo(name);
    const semFeePerSem = parseFee(c[2]);  // "PROGRAM FEE" = per-semester fee
    const semFees = [c[3], c[4], c[5], c[6], c[7], c[8]].map(parseFee).filter(v => v != null);
    const totalBase = parseFee(c[9]);
    courses.push({
      name,
      registrationFee: 500,  // application fee
      admissionFee: 0,
      courseFee: semFeePerSem,
      examFee: 0,
      yearlyFee: semFeePerSem != null ? semFeePerSem * 2 : null,
      totalFee: totalBase != null ? totalBase + 500 : null,
      metadata: { semFeePerSem, semFees, applicationFee: 500 },
      ...info, deliveryMode: 'Center-based', isOnline: false, isDistance: false,
    });
  }
  return courses;
}

function parseSVSU() {
  const rows = parseCSV(`${CSV_DIR}/SVSU STUDENT FEE  - Sheet1.csv`);
  const courses = [];
  let inData = false;

  for (const row of rows) {
    if (row[0] === 'SL NO') { inData = true; continue; }
    if (!inData) continue;
    // Stop at "Other Fees:" section
    if (row[0].startsWith('Other Fees') || row[0].startsWith('Reappear') || row[0].startsWith('Credit')) break;
    if (!row[0] || isNaN(parseInt(row[0]))) continue;

    const name = row[1]?.trim();
    if (!name) continue;

    const info = getCourseInfo(name);
    courses.push({
      name,
      registrationFee: parseFee(row[2]),
      admissionFee: parseFee(row[3]),   // admission processing fee
      courseFee: parseFee(row[4]),       // course fee
      examFee: parseFee(row[5]),
      yearlyFee: parseFee(row[6]),       // 1st year
      totalFee: parseFee(row[9]),
      metadata: { yr1: parseFee(row[6]), yr2: parseFee(row[7]), yr3: parseFee(row[8]) },
      ...info, deliveryMode: 'ODL', isOnline: false, isDistance: true,
    });
  }
  return courses;
}

// ─── MAIN ──────────────────────────────────────────────────────────────────

async function main() {
  console.log('🚀 Starting IODE fee data import...\n');

  // 1. Insert / find universities
  const uniIds = {};
  for (const u of UNIVERSITIES) {
    const existing = await sql`SELECT id FROM universities WHERE code = ${u.code}`;
    if (existing.length > 0) {
      uniIds[u.key] = existing[0].id;
      console.log(`  ↩ University exists: ${u.name}`);
      continue;
    }
    const [row] = await sql`
      INSERT INTO universities (id, code, name, short_name, slug, university_type, country, state, city, is_active)
      VALUES (${randomUUID()}, ${u.code}, ${u.name}, ${u.shortName}, ${slugify(u.name)},
              ${u.type}, 'India', ${u.state}, ${u.city}, true)
      RETURNING id
    `;
    uniIds[u.key] = row.id;
    console.log(`  ✅ Inserted university: ${u.name}`);
  }

  // 2. Insert / find course categories
  const CATEGORIES = [
    'Business Administration', 'Computer Applications', 'Commerce',
    'Arts & Humanities', 'Science', 'Library Science', 'Social Work', 'General',
  ];
  const catIds = {};
  for (const cat of CATEGORIES) {
    const existing = await sql`SELECT id FROM course_categories WHERE name = ${cat}`;
    if (existing.length > 0) { catIds[cat] = existing[0].id; continue; }
    const [row] = await sql`
      INSERT INTO course_categories (id, name, slug) VALUES (${randomUUID()}, ${cat}, ${slugify(cat)}) RETURNING id
    `;
    catIds[cat] = row.id;
    console.log(`  ✅ Inserted category: ${cat}`);
  }

  // 3. Parse all CSVs
  const allData = [
    { key: 'amrita',         courses: parseAmrita()         },
    { key: 'andhra',         courses: parseAndhra()         },
    { key: 'gla',            courses: parseGLA()            },
    { key: 'manipal-jaipur', courses: parseManipulJaipur()  },
    { key: 'mzu',            courses: parseMZU()            },
    { key: 'mangalayatan',   courses: parseMangalayatan()   },
    { key: 'jain',           courses: parseJAIN()           },
    { key: 'sgvu',           courses: parseSGVU()           },
    { key: 'smu',            courses: parseSMU()            },
    { key: 'svsu',           courses: parseSVSU()           },
  ];

  // Print parse summary before writing to DB
  console.log('\n📋 Parse Summary:');
  for (const { key, courses } of allData) {
    console.log(`  ${key.padEnd(16)} → ${courses.length} courses`);
  }
  console.log('');

  // 4. Insert courses + fee structures
  let totalCourses = 0;
  let totalFeeStructures = 0;

  for (const { key, courses } of allData) {
    const uniId = uniIds[key];
    if (!uniId) { console.warn(`⚠️  No university ID for key: ${key}`); continue; }

    const uni = UNIVERSITIES.find(u => u.key === key);
    console.log(`\n📥 Inserting ${courses.length} courses for ${uni.name}...`);

    for (const course of courses) {
      const catName = getCategory(course.name);
      const catId = catIds[catName] ?? catIds['General'];
      const slug = slugify(`${key}-${course.name}`).substring(0, 255);

      const [courseRow] = await sql`
        INSERT INTO courses (
          id, university_id, category_id, name, slug,
          course_type, delivery_mode, duration_years, total_semesters,
          is_online, is_distance, created_at, updated_at
        ) VALUES (
          ${randomUUID()}, ${uniId}, ${catId}, ${course.name}, ${slug},
          ${course.courseType}, ${course.deliveryMode},
          ${course.durationYears}, ${course.totalSemesters},
          ${course.isOnline}, ${course.isDistance},
          now(), now()
        )
        RETURNING id
      `;
      totalCourses++;

      await sql`
        INSERT INTO course_fee_structures (
          id, course_id, registration_fee, admission_fee, course_fee, exam_fee,
          yearly_fee, total_fee, currency, emi_available, metadata, created_at
        ) VALUES (
          ${randomUUID()}, ${courseRow.id},
          ${course.registrationFee}, ${course.admissionFee},
          ${course.courseFee}, ${course.examFee},
          ${course.yearlyFee}, ${course.totalFee},
          'INR', false, ${JSON.stringify(course.metadata)},
          now()
        )
      `;
      totalFeeStructures++;
      process.stdout.write('.');
    }
    console.log('');
  }

  // 5. Final count verification
  const counts = await sql`
    SELECT
      (SELECT COUNT(*) FROM universities)          AS universities,
      (SELECT COUNT(*) FROM course_categories)     AS categories,
      (SELECT COUNT(*) FROM courses)               AS courses,
      (SELECT COUNT(*) FROM course_fee_structures) AS fee_structures
  `;
  const c = counts[0];

  console.log('\n\n✅ Import complete!');
  console.log(`   Universities     : ${c.universities}`);
  console.log(`   Categories       : ${c.categories}`);
  console.log(`   Courses          : ${c.courses} (inserted ${totalCourses})`);
  console.log(`   Fee Structures   : ${c.fee_structures} (inserted ${totalFeeStructures})`);

  process.exit(0);
}

main().catch(err => {
  console.error('\n❌ Import failed:', err.message);
  console.error(err.stack);
  process.exit(1);
});
