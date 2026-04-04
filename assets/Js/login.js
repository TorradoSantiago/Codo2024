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
            showLoginError(loginEmailError, "Enter a valid email address.");
        }

        if (passwordValue.length < 6) {
            valid = false;
            showLoginError(loginPasswordError, "Use a password with at least 6 characters for the demo.");
        }

        if (!valid || !loginStatus) {
            return;
        }

        loginStatus.classList.remove("visually-hidden");
        loginStatus.textContent =
            "Demo access granted. The backend is not connected yet, but the interface already communicates a more professional customer journey.";
        loginForm.reset();
    });
}

if (loginYear) {
    loginYear.textContent = String(new Date().getFullYear());
}
