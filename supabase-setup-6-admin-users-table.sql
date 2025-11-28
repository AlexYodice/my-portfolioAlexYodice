-- ============================================
-- STEP 6: Create Admin Users Table
-- ============================================
-- Copy this entire file and paste into Supabase SQL Editor
-- Then click "Run"
--
-- This table stores admin login credentials securely in the database
-- instead of hardcoding them in the application code.

create table if not exists admin_users (
  id uuid primary key default gen_random_uuid(),
  username text not null unique,
  password_hash text not null,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Create function to update updated_at timestamp
create or replace function update_admin_users_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Create trigger to auto-update updated_at
drop trigger if exists update_admin_users_timestamp on admin_users;
create trigger update_admin_users_timestamp
  before update on admin_users
  for each row
  execute function update_admin_users_updated_at();

-- Insert the default admin user
-- Password: Taylorjmjr1959_ (will be hashed by the application)
-- Note: You should run the setup script to properly hash and insert this
-- For now, this is a placeholder - the actual password hash will be generated
-- by running the setup script or using the admin dashboard

-- Verify the table was created
select * from admin_users;







