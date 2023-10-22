const loginform = document.getElementById('login');


loginform.addEventListener('click', (e) => {
	loginUser(e)
});

function loginUser(event) {
    event.preventDefault();
    // Retrieve form data
    const form = document.getElementById("login-form");
    const username = form.querySelector('input[name="username"]').value;
    const password = form.querySelector('input[name="password"]').value;

    if (!username || !password) {
        alert("Please fill in all fields.");
        return;
    }

    fetch("http://localhost:5000/api/user/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({username, password}),
    })
    .then((response) => response.json())
    .then((data) => {
        if (data.success) {
            localStorage.setItem("token",data.authToken)
           window.open("/","_self")
        } else {
            alert(data.error);
        }
    })
    .catch((error) => {
        console.error("Error:", error);
        alert("Login failed. Please try again later.");
    });
}