import { supabase } from "../Supabase/supabase.js";

document.getElementById('reset-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const newPassword = document.getElementById('new-password').value;

  const { data, error } = await supabase.auth.updateUser({
    password: newPassword
  });

  if (error) {
    alert('Password reset failed: ' + error.message);
  } else {
    alert('Password updated successfully! 🎉');
    window.location.href = '/Authentication/Login.html';
  }
});