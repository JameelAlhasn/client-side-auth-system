function main() {
    const bcrypt = dcodeIO.bcrypt;
    const form = document.getElementById("signup-form");

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        handleSignUp();
    });

    function validatePassword(password) {
        const length = password.length;
        if (length < 8 || length > 20) {
            alert("Password length must be between 8 and 20 characters!");
            return false;
        }

        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)/;
        if (!passwordRegex.test(password)) {
            alert("Password must contain at least one letter and one number!");
            return false;
        }
        return true;
    }

    function handleSignUp() {
        const email = document.getElementById("signup-email").value.trim();
        const password = document.getElementById("signup-password").value;
        const confirmPassword = document.getElementById("signup-password-confirm").value;

        if (!validatePassword(password)) {
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        const users = JSON.parse(localStorage.getItem("userDB")) || [];
        const userExists = users.some(u => u.email === email);

        if (userExists) {
            alert("An account with this email already exists!");
            return;
        }

        const hashedPassword = bcrypt.hashSync(password, 10);
        users.push({ email: email, password: hashedPassword });
        localStorage.setItem("userDB", JSON.stringify(users));

        alert("Sign up successful!");
    }
}

main();