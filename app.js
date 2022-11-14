const express = require('express')
const bodyParser = require('body-parser')

const expenseRouter = require('./routes/expenses')
const app = express();

app.use('/api/expense', expenseRouter)

app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500)
    res.json({message: error.message || 'An unknown error occurred!'});
});


app.listen(process.env.PORT)