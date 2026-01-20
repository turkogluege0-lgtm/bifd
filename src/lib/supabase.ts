// External Supabase client for Netlify deployment
// Configure these in your Netlify environment variables:
// - VITE_EXTERNAL_SUPABASE_URL
// - VITE_EXTERNAL_SUPABASE_ANON_KEY

import { createClient } from '@supabase/supabase-js';

// For Netlify: Set these env vars in your Netlify dashboard
// For local dev: Add to .env.local (git-ignored)
const EXTERNAL_SUPABASE_URL = import.meta.env.VITE_EXTERNAL_SUPABASE_URL || 'https://hmullbrktmfnybjrxwfk.supabase.co';
const EXTERNAL_SUPABASE_ANON_KEY = import.meta.env.VITE_EXTERNAL_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhtdWxsYnJrdG1mbnlianJ4d2ZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgxNDU4MjEsImV4cCI6MjA4MzcyMTgyMX0.gmNdZgQIFe9UdeDe7ozr_-LWXTmBDyrphITjOaxGMfo';

export const externalSupabase = createClient(EXTERNAL_SUPABASE_URL, EXTERNAL_SUPABASE_ANON_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});

// Export as default for easy migration
export default externalSupabase;
