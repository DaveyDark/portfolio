# Supabase Setup for Portfolio Blog System

This guide explains how to set up the Supabase backend for your portfolio blog system. Follow these steps to configure your Supabase project properly.

## 1. Create a Supabase Project

1. Sign up or log in to [Supabase](https://supabase.com)
2. Create a new project
3. Take note of your project URL and anon/public key (you'll need these for your `.env` file)

## 2. Set Up Database Tables

Execute the following SQL in the Supabase SQL Editor to create the required table:

```sql
-- Create blog posts table
CREATE TABLE blog_posts (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  tags TEXT[] DEFAULT '{}',
  slug TEXT NOT NULL UNIQUE,
  banner_url TEXT
);

-- Create index for more efficient lookups by slug
CREATE INDEX blog_posts_slug_idx ON blog_posts (slug);
```

## 3. Set Up Storage

1. In the Supabase dashboard, navigate to "Storage"
2. Create a new bucket called "blog-images"
3. Set the bucket to public or configure appropriate policies
4. Configure CORS if necessary to allow uploads from your domain

## 4. Configure RLS (Row Level Security) Policies

By default, Supabase has RLS enabled which blocks all operations. You need to add policies to allow the necessary operations. Execute the following SQL:

```sql
-- Allow anyone to read blog posts
CREATE POLICY "Allow public read access to blog posts" 
ON blog_posts FOR SELECT 
USING (true);

-- Allow anyone with anon key to insert/update/delete (since we're using admin auth in the app)
CREATE POLICY "Allow insert access to blog posts" 
ON blog_posts FOR INSERT 
USING (true);

CREATE POLICY "Allow update access to blog posts" 
ON blog_posts FOR UPDATE 
USING (true);

CREATE POLICY "Allow delete access to blog posts" 
ON blog_posts FOR DELETE 
USING (true);

-- Allow access to blog-images storage
CREATE POLICY "Allow public read access to blog images"
ON storage.objects FOR SELECT
USING (bucket_id = 'blog-images');

CREATE POLICY "Allow public insert access to blog images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'blog-images');

CREATE POLICY "Allow public update access to blog images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'blog-images');

CREATE POLICY "Allow public delete access to blog images"
ON storage.objects FOR DELETE
USING (bucket_id = 'blog-images');
```

In a production environment, you might want to restrict these policies further for security purposes.

## 5. Configure Environment Variables

1. Copy the `.env.example` file to `.env`
2. Fill in your Supabase URL and anon key
3. Set a secure admin password

Example:

```
VITE_SUPABASE_URL=https://yourproject.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_ADMIN_PASSWORD=secure-password-here
```

## 6. Migrating Existing Blog Posts

If you want to migrate your existing blog posts from the JSON file to Supabase, you can use the included admin interface:

1. Start your application
2. Navigate to `/admin/login` and log in with your admin password
3. Click "New Post" and manually recreate each post
4. Upload any images to the new storage system

Alternatively, you could use a script to automate this migration.

## 7. Accessing the Admin Interface

To access the admin interface:

1. Navigate to `/admin/login`
2. Enter your admin password (set in the `.env` file)
3. You'll be redirected to the admin dashboard

From the dashboard, you can:
- View all blog posts
- Create new posts
- Edit existing posts
- Delete posts

## Note on Security

This implementation uses a simple password-based authentication stored in localStorage. For a production application, you might want to consider:

1. Using Supabase Auth for more secure authentication
2. Implementing more comprehensive RLS policies
3. Adding rate limiting to prevent brute force attacks
4. Using environment variables for admin credentials in a more secure way 