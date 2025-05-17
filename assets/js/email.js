(function(){
    emailjs.init('JhxYdHXztTgi-xOLt');
  })();

  const form = document.getElementById('contact-form');
  const loading = form.querySelector('.loading');
  const errorMessage = form.querySelector('.error-message');
  const sentMessage = form.querySelector('.sent-message');

  form.addEventListener('submit', function(event) {
    event.preventDefault();

    loading.style.display = 'block';
    errorMessage.textContent = '';
    sentMessage.style.display = 'none';

    emailjs.sendForm('service_f8vsaam', 'template_5v8y4yp', this)
      .then(() => {
        loading.style.display = 'none';
        sentMessage.style.display = 'block';
        form.reset();
      }, (err) => {
        loading.style.display = 'none';
        errorMessage.textContent = 'Oops! Something went wrong. Please try again.';
        console.error('EmailJS error:', err);
      });
  });