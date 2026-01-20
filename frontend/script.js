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
    if (localStorage.getItem("userid")) {
    window.location.href = "dashboard.html";
}

}

function goTo(page) {
    window.location.href = page;
}

function logout() {
    localStorage.removeItem("userid");
    alert ("Logout successful...!");
    window.location.href = "index.html";
}


function checkLogin() {
    const userid = localStorage.getItem("userid");

    if (!userid) {
        alert("Please login first");
        window.location.href = "index.html"; // login page
    }
}
