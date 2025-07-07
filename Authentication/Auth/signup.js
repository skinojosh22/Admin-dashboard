import { supabase } from "../Supabase/supabase.js";
import { showToast } from "../../data/Toast.js";


document.getElementById('signup-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const surName = document.getElementById('surname').value.trim();
  const otherName = document.getElementById('othername').value.trim();
  const email = document.getElementById('signup-email').value.trim();
  const password = document.getElementById('signup-password').value;
  const dob = document.getElementById('dob').value;
  const gender = document.querySelector('input[name="gender"]:checked')?.value;

  // 🔒 Basic validation
  if (!surName || !otherName || !email || !password || !dob || !gender) {
    showToast('Fill in all fields!');
    return;
  }

  // 1. Sign up
  const { error: signupError } = await supabase.auth.signUp({ email, password });

  if (signupError) {
    console.error('Signup failed:', signupError.message);
    alert('Signup failed: ' + signupError.message);
    return;
  }

  // 2. Sign in to create a session
  const { error: loginError } = await supabase.auth.signInWithPassword({ email, password });

  if (loginError) {
    console.error('Login failed:', loginError.message);
    alert('Login failed after signup.');
    return;
  }

  // 3. Get current user
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (!user || userError) {
    console.error('User fetch failed:', userError?.message);
    alert('Could not fetch user after signup.');
    return;
  }

  // 4. Insert into user_info
  const fullName = `${surName} ${otherName}`;
  const { error: insertError } = await supabase
    .from('user_info')
    .insert([
      {
        id: user.id,
        name: fullName,
        gender,
        dob
      }
    ]);

  if (insertError) {
    console.error('Insert failed:', insertError.message);
    alert('Signup succeeded but saving profile failed.');
    return;
  }

  // 5. Success – redirect to dashboard
  alert('Signup complete! 🚀 Welcome aboard!');
  window.location.href = '/index.html';
});

document.getElementById('toggle-password').addEventListener('click', () => {
  const passwordInput = document.getElementById('signup-password');
  const type = passwordInput.type === 'password' ? 'text' : 'password';
  passwordInput.type = type;

  // Toggle emoji or icon
  const btn = document.getElementById('toggle-password');
  btn.textContent = type === 'password' ? '👁' : '🙈';
});