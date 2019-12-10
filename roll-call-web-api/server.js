// Express API's part

const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const PORT = 3000

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

var server = app.listen(PORT, function () {
    console.log("API Listening on PORT: " + PORT)
})

