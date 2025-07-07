import { loadProducts } from "./productManager.js";

// image preview on click

export function previewHandler(div){

const previewModal = document.getElementById('preview-modal');
const previewName = document.getElementById('preview-name');
const previewImage = document.getElementById('preview-image');
const previewCategory = document.getElementById('preview-category');
const previewPrice = document.getElementById('preview-price');
const closePreview = document.getElementById('close-preview');

const img = div.querySelector('.preview-img');
    img.addEventListener('click', async () => {
  const productId = img.dataset.id;
  const products = await loadProducts();
  const product = products.find(p => p.id === productId);

  if (!product) return;

  previewImage.src = product.image_url;
  previewCategory.innerText = product.category;
  previewName.innerText = product.name;
  previewPrice.innerText = product.price;

  previewModal.classList.remove('hidden');

  closePreview.addEventListener('click', () => {
    previewModal.classList.add('hidden');
  });
});
}

export function fileImagePreview() {
  const inputImage = document.getElementById('image');
const previewImg = document.getElementById('image-preview');

inputImage.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (event) {
      previewImg.src = event.target.result;
      previewImg.style.display = 'block';
    };
    reader.readAsDataURL(file);
  } else {
    previewImg.src = '';
    previewImg.style.display = 'none';
  }
});
}

export function resetPreviewImage() {
  const previewImg = document.getElementById('image-preview');
  const inputImage = document.getElementById('image');
  
  inputImage.value = ''; 
  previewImg.src = '';
  previewImg.style.display = 'none';
}

