const express = require('express')

const router = express.Router()
const expenseControllers = require('../controllers/expense-controller')

router.get('/:id', expenseControllers.getExepenseById)

router.post('/', expenseControllers.createExpense)

router.patch('/', expenseControllers.updateExpense)

router.delete('/:id', expenseControllers.deleteExpense)

module.exports = router