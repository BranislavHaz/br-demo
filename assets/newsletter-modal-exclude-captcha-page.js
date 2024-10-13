// =========================
// 1. Initialization of global variables
// =========================

const currentUrl = window.location.href;

// =========================
// 2. Hiding the modal on the captcha page
// =========================

if (currentUrl.includes('challenge?form_key')) {
  const modalWrap = document.querySelector('.newsletter-modal');
  modalWrap && modalWrap.classList.add('hidden');
  modalWrap.setAttribute('data-on-captcha', true);
} else {
  modalWrap.removeAttribute('data-on-captcha', false);
}
