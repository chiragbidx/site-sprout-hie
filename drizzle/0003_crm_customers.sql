-- 0003_crm_customers.sql

CREATE TABLE IF NOT EXISTS "crm_customers" (
  "id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "team_id" text NOT NULL REFERENCES "teams" ("id") ON DELETE CASCADE,
  "name" text NOT NULL,
  "email" text NOT NULL,
  "phone" text,
  "company" text,
  "notes" text DEFAULT '',
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS "crm_customers_team_email_idx" ON "crm_customers" ("team_id", "email");