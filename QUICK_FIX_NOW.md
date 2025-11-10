# 🚨 QUICK FIX - Do This Right Now!

You're getting errors because Supabase isn't set up yet. Follow these steps **in order**:

---

## ✅ Step 1: Create Storage Bucket (Fixes "projects bucket not found")

1. Go to: **https://app.supabase.com**
2. Click on your project (the one with URL: `qarplahyjhdipjjqorfr.supabase.co`)
3. Click **Storage** in the left sidebar
4. Click **"New bucket"** button
5. Name it exactly: `projects` (lowercase, no spaces)
6. **Toggle "Public bucket" to ON** (very important!)
7. Click **"Create bucket"**

✅ **Done!** You should now see a bucket called `projects` in your Storage list.

---

## ✅ Step 2: Set Up Storage Policies (Allows uploads)

1. Still in Supabase, click **SQL Editor** (left sidebar)
2. Click **"New query"**
3. Copy and paste this entire block:

```sql
-- Allow public to view/download images
create policy "Public read access"
on storage.objects for select
to public
using (bucket_id = 'projects');

-- Allow public to upload images (for admin dashboard)
create policy "Public upload access"
on storage.objects for insert
to public
with check (bucket_id = 'projects');

-- Allow public to delete images (for admin dashboard)
create policy "Public delete access"
on storage.objects for delete
to public
using (bucket_id = 'projects');
```

4. Click **"Run"** (or press Ctrl+Enter)
5. You should see: "Success. No rows returned"

✅ **Done!** Storage policies are set up.

---

## ✅ Step 3: Create Profile Table (Fixes 404 bio error)

1. Still in **SQL Editor**, click **"New query"**
2. Copy and paste this entire block:

```sql
-- Create profile table
create table if not exists profile (
  id uuid primary key default gen_random_uuid(),
  bio_text text not null,
  updated_at timestamp with time zone default now()
);

-- Insert default bio if table is empty
insert into profile (bio_text)
select 'I''m Alex, a <span class="yellow">5th year Computer Engineer student </span>
from <span class="yellow"> Puerto Rico.</span>
<br />
<br />
I''m graduating soon and have experience in full-stack development, with a focus on web technologies and projects involving <b class="yellow">HTML, CSS, JavaScript</b> and <b class="yellow">Google Maps API.</b>
<br />
<br />
I am proficient in 
<b class="yellow"> JavaScript </b> and have a solid foundation in languages like C, Python, SQL,
<b class="yellow"> GraphQL, and more.</b>
<br />
<br />
I enjoy working with
<b class="yellow"> Node.js, React.js,</b> and backend technologies like
<b class="yellow"> MongoDB.</b> 
<br />
<br />
I''m also passionate about <b class="yellow">web development, artificial intelligence,</b>
and continuously learning to expand my skillset.
<br />
<br />
In my spare time, I enjoy practicing coding challenges on <b class="yellow">LeetCode</b> and working on projects that push me out of my comfort zone.'
where not exists (select 1 from profile);

-- Create function to update updated_at timestamp
create or replace function update_profile_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Create trigger to auto-update updated_at
drop trigger if exists update_profile_timestamp on profile;
create trigger update_profile_timestamp
  before update on profile
  for each row
  execute function update_profile_updated_at();
```

3. Click **"Run"**
4. You should see: "Success. No rows returned"

✅ **Done!** Profile table is created with default bio.

---

## ✅ Step 4: Set Up Profile Table Permissions

1. Still in **SQL Editor**, click **"New query"**
2. Copy and paste this:

```sql
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
```

3. Click **"Run"**

✅ **Done!** Profile permissions are set up.

---

## ✅ Step 5: Verify Everything Works

1. Go back to your browser (http://localhost:3000)
2. **Refresh the page** (F5 or Ctrl+R)
3. Check the console - errors should be gone!
4. Go to `/admin-login` and try adding a project again

---

## 🎯 What You Just Fixed

- ✅ **Storage bucket created** → You can now upload project images
- ✅ **Storage policies set** → Uploads are allowed
- ✅ **Profile table created** → Bio section will work
- ✅ **Profile permissions set** → Bio can be read and updated

---

## 🧪 Test It Now!

1. **Refresh your homepage** → Bio should load (no more 404 errors)
2. **Go to `/admin-login`** → Login
3. **Click "Projects" tab** → Try adding your project again
4. **Fill in the form** → Click "Add Project"
5. **It should work!** ✅

---

## ⚠️ If You Still Get Errors

**"Bucket not found" error:**
- Make sure the bucket is named exactly `projects` (lowercase)
- Make sure "Public bucket" toggle is ON

**"Permission denied" error:**
- Make sure you ran the storage policies SQL
- Check that policies were created (Storage → projects → Policies)

**404 errors for profile:**
- Make sure you ran the profile table SQL
- Check Table Editor → you should see `profile` table

---

**Need help?** Check the console errors and let me know what they say!


