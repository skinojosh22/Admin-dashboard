import { previewHandler } from "../data/preview.js";

const productList = document.getElementById("product-list");


export function renderProducts(productArray) {
  productList.innerHTML = "";

  productArray.forEach((product) => {
    const formatPrice = `$${Number(product.price).toFixed(2)}`
    const div = document.createElement("div");
    div.className = "product-card";

    div.innerHTML = `
      <img class="preview-img" src="${product.image_url}" alt="${product.name}" data-id="${product.id}">
    <input class="product-name" type="text" value="${product.name}" readonly>
    <input class="product-category" type="text" value="${product.category}" readonly>
    <input class="product-price" type="text" value="${formatPrice}" readonly>
      <button data-id="${product.id}" class="edit-btn">Edit</button>
      <button data-id="${product.id}" class="delete-btn">Delete</button>
    `;

    productList.appendChild(div);
    div.classList.add('fade-scale-enter');
    setTimeout(()=>{
      div.classList.add('fade-scale-enter-active');
    },10);
    previewHandler(div)
  });
}