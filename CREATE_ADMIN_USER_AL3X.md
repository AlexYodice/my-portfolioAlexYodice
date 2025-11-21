# 🔐 Create Admin User: al3x

## Quick Setup

### Step 1: Generate Password Hash

**Option A: Browser Console (Fastest)**

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
  console.log('Copy this SQL:');
  console.log(`INSERT INTO admin_users (username, password_hash) VALUES ('al3x', '${hash}');`);
});
```

4. Copy the SQL statement from the console

**Option B: Use generate-admin-hash.html**

1. Open `generate-admin-hash.html` in your browser
2. Username: `al3x`
3. Password: `Taylorjmjr1959`
4. Click "Generate SQL"
5. Copy the SQL

---

### Step 2: Run SQL in Supabase

1. Go to **Supabase Dashboard**: https://app.supabase.com
2. Select your project
3. Go to **SQL Editor**
4. Click **New Query**
5. Paste the SQL you copied (should look like):
   ```sql
   INSERT INTO admin_users (username, password_hash) VALUES ('al3x', 'YOUR_HASH_HERE');
   ```
6. Click **Run**

---

### Step 3: Test Login

1. Go to your website: `/admin-login`
2. **Username:** `al3x`
3. **Password:** `Taylorjmjr1959`
4. Click **Login**
5. ✅ Should work!

---

## ✅ Done!

Your admin credentials:
- **Username:** `al3x`
- **Password:** `Taylorjmjr1959`

