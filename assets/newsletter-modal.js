// Hide modal newsletter on captcha page
const currentUrl = window.location.href;
if (currentUrl.includes('challenge?form_key')) {
  const element = document.querySelector('.newsletter-modal');
  element && element.classList.add('hidden');
}

// Set real height
const documentHeight = () => {
  const doc = document.documentElement;
  const modalWrap = document.getElementById('shopify-section-newsletter-modal');
  const modal = document.getElementById('modal');
  const modalHeight = modal.offsetHeight;
  const modalWidth = modal.offsetWidth;
  const viewportHeight = window.visualViewport.height;
  const viewportWidth = window.visualViewport.width;

  // set real viewportHeight to css variable
  doc.style.setProperty('--doc-height', `${viewportHeight}px`);

  // set css classes if is modal higher than real viewport
  if (modalHeight > viewportHeight) {
    modalWrap.classList.add('align-start');
    modal.classList.add('dynamic-mt');
  } else {
    modalWrap.classList.remove('align-start');
    modal.classList.remove('dynamic-mt');
  }

  const originalWidth = 400;

  if (viewportWidth < originalWidth) {
    const scaleSize = viewportWidth / originalWidth;
    doc.style.setProperty('--modal-scale', scaleSize);
  } else {
    doc.style.setProperty('--modal-scale', 1);
  }
};

window.addEventListener('resize', documentHeight);
window.addEventListener('DOMContentLoaded', documentHeight);
documentHeight();

/* const newsletterForm = document.getElementById('newsletter-form');

newsletterForm.addEventListener('submit', (e) => {
  e.preventDefault();
}); */
