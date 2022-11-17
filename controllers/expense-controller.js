const HttpError = require("../models/http-errors");
const {v4: uuidv4} = require('uuid');
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

const getExepenseById = (req, res, next) => {
    const expenseId = req.params.id;
    const expense = DUMMY_EXPENSES.find(expense => {
        return expense.id === expenseId
    });

    if (!expense)
        throw new HttpError('Cannot find expense with the associated id', 404)
    res.json({expense})
}

const createExpense = (request, response, next) => {
    const {date, day, type, amount, desc} = request.body
    const createdExpense = {id: uuidv4(), date, day, type, amount, desc}

    DUMMY_EXPENSES.push(createdExpense)

    response.status(201).json({expense: createdExpense})

}

exports.getExepenseById = getExepenseById
exports.createExpense = createExpense