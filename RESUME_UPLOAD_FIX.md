# 🔧 Resume Upload Fix - Step by Step Verification

If you're still getting "bucket not found" errors, follow this checklist **in order**:

## ✅ Step 1: Verify the Resume Table Exists

1. Go to: **https://app.supabase.com**
2. Click on your project
3. Click **Table Editor** (left sidebar)
4. **Do you see a table called `resume`?**
   - ✅ **YES** → Go to Step 2
   - ❌ **NO** → Run this SQL in **SQL Editor**:

```sql
create table if not exists resume (
  id uuid primary key default gen_random_uuid(),
  file_url text not null,
  file_name text not null,
  updated_at timestamp with time zone default now()
);

-- Enable RLS
alter table resume enable row level security;

-- Allow public to read resume
create policy "Public read access resume"
on resume for select
to public
using (true);

-- Allow insert
create policy "Public insert access resume"
on resume for insert
to public
with check (true);

-- Allow update
create policy "Public update access resume"
on resume for update
to public
using (true)
with check (true);

-- Allow delete
create policy "Public delete access resume"
on resume for delete
to public
using (true);
```

---

## ✅ Step 2: Verify the Resume Bucket Exists

1. In Supabase Dashboard, click **Storage** (left sidebar)
2. **Do you see a bucket named exactly `resume`?** (lowercase, no spaces)
   - ✅ **YES** → Go to Step 3
   - ❌ **NO** → Create it:
     - Click **"New bucket"**
     - Name: `resume` (exactly, lowercase)
     - **Toggle "Public bucket" to ON** (very important!)
     - Click **"Create bucket"**

---

## ✅ Step 3: Verify Bucket is Public

1. In Storage, find the `resume` bucket
2. **Does it show a "Public" badge or toggle?**
   - ✅ **YES** → Go to Step 4
   - ❌ **NO** → Make it public:
     - Click on the `resume` bucket
     - Click **Settings** tab
     - Toggle **"Public bucket"** to **ON**
     - Click **Save**

---

## ✅ Step 4: Verify Storage Policies Exist

1. Click on the `resume` bucket
2. Click the **"Policies"** tab
3. **Do you see 4 policies?** (SELECT, INSERT, UPDATE, DELETE)
   - ✅ **YES** → Go to Step 5
   - ❌ **NO** → Run this SQL in **SQL Editor**:

```sql
-- Allow public to view/download resume PDFs
create policy "Public read access resume"
on storage.objects for select
to public
using (bucket_id = 'resume');

-- Allow public to upload resume PDFs
create policy "Public upload access resume"
on storage.objects for insert
to public
with check (bucket_id = 'resume');

-- Allow public to delete resume PDFs
create policy "Public delete access resume"
on storage.objects for delete
to public
using (bucket_id = 'resume');

-- Allow public to update resume PDFs
create policy "Public update access resume"
on storage.objects for update
to public
using (bucket_id = 'resume')
with check (bucket_id = 'resume');
```

**Note:** If you get "policy already exists" errors, that's OK - it means they're already set up!

---

## ✅ Step 5: Test the Upload

1. **Refresh your admin dashboard page** (important!)
2. Go to the **Resume** tab
3. Try uploading your resume again
4. **Check the browser console** (F12) for any new error messages

---

## 🐛 Still Not Working?

If it still fails after all steps:

1. **Check the browser console** (F12 → Console tab)
2. Look for the error message - it should now show more details
3. **Take a screenshot** of:
   - The Storage page showing your buckets
   - The Policies tab for the resume bucket
   - The error message in the admin dashboard
4. The error message will now include the exact Supabase error code

---

## 📝 Quick SQL - Copy All at Once

If you want to set everything up at once, run this in Supabase SQL Editor:

```sql
-- 1. Create resume table
create table if not exists resume (
  id uuid primary key default gen_random_uuid(),
  file_url text not null,
  file_name text not null,
  updated_at timestamp with time zone default now()
);

-- 2. Enable RLS on resume table
alter table resume enable row level security;

-- 3. Resume table policies
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

-- 4. Storage policies for resume bucket
-- (Make sure you created the "resume" bucket first in Storage UI!)
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
```

**Remember:** You still need to create the `resume` bucket manually in the Storage UI (it can't be created via SQL).

