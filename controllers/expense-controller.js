const HttpError = require("../models/http-errors");
const {v4: uuidv4} = require('uuid');
const {validationResult} = require("express-validator");
const date = new Date();

const Expense = require('../models/expense')

const getExpenseById = async (req, res, next) => {
    const expenseId = req.params.id;
    let expense
    try {
        expense = await Expense.findById(expenseId)
    } catch (err) {
        const error = new HttpError("Something went wrong", 500)
        return next(error)
    }

    if (!expense) {
        const error = new HttpError('Cannot find expense with the associated id', 404)
        return next(error)
    }

    res.json({expense: expense.toObject({getters: true})})
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

    response.status(201).json({expense: createdExpense})
}

const updateExpense = async (req, res, next) => {
    validateRequest(req)

    const {type, amount, desc} = req.body

    const expenseId = req.headers.id;

    let expense
    try {
        expense = await Expense.findById(expenseId)
    } catch (err) {
        const error = new HttpError("Something went wrong", 500)
        return next(error)
    }

    expense.type = type
    expense.amount = amount
    expense.desc = desc

    try {
        await expense.save()
    } catch (err) {
        console.log(err)
        const error = new HttpError('Update failed', 500)
        return next(error)
    }

    res.status(200).json({expense: expense.toObject({getters: true})})
}

const deleteExpense = async (req, res, next) => {
    const expenseId = req.headers.id;
    let expense
    try {
        expense = await Expense.findById(expenseId)
    } catch (err) {
        const error = new HttpError("Something went wrong", 500)
        return next(error)
    }

    try {
        await expense.remove()
    } catch (err) {
        console.log(err)
        const error = new HttpError('Delete failed', 500)
        return next(error)
    }


    res.status(200).json({expense: expense.toObject({getters: true})})
}

exports.getExepenseById = getExpenseById
exports.createExpense = createExpense
exports.deleteExpense = deleteExpense
exports.updateExpense = updateExpense