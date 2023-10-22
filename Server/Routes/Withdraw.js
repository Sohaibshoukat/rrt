const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_KEY = "RRTGLOBALPLAY";
const connection = require('../DB');

// Create a user
router.post("/createwithdraw", async (req, res) => {
    try {
        const { amount, tid, token } = req.body;

        const password = jwt.verify(token, JWT_KEY);
        const id = password.user.id;

        const insertQuery = "INSERT INTO withdraw (amount, t_id, user_id, date, status) VALUES (?, ?, ?, ?, ?)";
        const insertValues = [amount, tid, id, Date.now(), "New"];

        const result = await executeQuery(insertQuery, insertValues);

        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error occurred');
    }
});

router.put("/approve", async (req, res) => {
    let newBalance=0;
    try {
        const {id,balance,userid}=req.body

        const insertQuery = "UPDATE withdraw SET status = ? WHERE id=?;";
        const insertValues = ["Approved", id];

        const result = await executeQuery(insertQuery, insertValues);

        connection.query('SELECT balance FROM users where id=?',[userid], async (err, result3) => {
            if(err){
                res.status(500).send('Error occurred');
            }
            newBalance=result3[0]-balance;
        });

        const insertQuery2 = "UPDATE users SET blanance = ? WHERE id=?;";
        const insertValues2 = [newBalance, userid];

        const result2 = await executeQuery(insertQuery2, insertValues2);

        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error occurred');
    }
});

router.get("/newwithdraw", async (req, res) => {
    try {

        connection.query('SELECT * FROM withdraw WHERE status=?',["New"], async (err, result) => {
            if(err){
                res.status(500).send('Error occurred');
            }
            res.json(result);
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error occurred');
    }
});

router.get("/getWithdraw/:token", async (req, res) => {
    try {
        const {token}=req.params;
        const password = jwt.verify(token, JWT_KEY);
        const id = password.user.id;

        connection.query('SELECT * FROM withdraw WHERE user_id=?',[id], async (err, result) => {
            if(err){
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