const express = require('express')
const bodyParser = require('body-parser')

const expenseRouter = require('./routes/expenses')
const app = express();

app.use('/api/expense', expenseRouter)

app.use((error, res, req, next) => {
    if (res.headersSent)
        return next(error)
    res.status(error.statusCode || 500)
    res.json({message: 'An unknown error occurred'})
})

app.listen(process.env.PORT)