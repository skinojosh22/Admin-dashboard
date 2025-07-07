import { supabase } from "../Authentication/Supabase/supabase.js";
export async function userInfo() {

const { data: { session } } = await supabase.auth.getSession();

if (!session) {
  window.location.href = '/login.html'; 
} else {
  const userId = session.user.id;

  const { data: profile, error } = await supabase
    .from('user_info')
    .select('name')
    .eq('id', userId)
    .single();

  const welcomeMsg = document.getElementById('user-info');

  if (error) {
    console.error('Failed to load user profile:', error.message);
    welcomeMsg.textContent = 'Welcome, user!';
  } else {
    welcomeMsg.textContent =` Welcome, ${profile.name}! 👋`;
  }
}
}
