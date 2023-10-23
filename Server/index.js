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

// app.use('/api/Earning', require('./Routes/WorkerEarning'));

// app.use('/api/Withdraw', require('./Routes/Withdraw'));

// app.use('/api/Payment', require('./Routes/PaymentDetail'));

// app.use('/api/ServiceRequest', require('./Routes/ServiceRequest'));

// app.use('/api/ConfirmService', require('./Routes/ConfirmServices'));

// app.use('/api/ServicePricing', require('./Routes/ServicePricing'));

// app.use('/api/EarningPricing', require('./Routes/EarningPricing'));


app.listen(port, () => {
  console.log(`Inote-book listening at http://localhost:${port}`)
})

