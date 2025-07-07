import { deleteProductFromSupabase } from "./productManager.js";
import { showToast } from "./Toast.js";

let pendingDelete = null;
let onDeleteConfirmed = null;

export function letPendinDelete(id) {
  pendingDelete = id;
}

export function setDeleteCallback(callback) {
  onDeleteConfirmed = callback;
}

export function confirmChoice() {
  const confirmModal = document.getElementById('confirm-modal');
  const confirmYes = document.getElementById('confirm-yes');
  const confirmNo = document.getElementById('confirm-no');

  confirmYes.addEventListener('click', async () => {
    if (pendingDelete) {
      await deleteProductFromSupabase(pendingDelete);
      showToast('❌ Product deleted');
      if (onDeleteConfirmed) {
        await onDeleteConfirmed(); // Let input-body.js handle the refresh
      }
    }
    confirmModal.classList.add('hidden');
  });

  confirmNo.addEventListener('click', () => {
    confirmModal.classList.add('hidden');
  });
}