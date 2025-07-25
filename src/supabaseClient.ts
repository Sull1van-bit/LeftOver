import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
    "https://vmlrxzhxfmhlanvfamlm.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZtbHJ4emh4Zm1obGFudmZhbWxtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMzNzU3MDcsImV4cCI6MjA2ODk1MTcwN30.IP5fFK0Hfik0yr2uMIiom3B96JlLnOEtsRv5u1rBr24"    
);
