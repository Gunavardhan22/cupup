import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Coffee {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  rating: number;
  popular: boolean;
  created_at: string;
}
