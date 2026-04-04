const contactForm = document.getElementById("contact-form");
const clearButton = document.getElementById("clear-form");
const formStatus = document.getElementById("form-status");
const footerYear = document.getElementById("current-year");

const fields = {
    name: {
        input: document.getElementById("name"),
        error: document.getElementById("name_error"),
        validate: (value) => value.trim().length >= 2 || "Enter a valid name."
    },
    email: {
        input: document.getElementById("email"),
        error: document.getElementById("email_error"),
        validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || "Enter a valid email address."
    },
    company: {
        input: document.getElementById("company"),
        error: document.getElementById("company_error"),
        validate: (value) => value.trim().length >= 3 || "Describe the company, team, or project."
    },
    service: {
        input: document.getElementById("service"),
        error: document.getElementById("service_error"),
        validate: (value) => value.trim().length > 0 || "Select a service."
    },
    message: {
        input: document.getElementById("message"),
        error: document.getElementById("message_error"),
        validate: (value) => value.trim().length >= 20 || "Add a bit more context so we can help properly."
    }
};

function setFieldState(fieldKey, validationResult) {
    const field = fields[fieldKey];

    if (!field || !field.input || !field.error) {
        return true;
    }

    const wrapper = field.input.closest(".field");
    const isValid = validationResult === true;

    if (wrapper) {
        wrapper.classList.toggle("is-invalid", !isValid);
    }

    field.error.textContent = isValid ? "" : validationResult;
    return isValid;
}

function validateField(fieldKey) {
    const field = fields[fieldKey];

    if (!field || !field.input) {
        return true;
    }

    return setFieldState(fieldKey, field.validate(field.input.value));
}

function clearStatus() {
    if (!formStatus) {
        return;
    }

    formStatus.classList.add("visually-hidden");
    formStatus.textContent = "";
}

Object.keys(fields).forEach((fieldKey) => {
    const field = fields[fieldKey];

    field.input?.addEventListener("input", () => {
        validateField(fieldKey);
        clearStatus();
    });
});

if (clearButton) {
    clearButton.addEventListener("click", () => {
        contactForm?.reset();
        Object.keys(fields).forEach((fieldKey) => setFieldState(fieldKey, true));
        clearStatus();
    });
}

if (contactForm) {
    const params = new URLSearchParams(window.location.search);
    const product = params.get("product");
    const messageField = fields.message.input;
    const serviceField = fields.service.input;
    const serviceParam = params.get("service");

    if (product && messageField && !messageField.value) {
        messageField.value = `I would like to receive a proposal for ${product}.`;
    }

    if (serviceParam && serviceField && !serviceField.value) {
        serviceField.value = serviceParam;
    }

    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const isValid = Object.keys(fields).every((fieldKey) => validateField(fieldKey));

        if (!isValid || !formStatus) {
            return;
        }

        formStatus.classList.remove("visually-hidden");
        formStatus.textContent =
            "Inquiry submitted. In a production version, this form would connect to email, a CRM, or WhatsApp.";
        contactForm.reset();
        Object.keys(fields).forEach((fieldKey) => setFieldState(fieldKey, true));
    });
}

if (footerYear) {
    footerYear.textContent = String(new Date().getFullYear());
}
