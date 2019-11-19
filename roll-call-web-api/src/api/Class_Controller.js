var express = require('express')
var ClassController = express()
const conn = require('./mysql')
const crypto = require('crypto');

function SHA256(paintext) {
    return crypto.createHash('sha256').update(paintext).digest('hex');
}

ClassController.get('/get/:classid', (req, res) => {
    const { classid } = req.params

    conn.query("SELECT * from classroom_data WHERE Class_ID = ?", [classid], (error, results, fields) => {
        if (error) {
            console.log(error)
            res.status(500).send()
        }
        else {
            res.header("Content-Type", 'application/json')
            res.status(200).send(JSON.stringify(results[0], null, 2))
        }
    })
})

ClassController.get('/all', (req, res) => {
    const { classid } = req.params

    conn.query("SELECT * from classroom_data", (error, results, fields) => {
        if (error) {
            console.log(error)
            res.status(500).send()
        }
        else {
            res.header("Content-Type", 'application/json')
            res.status(200).send(JSON.stringify(results, null, 2))
        }
    })
})

ClassController.post('/create', (req, res) => {
    const { subject, instructor, password } = req.body

    var generatedID = Math.floor(Math.random()*90000) + 10000
    var hashPassword = SHA256(password)

    console.log("Created Classroom:" + generatedID, subject, instructor)

    conn.query("INSERT INTO classroom_data (Class_ID, Class_Subject, Class_Instructor, Class_Password) VALUE (?, ?, ?, ?)", [generatedID, subject, instructor, hashPassword], (error, results, fields) => {
        if (error) {
            console.log(error)
            res.status(500).send()
        }
        else {
            res.header("Content-Type", 'application/json')
            res.status(200).send({status: '200', classid: generatedID})
        }
    })
})

ClassController.post('/close/:classid', (req, res) => {
    const { password } = req.body
    const { classid } = req.params

    var hashPassword = SHA256(password)

    conn.query("SELECT * from classroom_data WHERE Class_ID = ? and Class_Password = ?", [classid, hashPassword], (error, results, fields) => {
        if (error) {
            console.log(error)
            res.status(500).send()
        }
        else {
            res.header("Content-Type", 'application/json')
            res.status(200).send({status: '200', classid: classid})
        }
    })
})

module.exports = ClassController;
