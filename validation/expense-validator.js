const {check} = require('express-validator')

const checkValidDate = check('date').isDate('DD/MM/YYYY');
const checkDayNotEmpty = check('day').notEmpty();
const checkTypeNotEmpty = check('type').notEmpty();
const checkValidAmount = check('amount').isNumeric().notEmpty();

const checkPostExpenseBody = [checkValidDate, checkDayNotEmpty, checkTypeNotEmpty, checkValidAmount]
const checkPatchExpenseBody = checkPostExpenseBody


exports.checkPostExpenseBody = checkPostExpenseBody
exports.checkPatchExpenseBody = checkPatchExpenseBody