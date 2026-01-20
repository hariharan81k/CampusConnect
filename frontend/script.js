function login() {
    const userid = document.getElementById("userid").value;
    const password = document.getElementById("password").value;

    fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userid: userid,
            password: password
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Save userid for later APIs
            localStorage.setItem("userid", data.userid);

            alert("Login successful");

            // Redirect to dashboard
            window.location.href = "dashboard.html";
        } else {
            alert("Invalid userid or password");
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Server error");
    });
}

function goTo(page) {
    window.location.href = page;
}

function logout() {
    localStorage.removeItem("isLoggedIn");
    alert("Logged out successfully");
    window.location.href = "index.html";
}


function checkLogin() {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (!isLoggedIn) {
        alert("Please login first");
        window.location.href = "index.html";
    }
}
