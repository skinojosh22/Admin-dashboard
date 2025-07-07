import { loadProducts } from "../data/productManager.js";
import { renderProducts } from "./render.js";

//Main filter


const adminSearch = document.getElementById('admin-search');
const adminCategory = document.getElementById('admin-category');

export function applyingAdminFilters() {
  applyAdminFilters();
adminSearch.value = localStorage.getItem('admin-search') || '';
adminCategory.value = localStorage.getItem('admin-category') || 'all';
  adminSearch.addEventListener('input', applyAdminFilters);
adminCategory.addEventListener('change', applyAdminFilters);

}

async function applyAdminFilters() {
  const adminSearchValue = adminSearch.value.toLowerCase();
  const adminCategoryValue = adminCategory.value;
  const products = await loadProducts();
  
  const filter = products.filter((product)=>{
 const adminSearchText = product.name.toLowerCase().includes(adminSearchValue);
 const adminCategoryDrop = adminCategoryValue === 'all' || product.category === adminCategoryValue;
 return adminSearchText && adminCategoryDrop;
  });

  renderProducts(filter);
  localStorage.setItem('admin-search', adminSearch.value);
  localStorage.setItem('admin-category', adminCategory.value);
}