function login() {
    const userid = document.getElementById("userid").value;
    const password = document.getElementById("password").value;

    fetch("https://campus-connect.duckdns.org/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userid: userid,
            password: password
        })
    })
    .then(response => {
        if (response.status === 200) {
            return response.json();
        } else if (response.status === 401 || response.status === 403) {
            throw new Error("Invalid username or password");
        } else {
            throw new Error("Server returned status: " + response.status);
        }
    })
    .then(data => {
        if (data.success === true) {

            // SAVE LOGIN STATE
            localStorage.setItem("userid", userid);

            if (data.name) {
                localStorage.setItem("studentName", data.name);
            }

            alert("Login successful");
            window.location.href = "dashboard.html";

        } else {
            alert("Invalid username or password");
        }
    })
    .catch(error => {
        console.error("Error:", error.message);
        alert(error.message);
    });
}

function goTo(page) {
    window.location.href = page;
}

function logout() {
    localStorage.removeItem("userid");
    localStorage.removeItem("studentName");
    alert("Logout successful!");
    window.location.href = "index.html";
}

function checkLogin() {
    const userid = localStorage.getItem("userid");

    if (!userid) {
        alert("Please login first");
        window.location.href = "index.html";
    }
}

// ADMIN

function checkAdminLogin() {
    if (!localStorage.getItem("adminLoggedIn")) {
        alert("Admin login required");
        window.location.href = "admin-login.html";
    }
}

function goAddStudent() {
    window.location.href = "add-student.html";
}

function goAddAttendance() {
    window.location.href = "add-attendance.html";
}

function goAddResult() {
    window.location.href = "add-result.html";
}

function goAddNotice() {
    window.location.href = "add-notice.html";
}

function adminLogout() {
    localStorage.removeItem("adminLoggedIn");
    alert("Logged out successfully");
    window.location.href = "admin-login.html";
}
