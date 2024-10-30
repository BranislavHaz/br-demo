// =========================
// 1. Initialization of global variables
// =========================

const visualViewport = window.visualViewport;

// =========================
// 2. Function to set global CSS for adjusting modal
// =========================

const setGlobalCSS = () => {
  const doc = document.documentElement;

  // Set real viewportHeight to css variable
  doc.style.setProperty('--doc-height', `${visualViewport.height}px`);

  // Set scale size for small width devices to css variable
  const originalWidth = 400;
  const scaleSize = visualViewport.width < originalWidth ? visualViewport.width / originalWidth : 1;
  doc.style.setProperty('--modal-scale', scaleSize);
};

// =========================
// 3. Function to toogle Dynamic Classes for adjusting modal
// =========================

const toggleDynamicClasses = () => {
  const modalWrap = document.getElementById('shopify-section-newsletter-modal');
  const modal = document.querySelector('.newsletter-modal');
  const modalHeight = modal.offsetHeight;

  modalWrap.classList.toggle('newsletter-modal__align-start', modalHeight > visualViewport.height);
  modal.classList.toggle('newsletter-modal__dynamic-margin', modalHeight > visualViewport.height);
};

// =========================
// 4. Adjusting modal function
// =========================

const adjustingModal = () => {
  setGlobalCSS();
  toggleDynamicClasses();
};

// =========================
// 5. Listener for resize viewport and first call function
// =========================

window.addEventListener('resize', adjustingModal);
adjustingModal();
