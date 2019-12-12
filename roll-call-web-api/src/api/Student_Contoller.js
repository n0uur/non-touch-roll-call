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

StudentController.get('/getid/:stdid', (req, res) => {
    try {
        const { stdid } = req.params

        conn.query("SELECT * from student_data WHERE STD_ID = ?", [stdid], (error, results, fields) => {
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

// StudentController.get('/register', (req, res) => {
//     try {
//         const { cardid } = req.params

//         conn.query("SELECT * from student_data WHERE STD_CardID = ?", [cardid], (error, results, fields) => {
//             if (error) {
//                 console.log(error)
//             }
//             res.header("Content-Type", 'application/json')
//             res.status(200).send(JSON.stringify(results[0], null, 2))
//         })
//     }
//     catch (e) {
//         console.log(e)
//     }
// })

StudentController.post('/register/confirm', (req, res) => {
    const { cardid, studentid } = req.body

    // console.log(req.body)

    conn.query("SELECT * from student_data WHERE STD_ID = ?", [studentid], (error, results, fields) => {
        if (error) {
            console.log(error)
            res.status(500).send()
        }
        else {
            // console.log(results.length)
            if (results.length) {
                conn.query("UPDATE student_data set STD_CardID = ? WHERE STD_ID = ?", [cardid, studentid], (error, results, fields) => {
                    if (error) {
                        console.log(error)
                        res.status(500).send()
                    }
                    else {
                        res.header("Content-Type", 'application/json')
                        res.status(200).send({status: 200, message: 'register success'})
                    }
                })
            }
            else {
                res.header("Content-Type", 'application/json')
                setTimeout((function() { res.status(200).send({status: 404, message: 'student id not found'}) }), 500);
            }
        }
    })
})

StudentController.post('/register', (req, res) => {
    const { stdID, stdName, stdLastname, stdNickname, stdImgURL  } = req.body

    conn.query("SELECT * from student_data WHERE STD_ID = ?", [studentid], (error, results, fields) => {
        if (error) {
            console.log(error)
            res.status(500).send()
        }
        else {
            // console.log(results.length)
            if (results.length == 0) {
                conn.query("INSERT INTO student_data set STD_ID = ?, STD_Name = ?, STD_Lastname = ?, STD_Nickname = ?, STD_IMG_URL = ?", [stdID, stdName, stdLastname, stdNickname, stdImgURL], (error, results, fields) => {
                    if (error) {
                        console.log(error)
                        res.status(500).send()
                    }
                    else {
                        res.header("Content-Type", 'application/json')
                        res.status(200).send({status: 200, message: 'register success'})
                    }
                })
            }
            else {
                res.header("Content-Type", 'application/json')
                setTimeout((function() { res.status(200).send({status: 400, message: 'student already exists'}) }), 500);
            }
        }
    })
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
