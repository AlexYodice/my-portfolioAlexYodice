# 🎯 How to Set Up Your Portfolio (No Local Backend Needed!)

## ⚠️ IMPORTANT: You DON'T need `supabase start`

Supabase runs in the **cloud** - it's already running! You just need to:
1. Set up your database tables (one-time setup)
2. Run your frontend locally

---

## Step 1: Set Up Database in Supabase Dashboard

### A. Create the Table

1. Go to: **https://app.supabase.com**
2. Select your project
3. Click **SQL Editor** (left sidebar)
4. Click **"New query"**
5. Copy and paste this:

```sql
create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  github_url text not null,
  live_url text,
  image_url text not null,
  created_at timestamp with time zone default now()
);
```

6. Click **"Run"** (or press Ctrl+Enter)
7. You should see: "Success. No rows returned"

### B. Create Storage Bucket

1. In Supabase Dashboard, click **Storage** (left sidebar)
2. Click **"New bucket"**
3. Name it: `projects`
4. **Toggle "Public bucket" to ON** (important!)
5. Click **"Create bucket"**

### C. Set Up Permissions (RLS Policies)

1. Go back to **SQL Editor**
2. Copy and paste this entire block:

```sql
-- Enable RLS
alter table projects enable row level security;

-- Allow public to read projects
create policy "Public read access"
on projects for select
to public
using (true);

-- Allow public to insert (for admin dashboard)
create policy "Public insert access"
on projects for insert
to public
with check (true);

-- Allow public to update
create policy "Public update access"
on projects for update
to public
using (true)
with check (true);

-- Allow public to delete
create policy "Public delete access"
on projects for delete
to public
using (true);
```

3. Click **"Run"**

### D. Set Up Storage Policies

1. Still in **SQL Editor**, copy and paste this:

```sql
-- Allow public to view images
create policy "Public read access"
on storage.objects for select
to public
using (bucket_id = 'projects');

-- Allow public to upload images
create policy "Public upload access"
on storage.objects for insert
to public
with check (bucket_id = 'projects');

-- Allow public to delete images
create policy "Public delete access"
on storage.objects for delete
to public
using (bucket_id = 'projects');
```

2. Click **"Run"**

---

## Step 2: Run Your Frontend (That's It!)

Just run this **ONE command**:

```cmd
npm start
```

That's it! No backend command needed. Supabase is already running in the cloud.

---

## Step 3: Test It

1. Go to: http://localhost:3000
2. Navigate to: http://localhost:3000/admin-login
3. Login and try adding a project
4. Check: http://localhost:3000/project

---

## ❌ What NOT to Do

- ❌ Don't run `supabase start` (you don't have Supabase CLI installed, and you don't need it)
- ❌ Don't try to run a local backend server
- ❌ Don't install Docker just for this

## ✅ What You DO Need

- ✅ Supabase account (free)
- ✅ `.env` file with your Supabase URL and key
- ✅ `npm start` to run the frontend

---

## 🐛 Troubleshooting

**"Permission denied" errors?**
- Make sure you ran all the SQL policies (Step 1C and 1D)

**Images don't upload?**
- Check storage bucket is named exactly `projects`
- Make sure it's set to "Public"

**Can't see projects?**
- Check your `.env` file has correct Supabase credentials
- Verify the table was created (go to Table Editor in Supabase)

