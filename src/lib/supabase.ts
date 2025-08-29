import { createClient } from "@supabase/supabase-js";

// Server-side Supabase client. Do NOT import this into client components.
// Reads credentials from Next.js server environment.
const SUPABASE_URL = process.env.SUPABASE_URL as string;
const SUPABASE_SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE as string | undefined;
const SUPABASE_ANON = process.env.SUPABASE_ANON_KEY as string | undefined;

if (!SUPABASE_URL) {
  throw new Error("SUPABASE_URL is not set in environment");
}

// Prefer service role for server-side administrative reads (not exposed to browser).
const KEY = SUPABASE_SERVICE_ROLE || SUPABASE_ANON;

if (!KEY) {
  throw new Error("Set SUPABASE_SERVICE_ROLE (preferred) or SUPABASE_ANON_KEY in environment");
}

export const supabaseServer = createClient(SUPABASE_URL, KEY, {
  auth: { persistSession: false },
});
