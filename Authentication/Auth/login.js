import { supabase } from "../Supabase/supabase.js";

document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;

  if (!email || !password) {
    alert('Fill in both email and password!');
    return;
  }

  // 🔐 Try to sign in
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    alert('Login failed: ' + error.message);
    console.error('Login error:', error.message);
    return;
  }

  alert('Login successful! 🎉');
  window.location.href = '../../index.html'; 
});

  document.getElementById('toggle-password').addEventListener('click', () => {
  const passwordInput = document.getElementById('login-password');
  const type = passwordInput.type === 'password' ? 'text' : 'password';
  passwordInput.type = type;

  // Toggle emoji or icon
  const btn = document.getElementById('toggle-password');
  btn.textContent = type === 'password' ? '👁' : '🙈';
});
