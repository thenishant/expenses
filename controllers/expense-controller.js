const HttpError = require("../models/http-errors");
const {v4: uuidv4} = require('uuid');
const date = new Date();

let DUMMY_EXPENSES = [
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

const updateExpense = (req, res, next) => {
    const {type, amount, desc} = req.body

    const expenseId = req.headers.id;

    // const expenseId = req.setHeader("id", id)

    const updatedExpense = {...DUMMY_EXPENSES.find(e => e.id === expenseId)};
    const expenseIndex = DUMMY_EXPENSES.findIndex(e => e.id === expenseId);

    updatedExpense.type = type
    updatedExpense.amount = amount
    updatedExpense.desc = desc

    DUMMY_EXPENSES[expenseIndex] = updatedExpense

    res.status(200).json({expense: updatedExpense})
}

const deleteExpense = (req, res, next) => {
    const expenseId = req.headers.id;
    DUMMY_EXPENSES = DUMMY_EXPENSES.filter(e => e.id !== expenseId)

    res.status(200).json({message: "Expense deleted"})
}

exports.getExepenseById = getExepenseById
exports.createExpense = createExpense
exports.deleteExpense = deleteExpense
exports.updateExpense = updateExpense