# NeonDB Structure for University / Course / Fee Management

This structure is optimized for:
- Fast filtering
- Search by university/course/type/duration/fees
- Flexible fee structures
- Future scalability
- Easy admin dashboard integration
- Flutter app API usage
- PostgreSQL + NeonDB optimized

---

# 1. Recommended Database Architecture

Use normalized relational tables.

Avoid:
- Storing everything in one table
- Deep nested JSON only
- Duplicate university/course data

Best approach:
- Core relational tables
- Optional JSONB fields for flexible metadata

---

# 2. Main Tables

## universities

Stores university details.

```sql
CREATE TABLE universities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(50) UNIQUE,
    name VARCHAR(255) NOT NULL,
    short_name VARCHAR(100),
    slug VARCHAR(255) UNIQUE,
    logo_url TEXT,
    website TEXT,
    university_type VARCHAR(100),
    country VARCHAR(100) DEFAULT 'India',
    state VARCHAR(100),
    city VARCHAR(100),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

---

## course_categories

Examples:
- UG
- PG
- Diploma
- MBA
- Certificate

```sql
CREATE TABLE course_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) UNIQUE NOT NULL,
    slug VARCHAR(100) UNIQUE
);
```

---

## courses

Main course table.

```sql
CREATE TABLE courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    university_id UUID REFERENCES universities(id) ON DELETE CASCADE,
    category_id UUID REFERENCES course_categories(id),

    name VARCHAR(255) NOT NULL,
    short_name VARCHAR(100),
    slug VARCHAR(255),

    course_type VARCHAR(100),
    delivery_mode VARCHAR(100),

    duration_years NUMERIC(4,2),
    total_semesters INTEGER,

    eligibility TEXT,
    description TEXT,

    is_online BOOLEAN DEFAULT TRUE,
    is_distance BOOLEAN DEFAULT FALSE,

    tags TEXT[],

    search_vector tsvector,

    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

---

## course_fee_structures

Main fee structure table.

Supports:
- Year-wise fees
- Semester-wise fees
- Registration fees
- Exam fees
- Misc fees

```sql
CREATE TABLE course_fee_structures (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,

    registration_fee NUMERIC(10,2) DEFAULT 0,
    admission_fee NUMERIC(10,2) DEFAULT 0,
    course_fee NUMERIC(10,2) DEFAULT 0,
    exam_fee NUMERIC(10,2) DEFAULT 0,

    yearly_fee NUMERIC(10,2),

    total_fee NUMERIC(10,2),

    currency VARCHAR(10) DEFAULT 'INR',

    emi_available BOOLEAN DEFAULT FALSE,

    metadata JSONB,

    created_at TIMESTAMP DEFAULT NOW()
);
```

---

## course_fee_breakdowns

Flexible breakdown table.

Supports:
- Semester fees
- Year fees
- Custom installment plans

```sql
CREATE TABLE course_fee_breakdowns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    fee_structure_id UUID REFERENCES course_fee_structures(id) ON DELETE CASCADE,

    label VARCHAR(100),
    amount NUMERIC(10,2),

    sort_order INTEGER,

    created_at TIMESTAMP DEFAULT NOW()
);
```

---

# 3. Recommended Search Indexes

Very important for speed.

```sql
CREATE INDEX idx_courses_university ON courses(university_id);
CREATE INDEX idx_courses_category ON courses(category_id);
CREATE INDEX idx_courses_type ON courses(course_type);
CREATE INDEX idx_courses_duration ON courses(duration_years);
CREATE INDEX idx_course_fee_total ON course_fee_structures(total_fee);
```

---

# 4. Full Text Search

For searching:
- MBA
- online mba
- bca
- distance mba kerala
- manipal mba

```sql
UPDATE courses
SET search_vector =
    to_tsvector(
        'english',
        coalesce(name, '') || ' ' ||
        coalesce(short_name, '') || ' ' ||
        coalesce(course_type, '')
    );
```

Index:

```sql
CREATE INDEX idx_courses_search
ON courses
USING GIN(search_vector);
```

Search:

```sql
SELECT *
FROM courses
WHERE search_vector @@ plainto_tsquery('MBA');
```

---

# 5. Best API Filters

This structure supports:

## Filter by university

```sql
WHERE university_id = ?
```

## Filter by course type

```sql
WHERE course_type = 'MBA'
```

## Filter by duration

```sql
WHERE duration_years = 2
```

## Filter by fee range

```sql
WHERE total_fee BETWEEN 50000 AND 200000
```

## Filter by online courses

```sql
WHERE is_online = true
```

---

# 6. Suggested JSON Structure for DB Insert

## University JSON

```json
{
  "name": "Sikkim Manipal University",
  "short_name": "SMU",
  "slug": "sikkim-manipal-university",
  "university_type": "Private"
}
```

---

## Course JSON

```json
{
  "university_slug": "sikkim-manipal-university",
  "name": "Master of Business Administration",
  "short_name": "MBA",
  "course_type": "PG",
  "delivery_mode": "Online",
  "duration_years": 2,
  "total_semesters": 4,
  "tags": ["management", "business", "online"]
}
```

---

## Fee Structure JSON

```json
{
  "course_short_name": "MBA",
  "registration_fee": 1000,
  "admission_fee": 5000,
  "course_fee": 60000,
  "exam_fee": 5000,
  "total_fee": 70000,
  "breakdowns": [
    {
      "label": "Semester 1",
      "amount": 17500
    },
    {
      "label": "Semester 2",
      "amount": 17500
    }
  ]
}
```

---

# 7. Recommended Additional Features

## Add scholarships

```sql
CREATE TABLE scholarships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID REFERENCES courses(id),
    title VARCHAR(255),
    amount NUMERIC(10,2),
    description TEXT
);
```

---

## Add eligibility rules

```sql
CREATE TABLE eligibility_rules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID REFERENCES courses(id),
    minimum_qualification VARCHAR(255),
    minimum_percentage NUMERIC(5,2)
);
```

---

# 8. Recommended Flutter API Response

```json
{
  "course": {
    "name": "MBA",
    "duration_years": 2,
    "delivery_mode": "Online"
  },
  "university": {
    "name": "Sikkim Manipal University"
  },
  "fees": {
    "total_fee": 70000,
    "registration_fee": 1000,
    "breakdowns": [
      {
        "label": "Semester 1",
        "amount": 17500
      }
    ]
  }
}
```

---

# 9. Important Improvements Over Simple Structure

This design avoids:
- Duplicate data
- Difficult filtering
- Hard search queries
- Future migration issues
- Huge JSON documents

This design enables:
- Fast filtering
- Admin dashboard
- Analytics
- Fee comparison
- Multi university support
- AI recommendation systems
- SEO pages
- Easy GraphQL APIs

---

# 10. Suggested Next Step

Your uploaded CSVs should first be converted into:

1. universities.json
2. courses.json
3. fee_structures.json
4. fee_breakdowns.json

Then:
- Import into NeonDB
- Create APIs
- Build filtering APIs
- Add admin panel

---

# 11. Recommended Tech Stack

## Backend

- Node.js + Fastify
OR
- NestJS

## ORM

- Prisma

## DB

- Neon PostgreSQL

## Search

- PostgreSQL Full Text Search

Optional later:
- Meilisearch
- Elasticsearch

---

# 12. Recommended Prisma Model

```prisma
model University {
  id        String   @id @default(uuid())
  name      String
  shortName String?
  slug      String   @unique

  courses   Course[]
}

model Course {
  id             String   @id @default(uuid())
  universityId   String
  name           String
  shortName      String?
  durationYears  Float?

  university     University @relation(fields: [universityId], references: [id])
  feeStructure   CourseFeeStructure?
}
```

---

# 13. Your CSV Files Analysis

Your uploaded files contain:

- Different fee structures per university
- Semester-wise fees
- Year-wise fees
- Registration fees
- Exam fees
- Total fees

Because structures vary between universities, the `course_fee_breakdowns` table is extremely important.

Avoid storing semester columns directly in course table.

Bad:
- sem1_fee
- sem2_fee
- sem3_fee

Good:
- Dynamic breakdown rows

This makes future universities easier to add.

---

# 14. Final Recommended Architecture

Best production setup:

```text
universities
    ↓
courses
    ↓
course_fee_structures
    ↓
course_fee_breakdowns
```

This is scalable, searchable, analytics friendly, and production-ready.

