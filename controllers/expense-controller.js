const HttpError = require("../models/http-errors");
const {v4: uuidv4} = require('uuid');
const {validationResult} = require("express-validator");
const date = new Date();

const Expense = require('../models/expense')

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

const getExpenseById = (req, res, next) => {
    const expenseId = req.params.id;
    const expense = DUMMY_EXPENSES.find(expense => {
        return expense.id === expenseId
    });

    if (!expense)
        throw new HttpError('Cannot find expense with the associated id', 404)
    res.json({expense})
}

function validateRequest(request) {
    const result = validationResult(request);
    if (!result.isEmpty())
        throw new HttpError('Error', 422)
}

const createExpense = async (request, response, next) => {
    validateRequest(request);

    const {date, day, type, amount, desc} = request.body
    const createdExpense = new Expense({date, day, type, amount, desc})

    try {
        await createdExpense.save()
    } catch (err) {
        console.log(err)
        const error = new HttpError('Creating expense failed, please try again', 500)
        return next(error)
    }
    DUMMY_EXPENSES.push(createdExpense)

    response.status(201).json({expense: createdExpense})
}

const updateExpense = (req, res, next) => {
    validateRequest(req)

    const {type, amount, desc} = req.body

    const expenseId = req.headers.id;
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

exports.getExepenseById = getExpenseById
exports.createExpense = createExpense
exports.deleteExpense = deleteExpense
exports.updateExpense = updateExpense