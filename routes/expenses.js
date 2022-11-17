const express = require('express')

const HttpError = require("../models/http-errors");


const router = express.Router()
const date = new Date();

const DUMMY_EXPENSES = [
    {
        id: 'e1',
        date: date.toLocaleDateString(),
        day: date.getDate().toLocaleString(),
        type: 'Grocery',
        amount: 200,
        desc: 'vegetables'
    }
]

router.get('/:id', (req, res, next) => {
    const expenseId = req.params.id;
    const expense = DUMMY_EXPENSES.find(expense => {
        return expense.id === expenseId
    });

    if (!expense)
        throw new HttpError('Cannot find expense with the associated id', 404)
    res.json({expense})
})

module.exports = router