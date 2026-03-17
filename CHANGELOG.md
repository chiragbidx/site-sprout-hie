# Changelog
<!--
  Purpose:
  - Track project change history over time.
  - Record date, summary, and key files touched for each change set.
  - Keep entries append-only (do not delete past entries).
-->

## [2024-05-31] Add CRM Feature for Internal Dashboard

- Added `crm_customers` table to Drizzle schema (`lib/db/schema.ts`) and generated migration (`drizzle/0003_crm_customers.sql`)
- New dashboard feature under `/dashboard/crm` with working server actions (`app/dashboard/crm/actions.tsx`), page (`app/dashboard/crm/page.tsx`), and client UI (`app/dashboard/crm/client.tsx`)
- Integrated CRM into dashboard sidebar (`components/dashboard/sidebar-nav.tsx`)
- Production-ready: supports CRUD for customers (name, email, phone, company, notes), permissioned by team-based roles

Files changed:
- lib/db/schema.ts
- drizzle/0003_crm_customers.sql
- drizzle/meta/_journal.json
- app/dashboard/crm/actions.tsx
- app/dashboard/crm/page.tsx
- app/dashboard/crm/client.tsx
- components/dashboard/sidebar-nav.tsx

## [2024-05-31] Homepage rebranding and CRM positioning

- Refreshed all homepage sections for ClientPilot CRM branding and value proposition
- Updated hero, benefits, feature grid, services, pricing, testimonials, contact, footer, and navbar
- Owner/contact info now reflects Chirag Dodiya (hi@chirag.co)
- CRM dashboard and capabilities now highlighted throughout
- No changes to functional code or route structure

Files changed:
- content/home.ts

[/Changelog]