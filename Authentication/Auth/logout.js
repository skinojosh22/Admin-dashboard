import { supabase } from "../Supabase/supabase.js";
export function logOut() {
  document.getElementById('logout-btn').addEventListener('click', async () => {
 await supabase.auth.signOut();
 alert('logged out ✅');
 window.location.href='/Authentication/Login.html';
});
}


export async function unverifiedLogout() {
  // Check for user session
const { data: { session } } = await supabase.auth.getSession();

if (!session) {
  // No logged-in user
  window.location.href = '/Authentication/Login.html';
}
}