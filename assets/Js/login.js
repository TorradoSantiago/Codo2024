const loginForm = document.getElementById("login-form");
const loginEmail = document.getElementById("login-email");
const loginPassword = document.getElementById("login-password");
const loginEmailError = document.getElementById("login-email-error");
const loginPasswordError = document.getElementById("login-password-error");
const loginStatus = document.getElementById("login-status");
const loginYear = document.getElementById("current-year");

function showLoginError(element, message) {
    if (element) {
        element.textContent = message;
    }
}

function resetLoginErrors() {
    showLoginError(loginEmailError, "");
    showLoginError(loginPasswordError, "");
}

if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();
        resetLoginErrors();

        let valid = true;
        const emailValue = loginEmail?.value.trim() || "";
        const passwordValue = loginPassword?.value.trim() || "";

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
            valid = false;
            showLoginError(loginEmailError, "Ingresa un email valido.");
        }

        if (passwordValue.length < 6) {
            valid = false;
            showLoginError(loginPasswordError, "Usa una clave de al menos 6 caracteres para la demo.");
        }

        if (!valid || !loginStatus) {
            return;
        }

        loginStatus.classList.remove("visually-hidden");
        loginStatus.textContent =
            "Ingreso demo correcto. El backend no esta conectado, pero la interfaz ya comunica una continuidad profesional.";
        loginForm.reset();
    });
}

if (loginYear) {
    loginYear.textContent = String(new Date().getFullYear());
}
