CREATE TABLE "ops_audit_log" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"actor" text NOT NULL,
	"action" text NOT NULL,
	"target" text,
	"ip_hash" text,
	"metadata" jsonb
);
--> statement-breakpoint
CREATE TABLE "ops_report_meta" (
	"slug" text PRIMARY KEY NOT NULL,
	"company" text NOT NULL,
	"sent_at" timestamp with time zone,
	"sent_to" text,
	"source_channel" text,
	"status" text DEFAULT 'drafted' NOT NULL,
	"view_count" integer DEFAULT 0 NOT NULL,
	"last_viewed_at" timestamp with time zone
);
