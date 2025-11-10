-- ============================================
-- COMPLETE RESUME SETUP - RUN THIS IN SUPABASE SQL EDITOR
-- ============================================
-- Copy ALL of this and paste into Supabase SQL Editor, then click "Run"

-- Step 1: Create the resume table
create table if not exists resume (
  id uuid primary key default gen_random_uuid(),
  file_url text not null,
  file_name text not null,
  updated_at timestamp with time zone default now()
);

-- Step 2: Enable Row Level Security
alter table resume enable row level security;

-- Step 3: Create table policies (allow public access)
drop policy if exists "Public read access resume" on resume;
create policy "Public read access resume"
on resume for select
to public
using (true);

drop policy if exists "Public insert access resume" on resume;
create policy "Public insert access resume"
on resume for insert
to public
with check (true);

drop policy if exists "Public update access resume" on resume;
create policy "Public update access resume"
on resume for update
to public
using (true)
with check (true);

drop policy if exists "Public delete access resume" on resume;
create policy "Public delete access resume"
on resume for delete
to public
using (true);

-- Step 4: Create storage policies for resume bucket
-- NOTE: You must create the "resume" bucket in Storage UI first!
drop policy if exists "Public read access resume" on storage.objects;
create policy "Public read access resume"
on storage.objects for select
to public
using (bucket_id = 'resume');

drop policy if exists "Public upload access resume" on storage.objects;
create policy "Public upload access resume"
on storage.objects for insert
to public
with check (bucket_id = 'resume');

drop policy if exists "Public delete access resume" on storage.objects;
create policy "Public delete access resume"
on storage.objects for delete
to public
using (bucket_id = 'resume');

drop policy if exists "Public update access resume" on storage.objects;
create policy "Public update access resume"
on storage.objects for update
to public
using (bucket_id = 'resume')
with check (bucket_id = 'resume');

-- Verify the table was created
select 'Resume table created successfully!' as status;
select count(*) as resume_count from resume;

