# 🔍 Debug: Resume Not Showing on Public Page

## Quick Check

### Step 1: Verify Resume in Database

Run this in **Supabase SQL Editor**:

```sql
SELECT * FROM resume ORDER BY updated_at DESC LIMIT 1;
```

**What to check:**
- Does a row exist?
- Is `file_url` populated?
- Is `updated_at` recent (today's date)?

---

### Step 2: Check Browser Console

1. Go to your public Resume page (`/resume`)
2. Press **F12** (Developer Console)
3. Look for errors or logs
4. Check the **Network** tab for the Supabase API call

**What to look for:**
- Any red errors?
- Is the Supabase query returning data?
- Is the `file_url` accessible?

---

### Step 3: Test the File URL Directly

1. Copy the `file_url` from the database query (Step 1)
2. Paste it in a new browser tab
3. Does the PDF open?

**If it doesn't open:**
- The file might not be public
- The storage bucket might have wrong permissions
- The URL might be incorrect

---

### Step 4: Check Storage Bucket Permissions

1. Go to **Supabase Dashboard** → **Storage**
2. Click on the **`resume`** bucket
3. Check:
   - Is it set to **Public**? (toggle should be ON)
   - Are there any policies set up?
   - Can you see your uploaded file in the file list?

---

### Step 5: Force Refresh

The page might be cached. Try:

1. **Hard refresh:** Ctrl+F5 (Windows) or Cmd+Shift+R (Mac)
2. **Clear cache:** Browser settings → Clear browsing data
3. **Incognito mode:** Open the page in a private window

---

## Common Issues & Fixes

### Issue 1: Resume Table Empty

**Symptom:** Database query returns no rows

**Fix:**
- Upload the resume again from admin dashboard
- Make sure you click "Upload Resume" after selecting the file

---

### Issue 2: File URL Not Accessible

**Symptom:** URL exists but PDF doesn't open

**Fix:**
1. Go to Supabase → Storage → `resume` bucket
2. Make sure the bucket is **Public**
3. Check the file exists in the bucket
4. Try downloading it from Supabase to verify it uploaded correctly

---

### Issue 3: Wrong File URL Format

**Symptom:** URL looks wrong or has extra characters

**Fix:**
- The URL should look like: `https://[project].supabase.co/storage/v1/object/public/resume/[filename].pdf`
- If it doesn't, re-upload the resume

---

### Issue 4: CORS or Permission Error

**Symptom:** Console shows CORS or 403 errors

**Fix:**
1. Go to Supabase → Storage → `resume` bucket → Policies
2. Make sure there's a policy allowing public read access:

```sql
-- Allow public read access
CREATE POLICY "Public read access"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'resume');
```

---

## Quick Test Query

Run this in Supabase SQL Editor to see everything:

```sql
-- Check resume table
SELECT 
  id,
  file_name,
  file_url,
  created_at,
  updated_at,
  LENGTH(file_url) as url_length
FROM resume 
ORDER BY updated_at DESC;
```

This will show you:
- If the resume exists
- What the file URL is
- When it was last updated
- If the URL looks valid (length should be > 50)

---

## Still Not Working?

1. **Check the exact error** in browser console (F12)
2. **Verify the file_url** opens directly in browser
3. **Check Supabase logs** for any errors
4. **Try uploading again** from admin dashboard

