const contactForms = document.querySelectorAll(".contact-form");

contactForms.forEach(form => {
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        
        // Show loading via SweetAlert
        Swal.fire({
            title: 'Sending...',
            text: 'Please wait while your message is sent.',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        try {
            const response = await fetch(form.action, {
                method: "POST",
                body: new FormData(form)
            });

            const result = await response.json();

            if (result.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Message Sent!',
                    text: 'Thank you for contacting us. We will get back to you shortly.',
                    confirmButtonColor: '#38bdf8'
                });
                form.reset();
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong. Please try again later.',
                    confirmButtonColor: '#38bdf8'
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Network Error',
                text: 'Please check your connection and try again.',
                confirmButtonColor: '#38bdf8'
            });
        }
    });
});