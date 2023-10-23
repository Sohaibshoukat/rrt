const SignUpForm = document.getElementById('register');


SignUpForm.addEventListener('click', (e) => {
	registerUser(e)
});

function registerUser(event) {
    event.preventDefault();
    // Retrieve form data
    const form = document.getElementById("registration-form");
    const email = form.querySelector('input[name="email"]').value;
    const username = form.querySelector('input[name="username"]').value;
    const password = form.querySelector('input[name="password"]').value;
    const contact = form.querySelector('input[name="phone-number"]').value;
    const code = form.querySelector('input[name="Invitation-code"]').value;

    if (!email || !username || !password || !contact || !code) {
        alert("Please fill in all fields.");
        return;
    }

    if (!isValidEmail(email)) {
        alert("Please enter a valid email address.");
        return; 
    }

    if (!isValidPhoneNumber(contact)) {
        alert("Please enter a valid 11-digit phone number.");
        return;
    }

    fetch("http://localhost:5000/api/user/createuser", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, username, password, contact, code }),
    })
    .then((response) => response.json())
    .then((data) => {
        if (data.success) {
            localStorage.setItem("token",data.authToken)
           window.open("login.html","_self")
        } else {
            alert(data.error);
        }
    })
    .catch((error) => {
        console.error("Error:", error);
        alert("Registration failed. Please try again later.");
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhoneNumber(phoneNumber) {
    const phoneRegex = /^\d{11}$/;
    return phoneRegex.test(phoneNumber);
}
