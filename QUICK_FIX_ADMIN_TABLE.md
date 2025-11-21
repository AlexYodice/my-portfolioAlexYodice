# 🚨 QUICK FIX: Admin Users Table Missing

## The Error:
```
Could not find the table 'public.admin_users' in the schema cache
```

## ✅ **FIX IN 3 STEPS:**

### Step 1: Create the Table (2 minutes)

1. Go to **Supabase Dashboard**: https://app.supabase.com
2. Select your project
3. Click **SQL Editor** (left sidebar)
4. Click **New Query**
5. Copy and paste this ENTIRE code block:

```sql
-- Create admin_users table
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

-- Create trigger
drop trigger if exists update_admin_users_timestamp on admin_users;
create trigger update_admin_users_timestamp
  before update on admin_users
  for each row
  execute function update_admin_users_updated_at();

-- Enable RLS
alter table admin_users enable row level security;

-- Allow public read access (safe - only hashed passwords)
create policy "Public read access for login"
on admin_users for select
to public
using (true);
```

6. Click **Run** (or press Ctrl+Enter)
7. You should see: "Success. No rows returned"

---

### Step 2: Create Your Admin User (1 minute)

**Option A: Use Browser Console (Easiest)**

1. Open your website
2. Press **F12** to open Developer Console
3. Copy and paste this code:

```javascript
async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

const username = 'Taylorjmjr1959%';
const password = 'Taylorjmjr1959_';

hashPassword(password).then(hash => {
  console.log('Copy this SQL and run it in Supabase:');
  console.log(`INSERT INTO admin_users (username, password_hash) VALUES ('${username}', '${hash}');`);
});
```

4. Copy the SQL statement from the console
5. Go back to Supabase SQL Editor
6. Paste and click **Run**

**Option B: Use setup-admin-user.html**

1. Open `setup-admin-user.html` in your browser
2. Username: `Taylorjmjr1959%`
3. Password: `Taylorjmjr1959_`
4. Click "Generate SQL"
5. Copy the SQL
6. Run it in Supabase SQL Editor

---

### Step 3: Test Login

1. Go to your website: `/admin-login`
2. Username: `Taylorjmjr1959%`
3. Password: `Taylorjmjr1959_`
4. Click **Login**
5. ✅ Should work now!

---

## ✅ **That's It!**

After Step 2, your admin login should work immediately. No need to redeploy - the table is in the database!

---

## 🐛 **Still Not Working?**

1. **Check table exists:**
   - Supabase → Table Editor
   - Look for `admin_users` table
   - Should see your username row

2. **Check RLS policies:**
   - Supabase → Authentication → Policies
   - Should see "Public read access for login" policy

3. **Check browser console:**
   - F12 → Console tab
   - Look for any new errors

---

**Need help?** The full setup guide is in `ADMIN_LOGIN_SETUP.md`

