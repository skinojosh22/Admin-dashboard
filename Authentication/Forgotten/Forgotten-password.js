import { supabase } from "../Supabase/supabase.js";

document.getElementById('forgot-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('forgot-email').value.trim();

  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: '/reset-password.html' 
  });

  if (error) {
    alert('Error: ' + error.message);
  } else {
    alert('Password reset link sent! 📩 Check your inbox.');
  }
});