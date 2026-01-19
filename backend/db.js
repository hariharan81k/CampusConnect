const mysql = require("mysql2");

// create connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "vpk0804",
    database: "student_portal"
});

// connect
db.connect(err => {
    if (err) {
        console.error("Database connection failed:", err);
    } else {
        console.log("Connected to MySQL database ✅");
    }
});

module.exports = db;
