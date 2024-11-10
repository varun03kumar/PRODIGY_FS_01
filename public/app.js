document.getElementById("register-form")?.addEventListener("submit", async function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const messageDiv = document.getElementById("message");

    const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
        messageDiv.textContent = "Registration successful! You can now log in.";
        messageDiv.style.color = "green";
        messageDiv.classList.add("green");
        setTimeout(() => {
            window.location.href = "login.html"; 
        }, 2000);
    } else {
        messageDiv.textContent = `Error: ${data.message}`;
        messageDiv.style.color = "red";
        messageDiv.classList.add("red");
    }
});

document.getElementById("login-form")?.addEventListener("submit", async function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const messageDiv = document.getElementById("message");

    const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
        localStorage.setItem("token", data.token);
        messageDiv.textContent = "Login successful!";
        messageDiv.style.color = "green";
        messageDiv.classList.add("green");
        setTimeout(() => {
            window.location.href = "home.html";
        }, 2000);
    } else {
        messageDiv.textContent = `Error: ${data.message}`;
        messageDiv.style.color = "red";
        messageDiv.classList.add("red");
    }
});

const checkAuthentication = () => {
    const token = localStorage.getItem("token");
    if (!token) {
        window.location.href = "login.html"; 
    }
};

if (window.location.pathname === "/home.html") {
    checkAuthentication();
}

document.getElementById("logout")?.addEventListener("click", function () {
    localStorage.removeItem("token");
    window.location.href = "login.html"; 
});
