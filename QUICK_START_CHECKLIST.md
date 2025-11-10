# 🚀 Quick Start Checklist

## ✅ Supabase Setup (Do this first!)

### Step 1: Create Table
- [ ] Open Supabase Dashboard → SQL Editor
- [ ] Copy/paste `supabase-setup-1-create-table.sql`
- [ ] Click "Run"
- [ ] Verify: Go to Table Editor → see `projects` table

### Step 2: Create Storage Bucket
- [ ] Go to Storage → "New bucket"
- [ ] Name: `projects`
- [ ] Toggle "Public bucket" ON
- [ ] Click "Create bucket"

### Step 3: Set RLS Policies
- [ ] Go to SQL Editor
- [ ] Copy/paste `supabase-setup-2-rls-policies.sql`
- [ ] Click "Run"
- [ ] Verify: Go to Database → Authentication → Policies → see 4 policies

### Step 4: Set Storage Policies
- [ ] Go to SQL Editor
- [ ] Copy/paste `supabase-setup-3-storage-policies.sql`
- [ ] Click "Run"
- [ ] Verify: Go to Storage → projects bucket → Policies → see 3 policies

## ✅ Local Setup

### Step 5: Environment Variables
- [ ] Check you have `.env` file in root directory
- [ ] Verify it has:
  ```
  REACT_APP_SUPABASE_URL=your_url_here
  REACT_APP_SUPABASE_KEY=your_key_here
  ```

### Step 6: Start Frontend
- [ ] Run: `npm install` (if needed)
- [ ] Run: `npm start`
- [ ] App opens at http://localhost:3000

## ✅ Test Everything

### Step 7: Test Admin Dashboard
- [ ] Go to http://localhost:3000/admin-login
- [ ] Login with your credentials
- [ ] Try adding a project with an image
- [ ] Check if it appears in the list

### Step 8: Test Projects Page
- [ ] Go to http://localhost:3000/project
- [ ] Verify your project card appears
- [ ] Click GitHub button → should open in new tab
- [ ] Click Live Demo button → should open in new tab

## 🎉 Done!

If everything works:
- ✅ You can add projects from any device
- ✅ Images are stored in Supabase
- ✅ Projects appear automatically on your portfolio
- ✅ All links work correctly

---

## 🐛 If Something's Broken

**"Permission denied" errors:**
- Check RLS policies are created
- Verify storage bucket is public
- Check storage policies allow insert/delete

**Images don't upload:**
- Verify bucket name is exactly `projects`
- Check storage policies
- Look at browser console for errors

**Projects don't show:**
- Check table exists in Supabase
- Verify RLS allows SELECT
- Check browser Network tab for API errors

