// =========================
// 1. Initialization of global variables
// =========================

const modalWrap = document.querySelector('.newsletter-modal');
const closeIcon = document.getElementById('close-modal');
const visibleModal = document.getElementById('modal').getAttribute('data-visible');
const modalWrapOnCaptcha = modalWrap.getAttribute('data-on-captcha');
const delaySeconds = document.getElementById('modal').getAttribute('data-delay-seconds') || 10;
const cookieName = 'newsletterModalState';
const cookieExpireDays = 30;

// =========================
// 2. Helper functions for cookies
// =========================

const setCookie = (data) => {
  const dayInMilliseconds = 24 * 60 * 60 * 1000;
  const expires = new Date(Date.now() + data.days * dayInMilliseconds).toUTCString();
  document.cookie = data.name + '=' + encodeURIComponent(data.state) + '; expires=' + expires + '; path=/';
};

const getCookie = (cookieName) => {
  return document.cookie
    .split('; ')
    .find((row) => row.startsWith(cookieName + '='))
    ?.split('=')[1];
};

// =========================
// 3. Helper functions for modal visibility
// =========================

const hideModal = () => {
  modalWrap && modalWrap.classList.add('hidden');
  setCookie({ name: cookieName, days: cookieExpireDays, state: 'closed' });
};

const showModal = () => {
  if (visibleModal && !modalWrapOnCaptcha) {
    const cookieState = getCookie(cookieName);
    !cookieState && setCookie({ name: cookieName, days: cookieExpireDays, state: 'undisplayed' });

    if (cookieState !== 'closed' && cookieState !== 'submited') {
      setTimeout(() => {
        modalWrap && modalWrap.classList.remove('hidden');
      }, delaySeconds * 1000);
    }
  }
};

// =========================
// 4. Listeners for modal control
// =========================

modalWrap &&
  modalWrap.addEventListener('click', (e) => {
    e.target === modalWrap && hideModal();
  });

closeIcon && closeIcon.addEventListener('click', hideModal);

document.addEventListener('DOMContentLoaded', showModal);
