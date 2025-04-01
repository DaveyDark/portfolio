import { createClient } from '@supabase/supabase-js';

// Get Supabase URL and anonymous key from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create a Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Blog group type definition
export interface BlogGroup {
  id: number;
  name: string;
  description: string;
  slug: string;
  created_at: string;
}

// Blog post type definition
export interface BlogPost {
  id: number;
  title: string;
  subtitle: string;
  content: string;
  created_at: string;
  tags: string[];
  slug: string;
  banner_url: string;
  group_id: number | null;
}

// Functions for fetching blog groups
export const fetchBlogGroups = async (): Promise<BlogGroup[]> => {
  const { data, error } = await supabase
    .from('blog_groups')
    .select('*')
    .order('name');
  
  if (error) {
    console.error('Error fetching blog groups:', error);
    return [];
  }
  
  return data || [];
};

export const fetchBlogGroup = async (slug: string): Promise<BlogGroup | null> => {
  const { data, error } = await supabase
    .from('blog_groups')
    .select('*')
    .eq('slug', slug)
    .single();
  
  if (error) {
    console.error('Error fetching blog group:', error);
    return null;
  }
  
  return data;
};

// Admin authentication functions
export const loginAdmin = async (password: string) => {
  if (password === import.meta.env.VITE_ADMIN_PASSWORD) {
    // Set a flag in localStorage to indicate admin is logged in
    localStorage.setItem('isAdmin', 'true');
    return true;
  }
  return false;
};

export const isAdminLoggedIn = (): boolean => {
  return localStorage.getItem('isAdmin') === 'true';
};

export const logoutAdmin = () => {
  localStorage.removeItem('isAdmin');
}; 