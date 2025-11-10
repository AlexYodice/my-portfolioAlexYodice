-- ============================================
-- STEP 2: Row Level Security Policies
-- ============================================
-- Copy this entire file and paste into Supabase SQL Editor
-- Run each policy one by one, or run all at once

-- Enable RLS on the table
alter table projects enable row level security;

-- Allow everyone to read/view projects (public can see your portfolio)
create policy "Public read access"
on projects for select
to public
using (true);

-- Allow insert (for admin dashboard - you'll secure this later)
create policy "Public insert access"
on projects for insert
to public
with check (true);

-- Allow update (for admin dashboard)
create policy "Public update access"
on projects for update
to public
using (true)
with check (true);

-- Allow delete (for admin dashboard)
create policy "Public delete access"
on projects for delete
to public
using (true);

-- ============================================
-- RLS Policies for Profile Table
-- ============================================

-- Enable RLS on profile table
alter table profile enable row level security;

-- Allow everyone to read profile (public can see your bio)
create policy "Public read access"
on profile for select
to public
using (true);

-- Allow update (for admin dashboard)
create policy "Public update access"
on profile for update
to public
using (true)
with check (true);

-- ============================================
-- RLS Policies for Resume Table
-- ============================================

-- Enable RLS on resume table
alter table resume enable row level security;

-- Allow everyone to read resume (public can see your resume)
create policy "Public read access"
on resume for select
to public
using (true);

-- Allow insert (for admin dashboard)
create policy "Public insert access"
on resume for insert
to public
with check (true);

-- Allow update (for admin dashboard)
create policy "Public update access"
on resume for update
to public
using (true)
with check (true);

-- Allow delete (for admin dashboard)
create policy "Public delete access"
on resume for delete
to public
using (true);

