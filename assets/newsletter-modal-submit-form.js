// =========================
// 1. Initialization of global variables
// =========================

const form = document.getElementById('newsletter-form');
const submitButton = document.getElementById('submit-button');

// =========================
// 2. Validation input fields
// =========================

const validateInputs = () => {
  const fullName = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const consent = document.getElementById('consent').checked;
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
// 3. Parsing fullname
// =========================

const parseFullName = (fullName) => {
  const firstName = document.getElementById('first-name');
  const lastName = document.getElementById('last-name');

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
// 4. Handling input errors
// =========================

const handleInputErrors = (validInputs) => {
  const fullName = document.getElementById('name');
  const fullNameError = document.getElementById('name-error');
  const email = document.getElementById('email');
  const emailError = document.getElementById('email-error');
  const consentText = document.getElementById('consent-text');

  fullName.classList.toggle('error-input', !validInputs.name);
  fullNameError.classList.toggle('hidden', validInputs.name);
  email.classList.toggle('error-input', !validInputs.email);
  emailError.classList.toggle('hidden', validInputs.email);
  consentText.classList.toggle('consent-error', !validInputs.consent);
};

// =========================
// 5. Creating submit button for send newsletter
// =========================

const createSubmitButton = () => {
  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  form.appendChild(submitButton);
};

// =========================
// 6. Helper function to long-term expires in cookies
// =========================

const setLongTermCookie = () => {
  const expires = new Date();
  expires.setFullYear(9999);
  document.cookie = `newsletterModalState=${encodeURIComponent('submited')}; expires=${expires.toUTCString()}; path=/`;
};

// =========================
// 7. Submit newsletter form
// =========================

const submitNewsletterForm = () => {
  const validInputs = validateInputs();

  if (Object.values(validInputs).every((value) => value === true)) {
    // Set long-term submited cookie
    setLongTermCookie();
    // Parsing fullname
    parseFullName(document.getElementById('name').value);
    // Create submit button
    createSubmitButton();
    // Submit form
    form.submit();
  } else {
    handleInputErrors(validInputs);
  }
};

// =========================
// 8. Listeners for submitting form
// =========================

form.addEventListener('keypress', (e) => {
  e.code === 'Enter' && submitNewsletterForm();
});

submitButton.addEventListener('click', submitNewsletterForm);
