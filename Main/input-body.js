import { renderProducts } from "./render.js";
import { loadProducts } from "../data/productManager.js";
import { showToast } from "../data/Toast.js";
import { setDeleteCallback, letPendinDelete, confirmChoice } from "../data/confirm.js";
import { supabase } from "../Authentication/Supabase/supabase.js";
import { resetPreviewImage } from "../data/preview.js";

export function applyProductForm() {
  const productForm = document.getElementById('add-product-form');
  const productList = document.getElementById("product-list");
  const inputName = document.getElementById('name');
  const inputPrice = document.getElementById('price');
  const inputCategory = document.getElementById('category');
  const inputImage = document.getElementById('image');
  const confirmModal = document.getElementById('confirm-modal');
  let editingProductId;

  confirmChoice();

  productForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const nameInput = inputName.value
  .toLowerCase()
  .split(' ')
  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
  .join(' ');
  const categoryInput = inputCategory.value;
  const priceInput = Number(inputPrice.value);
  const file = inputImage.files[0];

  if (!file) {
    return showToast("Please select an image");
  }

  const { data: userData } = await supabase.auth.getUser();
  const userId = userData?.user?.id;
  if (!userId) return showToast("❌ User not authenticated");

  const cleanName = file.name.replace(/\s+/g, '-').toLowerCase();
  const imagePath = `${crypto.randomUUID()}-${cleanName}`;
  const bucketName = 'product-image';

  // 1. Uploading image from storage
  const { error: uploadError } = await supabase
    .storage
    .from(bucketName)
    .upload(imagePath, file, {
      cacheControl: '3600',
      upsert: false,
      contentType: file.type
    });

  /*if (uploadError) {
    console.error("❌ Upload error:", uploadError.message);
    return showToast("❌ Image upload failed");
  }*/

  //console.log("✅ Upload success:", imagePath);

  //  Retry signed URL fetch
  async function tryGetSignedUrl(bucket, path, retries = 3, delay = 500) {
    for (let i = 0; i < retries; i++) {
      const { data, error } = await supabase
        .storage
        .from(bucket)
        .createSignedUrl(path, 30*24*60 * 60);

      if (!error && data?.signedUrl) return data.signedUrl;
      await new Promise((r) => setTimeout(r, delay));
    }
    throw new Error("Signed URL generation failed");
  }

  let signedUrl;
  try {
    signedUrl = await tryGetSignedUrl(bucketName, imagePath);
    console.log("🔐 Signed URL created:", signedUrl);
  } catch (err) {
    console.error("🚫 Could not generate signed URL:", err.message);
    return showToast("❌ Could not load image.");
  }

  // 3. insert product details to database
  const newProduct = {
    user_id: userId,
    name: nameInput,
    category: categoryInput,
    price: priceInput,
    image_url: signedUrl,
    image_path: imagePath,
  };

  const { error: insertError } = await supabase
    .from('products')
    .insert([newProduct]);

  if (insertError) {
    console.error("❌ Insert failed:", insertError.message);
    return showToast("❌ Failed to save product.");
  }

  showToast('✅ Product added successfully');
  renderProducts(await loadProducts());
  productForm.reset();
  resetPreviewImage();
});

  productList.addEventListener('click', async (e) => {
    if (e.target.classList.contains('delete-btn')) {
      letPendinDelete(e.target.dataset.id);
      confirmModal.classList.remove('hidden');
    }

    if (e.target.classList.contains('edit-btn')) {
      const card = e.target.closest('.product-card');
      const isEditing = e.target.dataset.editing === 'true';
      editingProductId = e.target.dataset.id;

      const nameInput = card.querySelector('.product-name');
      const categoryInput = card.querySelector('.product-category');
      const priceInput = card.querySelector('.product-price');

      if (!isEditing) {
        [nameInput, categoryInput, priceInput].forEach(input => {
          input.removeAttribute('readonly');
          input.classList.add('editable');
        });

        e.target.textContent = 'Save';
        e.target.dataset.editing = 'true';
      } else {
        const { error: updateError } = await supabase
          .from('products')
          .update({
            name: nameInput.value.trim(),
            category: categoryInput.value.trim().toLowerCase(),
            price: Number(priceInput.value)
          })
          .eq('id', editingProductId);

        if (updateError) {
          console.error("❌ Update failed:", updateError.message);
          return showToast("❌ Failed to update product");
        }

        renderProducts(await loadProducts());
        showToast('✅ Product updated');
      }
    }
  });

  setDeleteCallback(async () => {
    renderProducts(await loadProducts());
  });
}