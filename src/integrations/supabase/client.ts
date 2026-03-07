import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://xupprhhlccvcfskvqlcb.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh1cHByaGhsY2N2Y2Zza3ZxbGNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5MTQ1NjUsImV4cCI6MjA4ODQ5MDU2NX0.rPfMMiVo2AlRFsVSsUH0B7RYB7IxOVUK8NEsZpLj37I";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
