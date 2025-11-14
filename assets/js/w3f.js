document.getElementById("contact-form").addEventListener("submit", async (e) => {
        e.preventDefault();
        const form = e.target;

        // Show loading
        form.querySelector(".loading").style.display = "block";
        form.querySelector(".error-message").style.display = "none";
        form.querySelector(".sent-message").style.display = "none";

        const response = await fetch(form.action, {
            method: "POST",
            body: new FormData(form)
        });

        const result = await response.json();
        form.querySelector(".loading").style.display = "none";

        if (result.success) {
            form.querySelector(".sent-message").style.display = "block";
            form.reset();
        } else {
            form.querySelector(".error-message").style.display = "block";
        }
    });