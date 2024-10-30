// =========================
// 1. Initialization of global variables
// =========================

const modalWrap = document.querySelector('.newsletter-modal__wrap');
const closeIcon = document.querySelector('.newsletter-modal__close');
const visibleModal = document.querySelector('.newsletter-modal').getAttribute('data-visible');
const cookieName = 'newsletterModalState';
const cookieExpireDays = 30;

// =========================
// 2. Helper function for setting cookies
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
// 3. Function for showing / hiding submited content
// =========================

const showContent = ({ hiddenClass, visibleClass }) => {
  const hiddenElement = document.querySelector(hiddenClass);
  const visibleElement = document.querySelector(visibleClass);

  hiddenElement && hiddenElement.classList.add('newsletter-modal__hidden');
  visibleElement && visibleElement.classList.remove('newsletter-modal__hidden');
  modalWrap && modalWrap.classList.remove('newsletter-modal__hidden');
  setCookie({ name: cookieName, days: 99999, state: 'subscribed' });
};

// =========================
// 4. Function for hiding modal
// =========================

const hideModal = () => {
  const cookieState = getCookie(cookieName);

  modalWrap && modalWrap.classList.add('newsletter-modal__hidden');
  if (cookieState !== 'subscribed') {
    setCookie({ name: cookieName, days: cookieExpireDays, state: 'closed' });
  }
};

// =========================
// 5. Function for showing modal
// =========================

const showModal = () => {
  if (!visibleModal) return;

  const cookieState = getCookie(cookieName);
  const currentUrl = window.location.href;
  const isSuccessUrl = currentUrl.includes('customer_posted=true');
  const isSubscribedUrl = currentUrl.includes('form_type=customer');
  const captchaUrl = currentUrl.includes('challenge?form_key');
  const delaySeconds = document.querySelector('.newsletter-modal').getAttribute('data-delay-seconds') || 10;

  if (!cookieState) {
    setCookie({ name: cookieName, days: cookieExpireDays, state: 'initial' });
    setTimeout(() => {
      modalWrap && modalWrap.classList.remove('newsletter-modal__hidden');
    }, delaySeconds * 1000);
    return;
  }

  if (cookieState === 'closed' || cookieState === 'subscribed') return;

  if (cookieState === 'initial') {
    setTimeout(() => {
      modalWrap && modalWrap.classList.remove('newsletter-modal__hidden');
    }, delaySeconds * 1000);
    return;
  }

  if (cookieState === 'submited') {
    if (isSuccessUrl) {
      showContent({
        hiddenClass: '.newsletter-modal__content',
        visibleClass: '.newsletter-modal__content-success',
      });
    } else if (isSubscribedUrl && !captchaUrl) {
      showContent({
        hiddenClass: '.newsletter-modal__content',
        visibleClass: '.newsletter-modal__content-subscribed',
      });
    }
  }
};

// =========================
// 6. Listeners for modal control
// =========================

modalWrap &&
  modalWrap.addEventListener('click', (e) => {
    e.target === modalWrap && hideModal();
  });

closeIcon && closeIcon.addEventListener('click', hideModal);

document.addEventListener('DOMContentLoaded', showModal);
