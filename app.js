const express = require('express')
const bodyParser = require('body-parser')

const expenseRouter = require('./routes/expenses')
const app = express();

app.use(expenseRouter)

app.listen(process.env.PORT)