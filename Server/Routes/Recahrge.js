const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_KEY = "RRTGLOBALPLAY";
const connection = require('../DB');

// Create a user
router.post("/create", async (req, res) => {
    try {
        const { amount, tid, token } = req.body;

        const password = jwt.verify(token, JWT_KEY);
        const id = password.user.id;

        const currentTimestamp = new Date();
        const formattedTimestamp = currentTimestamp.toISOString().slice(0, 19).replace('T', ' ');


        const insertQuery = "INSERT INTO recharge (amount, t_id, userid, date, status) VALUES (?, ?, ?, ?, ?)";
        const insertValues = [amount, tid, id, formattedTimestamp, "Pending"];

        const result = await executeQuery(insertQuery, insertValues);

        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error occurred');
    }
});

router.put("/approve", async (req, res) => {
    let newBalance = 0;
    try {
        const { id, balance, userid } = req.body

        const insertQuery = "UPDATE recharge SET status = ? WHERE id=?;";
        const insertValues = ["Approved", id];

        // console.log(userid)

        const result = await executeQuery(insertQuery, insertValues);

        connection.query('SELECT balance FROM users where id=?', [userid], async (err, result3) => {
            if (err) {
                res.status(500).send('Error occurred');
            }
            // console.log(result3);
            newBalance = result3[0].balance + balance;
            const insertQuery2 = "UPDATE users SET balance = ? WHERE id=?;";
            const insertValues2 = [newBalance, userid];
            const result2 = await executeQuery(insertQuery2, insertValues2);
        });

        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error occurred');
    }
});

router.put("/Deny", async (req, res) => {
    let newBalance = 0;
    try {
        const { id } = req.body

        const insertQuery = "UPDATE recharge SET status = ? WHERE id=?;";
        const insertValues = ["Denied", id];

        const result = await executeQuery(insertQuery, insertValues);
        res.json({ success: true });

    } catch (error) {
        console.error(error);
        res.status(500).send('Error occurred');
    }
});

router.get("/newRecharge", async (req, res) => {
    try {

        connection.query('SELECT * FROM recharge WHERE status=?', ["Pending"], async (err, result) => {
            if (err) {
                res.status(500).send('Error occurred');
            }
            res.json(result);
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error occurred');
    }
});

router.get("/getRecharge/:token", async (req, res) => {
    try {
        const { token } = req.params;
        const password = jwt.verify(token, JWT_KEY);
        const id = password.user.id;

        connection.query('SELECT * FROM recharge WHERE userid=?', [id], async (err, result) => {
            if (err) {
                res.status(500).send('Error occurred');
            }
            res.json(result);
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error occurred');
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

module.exports = router;