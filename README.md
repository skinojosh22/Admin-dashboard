# 🧠 My Admin Dashboard — Learning Supabase with Real Practice

Hi! I'm Skino — a self-taught developer on a journey to master full-stack JavaScript. This project is part of my learning adventure, and it's the first time I fully integrated a *real backend* using *Supabase*.

I built this *Admin Dashboard* to manage products — with features like authentication, image upload, and real-time updates. It's been an eye-opening experience working with cloud tools and understanding how frontend talks to a real database.

---

## 🚀 What This Project Does

This is a simple but powerful product management tool:

- 👤 Users can *sign up and log in*
- 🛒 Add products with:
  - Name (auto-capitalized)
  - Category (selectable from dropdown)
  - Price (displays with $ symbol)
  - Product image (uploaded and previewed live)
- 🖼 Uploaded images are stored in *Supabase Storage*
- 🧾 Products are stored in *Supabase Database*
- ✅ Users can update or delete their own products
- 🔐 All content is user-specific — no one sees another user’s data

---

## 💡 What I Learned

While building this, I learned how to:

- Connect frontend JavaScript with *Supabase Auth* for user login
- Upload and delete images from *Supabase Storage* (even private buckets!)
- Save metadata like image_path and handle it cleanly
- Use *Signed URLs* to display images securely
- Write clean UI logic with *toasts, **modals, and **form resets*
- Handle edge cases like "no image selected" or auth session expiry
- Use real-time database insertions and fetch with filters

Honestly, this changed the way I see web development. Now I understand how you can build full products *without setting up your own server*.

---

## 🔧 Tools Used

- *HTML/CSS/JavaScript*
- *Supabase* (Auth, DB, Storage)
- *Toast feedback system* for alerts
- *Confirm modals* for deletes
- Custom styling and animations for product cards

---

## ✅ What Works Right Now

- User auth with session check
- CRUD for products (Create, Read, Update, Delete)
- Product image uploads to Supabase
- Image previews before uploading
- Only signed-in users can manage their data
- Private bucket access with Signed URLs
- Clean UI with reset after submission

---

✅ What Works Right Now  
User auth with session check  
CRUD for products (Create, Read, Update, Delete)  
Product image uploads to Supabase  
Image previews before uploading  
Only signed-in users can manage their data  
Private bucket access with Signed URLs  
Clean UI with reset after submission  

🌐 [View Live Project](https://skinojosh22.github.io/Admin-dashboard/Authentication/Login.html)


---

## 🛠 Things I Want to Improve Next

- Add dark mode 🌙
- Add search/filter for products
- Live dashboard stats (e.g., total products)
- Upload progress feedback
- Add tags or color categories
- Deploy it publicly (GitHub Pages or Netlify)

---

## 📸 Sample Screenshot

> Coming soon after final polish!

---

## 🧠 Final Thoughts

This was a big breakthrough for me. It’s not just about coding now — it’s about *thinking like a real developer*, building full apps, and understanding both frontend and backend. Supabase made that possible without being too complicated.

If you’re like me, just starting out — don’t wait to build things. Start messy. You’ll learn a lot more than you expect.

---

### 💻 Built by: Skino  
Mentored by: Legacy (my tough AI code partner)  
Date: 7th July 2025

---
