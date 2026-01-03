import { createClient } from '@supabase/supabase-js';

// Pulling your keys from the .env file
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

// The actual "live" connection object
export const supabase = createClient(supabaseUrl, supabaseKey);