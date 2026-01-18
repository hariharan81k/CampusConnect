function login() {
    const userid = document.getElementById("userid").value;
    const password = document.getElementById("password").value;

    if (userid === "" || password === "") {
        alert("Please fill all fields");
        return;
    }

    fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userid: userid,
            password: password
        })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            // SAVE SESSION
            localStorage.setItem("isLoggedIn", "true");
            
            localStorage.setItem("studentUserId", data.student.userid);
            localStorage.setItem("studentName", data.student.name);
            localStorage.setItem("department", data.student.department);

            window.location.href = "dashboard.html";
        } else {
            alert(data.message);
        }
    })
    .catch(err => {
        console.error(err);
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
