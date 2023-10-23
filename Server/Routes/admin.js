const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_KEY = "RRTGLOBALPLAY";
const connection = require('../DB');

router.post("/createAdmin", async (req, res) => {
    try {
        const { username, password } = req.body;

        const salt = await bcrypt.genSalt(10);
        const secPassword = await bcrypt.hash(password, salt);

        const insertQuery = "INSERT INTO admin (username, password) VALUES (?, ?)";
        const insertValues = [username, secPassword];

        const result = await executeQuery(insertQuery, insertValues);

        const userId = result.insertId;
        const authToken = generateAuthToken(userId);

        res.json({ success: true, authToken });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error occurred');
    }
});

// Login a user
router.post("/Adminlogin", async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await getUserByUserName(username);

        if (!user) {
            return res.json({ error: "Account not found" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);

        if (!passwordCompare) {
            return res.json({ error: "Invalid credentials" });
        }

        const adminauthToken = generateAuthToken(user.id);

        res.json({ success: true, adminauthToken });
    } catch (error) {
        res.status(500).send({Error:'Error occurred'});
    }
});


// Function to execute a SQL query
async function executeQuery(query, values) {
    return new Promise((resolve, reject) => {
        connection.query(query, values, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

// Function to get a user by email
async function getUserByUserName(username) {
    const query = "SELECT * FROM admin WHERE username = ?";
    const result = await executeQuery(query, [username]);
    return result[0];
}

// Function to generate an authentication token
function generateAuthToken(userId) {
    const payload = {
        user: { id: userId }
    };
    return jwt.sign(payload, JWT_KEY);
}

module.exports = router;
