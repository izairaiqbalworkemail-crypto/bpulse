CREATE TABLE IF NOT EXISTS "match_events" (
	"id" uuid PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"input_hash" text NOT NULL,
	"description" text NOT NULL,
	"stage" text,
	"stack" jsonb NOT NULL,
	"urgency" text,
	"results" jsonb NOT NULL,
	"confidence" text NOT NULL,
	"session" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "match_outcomes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"match_event_id" uuid NOT NULL,
	"outcome" text NOT NULL,
	"occurred_at" timestamp with time zone DEFAULT now() NOT NULL
);
