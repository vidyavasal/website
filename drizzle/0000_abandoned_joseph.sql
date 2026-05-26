CREATE TABLE "course_categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(100) NOT NULL,
	"slug" varchar(100),
	CONSTRAINT "course_categories_name_unique" UNIQUE("name"),
	CONSTRAINT "course_categories_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "course_fee_breakdowns" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"fee_structure_id" uuid,
	"label" varchar(100),
	"amount" numeric(10, 2),
	"sort_order" integer,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "course_fee_structures" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"course_id" uuid,
	"registration_fee" numeric(10, 2) DEFAULT '0',
	"admission_fee" numeric(10, 2) DEFAULT '0',
	"course_fee" numeric(10, 2) DEFAULT '0',
	"exam_fee" numeric(10, 2) DEFAULT '0',
	"yearly_fee" numeric(10, 2),
	"total_fee" numeric(10, 2),
	"currency" varchar(10) DEFAULT 'INR',
	"emi_available" boolean DEFAULT false,
	"metadata" jsonb,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "courses" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"university_id" uuid,
	"category_id" uuid,
	"name" varchar(255) NOT NULL,
	"short_name" varchar(100),
	"slug" varchar(255),
	"course_type" varchar(100),
	"delivery_mode" varchar(100),
	"duration_years" numeric(4, 2),
	"total_semesters" integer,
	"eligibility" text,
	"description" text,
	"is_online" boolean DEFAULT true,
	"is_distance" boolean DEFAULT false,
	"tags" text[],
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "universities" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"code" varchar(50),
	"name" varchar(255) NOT NULL,
	"short_name" varchar(100),
	"slug" varchar(255),
	"logo_url" text,
	"website" text,
	"university_type" varchar(100),
	"country" varchar(100) DEFAULT 'India',
	"state" varchar(100),
	"city" varchar(100),
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "universities_code_unique" UNIQUE("code"),
	CONSTRAINT "universities_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
ALTER TABLE "course_fee_breakdowns" ADD CONSTRAINT "course_fee_breakdowns_fee_structure_id_course_fee_structures_id_fk" FOREIGN KEY ("fee_structure_id") REFERENCES "public"."course_fee_structures"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "course_fee_structures" ADD CONSTRAINT "course_fee_structures_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "courses" ADD CONSTRAINT "courses_university_id_universities_id_fk" FOREIGN KEY ("university_id") REFERENCES "public"."universities"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "courses" ADD CONSTRAINT "courses_category_id_course_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."course_categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_course_fee_total" ON "course_fee_structures" USING btree ("total_fee");--> statement-breakpoint
CREATE INDEX "idx_courses_university" ON "courses" USING btree ("university_id");--> statement-breakpoint
CREATE INDEX "idx_courses_category" ON "courses" USING btree ("category_id");--> statement-breakpoint
CREATE INDEX "idx_courses_type" ON "courses" USING btree ("course_type");--> statement-breakpoint
CREATE INDEX "idx_courses_duration" ON "courses" USING btree ("duration_years");--> statement-breakpoint
CREATE INDEX "idx_universities_slug" ON "universities" USING btree ("slug");