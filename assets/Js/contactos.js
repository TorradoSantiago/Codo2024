const contactForm = document.getElementById("contact-form");
const clearButton = document.getElementById("borrar");
const formStatus = document.getElementById("form-status");
const footerYear = document.getElementById("current-year");

const fields = {
    nombre: {
        input: document.getElementById("nombre"),
        error: document.getElementById("nombre_error"),
        validate: (value) => value.trim().length >= 2 || "Ingresa un nombre valido."
    },
    correo: {
        input: document.getElementById("correo"),
        error: document.getElementById("correo_error"),
        validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || "Ingresa un email valido."
    },
    empresa: {
        input: document.getElementById("empresa"),
        error: document.getElementById("empresa_error"),
        validate: (value) => value.trim().length >= 3 || "Describe empresa, equipo o proyecto."
    },
    servicio: {
        input: document.getElementById("servicio"),
        error: document.getElementById("servicio_error"),
        validate: (value) => value.trim().length > 0 || "Selecciona un servicio."
    },
    mensaje: {
        input: document.getElementById("mensaje"),
        error: document.getElementById("mensaje_error"),
        validate: (value) => value.trim().length >= 20 || "Agrega un poco mas de contexto para ayudarte mejor."
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
    const messageField = fields.mensaje.input;

    if (product && messageField && !messageField.value) {
        messageField.value = `Quiero recibir una propuesta para ${product}.`;
    }

    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const isValid = Object.keys(fields).every((fieldKey) => validateField(fieldKey));

        if (!isValid || !formStatus) {
            return;
        }

        formStatus.classList.remove("visually-hidden");
        formStatus.textContent =
            "Consulta enviada. En una implementacion real, este formulario se conectaria con email, CRM o WhatsApp.";
        contactForm.reset();
        Object.keys(fields).forEach((fieldKey) => setFieldState(fieldKey, true));
    });
}

if (footerYear) {
    footerYear.textContent = String(new Date().getFullYear());
}
