import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables. Please check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Star = {
  id: string;
  name: string;
  category: string;
  image_url: string;
  rating: number;
  reviews_count: number;
  price: number;
  is_featured: boolean;
  bio: string;
  created_at: string;
};
