// Express API's part

const express = require('express')
const bodyParser = require('body-parser')
const app = express()

// var Auth = require('./src/api/Auth')
// var User_Controller = require('./src/api/User_Controller')
var Class_Controller = require('./src/api/Class_Controller')
var Student_Controller = require('./src/api/Student_Contoller')

app.use(bodyParser.json())
app.disable('x-powered-by')

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "*")
    next()
})

// app.use(express.static('public'))

// app.use('/auth', Auth)
// app.use('/user', User_Controller)
app.use('/class', Class_Controller)
app.use('/std', Student_Controller)

// require('./src/api/Class_Controller')(app)

var server = app.listen(3000, function () {
    console.log("Listening on port *:3000")
})

// Socket.io's part

// var socket = require('socket.io')
// var io = socket(server)
