CREATE TABLE "admin_users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(255) NOT NULL,
	"password_hash" text NOT NULL,
	"name" varchar(255),
	"role" varchar(50) DEFAULT 'admin',
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "admin_users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "courses" ADD COLUMN "content" text;--> statement-breakpoint
ALTER TABLE "courses" ADD COLUMN "banner_image" text;--> statement-breakpoint
ALTER TABLE "universities" ADD COLUMN "banner_image" text;--> statement-breakpoint
ALTER TABLE "universities" ADD COLUMN "gallery_images" text[];--> statement-breakpoint
ALTER TABLE "universities" ADD COLUMN "highlights" jsonb;--> statement-breakpoint
ALTER TABLE "universities" ADD COLUMN "content" text;