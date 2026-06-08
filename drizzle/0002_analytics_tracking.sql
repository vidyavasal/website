CREATE TABLE "leads" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255),
	"phone" varchar(30),
	"email" varchar(255),
	"message" text,
	"source" varchar(60),
	"status" varchar(30) DEFAULT 'new',
	"visitor_id" uuid,
	"university_id" uuid,
	"course_id" uuid,
	"utm_source" varchar(120),
	"utm_medium" varchar(120),
	"utm_campaign" varchar(120),
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "page_views" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"visitor_id" uuid,
	"event" varchar(40) DEFAULT 'page_view',
	"path" text,
	"entity_type" varchar(20),
	"entity_id" uuid,
	"referrer" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "visitors" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"country" varchar(2),
	"city" varchar(120),
	"region" varchar(120),
	"device" varchar(20),
	"browser" varchar(60),
	"os" varchar(60),
	"referrer" text,
	"landing_path" text,
	"utm_source" varchar(120),
	"utm_medium" varchar(120),
	"utm_campaign" varchar(120),
	"visit_count" integer DEFAULT 1,
	"first_seen" timestamp DEFAULT now(),
	"last_seen" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "leads" ADD CONSTRAINT "leads_visitor_id_visitors_id_fk" FOREIGN KEY ("visitor_id") REFERENCES "public"."visitors"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "leads" ADD CONSTRAINT "leads_university_id_universities_id_fk" FOREIGN KEY ("university_id") REFERENCES "public"."universities"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "leads" ADD CONSTRAINT "leads_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "page_views" ADD CONSTRAINT "page_views_visitor_id_visitors_id_fk" FOREIGN KEY ("visitor_id") REFERENCES "public"."visitors"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_leads_status" ON "leads" USING btree ("status");--> statement-breakpoint
CREATE INDEX "idx_leads_created" ON "leads" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "idx_leads_visitor" ON "leads" USING btree ("visitor_id");--> statement-breakpoint
CREATE INDEX "idx_leads_phone" ON "leads" USING btree ("phone");--> statement-breakpoint
CREATE INDEX "idx_page_views_visitor" ON "page_views" USING btree ("visitor_id");--> statement-breakpoint
CREATE INDEX "idx_page_views_entity" ON "page_views" USING btree ("entity_type","entity_id");--> statement-breakpoint
CREATE INDEX "idx_page_views_created" ON "page_views" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "idx_page_views_event" ON "page_views" USING btree ("event");--> statement-breakpoint
CREATE INDEX "idx_visitors_last_seen" ON "visitors" USING btree ("last_seen");--> statement-breakpoint
CREATE INDEX "idx_visitors_utm_source" ON "visitors" USING btree ("utm_source");