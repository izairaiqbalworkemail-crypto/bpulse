CREATE TABLE "reads" (
	"token" uuid PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"source" text NOT NULL,
	"email" text,
	"title" text NOT NULL,
	"document" jsonb NOT NULL
);
