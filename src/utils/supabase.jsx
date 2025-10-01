import { createClient } from "@supabase/supabase-js";

const url="https://mxlpkdrudnaffxfgykil.supabase.co"
const key="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im14bHBrZHJ1ZG5hZmZ4Zmd5a2lsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkyMjkwMDIsImV4cCI6MjA3NDgwNTAwMn0.AoHq7DNO4KZzfg1hEIV-iWWm9C6Cb5AAClflcc8TdjI"
const supabase = createClient(url,key);
export default supabase;