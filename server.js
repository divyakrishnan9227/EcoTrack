const express = require("express");
const mysql = require("mysql2");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname));

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.log("MySQL connection failed:", err.message);
    } else {
        console.log("MySQL connected successfully!");
    }
});

app.get("/", (req, res) => {
    res.send("EcoTrack backend is running!");
});
app.post("/contact", (req, res) => {
    const { name, email, message } = req.body;

    const sql = "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)";

    db.query(sql, [name, email, message], (err) => {
        if (err) {
            console.log("Error saving contact:", err.message);
            return res.status(500).send("Something went wrong.");
        }

        res.send("Thank you! Your message has been submitted successfully.");
    });
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});