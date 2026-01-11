import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("❌ Missing Supabase credentials in .env file");
}

// Configure Supabase to NOT use localStorage for session persistence
// We're managing sessions via HTTP-only cookies on the backend
export const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
        persistSession: false, // Disable localStorage persistence
        autoRefreshToken: false, // We handle refresh on backend
        detectSessionInUrl: false, // We manually handle auth codes
    }
});
