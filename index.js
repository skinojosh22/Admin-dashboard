import { loadProducts} from "./data/productManager.js";
import { renderProducts } from "./Main/render.js";
import { applyingAdminFilters } from "./Main/Admin-filter.js";
import {applyProductForm} from "./Main/input-body.js";
import { userInfo } from "./Main/index-user-info.js";
import { fileImagePreview } from "./data/preview.js";
import { unverifiedLogout, logOut } from "./Authentication/Auth/logout.js";
import { loadDarkModePreference, toggleDarkMode } from "./Main/dark-toggle.js";

const products = await loadProducts();
applyingAdminFilters();
userInfo();
unverifiedLogout();
logOut();
fileImagePreview();
applyProductForm();
renderProducts(products);
loadDarkModePreference();
document.getElementById('theme-toggle').addEventListener('click', toggleDarkMode);












