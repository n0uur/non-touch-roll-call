var express = require('express')
var StudentController = express()
const conn = require('./mysql')

StudentController.get('/all', (req, res) => {
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
