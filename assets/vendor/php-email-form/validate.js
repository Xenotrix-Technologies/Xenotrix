(function () {
  "use strict";

  const form = document.getElementById('contact-form');

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const loadingEl = form.querySelector('.loading');
    const errorEl = form.querySelector('.error-message');
    const successEl = form.querySelector('.sent-message');

    // Show loading
    loadingEl.style.display = 'block';
    errorEl.style.display = 'none';
    successEl.style.display = 'none';

    const formData = new FormData(form);

    fetch(form.getAttribute('action'), {
      method: 'POST',
      body: formData,
      headers: { 'X-Requested-With': 'XMLHttpRequest' }
    })
    .then(response => response.text()) // expect JSON from PHP
    .then(data => {
      loadingEl.style.display = 'none';
      if (data.status === 'success') {
        successEl.style.display = 'block';
        form.reset();
      } else {
        errorEl.innerHTML = data.message || 'Form submission failed. Please try again.';
        errorEl.style.display = 'block';
      }
    })
    .catch(err => {
      loadingEl.style.display = 'none';
      errorEl.innerHTML = 'An error occurred. Please try again.';
      errorEl.style.display = 'block';
      console.error(err);
    });
  });
})();
