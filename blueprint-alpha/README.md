# Blueprint Alpha — 1606 Corp.

Blueprint Alpha is the first cloud-ready version of the 1606 operating command center.

## Included

- Secure Supabase email/password login
- Mission Control / Today page
- Universal text capture inbox
- 1606 corporate functions
- Lufkin Platform
- Company-wide relationships
- Tasks
- Waiting On
- Finance
- Timeline
- Search
- Row Level Security
- Private Supabase storage bucket prepared for file uploads

## Browser-only deployment

### 1. Create the GitHub repository

1. Sign into GitHub.
2. Create a new **private** repository named `blueprint-alpha`.
3. Open the repository.
4. Choose **Add file → Upload files**.
5. Upload all files and folders from this package.
6. Commit the upload.

GitHub's browser sometimes has difficulty uploading an entire nested folder by drag-and-drop. The easiest method is to unzip this package, select everything inside `blueprint-alpha`, and drag the selection into GitHub's upload window. If it misses folders, upload them in separate groups.

### 2. Prepare Supabase

1. Open your `1606 Blueprint` Supabase project.
2. Go to **SQL Editor**.
3. Open `supabase/001_blueprint_schema.sql` from this package.
4. Copy all its contents into a new Supabase SQL query.
5. Click **Run**.

### 3. Create your login

1. In Supabase go to **Authentication → Users**.
2. Choose **Add user**.
3. Create your email/password login.
4. Copy the new user's UUID.

### 4. Add starter 1606 information

1. Open `supabase/002_seed_after_signup.sql`.
2. Replace `YOUR_USER_UUID` with the UUID copied above.
3. Paste the edited SQL into Supabase SQL Editor.
4. Click **Run**.

### 5. Deploy with Vercel

1. Sign into Vercel.
2. Choose **Add New → Project**.
3. Import the private `blueprint-alpha` GitHub repository.
4. Before deploying, add these environment variables:

   `NEXT_PUBLIC_SUPABASE_URL`

   `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

5. Get both values from Supabase **Project Settings → API**.
6. Click **Deploy**.

### 6. Sign in

Open the Vercel URL and use the Supabase email/password created above.

## Important security notes

- Keep the GitHub repository private.
- Never place your database password, secret key, or service-role key in GitHub or Vercel frontend variables.
- Use only the public Project URL and publishable key in the browser app.
- Version 0.1 is intended for Austen's private use before additional users are invited.
- File uploads are not yet enabled in the UI, although the private storage bucket is already created.

## Recommended first-day population

Enter:

1. Every task due during the next 14 days.
2. Every item currently waiting on another party.
3. Every invoice or payment due during the next 30 days.
4. Every active lender, investor, legal party, utility, seller, advisor, and data center relationship.
5. Every active audit or SmartSheets request.
6. Important emails and notes into Upload.
