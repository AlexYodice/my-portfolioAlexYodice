-- ============================================
-- STEP 5: Create Resume Table
-- ============================================
-- Copy this entire file and paste into Supabase SQL Editor
-- Then click "Run"

create table if not exists resume (
  id uuid primary key default gen_random_uuid(),
  file_url text not null,
  file_name text not null,
  updated_at timestamp with time zone default now()
);

-- Create function to update updated_at timestamp
create or replace function update_resume_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Create trigger to auto-update updated_at
drop trigger if exists update_resume_timestamp on resume;
create trigger update_resume_timestamp
  before update on resume
  for each row
  execute function update_resume_updated_at();

-- Verify the table was created
select * from resume;


