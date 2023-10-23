const express = require('express')
const connectToMySQL = require("./DB")
const cors = require('cors');

// Use cors middleware

const app = express()
app.use(express.json())
app.use(cors());

const port = process.env.port || 5000;

app.use('/api/user', require('./Routes/User'));
app.use('/api/recharge', require('./Routes/Recahrge'));
app.use('/api/withdraw', require('./Routes/Withdraw'));
app.use('/api/admin', require('./Routes/admin'));
app.use('/api/bet', require('./Routes/Bets'));


app.listen(port, () => {
  console.log(`Inote-book listening at http://localhost:${port}`)
})

