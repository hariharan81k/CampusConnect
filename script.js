function login() {
    const userid = document.getElementById("userid").value;
    const password = document.getElementById("password").value;

    fetch("http://ec2-16-171-137-208.eu-north-1.compute.amazonaws.com/api/login", {
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
        console.log("Login response:", data);

        if (data.success) {
            // Save userid for later APIs
            localStorage.setItem("userid", data.userid);

            alert("Login successful");

            window.location.href = "dashboard.html";
        } else {
            alert("Invalid userid or password");
        }
    })
    .catch(error => {
        console.error("Login fetch error:", error);
        alert("Server error");
    });
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

//ADMIN

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
