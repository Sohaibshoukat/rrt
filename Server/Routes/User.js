const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_KEY = "RRTGLOBALPLAY";
const connection = require('../DB');
const multer = require('multer');

const upload = multer({ storage: multer.memoryStorage() });

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

        const insertQuery = "INSERT INTO users (email, username, password, phone, InvitationCode,balance) VALUES (?, ?, ?, ?, ?, ?)";
        const insertValues = [email, username, secPassword, contact, code,0];

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
            return res.status(400).json({ error: "Account not found" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);

        console.log(user.password)
        console.log(password)

        if (!passwordCompare) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        const authToken = generateAuthToken(user.id);

        res.json({ success: true, authToken });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error occurred');
    }
});

router.post("/UploadFrontImage",
    upload.single('image')
    , async (req, res) => {
        try {
            const token = req.body.token;
            const image = req.file.buffer.toString('base64');

            const password = jwt.verify(token, JWT_KEY);
            const id = password.user.id;

            const insertQuery = "UPDATE users SET CNIC_FRONT = ? WHERE id=?;";
            const insertValues = [image, id];

            const result = await executeQuery(insertQuery, insertValues);

            res.json({ success: true });
        } catch (error) {
            console.log(99);
            console.error(error);
            res.status(500).send('Error occurred');
        }
});

router.post("/UploadbackImage",
    upload.single('image')
    , async (req, res) => {
        try {
            const token = req.body.token;
            const image = req.file.buffer.toString('base64');

            const password = jwt.verify(token, JWT_KEY);
            const id = password.user.id;

            const insertQuery = "UPDATE users SET CNIC_BACK = ? WHERE id=?;";
            const insertValues = [image, id];

            const result = await executeQuery(insertQuery, insertValues);

            res.json({ success: true });
        } catch (error) {
            console.log(99);
            console.error(error);
            res.status(500).send('Error occurred');
        }
});


router.get('/FetchFrontImage/:token', async (req, res) => {
    let success=false;
    try {
        const {token} = req.params;

        const password = jwt.verify(token, JWT_KEY);
        const id = password.user.id;

        connection.query('SELECT CNIC_FRONT FROM users Where id= ?', [id], async (err, result) => {
            const imageDataUri = `data:image/png;base64,${result[0].CNIC_FRONT}`;

            return res.json({success:true,image: imageDataUri});
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Network error occurred');
    }
});

router.get('/FetchBackImage/:token', async (req, res) => {
    try {
        const {token} = req.params;

        const password = jwt.verify(token, JWT_KEY);
        const id = password.user.id;

        connection.query('SELECT CNIC_BACK FROM users Where id= ?', [id], async (err, result) => {
            const imageDataUri = `data:image/png;base64,${result[0].CNIC_BACK}`;

            return res.json({success:true,image: imageDataUri});
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Network error occurred');
    }
});

router.get('/Fetchbalance/:token', async (req, res) => {
    try {
        const {token} = req.params;

        const password = jwt.verify(token, JWT_KEY);
        const id = password.user.id;

        connection.query('SELECT balance FROM users Where id= ?', [id], async (err, result) => {
            return res.json({success:true,result: result[0]});
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Network error occurred');
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
