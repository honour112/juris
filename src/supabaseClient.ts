import { createClient } from '@supabase/supabase-js';

// Pulling your keys from the .env file
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseKey) {
	console.error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in .env.local');
}

export const supabase = supabaseUrl && supabaseKey
	? createClient(supabaseUrl, supabaseKey)
	: null;