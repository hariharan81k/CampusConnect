const bcrypt = require("bcrypt");
const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

// LOGIN API (REAL DB LOGIN)
app.post("/login", (req, res) => {
    const { userid, password } = req.body;

    const sql = "SELECT * FROM students WHERE userid = ?";
    db.query(sql, [userid], async (err, results) => {
        if (err) {
            return res.json({ success: false, message: "Database error" });
        }

        if (results.length === 0) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        const student = results[0];

        // compare password
        const match = await bcrypt.compare(password, student.password);

        if (match) {
            res.json({
                success: true,
                student: {
                    name: student.name,
                    department: student.department,
                    userid: student.userid
                }
            });
        } else {
            res.json({
                success: false,
                message: "Invalid credentials"
            });
        }
    });
});

// test route
app.get("/", (req, res) => {
    res.send("Backend + MySQL running 🚀");
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});

//add-student
app.post("/add-student", async (req, res) => {
    const { userid, password, name, department } = req.body;

    // hash password BEFORE storing
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = `
        INSERT INTO students (userid, password, name, department)
        VALUES (?, ?, ?, ?)
    `;

    db.query(
        sql,
        [userid, hashedPassword, name, department],
        err => {
            if (err) {
                return res.json({ success: false, message: "Insert failed" });
            }
            res.json({ success: true, message: "Student added securely ✅" });
        }
    );
});

//admin-login
app.post("/admin/login", (req, res) => {
    const { username, password } = req.body;

    const sql = "SELECT * FROM admins WHERE username = ?";
    db.query(sql, [username], async (err, results) => {
        if (err) {
            return res.json({ success: false, message: "Database error" });
        }

        if (results.length === 0) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        const admin = results[0];
        const match = await bcrypt.compare(password, admin.password);

        if (!match) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        res.json({
            success: true,
            admin: {
                name: admin.name,
                username: admin.username
            }
        });
    });
});

// ADMIN: Upload attendance
app.post("/admin/attendance", (req, res) => {
    const { userid, subject, percentage } = req.body;

    // get student id
    db.query(
        "SELECT id FROM students WHERE userid = ?",
        [userid],
        (err, result) => {
            if (err || result.length === 0) {
                return res.json({ success: false, message: "Student not found" });
            }

            const studentId = result[0].id;

            db.query(
                "INSERT INTO attendance (student_id, subject, percentage) VALUES (?, ?, ?)",
                [studentId, subject, percentage],
                err => {
                    if (err) {
                        return res.json({ success: false, message: "Insert failed" });
                    }
                    res.json({ success: true, message: "Attendance added ✅" });
                }
            );
        }
    );
});

// ADMIN: Upload results
app.post("/admin/results", (req, res) => {
    const { userid, subject, marks, grade } = req.body;

    db.query(
        "SELECT id FROM students WHERE userid = ?",
        [userid],
        (err, result) => {
            if (err || result.length === 0) {
                return res.json({ success: false, message: "Student not found" });
            }

            const studentId = result[0].id;

            db.query(
                "INSERT INTO results (student_id, subject, marks, grade) VALUES (?, ?, ?, ?)",
                [studentId, subject, marks, grade],
                err => {
                    if (err) {
                        return res.json({ success: false, message: "Insert failed" });
                    }
                    res.json({ success: true, message: "Result added ✅" });
                }
            );
        }
    );
});

// STUDENT: View attendance
app.get("/student/attendance/:userid", (req, res) => {
    const userid = req.params.userid;

    const sql = `
        SELECT a.subject, a.percentage
        FROM attendance a
        JOIN students s ON a.student_id = s.id
        WHERE s.userid = ?
    `;

    db.query(sql, [userid], (err, results) => {
        if (err) {
            return res.json({ success: false, message: "Database error" });
        }
        res.json({ success: true, attendance: results });
    });
});

// STUDENT: View results
app.get("/student/results/:userid", (req, res) => {
    const userid = req.params.userid;

    const sql = `
        SELECT r.subject, r.marks, r.grade
        FROM results r
        JOIN students s ON r.student_id = s.id
        WHERE s.userid = ?
    `;

    db.query(sql, [userid], (err, results) => {
        if (err) {
            return res.json({ success: false, message: "Database error" });
        }
        res.json({ success: true, results });
    });
});

// ADMIN: Add notice
app.post("/admin/notice", (req, res) => {
    const { title, content } = req.body;

    const sql = `
        INSERT INTO notices (title, content, created_at)
        VALUES (?, ?, CURDATE())
    `;

    db.query(sql, [title, content], err => {
        if (err) {
            console.error(err);
            return res.json({ success: false, message: "Failed to add notice" });
        }
        res.json({ success: true, message: "Notice posted successfully ✅" });
    });
});

// STUDENT: View notices
app.get("/student/notices", (req, res) => {
    const sql = "SELECT * FROM notices ORDER BY created_at DESC";

    db.query(sql, (err, results) => {
        if (err) {
            return res.json({ success: false, message: "Database error" });
        }
        res.json({ success: true, notices: results });
    });
});
