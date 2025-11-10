# Supabase Setup Guide

## Step 1: Create the Projects Table

Go to [Supabase Dashboard → SQL Editor](https://app.supabase.com)

Paste this SQL and click "Run":

```sql
-- Create projects table
create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  github_url text not null,
  live_url text,
  image_url text not null,
  created_at timestamp with time zone default now()
);

-- Add a comment to the table
comment on table projects is 'Stores portfolio projects with images, links, and metadata';
```

## Step 2: Create Storage Bucket for Images

1. Go to **Storage** in the left sidebar
2. Click **"New bucket"**
3. Name it: `projects`
4. Make it **Public** (toggle the "Public bucket" switch ON)
5. Click **"Create bucket"**

## Step 3: Set Up Row Level Security (RLS)

**Important:** Since you're using a custom admin login (not Supabase Auth), we need to allow public access for now. You can add authentication later.

### Option A: Simple Setup (Public Read/Write - for development)

Go to **Database → Table Editor → projects → Policies**

Click **"New Policy"** → **"For full customization"**

Paste this:

```sql
-- Allow everyone to read projects
create policy "Public read access"
on projects for select
to public
using (true);

-- Allow everyone to insert (you'll secure this later)
create policy "Public insert access"
on projects for insert
to public
with check (true);

-- Allow everyone to update (you'll secure this later)
create policy "Public update access"
on projects for update
to public
using (true)
with check (true);

-- Allow everyone to delete (you'll secure this later)
create policy "Public delete access"
on projects for delete
to public
using (true);
```

### Option B: More Secure (Recommended for production)

Use Supabase's anon key restrictions. Your `.env` should have the anon key, and you can add rate limiting later.

Run this SQL:

```sql
-- Enable RLS
alter table projects enable row level security;

-- Allow public read access
create policy "Public read access"
on projects for select
to public
using (true);

-- Allow insert with service role (you'll need to use service role key in admin)
create policy "Service role insert"
on projects for insert
to service_role
with check (true);

-- Allow update with service role
create policy "Service role update"
on projects for update
to service_role
using (true)
with check (true);

-- Allow delete with service role
create policy "Service role delete"
on projects for delete
to service_role
using (true);
```

**Note:** For Option B, you'd need to use the service role key in your admin dashboard (not recommended for client-side code). For now, Option A is simpler for development.

## Step 4: Set Up Storage Policies

1. Go to **Storage → policies → projects bucket**
2. Click **"New Policy"**

**For public read access:**

```sql
-- Allow public to view images
create policy "Public read access"
on storage.objects for select
to public
using (bucket_id = 'projects');
```

**For uploads (you'll need to secure this later):**

```sql
-- Allow public to upload (for development)
create policy "Public upload access"
on storage.objects for insert
to public
with check (bucket_id = 'projects');

-- Allow public to delete (for development)
create policy "Public delete access"
on storage.objects for delete
to public
using (bucket_id = 'projects');
```

## Step 5: Verify Your Setup

After running the above:

1. ✅ Check **Table Editor** → you should see the `projects` table
2. ✅ Check **Storage** → you should see the `projects` bucket
3. ✅ Check **Database → Authentication → Policies** → you should see your policies

## Step 6: Test It!

1. Start your frontend: `npm start`
2. Log into admin dashboard at `/admin-login`
3. Try adding a project
4. Check if it appears on `/project` page

---

## Troubleshooting

**If you get "permission denied" errors:**
- Make sure RLS policies are created correctly
- Check that storage bucket is public
- Verify storage policies allow upload/delete

**If images don't upload:**
- Check storage bucket exists and is named exactly `projects`
- Verify storage policies allow insert
- Check browser console for errors

**If you can't see projects:**
- Verify the table was created
- Check that RLS policy allows SELECT
- Look at browser Network tab to see API responses

