var express = require('express')
var ClassController = express()
const conn = require('./mysql')
const crypto = require('crypto')

///////////////////////////////////////////////////////////////////////////////////////

const bodyParser = require('body-parser')
const app = express()

var server = app.listen(3010, function () {
    console.log("WebSocket (Classroom) on PORT: " + 3010)
})

app.use(bodyParser.json())
app.disable('x-powered-by')

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "*")
    next()
})

var socket = require('socket.io')
var io = socket(server)

io.on('connection', function(socket) {
    console.log("Connected client: " + socket.id)
});

///////////////////////////////////////////////////////////////////////////////////////

function SHA256(paintext) {
    return crypto.createHash('sha256').update(paintext).digest('hex');
}

// async function getClassStudent(classid) {
//     try {
//         conn.query("SELECT * from classroom_std WHERE Class_ID = ?", [classid], (error, results, fields) => {
//             if (error) {
//                 console.log(error)
//                 return false
//             }
//             else {
//                 return results[0]
//             }
//         })
//     }
//     catch (e) {
//         console.log(e)
//     }
// }

ClassController.get('/get/:classid', (req, res) => {
    try {
        const { classid } = req.params

        conn.query("SELECT * from classroom_data WHERE Class_ID = ?", [classid], (error, results, fields) => {
            if (error) {
                console.log(error)
                res.status(500).send()
            }
            else {
                res.header("Content-Type", 'application/json')
                if (results.length > 0) {
                    res.status(200).send(JSON.stringify(Object.assign({}, {status: 200}, results[0]) , null, 2))
                }
                else {
                    res.status(200).send(JSON.stringify({status: 404}, null, 2))
                }
            }
        })
    }
    catch (e) {
        console.log(e)
    }
})

ClassController.get('/getstd/:classid', (req, res) => {
    try {
        const { classid } = req.params
        
        conn.query("SELECT * from classroom_std WHERE Class_ID = ?", [classid], (error, results, fields) => {
            if (error) {
                console.log(error)
                res.status(500).send()
            }
            else {
                res.header("Content-Type", 'application/json')
                res.status(200).send(JSON.stringify(results, null, 2))
            }
        })
    }
    catch (e) {
        console.log(e)
    }
})

ClassController.get('/getall', (req, res) => {
    try {
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
    }
    catch (e) {
        console.log(e)
    }
})

ClassController.post('/scan', (req, res) => {
    try {
        const { classid, cardid } = req.body

        conn.query("SELECT COUNT(*), Class_Status from classroom_data WHERE Class_ID = ? and Class_Status != 0", [classid], (error, results, fields) => {
            if (error) {
                console.log(error)
                res.status(500).send()
            }
            else {
                if (results[0]['COUNT(*)'] > 0) {
                    conn.query("SELECT COUNT(*), STD_ID from student_data WHERE STD_CardID = ?", [cardid], (error2, results2, fields2) => {
                        if (error2) {
                            console.log(error2)
                            res.status(500).send()
                        }
                        else {
                            if (results2[0]['COUNT(*)'] > 0) {
                                let tmp_stdid = results2[0]['STD_ID']
                                // ตรวจสอบ ID ห้องและนักเรียนแล้ว เริ่มทำงาน
                                if (results[0]['Class_Status'] == 1) { // ห้องเรียนกำลังเรียน, รับนักเรียนเพิ่ม

                                    conn.query("SELECT COUNT(*), STD_ID from classroom_std WHERE STD_ID = ? and Class_ID = ?", [tmp_stdid, classid], (error4, results4, fields4) => {
                                        if (error4) {
                                            console.log(error2)
                                            res.status(500).send()
                                        }
                                        else {
                                            if (results4[0]['COUNT(*)'] > 0) {
                                                res.status(200).send({status: 200, message: 'student existed but ok'})
                                                console.log("\x1b[42mStudent Attending Classroom (Existed): " + cardid + ' ' + classid + "\x1b[0m")
                                            }
                                            else {
                                                conn.query("INSERT INTO classroom_std set Class_ID=?, STD_CardID=?, STD_ID=?", [classid, cardid, tmp_stdid], (error3, results3, fields3) => {
                                                    if (error3) {
                                                        console.log(error3)
                                                        res.status(500).send()
                                                    }
                                                    else {
                                                        io.emit('updateStd', {classID: classid})

                                                        res.status(200).send({status: 200, message: 'success'})
                                                        console.log("\x1b[42mStudent Attending Classroom: " + cardid + ' ' + classid + "\x1b[0m")
                                                    }
                                                })
                                            }
                                        }
                                    })
                                }
                                else if (results[0]['Class_Status'] == 2) { // ห้องเรียนกำลังเรียน มาสาย
                                    conn.query("SELECT COUNT(*), STD_ID from classroom_std WHERE STD_ID = ? and Class_ID = ?", [tmp_stdid, classid], (error5, results5, fields5) => {
                                        if (error5) {
                                            console.log(error2)
                                            res.status(500).send()
                                        }
                                        else {
                                            if (results5[0]['COUNT(*)'] > 0) {
                                                res.status(200).send({status: 200, message: 'student existed but ok'})
                                                console.log("\x1b[42mStudent Attending Classroom (Late, Existed): " + cardid + ' ' + classid + "\x1b[0m")
                                            }
                                            else {
                                                conn.query("INSERT INTO classroom_std set Class_ID=?, STD_CardID=?, STD_ID=?, Attend_Status=2", [classid, cardid, tmp_stdid], (error3, results3, fields3) => {
                                                    if (error3) {
                                                        console.log(error3)
                                                        res.status(500).send()
                                                    }
                                                    else {
                                                        io.emit('updateStd', {classID: classid})

                                                        res.status(200).send({status: 200, message: 'success (Late)'})

                                                        console.log("\x1b[42mStudent Attending Classroom (Late): " + cardid + ' ' + classid + "\x1b[0m")
                                                    }
                                                })
                                            }
                                        }
                                    })
                                }
                                else if (results[0]['Class_Status'] == 3) { // ห้องกำลังเปิดให้เช็คชื่อออก
                                    conn.query("UPDATE classroom_std set STD_Status=0, Leave_Time=NOW() WHERE Class_ID = ? and STD_CardID = ?", [classid, cardid], (error5, results5, fields5) => {
                                        if (error5) {
                                            console.log(error5)
                                            res.status(500).send()
                                        }
                                        else {
                                            io.emit('updateStd', {classID: classid})

                                            res.status(200).send({status: 200, message: 'left classroom'})
                                            console.log("\x1b[42mStudent Leaving Classroom: " + cardid + ' ' + classid + "\x1b[0m")
                                        }
                                    })
                                }
                                else {
                                    res.status(403).send({status: 403, message: 'classroom closed permission denied'})
                                }
                            }
                            else {
                                res.status(404).send({status: 404, message: 'student notfound'})
                            }
                        }
                    })
                }
                else {
                    res.status(404).send({status: 404, message: 'classroom not available'})
                }
            }
        })
    }
    catch (e) {
        console.log(e)
    }
})

ClassController.post('/create', (req, res) => {
    try {
        const { subject, instructor, password } = req.body

        var generatedID = Math.floor(Math.random() * 90000) + 10000
        var hashPassword = SHA256(password)

        console.log("\x1b[41mCreated Classroom: " + generatedID, subject, instructor + "\x1b[0m")

        conn.query("INSERT INTO classroom_data (Class_ID, Class_Subject, Class_Instructor, Class_Password) VALUE (?, ?, ?, ?)", [generatedID, subject, instructor, hashPassword], (error, results, fields) => {
            if (error) {
                console.log(error)
                res.status(500).send()
            }
            else {
                res.header("Content-Type", 'application/json')
                res.status(200).send({status: 200, classid: generatedID})
            }
        })
    }
    catch (e) {
        console.log(e)
    }
})

ClassController.post('/update/:classid', (req, res) => {
    try {
        const { classid } = req.params
        const { password, status } = req.body

        var hashPassword = SHA256(password)

        conn.query("SELECT * from classroom_data WHERE Class_ID = ? and Class_Password = ?", [classid, hashPassword], (error, results, fields) => {
            if (error) {
                console.log(error)
                res.status(500).send()
            }
            else {
                // console.log(results.length)
                if (results.length) {
                    conn.query("UPDATE classroom_data set Class_Status = ? WHERE Class_ID = ?", [status, classid], (error, results, fields) => {
                        if (error) {
                            console.log(error)
                            res.status(500).send()
                        }
                        else {
                            if (status == 4) { // ปิดห้อง
                                conn.query("UPDATE classroom_std set STD_Status = 2 WHERE Class_ID = ? and STD_Status = 1", [classid], (error, results, fields) => {
                                    if (error) {
                                        console.log(error)
                                        res.status(500).send()
                                    }
                                    else {
                                        io.emit('updateStd', {classID: classid})
        
                                        res.header("Content-Type", 'application/json')
                                        res.status(200).send({status: 200, message: 'update success'})
                                    }
                                })
                            }
                            else {
                                io.emit('updateStd', {classID: classid})
        
                                res.header("Content-Type", 'application/json')
                                res.status(200).send({status: 200, message: 'update success'})
                            }
                        }
                    })
                }
                else {
                    res.header("Content-Type", 'application/json')
                    setTimeout((function() { res.status(200).send({status: 404, message: 'class not found or incorrect password'}) }), 500);
                }
            }
        })
    }
    catch (e) {
        console.log(e)
    }
})

ClassController.get('/stdcount/:classid', (req, res) => {
    try {
        const { classid } = req.params

        conn.query("SELECT COUNT(*) from classroom_std WHERE Class_ID = ?", [classid], (error, results, fields) => {
            if (error) {
                console.log(error)
                res.status(500).send()
            }
            else {
                res.header("Content-Type", 'application/json')
                res.status(200).send({count: results[0]['COUNT(*)']})
            }
        })
    }
    catch (e) {
        console.log(e)
    }
})

// ClassController.post('/close/:classid', (req, res) => {
//     const { password } = req.body
//     const { classid } = req.params

//     var hashPassword = SHA256(password)

//     conn.query("SELECT * from classroom_data WHERE Class_ID = ? and Class_Password = ?", [classid, hashPassword], (error, results, fields) => {
//         if (error) {
//             console.log(error)
//             res.status(500).send()
//         }
//         else {
//             res.header("Content-Type", 'application/json')
//             res.status(200).send({status: '200', classid: classid})
//         }
//     })
// })


module.exports = ClassController;
