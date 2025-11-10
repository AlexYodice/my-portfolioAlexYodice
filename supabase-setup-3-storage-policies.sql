-- ============================================
-- STEP 3: Storage Bucket Policies
-- ============================================
-- First: Create the bucket manually in Storage UI (name it "projects", make it public)
-- Then: Run these policies in SQL Editor

-- Allow public to view/download images
create policy "Public read access"
on storage.objects for select
to public
using (bucket_id = 'projects');

-- Allow public to upload images (for admin dashboard)
create policy "Public upload access"
on storage.objects for insert
to public
with check (bucket_id = 'projects');

-- Allow public to delete images (for admin dashboard)
create policy "Public delete access"
on storage.objects for delete
to public
using (bucket_id = 'projects');

-- ============================================
-- Storage Policies for Resume Bucket
-- ============================================
-- First: Create the bucket manually in Storage UI (name it "resume", make it public)
-- Then: Run these policies in SQL Editor

-- Allow public to view/download resume PDFs
create policy "Public read access resume"
on storage.objects for select
to public
using (bucket_id = 'resume');

-- Allow public to upload resume PDFs (for admin dashboard)
create policy "Public upload access resume"
on storage.objects for insert
to public
with check (bucket_id = 'resume');

-- Allow public to delete resume PDFs (for admin dashboard)
create policy "Public delete access resume"
on storage.objects for delete
to public
using (bucket_id = 'resume');

-- Allow public to update resume PDFs (for admin dashboard)
create policy "Public update access resume"
on storage.objects for update
to public
using (bucket_id = 'resume')
with check (bucket_id = 'resume');

