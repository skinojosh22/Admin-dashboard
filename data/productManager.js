import { supabase } from '../Authentication/Supabase/supabase.js';
import { renderProducts } from "../Main/render.js";
import { showToast } from "./Toast.js";

export async function loadProducts() {
  const { data: sessionData } = await supabase.auth.getUser();
  const userId = sessionData?.user?.id;

  if (!userId) {
    console.warn("User not logged in");
    return [];
  }

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  /*if (error) {
    console.error('Error loading products:', error.message);
    return [];
  }*/

  return data;
}

export async function deleteProductFromSupabase(productId) {
  
  // 1. Fetching the image path
  const { data: productData, error: fetchError } = await supabase
    .from('products')
    .select('image_path')
    .eq('id', productId)
    .single();
     const filePath = productData.image_path;

 /* if (fetchError || !productData) {
    console.error("❌ Failed to fetch product:", fetchError?.message);
    return;
  }*/

 
  /*if (!filePath) {
    console.warn("⚠ No file path found — cannot delete image.");
    return;
  }*/

  //console.log(" Image path to delete:", filePath);

  // 2. Delete the product row
  const { error: deleteError } = await supabase
    .from('products')
    .delete()
    .eq('id', productId);

  /*if (deleteError) {
    console.error("❌ Failed to delete product row:", deleteError.message);
    return;
  }*/

  console.log("✅ Product row deleted");

  // 3. Delete the image from storage
  const { data: removedData, error: storageError } = await supabase
    .storage
    .from("product-image")
    .remove([filePath]);

  /*if (storageError) {
    console.error("⚠ Storage delete error:", storageError.message);
  } else {
    console.log(" Image successfully deleted from storage:", removedData);
  }*/
}

export async function editProduct(updatedProduct) {
  const products = await loadProducts();
  const updated = products.map(p => p.id === updatedProduct.id ? updatedProduct : p);
  localStorage.setItem('admin-products', JSON.stringify(updated));
}