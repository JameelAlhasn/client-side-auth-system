function main() {
    const form = document.getElementById("login-form");
    const bcrypt = dcodeIO.bcrypt;

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        handleLogin();
    });

    function handleLogin() {
        const email = document.getElementById("login-email").value.trim();
        const password = document.getElementById("login-password").value;
        
        const users = JSON.parse(localStorage.getItem("userDB")) || [];
        const validUser = users.find(u => u.email === email);

        if (validUser && bcrypt.compareSync(password, validUser.password)) {
            alert("Login successful! Welcome back.");
        } else {
            alert("Invalid email or password.");
        }
    }
}

main();