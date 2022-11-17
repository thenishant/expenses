const express = require('express')

const router = express.Router()
const expenseControllers = require('../controllers/expense-controller')

router.get('/:id', expenseControllers.getExepenseById)

router.post('/', expenseControllers.createExpense)

module.exports = router