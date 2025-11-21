# Deployment & Login Setup Guide

This guide covers two important aspects of your portfolio website:

1. **Making changes visible across all devices** (deployment)
2. **Moving login credentials to the database** (security improvement)

---

## Part 1: Making Changes Visible Across All Devices

### How It Works

Your website uses **Supabase** as the database backend. This means:

- ✅ **Content changes** (projects, bio, resume) are stored in Supabase
- ✅ When you update content via the admin dashboard, it saves to Supabase
- ✅ Anyone visiting your website gets the **latest data** from Supabase
- ✅ **No redeployment needed** for content changes!

### Current Setup

Based on your `netlify.toml` file, your site appears to be deployed on **Netlify**.

### To Make Changes Visible Everywhere:

#### For Content Changes (Projects, Bio, Resume):
1. Log into your admin dashboard at `/admin-login`
2. Make your changes (add projects, update bio, upload resume)
3. **That's it!** Changes are immediately visible to all visitors
4. No need to push code or redeploy

#### For Code Changes (Components, Styling, Features):
1. Make your code changes locally
2. Test locally: `npm start`
3. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Your change description"
   git push
   ```
4. Netlify will automatically deploy your changes (usually takes 2-5 minutes)
5. Your changes will be live on your website URL

### Testing Your Deployment

1. **Check your Netlify dashboard** to see your site URL
2. **Make a change** in the admin dashboard on one device
3. **Open your website** on another device (or incognito window)
4. **Refresh the page** - you should see the changes!

### Important Notes

- **Content** = Stored in database → Changes instantly visible
- **Code** = Stored in files → Requires git push and deployment
- Always test locally first before pushing to production

---

## Part 2: Moving Login to Database

### What Changed

Previously, your login credentials were **hardcoded** in the application code:
- ❌ Username: `Taylorjmjr1959%`
- ❌ Password: `Taylorjmjr1959_`
- ❌ Stored in `src/pages/AdminLogin.jsx`

Now, credentials are stored **securely in the database**:
- ✅ Username and password hash stored in Supabase
- ✅ More secure and manageable
- ✅ Can add multiple admin users
- ✅ Can change passwords without code changes

### Setup Instructions

#### Step 1: Create the Database Table

1. Go to **Supabase Dashboard**: https://app.supabase.com
2. Select your project
3. Go to **SQL Editor**
4. Open and run: `supabase-setup-6-admin-users-table.sql`
5. Click **Run**

#### Step 2: Set Up Security Policies

1. In **SQL Editor**, open `supabase-setup-2-rls-policies.sql`
2. Scroll to the bottom (Admin Users section)
3. Make sure those policies are created
4. If not, copy and run that section

#### Step 3: Create Your Admin User

**Option A: Use the Helper Tool (Recommended)**

1. Open `setup-admin-user.html` in your browser
2. Enter your username and password
3. Click "Generate SQL"
4. Copy the SQL statement
5. Go to Supabase SQL Editor and run it

**Option B: Use Browser Console**

1. Open your website
2. Press F12 to open Developer Console
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
  console.log(`INSERT INTO admin_users (username, password_hash) VALUES ('${username}', '${hash}');`);
});
```

4. Copy the SQL output
5. Run it in Supabase SQL Editor

#### Step 4: Test Login

1. Go to `/admin-login` on your website
2. Enter your username and password
3. You should be able to log in!

### Changing Your Password

1. Use the helper tool (`setup-admin-user.html`) or browser console to generate a new hash
2. Go to Supabase → **Table Editor** → `admin_users`
3. Find your user and update the `password_hash` field
4. Save

### Adding More Admin Users

Run this SQL (replace with your values):

```sql
INSERT INTO admin_users (username, password_hash) 
VALUES ('new_username', 'hashed_password_here');
```

---

## Quick Checklist

### Deployment Setup
- [ ] Site is deployed on Netlify (or your hosting platform)
- [ ] Netlify is connected to your GitHub repository
- [ ] Auto-deployment is enabled
- [ ] Tested making content changes via admin dashboard
- [ ] Verified changes appear on live site

### Login Database Setup
- [ ] Created `admin_users` table in Supabase
- [ ] Set up RLS policies for `admin_users`
- [ ] Created initial admin user with hashed password
- [ ] Tested login with database credentials
- [ ] Removed/updated old hardcoded credentials (already done in code)

---

## Troubleshooting

### Changes Not Visible on Live Site

**For Content Changes:**
- Check that you clicked "Save" in admin dashboard
- Hard refresh the page (Ctrl+F5 or Cmd+Shift+R)
- Check browser console for errors
- Verify Supabase connection in `.env` file

**For Code Changes:**
- Check Netlify deployment logs
- Verify git push was successful
- Wait a few minutes for deployment to complete
- Check Netlify dashboard for build status

### Login Not Working

- Verify `admin_users` table exists
- Check that you inserted a user with correct username
- Verify password hash was generated correctly
- Check browser console for errors
- Verify Supabase credentials in `.env` file
- Check RLS policies are set up correctly

---

## Next Steps

1. ✅ Set up the admin_users table
2. ✅ Create your admin user
3. ✅ Test login
4. ✅ Make a test change in admin dashboard
5. ✅ Verify it appears on live site
6. ✅ You're all set! 🎉

---

## Need Help?

- Check `ADMIN_LOGIN_SETUP.md` for detailed login setup
- Check `HOW_TO_SETUP.md` for general setup
- Check Supabase dashboard for database issues
- Check Netlify dashboard for deployment issues





