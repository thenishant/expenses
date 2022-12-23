const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const expenseRouter = require('./routes/expenses-route')
const httpError = require('./models/http-errors')

const app = express();

app.use(bodyParser.json())

app.use('/api/expense', expenseRouter)

app.use((req, res, next) => {
    throw new httpError('Could not find this route', 404);
})

app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500)
    res.json({message: error.message || 'An unknown error occurred!'});
});

mongoose
    .connect(process.env.URI)
    .then(() => {
        app.listen(process.env.PORT)
    })
    .catch(err => {
        console.log(err)
    })

