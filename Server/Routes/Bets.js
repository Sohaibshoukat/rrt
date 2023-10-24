const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_KEY = "RRTGLOBALPLAY";
const connection = require('../DB');

// Create a user
router.post("/createbet", async (req, res) => {
    try {
        let newBalance;
        const { amount, matchTitle, percentage, token } = req.body;

        const password = jwt.verify(token, JWT_KEY);
        const id = password.user.id;

        const currentTimestamp = new Date();
        const formattedTimestamp = currentTimestamp.toISOString().slice(0, 19).replace('T', ' ');

        const insertQuery = "INSERT INTO bets (userid, matchTitle, date, amount,percentage, status,result) VALUES (?, ?, ?, ?, ?, ?, ?)";
        const insertValues = [id, matchTitle, formattedTimestamp, amount, percentage, "New", "Pending"];

        const result = await executeQuery(insertQuery, insertValues);

        await connection.query('SELECT balance FROM users where id=?', [id], async (err, result3) => {
            if (err) {
                res.status(500).send('Error occurred');
            }
            newBalance = result3[0].balance - amount;
            const insertQuery2 = "UPDATE users SET balance = ? WHERE id=?;";
            const insertValues2 = [newBalance, id];
            const result2 = await executeQuery(insertQuery2, insertValues2);
        });


        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error occurred');
    }
});

router.get("/getBet/:token", async (req, res) => {
    try {
        const { token } = req.params;
        const password = jwt.verify(token, JWT_KEY);
        const id = password.user.id;

        connection.query('SELECT * FROM bets WHERE userid=?', [id], async (err, result) => {
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


router.put("/PersonalCancel", async (req, res) => {
    let newBalance = 0;
    let amountCut;
    try {
        const { id, balance, userid } = req.body

        const insertQuery = "UPDATE bets SET result = ? WHERE id=?;";
        const insertValues = ["Cancel", id];


        const result = await executeQuery(insertQuery, insertValues);

        connection.query('SELECT balance FROM users where id=?', [userid], async (err, result3) => {
            if (err) {
                res.status(500).send('Error occurred');
            }
            amountCut = (balance * 5) / 100;

            newBalance = (result3[0].balance + balance) - amountCut;
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

router.put("/AdminCancel", async (req, res) => {
    let newBalance = 0;
    try {
        const { id, balance, userid } = req.body

        const insertQuery = "UPDATE bets SET result = ? WHERE id=?;";
        const insertValues = ["Cancel by Admin", id];


        const result = await executeQuery(insertQuery, insertValues);

        connection.query('SELECT balance FROM users where id=?', [userid], async (err, result3) => {
            if (err) {
                res.status(500).send('Error occurred');
            }
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

router.put("/BetManipulate", async (req, res) => {
    try {
        const { id, newPer } = req.body

        const insertQuery = "UPDATE bets SET percentage = ? WHERE id=?;";
        const insertValues = [newPer, id];


        const result = await executeQuery(insertQuery, insertValues);

        res.json({success:true})
    } catch (error) {
        console.error(error);
        res.status(500).send('Error occurred');
    }
});


router.put("/Betlose", async (req, res) => {
    let newBalance = 0;
    try {
        const { id } = req.body

        const insertQuery = "UPDATE bets SET result = ? WHERE id=?;";
        const insertValues = ["Lose", id];

        const result = await executeQuery(insertQuery, insertValues);

        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error occurred');
    }
});

router.put("/BetWin", async (req, res) => {
    let newBalance = 0;
    let amountAdd;
    try {
        const { id, balance, userid, percentage } = req.body

        const insertQuery = "UPDATE bets SET result = ? WHERE id=?;";
        const insertValues = ["Won", id];


        const result = await executeQuery(insertQuery, insertValues);

        connection.query('SELECT balance FROM users where id=?', [userid], async (err, result3) => {
            if (err) {
                res.status(500).send('Error occurred');
            }
            amountAdd = (balance * percentage) / 100;
            newBalance = result3[0].balance + balance + amountAdd;
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


router.get("/getBets", async (req, res) => {
    try {

        connection.query('SELECT * FROM bets WHERE result=?', ["Pending"], async (err, result) => {
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