# 🔄 Force Resume Update - Step by Step

## The Problem:
The iframe is caching the old PDF even though the database has the new one.

## ✅ **SOLUTION: Re-upload with New Filename**

The best way to force a new URL is to upload with a slightly different filename:

### Step 1: Re-upload Resume
1. Go to **Admin Dashboard** → **Resume** tab
2. Click **"Choose File"**
3. Select your new resume PDF
4. **IMPORTANT:** Before uploading, rename the file to include a version number:
   - Example: `Alexitos_Resume_v2.pdf` or `Alexitos_Resume_2025.pdf`
   - This creates a NEW file in storage with a NEW URL
5. Click **"Upload Resume"**

### Step 2: Verify New URL
1. Go to **Supabase SQL Editor**
2. Run:
```sql
SELECT file_url, file_name, updated_at 
FROM resume 
ORDER BY updated_at DESC 
LIMIT 1;
```
3. Check that `file_url` is different from before
4. Check that `updated_at` is recent (just now)

### Step 3: Test Direct URL
1. Copy the new `file_url` from the query
2. Paste it in a new browser tab
3. Does it show the NEW resume with the new QR code?

**If YES:** The URL is correct, just need to clear cache
**If NO:** The file didn't upload correctly

---

## Alternative: Clear Browser Cache Completely

1. **Chrome/Edge:**
   - Press **Ctrl+Shift+Delete**
   - Select "Cached images and files"
   - Time range: "All time"
   - Click "Clear data"

2. **Or use Incognito/Private window:**
   - Open Resume page in private/incognito mode
   - This bypasses all cache

---

## Alternative: Manual Database Update

If re-uploading doesn't work, you can manually update the URL:

1. **Get the correct file URL from Supabase Storage:**
   - Go to Supabase → Storage → `resume` bucket
   - Find your NEW file
   - Click on it
   - Copy the public URL

2. **Update database:**
```sql
UPDATE resume 
SET file_url = 'YOUR_NEW_URL_HERE',
    updated_at = NOW()
WHERE id = (SELECT id FROM resume ORDER BY updated_at DESC LIMIT 1);
```

---

## Check Console Logs

After the fix, check browser console (F12) on Resume page:
- Should see: `✅ Found resume in database: [NEW_URL]`
- Should see: `✅ Resume iframe loaded successfully`

If you see the OLD URL in logs, the database hasn't updated yet.

---

## Quick Test

1. Open Resume page
2. Press **F12** → **Console** tab
3. Look for: `📄 Fetching resume from database...`
4. Check what URL it shows
5. Is it the NEW URL or OLD URL?

This will tell us if it's a database issue or a cache issue.

