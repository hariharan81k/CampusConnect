const bcrypt = require("bcrypt");
const db = require("./db");

const SALT_ROUNDS = 10;

db.query("SELECT id, password FROM admins", async (err, admins) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }

    for (const admin of admins) {
        if (!admin.password.startsWith("$2b$")) {
            const hashed = await bcrypt.hash(admin.password, SALT_ROUNDS);
            await new Promise((resolve, reject) => {
                db.query(
                    "UPDATE admins SET password = ? WHERE id = ?",
                    [hashed, admin.id],
                    err => (err ? reject(err) : resolve())
                );
            });
        }
    }

    console.log("Admin passwords encrypted ✅");
    process.exit();
});
