const mongoose = require('mongoose');

const schema = mongoose.Schema;

const expenseSchema = new schema({
    date: {type: Date, required: true},
    day: {type: String, required: true},
    type: {type: String, required: true},
    amount: {type: Number, required: true},
    desc: {type: String, required: true},
})

module.exports = mongoose.model('Expense', expenseSchema)