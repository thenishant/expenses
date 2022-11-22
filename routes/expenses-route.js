const express = require('express')

const router = express.Router()
const expenseControllers = require('../controllers/expense-controller')
const {checkPostExpenseBody, checkPatchExpenseBody} = require("../validation/expense-validator");

router.get('/:id', expenseControllers.getExepenseById)

router.post('/', checkPostExpenseBody, expenseControllers.createExpense)

router.patch('/', checkPatchExpenseBody, expenseControllers.updateExpense)

router.delete('/:id', expenseControllers.deleteExpense)

module.exports = router