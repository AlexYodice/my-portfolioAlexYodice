# Admin Login Database Setup Guide

## Overview

The admin login credentials are now stored in the Supabase database instead of being hardcoded in the application. This makes it more secure and allows you to manage credentials from the database.

## Setup Steps

### Step 1: Create the Admin Users Table

1. Go to your Supabase dashboard: https://app.supabase.com
2. Click on your project
3. Go to **SQL Editor** (left sidebar)
4. Open and run the file: `supabase-setup-6-admin-users-table.sql`
5. Click **Run**

### Step 2: Set Up RLS Policies

1. In Supabase SQL Editor, open `supabase-setup-2-rls-policies.sql`
2. Scroll to the bottom to find the "Admin Users Table" section
3. Make sure those policies are created (they should be at the end of the file)
4. If not already run, copy and **Run** that section

### Step 3: Create Your First Admin User

You have two options:

#### Option A: Use the Browser Console (Easiest)

1. Open your website in a browser
2. Open the browser's Developer Console (F12)
3. Copy and paste this code:

```javascript
// Hash password function
async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

// Replace these with your desired username and password
const username = 'Taylorjmjr1959%';
const password = 'Taylorjmjr1959_';

// Generate the hash
hashPassword(password).then(hash => {
  console.log('Username:', username);
  console.log('Password Hash:', hash);
  console.log('\nSQL to run in Supabase:');
  console.log(`INSERT INTO admin_users (username, password_hash) VALUES ('${username}', '${hash}');`);
});
```

4. Copy the SQL statement from the console output
5. Go to Supabase SQL Editor and run that INSERT statement

#### Option B: Use Supabase Dashboard Directly

1. Go to Supabase dashboard → **Table Editor**
2. Find the `admin_users` table
3. Click **Insert row**
4. For the password hash, you'll need to generate it first using Option A above
5. Enter:
   - `username`: Your desired username (e.g., `Taylorjmjr1959%`)
   - `password_hash`: The hash generated from Option A
6. Click **Save**

### Step 4: Test the Login

1. Go to your website's `/admin-login` page
2. Enter your username and password
3. You should be able to log in successfully!

## Changing Your Password

To change your password:

1. Generate a new password hash using the browser console method (Option A above)
2. Go to Supabase → Table Editor → `admin_users`
3. Find your user row
4. Update the `password_hash` field with the new hash
5. Save

## Adding Multiple Admin Users

You can add multiple admin users by running additional INSERT statements:

```sql
INSERT INTO admin_users (username, password_hash) 
VALUES ('another_username', 'hashed_password_here');
```

## Security Notes

- Passwords are hashed using SHA-256 before being stored
- Never share your admin credentials
- Consider using stronger passwords
- The admin_users table is readable by the public (for login verification), but only stores hashed passwords, which is safe

## Troubleshooting

### "Invalid credentials" error

- Check that the admin_users table exists
- Verify that you've inserted a user with the correct username
- Make sure the password hash was generated correctly
- Check browser console for any errors

### "Login failed" error

- Check your Supabase connection (verify `.env` file has correct credentials)
- Check browser console for database errors
- Verify RLS policies are set up correctly

### Can't see admin_users table

- Make sure you ran `supabase-setup-6-admin-users-table.sql`
- Refresh the Supabase dashboard
- Check that you're looking at the correct project






