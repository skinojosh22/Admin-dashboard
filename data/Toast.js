export function showToast(message) {
  const toast = document.createElement('div');
  toast.classList.add('toast');
  toast.innerText = message;
  if (message.includes('🛒')|| message.includes('❤️') || message.includes('✅')) {
    toast.classList.add('success')
  }
  if (message.includes('❌')) {
    toast.classList.add('error')
  }

  const container = document.getElementById('toast-container');
  container.appendChild(toast);

  setTimeout(()=>{
    toast.remove();
  }, 3000)
}