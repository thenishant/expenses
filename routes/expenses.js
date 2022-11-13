const express = require('express')

const router = express.Router()

router.get('/', (req, res, next) => {
    console.log("GET request in expenses");
    res.json({message: "It works in expenses"})
})

module.exports = router