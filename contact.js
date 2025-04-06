document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const inputs = form.querySelectorAll('input, textarea');

    // Add placeholder attribute to make the label animation work
    inputs.forEach(input => {
        input.setAttribute('placeholder', ' ');
    });

    // Handle form submission
    function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        // You would typically send this to a server
        // For now, we'll just log it and show a success message
        console.log('Form data:', data);

        // Compose email body
        const emailBody = `
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone || 'Not provided'}
Subject: ${data.subject}

Message:
${data.message}
        `;

        // Open default email client
        const mailtoLink = `mailto:shazaanraza123@gmail.com?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(emailBody)}`;
        window.location.href = mailtoLink;

        // Clear form
        form.reset();

        // Show success message
        alert('Thank you for your message. Your email client should open shortly.');

        return false;
    }

    // Attach the handler to the form
    form.onsubmit = handleSubmit;

    // Handle floating labels
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });

        // Check initial state (in case of autofill)
        if (input.value) {
            input.parentElement.classList.add('focused');
        }
    });
}); 