# Dynamic Admin Dashboard Setup Guide

## 🎉 What's New

Your admin dashboard now has **FULL CONTROL** over your portfolio:
- ✅ **Projects** - Add, edit, delete projects (already working)
- ✅ **Bio** - Edit your bio text dynamically
- ✅ **Resume** - Upload and change your resume PDF

**All changes are INSTANT** - no need to redeploy! Just refresh the page to see your changes.

---

## 📋 Setup Steps

### Step 1: Set Up Database Tables

1. Go to your Supabase dashboard: https://app.supabase.com
2. Click on your project
3. Go to **SQL Editor** (left sidebar)
4. Run these SQL files **in order**:

   **a) Create Profile Table:**
   - Copy and paste the contents of `supabase-setup-4-profile-table.sql`
   - Click **Run**
   
   **b) Create Resume Table:**
   - Copy and paste the contents of `supabase-setup-5-resume-table.sql`
   - Click **Run**

### Step 2: Update Row Level Security (RLS) Policies

1. In Supabase SQL Editor, open `supabase-setup-2-rls-policies.sql`
2. Copy the **NEW sections** (Profile and Resume policies) - they're at the bottom
3. Paste and **Run** in SQL Editor

### Step 3: Create Resume Storage Bucket

1. In Supabase dashboard, go to **Storage** (left sidebar)
2. Click **New bucket**
3. Name it: `resume`
4. **Toggle ON** "Public bucket"
5. Click **Create bucket**

### Step 4: Set Up Storage Policies for Resume

1. In Supabase SQL Editor, open `supabase-setup-3-storage-policies.sql`
2. Copy the **NEW sections** (Resume storage policies) - they're at the bottom
3. Paste and **Run** in SQL Editor

---

## 🚀 How to Use

### Accessing Admin Dashboard

1. Go to your website
2. Click the **settings icon** (⚙️) on the Resume page, OR
3. Navigate to `/admin-login` directly
4. Login with your credentials
5. You'll see **3 tabs**: Projects, Bio, Resume

### Managing Bio

1. Click the **Bio** tab
2. Edit the text in the textarea (you can use HTML)
3. Click **Save Bio**
4. **Refresh your homepage** - changes are live!

### Managing Resume

1. Click the **Resume** tab
2. Click **Choose File** and select a PDF
3. Click **Upload Resume**
4. **Refresh your resume page** - new PDF is live!

### Managing Projects

1. Click the **Projects** tab
2. Add, edit, or delete projects as before
3. Changes are instant!

---

## 🧪 Testing Your Changes

### Option 1: Test Locally (Recommended First)

1. **Start your frontend:**
   ```bash
   npm start
   ```
   OR use: `start-frontend.cmd`

2. **Open browser:** http://localhost:3000

3. **Make changes in admin dashboard:**
   - Go to `/admin-login`
   - Login
   - Make changes (bio, resume, projects)

4. **See changes immediately:**
   - Refresh the homepage to see bio changes
   - Refresh resume page to see new PDF
   - Changes are stored in Supabase, so they're **persistent**

### Option 2: Test on Live Site

1. **Push your code to GitHub:**
   ```bash
   git add .
   git commit -m "Added dynamic admin dashboard"
   git push
   ```

2. **Wait for deployment** (if using Netlify/Vercel, it auto-deploys)

3. **Visit your live site**

4. **Make changes in admin dashboard** (on live site)

5. **Refresh pages** - changes are live!

---

## 💡 Important Notes

### Why Changes Are Instant

- Your **frontend** (React app) fetches data from **Supabase** every time a page loads
- When you update bio/resume in admin dashboard, it saves to Supabase
- When visitors load your site, they get the **latest data** from Supabase
- **No redeployment needed** for content changes!

### Database vs Code

- **Content** (bio, resume, projects) = Stored in Supabase database ✅
- **Code** (components, styling) = Still in your code files
- To change **code**, you still need to push to GitHub

### Security Note

Currently, the admin login is simple (username/password in code). For production, consider:
- Moving credentials to environment variables
- Using Supabase Auth for proper authentication
- Adding rate limiting

---

## 🐛 Troubleshooting

### "Failed to fetch bio/resume"

- **Check:** Did you run the SQL setup files?
- **Check:** Are your Supabase credentials in `.env` file?
- **Solution:** Run `setup-env.cmd` or check `FILL_ENV.md`

### "Storage bucket not found"

- **Check:** Did you create the `resume` bucket in Supabase Storage?
- **Check:** Is the bucket set to **Public**?
- **Solution:** Create the bucket (see Step 3 above)

### "Changes not showing"

- **Check:** Did you click "Save" in admin dashboard?
- **Check:** Did you refresh the page?
- **Check:** Browser cache - try hard refresh (Ctrl+F5)

### Bio shows HTML tags instead of formatting

- **This is normal!** The bio supports HTML tags like `<b>`, `<span>`, `<br>`
- Use `<span class="yellow">` for highlighted text
- Use `<br />` for line breaks

---

## 📝 Quick Reference

### Admin Login
- **URL:** `/admin-login`
- **Username:** `Taylorjmjr1959%`
- **Password:** `Taylorjmjr1959_`

### Admin Dashboard Tabs
- **Projects:** Manage portfolio projects
- **Bio:** Edit about section text
- **Resume:** Upload/change resume PDF

### Files Changed
- `src/pages/AdminDashboard.jsx` - Main admin interface
- `src/components/Home/About.jsx` - Fetches bio from database
- `src/pages/Resume.jsx` - Fetches resume from database
- `src/pages/AdminLogin.jsx` - Updated redirects

---

## ✅ Checklist

Before you start:
- [ ] Supabase project created
- [ ] `.env` file has Supabase credentials
- [ ] SQL tables created (profile, resume)
- [ ] RLS policies set up
- [ ] Storage buckets created (`projects`, `resume`)
- [ ] Storage policies set up

Ready to test:
- [ ] Frontend running locally
- [ ] Can access `/admin-login`
- [ ] Can login successfully
- [ ] Can see all 3 tabs
- [ ] Can edit bio and see changes
- [ ] Can upload resume and see changes

---

## 🎯 Next Steps

1. **Test locally first** - Make sure everything works
2. **Push to GitHub** - Deploy your code changes
3. **Test on live site** - Make sure admin works in production
4. **Update your bio/resume** - Make it yours!

---

**Questions?** Check the other setup files:
- `HOW_TO_SETUP.md` - General setup
- `SUPABASE_SETUP.md` - Supabase configuration
- `FILL_ENV.md` - Environment variables


