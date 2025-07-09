import { supabase } from "../Authentication/Supabase/supabase.js";

// Call this on page load
export async function loadDarkModePreference() {
  const { data: userData } = await supabase.auth.getUser();
  const userId = userData?.user?.id;

  if (!userId) return;

  // Check if it's already in localStorage
  const cachedPref = localStorage.getItem('dark-mode');
  if (cachedPref !== null) {
    applyDarkMode(cachedPref === 'true');
    return;
  }

  // Otherwise, fetch from Supabase
  const { data, error } = await supabase
    .from("user_info")
    .select("dark_mode")
    .eq("id", userId)
    .single();

  if (error) {
    console.error("🔌 Failed to fetch dark mode preference:", error.message);
    return;
  }

  const prefersDark = data?.dark_mode;
  applyDarkMode(prefersDark);
  localStorage.setItem("dark-mode", prefersDark);
  console.log("🔄 Pref loaded from Supabase:", prefersDark);
console.log("✅ Is body dark before applying:", document.body.classList.contains('dark'));
}

// Call this on toggle (checkbox or switch)
export async function toggleDarkMode() {
  const html = document.documentElement;
  const isDark = html.classList.toggle("dark");

  localStorage.setItem("dark-mode", isDark);

  const themeToggleBtn = document.getElementById("theme-toggle");
  themeToggleBtn.textContent = isDark ? "🌞 Light Mode" : "🌙 Dark Mode";

  const { data: userData } = await supabase.auth.getUser();
  const userId = userData?.user?.id;

  if (!userId) return;

  const { error } = await supabase
    .from("user_info")
    .update({ dark_mode: isDark })
    .eq("id", userId);

  if (error) {
    console.error("⚠ Failed to update dark mode preference:", error.message);
  }
}
// Internal helper to apply class
function applyDarkMode(enable) {
  const html = document.documentElement;
  const themeToggleBtn = document.getElementById("theme-toggle");

  if (enable) {
    html.classList.add("dark");
    themeToggleBtn.textContent = "🌞 Light Mode";
  } else {
    html.classList.remove("dark");
    themeToggleBtn.textContent = "🌙 Dark Mode";
  }
}
