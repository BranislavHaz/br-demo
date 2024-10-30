// =========================
// 1. Initialization of global variables
// =========================

const form = document.getElementById('newsletter-modal__form');
const submitButton = document.getElementById('newsletter-modal__submit-input');

// =========================
// 2. Function for validating input fields
// =========================

const validateInputs = () => {
  const fullName = document.getElementById('newsletter-modal__name-input').value;
  const email = document.getElementById('newsletter-modal__email-input').value;
  const consent = document.getElementById('newsletter-modal__consent-input').checked;
  const nameRegex = /^[a-zA-Zá-žÁ-Ž°]+(?: [a-zA-Zá-žÁ-Ž°]+)*$/;
  const mailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const validInputs = { name: false, email: false, consent: false };

  // Validate fullName
  nameRegex.test(fullName) && (validInputs.name = true);
  // Validate e-mail
  mailRegex.test(email) && (validInputs.email = true);
  // Validate consent marketing
  consent && (validInputs.consent = true);

  return validInputs;
};

// =========================
// 3. Function for parsing fullname
// =========================

const parseFullName = (fullName) => {
  const firstName = document.getElementById('newsletter-modal__first-name-input');
  const lastName = document.getElementById('newsletter-modal__last-name-input');

  if (fullName.includes(' ')) {
    const nameParts = fullName.split(' ');
    firstName.value = nameParts[0];
    lastName.value = nameParts[1];
  } else {
    firstName.value = fullName;
    lastName.value = '';
  }
};

// =========================
// 4. Function for handling input errors
// =========================

const handleInputErrors = (validInputs) => {
  const fullName = document.getElementById('newsletter-modal__name-input');
  const fullNameError = document.querySelector('.newsletter-modal__error-name');
  const email = document.getElementById('newsletter-modal__email-input');
  const emailError = document.querySelector('.newsletter-modal__error-email');
  const consentText = document.querySelector('.newsletter-modal__form-consent-text');

  fullName.classList.toggle('newsletter-modal__error-input', !validInputs.name);
  fullNameError.classList.toggle('newsletter-modal__hidden', validInputs.name);
  email.classList.toggle('newsletter-modal__error-input', !validInputs.email);
  emailError.classList.toggle('newsletter-modal__hidden', validInputs.email);
  consentText.classList.toggle('newsletter-modal__error-consent', !validInputs.consent);
};

// =========================
// 5. Helper function to long-term expires in cookies
// =========================

const setLongTermCookie = () => {
  const expires = new Date();
  expires.setFullYear(9999);
  document.cookie = `newsletterModalState=${encodeURIComponent('submited')}; expires=${expires.toUTCString()}; path=/`;
};

// =========================
// 6. Function for submitting newsletter form
// =========================

const submitNewsletterForm = () => {
  const validInputs = validateInputs();

  if (Object.values(validInputs).every((value) => value === true)) {
    setLongTermCookie();
    parseFullName(document.getElementById('newsletter-modal__name-input').value);
    form.submit();
  } else {
    handleInputErrors(validInputs);
  }
};

// =========================
// 7. Listeners for submitting form
// =========================

form.addEventListener('keypress', (e) => {
  e.code === 'Enter' && submitNewsletterForm();
});

submitButton.addEventListener('click', submitNewsletterForm);
