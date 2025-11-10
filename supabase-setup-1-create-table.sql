-- ============================================
-- STEP 1: Create Projects Table
-- ============================================
-- Copy this entire file and paste into Supabase SQL Editor
-- Then click "Run"

create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  github_url text not null,
  live_url text,
  image_url text not null,
  created_at timestamp with time zone default now()
);

-- Verify the table was created
select * from projects limit 1;

