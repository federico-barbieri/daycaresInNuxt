import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://pxpqxrwkioiwctzhipfm.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4cHF4cndraW9pd2N0emhpcGZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg2MTQyNTgsImV4cCI6MjAxNDE5MDI1OH0.wYjwuzBdz_GU41-bhbMkWOEqMjm6XD2-kJ5DnuDg3Dg";

export const supabase = createClient(supabaseUrl, supabaseKey);