# 🔍 Check Your Admin User in Database

## Quick Diagnostic

Run this in **Supabase SQL Editor** to see if your user exists:

```sql
-- Check if table exists and see all users
SELECT * FROM public.admin_users;
```

**Expected result:**
- If you see a row with username `al3x` → User exists, password hash might be wrong
- If you see nothing → User doesn't exist, need to create it
- If you get an error → Table doesn't exist, need to create table first

---

## If User Doesn't Exist: Create It Now

### Step 1: Generate Password Hash

1. Open your website
2. Press **F12** (Developer Console)
3. Paste this code:

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
  console.log('Username: al3x');
  console.log('Password: Taylorjmjr1959');
  console.log('Hash:', hash);
  console.log('\nCopy this SQL:');
  console.log(`INSERT INTO public.admin_users (username, password_hash) VALUES ('al3x', '${hash}');`);
});
```

4. Copy the SQL statement from the console

### Step 2: Insert User

1. Go to **Supabase SQL Editor**
2. Paste the SQL you copied
3. Click **Run**
4. Should see: "Success. 1 row inserted"

### Step 3: Verify

Run this again:
```sql
SELECT * FROM public.admin_users;
```

You should now see your user row.

---

## If User Exists But Password Wrong: Update It

1. Generate the hash (use Step 1 above)
2. Run this SQL (replace `YOUR_HASH_HERE` with the hash from console):

```sql
UPDATE public.admin_users 
SET password_hash = 'YOUR_HASH_HERE' 
WHERE username = 'al3x';
```

---

## Test Login Again

1. Refresh your website
2. Go to `/admin-login`
3. Username: `al3x`
4. Password: `Taylorjmjr1959`
5. Click Login

---

## Still Not Working?

Check browser console (F12) for the exact error message. It will tell you:
- `PGRST116` = User not found
- `PGRST205` = Table not found
- Other errors = Different issue

