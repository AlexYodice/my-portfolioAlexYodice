# 🔍 Verify & Fix: admin_users Table Missing

## The Error:
```
Could not find the table 'public.admin_users' in the schema cache
GET .../admin_users ... 404 (Not Found)
```

This means Supabase can't find the table. Let's verify and fix it.

---

## ✅ **STEP 1: Check if Table Exists**

1. Go to **Supabase Dashboard**: https://app.supabase.com
2. Select your project
3. Click **Table Editor** (left sidebar)
4. Look for `admin_users` in the list

**If you DON'T see it:** The table wasn't created. Go to Step 2.

**If you DO see it:** The schema cache might be stale. Go to Step 3.

---

## ✅ **STEP 2: Create the Table (If Missing)**

1. Go to **SQL Editor** in Supabase
2. Click **New Query**
3. Copy and paste this **ENTIRE** block:

```sql
-- Create admin_users table
create table if not exists public.admin_users (
  id uuid primary key default gen_random_uuid(),
  username text not null unique,
  password_hash text not null,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Create function to update updated_at timestamp
create or replace function public.update_admin_users_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Create trigger
drop trigger if exists update_admin_users_timestamp on public.admin_users;
create trigger update_admin_users_timestamp
  before update on public.admin_users
  for each row
  execute function public.update_admin_users_updated_at();

-- Enable RLS
alter table public.admin_users enable row level security;

-- Allow public read access (safe - only hashed passwords)
drop policy if exists "Public read access for login" on public.admin_users;
create policy "Public read access for login"
on public.admin_users for select
to public
using (true);
```

4. Click **Run**
5. You should see: "Success. No rows returned"

---

## ✅ **STEP 3: Refresh Schema Cache (If Table Exists)**

If the table exists but you still get the error, Supabase's schema cache might be stale:

1. Go to **Supabase Dashboard** → **Settings** (gear icon)
2. Click **API** (left sidebar)
3. Scroll down and look for **"Refresh Schema Cache"** or **"Reload Schema"**
4. Click it (if available)

**OR** try this in SQL Editor:

```sql
-- Force schema refresh
NOTIFY pgrst, 'reload schema';
```

**OR** wait 1-2 minutes - Supabase auto-refreshes periodically

---

## ✅ **STEP 4: Verify Table Was Created**

Run this in SQL Editor:

```sql
-- Check if table exists
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name = 'admin_users';
```

**Expected result:** Should return one row with `admin_users`

If it returns nothing, the table wasn't created. Go back to Step 2.

---

## ✅ **STEP 5: Create Your Admin User**

After the table is created, create your user:

1. Open your website
2. Press **F12** (Developer Console)
3. Paste this:

```javascript
async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}
hashPassword('Taylorjmjr1959').then(hash => {
  console.log('Copy this SQL:');
  console.log(`INSERT INTO public.admin_users (username, password_hash) VALUES ('al3x', '${hash}');`);
});
```

4. Copy the SQL from console
5. Run it in Supabase SQL Editor

---

## ✅ **STEP 6: Test Again**

1. Refresh your website
2. Go to `/admin-login`
3. Username: `al3x`
4. Password: `Taylorjmjr1959`
5. Click Login

---

## 🐛 **Still Not Working?**

### Check These:

1. **Wrong Project?**
   - Make sure you're in the correct Supabase project
   - Check the URL in your `.env` file matches your Supabase project URL

2. **Table in Wrong Schema?**
   - The table must be in `public` schema
   - Run: `SELECT * FROM public.admin_users;` in SQL Editor

3. **RLS Blocking?**
   - Check RLS is enabled: `SELECT tablename, rowsecurity FROM pg_tables WHERE tablename = 'admin_users';`
   - Should show `rowsecurity = true`

4. **Network Issue?**
   - Check browser console for CORS errors
   - Verify Supabase URL in `.env` is correct

---

## 📝 **Quick Checklist:**

- [ ] Table exists in Supabase Table Editor
- [ ] Table is in `public` schema
- [ ] RLS is enabled on the table
- [ ] Public read policy exists
- [ ] Admin user row exists in the table
- [ ] Supabase project URL matches your `.env` file
- [ ] Waited 1-2 minutes after creating table (cache refresh)

---

**Need more help?** Check the Supabase logs in Dashboard → Logs → Postgres Logs


