document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const loading = document.querySelector('.loading');
  const errorMsg = document.querySelector('.error-message');
  const successMsg = document.querySelector('.sent-message');

  loading.style.display = 'block';
  errorMsg.style.display = 'none';
  successMsg.style.display = 'none';

  const formData = new FormData(this);

  fetch('send_email.php', {
    method: 'POST',
    body: formData
  })
  .then(response => response.text())
  .then(text => {
    loading.style.display = 'none';
    if (text === 'success') {
      successMsg.style.display = 'block';
      this.reset();
    } else {
      errorMsg.textContent = text;
      errorMsg.style.display = 'block';
    }
  })
  .catch(err => {
    loading.style.display = 'none';
    errorMsg.textContent = 'An error occurred. Please try again.';
    errorMsg.style.display = 'block';
  });
});
