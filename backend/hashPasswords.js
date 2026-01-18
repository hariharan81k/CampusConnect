const bcrypt = require("bcrypt");
const db = require("./db");

const SALT_ROUNDS = 10;

// Get only NON-hashed passwords
const sql = `
    SELECT id, password 
    FROM students 
    WHERE password NOT LIKE '$2b$%'
`;

db.query(sql, async (err, students) => {
    if (err) {
        console.error("Error fetching students:", err);
        process.exit(1);
    }

    if (students.length === 0) {
        console.log("All passwords are already encrypted ✅");
        process.exit(0);
    }

    for (const student of students) {
        const hashedPassword = await bcrypt.hash(student.password, SALT_ROUNDS);

        await new Promise((resolve, reject) => {
            db.query(
                "UPDATE students SET password = ? WHERE id = ?",
                [hashedPassword, student.id],
                err => (err ? reject(err) : resolve())
            );
        });
    }

    console.log(`Encrypted ${students.length} passwords successfully ✅`);
    process.exit(0);
});
