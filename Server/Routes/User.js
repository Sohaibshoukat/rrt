const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_KEY = "RRTGLOBALPLAY";
const connection = require('../DB'); // Modify this path

// Create a user
router.post("/createuser", async (req, res) => {
    try {
        const { email, username, password, contact, code } = req.body;

        // Check if the username exists
        const usernameExists = await checkIfUserExists('username', username);
        if (usernameExists) {
            return res.status(400).json({ error: "This username already exists" });
        }

        // Check if the email exists
        const emailExists = await checkIfUserExists('email', email);
        if (emailExists) {
            return res.status(400).json({ error: "This email already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const secPassword = await bcrypt.hash(password, salt);

        const insertQuery = "INSERT INTO users (email, username, password, phone, InvitationCode) VALUES (?, ?, ?, ?, ?)";
        const insertValues = [email, username, secPassword, contact, code];

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
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await getUserByUserName(username);

        if (!user) {
            return res.status(400).json({ Message: "Account not found" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);

        if (!passwordCompare) {
            return res.status(400).json({ Message: "Invalid credentials" });
        }

        const authToken = generateAuthToken(user.id);

        res.json({ success: true, authToken });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error occurred');
    }
});

// Function to check if a user with a given field (email/username) exists
async function checkIfUserExists(field, value) {
    const query = `SELECT * FROM users WHERE ${field} = ?`;
    const result = await executeQuery(query, [value]);
    return result.length > 0;
}

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
    const query = "SELECT * FROM users WHERE username = ?";
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


// router.get("/getID/:token", async (req, res) => {
//     const { token } = req.params;
//     try {
//         const password = jwt.verify(token, JWT_KEY);
//         const id = password.user.id;
//         res.json({id})
//     } catch (error) {
//         console.error('Error fetching Earning', error);
//         return res.status(500).json({ message: 'Internal server error' });
//     }
// });


// router.get("/getusers", async (req, res) => {
//     try {
//         const query = "SELECT id, email, name, account_type,contact FROM users";
//         connection.query(query, async (err, result) => {
//             if (err) {
//                 console.error(err);
//                 return res.status(500).send('Error occurred');
//             }

//             res.json(result);
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Error occurred');
//     }
// });




// module.exports = router;
