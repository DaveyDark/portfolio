import { createClient } from '@supabase/supabase-js';

// Get Supabase URL and anonymous key from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create a Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
}

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