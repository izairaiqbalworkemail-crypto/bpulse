CREATE TABLE IF NOT EXISTS "submissions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"type" text NOT NULL,
	"source" text,
	"payload" jsonb NOT NULL,
	"email" text,
	"status" text DEFAULT 'received' NOT NULL,
	"budget" text,
	"timeline" text,
	"state" text,
	"request_id" text NOT NULL,
	CONSTRAINT "submissions_request_id_unique" UNIQUE("request_id")
);
