(function() {
      emailjs.init("JhxYdHXztTgi-xOLt"); // Replace with your EmailJS public key
    })();

    const form = document.getElementById('emailjs-form');
    const loading = form.querySelector('.loading');
    const errorMsg = form.querySelector('.error-message');
    const successMsg = form.querySelector('.sent-message');

    form.addEventListener('submit', function(e) {
      e.preventDefault();

      loading.style.display = 'block';
      errorMsg.style.display = 'none';
      successMsg.style.display = 'none';

      emailjs.sendForm('service_tvozean', 'template_5v8y4yp', this)
        .then(function() {
          loading.style.display = 'none';
          successMsg.style.display = 'block';
          form.reset();
        }, function(error) {
          loading.style.display = 'none';
          errorMsg.style.display = 'block';
          console.error('FAILED...', error);
        });
    });