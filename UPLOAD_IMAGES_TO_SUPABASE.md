# How to Upload Project Images to Supabase Storage

This guide will help you upload your project images to Supabase Storage so they're stored in the cloud and accessible from your live website.

## Prerequisites

1. ✅ Supabase project set up
2. ✅ `projects` storage bucket created and set to **Public**
3. ✅ Storage policies configured (see `supabase-setup-3-storage-policies.sql`)
4. ✅ Admin login credentials set up in database

## Step 1: Access Admin Dashboard

1. Go to your website: `http://localhost:3000/admin-login` (or your live site URL)
2. Log in with your admin credentials
3. You should see the Admin Dashboard with tabs: **Projects**, **Bio**, **Resume**

## Step 2: Upload Images for Existing Projects

### Option A: Edit Existing Projects

If you already have projects in the database but they're missing images:

1. Click on the **Projects** tab in Admin Dashboard
2. Find the project you want to add an image to
3. Click the **Edit** button (pencil icon) next to the project
4. In the edit modal:
   - Click **"Choose File"** under "Project Image"
   - Select the image file from your computer:
     - `portfolio-website.png`
     - `got-chess.png`
     - `daw-development.png`
   - Update any other fields if needed
   - Click **"Save Changes"**
5. The image will be uploaded to Supabase Storage and the URL will be saved in the database
6. Refresh your projects page - the image should now appear!

### Option B: Delete and Re-add Projects

If you want to start fresh:

1. Click the **Delete** button (minus icon) next to each project
2. Confirm deletion
3. Add new projects with images:
   - Fill in all fields (Title, Description, GitHub Link, etc.)
   - **Important:** Select an image file before submitting
   - Click **"Add Project"**
   - The image uploads to Supabase Storage automatically

## Step 3: Verify Images Are Uploaded

1. Go to **Supabase Dashboard** → **Storage** → **projects** bucket
2. You should see a folder called `project-images/` with your uploaded images
3. Click on an image to see its public URL

## Step 4: Check Image URLs in Database

1. Go to **Supabase Dashboard** → **Table Editor** → **projects**
2. Check the `image_url` column - it should contain Supabase Storage URLs like:
   ```
   https://[your-project].supabase.co/storage/v1/object/public/projects/project-images/[filename].png
   ```

## Troubleshooting

### "No Image" Still Showing

**Check:**
- Did you select an image file before clicking "Add Project" or "Save Changes"?
- Check browser console for errors
- Verify the `projects` bucket exists and is set to **Public**
- Check storage policies are set up correctly

### Upload Fails

**Error: "Bucket not found"**
- Go to Supabase → Storage
- Create a bucket named exactly `projects` (lowercase)
- Make sure it's set to **Public**

**Error: "Permission denied"**
- Go to Supabase → Storage → projects → Policies
- Make sure you've run `supabase-setup-3-storage-policies.sql`
- Policies should allow INSERT for `public` role

### Images Not Loading on Live Site

**Check:**
- The image URLs in the database are Supabase Storage URLs (not local paths)
- The storage bucket is set to **Public**
- The storage policies allow SELECT for `public` role
- Try opening the image URL directly in a browser - it should load

## Quick Upload Checklist

- [ ] Logged into admin dashboard
- [ ] Projects tab selected
- [ ] For each project:
  - [ ] Clicked Edit button
  - [ ] Selected image file
  - [ ] Clicked Save Changes
  - [ ] Verified success message
- [ ] Refreshed projects page
- [ ] Images are now visible!

## Image File Locations

Your images are currently in:
- `public/images/projects/portfolio-website.png`
- `public/images/projects/got-chess.png`
- `public/images/projects/daw-development.png`

You can upload these same files through the admin dashboard, and they'll be stored in Supabase Storage instead.

## After Uploading

Once images are uploaded to Supabase Storage:
- ✅ Images are stored in the cloud (Supabase Storage)
- ✅ Images are accessible from your live website
- ✅ You can manage images through the admin dashboard
- ✅ No need to redeploy when changing images
- ✅ Images load faster (CDN delivery)

---

**Need Help?** Check the browser console for error messages, or verify your Supabase Storage setup in the dashboard.






