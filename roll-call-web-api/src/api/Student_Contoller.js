var express = require('express')
var StudentController = express()
const conn = require('./mysql')

StudentController.get('/get/:cardid', (req, res) => {
    try {
        const { cardid } = req.params

        conn.query("SELECT * from student_data WHERE STD_CardID = ?", [cardid], (error, results, fields) => {
            if (error) {
                console.log(error)
            }
            res.header("Content-Type", 'application/json')
            res.status(200).send(JSON.stringify(results[0], null, 2))
        })
    }
    catch (e) {
        console.log(e)
    }
})

StudentController.get('/register', (req, res) => {
    try {
        const { cardid } = req.params

        conn.query("SELECT * from student_data WHERE STD_CardID = ?", [cardid], (error, results, fields) => {
            if (error) {
                console.log(error)
            }
            res.header("Content-Type", 'application/json')
            res.status(200).send(JSON.stringify(results[0], null, 2))
        })
    }
    catch (e) {
        console.log(e)
    }
})

StudentController.get('/getall', (req, res) => {
    try {
        query = "SELECT * from student_data"
        conn.query(query, (error, results, fields) => {
            if (error) {
                console.log(error)
            }
            res.header("Content-Type", 'application/json')
            res.status(200).send(JSON.stringify(results, null, 2))
        })
    }
    catch (e) {
        console.log(e)
    }
})

module.exports = StudentController;
