const {check} = require('express-validator')

const checkValidDate = check('date').isDate('DD/MM/YYYY');
const checkDayNotEmpty = check('day').notEmpty();
const checkTypeNotEmpty = check('type').notEmpty();
const checkValidAmount = check('amount').isNumeric().notEmpty();

const checkPostExpenseBody = [checkValidDate, checkDayNotEmpty, checkTypeNotEmpty, checkValidAmount]

exports.checkPostExpenseBody = checkPostExpenseBody