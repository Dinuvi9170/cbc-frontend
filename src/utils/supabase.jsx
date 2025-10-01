import { createClient } from "@supabase/supabase-js";

const url=import.meta.env.VITE_SupabaseUrl
const key=import.meta.env.VITE_SupabaseKey
const supabase = createClient(url,key);
export default supabase;