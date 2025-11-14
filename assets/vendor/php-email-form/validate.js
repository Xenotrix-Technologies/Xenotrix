(function () {
  "use strict";

  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const loadingEl = form.querySelector(".loading");
    const errorEl = form.querySelector(".error-message");
    const successEl = form.querySelector(".sent-message");

    // Reset UI
    loadingEl.style.display = "block";
    errorEl.style.display = "none";
    successEl.style.display = "none";

    const formData = new FormData(form);

    fetch(form.getAttribute("action"), {
      method: "POST",
      body: formData
    })
<<<<<<< Updated upstream
      .then(response => response.text())
      .then(result => {
        console.log("Server Response:", result);

        loadingEl.style.display = "none";

        if (result.startsWith("SUCCESS:")) {
          successEl.textContent = result.replace("SUCCESS:", "").trim();
          successEl.style.display = "block";
          form.reset();
        } else {
          errorEl.textContent = result.replace("ERROR:", "").trim();
          errorEl.style.display = "block";
        }
      })
      .catch(error => {
        loadingEl.style.display = "none";
        errorEl.textContent = "An unexpected error occurred. Please try again.";
        errorEl.style.display = "block";
        console.error("Fetch Error:", error);
      });
=======
    .then(response => response.text())
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
>>>>>>> Stashed changes
  });
})();
