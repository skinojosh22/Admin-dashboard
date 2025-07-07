import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// Your actual Supabase project details (keep these safe)
 export const supabase = createClient(
  'https://fhtikbcijziuzqjspnxq.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZodGlrYmNpanppdXpxanNwbnhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE3NjMzNjEsImV4cCI6MjA2NzMzOTM2MX0.270IlrgxqnJ3en1EKhZ0D7BKsgeRaynrU-JB1d_HOzM'
);